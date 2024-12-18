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
            name="viewProducts"
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
      <template
        #tryAgain
      />
      <template
        #storeClosed
      />
    </dialog-slot-funcionalidades-component>

    <button-whats-chat />
    <overlay-loading-service />
    <overlay-message-launch-system />
    <dialog-get-comments-product />

    <overlay-message-delivery-desatived
      v-if="/delivery/i.test(String($route.params.type))"
    />

    <OverlayMessageSegmentFoodpark
      v-if="/foodpark/i.test(String($route.params.type))"
    />
  </v-main>
</template>

<script lang="ts">
  import { Component } from "vue-property-decorator"
  import { mixins } from "vue-class-component"
  import { namespace } from "vuex-class"
  import MixinProductAPI from "@/mixins/product/mixinProductAPI"
  import { channelSource } from "@/helpers/analyticsChannel"

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const ENV = (env?: string): string|boolean => window.env(env)

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
      DialogGetCommentsProduct: () => import(
        /* webpackChunkName: "dialog-get-comments-product-component" */
        /* webpackMode: "eager" */
        "@/components/dialogs/DialogGetCommentsProduct.vue"
      ),
      OverlayMessageLaunchSystem: () => import(
        /* webpackChunkName: "overlay-message-launch-system-component" */
        /* webpackMode: "eager" */
        "@/components/overlays/MessageLaunchSystem.vue"
      ),
      OverlayMessageDeliveryDesatived: () => import(
        /* webpackChunkName: "overlay-message-launch-system-component" */
        /* webpackMode: "eager" */
        "@/components/overlays/MessageDeliveryDesatived.vue"
      ),
      OverlayMessageSegmentFoodpark: () => import(
        /* webpackChunkName: "overlay-message-launch-system-component" */
        /* webpackMode: "eager" */
        "@/components/overlays/MessageSegmentFoodpark.vue"
      ),
    }
  })
  export default class RouteProductView extends mixins(
    MixinProductAPI,
  ) {
    @dialogStore.Getter("DialogOrdersClient") getDialogOrdersClient
    @dialogStore.Action("ActionDialogOrdersClient") setDialogOrdersClient
    @cacheStore.Getter("CacheOverlayMessageLaunchStore") getCacheOverlayMessageLaunchStore
    @cacheStore.Action("ActionCacheOverlayMessageLaunchStore") setCacheOverlayMessageLaunchStore
    @cacheStore.Action("ActionCacheRastreamentoUsuarioSource") setCacheRastreamentoUsuarioPayloadSource
    @payloadStore.Action("ActionPayloadChannelAnalytics") setPayloadChannelAnalytics

    ordersCostumer = sessionStorage.getItem("order")

    get overlayMessageLaunchStore ():boolean {
      return this.getCacheOverlayMessageLaunchStore()
    }

    set overlayMessageLaunchStore (value) {
      this.setCacheOverlayMessageLaunchStore(value)
    }

    created (): void {
      if (this.ordersCostumer && JSON.parse(this.ordersCostumer).length > 0) {
        this.setDialogOrdersClient(!this.getDialogOrdersClient())
      }

      if (!/^(foodpark|delivery)$/i.test(String(this.$route.params.type || ""))) {
        location.replace(`/${location.search}`)
      }

      this.getProducts()
        .then(responseMixin => {
          if (/list-void-product/i.test(String(responseMixin || ""))) this.$router.replace({ name: "home" })
        })

      channelSource().then((source: string) => {
        this.setCacheRastreamentoUsuarioPayloadSource({ source: String(source) })
        this.setPayloadChannelAnalytics()
      })
    }
  }
</script>
