<template>
  <v-row
    no-gutters
    style="width: 100%;max-width: 1440px;"
    class="mx-auto"
  >
    <v-col
      cols="12"
    >
      <toolbar-component />
    </v-col>

    <v-col
      cols="12"
      class="py-5"
    />


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
          class="text-center"
          style="line-height:1"
        >
          <span
            v-font-size="$vuetify.breakpoint.smAndDown ? 13 : 16"
            class="font-weight-regular warning--text"
          >
            <strong class="font-weight-bold error--text text-uppercase">
              Atenção
            </strong>:<br>
            você poderá avaliar o produto após o pedido está concluído.
          </span>
        </v-col>

        <v-col
          cols="12"
          class="py-2"
        />

        <v-col
          cols="12"
          class="text-center"
        >
          <v-row
            no-gutters
            align="center"
            justify="center"
            class="flex-wrap"
          >
            <v-col
              v-for="{ pedido, nome, telefone, produtos, status } in detailOrder"
              :key="`card-desktop-order-${pedido}`"
              class="ma-3"
            >
              <v-card
                :loading="!/concluido|cancelado/i.test(String(status))"
                color="primary"
                width="300"
                style="border-radius: 0;"
                class="text-start mx-auto"
              >
                <template v-slot:progress>
                  <v-progress-linear
                    color="secondary"
                    height="5"
                    indeterminate
                  ></v-progress-linear>
                </template>

                <v-row
                  no-gutters
                  style="border:1px solid var(--v-secondary-base)"
                  class=" px-3 py-4"
                >
                  <v-col
                    cols="12"
                    class="text-center"
                    style="line-height: 1;color:var(--v-primary-text)"
                  >
                    <span
                      v-if="/preparando/i.test(String(status))"
                      v-font-size="14"
                      class="font-weight-medium"
                    >
                      O seu pedido está sendo preparado...
                    </span>

                    <span
                      v-if="/entrega/i.test(String(status))"
                      v-font-size="14"
                      class="font-weight-medium"
                    >
                      Seu pedido saiu para entrega...
                    </span>

                    <span
                      v-if="/concluido/i.test(String(status))"
                      v-font-size="14"
                      class="font-weight-medium"
                    >
                      Seu pedido está concluído.
                    </span>

                    <span
                      v-if="/cancelado/i.test(String(status))"
                      v-font-size="14"
                      class="font-weight-medium"
                    >
                      Seu pedido foi cancelado, caso houver algum problema,<br> por favor, clique no
                      botão Whatsapp para falar com a loja física.
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
                      class="font-weight-medium text-uppercase mr-2"
                      style="color:var(--v-primary-text)"
                    >
                      Nome:
                    </span>

                    <span
                      class="font-weight-regular text-uppercase"
                      style="color:var(--v-primary-text)"
                    >
                      {{ nome }}
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
                      {{ telefone }}
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
                      class="pr-1"
                      style="max-height: 180px;overflow-y: scroll;"
                    >
                      <v-col
                        v-for="item in produtos"
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
                    cols="12"
                    class="py-2"
                  />

                  <v-col
                    cols="12"
                  >
                    <v-btn
                      block
                      large
                      :color="disableOrder(String(pedido)) ||!/concluido/i.test(String(status)) ? 'grey lighten-2' : 'secondary'"
                      @click.stop="disableOrder(String(pedido)) ||!/concluido/i.test(String(status)) ? '' : commentProductsOrders(pedido)"
                    >
                      <span
                        class="font-weight-bold primary--text"
                      >
                        Avaliar produtos
                      </span>
                    </v-btn>

                    <dialog-comments-clients
                      v-if="dialogCommentsClients"
                      :open="dialogCommentsClients"
                      :dataName="nome"
                      @closeDialog="closeDialogCommentProducts()"
                    />
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-overlay
        :value="dialogSearchOrderClient"
        persistent
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
                    class="font-weight-regular"
                  >
                    Infome no campo abaixo o número do telefone que foi utilizado para fazer a compra para ver
                    o andamento e detalhes do seu pedido.
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
                          v-mask="'(##) #####-####'"
                          label="Nº do telefone"
                          autocomplete="no"
                          placeholder="(99) 99999-9999"
                          type="text"
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
                            style="color:var(--v-primary-base)"
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
  import "@/styles/components/caroucels.styl"

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
      value: ""
    }
    progress = 100
    error = {
      status: false,
      msg: ""
    }
    loadingService = false
    formInputBuscarPedido = false
    detailOrder: any = []


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

    mounted (): void {
      sessionStorage.removeItem("order-costumer")
      const CACHE_NUMERO_ORDER = sessionStorage.getItem("numero-pedido")
      if (CACHE_NUMERO_ORDER) this.numeroPedido.value = CACHE_NUMERO_ORDER
      this.dialogSearchOrderClient = !this.dialogSearchOrderClient
    }

    @Watch("numeroPedido.value")
      clearInput ():void {
        this.error.status = false
        this.error.msg = ""
      }

    intervalOrder = 0
    initialCountStatus = "no"
    @Watch("initialCountStatus")
      checkStatusOrder (): void {
        this.intervalOrder = window.setInterval(() => {
          if (/concluido/i.test(String(this.detailOrder.status))) {
            window.clearInterval(this.intervalOrder)
            return
          }

          this.searchOrderClient()
          this.dialogSearchOrderClient = false
        }, 30000)
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

      this.getOrderCostumer(String(this.numeroPedido.value).replace(/\D/g, ""))
        .then((responseMixin) => {
          if (!responseMixin) throw Error('Error Mixin')
          if (/not-order/i.test(String(responseMixin))) {
            this.loadingService = false
            this.error = {
              status: true,
              msg: `Você não possui pedidos`
            }
            return
          }

          this.detailOrder = responseMixin || []

          this.loadingService = false
          sessionStorage.setItem("order-costumer", JSON.stringify(this.detailOrder))
          this.dialogSearchOrderClient = false
        }).catch(error => {
          window.log(error)
          this.loadingService = false
          this.error = {
            status: true,
            msg: `Houve um erro ao tentar buscar seu pedido, por favor, tente novamente`
          }
        }).finally(() => {
          if (this.error.status) return
          if (this.detailOrder && /yes/i.test(String(this.initialCountStatus))) return
          this.initialCountStatus = "yes"
        })
    }

    disableOrder (pedido: string): boolean {
      const CACHE_ORDER_DESATIVED = localStorage.getItem(`disable-${pedido}`)
      if (!CACHE_ORDER_DESATIVED) return false

      return /true/i.test(String(CACHE_ORDER_DESATIVED || ""))
    }


    closeDialogCommentProducts (): void {
      sessionStorage.removeItem("id-order")
      sessionStorage.removeItem("cache-coment")
      this.dialogCommentsClients = !this.dialogCommentsClients
    }

    commentProductsOrders (pedido:string): void {
      const CACHE_IDS_COMMENTED = localStorage.getItem("list-id-commented")
      let PRODUTOS_NAO_COMENTADOS: any = []

      const PRODUTO_FILTRADO_ID_PEDIDO = this.detailOrder.find(item => {
        if (String(item.pedido || "") === String(pedido || "")) {
          return item.produtos
        }
      })

      sessionStorage.setItem("id-order", pedido)

      if (!CACHE_IDS_COMMENTED) {
        sessionStorage.setItem("cache-coment", JSON.stringify([...PRODUTO_FILTRADO_ID_PEDIDO.produtos]))
        this.dialogCommentsClients = !this.dialogCommentsClients
        return
      } else {
        const SPLIT_ARRAY_COMMENT = JSON.parse(CACHE_IDS_COMMENTED).join("").split("&")

        if (String(SPLIT_ARRAY_COMMENT[0]) === String(pedido)) {
          PRODUTO_FILTRADO_ID_PEDIDO.produtos.filter(produtoComentado => {
            if (String(SPLIT_ARRAY_COMMENT[1]) !== String(produtoComentado.id)) {
              PRODUTOS_NAO_COMENTADOS = [
                ...PRODUTOS_NAO_COMENTADOS,
                produtoComentado
              ]
              sessionStorage.setItem("cache-coment", JSON.stringify(PRODUTOS_NAO_COMENTADOS))
            }
          })
        } else sessionStorage.setItem("cache-coment", JSON.stringify([...PRODUTO_FILTRADO_ID_PEDIDO.produtos]))

        this.dialogCommentsClients = !this.dialogCommentsClients
      }
    }
  }
</script>
