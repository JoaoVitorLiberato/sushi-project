<template>
  <v-row
    v-if="filterDataProduct('hot').length > 0"
    no-gutters
    class="pa-4"
  >
    <v-col
      cols="12"
    >
      <v-row
        no-gutters
      >
        <v-col
          cols="12"
        >
          <h2
            class="font-weight-bold text-uppercase"
          >
            Hot's
          </h2>
        </v-col>

        <v-col
          cols="12"
        >
          <content-section-products-order-component 
            category="hot"
          />
        </v-col>
      </v-row>
    </v-col>

    <v-col
      cols="12"
      class="py-1 py-sm-6"
    />
  </v-row>
</template>

<script lang="ts">
  import { Vue, Component } from "vue-property-decorator"
  import { filterDataProduct } from "@/helpers/filterProducts"

  @Component({
    components: {
      ContentSectionProductsOrderComponent: () => import(
        /* webpackChunkName: "content-section-products-order-component" */
        /* webpackMode: "eager" */
        "@/components/content/section-order/SectionProductsOrder.vue"
      )
    }
  })

  export default class viewProductHot extends Vue {
    filterDataProduct = filterDataProduct
  }
</script>
