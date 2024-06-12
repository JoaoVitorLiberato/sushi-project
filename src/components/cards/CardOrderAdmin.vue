<template>
  <div>
    <v-card
      class="ma-2"
      :width="$vuetify.breakpoint.smAndDown ? '100%' : 290"
    >
      <div
        style="position: relative;"
      >
        <div
          style="position: absolute;top:-20px;right:0"
          class="d-flex justify-end"
        >
          <div
            v-if="/concluido/i.test(String(statusPayment)) && !/cancelado/i.test(String(status))"
            v-width.max="120"
            :class="`success text-center px-2 mx-1`"
            style="border-radius: 10px 10px 0px 0px;height: 25px;"
          >
            <span
              v-font-size="11"
              class="primary--text text-uppercase font-weight-bold"
            >
              Pago
            </span>
          </div>

          <div
            v-if="/pendente/i.test(String(statusPayment)) && !/cancelado/i.test(String(status))"
            v-width.max="120"
            :class="`error text-center px-2 mx-1`"
            style="border-radius: 10px 10px 0px 0px;height: 25px;"
          >
            <span
              v-font-size="11"
              class="primary--text text-uppercase font-weight-bold"
            >
              A receber
            </span>
          </div>

          <div
            v-if="/pendente|concluido/i.test(String(statusPayment)) && /cancelado/i.test(String(status))"
            v-width.max="120"
            :class="`grey lighten-1 text-center px-2 mx-1`"
            style="border-radius: 10px 10px 0px 0px;height: 25px;"
          >
            <span
              v-font-size="11"
              class="primary--text text-uppercase font-weight-bold"
            >
              Cancelado
            </span>
          </div>

          <div
            v-if="statusVip === true"
            v-width.max="120"
            :class="`info text-center px-2 mx-1`"
            style="border-radius: 10px 10px 0px 0px;height: 25px;"
          >
            <span
              v-font-size="11"
              class="primary--text text-uppercase font-weight-bold"
            >
              Vip
            </span>
          </div>

          <div
            v-if="statusPrint"
            v-width.max="120"
            :class="`secondary text-center px-2 mx-1`"
            style="border-radius: 10px 10px 0px 0px;height: 25px;"
          >
            <span
              v-font-size="11"
              class="primary--text text-uppercase font-weight-bold"
            >
              falta imprimir
            </span>
          </div>
        </div>
      </div>

      <v-card-title
        class="py-2"
      >
        <span
          v-font-size="16"
          class="font-weight-bold text-uppercase"
        >
          Pedido:
        </span>

        <v-spacer />

        <span
          v-font-size="16"
          class="font-weight-medium text-uppercase"
        >
          {{ String(order).substring(0, 8) }}
        </span>
      </v-card-title>

      <v-divider></v-divider>

      <v-list
        dense
      >
        <v-list-item>
          <v-list-item-content>
            <span
              v-font-size="14"
              class="font-weight-bold text-uppercase d-block"
            >
              Nome:
            </span>

            <span
              v-font-size="13"
              class="font-weight-regular text-uppercase d-block"
              style="text-overflow:ellipsis;white-space:nowrap;overflow:hidden;"
            >
              {{ name }}
            </span>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <span
              v-font-size="14"
              class="font-weight-bold text-uppercase d-block"
            >
              Telefone:
            </span>

            <span
              v-font-size="14"
              class="font-weight-regular text-uppercase d-block"
            >
              {{ phone }}
            </span>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <span
              v-font-size="14"
              class="font-weight-bold text-uppercase d-block"
            >
              Segmento:
            </span>

            <span
              v-font-size="13"
              class="font-weight-regular text-uppercase d-block"
            >
              {{ setSegment }}
            </span>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-select
              :items="filterStatusForSegment()"
              :value="status"
              item-text="name"
              :disabled="!/bancada/i.test(String(setSegment)) && /concluido/i.test(String(status))"
              item-value="id"
              hide-details
              outlined
              dense
              @change="changeStatusOrder"
            />
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-card-actions>
        <v-row
          no-gutters
        >
          <v-col
            cols="12"
            class="d-flex"
          >
            <dialog-print-page
              :numeroDoPedido="order"
              @statusPrintedEmit="v=>dialogStatusPrinted=v"
            />

            <v-spacer></v-spacer>

            <v-menu
              right
              :offset-x="true"
            >
              <template v-slot:activator="{ on }">
                <v-btn
                  icon
                  color="secondary"
                  v-on="on"
                >
                  <v-icon>
                    add
                  </v-icon>
                </v-btn>
              </template>

              <v-list
                class="pa-2"
              >
                <v-list-item
                  v-if="!/bancada/i.test(String(setSegment))"
                  link
                  @click="$emit('dialogProductEmit')"
                >
                  <v-list-item-title
                    class="text-uppercase"
                  >
                    Ver Produtos
                  </v-list-item-title>
                </v-list-item>

                <v-list-item
                  link
                  @click="$emit('changeStatusVipEmit')"
                >
                  <v-list-item-title
                    :class="statusVip === true ? 'success--text text-uppercase' : 'text-uppercase'"
                  >
                    {{ statusVip === true ? "Desativar Vip" : "Ativar VIP" }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>

          <v-col
            cols="12"
            class="py-2"
          />

          <v-col
            cols="12"
          >
            <v-btn
              :color="/pendente/i.test(String(statusPayment)) && !/cancelado/i.test(String(status)) ? 'secondary' : 'grey lighten-1'"
              depressed
              block
              large
              @click="/pendente/i.test(String(statusPayment)) && !/cancelado/i.test(String(status)) ? $emit('changeStatusPaymentEmit') : ''"
            >
              <span
                v-if="/pendente/i.test(String(statusPayment)) && !/cancelado/i.test(String(status))"
                class="font-weight-bold primary--text"
              >
                Realizar pagamento
              </span>

              <span
                v-else-if="/pendente|concluido/i.test(String(statusPayment)) && /cancelado/i.test(String(status))"
                class="font-weight-bold primary--text"
              >
                Pedido cancelado
              </span>

              <span
                v-else
                class="font-weight-bold primary--text"
              >
                Pedido pago
              </span>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts">
  import { Component, PropSync, Prop, ModelSync, Watch } from "vue-property-decorator"
  import { mixins } from "vue-class-component"

  import STATUS_ORDERS_DATA from "@/data/orders/statusOrders.json"
  import { IStatusOrder } from "@/types/type-order"

  @Component({
    components: {
      DialogPrintPage: () => import(
        /* webpackChunkName: "print-page-dialog-component" */
        /* webpackMode: "eager" */
        "@/components/dialogs/DialogPrintPage.vue"
      )
    }
  })
  export default class CardOrderAdmin extends mixins() {
    @PropSync("segment", { type: String }) setSegment!:string
    @PropSync("ordersAncient", { type: Boolean }) setOrdersAncient?:boolean
    @Prop({ default: "" }) statusOrder!:string
    @Prop({ default: "" }) phone!:string
    @Prop({ default: "" }) name!:string
    @Prop({ default: "" }) order!:string
    @Prop({ default: "" }) statusPayment!:string
    @Prop({ default: false }) statusVip!:boolean

    @ModelSync("dialogProduct", "dialogProductEmit")
      setDialogProduct?: boolean
    @ModelSync("statusOrder", "changeStatusOrderEmit")
      setStatusClient?:IStatusOrder
    @ModelSync("statusPayment", "changeStatusPaymentEmit")
      setStatusPayment?:IStatusOrder
    @ModelSync("statusVip", "changeStatusVipEmit")
      setStatusVip?:IStatusOrder

    itemsPerPage = 4
    status = ""
    statusPrint = false

    items = [
      {
        pedido: '123456',
        nome: "sem nome",
        telefone: "21999999999"
      },
    ]

    dialogStatusPrinted = false
    @Watch("dialogStatusPrinted")
      verifyStatusPrint (): void {
        this.handlePendingPrinting()
      }

    created (): void {
      if (/preparando/i.test(String(this.statusOrder))) this.status = "preparando"
      if (/concluido/i.test(String(this.statusOrder))) this.status = "concluido"
      if (/entrega/i.test(String(this.statusOrder))) this.status = "entrega"
      if (/cancelado/i.test(String(this.statusOrder))) this.status = "cancelado"

      this.handlePendingPrinting()
    }

    filterStatusForSegment (): typeof STATUS_ORDERS_DATA {
      const STATUS_ORDERS = STATUS_ORDERS_DATA
      const STATUS_FILTER = new Set()

      Object.keys(STATUS_ORDERS).forEach(segment => {
        if (String(segment || "") === String(this.setSegment || "")) {
          STATUS_FILTER.add({
            ...STATUS_ORDERS[segment]
          })
        }
      })

      return Object.assign([], ...STATUS_FILTER)
    }

    changeStatusOrder (e?:string): void {
      this.setStatusClient = {
        id: this.order,
        status: String(e)
      }
    }

    handlePendingPrinting (): void {
      const ORDER_PRINTED = sessionStorage.getItem("order-printed")

      if (this.setOrdersAncient === true || /cancelado/i.test(String(this.status))) {
        this.statusPrint = false
        return
      }

      if (ORDER_PRINTED && JSON.parse(ORDER_PRINTED).includes(String(this.order || ""))) {
        this.statusPrint = false
      } else {
        this.statusPrint = true
      }
    }
  }
</script>
