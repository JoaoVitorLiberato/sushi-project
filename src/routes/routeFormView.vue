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
    </dialog-slot-funcionalidades-component>
  </v-main>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator"
  import { namespace } from "vuex-class"

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
    }
  })
  export default class routeFormView extends Vue {
    beforeRouteEnter (
      to: {
        name: string;
        params: {
          type: string|RegExp
        },
        query: {
          location: string|RegExp
        }
      },
      _from: never,
      next: (arg0: (vm) => void) => void,
    ) {
      next((vm) => {
        if (/delivery/i.test(String(to.query.location || ""))) {
          vm.setDialogCepDelivery(!vm.getDialogCepDelivery())
        }
      })
    }

    @dialogStore.Getter("DialogCepDelivery") getDialogCepDelivery
    @dialogStore.Action("ActionDialogCepDelivery") setDialogCepDelivery
  }

</script>
