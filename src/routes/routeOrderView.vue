<template>
  <v-main>
    <v-container
      fluid
      class="pa-0"
    >
      <router-view 
        name="viewOrder"
      />
    </v-container>

    <button-whats-chat />
  </v-main>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator"

  @Component({
    components: {
      ButtonWhatsChat: () => import(
        /* webpackChunkName: "button-whatschat-porduct-component" */
        /* webpackMode: "eager" */
        "@/components/buttons/ButtonWhatsChat.vue"
      ),
    }
  })
  export default class routeOrderView extends Vue {}
</script>