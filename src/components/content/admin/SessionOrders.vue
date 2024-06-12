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
              @click="locationInputSearchPedidos = 'orders'"
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
                open-on-hover
                bottom
                offset-y
              >
                <template v-slot:activator="{ on }">
                  <v-btn
                    color="primary"
                    outlined
                    large
                    v-on="on"
                  >
                    <div
                      class="d-flex justify-space-between align-center"
                    >
                      <span
                        class="font-weight-medium"
                      >
                        Opções
                      </span>

                      <v-icon>
                        arrow_drop_down
                      </v-icon>
                    </div>
                  </v-btn>
                </template>

                <v-list>
                  <v-list-item
                    link
                    @click="redirectOrder('foodpark')"
                  >
                    <v-list-item-title
                      class="text-uppercase"
                    >
                      Pedidos FoodPark
                    </v-list-item-title>
                  </v-list-item>

                  <v-list-item
                    link
                    @click="dialogUnificationOrders = !dialogUnificationOrders"
                  >
                    <v-list-item-title
                      class="text-uppercase"
                    >
                      Unificar Pedidos
                    </v-list-item-title>
                  </v-list-item>

                  <v-list-item
                    link
                    @click="renderAllOrders(), dialogAllOrdersExting = !dialogAllOrdersExting"
                  >
                    <v-list-item-title
                      class="text-uppercase"
                    >
                      Todos Pedidos Existentes
                    </v-list-item-title>
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
              class="py-2"
            />

            <v-col
              cols="12"
              class="d-flex align-center flex-wrap"
            >
              <div
                v-for="{ pedido, segmento, nome, status, telefone, produtos, pagamento, vip } in orderFiltered"
                :key="`order-client-${pedido}`"
                class="ma-2"
              >
                <card-order-admin-component
                  :segment="segmento"
                  :order="pedido"
                  :name="nome"
                  :phone="telefone"
                  :statusOrder="status"
                  :statusPayment="pagamento.statusPagamento"
                  :statusVip="vip"
                  @dialogProductEmit="openDialogProducts(produtos)"
                  @changeStatusOrderEmit="v=>statusCard=v"
                  @changeStatusPaymentEmit="updateStatusPayment(pedido)"
                  @changeStatusVipEmit="updateStatusVipCostumer(pedido, vip)"
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
              v-if="CardsFilteredByStatus('preparando').length > 0"
              cols="12"
              :style="$vuetify.breakpoint.mdAndUp ? 'max-height: 700px;overflow-y: scroll;' : ''"
            >
              <v-row
                no-gutters
              >
                <v-col
                  cols="12"
                  class="text-start"
                >
                  <h2
                    v-font-size="$vuetify.breakpoint.smAndDown ? 16 : 22"
                    class="font-weight-bold text-uppercase"
                  >
                    Pedidos sendo preparados
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
                      v-for="{ pedido, segmento, nome, status, telefone, produtos, pagamento, vip } in CardsFilteredByStatus('preparando')"
                      :key="`caroucel-order-client-${pedido}`"
                      class="mr-5"
                    >
                      <v-scroll-x-transition
                        v-if="/preparando/i.test(String(status))"
                      >
                        <div
                          style="width: 300px;"
                          class="pa-3 ma-2"
                        >
                          <card-order-admin-component
                            :segment="segmento"
                            :order="pedido"
                            :name="nome"
                            :phone="telefone"
                            :statusOrder="status"
                            :statusPayment="pagamento.statusPagamento"
                            :statusVip="vip"
                            @dialogProductEmit="openDialogProducts(produtos)"
                            @changeStatusOrderEmit="v=>statusCard=v"
                            @changeStatusPaymentEmit="updateStatusPayment(pedido)"
                            @changeStatusVipEmit="updateStatusVipCostumer(pedido, vip)"
                          />
                        </div>
                      </v-scroll-x-transition>
                    </v-slide-item>
                  </v-slide-group>
                </v-col>

                <v-col
                  cols="12"
                  class="hidden-sm-and-down d-md-flex align-center flex-wrap"
                >
                  <div
                    v-for="{ pedido, segmento, nome, status, telefone, produtos, vip, pagamento } in CardsFilteredByStatus('preparando')"
                    :key="`order-client-${pedido}`"
                    class="pa-3 ma-2"
                  >

                  <v-scroll-x-transition
                    v-if="/preparando/i.test(String(status))"
                  >
                    <card-order-admin-component
                      :segment="segmento"
                      :order="pedido"
                      :name="nome"
                      :phone="telefone"
                      :statusOrder="status"
                      :statusPayment="pagamento.statusPagamento"
                      :statusVip="vip"
                      @dialogProductEmit="openDialogProducts(produtos)"
                      @changeStatusOrderEmit="v=>statusCard=v"
                      @changeStatusPaymentEmit="updateStatusPayment(pedido)"
                      @changeStatusVipEmit="updateStatusVipCostumer(pedido, vip)"
                    />
                  </v-scroll-x-transition>
                  </div>
                </v-col>
              </v-row>
            </v-col>

            <v-col
              v-if="CardsFilteredByStatus('preparando').length > 0"
              cols="12"
              class="py-8"
            />

            <v-col
              v-if="CardsFilteredByStatus('entrega').length > 0"
              cols="12"
              :style="$vuetify.breakpoint.mdAndUp ? 'max-height: 700px;overflow-y: scroll;' : ''"
            >
              <v-row
                no-gutters
              >
                <v-col
                  cols="12"
                  class="text-start"
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
                      v-for="{ pedido, segmento, nome, status, telefone, produtos, vip, pagamento } in CardsFilteredByStatus('entrega')"
                      :key="`caroucel-order-client-${pedido}`"
                      class="mr-5"
                    >
                      <v-scroll-x-transition
                        v-if="/entrega/i.test(String(status))"
                      >
                        <div
                          style="width: 300px;"
                          class="pa-3 ma-2"
                        >
                          <card-order-admin-component
                            :segment="segmento"
                            :order="pedido"
                            :name="nome"
                            :phone="telefone"
                            :statusOrder="status"
                            :statusPayment="pagamento.statusPagamento"
                            :statusVip="vip"
                            @dialogProductEmit="openDialogProducts(produtos)"
                            @changeStatusOrderEmit="v=>statusCard=v"
                            @changeStatusPaymentEmit="updateStatusPayment(pedido)"
                            @changeStatusVipEmit="updateStatusVipCostumer(pedido, vip)"
                          />
                        </div>
                      </v-scroll-x-transition>
                    </v-slide-item>
                  </v-slide-group>
                </v-col>

                <v-col
                  cols="12"
                  class="hidden-sm-and-down d-md-flex align-center flex-wrap"
                >
                  <div
                    v-for="{ pedido, segmento, nome, status, telefone, produtos, vip, pagamento } in CardsFilteredByStatus('entrega')"
                    :key="`order-client-${pedido}`"
                    class="pa-3 ma-2"
                  >
                    <v-scroll-x-transition
                      v-if="/entrega/i.test(String(status))"
                    >
                      <card-order-admin-component
                        :segment="segmento"
                        :order="pedido"
                        :name="nome"
                        :phone="telefone"
                        :statusOrder="status"
                        :statusPayment="pagamento.statusPagamento"
                        :statusVip="vip"
                        @dialogProductEmit="openDialogProducts(produtos)"
                        @changeStatusOrderEmit="v=>statusCard=v"
                        @changeStatusPaymentEmit="updateStatusPayment(pedido)"
                        @changeStatusVipEmit="updateStatusVipCostumer(pedido, vip)"
                      />
                    </v-scroll-x-transition>
                  </div>
                </v-col>
              </v-row>
            </v-col>

            <v-col
              v-if="CardsFilteredByStatus('entrega').length > 0"
              cols="12"
              class="py-8"
            />

            <v-col
              v-if="CardsFilteredByStatus('concluido').length > 0"
              cols="12"
              :style="$vuetify.breakpoint.mdAndUp ? 'max-height: 700px;overflow-y: scroll;' : ''"
            >
              <v-row
                no-gutters
              >
              <v-col
                  cols="12"
                  class="text-start"
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
                      v-for="{ pedido, segmento, nome, status, telefone, produtos, vip, pagamento } in CardsFilteredByStatus('concluido').reverse()"
                      :key="`caroucel-order-client-${pedido}`"
                      class="mr-5"
                    >
                      <v-scroll-x-transition
                        v-if="/concluido/i.test(String(status))"
                      >
                        <div
                          style="width: 300px;"
                          class="pa-3 ma-2"
                        >
                          <card-order-admin-component
                            :segment="segmento"
                            :order="pedido"
                            :name="nome"
                            :phone="telefone"
                            :statusOrder="status"
                            :statusPayment="pagamento.statusPagamento"
                            :statusVip="vip"
                            @dialogProductEmit="openDialogProducts(produtos)"
                            @changeStatusOrderEmit="v=>statusCard=v"
                            @changeStatusPaymentEmit="updateStatusPayment(pedido)"
                            @changeStatusVipEmit="updateStatusVipCostumer(pedido, vip)"
                          />
                        </div>
                      </v-scroll-x-transition>
                    </v-slide-item>
                  </v-slide-group>
                </v-col>

                <v-col
                  cols="12"
                  class="hidden-sm-and-down d-md-flex align-center flex-wrap"
                >
                  <div
                    v-for="{ pedido, segmento, nome, status, telefone, produtos, vip, pagamento } in CardsFilteredByStatus('concluido').reverse()"
                    :key="`order-client-${pedido}`"
                    class="pa-3 ma-2"
                  >
                    <v-scroll-x-transition
                      v-if="/concluido/i.test(String(status))"
                    >
                      <card-order-admin-component
                        :segment="segmento"
                        :order="pedido"
                        :name="nome"
                        :phone="telefone"
                        :statusOrder="status"
                        :statusPayment="pagamento.statusPagamento"
                        :statusVip="vip"
                        @dialogProductEmit="openDialogProducts(produtos)"
                        @changeStatusOrderEmit="v=>statusCard=v"
                        @changeStatusPaymentEmit="updateStatusPayment(pedido)"
                        @changeStatusVipEmit="updateStatusVipCostumer(pedido, vip)"
                      />
                    </v-scroll-x-transition>
                  </div>
                </v-col>
              </v-row>
            </v-col>

            <v-col
              v-if="CardsFilteredByStatus('concluido').length > 0"
              cols="12"
              class="py-8"
            />

            <v-col
              v-if="CardsFilteredByStatus('cancelado').length > 0"
              cols="12"
              :style="$vuetify.breakpoint.mdAndUp ? 'max-height: 700px;overflow-y: scroll;' : ''"
            >
              <v-row
                no-gutters
              >
                <v-col
                  cols="12"
                  class="text-start"
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
                      v-for="{ pedido, segmento, nome, status, telefone, produtos, vip, pagamento } in CardsFilteredByStatus('cancelado')"
                      :key="`caroucel-order-client-${pedido}`"
                      class="mr-5"
                    >
                      <v-scroll-x-transition
                        v-if="/cancelado/i.test(String(status))"
                      >
                        <div
                          style="width: 300px;"
                          class="pa-3"
                        >
                          <card-order-admin-component
                            :segment="segmento"
                            :order="pedido"
                            :name="nome"
                            :phone="telefone"
                            :statusOrder="status"
                            :statusPayment="pagamento.statusPagamento"
                            :statusVip="vip"
                            @dialogProductEmit="openDialogProducts(produtos)"
                            @changeStatusOrderEmit="v=>statusCard=v"
                          />
                        </div>
                      </v-scroll-x-transition>
                    </v-slide-item>
                  </v-slide-group>
                </v-col>

                <v-col
                  cols="12"
                  class="hidden-sm-and-down d-md-flex align-center flex-wrap"
                >
                  <div
                    v-for="{ pedido, segmento, nome, status, telefone, produtos, vip, pagamento } in CardsFilteredByStatus('cancelado')"
                    :key="`order-client-${pedido}`"
                    class="pa-3"
                  >
                    <v-scroll-x-transition
                        v-if="/cancelado/i.test(String(status))"
                    >
                      <card-order-admin-component
                        :segment="segmento"
                        :order="pedido"
                        :name="nome"
                        :phone="telefone"
                        :statusOrder="status"
                        :statusPayment="pagamento.statusPagamento"
                        :statusVip="vip"
                        @dialogProductEmit="openDialogProducts(produtos)"
                        @changeStatusOrderEmit="v=>statusCard=v"
                      />
                    </v-scroll-x-transition>
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

      <v-dialog
        v-model="dialogAllOrdersExting"
        fullscreen
      >
        <v-card
          class="pa-4"
        >
          <v-row
            no-gutters
          >
            <v-col
              cols="12"
              class="text-end pa-2"
            >
              <v-btn
                icon
                x-large
                @click="dialogAllOrdersExting = !dialogAllOrdersExting"
              >
                <v-icon>
                  close
                </v-icon>
              </v-btn>
            </v-col>

            <v-col
              cols="12"
              class="py-2"
            />

            <v-col
              cols="12"
            >
              <v-row
                no-gutters
                justify="center"
                style="width:100%;max-width:1440px"
                class="mx-auto"
              >
                <v-col
                  v-if="allOrdersAncient.length <= 0"
                  cols="12"
                >
                  <v-row
                    no-gutters
                    class="pa-4"
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
                      class="text-center"
                    >
                      <span
                        class="font-weight-regular mt-3"
                      >
                        Aguarde, Estamos carregando todos os pedidos...
                      </span>
                    </v-col>
                  </v-row>
                </v-col>

                <v-col
                  v-if="allOrdersAncient.length <= 0"
                  cols="12"
                  class="py-2"
                />

                <v-col
                  v-if="allOrdersAncient.length > 0"
                  cols="12"
                  class="pa-4"
                >
                  <v-row
                    no-gutters
                    justify="space-between"
                  >
                    <v-col
                      cols="8"
                    >
                      <v-row
                        no-gutters
                        align="center"
                      >
                        <v-col
                          cols="3"
                          style="height:65px;border-bottom:4px solid var(--v-error-darken1)"
                          class="mx-1 pa-1"
                        >
                          <v-row
                            no-gutters
                          >
                            <v-col
                              cols="12"
                            >
                              <span
                                v-font-size="12"
                                class="text-uppercase font-weight-bold"
                              >
                                Pagamentos pendentes
                              </span>
                            </v-col>

                            <v-col
                              cols="12"
                            >
                              <span
                                v-text="formatedPrice(salesBanlancete.valorPendente)"
                              />
                            </v-col>
                          </v-row>
                        </v-col>

                        <v-col
                          cols="3"
                          style="height:65px;border-bottom:4px solid var(--v-success-darken1)"
                          class="mx-1 pa-1"
                        >
                          <v-row
                            no-gutters
                          >
                            <v-col
                              cols="12"
                            >
                              <span
                                v-font-size="12"
                                class="text-uppercase font-weight-bold"
                              >
                                Pagamentos concluídos
                              </span>
                            </v-col>

                            <v-col
                              cols="12"
                            >
                              <span
                                v-text="formatedPrice(salesBanlancete.valorVendas)"
                              />
                            </v-col>
                          </v-row>
                        </v-col>

                        <v-col
                          cols="3"
                          style="height:65px;border-bottom:4px solid var(--v-info-darken1)"
                          class="mx-1 pa-1"
                        >
                          <v-row
                            no-gutters
                          >
                            <v-col
                              cols="12"
                            >
                              <span
                                v-font-size="12"
                                class="text-uppercase font-weight-bold"
                              >
                                Total de vendas
                              </span>
                            </v-col>

                            <v-col
                              cols="12"
                            >
                              <span
                                v-text="salesBanlancete.quantidade"
                              />
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-col>

                    <v-col
                      cols="3"
                      @click="locationInputSearchPedidos = 'allOrders'"
                    >
                      <v-text-field
                        label="Pesquisar pedido"
                        outlined
                        width="300"
                        hide-details
                        @input="filterOrderClient"
                      />
                    </v-col>
                  </v-row>
                </v-col>

                <v-col
                  cols="12"
                  class="pa-4"
                >
                  <v-row
                    v-if="ordersFilteredAncient.length > 0"
                    no-gutters
                    align="center"
                  >
                    <v-col
                      v-for="{ pedido, segmento, nome, status, telefone, produtos, vip, pagamento } in ordersFilteredAncient"
                      :key="`order-client-ancient-${pedido}`"
                      class="my-3"
                      cols="12"
                      md="3"
                    >
                      <card-order-admin-component
                        :segment="segmento"
                        :order="pedido"
                        :name="nome"
                        :phone="telefone"
                        :statusOrder="status"
                        :statusPayment="pagamento.statusPagamento"
                        :statusVip="vip"
                        @dialogProductEmit="openDialogProducts(produtos)"
                        @changeStatusOrderEmit="v=>statusCard=v"
                        @changeStatusPaymentEmit="updateStatusPayment(pedido)"
                        @changeStatusVipEmit="updateStatusVipCostumer(pedido, vip)"
                      />
                    </v-col>
                  </v-row>

                  <v-row
                    v-else
                    no-gutters
                    align="center"
                  >
                    <v-col
                      v-for="{ pedido, segmento, nome, status, telefone, produtos, vip, pagamento } in allOrdersAncient"
                      :key="`order-client-ancient-${pedido}`"
                      class="my-3"
                      cols="12"
                      md="3"
                    >
                      <card-order-admin-component
                        :segment="segmento"
                        :order="pedido"
                        :name="nome"
                        :phone="telefone"
                        :statusOrder="status"
                        :statusPayment="pagamento.statusPagamento"
                        :statusVip="vip"
                        @dialogProductEmit="openDialogProducts(produtos)"
                        @changeStatusOrderEmit="v=>statusCard=v"
                        @changeStatusPaymentEmit="updateStatusPayment(pedido)"
                        @changeStatusVipEmit="updateStatusVipCostumer(pedido, vip)"
                      />
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>

      <v-dialog
        ref="dialogMessagePrintingPending"
        persistent
        width="400"
      >
        <v-card>
          <v-row
            no-gutters
            style="min-height:50px;border:2px solid var(--v-secondary-base)"
            class="pa-4"
          >
            <v-col
              cols="12"
              class="text-center"
            >
              <h2
                class="font-weight-bold text-uppercase"
              >
                Atenção
              </h2>
            </v-col>

            <v-col
              cols="12"
              class="py-2"
            />

            <v-col
              cols="12"
              class="text-center"
              style="line-height:18px"
            >
              <span
                v-font-size="18"
                class="font-weight-regular"
              >
                Você tem pedidos que não foram imprimidos até o momento.
              </span>
            </v-col>

            <v-col
              cols="12"
              class="py-2"
            />

            <v-col
              cols="12"
            >
              <v-btn
                depressed
                block
                large
                color="secondary"
                @click="$refs.dialogMessagePrintingPending.save()"
              >
                <span
                  class="font-weight-bold primary--text"
                >
                  Fechar
                </span>
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>

      <dialog-unification-orders
        v-if="dialogUnificationOrders"
        :openDialogUnificationOrder="dialogUnificationOrders"
        @changeDialogUnificationEmit="dialogUnificationOrders = !dialogUnificationOrders"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts">
  /* eslint-disable @typescript-eslint/no-explicit-any*/
  import { Component, Watch } from "vue-property-decorator"
  import { mixins } from "vue-class-component"
  import { IOrderData, IStatusOrder, dataDatailsOrders } from "@/types/type-order"
  import { IproductData } from "@/types/types-product"
  import { $refs } from "@/implements/types"
  import { formatedPrice } from "@/helpers/formatedPrice"
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
      ),
      DialogUnificationOrders: () => import(
        /* webpackChuckName: "dialog-unification-order-component" */
        /* webpackMode: "eager" */
        "@/components/dialogs/DialogUnificationOrders.vue"
      ),
    }
  })

  export default class ContentAdminSessionOrders extends mixins(
    MixinServiceOrderCostumer,
    MixinHelperServiceProduct,
  ) implements $refs {
    @dialogStore.Action("ActionDialogTryAgain") setDialogTryAgain
    @dialogStore.Getter("DialogTryAgain") getDialogTryAgain

    $refs
    formatedPrice = formatedPrice

    dialogUnificationOrders = false
    dialogAllOrdersExting = false
    productsDialog: IproductData[]  = []
    showComplements = false
    messageUpdateOrders = ""
    locationInputSearchPedidos = ""
    orderFiltered = [] as IOrderData[]
    allOrders: IOrderData[] = []

    allOrdersAncient: IOrderData[] = []
    ordersFilteredAncient = [] as IOrderData[]
    salesBanlancete: any = {}



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
      const ORDER_PRINTED = sessionStorage.getItem("order-printed")

      if (!ORDER_PRINTED) {
        sessionStorage.setItem("order-printed", JSON.stringify([] as string[]))
      }

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

    renderAllOrders (): void {
      this.allOrdersAncient = []

      this.getAllOrdersExisting()
        .then(responseMixin => {
          if (/error/i.test(String(responseMixin || ""))) throw Error()

          const { orders, pedidos } = responseMixin as dataDatailsOrders

          this.allOrdersAncient = [ ...orders as  IOrderData[] ]
          this.salesBanlancete = pedidos
        }).catch(err => {
          window.log("ERROR renderAllOrders", err)
          this.setDialogTryAgain(true)
        })
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
          this.testPendingPrinting()
          this.messageUpdateOrders = ""
        })
    }

    testPendingPrinting (): void {
      this.allOrders.forEach(item => {
        const ORDER_PRINTED = sessionStorage.getItem("order-printed")

        if (!ORDER_PRINTED) {
          this.messageUpdateOrders = "houve algum erro ao atualizar os pedidos..."
          this.setDialogTryAgain(true)
          return
        }

        if (!JSON.parse(ORDER_PRINTED).includes(String(item.pedido || ""))) {
          this.$refs.dialogMessagePrintingPending.isActive = true
        }
      })
    }

    CardsFilteredByStatus (status?:string): IOrderData[] {
      if (!status) return this.allOrders

      const ORDERS_STATUS_FILTERED = this.allOrders.filter(item => {
        if (String(item.status || "") === String(status || "")) return item
      })

      return ORDERS_STATUS_FILTERED.sort((prev_order, next_order) => {
        return Number(String(prev_order.updated_at).replace(/\D/g, "")) - Number(String(next_order.updated_at).replace(/\D/g, ""))
      })
    }

    filterOrderClient (e?:string):void {
      if (String(e).length <= 0 || String(e) === "") {
        this.orderFiltered = []
        this.ordersFilteredAncient = []
        return
      }

      if (this.locationInputSearchPedidos === "orders") {
        const PRODUCT_FILTER = this.allOrders.filter(item => {
          if (String(item.pedido).includes(String(e))) return item
          else if (String(item.nome).toLowerCase().includes(String(e).toLowerCase())) return item
          else if (String(item.telefone).includes(String(e))) return item
          else if (String(item.pagamento.statusPagamento).includes(String(e))) return item
        })

        this.orderFiltered = [ ...PRODUCT_FILTER ]
      } else {
        const PRODUCT_FILTER = this.allOrdersAncient.filter(item => {
          if (String(item.pedido).includes(String(e))) return item
          else if (String(item.nome).toLowerCase().includes(String(e).toLowerCase())) return item
          else if (String(item.telefone).includes(String(e))) return item
          else if (String(item.pagamento.statusPagamento).includes(String(e))) return item
        })

        this.ordersFilteredAncient = [ ...PRODUCT_FILTER ]
      }

    }

    redirectOrder (url: string): void {
      window.open(`${location.origin}/detalhes/${url}/pedido`, "_blank")
    }

    openDialogProducts (product): void {
      if (!product) return
      this.productsDialog = [ ...product ]
      this.$refs.dialogOrderProduct.isActive = true
    }

    updateStatusPayment (orderID: string|number): void {
      this.updateStatusPaymentOrder({
        id: String(orderID || ""),
        status: "concluido"
      }).then(responseMixin => {
        if (/error/i.test(String(responseMixin || ""))) {
          this.setDialogTryAgain(true)
          return
        }

        this.renderCardOrderCostumers()
      })
    }

    updateStatusVipCostumer (pedido:string, vip:boolean) {
      const DATA_VIP = {
        id: pedido,
        status: vip ? false : true
      }

      this.updateStatusCostumeVip(DATA_VIP)
        .then(responseMixin => {
          if (/error/i.test(String(responseMixin || ""))) {
            this.setDialogTryAgain(true)
            return
          }

          this.renderCardOrderCostumers()
        })
    }
  }
</script>
