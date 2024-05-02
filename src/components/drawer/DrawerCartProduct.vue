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
          cols="12"
          class="px-4"
          style="line-height: 1;"
        >
          <span
            v-font-size="14"
            class="font-weight-thin warning--text"
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
        >
          <v-divider
            color="white"
            class="mx-1"
          />
        </v-col>

        <v-col
          cols="12"
          class="px-4"
        >
          <v-row
            no-gutters
          >
            <v-col
              v-for="item in getCacheOrderCart()"
              :key="`cart-product-${item.name}`"
              cols="12"
            >
              <v-row
                no-gutters
                class="my-2 pa-2"
              >
                <v-col
                  cols="12"
                >
                  <span
                    v-font-size="$vuetify.breakpoint.smAndDown ? 13 : 16"
                    class="font-weight-medium pr-2 text-uppercase"
                    v-text="item.name"
                  />
                  <span
                    v-font-size="12"
                    class="font-weight-thin"
                    v-text="`(${item.price.qtd_product}x)`"
                  />
                </v-col>

                <v-col
                  cols="12"
                  class="py-1"
                />

                <v-col
                  cols="12"
                >
                  <span
                    v-font-size="$vuetify.breakpoint.smAndDown ? 16 : 18"
                    class="font-weight-medium pr-2 text-uppercase"
                    v-text="formatedPrice(item.price.total)"
                  />
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
                  >
                    <v-col
                      cols="8"
                      class="d-flex align-center"
                    >
                      <v-btn
                        color="secondary"
                        fab
                        dense
                        depressed
                        dark
                        style="width:20px;height:20px"
                      >
                        <v-icon>
                          remove
                        </v-icon>
                      </v-btn>
                      <span
                        v-font-size="20"
                        class="font-weight-bold mx-3"
                      >
                        {{ item.price.qtd_product }}
                      </span>
                      <v-btn
                      color="secondary"
                        fab
                        dense
                        depressed
                        dark
                        style="width:20px;height:20px"
                      >
                        <v-icon>
                          add
                        </v-icon>
                      </v-btn>
                    </v-col>
                    <v-col
                      cols="4"
                      class="text-end"
                    >
                      <v-btn
                        text
                        color="error"
                        title="Remover produto do carrinho"
                      >
                        <v-icon>
                          delete
                        </v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-col>

                <v-col
                  cols="12"
                  class="py-1"
                />

                <v-col
                  cols="12"
                >
                  <v-btn
                    text
                    color="secondary"
                    block
                  >
                    <span
                      v-font-size="12"
                      class="font-weight-medium"
                    >
                      Ver complementos
                    </span>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>

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
            v-text="formatedPrice(1000)"
          />
        </v-col>

        <v-col
          cols="12"
        >
          <v-card-actions>
            <v-btn
              block
              color="secondary"
            >
              <span
                v-font-size="14"
                class="font-weight-bold primary--text"
              >
                Concluir pedido
              </span>
            </v-btn>
          </v-card-actions>
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

  @Component({})
  export default class DrawerCartProduct extends mixins(
    MixinHelperServiceProduct,
  ) {
    @cacheStore.Getter("CacheDrawerCartProduct") getDrawerCartProduct
    @cacheStore.Action("ActionCacheDrawerCartProduct") setDrawerCartProduct
    @cacheStore.Getter("CacheOrderCart") getCacheOrderCart

    get drawerCartProduct (): boolean {
      return this.getDrawerCartProduct()
    }

    set drawerCartProduct (value: boolean) {
      this.setDrawerCartProduct(value)
    }
  }
</script>
