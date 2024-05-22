<template>
  <v-row
    no-gutters
  >
    <v-col
      cols="12"
    >
      <card-order-admin-component />
    </v-col>
  </v-row>
</template>

<script lang="ts">
  import { Component } from "vue-property-decorator"
  import { mixins } from "vue-class-component"

  @Component({
    components: {
      CardOrderAdminComponent: () => import(
        /* webpackChuckName: "card-order-admin-component" */
        /* webpackMode: "eager" */
        "@/components/cards/CardOrderAdmin.vue"
      )
    }
  })
  export default class ContentAdminSessionOrders extends mixins() {}
</script>
