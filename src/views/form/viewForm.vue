<template>
  <v-row
    no-gutters
    style="overflow-y: hidden"
  >
    <v-col
      cols="12"
      md="4"
      order="1"
      order-md="2"
    >
      <painel-form-component />
    </v-col>

    <v-col
      cols="12"
      md="8"
      order="2"
      order-md="1"
      class="pa-4"
    >
      <v-row
        no-gutters
      >
        <v-col
          cols="12"
        >
          <h2
            v-font-size="$vuetify.breakpoint.smAndDown ? 18 : 22"
            class="font-weight-bold text-uppercase"
            style="color:var(--v-primary-text);"
          >
            Finalizar compra
          </h2>
        </v-col>

        <v-col
          cols="12"
          class="py-1"
        />

        <v-col
          cols="12"
          style="line-height: 1;"
        >
          <span
            v-font-size="$vuetify.breakpoint.smAndDown ? 14 : 16"
            class="font-weight-regular grey--text"
          >
            Por favor, preencha os campos abaixo para concluir a compra.
          </span>
        </v-col>

        <v-col
          cols="12"
          class="py-5"
        />

        <v-col
          cols="12"
        >
          <v-form
            ref="formDadosCadastrais"
            v-model="formDadosCadastrais"
          >
            <v-row
              no-gutters
              :justify="$vuetify.breakpoint.smAndDown ? 'center' : 'space-between'"
              align="center"
            >
              <v-col
                v-for="({label,ref,type, optional,mask,readonly}, input) in itemsFirstFields"
                :key="`peencha-seus-dados-cadastrais-${label}`"
                v-show="!/formaPagamento|frete|messagem/i.test(String(input))"
                cols="12"
                md="6"
                class="mb-3"
              >
                <v-text-field
                  :id="ref||input"
                  :ref="ref||input"
                  v-model="itemsFirstFields[input].value"
                  v-mask="mask"
                  :label="label"
                  :name="label"
                  :type="type||'text'"
                  :rules="optional?[itemsFirstFields[input].valid||true]:[required,itemsFirstFields[input].valid]"
                  dark
                  outlined
                  class="mx-1"
                  hide-details="auto"
                  tabindex="0"
                  :title="label"
                  :readonly="readonly"
                >
                  <template
                    v-slot:message="props"
                  >
                    <span
                      v-text="props.message"
                    />
                  </template>
                </v-text-field>
              </v-col>

              <v-col
                cols="12"
                md="6"
                class="mb-3"
              >
                <v-autocomplete
                  :items="['Pix', 'Cartão de Crédito', 'Dinheiro']"
                  v-model="itemsFirstFields.formaPagamento.value"
                  :rules="[required]"
                  label="Forma de pagamento"
                  tabindex="0"
                  flat
                  color="white"
                  class="mx-1"
                  outlined
                  autocomplete="off"
                  dark
                  hide-details="auto"
                >
                  <template
                    v-slot:message="props"
                  >
                    <span
                      v-text="props.message"
                    />
                  </template>
                </v-autocomplete>
              </v-col>

              <v-col
                cols="12"
                md="6"
                class="mb-3"
              >
                <v-text-field
                  v-model="itemsFirstFields.frete.value"
                  :rules="[required]"
                  tabindex="0"
                  flat
                  label="Frete"
                  color="white"
                  class="mx-1"
                  dark
                  outlined
                  readonly
                  hide-details="auto"
                >
                  <template
                    v-slot:message="props"
                  >
                    <span
                      v-text="props.message"
                    />
                  </template>
                </v-text-field>
              </v-col>

              <v-col
                cols="12"
                class="px-1"
              >
                <v-textarea
                  v-font-size="$vuetify.breakpoint.smAndDown ? 14 : 16"
                  v-model="itemsFirstFields.messagem.value"
                  label="Messagem (opcional)"
                  auto-grow
                  color="white"
                  counter
                  maxlength="150"
                  dark
                  outlined
                  placeholder="Caso você tenha alguma observação, por favor, escreva nesse campo. Ex. Retire as cebolas."
                  rows="4"
                  row-height="40"
                />
              </v-col>

              <v-col
                cols="12"
                class="px-2"
              >
                <span
                  class="fix-cupom-text"
                  @click.stop="$refs.dialogDiscount.isActive = true"
                >
                  Desejo aplicar um cupom?
                </span>
              </v-col>

              <v-col
                cols="12"
                class="py-4"
              />

              <v-col
                cols="12"
              >
                <v-row
                  no-gutters
                  class="px-1"
                >
                  <v-col
                    v-if="loading"
                    cols="12"
                  >
                    <v-progress-linear
                      indeterminate
                      color="secondary"
                    />
                  </v-col>

                  <v-col
                    v-else
                    cols="12"
                    :class="$vuetify.breakpoint.smAndDown ? 'd-flex flex-column-reverse' : ''"
                  >
                    <v-btn
                      color="grey lighten-1"
                      large
                      depressed
                      :width="$vuetify.breakpoint.smAndDown ? '100%' : 250"
                      class="mr-md-4"
                      @click.stop="returnProductRoute()"
                    >
                      <span
                        class="font-weight-bold"
                      >
                        Voltar
                      </span>
                    </v-btn>

                    <v-btn
                      color="secondary"
                      large
                      depressed
                      class="mb-5 mb-md-0"
                      :width="$vuetify.breakpoint.smAndDown ? '100%' : 250"
                      @click.stop="validateFieldsInput ? finishCostumerCart() : validateCart()"
                    >
                      <span
                        class="font-weight-bold primary--text"
                      >
                        Finalizar compra
                      </span>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-form>
        </v-col>
      </v-row>

      <v-dialog
        ref="dialogDiscount"
        width="450"
      >
        <v-card
          color="primary"
          dark
        >
          <v-row
            no-gutters
            style="border:1px solid var(--v-secondary-base)"
            class="pa-4"
          >
            <v-col
              cols="12"
              class="text-end"
            >
              <v-btn
                icon
                color="secondary"
                @click.stop="$refs.dialogDiscount.save()"
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
              style="line-height: 18px;"
            >
              <span
                class="font-weight-regular"
              >
                Digite seu cupom de desconto no campo abaixo
              </span>
            </v-col>

            <v-col
              cols="12"
              class="py-2"
            />

            <v-col
              cols="12"
            >
              <v-text-field
                ref="inputCupomDiscount"
                v-model="cupom"
                label="Cupom"
                :rules="[required]"
                outlined
                hide-details
              />
            </v-col>

            <v-col
              v-if="cupomValidate.status"
              cols="12"
              class="py-2"
            />

            <v-col
              v-if="cupomValidate.status"
              cols="12"
              style="line-height: 1;"
            >
              <span
                v-font-size="13"
                :class="`font-weight-regular ${cupomValidate.color}`"
              >
                {{ cupomValidate.message }}
              </span>
            </v-col>

            <v-col
              cols="12"
              class="py-3"
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
                :color="cupom.length >= 8 ? 'secondary' : 'grey lighten-1'"
                block
                large
                @click="cupom.length < 8 ? $refs.inputCupomDiscount.validate() : validateCoupom()"
              >
                <span
                  class="font-weight-bold primary--text"
                >
                  Aplicar cupom
                </span>
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>

      <v-dialog
        ref="dialogErrorOrder"
        hide-overlay
        persistent
        max-width="450"
        height="200"
      >
        <v-card
          color="primary"
          elevation="0"
        >
          <v-row
            no-gutters
            style="border:1px solid var(--v-secondary-base)"
            class="pa-4"
          >
            <v-col
              cols="12"
              style="line-height: 1;"
            >
              <span
                v-font-size="16"
                class="font-weight-medium white--text"
              >
                Prezado cliente, Houve um erro ao tentar efetuar seu pedido. Por favor,
                Tente novamente.
              </span>
            </v-col>

            <v-col
              cols="12"
              class="py-3"
            />

            <v-col
              cols="12"
            >
              <v-btn
                block
                color="secondary"
                @click.stop="$refs.dialogErrorOrder.save()"
              >
                <span>
                  Tentar Novamente
                </span>
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>

    <v-overlay
      :value="dialogFinishOrderFoodpark"
      opacity="1"
    >
      <v-dialog
        v-model="dialogFinishOrderFoodpark"
        width="400"
      >
        <v-card
          color="primary"
          dark
        >
          <v-row
            no-gutters
            style="border: 1px solid var(--v-secondary-base);"
            class="pa-5"
          >
            <v-col
              cols="12"
              style="line-height: 1;"
            >
              <h2
                v-font-size="$vuetify.breakpoint.xsOnly ? 16 : 22"
                class="font-weight-medium"
              >
                Opaahh, Estamos quase lá...
              </h2>
            </v-col>

            <v-col
              cols="12"
              class="py-3"
            />

            <v-col
              cols="12"
            >
              <span
                v-font-size="$vuetify.breakpoint.xsOnly ? 14 : 17"
                class="font-weight-regalar"
              >
                Prezado cliente, Para dá andamento ao seu pedido será necessário pagar diretamente no caixa.
              </span>
            </v-col>

            <v-col
              cols="12"
              class="py-4"
            />

            <v-col
              cols="12"
            >
              <v-btn
                block
                large
                depressed
                color="secondary"
                @click.stop="returnProductRoute()"
              >
                <span
                  class="font-weight-bold primary--text"
                >
                  Finalizar
                </span>
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>
    </v-overlay>
    </v-col>
  </v-row>
