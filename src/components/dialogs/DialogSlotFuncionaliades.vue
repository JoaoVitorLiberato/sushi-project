<template>
  <div>
    <slot
      name="serviceClient"
    >
      <v-dialog
        ref="componentDialogSlotTableSelected"
        v-model="dialogServiceClientModel"
        hide-overlay
        :max-width="400"
      >
        <v-card
          color="primary"
          class="mx-auto"
          dark
        >
          <div
            style="border:1px solid var(--v-secondary-base)"
            class=" px-3 py-4"
          >
            <v-row
              no-gutters
            >
              <v-col
                cols="12"
              >
                <span
                  v-font-size="18"
                  v-text="'Escolha o serviço:'"
                />
              </v-col>

              <v-col
                cols="12"
              >
                <v-radio-group
                  v-model="serviceSelelected"
                >
                  <v-row
                    no-gutters
                    justify="center"
                  >
                    <v-col
                      v-for="servico in ['foodpark', 'delivery']"
                      :key="`input-radio-${servico}`"
                      cols="12"
                      class="py-2"
                    >
                      <v-row
                        no-gutters
                        justify="start"
                        justify-md="start"
                      >
                        <v-col
                          cols="12"
                        >
                          <v-radio
                            :value="servico"
                          >
                            <template
                              #label
                            >
                              <span
                                style="color: var(--v-primary-text);"
                                v-text="/delivery/i.test(String(servico)) ? 'Delivery (Entrega)' : 'Food Park (Estabelecimento)'"
                              />
                            </template>
                          </v-radio>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-radio-group>
              </v-col>

              <v-col
                cols="12"
                class="py-2"
              />

              <v-col
                cols="12"
              >
                <v-btn
                  block
                  large
                  color="secondary"
                  :disabled="serviceSelelected === ''"
                  @click.stop="returnProductRoute()"
                >
                  <span
                    class="font-weight-bold"
                  >
                    Fazer meu pedido
                  </span>
                </v-btn>
              </v-col>
            </v-row>
          </div>
        </v-card>
      </v-dialog>
    </slot>

    <slot
      name="cepDelivery"
    >
    <v-overlay
      :value="dialogCepDeliveryModel"
      opacity="1"
    >
      <v-dialog
        ref="componentDialogSlotTableSelected"
        v-model="dialogCepDeliveryModel"
        hide-overlay
        persistent
        :max-width="400"
      >
        <v-card
          color="primary"
          class="mx-auto"
          dark
        >
          <div
            style="border:1px solid var(--v-secondary-base)"
            class=" px-3 py-4"
          >
            <v-row
              no-gutters
            >
              <v-col
                cols="12"
              >
                <span
                  class="font-weight-medium"
                >
                  Por favor, Informe seu CEP
                </span>
              </v-col>

              <v-col
                cols="12"
              />

              <v-col
                cols="12"
              >
                <v-form
                  ref="forminputValidateCEP"
                >
                  <v-row
                    no-gutters
                  >
                    <v-col
                      cols="12"
                    >
                      <v-text-field
                        v-mask="inputCep.mask"
                        v-model="inputCep.value"
                        label="CEP"
                        autocomplete="off"
                        :rules="[required, cep(String(inputCep.value).replace(/\D/g, ''))]"
                      />

                      <div
                        v-if="statusAPICEP.error"
                        style="line-height: 1;"
                      >
                        <span
                          v-font-size="12"
                          class="font-weight-regular error--text"
                          v-text="statusAPICEP.msg"
                        />
                      </div>
                    </v-col>

                    <v-col
                      cols="12"
                      class="py-3"
                    />

                    <v-col
                      cols="12"
                    >

                      <v-progress-linear
                        v-if="statusAPICEP.status"
                        indeterminate
                        color="yellow darken-2"
                      />

                      <div
                        v-else
                      >
                        <v-btn
                          v-if="statusAPICEP.error"
                          color="secondary"
                          depressed
                          block
                          @click.stop="returnProductRoute()"
                        >
                          <span
                            style="color:var(--v-primary-text)"
                            class="font-weight-bold"
                            v-text="'Voltar'"
                          />
                        </v-btn>

                        <v-btn
                          v-else
                          color="secondary"
                          depressed
                          block
                          @click="validateDataInput ? validateInput() : itemsInputChangeValidate({ value: inputCep.value })"
                        >
                          <span
                            style="color:var(--v-primary-text)"
                            class="font-weight-bold"
                            v-text="'Verificar CEP'"
                          />
                        </v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-form>
              </v-col>
            </v-row>
          </div>
        </v-card>
      </v-dialog>
    </v-overlay>
    </slot>

    <slot
      name="ordersClient"
    >
      <v-dialog
        ref="componentDialogOrdersClient"
        v-model="dialogOrdersClientModel"
        hide-overlay
        persistent
        :max-width="400"
      >
        <v-card
          color="primary"
          class="mx-auto"
          dark
        >
          <v-row
            v-border="'1px solid var(--v-secondary-base)'"
            no-gutters
            class="pa-4"
          >
            <v-col
              cols="12"
            >
              <span
                sty
                class="font-weight-medium"
              >
                Você possui produtos em seu carrinho de compras, Você deseja manter?
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
                color="secondary"
                block
                class="my-3"
                @click="addStoreCacheOrderCart"
              >
                <span>
                  Manter
                </span>
              </v-btn>
              <v-btn
                block
                color="grey lighthen-1"
                @click="clearCacheOrderCacheCart"
              >
                <v-icon
                  color="error"
                >
                  delete
                </v-icon>
                <span
                  class="error--text"
                >
                  Descartar
                </span>
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>
    </slot>
  </div>
