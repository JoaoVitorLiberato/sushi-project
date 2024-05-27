<template>
  <v-navigation-drawer
    v-model="drawerCartProduct"
    right
    temporary
    app
    :width="$vuetify.breakpoint.smAndDown ? '90%' : '500'"
    color="primary"
  >
    <v-card
      color="primary"
      style="color:var(--v-primary-text)"
    >
      <v-row
        no-gutters
      >
        <v-col
          cols="12"
          class="pa-4"
        >
          <span
            class="font-weight-medium text-uppercase"
          >
            Seus Produtos
          </span>
        </v-col>

        <v-col
          v-if="getCacheOrderCart().length > 0"
          cols="12"
          class="px-4"
          style="line-height: 1;"
        >
          <span
            v-font-size="13"
            class="font-weight-regular warning--text"
          >
            <strong>Atenção:</strong> Todos produtos que estão no carrinho de compras,
            pode alterar ou remover caso tenha adicionado por engano. Role para baixo para
            concluir seu pedido.
          </span>
        </v-col>

        <v-col
          cols="12"
          class="py-2"
        />

        <v-col
          cols="12"
          class="px-4"
        >
          <div
            v-if="getCacheOrderCart().length <= 0"
            class="py-3 text-center"
          >
            <span
              class="grey--text font-weight-regular font-italic"
            >
              O carrinho está sem produtos
            </span>
          </div>

          <v-row
            v-else
            no-gutters
            style="height: 100%;"
          >
            <v-col
              v-for="item in getCacheOrderCart()"
              :key="`cart-product-${item.name}`"
              cols="12"
            >
              <card-product-cart
                :name="item.name"
                :qtd_product="item.price.qtd_product"
                :price_total="item.price.total"
                :price_default="sumPriceDefaultWhiteDiffences(item)"
                :complements="item.complements"
                :differences="item.differences"
                @deleteProduct="removeProductCart(item.id)"
              />
            </v-col>
          </v-row>
        </v-col>


        <v-col
          cols="12"
          style="height: 155px;"
        />

        <v-col
          v-position.relative
          cols="12"
        >
          <v-row
            v-position.fixed
            no-gutters
            style="bottom:0;right:0;left:0;"
            class="primary"
          >
            <v-col
              cols="12"
            >
              <v-divider
                color="white"
                class="mx-1"
              />
            </v-col>

            <v-col
              cols="12"
              class="py-1"
            />

            <v-col
              cols="12"
              class="px-4"
            >
              <span
                v-font-size="14"
                class="font-weight-medium text-uppercase"
              >
                preço total:
              </span>
            </v-col>

            <v-col
              cols="12"
              class="px-4"
            >
              <span
                v-font-size="26"
                class="font-weight-medium"
                v-text="formatedPrice(priceTotalOrder)"
              />
            </v-col>

            <v-col
              cols="12"
              class="py-2"
            />

            <v-col
              cols="12"
              class="pa-2"
            >
              <v-btn
                block
                color="secondary"
                large
              >
                <span
                  v-font-size="14"
                  class="font-weight-bold primary--text"
                  @click="prepareAddToCart"
                >
                  Concluir pedido
                </span>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>

      </v-row>
    </v-card>
  </v-navigation-drawer>
</template>

<script lang="ts">
  import { Component } from "vue-property-decorator"
  import { mixins } from "vue-class-component"
  import { namespace } from "vuex-class"
  import MixinHelperServiceProduct from "@/mixins/help-mixin/MixinHelperServiceProduct"

  const cacheStore = namespace("cacheStoreModule")
  const payloadStore = namespace("payloadStoreModule")

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const ENV = (env?: string): string|boolean => window.env(env)

  @Component({
    components: {
      CardProductCart: () => import(
        /* webpackChuckName: "card-product-cart-component" */
        /* webpackMode: "eager" */
        "@/components/cards/CardProductCart.vue"
      )
    }
  })

  export default class DrawerCartProduct extends mixins(
    MixinHelperServiceProduct,
  ) {
    @cacheStore.Getter("CacheDrawerCartProduct") getDrawerCartProduct
    @cacheStore.Action("ActionCacheDrawerCartProduct") setDrawerCartProduct
    @cacheStore.Getter("CacheOrderCart") getCacheOrderCart
    @payloadStore.Action("actionPayloadProducts") setPayloadProducts

    get drawerCartProduct (): boolean {
      return this.getDrawerCartProduct()
    }

    set drawerCartProduct (value: boolean) {
      this.setDrawerCartProduct(value)
    }

    prepareAddToCart (): void {
      if (ENV("production") || !this.getCacheOrderCart() || this.getCacheOrderCart().length <= 0) return
      this.setPayloadProducts(this.getCacheOrderCart())
      this.drawerCartProduct = !this.drawerCartProduct
      this.$router.replace(`/pedido/${this.$route.params.type}/finalizar${location.search}`)
    }
  }
</script>
