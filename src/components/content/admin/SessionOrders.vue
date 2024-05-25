<template>
  <v-row
    no-gutters
  >
    <v-col
      cols="12"
    >
      <v-row
        no-gutters
      >
        <v-col
          cols="12"
        >
          <v-row
            no-gutters
            justify="center"
            justify-md="space-between"
            align="center"
          >
            <v-spacer />

            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                label="Pesquisar"
                outlined
                rounded
                placeholder="Pesquise pelo telefone ou nome do cliente"
                dense
                hide-details
                @input="filterOrderClient"
              />
            </v-col>
          </v-row>
        </v-col>

        <v-col
          cols="12"
          class="py-3"
        />

        <v-col
          cols="12"
          class="text-center"
        >
          <v-row
            no-gutters
          >
            <v-col
              cols="12"
            >
              <v-progress-linear
                indeterminate
                color="secondary"
              />
            </v-col>

            <v-col
              cols="12"
              class="py-2"
            />

            <v-col
              cols="12"
            >
              <span
                class="font-weight-regular mt-3"
              >
                {{ messageUpdateOrders }}
              </span>
            </v-col>
          </v-row>
        </v-col>

        <v-col
          cols="12"
          class="py-3"
        />

        <v-col
          cols="12"
        >
          <v-row
            v-if="orderFiltered.length > 0"
            no-gutters
          >
            <v-col
              cols="12"
            >
              <h2
                class="font-weight-bold text-uppercase"
              >
                Pedidos encontrados
              </h2>
            </v-col>

            <v-col
              cols="12"
              class="d-flex align-center flex-wrap"
            >
              <div
                v-for="{ pedido, segmento, nome, status, telefone, produtos } in orderFiltered"
                :key="`order-client-${pedido}`"
              >
                <card-order-admin-component
                  :segment="segmento"
                  :order="pedido"
                  :name="nome"
                  :phone="telefone"
                  :statusOrder="status"
                  @dialogProductEmit="openDialogProducts(produtos)"
                  @changeStatusOrderEmit="v=>statusCard=v"
                />

              </div>
            </v-col>
          </v-row>

          <v-row
            v-else
            no-gutters
            class="mt-4"
          >
            <v-col
              v-if="CardsFilteredForStatus('preparando').length > 0"
              cols="12"
              :style="$vuetify.breakpoint.mdAndUp ? 'max-height: 700px;overflow-y: scroll;' : ''"
            >
              <v-row
                no-gutters
              >
                <v-col
                  cols="12"
                  class="text-center text-md-start"
                >
                  <h2
                    v-font-size="$vuetify.breakpoint.smAndDown ? 16 : 22"
                    class="font-weight-bold text-uppercase"
                  >
                    Pedidos sendo preparandos
                  </h2>
                </v-col>

                <v-col
                  cols="12"
                  class="py-2"
                />

                <v-col
                  cols="12"
                  class="hidden-md-and-up"
                >
                  <v-slide-group
                    show-arrows
                    prev-icon="arrow_back"
                    next-icon="arrow_forward"
                    :class="`d-flex fix--v-slide-group flex-wrap`"
                    center-active
                    mandatory
                  >
                    <v-slide-item
                      v-for="{ pedido, segmento, nome, status, telefone, produtos } in CardsFilteredForStatus('preparando')"
                      :key="`caroucel-order-client-${pedido}`"
                      class="mr-5"
                    >
                      <div
                        style="width: 300px;"
                      >
                        <card-order-admin-component
                          :segment="segmento"
                          :order="pedido"
                          :name="nome"
                          :phone="telefone"
                          :statusOrder="status"
                          @dialogProductEmit="openDialogProducts(produtos)"
                          @changeStatusOrderEmit="v=>statusCard=v"
                        />
                      </div>
                    </v-slide-item>
                  </v-slide-group>
                </v-col>

                <v-col
                  cols="12"
                  class="hidden-sm-and-down d-md-flex align-center flex-wrap"
                >
                  <div
                    v-for="{ pedido, segmento, nome, status, telefone, produtos } in CardsFilteredForStatus('preparando')"
                    :key="`order-client-${pedido}`"
                  >
                    <card-order-admin-component
                      :segment="segmento"
                      :order="pedido"
                      :name="nome"
                      :phone="telefone"
                      :statusOrder="status"
                      @dialogProductEmit="openDialogProducts(produtos)"
                      @changeStatusOrderEmit="v=>statusCard=v"
                    />
                  </div>
                </v-col>
              </v-row>
            </v-col>

            <v-col
              v-if="CardsFilteredForStatus('preparando').length > 0"
              cols="12"
              class="py-8"
            />

            <v-col
              v-if="CardsFilteredForStatus('entrega').length > 0"
              cols="12"
              :style="$vuetify.breakpoint.mdAndUp ? 'max-height: 700px;overflow-y: scroll;' : ''"
            >
              <v-row
                no-gutters
              >
                <v-col
                  cols="12"
                  class="text-center text-md-start"
                >
                  <h2
                    v-font-size="$vuetify.breakpoint.smAndDown ? 16 : 22"
                    class="font-weight-bold text-uppercase"
                  >
                    Pedidos para entrega
                  </h2>
                </v-col>

                <v-col
                  cols="12"
                  class="py-2"
                />

                <v-col
                  cols="12"
                  class="hidden-md-and-up"
                >
                  <v-slide-group
                    show-arrows
                    prev-icon="arrow_back"
                    next-icon="arrow_forward"
                    :class="`d-flex fix--v-slide-group flex-wrap`"
                    center-active
                    mandatory
                  >
                    <v-slide-item
                      v-for="{ pedido, segmento, nome, status, telefone, produtos } in CardsFilteredForStatus('entrega')"
                      :key="`caroucel-order-client-${pedido}`"
                      class="mr-5"
                    >
                      <div
                        style="width: 300px;"
                      >
                        <card-order-admin-component
                          :segment="segmento"
                          :order="pedido"
                          :name="nome"
                          :phone="telefone"
                          :statusOrder="status"
                          @dialogProductEmit="openDialogProducts(produtos)"
                          @changeStatusOrderEmit="v=>statusCard=v"
                        />
                      </div>
                    </v-slide-item>
                  </v-slide-group>
                </v-col>

                <v-col
                  cols="12"
                  class="hidden-sm-and-down d-md-flex align-center flex-wrap"
                >
                  <div
                    v-for="{ pedido, segmento, nome, status, telefone, produtos } in CardsFilteredForStatus('entrega')"
                    :key="`order-client-${pedido}`"
                  >
                    <card-order-admin-component
                      :segment="segmento"
                      :order="pedido"
                      :name="nome"
                      :phone="telefone"
                      :statusOrder="status"
                      @dialogProductEmit="openDialogProducts(produtos)"
                      @changeStatusOrderEmit="v=>statusCard=v"
                    />
                  </div>
                </v-col>
              </v-row>
            </v-col>

            <v-col
              v-if="CardsFilteredForStatus('entrega').length > 0"
              cols="12"
              class="py-8"
            />

            <v-col
              v-if="CardsFilteredForStatus('concluido').length > 0"
              cols="12"
              :style="$vuetify.breakpoint.mdAndUp ? 'max-height: 700px;overflow-y: scroll;' : ''"
            >
              <v-row
                no-gutters
              >
              <v-col
                  cols="12"
                  class="text-center text-md-start"
                >
                  <h2
                    v-font-size="$vuetify.breakpoint.smAndDown ? 16 : 22"
                    class="font-weight-bold text-uppercase"
                  >
                    Pedidos concluídos
                  </h2>
                </v-col>

                <v-col
                  cols="12"
                  class="py-2"
                />

                <v-col
                  cols="12"
                  class="hidden-md-and-up"
                >
                  <v-slide-group
                    show-arrows
                    prev-icon="arrow_back"
                    next-icon="arrow_forward"
                    :class="`d-flex fix--v-slide-group flex-wrap`"
                    center-active
                    mandatory
                  >
                    <v-slide-item
                      v-for="{ pedido, segmento, nome, status, telefone, produtos } in CardsFilteredForStatus('concluido')"
                      :key="`caroucel-order-client-${pedido}`"
                      class="mr-5"
                    >
                      <div
                        style="width: 300px;"
                      >
                        <card-order-admin-component
                          :segment="segmento"
                          :order="pedido"
                          :name="nome"
                          :phone="telefone"
                          :statusOrder="status"
                          @dialogProductEmit="openDialogProducts(produtos)"
                          @changeStatusOrderEmit="v=>statusCard=v"
                        />
                      </div>
                    </v-slide-item>
                  </v-slide-group>
                </v-col>

                <v-col
                  cols="12"
                  class="hidden-sm-and-down d-md-flex align-center flex-wrap"
                >
                  <div
                    v-for="{ pedido, segmento, nome, status, telefone, produtos } in CardsFilteredForStatus('concluido')"
                    :key="`order-client-${pedido}`"
                  >
                    <card-order-admin-component
                      :segment="segmento"
                      :order="pedido"
                      :name="nome"
                      :phone="telefone"
                      :statusOrder="status"
                      @dialogProductEmit="openDialogProducts(produtos)"
                      @changeStatusOrderEmit="v=>statusCard=v"
                    />
                  </div>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-col>

    <v-col
      cols="12"
    >
      <v-dialog
        ref="dialogOrderProduct"
        width="600"
      >
        <v-card
          class="pa-4"
        >
          <v-row
            no-gutters
          >
            <v-col
              cols="12"
              class="text-end"
            >
              <v-btn
                text
                fab
                color="primary"
                width="40"
                height="40"
                @click="$refs.dialogOrderProduct.save()"
              >
                <v-icon>
                  close
                </v-icon>
              </v-btn>
            </v-col>

            <v-col
              cols="12"
              class="py-3"
            />

            <v-col
              v-for="item in productsDialog"
              :key="`card-product-${item.id}`"
              cols="12"
            >
              <v-card
                class="mx-auto my-2"
                max-width="400"
                outlined
              >
                <v-list-item
                  three-line
                >
                  <v-list-item-content>
                    <v-list-item-title
                      class="text-h6 mb-1 text-uppercase font-weight-medium"
                      style="font-size: 13px !important;"
                    >
                      {{ item.name }}
                    </v-list-item-title>
                    <v-list-item-subtitle
                      style="font-size: 12px !important;"
                    >
                      {{ item.description }}
                    </v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-avatar
                    tile
                    size="80"
                    color="grey"
                  >
                    <v-img
                      :src="item.url_image"
                    />
                  </v-list-item-avatar>
                </v-list-item>

                <v-card-actions>
                  <v-btn
                    block
                    text
                    color="primary"
                    class="d-flex justify-space-between align-center"
                    @click.stop="showComplements = !showComplements"
                  >
                    <span
                      v-font-size="14"
                      class="font-weight-bold"
                    >
                      ver complementos
                    </span>

                    <v-icon
                      size="26"
                    >
                      {{ showComplements ? 'keyboard_arrow_up'  : 'keyboard_arrow_down' }}
                    </v-icon>
                  </v-btn>
                </v-card-actions>

                <v-expand-transition>
                  <div
                    v-show="showComplements"
                  >
                    <v-divider></v-divider>

                    <v-row
                      no-gutters
                      class="pa-4"
                    >
                      <v-col
                        v-for="complement in item.complements"
                        :key="`complement-${complement.id}`"
                        cols="12"
                        class="d-flex justify-space-between aling-center"
                      >
                        <span
                          v-font-size="12"
                          class="grey--text text-uppercase font-weight-regular"
                        >
                          {{ complement.name }}
                        </span>

                        <span
                          v-font-size="12"
                          class="grey--text text-uppercase font-weight-regular"
                        >
                          ({{ complement.qtd }})
                        </span>
                      </v-col>
                    </v-row>
                  </div>
                </v-expand-transition>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script lang="ts">
  import { Component, Watch } from "vue-property-decorator"
  import { mixins } from "vue-class-component"
  import { IOrderData, IStatusOrder } from "@/types/type-order"
  import { IproductData } from "@/types/types-product"
  import { $refs } from "@/implements/types"
  import MixinServiceOrderCostumer from "@/mixins/order/mixinServiceOrderCostumer"
  import { namespace } from "vuex-class"
  import "@/styles/components/caroucels.styl"

  const dialogStore = namespace("dialogStoreModule")

  @Component({
    components: {
      CardOrderAdminComponent: () => import(
        /* webpackChuckName: "card-order-admin-component" */
        /* webpackMode: "eager" */
        "@/components/cards/CardOrderAdmin.vue"
      )
    }
  })

  export default class ContentAdminSessionOrders extends mixins(
    MixinServiceOrderCostumer,
  ) implements $refs {
    @dialogStore.Action("ActionDialogTryAgain") setDialogTryAgain
    @dialogStore.Getter("DialogTryAgain") getDialogTryAgain

    $refs
    productsDialog: IproductData[]  = []
    showComplements = false
    messageUpdateOrders = ""
    orderFiltered = [] as IOrderData[]
    allOrders: IOrderData[] = []

    statusCard = {} as IStatusOrder
    @Watch("statusCard")
      changeStatusOrderCostumer (): void {
        this.setChangeStatusOrder(this.statusCard)
          .then(responseMixin => {
            if (/error/.test(String(responseMixin || ""))) {
              this.setDialogTryAgain(true)
              return
            }
          }).finally(() => {
            if (this.getDialogTryAgain()) return
            this.renderOrderCostumers()
          })
      }

    intervalOrder = 0
    mounted (): void {
      this.renderOrderCostumers()
      this.intervalOrder = window.setInterval(() => {
        const SESSION_CACHE = sessionStorage.getItem("session")
        if (SESSION_CACHE && !/orders/i.test(String(SESSION_CACHE || ""))) {
          window.clearInterval(this.intervalOrder)
          return
        }

        this.renderOrderCostumers() 
      }, 60000)
    }

    renderOrderCostumers (): void {
      this.messageUpdateOrders = "Atualizando os pedidos..."
      this.getAllOrderCostumer()
        .then(responseMixin => {
          if (/error/i.test(String(responseMixin || ""))) throw Error("err")
          if (responseMixin.length > 0) this.allOrders = [...responseMixin as IOrderData[]]
        }).catch(err => {
          window.log(err)
          this.messageUpdateOrders = "houve algum erro ao atualizar os pedidos..."
          this.setDialogTryAgain(true)
        }).finally(() => {
          this.messageUpdateOrders = "Pedidos atualizados..."
        })
    }

    CardsFilteredForStatus (status?:string): IOrderData[] {
      return this.allOrders.filter(item => {
        if (String(item.status || "") === String(status || "")) return item
      })
    }

    filterOrderClient (e?:string):void {
      if (String(e).length <= 0 || String(e) === "") {
        this.orderFiltered = []
        return
      }

      const PRODUCT_FILTER = this.allOrders.filter(item => {
        if (String(item.pedido).includes(String(e))) return item
        else if (String(item.nome).toLowerCase().includes(String(e).toLowerCase())) return item
        else if (String(item.telefone).includes(String(e))) return item
      })

      this.orderFiltered = [ ...PRODUCT_FILTER ]
    }

    openDialogProducts (product): void {
      if (!product) return
      this.productsDialog = [ ...product ]
      this.$refs.dialogOrderProduct.isActive = true
    }
  }
</script>
