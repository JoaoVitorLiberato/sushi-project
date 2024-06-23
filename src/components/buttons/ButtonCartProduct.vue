<template>
  <div>
    <v-btn
      color="secondary"
      fab
      large
      fixed
      right
      bottom
      title="Botão Cart - Abrir o carrinho"
      @click="openButtonCartProducts"
    >
      <v-badge
        color="error"
        :content="getCacheOrderCart().length === 0 ? 0 : getCacheOrderCart().length"
      >
        <v-icon
          color="primary"
        >
          shopping_cart
        </v-icon>
      </v-badge>
    </v-btn>

    <drawer-cart-product />
  </div>
</template>

<script lang="ts">
  import { Component } from "vue-property-decorator"
  import { mixins } from "vue-class-component"
  import { namespace } from "vuex-class"
  import MixinHelperServiceProduct from "@/mixins/help-mixin/MixinHelperServiceProduct"

  const cacheStore = namespace("cacheStoreModule")

  @Component({
    components: {
      DrawerCartProduct: () => import(
        /* webpackChuckName: "drawer-cart-product-component" */
        /* webpackMode: "eager" */
        "@/components/drawer/DrawerCartProduct.vue"
      )
    }
  })
  export default class ButtonCartProduct extends mixins(
    MixinHelperServiceProduct,
  ) {
    @cacheStore.Getter("CacheOrderCart") getCacheOrderCart
    @cacheStore.Getter("CacheDrawerCartProduct") getDrawerCartProduct
    @cacheStore.Action("ActionCacheDrawerCartProduct") setDrawerCartProduct

    get drawerCartProduct (): boolean {
      return this.getDrawerCartProduct()
    }

    set drawerCartProduct (value: boolean) {
      this.setDrawerCartProduct(value)
    }

    openButtonCartProducts (): void {
      this.totalPriceOrderClient()
      this.drawerCartProduct = !this.drawerCartProduct
    }
  }
</script>