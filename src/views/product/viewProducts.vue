<template>
  <v-row
    no-gutters
    class="pa-4"
  >
    <v-col
      v-for="{ id, name } in categories"
      :key="`contatiner-${name}-${id}`"
      v-show="filterDataProduct(id).length > 0"
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
            v-text="name"
          />
        </v-col>

        <v-col
          cols="12"
        >
          <content-section-products-order-component
            :category="id"
          />
        </v-col>

        <v-col
          v-show="filterDataProduct(id).length > 0"
          cols="12"
          class="py-1 py-sm-6"
        />
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator"
  import { filterDataProduct } from "@/helpers/filterProducts"
  import DATA_CATEGORIES_DEFAULT from "@/data/products/category.json"

  @Component({
    components: {
      ContentSectionProductsOrderComponent: () => import(
        /* webpackChunkName: "content-section-products-order-component" */
        /* webpackMode: "eager" */
        "@/components/content/section-order/SectionProductsOrder.vue"
      )
    }
  })

  export default class viewProductCombinados extends Vue {
    filterDataProduct = filterDataProduct

    get categories (): typeof DATA_CATEGORIES_DEFAULT {
      return DATA_CATEGORIES_DEFAULT
    }
  }
</script>
