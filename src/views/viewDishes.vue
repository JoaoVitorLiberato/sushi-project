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
        v-font-size="$vuetify.breakpoint.smAndDown ? 19 : 27"
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
        v-if="cacheLoading.status"
        v-width.max="'400px'"
        class="mx-auto text-center"
      >
        <v-progress-linear 
          color="secondary"
          indeterminate
        />

        <span
        class="white--text d-block my-3 font-weight-regular"
        >
          {{ cacheLoading.msg }}
        </span>
      </div>

      <div
        v-else
        v-width.max="'1100px'"
        class="d-flex justify-center mx-auto"
      >
        <card-product-component
          v-for="(item, index) in productDataApperStart"
          :key="`card-dishes-selected-${index}`"
          :image="item.url_image"
          :title="item.name"
          :note_client="item.note_client"
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
        <div
          v-if="cacheLoading.status"
          v-width.max="'400px'"
          class="mx-auto pt-14 text-center"
        >
          <v-progress-linear 
            color="secondary"
            indeterminate
          />

          <span
          class="white--text d-block my-3 font-weight-regular"
          >
            {{ cacheLoading.msg }}
          </span>
        </div>

        <v-slide-group
          v-else
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
                :note_client="item.note_client"
                :description="item.description"
              />
            </div>
          </v-slide-item>
        </v-slide-group>
      </div>
    </v-col>

    <v-col
      cols="12"
      class="py-8 py-md-4"
    />

    <v-col
      cols="12"
      class="d-flex justify-center py-md-4"
    >
      <v-btn
        color="secondary"
        x-large
        depressed
        class="text-none"
        :width="$vuetify.breakpoint.smAndDown ? '100%': '385px'"
        @click="getDialogSegmentProducts"
      >
        <span
          v-font-size="14"
          class="font-weight-bold primary--text text-uppercase"
          v-text="'Conhecer nossos produtos'"
        />
      </v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator"
  import { filterDataProduct } from "@/helpers/filterProducts"
  import { namespace } from "vuex-class"
  import "@/styles/view/viewDishes.styl"

  const cacheStore = namespace("cacheStoreModule")
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

  export default class viewDishes extends Vue {
    @dialogStore.Getter("DialogServiceClient") getDialogServiceClient
    @dialogStore.Action("ActionDialogServiceClient") setDialogSeviceClient
    @cacheStore.Getter("CacheLoading") getCacheLoading

    get cacheLoading (): {
      status: boolean,
      msg: string
    }  {
      return this.getCacheLoading()
    }

    get dialogServiceClient (): boolean {
      return this.getDialogServiceClient()
    }

    set dialogServiceClient (value: boolean) {
      this.setDialogSeviceClient(value)
    }

    get productDataApperStart () {
      return filterDataProduct().filter(productIndividual => {
        return productIndividual.apper_start === true
      })
    }

    getDialogSegmentProducts (): void {
      this.dialogServiceClient = !this.dialogServiceClient
    }
  }
</script>
