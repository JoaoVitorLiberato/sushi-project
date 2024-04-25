<template>
  <v-row
    no-gutters
    class="pa-4"
  >
    <v-col
      cols="12"
      class="mt-5 text-center"
      style="line-height: 1"
    >
      <h2
        v-font-size="$vuetify.breakpoint.smAndDown ? 23 : 27"
        class="font-weight-bold text-uppercase"
        style="color: var(--v-primary-text)"
      >
        Confira Alguns dos nossos pratos
      </h2>
    </v-col>

    <v-col
      cols="12"
      class="py-md-8"
    />

    <v-col
      cols="12"
      class="hidden-sm-and-down"
    >
      <div
        v-width.max="'1100px'"
        class="d-flex justify-center mx-auto"
      >
        <card-product-component
          v-for="(item, index) in productDataApperStart"
          :key="`card-dishes-selected-${index}`"
          :image="item.url_image"
          :title="item.name"
          :description="item.description"
        />
      </div>
    </v-col>

    <v-col
      cols="12"
      class="hidden-md-and-up"
    >
      <div
        v-width.max="'1100px'"
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
            v-for="(item, index) in productDataApperStart"
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

    <v-col
      cols="12"
      class="py-8"
    />

    <v-col
      cols="12"
      class="d-flex justify-center"
    >
      <v-btn
        color="secondary"
        large
        depressed
        :width="$vuetify.breakpoint.smAndDown ? '100%': '285px'"
        @click="dialogServiceClient = !dialogServiceClient"
      >
        <span
          v-text="'Eu quero essas gostosuras'"
        />
      </v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts">
  import { Component } from "vue-property-decorator"
  import { mixins } from "vue-class-component"
  import MixinGetProduct from "@/mixins/product/MixinGetProducts"
  import { namespace } from "vuex-class"
  import "@/styles/view/viewDishes.styl"

  const dialogStore = namespace("dialogStoreModule")

  @Component({
    components: {
      CardProductComponent: () => import(
        /* webpackChuckName: "card-product-component" */
        /* webpackMode: "eager" */
        "@/components/cards/CardProduct.vue"
      )
    }
  })

  export default class viewDishes extends mixins(
    MixinGetProduct,
  ) {
    @dialogStore.Getter("DialogServiceClient") getDialogServiceClient
    @dialogStore.Action("ActionServiceClient") setDialogSeviceClient

    get dialogServiceClient (): boolean {
      return this.getDialogServiceClient()
    }

    set dialogServiceClient (value: boolean) {
      this.setDialogSeviceClient(value)
    }
  }
</script>
