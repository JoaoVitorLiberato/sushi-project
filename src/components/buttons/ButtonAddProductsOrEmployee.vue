<template>
  <div>
    <v-speed-dial
      v-model="open"
      bottom
      right
      fixed
      :direction="$vuetify.breakpoint.smAndDown ? 'top' : 'left'"
      transition="slide-y-reverse-transition"
    >
      <template v-slot:activator>
        <v-btn
          v-model="open"
          color="secondary"
          fab
          depressed
        >
          <v-icon
            v-if="open"
            color="primary"
          >
            close
          </v-icon>
          <v-icon
            v-else
            color="primary"
          >
            add
          </v-icon>
        </v-btn>
      </template>

      <v-btn
        v-show="/orders/i.test(String(service))"
        :fab="$vuetify.breakpoint.smAndDown"
        color="secondary"
        large
        depressed
        title="Botão para cadastrar pedido da bancada"
        @click="dialogRegisterOrderSegmentBench = !dialogRegisterOrderSegmentBench"
      >
        <v-icon
          color="primary"
        >
          shopping_cart
        </v-icon>

        <span
          class="primary--text ml-2 hidden-sm-and-down"
        >
          Registrar Pedido
        </span>
      </v-btn>

      <v-btn
        v-show="/employee/i.test(String(service))"
        :fab="$vuetify.breakpoint.smAndDown"
        color="secondary"
        large
        depressed
        title="Botão para cadastrar funcionário"
        @click="dialogRegisterEmployee = !dialogRegisterEmployee"
      >
        <v-icon
          color="primary"
        >
          person_add
        </v-icon>

        <span
          class="primary--text ml-2 hidden-sm-and-down"
        >
          Registrar Funcionário
        </span>
      </v-btn>

      <v-btn
        v-show="/products/i.test(String(service))"
        :fab="$vuetify.breakpoint.smAndDown"
        color="secondary"
        large
        depressed
        title="Botão para cadastrar produto"
        @click="dialogRegisterProduct = !dialogRegisterProduct"
      >
        <v-icon
          color="primary"
        >
          library_books
        </v-icon>

        <span
          class="primary--text ml-2 hidden-sm-and-down"
        >
          Criar novo produto
        </span>
      </v-btn>

      <v-btn
        v-show="/products/i.test(String(service))"
        :fab="$vuetify.breakpoint.smAndDown"
        color="secondary"
        large
        depressed
        title="Botão para cadastrar produto"
        @click="dialogRegisterComplement = !dialogRegisterComplement"
      >
        <v-icon
          color="primary"
        >
          note_add
        </v-icon>

        <span
          class="primary--text ml-2 hidden-sm-and-down"
        >
          Criar novo complemento
        </span>
      </v-btn>
    </v-speed-dial>

    <dialog-register-employee 
      v-if="dialogRegisterEmployee"
    />
    <dialog-register-product 
      v-if="dialogRegisterProduct"
    />
    <dialog-register-complement
      v-if="dialogRegisterComplement"
    />
    <dialog-register-order-segment-bench
      v-if="dialogRegisterOrderSegmentBench"
    />
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from "vue-property-decorator"
  import { namespace } from "vuex-class"

  const dialogStore = namespace("dialogStoreModule")

  @Component({
    components: {
      DialogRegisterEmployee: () => import(
        /* webpackChuckName: "dialog-register-employee-component" */
        /* webpackMode: "eager" */
        "@/components/dialogs/DialogRegisterEmployee.vue"
      ),
      DialogRegisterProduct: () => import(
        /* webpackChuckName: "dialog-register-product-component" */
        /* webpackMode: "eager" */
        "@/components/dialogs/DialogRegisterProduct.vue"
      ),
      DialogRegisterComplement: () => import(
        /* webpackChuckName: "dialog-register-complement-component" */
        /* webpackMode: "eager" */
        "@/components/dialogs/DialogRegisterComplement.vue"
      ),
      DialogRegisterOrderSegmentBench: () => import(
        /* webpackChuckName: "dialog-register-order-segment-bench-component" */
        /* webpackMode: "eager" */
        "@/components/dialogs/DialogRegisterOrderSegmentBench.vue"
      ),
    }
  })
  export default class ButtonAddProductsOrEmployee extends Vue {
    @Prop({ default: "orders" }) service!: string

    @dialogStore.Getter("DialogRegisterEmployee") getDialogRegisterEmployee
    @dialogStore.Action("ActionDialogRegisterEmployee") setDialogRegisterEmployee
    @dialogStore.Getter("DialogRegisterProduct") getDialogRegisterProduct
    @dialogStore.Action("ActionDialogRegisterProduct") setDialogRegisterProduct
    @dialogStore.Getter("DialogRegisterComplement") getDialogRegisterComplement
    @dialogStore.Action("ActionDialogRegisterComplement") setDialogRegisterComplement
    @dialogStore.Action("ActionDialogRegisterOrderSegmentBench") setDialogRegisterOrderSegmentBench
    @dialogStore.Getter("dialogRegisterOrderSegmentBench") getDialogRegisterOrderSegmentBench

    get dialogRegisterOrderSegmentBench (): boolean {
      return this.getDialogRegisterOrderSegmentBench()
    }

    set dialogRegisterOrderSegmentBench (value:boolean) {
      this.setDialogRegisterOrderSegmentBench(value)
    }

    get dialogRegisterEmployee (): boolean {
      return this.getDialogRegisterEmployee()
    }

    set dialogRegisterEmployee (value: boolean) {
      this.setDialogRegisterEmployee(value)
    }

    get dialogRegisterProduct (): boolean {
      return this.getDialogRegisterProduct()
    }

    set dialogRegisterProduct (value:boolean) {
      this.setDialogRegisterProduct(value)
    }

    get dialogRegisterComplement (): boolean {
      return this.getDialogRegisterComplement()
    }

    set dialogRegisterComplement (value:boolean) {
      this.setDialogRegisterComplement(value)
    }

    buttonModel = false
    get open (): boolean {
      return this.buttonModel
    }

    set open (value:boolean) {
      this.buttonModel = value
    }
  }
</script>
