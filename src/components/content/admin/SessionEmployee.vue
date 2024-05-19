<template>
  <v-row
    no-gutters
  >
    <v-col
      cols="12"
    >
      funcionários
    </v-col>
  </v-row>
</template>

<script lang="ts">
  import { Component } from "vue-property-decorator"
  import { mixins } from "vue-class-component"

  @Component({})
  export default class ContentAdminSessionEmployee extends mixins() {}
</script>
