<template>
  <div>
    <v-btn
      color="secondary"
      fab
      large
      fixed
      right
      bottom
      class="v-btn--example"
      title="Botão abrir carrinho"
      @click="drawerCartProduct = !drawerCartProduct"
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
  import { Component, Vue } from "vue-property-decorator"
  import { namespace } from "vuex-class"

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
  export default class ButtonCartProduct extends Vue {
    @cacheStore.Getter("CacheOrderCart") getCacheOrderCart
    @cacheStore.Getter("CacheDrawerCartProduct") getDrawerCartProduct
    @cacheStore.Action("ActionCacheDrawerCartProduct") setDrawerCartProduct

    get drawerCartProduct (): boolean {
      return this.getDrawerCartProduct()
    }

    set drawerCartProduct (value: boolean) {
      this.setDrawerCartProduct(value)
    }
  }
</script>