<template>
  <v-container
    fluid
    class="pa-4"
  >
    <content-section-order-component />
  </v-container>
</template>

<script lang="ts">
  import { Vue, Component } from "vue-property-decorator"

  @Component({
    components: {
      ContentSectionOrderComponent: () => import(
        /* webpackChunkName: "content-section-order-component" */
        /* webpackMode: "eager" */
        "@/components/content/section-order/SectionOrder.vue"
      )
    }
  })

  export default class ViewPedido extends Vue {}
</script>
