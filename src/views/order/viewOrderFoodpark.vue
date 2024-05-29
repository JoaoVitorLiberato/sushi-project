<template>
  <v-card
    elevation="0"
    style="border-radius: 0;"
    color="primary"
  >
    <toolbar-component />
    <v-row
      no-gutters
      justify="center"
      class="pa-4 my-10"
    >
      <v-col
        cols="12"
        md="5"
      >
        <v-row
          style="position:relative"
          no-gutters
        >
          <v-col
            cols="12"
            class="secondary primary--text text-center pa-4"
            style="border-radius:10px;position:absolute;top:-35px;left: 0;"
          >
            <h2
              class="text-uppercase primary--text font-weight-medium"
            >
              Sendo Preparado
            </h2>
          </v-col>

          <v-col 
            cols="12"
            class="py-3"
          />

          <v-col
            cols="12"
            class="text-center"
            style="border: 1px solid var(--v-secondary-base);"
          >
            <v-card
              dark
              color="primary"
              height="70vh"
              style="overflow-y: scroll;"
              class="fix-none-scoll pa-2"
            >
              <v-slide-y-transition
                class="py-0"
                group
              >
                <div
                  v-for="item in CardsFilteredForStatus('preparando').reverse()"
                  :key="`pedido-${item.pedido}`"
                >
                  <v-scroll-x-transition
                    v-if="/preparando/i.test(String(item.status))"
                  >
                    <p
                      class="text-uppercase"
                      style="font-size:20px"
                    >
                      {{ item.nome }}
                    </p>
                  </v-scroll-x-transition>
                </div>
              </v-slide-y-transition>
            </v-card>
          </v-col>
        </v-row>
      </v-col>

      <v-col
        cols="2"
        class="d-flex justify-center align-center"
      >
        <v-icon
          color="secondary"
          :size="$vuetify.breakpoint.smAndDown ? 30 : 80"
        >
          sync_alt
        </v-icon>
      </v-col>

      <v-col
        cols="12"
        md="5"
      >
        <v-row
          no-gutters
          style="position:relative"
        >
          <v-col
            cols="12"
            class="secondary primary--text text-center pa-4"
            style="border-radius:10px;position:absolute;top:-35px;left: 0;"
          >
            <h2
              class="text-uppercase font-weight-medium"
            >
              concluídos
            </h2>
          </v-col>

          <v-col
            cols="12"
            class="py-3"
          />

          <v-col
            cols="12"
            class="text-center"
            style="border: 1px solid var(--v-secondary-base);"
          >
            <v-card
              dark
              color="primary"
              height="70vh"
              style="overflow-y: scroll;"
              class="fix-none-scoll pa-2"
            >
              <v-slide-y-transition
                class="py-0"
                group
              >
                <p
                  v-for="item in CardsFilteredForStatus('concluido')"
                  :key="`pedido-${item.pedido}`"
                  class="text-uppercase"
                  style="font-size:20px"
                >
                  {{ item.nome }}
                </p>
              </v-slide-y-transition>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
  import { Component } from "vue-property-decorator"
  import { mixins } from "vue-class-component"
  import { IOrderData } from "@/types/type-order"
  import MixinServiceOrderCostumer from "@/mixins/order/mixinServiceOrderCostumer"
  import { namespace } from "vuex-class"
  import "@/styles/view/orders/viewOrderFoodpark.styl"

  const dialogStore = namespace("dialogStoreModule")

  @Component({
    components: {
      ToolbarComponent: () => import(
        /* webpackChunkName: "toolbar-component" */
        /* webpackMode: "eager" */
        "@/components/ToolbarComponent.vue"
      ),
    }
  })

  export default class ViewOrderAdminFoodpark extends mixins(
    MixinServiceOrderCostumer
  ) {
    @dialogStore.Action("ActionDialogTryAgain") setDialogTryAgain

    allOrders: IOrderData[] = []
    showCard = false

    intervalOrder = 0
    created (): void {
      const TOKEN = sessionStorage.getItem("token-user")
      if (!TOKEN) this.$router.replace(`/${location.search}`)

      this.renderCardOrderCostumers()
      this.intervalOrder = window.setInterval(() => {
        const SESSION_CACHE = sessionStorage.getItem("session")
        if (SESSION_CACHE && !/orders/i.test(String(SESSION_CACHE || ""))) {
          window.clearInterval(this.intervalOrder)
          return
        }

        this.renderCardOrderCostumers() 
      }, 30000)
    }

    renderCardOrderCostumers (): void {
      this.getAllOrderCostumer()
        .then(responseMixin => {
          if (/error/i.test(String(responseMixin || ""))) throw Error("err")
          
          if (responseMixin.length > 0) {
            const ORDER_FILTERRED = (responseMixin as IOrderData[]).filter(order => {
              if (/^foodpark$/i.test(order.segmento as string)) return order
            })

            this.allOrders = [ ...ORDER_FILTERRED ]
          }
        }).catch(err => {
          window.log("ERROR renderCardOrderCostumers", err)
          this.setDialogTryAgain(true)
        }).finally(() => {
          this.showCard = true
        })
    }

    CardsFilteredForStatus (status?:string): IOrderData[] {
      return this.allOrders.filter(item => {
        if (String(item.status || "") === String(status || "")) return item
      })
    }
  }
</script>
