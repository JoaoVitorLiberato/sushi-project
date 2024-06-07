<template>
  <v-dialog
    v-model="setpenDialogUnificationOrder"
    width="400"
    persistent
  >
    <v-card
      min-height="150"
    >
      <v-row
        no-gutters
        class="pa-4"
      >
        <v-col
          cols="12"
          class="text-end"
          @click="$emit('changeDialogUnificationEmit')"
        >
          <v-btn
            icon
          >
            <v-icon>
              close
            </v-icon>
          </v-btn>
        </v-col>

        <v-col
          cols="12"
          class="py-1"
        />

        <v-col
          cols="12"
        >
          <h2
            class="font-weight-bold text-uppercase"
          >
            Unificar pedidos
          </h2>
        </v-col>

        <v-col
          cols="12"
          class="py-1"
        />

        <v-col
          cols="12"
          style="line-height:1"
        >
          <span
            class="font-weight-regular"
          >
            Para unificar todos os pedidos com pagamento pendente, será necessário
            que todos os pedidos estejam com o mesmo número de telefone.
          </span>
        </v-col>

        <v-col
          cols="12"
          class="py-2"
        />

        <v-col
          cols="12"
          style="line-height:1"
        >
          <v-text-field
            v-mask="'(##) #####-####'"
            type="tel"
            label="Telefone"
            outlined
            :append-icon="/pagamento/i.test(sevice || '') ? 'close' : ''"
            :rules="[phoneCostumer.valid]"
            hide-details="auto"
            @input="changeDataPhone"
          />
        </v-col>

        <v-col
          cols="12"
          class="py-2"
        />

        <v-col
          cols="12"
          style="line-height:1"
        >
          <v-progress-linear
            v-if="/loading/i.test(sevice || '')"
            indeterminate
            color="secondary"
          />

          <v-btn
            v-else-if="/pagamento|concluido/i.test(sevice || '')"
            :color="/concluido/i.test(sevice || '') ? 'grey lighten-1' : 'success'"
            depressed
            large
            block
            @click="/concluido/i.test(sevice || '') ? '' : updatePaymentPedidoUnificado()"
          >
            <span
              class="font-weight-bold primary--text"
            >
              {{ /concluido/i.test(sevice || '') ? "Pago" : "Efetuar pagamento" }} 
            </span>
          </v-btn>

          <v-btn
            v-else
            color="secondary"
            depressed
            large
            block
            @click="hendlePedidoUnificado"
          >
            <span
              class="font-weight-bold primary--text"
            >
              Unificar pedidos
            </span>
          </v-btn>

          <dialog-print-page
            v-show="false"
            :pedidoUnificado="dataPedidoUnificado"
          />
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
  import { mixins } from "vue-class-component"
  import { Component, ModelSync } from "vue-property-decorator"
  import { IOrderDataAll } from "@/types/type-order"
  import MixinServiceOrderCostumer from "@/mixins/order/mixinServiceOrderCostumer"
  import { telefone } from "@/helpers/rules"
  import { namespace } from "vuex-class"

  const dialogStore = namespace("dialogStoreModule")

  @Component({
    components: {
      DialogPrintPage: () => import(
        /* webpackChunkName: "print-page-dialog-component" */
        /* webpackMode: "eager" */
        "@/components/dialogs/DialogPrintPage.vue"
      )
    }
  })

  export default class DialogUnificationOrders extends mixins(
    MixinServiceOrderCostumer,
  ) {
    @ModelSync("openDialogUnificationOrder", "changeDialogUnificationEmit")
      setpenDialogUnificationOrder!: boolean

    @dialogStore.Action("ActionDialogTryAgain") setDialogTryAgain
    @dialogStore.Getter("DialogTryAgain") getDialogTryAgain

    telefone = telefone

    dataPedidoUnificado = {} as IOrderDataAll
    sevice = ""
    phoneCostumer: {
      value: string,
      valid: string|boolean
    } = {
      value: "",
      valid: ""
    }

    created (): void {
      this.phoneCostumer.value = ""
      this.sevice = ""
    }

    changeDataPhone (e): void {
      if (this.phoneCostumer.value === "") {
        this.sevice = ""
      }

      this.phoneCostumer.valid = telefone(String(e).replace(/\D/g, ""))
      if (telefone(String(e).replace(/\D/g, ""))) {
        this.phoneCostumer.value = String(e).replace(/\D/g, "")
      }
    }

    hendlePedidoUnificado (): void {
      if (this.phoneCostumer.value.length < 11) return
      this.sevice = "loading"

      this.unificationAllOrders(this.phoneCostumer.value)
        .then(responseMixin => {
          if (/error/i.test(String(responseMixin || ""))) {
            this.setDialogTryAgain(true)
            return
          } else if (responseMixin) {
            this.dataPedidoUnificado = responseMixin as IOrderDataAll
            this.sevice = "pagamento"
          } else {
            this.sevice = ""
          }

        })
    }

    updatePaymentPedidoUnificado (): void {
      if (this.phoneCostumer.value.length < 11 ) return

      this.sevice = "loading"

      this.updateStatusPaymentOrderUnificated(this.phoneCostumer.value)
        .then(responseMixin => {
          if (/error/i.test(String(responseMixin || ""))) {
            this.setDialogTryAgain(true)
            return
          }
        })

        this.sevice = "concluido"
    }
  }
</script>