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
  </v-main>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator"

  @Component({})
  export default class routeFormView extends Vue {}

</script>