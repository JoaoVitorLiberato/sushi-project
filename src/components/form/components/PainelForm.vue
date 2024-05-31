<template>
  <v-card
    :style="`border-radius: 0;${$vuetify.breakpoint.smAndDown ? 'min-height:65px' :  'min-height:980px'}`"
    color="secondary"
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
            class="hidden-sm-and-up text-end"
          >
            <v-btn
              icon
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
        v-if="getCacheOrderCart().length > 0"
      >
        <v-row
          no-gutters
          class="hidden-sm-and-down"
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
              :style="`max-height: ${$vuetify.breakpoint.width > 980 && $vuetify.breakpoint.width < 1080 ? 444 : 510}px;overflow-y: scroll;`"
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
            class="mt-5"
          >
            <v-row
              no-gutters
              class="py-2"
            >
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
          </v-col>
        </v-row>

        <div
          class="hidden-md-and-up"
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
                    :style="`max-height:450px;overflow-y: scroll;`"
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
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
  import { Component, Watch } from "vue-property-decorator"
  import { mixins } from "vue-class-component"
  import { namespace } from "vuex-class"
  import { formatedPrice } from "@/helpers/formatedPrice"
  import MixinHelperServiceProduct from "@/mixins/help-mixin/MixinHelperServiceProduct"

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

  export default class PainelFormComponent extends mixins(
    MixinHelperServiceProduct
  ) {
    @payloadStore.Getter("PayloadOrder") declare getPayloadOrder
    @payloadStore.Action("actionPayloadProducts") setPayloadProducts
    @cacheStore.Getter("CacheOrderCart") declare getCacheOrderCart

    formatedPrice = formatedPrice
    expand = false

    created () {
      this.dicountAplicated()
    }

    @Watch("getCacheOrderCart")
      changeCacheProduct (): void {
        this.setPayloadProducts(this.getCacheOrderCart())
      }

    openPainel (): void {
      if (this.$vuetify.breakpoint.mdAndUp) return
      this.expand = !this.expand
    }
  }
</script>