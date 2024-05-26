<template>
  <v-main>
    <v-container
      fluid
      class="pa-0"
    >
      <toolbar-component />
      <v-row
        no-gutters
      >
        <v-col
          cols="12"
        >
          <router-view
            name="viewHero"
          />
        </v-col>

        <v-col
          cols="12"
        >
          <router-view
            name="viewDishes"
          />
        </v-col>

        <v-col
          cols="12"
          class="py-3 py-md-4"
        />

        <v-col
          cols="12"
        >
          <router-view
            name="viewDescriptionCook"
          />
        </v-col>

        <v-col
          cols="12"
          class="py-5 py-md-4"
        />

        <v-col
          cols="12"
        >
          <router-view
            name="viewPartners"
          />
        </v-col>

        <v-col
          cols="12"
          class="py-5 py-md-7"
        />

        <v-col
          cols="12"
        >
          <router-view
            name="viewEstabelishLocation"
          />
        </v-col>

        <v-col
          cols="12"
          class="py-5 py-md-14"
        />
      </v-row>
      <footer-component />
    </v-container>

    <dialog-slot-funcionalidades-component>
      <template
        #serviceClient
      />
      <template
        #tryAgain
      />
    </dialog-slot-funcionalidades-component>

    <button-whats-chat />
    <dialog-get-comments-product />
  </v-main>
</template>

<script lang="ts">
  import { Component } from "vue-property-decorator"
  import { mixins } from "vue-class-component"
  import { namespace } from "vuex-class"
  import APIValidadorCEPMixin from "@/mixins/form/MixinFormConfig"
  import MixinProductAPI from "@/mixins/product/mixinProductAPI"

  const cacheStore = namespace("cacheStoreModule")


  @Component({
    components: {
      ToolbarComponent: () => import(
        /* webpackChunkName: "toolbar-component" */
        /* webpackMode: "eager" */
        "@/components/ToolbarComponent.vue"
      ),
      dialogSlotFuncionalidadesComponent: () => import(
        /* webpackChunkName: "dialog-slot-funcionalidades-component" */
        /* webpackMode: "eager" */
        "@/components/dialogs/DialogSlotFuncionaliades.vue"
      ),
      FooterComponent: () => import(
        /* webpackChunkName: "footer-component" */
        /* webpackMode: "eager" */
        "@/components/FooterComponent.vue"
      ),
      ButtonWhatsChat: () => import(
        /* webpackChunkName: "button-whatschat-porduct-component" */
        /* webpackMode: "eager" */
        "@/components/buttons/ButtonWhatsChat.vue"
      ),
      DialogGetCommentsProduct: () => import(
        /* webpackChunkName: "dialog-get-comments-product-component" */
        /* webpackMode: "eager" */
        "@/components/dialogs/dialogGetCommentsProduct.vue"
      )
    }
  })

  export default class routeMain extends mixins(
    APIValidadorCEPMixin,
    MixinProductAPI,
  ) {
    @cacheStore.Action("ActionCacheCepValidation") setCacheCepValidation

    created (): void {
      this.getProducts()
      this.setCacheCepValidation("65272000")
      this.APIValidadorCEPMixin()
    }
  }
</script>
