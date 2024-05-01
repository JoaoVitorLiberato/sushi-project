<template>
  <v-navigation-drawer
    v-model="drawerCartProduct"
    right
    temporary
    app
    :width="$vuetify.breakpoint.smAndDown ? '90%' : '500'"
    color="primary"
  >
    <v-row
      no-gutters
    >
      <v-col
        v-for="item in getCacheOrderCart()"
        :key="`cart-product-${item.name}`"
        cols="12"
      >
        <span>
          {{ item.name }} - {{ item.price.total }}
        </span>
      </v-col>
    </v-row>
  </v-navigation-drawer>
</template>

<script lang="ts">
  import { Component } from "vue-property-decorator"
  import { mixins } from "vue-class-component"
  import { namespace } from "vuex-class"

  const cacheStore = namespace("cacheStoreModule")

  @Component({})
  export default class DrawerCartProduct extends mixins() {
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
