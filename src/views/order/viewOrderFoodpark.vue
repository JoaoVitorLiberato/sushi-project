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
      justify-md="space-between"
      align="center"
      style="height: 100vh;"
    >
      <v-col
        cols="12"
        md="5"
      >
        <v-card
          dark
          color="primary"
          height="95vh"
          class="pa-2"
        >
          <v-row
            no-gutters
          >
            <v-col
              cols="12"
              class="secondary primary--text text-center pa-2"
              style="border-radius: 10px;"
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
            >
              <transition
                name="bounce"
              >
                <div
                  v-show="showCard"
                >
                  <p
                    v-for="item in CardsFilteredForStatus('preparando')"
                    :key="`pedido-${item.pedido}`"
                    v-show="showCard"
                    class="text-uppercase"
                  >
                    {{ item.nome }}
                  </p>
                </div>
              </transition>
            </v-col>
          </v-row>
        </v-card>
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
        <v-card
          dark
          color="primary"
          height="95vh"
          class="pa-2"
        >
          <v-row
            no-gutters
          >
            <v-col
              cols="12"
              class="secondary primary--text text-center pa-2"
              style="border-radius: 10px;"
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
            >
              <transition
                name="bounce"
              >
                <div
                  v-show="showCard"
                >
                  <p
                    v-for="item in CardsFilteredForStatus('concluido')"
                    :key="`pedido-${item.pedido}`"
                    class="text-uppercase"
                  >
                    {{ item.nome }}
                  </p>
                </div>
              </transition>
            </v-col>
          </v-row>
        </v-card>
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
      }, 45000)
    }

    renderCardOrderCostumers (): void {
      this.showCard = false
      this.getAllOrderCostumer()
        .then(responseMixin => {
          if (/error/i.test(String(responseMixin || ""))) throw Error("err")
          if (responseMixin.length > 0) this.allOrders = [...responseMixin as IOrderData[]]
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

<style scoped>
  .bounce-enter-active {
    animation: bounce-in .5s;
  }
  .bounce-leave-active {
    animation: bounce-in .5s reverse;
  }

  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
