<template>
  <v-row
    no-gutters
    style="width:100%;max-width:1110px;"
    class="mx-auto"
  >
    <v-col
      cols="12"
    >
      <toolbar-component />
    </v-col>

    <v-col
      cols="12"
      style="min-height:600px"
    >
      <v-row
        no-gutters
        class="pa-4"
      >
        <v-col
          cols="12"
        >
          <v-progress-linear
            :indeterminate="!/concluido/i.test(String(detailOrder.status))"
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
            v-if="/preparando/i.test(String(detailOrder.status))"
            v-font-size="14"
            class="font-weight-meddium"
          >
            O seu pedido está sendo preparado...
          </span>

          <span
            v-if="/entrega/i.test(String(detailOrder.status))"
            v-font-size="14"
            class="font-weight-meddium"
          >
            Seu pedido saiu para entrega...
          </span>

          <span
            v-if="/concluido/i.test(String(detailOrder.status))"
            v-font-size="14"
            class="font-weight-meddium"
          >
            Seu pedido está concluído.
          </span>
        </v-col>

        <v-col
          cols="12"
          class="py-5"
        />

        <v-col
          v-if="!/disable/i.test(String(disableButton))"
          cols="12"
          class="text-center"
          style="line-height:1"
        >
          <span
            v-font-size="13"
            class="font-weight-regular warning--text"
          >
            <strong class="font-weight-bold error--text text-uppercase">
              Atenção
            </strong>:<br>
            você poderá avaliar o produto após o pedido está concluído.
          </span>
        </v-col>

        <v-col
          v-if="!/disable/i.test(String(disableButton))"
          cols="12"
          class="py-2"
        />

        <v-col
          cols="12"
          class="text-center"
        >
          <v-card
            color="primary"
            max-width="440"
            class="text-start mx-auto"
          >
            <v-row
              no-gutters
              style="border:1px solid var(--v-secondary-base)"
              class=" px-3 py-4"
            >
              <v-col
                cols="12"
              >
                <span
                  class="font-weight-medium text-uppercase mr-2"
                  style="color:var(--v-primary-text)"
                >
                  Nome:
                </span>

                <span
                  class="font-weight-regular text-uppercase"
                  style="color:var(--v-primary-text)"
                >
                  {{ detailOrder.nome }}
                </span>
              </v-col>

              <v-col
                cols="12"
              >
                <span
                  class="font-weight-medium text-uppercase mr-2"
                  style="color:var(--v-primary-text)"
                >
                  Telefone:
                </span>

                <span
                  class="font-weight-regular text-uppercase"
                  style="color:var(--v-primary-text)"
                >
                  {{ detailOrder.telefone }}
                </span>
              </v-col>

              <v-col
                cols="12"
              >
                <span
                  class="d-block font-weight-medium text-uppercase"
                  style="color:var(--v-primary-text)"
                >
                  meu pedido:
                </span>

                <v-row
                  no-gutters
                >
                  <v-col
                    v-for="item in detailOrder.produtos"
                    :key="`card-product-order-${item.name}`"
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
                v-if="!/disable/i.test(String(disableButton))"
                cols="12"
                class="py-1"
              />

              <v-col
                v-if="/concluido/i.test(String(detailOrder.status))"
                cols="12"
              >
                <v-btn
                  block
                  large
                  :color="/disable/i.test(String(disableButton)) ? 'grey lighten-2' : 'secondary'"
                  @click="openDialogComments"
                >
                  <span
                    class="font-weight-bold primary--text"
                  >
                    Avaliar produtos
                  </span>
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>

      <v-overlay
        :value="dialogSearchOrderClient"
        opacity="1"
      >
        <v-dialog
          ref="componentDialogSearchOrderClient"
          v-model="dialogSearchOrderClient"
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
                  class="text-end"
                >
                  <v-btn
                    fab
                    width="40"
                    height="40"
                    depressed
                    dense
                    text
                    title="Voltar para página principal"
                    @click.stop="goToHome()"
                  >
                    <v-icon
                      color="secondary"
                    >
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
                  style="line-height: 1;"
                >
                  <span
                    v-font-size="14"
                    class="font-weight-medium"
                  >
                    Infome no campo abaixo o número do seu pedido para ver os detalhes e
                    o andamento do pedido.
                  </span>
                </v-col>

                <v-col
                  cols="12"
                  class="py-3"
                />

                <v-col
                  cols="12"
                >
                  <v-form
                    ref="formInputBuscarPedido"
                    @submit.prevent="validateDataInput ? validateInput() : searchOrderClient()"
                    @keydown.enter="validateDataInput ? validateInput() : searchOrderClient()"
                  >
                    <v-row
                      no-gutters
                    >
                      <v-col
                        cols="12"
                      >
                        <v-text-field
                          label="Nº Pedido"
                          autocomplete="no"
                          v-mask="numeroPedido.mask"
                          v-model="numeroPedido.value"
                          outlined
                          dark
                          :rules="[required]"
                          hide-details="auto"
                        />

                        <div
                          v-if="error.status"
                          style="line-height: 1;"
                          class="mt-2"
                        >
                          <span
                            v-font-size="12"
                            class="font-weight-regular error--text"
                            v-text="error.msg"
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
                          v-if="loadingService"
                          indeterminate
                          color="yellow darken-2"
                        />

                        <v-btn
                          v-else
                          color="secondary"
                          depressed
                          type="submit"
                          block
                          large
                        >
                          <span
                            style="color:var(--v-primary-text)"
                            class="font-weight-bold"
                            v-text="'Pesquisar Pedido'"
                          />
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-col>
              </v-row>
            </div>
          </v-card>
        </v-dialog>
      </v-overlay>

      <dialog-comments-clients
        :open="dialogCommentsClients"
        @closeDialog="() => dialogCommentsClients = !dialogCommentsClients"
        @emitDisableButton="v=>disableButton=v"
      />
    </v-col>

    <v-col
      cols="12"
      class="py-4 py-md-8 my-md-14"
    />

    <v-col
      cols="12"
    >
      <footer-component />
    </v-col>
  </v-row>