</template>

<script lang="ts">
  import { Component, Watch } from "vue-property-decorator"
  import { mixins } from "vue-class-component"
  import { $refs } from "@/implements/types"
  import { required, nome, telefone, cep, rua, numero, cidade, estado } from "@/helpers/rules"
  import { formatedPrice } from "@/helpers/formatedPrice"
  import { namespace } from "vuex-class"
  import { viaCepFields } from "@/helpers/getViaCepValues"
  import APIValidadorCEPMixin from "@/mixins/form/MixinFormConfig"
  import MixinRedirectLinks from "@/mixins/redirectLinks/MxiinRedirectLinks"
  import MixinServiceOrderCostumer from "@/mixins/order/mixinServiceOrderCostumer"
  import MixinHelperServiceProduct from "@/mixins/help-mixin/MixinHelperServiceProduct"
  import MixinVouchersDiscount from "@/mixins/additional-system/mixinVouchersDiscount"
  import "@/styles/view/form/viewForm.styl"

  const payloadStore = namespace("payloadStoreModule")
  const cacheStore = namespace("cacheStoreModule")
  const dialogStore = namespace("dialogStoreModule")

  @Component({
    components: {
      PainelFormComponent: () => import(
        /* webpackChuckName: "painel-form-component" */
        /* webpackMode: "eager" */
        "@/components/form/components/PainelForm.vue"
      ),
    }
  })

  export default class viewForm extends mixins(
    APIValidadorCEPMixin,
    MixinRedirectLinks,
    MixinServiceOrderCostumer,
    MixinVouchersDiscount,
    MixinHelperServiceProduct,
  ) implements $refs {
    @dialogStore.Getter("DialogOrdersClient") declare getDialogOrdersClient
    @dialogStore.Getter("DialogCepDelivery") getDialogCepDelivery
    @dialogStore.Action("ActionDialogTryAgain") setDialogTryAgain
    @dialogStore.Getter("DialogTryAgain") getDialogTryAgain
    @cacheStore.Action("ActionCacheCepValidation") setCacheCepValidation
    @payloadStore.Getter("PayloadOrder") declare getPayloadOrder
    @payloadStore.Action("actionPayloadCostumerName") setPayloadCostumerName
    @payloadStore.Action("actionPayloadCostumerPhone") setPayloadCostumerPhone
    @payloadStore.Action("actionPayloadCostumerAddressCEP") setPayloadCostumerAddressCEP
    @payloadStore.Action("actionPayloadCostumerStreetAddress") setPayloadCostumerStreetAddress
    @payloadStore.Action("actionPayloadCostumerNumberAddress") setPayloadCostumerNumberAddress
    @payloadStore.Action("actionPayloadCostumerComplementyAddress") setPayloadCostumerComplementyAddress
    @payloadStore.Action("actionPayloadCostumerReferenceAddress") setPayloadCostumerReferenceAddress
    @payloadStore.Action("actionPayloadCostumerDistrictAddress") setPayloadCostumerDistrictAddress
    @payloadStore.Action("actionPayloadCostumerCityAddress") setPayloadCostumerCityAddress
    @payloadStore.Action("actionPayloadCostumerStateAddress") setPayloadCostumerStateAddress
    @payloadStore.Action("actionPayloadPaymentFrete") setPayloadPaymentFrete
    @payloadStore.Action("actionPayloadFormPayment") setPayloadFormPayment
    @payloadStore.Action("actionPayloadCostumerMessage") setPayloadCostumerMessage
    @payloadStore.Action("actionPayloadSegment") setPayloadSegment

    $refs
    required = required
    formatedPrice = formatedPrice

    loading = false
    popupNumberOrder  = false
    formDadosCadastrais = false
    dialogFinishOrderFoodpark = false
    copyInput = false
    cupom = ""
    cupomValidate = {
      status: false,
      color: "",
      message: ""
    }

    itemsFirstFields: {
      [key:string]:{
        [key:string]:string|boolean|number
      }
    } = {
      nomeCompleto: {
        label: "Nome completo",
        value: "",
        valid: "",
      },
      numeroDeContato: {
        label: "Telefone",
        mask: "(##) #####-####",
        type: "tel",
        value: "",
        valid: "",
      },
      cep: {
        ref: "ipt_gtm_modal_event_consumidor_endereco_cep",
        label: "CEP",
        mask: "#####-###",
        type: "tel",
        value: "",
        valid: "",
        readonly: false,
      },
      enderecoLogradouro: {
        label: "Rua",
        value: "",
        valid: "",
        readonly: false,
      },
      enderecoNumero: {
        label: "Número",
        type: "text",
        value: "",
        valid: "",
        readonly: false,
      },
      enderecoComplemento: {
        optional: true,
        label: "Complemento (opcional)",
        value: "",
        valid: "",
      },
      enderecoReferencia: {
        label: "Ponto de referência",
        value: "",
        valid: "",
        readonly: false,
      },
      enderecoBairro: {
        label: "Bairro",
        value: "",
        valid: "",
        readonly: false,
      },
      enderecoCidade: {
        label: "Cidade",
        value: "",
        valid: "",
        readonly: true,
      },
      enderecoUf: {
        label: "UF",
        mask: "AA",
        value: "",
        valid: "",
        readonly: true,
      },
      formaPagamento: {
        label: "Forma de Pagamento",
        value: "",
        valid: "",
      },
      frete: {
        label: "Frete",
        value: "",
        valid: true,
        readonly: true
      },
      messagem: {
        optional: true,
        label: "Mensagem (opcional)",
        value: "",
        valid: "",
      },
    }

    get validateFieldsInput (): boolean {
      return [
        this.formDadosCadastrais
      ].every(o => !!o)
    }

    validateCart (): void {
      if (this.$refs.formDadosCadastrais.validate) {
        this.$refs.formDadosCadastrais.validate()
      }
    }

    mounted (): void {
      this.setPayloadSegment(String(this.$route.params.type || ""))
      if (/foodpark/i.test(String(this.$route.params.type || ""))) {
        this.setCacheCepValidation("65272000")
        this.APIValidadorCEPMixin()

        if (/error_api/i.test(String(viaCepFields("erro") || ""))) {
          Object.keys(this.itemsFirstFields).forEach((input) => {
            this.itemsFirstFields[input].value = ""
            this.itemsFirstFields[input].readonly = false
          })
        } else {
          Object.keys(this.itemsFirstFields).forEach((input) => {
            if (/^(cep|enderecoUf|enderecoLogradouro|enderecoComplemento|enderecoCidade|enderecoReferencia|enderecoBairro|enderecoNumero|frete)$/i.test(String(input))) {
              if (/^(cep)$/.test(String(input))) {
                this.itemsFirstFields[input].value = "65272-000"
              }
              if (/^(enderecoReferencia)$/.test(String(input))) {
                this.itemsFirstFields[input].value = "Ao lado do posto Águia"
              }
              if (/^(enderecoBairro)$/.test(String(input))) {
                this.itemsFirstFields[input].value = "Centro"
              }
              if (/^(enderecoNumero|enderecoComplemento)$/.test(String(input))) {
                this.itemsFirstFields[input].value = "S/N"
              }
              if (/^(enderecoCidade)$/.test(String(input))) {
                this.itemsFirstFields[input].value = "Santa Luzia do Paruá"
              }
              if (/^(enderecoUf)$/.test(String(input))) {
                this.itemsFirstFields[input].value = "MA"
              }
              if (/^(enderecoLogradouro)$/.test(String(input))) {
                this.itemsFirstFields[input].value = "Av. Prof. João Morais de Sousa"
              }
              if (/^(frete)$/.test(String(input))) {
                this.itemsFirstFields[input].value = String(formatedPrice(Number(0)))
                this.setPayloadPaymentFrete(0)
              }

              this.itemsFirstFields[input].readonly = true
            }
          })
        }
      }
    }

    @Watch("getDialogOrdersClient")
      @Watch("getDialogCepDelivery")
        changeDialogOrderClient (): void {
          if (this.getDialogOrdersClient() || this.getDialogCepDelivery()) return

          if (/delivery/i.test(String(this.$route.params.type|| ""))) {
            if (viaCepFields("erro") && /error_api/i.test(String(viaCepFields("erro") || ""))) {
              Object.keys(this.itemsFirstFields).forEach((input) => {
                setTimeout(() => {
                  if (/^(frete)$/.test(String(input))) {
                    this.itemsFirstFields[input].value = String(formatedPrice(Number(500)))
                    this.setPayloadPaymentFrete(500)
                  }
                  if (!/^(frete)$/.test(String(input))) {
                    this.itemsFirstFields[input].value = ""
                    this.itemsFirstFields[input].readonly = false
                  }
                }, 1500)
              })
            } else {
              Object.keys(this.itemsFirstFields).forEach((input) => {
                if (/^(cep|enderecoUf|enderecoCidade|frete)$/i.test(String(input))) {
                  if (/^(cep)$/.test(String(input))) {
                    this.itemsFirstFields[input].value = String(viaCepFields("cep") || "")
                  }
                  if (/^(enderecoCidade)$/.test(String(input))) {
                    this.itemsFirstFields[input].value = String(viaCepFields("localidade") || "")
                  }
                  if (/^(enderecoUf)$/.test(String(input))) {
                    this.itemsFirstFields[input].value = String(viaCepFields("uf") || "")
                  }
                  if (/^(frete)$/.test(String(input))) {
                    this.itemsFirstFields[input].value = String(formatedPrice(Number(500)))
                    this.setPayloadPaymentFrete(500)
                  }

                  this.itemsFirstFields[input].readonly = true
                }
              })
            }
          }
        }

    @Watch("itemsFirstFields.nomeCompleto.value")
      payloadSetName (value: string):void {
        this.itemsFirstFields.nomeCompleto.valid = nome(value)
        if (nome(value)) {
          this.setPayloadCostumerName(value)
        }
      }

    @Watch("itemsFirstFields.numeroDeContato.value")
      payloadSetPhone (value: string): void {
        this.itemsFirstFields.numeroDeContato.valid = telefone(String(value).replace(/\D/g, ""))

        if (telefone(String(value).replace(/\D/g, ""))) {
          this.setPayloadCostumerPhone(String(value).replace(/\D/g, ""))
        }
      }

    @Watch("itemsFirstFields.cep.value")
      payloadSetCep (value: string): void {
        this.itemsFirstFields.cep.valid = cep(String(value).replace(/\D/g, ""))
        if (cep(String(value).replace(/\D/g, ""))) {
          this.setPayloadCostumerAddressCEP(String(value).replace(/\D/g, ""))
        }
      }

    @Watch("itemsFirstFields.enderecoLogradouro.value")
      payloadSetStreet (value: string): void {
        this.itemsFirstFields.enderecoLogradouro.valid = rua(String(value))
        if (rua(String(value))) {
          this.setPayloadCostumerStreetAddress(String(value))
        }
      }

    @Watch("itemsFirstFields.enderecoNumero.value")
      payloadSetNumber (value: string): void {
        this.itemsFirstFields.enderecoNumero.valid = numero(String(value))
        if (numero(String(value))) {
          this.setPayloadCostumerNumberAddress(String(value))
        }
      }

    @Watch("itemsFirstFields.enderecoComplemento.value")
      payloadSetComplementy (value: string): void {
        this.itemsFirstFields.enderecoComplemento.valid = rua(String(value))
        this.setPayloadCostumerComplementyAddress(String(value))
      }

    @Watch("itemsFirstFields.enderecoReferencia.value")
      payloadSetReffence (value: string): void {
        this.itemsFirstFields.enderecoReferencia.valid = rua(String(value))
        if (rua(String(value))) {
          this.setPayloadCostumerReferenceAddress(String(value))
        }
      }

    @Watch("itemsFirstFields.enderecoBairro.value")
      payloadSetDistrict (value: string): void {
        this.itemsFirstFields.enderecoBairro.valid = nome(String(value))
        if (nome(String(value))) {
          this.setPayloadCostumerDistrictAddress(String(value))
        }
      }

    @Watch("itemsFirstFields.enderecoCidade.value")
      payloadSetCity(value: string): void {
        this.itemsFirstFields.enderecoCidade.valid = cidade(String(value))
        if (cidade(String(value))) {
          this.setPayloadCostumerCityAddress(String(value))
        }
      }

    @Watch("itemsFirstFields.enderecoUf.value")
      payloadSetState(value: string): void {
        this.itemsFirstFields.enderecoUf.valid = estado(String(value))
        if (estado(String(value))) {
          this.setPayloadCostumerStateAddress(String(value))
        }
      }

    @Watch("itemsFirstFields.formaPagamento.value")
      payloadSetFormPayment(value: string): void {
        this.itemsFirstFields.formaPagamento.valid = true
        if (String(value)) {
          this.setPayloadFormPayment(String(value))
        }
      }

    @Watch("itemsFirstFields.messagem.value")
      payloadSetMessage(value: string): void {
        this.itemsFirstFields.formaPagamento.valid = true
        if (String(value)) {
          this.setPayloadCostumerMessage(String(value))
        }
      }

    @Watch("itemsFirstFields", { deep: true })
      itemsFormWatch (value:string): void {
        Object.keys(value).forEach((input) => {
          if (this.itemsFirstFields[input] && !("optional" in this.itemsFirstFields[input])) {
            if (/^(cep|enderecoLogradouro|enderecoBairro|enderecoNumero|enderecoReferencia)$/i.test(input)) {
              this.itemsFirstFields[input].valid = !!value
            }
          }
        })
      }

    finishCostumerCart (): void {
      this.loading = true

      this.setOrderCostumer()
        .then(responseMixin => {
          if (/error/i.test(String(responseMixin || ""))) {
            this.loading = false
            this.$refs.dialogErrorOrder.isActive = true
            return
          }

          sessionStorage.clear()
          sessionStorage.setItem("numero-pedido", this.getPayloadOrder("consumidor").telefone.contato)
          localStorage.removeItem("id-commented")

          if (/^foodpark$/i.test(String(this.$route.params.type || ""))) {
            this.dialogFinishOrderFoodpark = true
          } else {
            location.replace("/detalhes/pedido")
          }
        }).finally(() => {
          this.loading = false
        })
    }

    validateCoupom (): void {
      this.loading = true
      this.getVoucherActived(String(this.cupom))
        .then(responseMixin => {
          if (/not-found/i.test(String(responseMixin || ""))) {
            this.cupomValidate.status = true
            this.cupomValidate.color = "error--text"
            this.cupomValidate.message = "Este cupom é inválido, por favor, Digite um cupom válido."
            return
          } else if (/error/i.test(String(responseMixin || ""))) throw Error("err")
            this.cupomValidate.status = true
            this.cupomValidate.color = "success--text"
            this.cupomValidate.message = "Cupom aplicado com sucesso."
            this.applyingCouponDiscount(this.cupom)

            setTimeout(() => {
              this.$refs.dialogDiscount.save()
              this.cupomValidate.status = false
              this.loading = false
            }, 4000)
        }).catch(err => {
          window.log("error validateCoupom", err)
          this.loading = false
          this.setDialogTryAgain(!this.getDialogTryAgain())
        })
    }
  }
</script>
