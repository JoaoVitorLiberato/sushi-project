<template>
  <v-dialog
    v-model="dialogRegisterOrderSegmentBench"
    width="400"
    persistent
  >
    <v-card
      elevation="0"
    >
      <v-row
        no-gutters
        style="border: 1px solid var(--v-secondary-base);min-height: 150px;"
        class="pa-4"
      >
        <v-col
          cols="12"
          class="text-end"
        >
          <v-btn
            icon
            @click="dialogRegisterOrderSegmentBench = !dialogRegisterOrderSegmentBench"
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
          <v-form
            ref="formValidateInput"
            v-model="formValidate"
          >
            <v-row
              no-gutters
            >
              <v-col
                cols="12"
              >
                <v-autocomplete
                  v-model="data.segment"
                  :items="['bancada']"
                  label="Segmento"
                  outlined
                  :rules="[required]"
                  auto-select-first
                  hide-details
                  disabled
                />
              </v-col>

              <v-col
                cols="12"
                class="py-1"
              />

              <v-col
                cols="12"
              >
                <v-text-field
                  v-model="data.name"
                  outlined
                  :rules="[required]"
                  label="Nome"
                  hide-details="auto"
                />
              </v-col>

              <v-col
                cols="12"
                class="py-1"
              />

              <v-col
                cols="12"
                class="py-1"
              />

              <v-col
                cols="12"
              >
                <v-text-field
                  outlined
                  label="Preço"
                  type="number"
                  :hint="textPrice"
                  :rules="[required]"
                  :persistent-hint="true"
                  hide-details="auto"
                  @input="changeInputPrice"
                />
              </v-col>

              <v-col
                cols="12"
                class="py-2"
              />

              <v-col
                cols="12"
              >
                <v-progress-linear
                  v-if="loading"
                  color="secondary"
                  indeterminate
                />

                <v-btn
                  v-else
                  color="secondary"
                  large
                  block
                  depressed
                  @click="!formPreechido ? validate() : createOrderBench()"
                >
                  <span
                    v-font-size="14"
                    class="font-weight-bold primary--text"
                  >
                    Cadastrar Pedido
                  </span>
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
  import { mixins } from "vue-class-component"
  import { Component, Vue } from "vue-property-decorator"
  import { namespace } from "vuex-class"
  import { formatedPrice } from "@/helpers/formatedPrice"
  import { required } from "@/helpers/rules"
  import { $refs } from "@/implements/types"
  import PAYLOAD_DATA_DEFAULT from "@/data/payload/payloadDefault.json"
  import MixinServiceOrderCostumer from "@/mixins/order/mixinServiceOrderCostumer"

  const dialogStore = namespace("dialogStoreModule")

  @Component({})
  export default class DialogRegisterOrderSegmentBench extends mixins(
    MixinServiceOrderCostumer,
  ) implements $refs {
    @dialogStore.Action("ActionDialogRegisterOrderSegmentBench") setDialogRegisterOrderSegmentBench
    @dialogStore.Getter("dialogRegisterOrderSegmentBench") getDialogRegisterOrderSegmentBench

    $refs

    formatedPrice = formatedPrice
    required = required

    loading = false
    textWeight = ""
    textPrice = ""
    formValidate = false

    data = {
      segment: "bancada",
      name: "",
      price: 0
    }

    get dialogRegisterOrderSegmentBench (): boolean {
      return this.getDialogRegisterOrderSegmentBench()
    }

    set dialogRegisterOrderSegmentBench (value:boolean) {
      this.setDialogRegisterOrderSegmentBench(value)
    }

    get formPreechido (): boolean {
      return [
        this.formValidate
      ].every(o => !!o)
    }

    validate (): void {
      if (this.$refs.formValidateInput.validate) {
        this.$refs.formValidateInput.validate()
      }
    }

    changeInputPrice (e): void {
      this.data.price = Number(e)

      this.textPrice = `${formatedPrice(e)}`
    }

    createOrderBench (): void {
      this.loading = true
      const PAYLOAD_DATA = PAYLOAD_DATA_DEFAULT

      if (this.data.segment) {
        Vue.set(PAYLOAD_DATA, "segmento", this.data.segment)
      }
      if (this.data.name) {
        Vue.set(PAYLOAD_DATA.consumidor, "nome", this.data.name)
      }

      if (this.data.price) {
        Vue.set(PAYLOAD_DATA.pagamento, "valorTotal", Number(this.data.price))
      }

      this.setOrderCostumer()
        .then(responseMixin => {
          this.loading = false

          if (/error/i.test(String(responseMixin || ""))) {
            this.$refs.dialogErrorOrder.isActive = true
            return
          }

          this.dialogRegisterOrderSegmentBench = !this.dialogRegisterOrderSegmentBench
        })
    }
  }
</script>
