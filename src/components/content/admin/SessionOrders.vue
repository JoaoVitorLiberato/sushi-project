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
                placeholder="Pesquise pelo número do pedido ou nome"
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
        >
          <v-row
            v-if="orderFiltered.length > 0"
            no-gutters
          >
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
                  v-for="{ pedido, segmento, nome, status, telefone, produtos } in orderFiltered"
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
                    />
                  </div>
                </v-slide-item>
              </v-slide-group>
            </v-col>

            <v-col
              v-for="{ pedido, segmento, nome, status, telefone, produtos } in orderFiltered"
              :key="`order-client-${pedido}`"
              cols="12"
              md="3"
              class="hidden-sm-and-down"
            >
              <card-order-admin-component
                :segment="segmento"
                :order="pedido"
                :name="nome"
                :phone="telefone"
                :statusOrder="status"
                @dialogProductEmit="openDialogProducts(produtos)"
              />
            </v-col>
          </v-row>

          <v-row
            v-else
            no-gutters
          >
            <v-col
              cols="12"
              class="py-3"
            />

            <v-col
              cols="12"
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
                      v-for="{ pedido, segmento, nome, status, telefone, produtos } in ordersPreparing"
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
                        />
                      </div>
                    </v-slide-item>
                  </v-slide-group>
                </v-col>

                <v-col
                  v-for="{ pedido, segmento, nome, status, telefone, produtos } in ordersPreparing"
                  :key="`order-client-${pedido}`"
                  cols="12"
                  md="3"
                  class="hidden-sm-and-down"
                >
                  <card-order-admin-component
                    :segment="segmento"
                    :order="pedido"
                    :name="nome"
                    :phone="telefone"
                    :statusOrder="status"
                    @dialogProductEmit="openDialogProducts(produtos)"
                  />
                </v-col>
              </v-row>
            </v-col>

            <v-col
              cols="12"
              class="py-6"
            />

            <v-col
              cols="12"
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
                      v-for="{ pedido, segmento, nome, status, telefone, produtos } in ordersDelivery"
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
                        />
                      </div>
                    </v-slide-item>
                  </v-slide-group>
                </v-col>

                <v-col
                  v-for="{ pedido, segmento, nome, status, telefone, produtos } in ordersDelivery"
                  :key="`order-client-${pedido}`"
                  cols="12"
                  md="3"
                  class="hidden-sm-and-down"
                >
                  <card-order-admin-component
                    :segment="segmento"
                    :order="pedido"
                    :name="nome"
                    :phone="telefone"
                    :statusOrder="status"
                    @dialogProductEmit="openDialogProducts(produtos)"
                  />
                </v-col>
              </v-row>
            </v-col>

            <v-col
              cols="12"
              class="py-6"
            />

            <v-col
              cols="12"
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
                      v-for="{ pedido, segmento, nome, status, telefone, produtos } in ordersConcluded"
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
                        />
                      </div>
                    </v-slide-item>
                  </v-slide-group>
                </v-col>

                <v-col
                  v-for="{ pedido, segmento, nome, status, telefone, produtos } in ordersConcluded"
                  :key="`order-client-${pedido}`"
                  cols="12"
                  md="3"
                  class="hidden-sm-and-down"
                >
                  <card-order-admin-component
                    :segment="segmento"
                    :order="pedido"
                    :name="nome"
                    :phone="telefone"
                    :statusOrder="status"
                    @dialogProductEmit="openDialogProducts(produtos)"
                  />
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
  import { Component } from "vue-property-decorator"
  import { mixins } from "vue-class-component"
  import { IOrderData } from "@/types/type-order"
  import { IproductData } from "@/types/types-product"
  import { $refs } from "@/implements/types"
  import "@/styles/components/caroucels.styl"

  @Component({
    components: {
      CardOrderAdminComponent: () => import(
        /* webpackChuckName: "card-order-admin-component" */
        /* webpackMode: "eager" */
        "@/components/cards/CardOrderAdmin.vue"
      )
    }
  })

  export default class ContentAdminSessionOrders extends mixins() implements $refs {
    $refs
    productsDialog: IproductData[]  = []
    showComplements = false

    orderFiltered = [] as IOrderData[]
    ordersPreparing = [] as IOrderData[]
    ordersDelivery = [] as IOrderData[]
    ordersConcluded = [] as IOrderData[]

    get ordersFake (): IOrderData[] {
      const ORDER_FAKE = sessionStorage.getItem("order-fake")

      if (ORDER_FAKE) {
        return [
          ...JSON.parse(ORDER_FAKE)
        ]
      }

      return []
    }

    mounted (): void {
      this.filterCardsForStatus()
    }

    filterCardsForStatus (): void {
      const ORDER_FAKE = sessionStorage.getItem("order-fake")
      if (ORDER_FAKE) {
        this.ordersConcluded = []
        this.ordersDelivery = []
        this.ordersPreparing = []

        JSON.parse(ORDER_FAKE).filter(item => {
          if ((item.status).includes("concluido")) {
            this.ordersConcluded.push(item)
          }
          if ((item.status).includes("entrega")) {
            this.ordersDelivery.push(item)
          }
          if ((item.status).includes("preparando")) {
            this.ordersPreparing.push(item)
          }
        })
      }
    }

    filterOrderClient (e?:string):void {
      if (String(e).length <=0 || String(e) === "") {
        this.orderFiltered = []
        return
      }

      const PRODUCT_FILTER = this.ordersFake.filter(item => {
        if (String(item.pedido).includes(String(e))) return item
        else if (String(item.nome).toLowerCase().includes(String(e).toLowerCase())) return item
      })

      this.orderFiltered = [ ...PRODUCT_FILTER ]
    }

    openDialogProducts (product): void {
      this.productsDialog = [ ...product ]
      this.$refs.dialogOrderProduct.isActive = true
    }
  }
</script>
