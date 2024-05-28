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
          v-if="messageUpdateOrders !== ''"
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
          class="pt-5"
        >
          <v-row
            no-gutters
            align="center"
          >
            <v-col
              cols="12"
              md="5"
              order="3"
              order-md="1"
            >
              <v-text-field
                label="Pesquisar pedido"
                outlined
                placeholder="Pesquise pelo telefone ou nome do cliente"
                width="300"
                hide-details
                @input="filterOrderClient"
              />
            </v-col>

            <v-col
              cols="12"
              class="py-3 hidden-md-and-up"
              order="2"
              order-md="1"
            />

            <v-col
              cols="12"
              md="7"
              class="text-end"
              order="1"
              order-md="2"
            >
              <v-menu
                bottom
                :offset-y="true"
              >
                <template v-slot:activator="{ on }">
                  <v-btn
                    icon
                    x-large
                    color="primary"
                    dark
                    v-on="on"
                  >
                    <v-icon>
                      menu
                    </v-icon>
                  </v-btn>
                </template>

                <v-list>
                  <v-list-item
                    v-for="(item, index) in [{ title: 'Pedido foodpark', id: 'foodpark' }]"
                    :key="index"
                    link
                    @click="redirectOrder(item.id)"
                  >
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
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
              class="text-center"
            >
              <h2
                v-font-size="$vuetify.breakpoint.smAndDown ? 16 : 22"
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

            <v-col
              v-if="CardsFilteredForStatus('concluido').length > 0"
              cols="12"
              class="py-8"
            />

            <v-col
              v-if="CardsFilteredForStatus('cancelado').length > 0"
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
                    Pedidos cancelados
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
                      v-for="{ pedido, segmento, nome, status, telefone, produtos } in CardsFilteredForStatus('cancelado')"
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
                    v-for="{ pedido, segmento, nome, status, telefone, produtos } in CardsFilteredForStatus('cancelado')"
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
        width="400"
      >
        <v-card>
          <v-row
            no-gutters
          >
            <v-col
              cols="12"
              class="text-end pa-1"
            >
              <v-btn
                icon
                color="primary"
                @click="$refs.dialogOrderProduct.save()"
              >
                <v-icon>
                  close
                </v-icon>
              </v-btn>
            </v-col>

            <v-col
              cols="12"
            >
              <v-row
                no-gutters
                class="pa-4"
              >
                <v-col
                  v-for="item in productsDialog"
                  :key="`card-product-${item.id}`"
                  cols="12"
                >
                  <card-product-cart
                    :name="item.name"
                    :qtd_product="item.price.qtd_product"
                    :price_total="item.price.total"
                    :price_default="sumPriceDefaultWhiteDiffences(item)"
                    :complements="item.complements"
                    :differences="item.differences"
                  />
                </v-col>
              </v-row>
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
  import { namespace } from "vuex-class"
  import MixinServiceOrderCostumer from "@/mixins/order/mixinServiceOrderCostumer"
  import MixinHelperServiceProduct from "@/mixins/help-mixin/MixinHelperServiceProduct"
  import "@/styles/components/caroucels.styl"

  const dialogStore = namespace("dialogStoreModule")

  @Component({
    components: {
      CardOrderAdminComponent: () => import(
        /* webpackChuckName: "card-order-admin-component" */
        /* webpackMode: "eager" */
        "@/components/cards/CardOrderAdmin.vue"
      ),
      CardProductCart: () => import(
        /* webpackChuckName: "card-product-cart-component" */
        /* webpackMode: "eager" */
        "@/components/cards/CardProductCart.vue"
      )
    }
  })

  export default class ContentAdminSessionOrders extends mixins(
    MixinServiceOrderCostumer,
    MixinHelperServiceProduct,
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
            this.renderCardOrderCostumers()
          })
      }

    intervalOrder = 0
    mounted (): void {
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
      this.messageUpdateOrders = "Atualizando os pedidos..."
      this.getAllOrderCostumer()
        .then(responseMixin => {
          if (/error/i.test(String(responseMixin || ""))) throw Error("err")
          if (responseMixin.length > 0) this.allOrders = [...responseMixin as IOrderData[]]
        }).catch(err => {
          window.log("ERROR renderCardOrderCostumers", err)
          this.messageUpdateOrders = "houve algum erro ao atualizar os pedidos..."
          this.setDialogTryAgain(true)
        }).finally(() => {
          this.messageUpdateOrders = ""
        })
    }

    CardsFilteredForStatus (status?:string): IOrderData[] {
      if (!status) return this.allOrders

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

    redirectOrder (url: string): void {
      window.open(`${location.origin}/detalhes/${url}/pedido`, "_blank")
    }

    openDialogProducts (product): void {
      if (!product) return
      this.productsDialog = [ ...product ]
      this.$refs.dialogOrderProduct.isActive = true
    }
  }
</script>
