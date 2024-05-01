<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script lang="ts">
  import { Component } from "vue-property-decorator"
  import { mixins } from "vue-class-component"

  @Component({})

  export default class app extends mixins() {}
</script>

<style lang="stylus">
  #app
    background-color: var(--v-primary-base)
    color:var(--v-primary-text)
    .application--wrap
      height 100vh
</style>
