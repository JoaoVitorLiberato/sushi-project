<template>
  <div>
    <v-card
      class="ma-2"
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
          v-font-size="11"
          class="font-weight-medium text-uppercase"
        >
          {{ order }}
        </span>
      </v-card-title>

      <v-divider></v-divider>

      <v-list dense>
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
      </v-list>

      <v-card-actions
        class="pa-4"
      >
        <v-row
          no-gutters
        >
          <v-col
            cols="12"
          >
            <v-autocomplete
              :items="filterStatusForSegment()"
              v-model="status"
              item-text="name"
              :disabled="/concluido/i.test(String(status))"
              item-value="id"
              hide-details
              outlined
              dense
            />
          </v-col>

          <!-- <v-col
            cols="12"
            class="py-2"
          />

          <v-col
            cols="12"
          >
            <v-btn
              text
              block
              color="secondary"
              @click="$emit('dialogProductEmit')"
            >
              <span
                class="font-weight-bold"
              >
                Ver produtos
              </span>
            </v-btn>
          </v-col> -->
        </v-row>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts">
  import { Vue, Component, PropSync, Prop, ModelSync } from "vue-property-decorator"
  import STATUS_ORDERS_DATA from "@/data/orders/statusOrders.json"

  @Component({})
  export default class CardOrderAdmin extends Vue {
    @PropSync("segment", { type: String }) setSegment!:string
    @Prop({ default: "" }) statusOrder!:string
    @Prop({ default: "" }) phone!:string
    @Prop({ default: "" }) name!:string
    @Prop({ default: "" }) order!:string
    @ModelSync("dialogProduct", "dialogProductEmit")
      setDialogProduct?: boolean

    itemsPerPage = 4
    status = ""

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
  }
</script>
