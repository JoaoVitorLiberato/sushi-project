<template>
  <v-row
    no-gutters
  >
    <v-col
      cols="12"
      md="4"
      order="1"
      order-md="2"
      class="secondary"
    >
      <v-card
        style="border-radius: 0;"
        color="secondary"
        :min-height="$vuetify.breakpoint.smAndDown ? expand ? '40vh' : '65px' :'100vh'"
        elevation="0"
        class="pa-4"
      >
        <v-row
          no-gutters
        >
          <v-col
            cols="12"
            @click="openPainel"
          >
            <v-row
              no-gutters
              justify="space-between"
              align="center"
            >
              <v-col
                cols="10"
                md="12"
              >
                <span
                  v-font-size="$vuetify.breakpoint.smAndDown ? 18 : 22"
                  class="font-weight-bold text-uppercase"
                >
                  Resumo do pedido:
                </span>
              </v-col>
              <v-col
                cols="2"
                class="hidden-sm-and-up"
              >
                <v-btn
                  text
                  color="primary"
                >
                  <v-icon
                    size="32"
                    :style="expand ? 'transform: rotate(180deg)' : 'transform: rotate(0deg)'"
                  >
                    expand_more
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-col>

          <v-col
            cols="12"
          >
            <v-expand-transition>
              <div
                v-show="expand"
                :style="`expand ? 'min-height:40vh' : 'height:65px'`"
              >
                <v-row
                  v-if="getCacheOrderCart().length > 0"
                  no-gutters
                >
                  <v-col
                    cols="12"
                    class="py-2"
                  />

                  <v-col
                    cols="12"
                  >
                    <v-row
                      no-gutters
                      class="pa-md-2"
                      :style="`max-height: ${$vuetify.breakpoint.smAndDown ? 450 : 580}px;overflow-y: scroll;`"
                    >
                      <v-col
                        v-for="item in getCacheOrderCart()"
                        :key="`cart-product-${item.name}`"
                        cols="12"
                      >
                        <card-product-cart
                          :name="item.name"
                          :qtd_product="item.price.qtd_product"
                          :price_default="sumPriceDefaultWhiteDiffences(item)"
                          :price_total="item.price.total"
                          :complements="item.complements"
                          :differences="item.differences"
                        />
                      </v-col>
                    </v-row>
                  </v-col>

                  <v-col
                    cols="12"
                    class="mt-5"
                  >
                    <v-divider
                      color="#000"
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
                      class="font-weight-bold text-uppercase"
                      style="font-size: 19px;"
                    >
                      Valor do frete:
                    </span>
                    <br>
                    <span
                      class="font-weight-medium text-uppercase"
                      style="font-size: 19px;"
                    >
                      {{ formatedPrice(Number(getPayloadOrder('pagamento').valorFrete)) }}
                    </span>
                  </v-col>

                  <v-col
                    cols="12"
                    class="py-2"
                  />

                  <v-col
                    cols="12"
                  >
                    <span
                      class="font-weight-bold text-uppercase"
                      style="font-size: 19px;"
                    >
                      Total:
                    </span>
                    <br>
                    <span
                      v-font-size="$vuetify.breakpoint.width < 350 ? 25 : 30"
                      class="font-weight-bold text-uppercase"
                      :style="`text-decoration:${getPayloadOrder('pagamento').desconto.PrecoTotalComDesconto > 0 ?'line-through' : 'none'}`"
                    >
                      {{ formatedPrice(Number(getCachePriceTotal()) + Number(getPayloadOrder("pagamento").valorFrete)) }}
                    </span>

                    <span
                      v-if="getPayloadOrder('pagamento').desconto.PrecoTotalComDesconto > 0"
                      v-font-size="$vuetify.breakpoint.width < 350 ? 25 : 30"
                      class="font-weight-bold text-uppercase ml-3"
                    >
                      {{ formatedPrice(Number(getPayloadOrder("pagamento").desconto.PrecoTotalComDesconto)) }}
                    </span>
                  </v-col>

                  <v-col
                    v-if="getPayloadOrder('pagamento').desconto.PrecoTotalComDesconto > 0"
                    cols="12"
                    class="mt-2"
                    style="line-height:1"
                  >
                    <span
                      class="font-weight-medium error--text"
                    >
                      Desconto de {{ getPayloadOrder('pagamento').desconto.porcentagem }}% aplicado com sucesso!
                    </span>
                  </v-col>

                  <v-col
                    v-if="/(delivery)/i.test(getPayloadOrder('segmento'))"
                    cols="12"
                    style="line-height: 1;"
                    class="mt-3"
                  >
                    <strong
                      class="font-weight-bold"
                    >
                      Atenção:
                    </strong>
                    <span
                      v-font-size="13"
                      class="font-weight-regular pt-1"
                    >
                      O valor do frete já está incluso na soma total dos produtos.
                    </span>
                  </v-col>
                </v-row>
              </div>
            </v-expand-transition>
          </v-col>
        </v-row>
      </v-card>
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
          class="py-3"
        />

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
                  autocomplete="no"
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
                  dark
                  outlined
                  placeholder="Caso você tenha alguma observação, por favor, escreva nesse campo. Ex. Retire as cebolas."
                  rows="4"
                  row-height="40"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-col>

        <v-col
          cols="12"
          class="py-1"
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
      <v-dialog
        ref="dialogNumberOrder"
        hide-overlay
        persistent
        max-width="400"
        height="200"
      >
        <v-card
          color="primary"
          elevation="0"
        >
          <v-row
            no-gutters
            style="border: 1px solid var(--v-secondary-base)"
            class="pa-4"
          >
            <v-col
              cols="12"
              style="line-height:1;"
            >
              <span
                v-font-size="14"
                class="font-weight-regular"
                style="color:var(--v-primary-text)"
              >
                Copie o número do seu pedido para você o andamento do seu pedido.
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
                id="numberOrderInput"
                v-height="68"
                :value="numeroPedido"
                label="Número do pedido"
                readonly
                dark
                color="grey lighten-4"
                append-icon="content_copy"
                :success-messages="copyInput ? 'Copiado com sucesso!' : ''"
                @click:append="copy('numberOrderInput')"
                @click="copy('numberOrderInput')"
                outlined
              />
            </v-col>

            <v-col
              cols="12"
              class="py-3"
            />

            <v-col
              cols="12"
            >
              <v-btn
                color="secondary"
                large
                block
                depressed
                @click.stop="redirectDetailOrder()"
              >
                <span
                  class="font-weight-bold primary--text"
                >
                  Detalhes do pedido
                </span>
              </v-btn>
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
  import { $refs } from "@/implements/types"
  import { required, nome, telefone, cep, rua, numero, cidade, estado } from "@/helpers/rules"
  import { formatedPrice } from "@/helpers/formatedPrice"
  import { namespace } from "vuex-class"
  import { viaCepFields } from "@/helpers/getViaCepValues"
  import APIValidadorCEPMixin from "@/mixins/form/MixinFormConfig"
  import MixinHelperServiceProduct from "@/mixins/help-mixin/MixinHelperServiceProduct"
  import MixinRedirectLinks from "@/mixins/redirectLinks/MxiinRedirectLinks"
  import Debounce from "lodash.debounce"

  const payloadStore = namespace("payloadStoreModule")
  const cacheStore = namespace("cacheStoreModule")

  @Component({
    components: {
      CardProductCart: () => import(
        /* webpackChuckName: "card-product-cart-component" */
        /* webpackMode: "eager" */
        "@/components/cards/CardProductCart.vue"
      ),
    }
  })

  export default class viewForm extends mixins(
    APIValidadorCEPMixin,
    MixinHelperServiceProduct,
    MixinRedirectLinks,
  ) implements $refs {
    beforeRouteEnter (
      to: {
        name: string;
        params: {
          type: string|RegExp
        },
        query: {
          location: string
        }
      },
      _from: never,
      next: (arg0: (vm) => void) => void,
    ) {
      next((vm) => {
        vm.setPayloadSegment(String(to.params.type || ""))
        vm.setPayloadProducts(vm.getCacheOrderCart())
        if (/foodpark/i.test(String(to.params.type || ""))) {
          vm.setCacheCepValidation("65272000")
          vm.APIValidadorCEPMixin()
          if (/error_api/i.test(String(viaCepFields("erro") || ""))) {
            Object.keys(vm.itemsFirstFields).forEach((input) => {
              vm.itemsFirstFields[input].value = ""
              vm.itemsFirstFields[input].readonly = false
            })
          } else {
            Object.keys(vm.itemsFirstFields).forEach((input) => {
              if (/^(cep|enderecoUf|enderecoLogradouro|enderecoComplemento|enderecoCidade|enderecoReferencia|enderecoBairro|enderecoNumero|frete)$/i.test(String(input))) {
                if (/^(cep)$/.test(String(input))) {
                  vm.itemsFirstFields[input].value = viaCepFields("cep")
                }
                if (/^(enderecoReferencia)$/.test(String(input))) {
                  vm.itemsFirstFields[input].value = "Ao lado do posto Águia"
                }
                if (/^(enderecoBairro)$/.test(String(input))) {
                  vm.itemsFirstFields[input].value = "Centro"
                }
                if (/^(enderecoNumero|enderecoComplemento)$/.test(String(input))) {
                  vm.itemsFirstFields[input].value = "S/N"
                }
                if (/^(enderecoCidade)$/.test(String(input))) {
                  vm.itemsFirstFields[input].value = viaCepFields("localidade")
                }
                if (/^(enderecoUf)$/.test(String(input))) {
                  vm.itemsFirstFields[input].value = viaCepFields("uf")
                }
                if (/^(enderecoLogradouro)$/.test(String(input))) {
                  vm.itemsFirstFields[input].value = "Av. Prof. João Morais de Sousa"
                }
                if (/^(frete)$/.test(String(input))) {
                  vm.itemsFirstFields[input].value = String(formatedPrice(Number(0)))
                  vm.setPayloadPaymentFrete(0)
                }

                vm.itemsFirstFields[input].valid = true
                vm.itemsFirstFields[input].readonly = true
              }
            })
          }
        } else if (/delivery/i.test(String(to.params.type|| ""))) {
          if (viaCepFields("erro") && /error_api/i.test(String(viaCepFields("erro") || ""))) {
            Object.keys(vm.itemsFirstFields).forEach((input) => {
              setTimeout(() => {
                if (/^(frete)$/.test(String(input))) {
                  vm.itemsFirstFields[input].value = String(formatedPrice(Number(500)))
                  vm.setPayloadPaymentFrete(500)
                }
                if (!/^(frete)$/.test(String(input))) {
                  vm.itemsFirstFields[input].value = ""
                  vm.itemsFirstFields[input].readonly = false
                }
              }, 1500)
            })
          } else {
            Object.keys(vm.itemsFirstFields).forEach((input) => {
              if (/^(cep|enderecoUf|enderecoCidade|frete)$/i.test(String(input))) {
                if (/^(cep)$/.test(String(input))) {
                  vm.itemsFirstFields[input].value = viaCepFields("cep")
                }
                if (/^(enderecoCidade)$/.test(String(input))) {
                  vm.itemsFirstFields[input].value = viaCepFields("localidade")
                }
                if (/^(enderecoUf)$/.test(String(input))) {
                  vm.itemsFirstFields[input].value = viaCepFields("uf")
                }
                if (/^(frete)$/.test(String(input))) {
                  vm.itemsFirstFields[input].value = String(formatedPrice(Number(500)))
                  vm.setPayloadPaymentFrete(500)
                }

                vm.itemsFirstFields[input].valid = true
                vm.itemsFirstFields[input].readonly = true
              }
            })
          }
        } else {
          vm.goToHome()
        }
        vm.dicountAplicated()
      })
    }

    @cacheStore.Getter("CacheOrderCart") declare getCacheOrderCart
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
    @payloadStore.Action("actionPayloadProducts") setPayloadProducts

    $refs
    required = required
    formatedPrice = formatedPrice

    expand = true
    loading = false
    numeroPedido = ""

    formDadosCadastrais = false
    copyInput = false

    get validateFieldsInput (): boolean {
      return [
        this.formDadosCadastrais
      ].every(o => !!o)
    }

    created () {
      this.dicountAplicated()
    }

    validateCart (): void {
      if (this.$refs.formDadosCadastrais.validate) {
        this.$refs.formDadosCadastrais.validate()
      }
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
        if ( telefone(String(value).replace(/\D/g, ""))) {
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
        if (numero(String())) {
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
        this.itemsFirstFields.enderecoBairro.valid = numero(String(value))
        if (numero(String(value))) {
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
        this.setPayloadCostumerMessage(String(value))
      }

    @Watch("itemsFirstFields", { deep: true })
      itemsFormWatch (value:string): void {
        Object.keys(value).forEach((input) => {
          if (this.itemsFirstFields[input] && !("optional" in this.itemsFirstFields[input])) {
            if (/^(nomeCompleto|numeroDeContato|cep|enderecoLogradouro|enderecoBairro|enderecoNumero|enderecoReferencia|frete|formaPagamento|messagem)$/i.test(input)) {
              this.itemsFirstFields[input].valid = !!value
            }
          }
        })
      }

    openPainel (): void {
      if (this.$vuetify.breakpoint.mdAndUp) return
      this.expand = !this.expand
    }

    finishCostumerCart (): void {
      this.loading = true
      this.conversionOrder()
    }

    conversionOrder = Debounce(
      function (this) {
        this.loading = false
        const DATA_FAKE = {
          nome: this.getPayloadOrder("consumidor").nome,
          telefone: this.getPayloadOrder("consumidor").telefone.contato,
          status: "concluido",
          produtos: [...this.getPayloadOrder("produtos")]
        }
        this.numeroPedido = "123456"

        sessionStorage.clear()
        sessionStorage.setItem("api-fake", JSON.stringify(DATA_FAKE))
        sessionStorage.setItem("numero-pedido", this.numeroPedido)
        this.$refs.dialogNumberOrder.isActive = true
      },
      3000
    )

    copy (id:string): void {
      this.copyInput = true
      const COPY_NUMBER = document.querySelector(`#${id}`) as HTMLInputElement
      COPY_NUMBER.select()
      document.execCommand("copy")

      setTimeout(() => {
        this.copyInput = false
      }, 5000)
    }

    redirectDetailOrder (): void {
      this.$refs.dialogNumberOrder.save()
      location.replace("/detalhes/pedido")
    }
  }
</script>
