<template>
  <v-row
    no-gutters
  >
    <v-col
      cols="12"
    >
      <div
        v-width.max="'1440px'"
        class="mx-auto"
      >
        <v-slide-group
          show-arrows
          mobile
          prev-icon="arrow_back"
          next-icon="arrow_forward"
          :class="`d-flex fix--v-slide-group flex-wrap`"
          center-active
          mandatory
        >
          <v-slide-item
            v-for="(item, index) in filterDataProduct('temaki')"
            :key="`card-dishes-selected-${index}`"
            class="mr-5"
          >
            <div>
              <card-product-component
                :image="item.url_image"
                :title="item.name"
                :description="item.description"
              />
            </div>
          </v-slide-item>
        </v-slide-group>
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from "vue-property-decorator"
  import { filterDataProduct } from "@/helpers/filterProducts"
  import "@/styles/components/caroucels.styl"

  @Component({
    components: {
      CardProductComponent: () => import(
        /* webpackChunkName: "card-product-component" */
        /* webpackMode: "eager" */
        "@/components/cards/CardProduct.vue"
      )
    }
  })

  export default class ContentSectionOrderComponent extends Vue {
    @Prop({ default: "" }) category?: string

    filterDataProduct = filterDataProduct
  }
</script>
