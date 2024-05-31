<template>
  <div>
    <v-card
      class="ma-2"
      :width="$vuetify.breakpoint.smAndDown ? '100%' : 270"
    >
      <v-card-title
        class="py-2"
        style="line-height: 22px;"
      >
        <span
          v-font-size="16"
          class="font-weight-bold text-uppercase d-block"
        >
          Pedido:
        </span>

        <span
          v-font-size="13"
          class="font-weight-medium text-uppercase"
          style="text-overflow:ellipsis;white-space:nowrap;overflow:hidden;"
        >
          {{ order }}
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
              :disabled="/concluido/i.test(String(status))"
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
          <v-btn
            text
            color="error"
            class="px-2"
          >
            <span
              class="font-weight-medium"
            >
              <dialog-print-page
                :numeroDoPedido="order"
              />
            </span>
          </v-btn>

          <v-spacer></v-spacer>

          <v-btn
            icon
            color="error"
            @click="$emit('dialogProductEmit')"
          >
            <v-icon>
              add
            </v-icon>
          </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts">
  import { Component, PropSync, Prop, ModelSync } from "vue-property-decorator"
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
    @Prop({ default: "" }) statusOrder!:string
    @Prop({ default: "" }) phone!:string
    @Prop({ default: "" }) name!:string
    @Prop({ default: "" }) order!:string

    @ModelSync("dialogProduct", "dialogProductEmit")
      setDialogProduct?: boolean
    @ModelSync("statusOrder", "changeStatusOrderEmit")
      setStatusClient?:IStatusOrder

    itemsPerPage = 4
    status = ""
    isOpenPrint = false

    items = [
      {
        pedido: '123456',
        nome: "sem nome",
        telefone: "21999999999"
      },
    ]

    created (): void {
      if (/preparando/i.test(String(this.statusOrder))) this.status = "preparando"
      if (/concluido/i.test(String(this.statusOrder))) this.status = "concluido"
      if (/entrega/i.test(String(this.statusOrder))) this.status = "entrega"
      if (/cancelado/i.test(String(this.statusOrder))) this.status = "cancelado"
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
  }
</script>
