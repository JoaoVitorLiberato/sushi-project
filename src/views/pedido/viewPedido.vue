<template>
  <v-container
    fluid
    class="pa-0"
  >
    <card-product-component />
  </v-container>
</template>

<script lang="ts">
  import { Vue, Component } from "vue-property-decorator"

  @Component({
    components: {
      CardProductComponent: () => import(
        /* webpackChunkName: "card-product-component" */
        /* webpackMode: "eager" */
        "@/components/cards/CardProduct.vue"
      )
    }
  })

  export default class ViewPedido extends Vue {}
</script>
