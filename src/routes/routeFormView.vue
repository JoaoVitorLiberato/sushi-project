<template>
  <v-main>
    <v-container
      fluid
      class="pa-0"
    >
      <router-view
        name="viewForm"
      />
    </v-container>

    <dialog-slot-funcionalidades-component>
      <template
        #ordersClient
      />
      <template
        #cepDelivery
      />
      <template
        #storeClosed
      />
    </dialog-slot-funcionalidades-component>

    <button-whats-chat />
    <overlay-message-delivery-desatived
      v-if="/delivery/i.test(String($route.params.type))"
    />
    <OverlayMessageSegmentFoodpark
      v-if="/foodpark/i.test(String($route.params.type))"
    />
  </v-main>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator"
  import { namespace } from "vuex-class"
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
      dialogSlotFuncionalidadesComponent: () => import(
        /* webpackChunkName: "dialog-slot-funcionalidades-component" */
        /* webpackMode: "eager" */
        "@/components/dialogs/DialogSlotFuncionaliades.vue"
      ),
      ButtonWhatsChat: () => import(
        /* webpackChunkName: "button-whatschat-porduct-component" */
        /* webpackMode: "eager" */
        "@/components/buttons/ButtonWhatsChat.vue"
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
  export default class routeFormView extends Vue {
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
        const CACHE_CART_PRODUCT = sessionStorage.getItem("order")
        if (!CACHE_CART_PRODUCT || JSON.parse(CACHE_CART_PRODUCT).length <= 0) {
          vm.$router.replace({ name: "product", params: { type: to.params.type } })
          return
        }

        if (/delivery/i.test(String(to.params.type || "")) && !vm.getCacheOverlayMessageDeliveryDesatived()) {
          vm.setDialogCepDelivery(!vm.getDialogCepDelivery())
        }
      })
    }

    @dialogStore.Getter("DialogCepDelivery") getDialogCepDelivery
    @dialogStore.Action("ActionDialogCepDelivery") setDialogCepDelivery
    @cacheStore.Action("ActionCacheRastreamentoUsuarioSource") setCacheRastreamentoUsuarioPayloadSource
    @cacheStore.Getter("CacheOverlayMessageDeliveryDesatived") getCacheOverlayMessageDeliveryDesatived
    @payloadStore.Action("ActionPayloadChannelAnalytics") setPayloadChannelAnalytics

    created (): void {
      channelSource().then((source: string) => {
        this.setCacheRastreamentoUsuarioPayloadSource({ source: String(source) })
        this.setPayloadChannelAnalytics()
      })
    }
  }

</script>
