<template>
  <v-row
    no-gutters
    class="pa-4"
  >
    <v-col
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
          >
            Combinados
          </h2>
        </v-col>

        <v-col
          cols="12"
        >
          <content-section-order-component 
            category="combinados"
          />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
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

  export default class viewProductCombinados extends Vue {}
</script>
