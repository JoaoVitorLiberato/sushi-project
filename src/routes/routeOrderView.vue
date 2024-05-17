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

    <dialog-slot-funcionalidades-component>
      <template
        #tryAgain
      />
    </dialog-slot-funcionalidades-component>

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
      dialogSlotFuncionalidadesComponent: () => import(
        /* webpackChunkName: "dialog-slot-funcionalidades-component" */
        /* webpackMode: "eager" */
        "@/components/dialogs/DialogSlotFuncionaliades.vue"
      ),
    }
  })
  export default class routeOrderView extends Vue {}
</script>