</template>

<script lang="ts">
  /* eslint-disable @typescript-eslint/no-explicit-any*/
  import { Component, Watch } from "vue-property-decorator"
  import { mixins } from "vue-class-component"
  import { namespace } from "vuex-class"
  import { required } from "@/helpers/rules"
  import { $refs } from "@/implements/types"
  import MixinServiceOrderCostumer from "@/mixins/order/mixinServiceOrderCostumer"
  import MixinRedirectLinks from "@/mixins/redirectLinks/MxiinRedirectLinks"
  import MixinHelperServiceProduct from "@/mixins/help-mixin/MixinHelperServiceProduct"

  const dialogStore = namespace("dialogStoreModule")
  const cacheStore = namespace("cacheStoreModule")

  @Component({
    components: {
      CardProductCart: () => import(
        /* webpackChuckName: "card-product-cart-component" */
        /* webpackMode: "eager" */
        "@/components/cards/CardProductCart.vue"
      ),
      ToolbarComponent: () => import(
        /* webpackChunkName: "toolbar-component" */
        /* webpackMode: "eager" */
        "@/components/ToolbarComponent.vue"
      ),
      FooterComponent: () => import(
        /* webpackChunkName: "footer-component" */
        /* webpackMode: "eager" */
        "@/components/FooterComponent.vue"
      ),
      DialogCommentsClients: () => import(
        /* webpackChunkName: "dialog-comments-clients-component" */
        /* webpackMode: "eager" */
        "@/components/dialogs/DialogCommentsClients.vue"
      )
    }
  })

  export default class viewOrder extends mixins(
    MixinServiceOrderCostumer,
    MixinRedirectLinks,
    MixinHelperServiceProduct
  ) implements $refs {
    @dialogStore.Getter("DialogSearchOrderClient") getDialogSearchOrderClient
    @dialogStore.Action("ActionDialogSearchOrderClient") setDialogSearchOrderClient
    @cacheStore.Action("ActionCacheOrdersCart") declare setCacheOrdersCart

    $refs
    required = required
    dialogCommentsClients = false

    numeroPedido = {
      valid: "",
      mask: "######",
      value: ""
    }
    progress = 100
    error = {
      status: false,
      msg: ""
    }
    loadingService = false
    formInputBuscarPedido = false
    disableButton = ""
    detailOrder: any = {}


    get dialogSearchOrderClient (): boolean {
      return this.getDialogSearchOrderClient()
    }

    set dialogSearchOrderClient (value: boolean) {
      this.setDialogSearchOrderClient(value)
    }

    get validateDataInput (): boolean {
      if (String(this.numeroPedido.value) === "" || String(this.numeroPedido.value).length < 6 ) return true
      return false
    }

    created (): void {
      const CACHE_ORDER = sessionStorage.getItem("numero-pedido")
      if (CACHE_ORDER) this.numeroPedido.value = CACHE_ORDER
      this.dialogSearchOrderClient = !this.dialogSearchOrderClient
    }

    @Watch("numeroPedido.value")
      clearInput ():void {
        this.error.status = false
        this.error.msg = ""
      }

    @Watch("disableButton")
      handleDisableButton (): void {
        console.log("chamou", this.disableButton)
        if (/not-product/i.test(String(this.disableButton))) this.disableButton = "disable"
      }

    validateInput ():void {
      if (this.numeroPedido.value.length < 6 ) {
        this.error = {
          status: true,
          msg: "Código inválido, infome o código correto."
        }
      }
      if (this.$refs.formInputBuscarPedido.validate) {
        this.$refs.formInputBuscarPedido.validate()
      }
    }

    searchOrderClient (): void {
      this.error.status = false
      this.loadingService = true

      this.getOrderCostumer(String(this.numeroPedido.value))
        .then((responseMixin) => {
          if (!responseMixin) throw Error('Error Mixin')

          this.detailOrder = responseMixin || {}

          const IDS_COMMENTED = localStorage.getItem("id-commented")
          if (IDS_COMMENTED && this.detailOrder.produtos.length > 0) {
            JSON.parse(IDS_COMMENTED).forEach(id => {
              this.detailOrder.produtos.filter(item => {
                if (String(item.id) !== String(id)) this.disableButton = "comment"
                else this.disableButton = "disable"
              })
            })
          }

          this.loadingService = false
          this.dialogSearchOrderClient = !this.dialogSearchOrderClient
        }).catch(error => {
          window.log(error)
          this.loadingService = false
          this.error = {
            status: true,
            msg: `Você não possui pedidos`
          }
        })
    }

    openDialogComments (): void {
      if (/disable/i.test(String(this.disableButton))) return

      const IDS_COMMENTED = localStorage.getItem("id-commented")
      const REMOVE_ID_COMMENTED = this.detailOrder.produtos.filter(item => {
        if (IDS_COMMENTED) {
          if (!JSON.parse(IDS_COMMENTED).includes(String(item.id))) {
            return item
          }
        }
      })

      if (REMOVE_ID_COMMENTED.length > 0) {
        sessionStorage.setItem("cache-coment", JSON.stringify([...REMOVE_ID_COMMENTED]))
      } else {
        sessionStorage.setItem("cache-coment", JSON.stringify([...this.detailOrder.produtos]))
      }
      
      this.dialogCommentsClients = true
    }
  }
</script>
