<template>
  <v-main>
    <v-container
      fluid
      class="pa-0"
    >
      <toolbar-component />

      <v-row
        v-width.max="'1440px'"
        no-gutters
        class="mx-auto"
      >
        <v-col
          cols="12"
        >
          <router-view
            name="viewProductEntrada"
          />
        </v-col>

        <v-col
          cols="12"
        >
          <router-view
            name="viewProductPecas"
          />
        </v-col>

        <v-col
          cols="12"
        >
          <router-view
            name="viewProductTemaki"
          />
        </v-col>

        <v-col
          cols="12"
        >
          <router-view
            name="viewProductTemakiSemArroz"
          />
        </v-col>

        <v-col
          cols="12"
        >
          <router-view
            name="viewProductTemakiSupremo"
          />
        </v-col>


        <v-col
          cols="12"
        >
          <router-view
            name="viewProductHot"
          />
        </v-col>

        <v-col
          cols="12"
        >
          <router-view
            name="viewProductEspecial"
          />
        </v-col>

        <v-col
          cols="12"
        >
          <router-view
            name="viewProductCombinados"
          />
        </v-col>

        <v-col
          cols="12"
        >
          <router-view
            name="viewProductDoces"
          />
        </v-col>
      </v-row>

      <footer-component />
    </v-container>

    <button-cart-product />
    <dialog-complements-product />

    <dialog-slot-funcionalidades-component>
      <template
        #ordersClient
      />
    </dialog-slot-funcionalidades-component>

    <button-whats-chat />
    <overlay-loading-service />
  </v-main>
</template>

<script lang="ts">
  import { Component } from "vue-property-decorator"
  import { mixins } from "vue-class-component"
  import { namespace } from "vuex-class"
  import MixinProductAPI from "@/mixins/product/mixinProductAPI"
  import { channelSource } from "@/helpers/analyticsChannel"

  const cacheStore = namespace("cacheStoreModule")
  const payloadStore = namespace("payloadStoreModule")
  const dialogStore = namespace("dialogStoreModule")

  @Component({
    components: {
      ToolbarComponent: () => import(
        /* webpackChunkName: "toolbar-component" */
        /* webpackMode: "eager" */
        "@/components/ToolbarComponent.vue"
      ),
      FooterComponent: () => import(
        /* webpackChunkName: "footer-component" */
        /* webpackMode: "eager" */
        "@/components/FooterComponent.vue"
      ),
      dialogSlotFuncionalidadesComponent: () => import(
        /* webpackChunkName: "dialog-slot-funcionalidades-component" */
        /* webpackMode: "eager" */
        "@/components/dialogs/DialogSlotFuncionaliades.vue"
      ),
      ButtonCartProduct: () => import(
        /* webpackChunkName: "button-cart-porduct-component" */
        /* webpackMode: "eager" */
        "@/components/buttons/ButtonCartProduct.vue"
      ),
      DialogComplementsProduct: () => import(
        /* webpackChuckName: "dialog-complements-product-component" */
        /* webpackMode: "eager" */
        "@/components/dialogs/DialogComplementsProduct.vue"
      ),
      ButtonWhatsChat: () => import(
        /* webpackChunkName: "button-whatschat-porduct-component" */
        /* webpackMode: "eager" */
        "@/components/buttons/ButtonWhatsChat.vue"
      ),
      OverlayLoadingService: () => import(
        /* webpackChunkName: "overlay-loading-service-component" */
        /* webpackMode: "eager" */
        "@/components/overlays/LoadingService.vue"
      ),
    }
  })
  export default class RouteProductView extends mixins(
    MixinProductAPI,
  ) {
    beforeRouteEnter (
      to: {
        name: string;
        params: {
          type: string|RegExp
        },
      },
      _from: never,
      next: (arg0: (vm) => void) => void,
    ) {
      next((vm) => {

        if (vm.ordersCostumer && JSON.parse(vm.ordersCostumer).length > 0) {
          vm.setDialogOrdersClient(!vm.getDialogOrdersClient())
        }
        if (!/^(foodpark|delivery)$/i.test(String(to.params.type || ""))) {
          location.replace(`/${location.search}`)
        }
      })
    }

    @dialogStore.Getter("DialogOrdersClient") getDialogOrdersClient
    @dialogStore.Action("ActionDialogOrdersClient") setDialogOrdersClient
    @cacheStore.Action("ActionCacheRastreamentoUsuarioSource") setCacheRastreamentoUsuarioPayloadSource
    @payloadStore.Action("ActionPayloadChannelAnalytics") setPayloadChannelAnalytics

    ordersCostumer = sessionStorage.getItem("order")

    created (): void {
      this.getProducts()
      channelSource().then((source: string) => {
        this.setCacheRastreamentoUsuarioPayloadSource({ source: String(source) })
        this.setPayloadChannelAnalytics()
      })
    }
  }
</script>