</template>

<script lang="ts">
  import { Component, Watch } from "vue-property-decorator"
  import { mixins } from "vue-class-component"
  import { namespace } from "vuex-class"
  import MixinRedirectLinks from "@/mixins/redirectLinks/MxiinRedirectLinks"
  import { required, cep } from "@/helpers/rules"
  import { $refs } from "@/implements/types"
  import MixinFormConfig from "@/mixins/form/MixinFormConfig"

  const dialogStore = namespace("dialogStoreModule")
  const cacheStore = namespace("cacheStoreModule")

  @Component({})
  export default class DialogSlotFuncionalidades extends mixins(
    MixinRedirectLinks,
    MixinFormConfig,
  ) implements $refs {
    @dialogStore.Getter("DialogCommentsCostumers") getDialogCommentsCostumers
    @dialogStore.Action("ActionDialogCommentsCostumers") setDialogCommentsCostumers
    @dialogStore.Getter("DialogServiceClient") getDialogServiceClient
    @dialogStore.Action("ActionDialogServiceClient") setDialogSeviceClient
    @dialogStore.Getter("DialogCepDelivery") getDialogCepDelivery
    @dialogStore.Action("ActionDialogCepDelivery") declare setDialogCepDelivery
    @dialogStore.Getter("DialogOrdersClient") getDialogOrdersClient
    @dialogStore.Action("ActionDialogOrdersClient") setDialogOrdersClient
    @cacheStore.Action("ActionCacheCepValidation") setCacheCepValidation
    @cacheStore.Action("ActionCacheOrdersCart") setCacheOrdersCart

    $refs
    required = required
    cep = cep

    tableSelected = ""
    serviceSelelected = ""

    inputCep = {
      optional: false,
      mask: "#####-###",
      valid: "",
      value: ""
    }

    get dialogServiceClientModel (): boolean {
      return this.getDialogServiceClient()
    }

    set dialogServiceClientModel (value: boolean) {
      this.serviceSelelected = ""
      this.setDialogSeviceClient(value)
    }

    get dialogCepDeliveryModel (): boolean {
      return this.getDialogCepDelivery()
    }

    set dialogCepDeliveryModel (value: boolean) {
      this.setDialogCepDelivery(value)
    }

    get dialogOrdersClientModel (): boolean {
      return this.getDialogOrdersClient()
    }

    set dialogOrdersClientModel (value: boolean) {
      this.setDialogOrdersClient(value)
    }

    get validateDataInput (): boolean {
      if (String(this.inputCep.value) === "" || (String(this.inputCep.value).replace(/\D/g, "")).length < 8 ) return true
      if (cep(String(this.inputCep.value).replace(/\D/g, ""))) return false
      return true
    }

    @Watch("inputCep.value")
      clearMsgApi ():void {
        this.statusAPICEP.msg = ""
        this.statusAPICEP.error = false
      }

    itemsInputChangeValidate ({
      value,
    }: {
      readonly value?:string;
    }):void|boolean|string {
      const CEP_VALID = String(value).replace(/\D/g, "")

      if (cep(CEP_VALID)) {
        this.setCacheCepValidation(CEP_VALID)
        this.statusAPICEP.status = true
        this.statusAPICEP.msg = ""
        this.APIValidadorCEPMixin()
      } else {
        this.inputCep.valid = "CEP inválido"
      }
    }

    validateInput ():void {
      if (this.$refs.forminputValidateCEP.validate) {
        this.$refs.forminputValidateCEP.validate()
      }
    }

    addStoreCacheOrderCart (): void {
      const CACHE_CART_PRODUCT = sessionStorage.getItem("order")
      if (CACHE_CART_PRODUCT && JSON.parse(CACHE_CART_PRODUCT).length > 0) {
        this.setCacheOrdersCart(JSON.parse(CACHE_CART_PRODUCT))
      }

      this.dialogOrdersClientModel = !this.dialogOrdersClientModel
    }

    clearCacheOrderCacheCart (): void {
      sessionStorage.removeItem("order")
      this.setCacheOrdersCart([])
      this.dialogOrdersClientModel = !this.dialogOrdersClientModel

      if (/form-view/i.test(String(this.$route.name || ""))) location.replace(`/produto/${this.$route.query.location}/vamoscomecar`)
    }

  }
</script>
