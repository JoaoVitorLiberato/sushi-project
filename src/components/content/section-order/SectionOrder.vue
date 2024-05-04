<template>
  <v-row
    no-gutters
  >
    <v-col
      cols="12"
      class="hidden-xs-only"
    >
      <v-slide-group
        show-arrows
        prev-icon="arrow_back"
        next-icon="arrow_forward"
        :class="`d-flex fix--v-slide-group flex-wrap`"
        center-active
        mandatory
      >
        <v-slide-item
          v-for="(item, index) in filterDataProduct(category)"
          :key="`slide-card-dishes-selected-${index}`"
          class="mr-5"
        >
          <div>
            <card-product-component
              :image="item.url_image"
              :title="item.name"
              :description="item.description"
              :breaded="item.price.breaded"
              :product="item"
            />
          </div>
        </v-slide-item>
      </v-slide-group>
    </v-col>
    <v-col
      cols="12"
      class="hidden-sm-and-up"
      style="width: 100%;max-width: 375px;margin:0 auto"
    >
      <v-carousel
        hide-delimiters
        class="fix-caroucel-cards"
        bottom
      >
        <v-carousel-item
          v-for="(item, index) in filterDataProduct(category)"
          :key="`caroucel-card-dishes-selected-${index}`"
        >
          <card-product-component
            :image="item.url_image"
            :title="item.name"
            :description="item.description"
            :breaded="item.price.breaded"
            :product="item"
          />
        </v-carousel-item>
    </v-carousel>
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

    get productData () {
      return filterDataProduct(this.category)
    }
    
  }
</script>
