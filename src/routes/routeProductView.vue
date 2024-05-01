<template>
  <v-main>
    <v-container
      fluid
      class="pa-0"
    >
      <toolbar-component />

      <v-row
        v-width.max="'1100px'"
        no-gutters        
        class="mx-auto"
      >
        <v-col
          cols="12"
        >
          <router-view 
            name="viewProductEntrada"
          />
        </v-col>


        <v-col 
          cols="12"
          class="py-8"
        />

        <v-col
          cols="12"
        >
          <router-view 
            name="viewProductPecas"
          />
        </v-col>

        <v-col 
          cols="12"
          class="py-8"
        />

        <v-col
          cols="12"
        >
          <router-view 
            name="viewProductTemaki"
          />
        </v-col>

        <v-col 
          cols="12"
          class="py-8"
        />

        <v-col
          cols="12"
        >
          <router-view 
            name="viewProductHot"
          />
        </v-col>
      </v-row>


      <!-- <footer-component /> -->
    </v-container>

    <dialog-slot-funcionalidades-component>
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
      FooterComponent: () => import(
        /* webpackChunkName: "footer-component" */
        /* webpackMode: "eager" */
        "@/components/FooterComponent.vue"
      ),
      dialogSlotFuncionalidadesComponent: () => import(
        /* webpackChunkName: "dialog-slot-funcionalidades-component" */
        /* webpackMode: "eager" */
        "@/components/dialogs/dialogSlotFuncionaliades.vue"
      ),
    }
  })
  export default class RouteProductView extends Vue {
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
        if (to.params.type) {
          if (/delivery/i.test(String(to.params.type))) {
            vm.setDialogCepDelivery(!vm.getDialogCepDelivery())
          }
        }
      })
    }

    @dialogStore.Getter("DialogCepDelivery") getDialogCepDelivery
    @dialogStore.Action("ActionCepDelivery") setDialogCepDelivery
  }
</script>