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
          class="py-1 py-sm-6"
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
          class="py-1 py-sm-6"
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
          class="py-1 py-sm-6"
        />

        <v-col
          cols="12"
        >
          <router-view
            name="viewProductHot"
          />
        </v-col>

        <v-col
          cols="12"
          class="py-1 py-sm-6"
        />

        <v-col
          cols="12"
        >
          <router-view
            name="viewProductEspecial"
          />
        </v-col>
      </v-row>


    <!-- <footer-component /> -->
    </v-container>

    <button-cart-product />
    <dialog-complements-product />

    <dialog-slot-funcionalidades-component>
      <template
        #cepDelivery
      />
      <template
        #ordersClient
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
        "@/components/dialogs/DialogSlotFuncionaliades.vue"
      ),
      ButtonCartProduct: () => import(
        /* webpackChunkName: "button-cart-porduct-component" */
        /* webpackMode: "eager" */
        "@/components/buttons/ButtonCartProduct.vue"
      ),
      DialogComplementsProduct: () => import(
        /* webpackChuckName: "dialog-complements-product-component" */
        /* webpackMode: "eager" */
        "@/components/dialogs/DialogComplementsProduct.vue"
      )
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
            sessionStorage.removeItem("order")
            vm.setDialogCepDelivery(!vm.getDialogCepDelivery())
          }
          if (!/delivery/i.test(String(to.params.type))) {
            if (vm.ordersCostumer && JSON.parse(vm.ordersCostumer).length > 0) {
              vm.setDialogOrdersClient(!vm.getDialogOrdersClient())
            }
          }
        }
      })
    }

    @dialogStore.Getter("DialogCepDelivery") getDialogCepDelivery
    @dialogStore.Action("ActionDialogCepDelivery") setDialogCepDelivery
    @dialogStore.Getter("DialogOrdersClient") getDialogOrdersClient
    @dialogStore.Action("ActionDialogOrdersClient") setDialogOrdersClient

    ordersCostumer = sessionStorage.getItem("order")
  }
</script>
