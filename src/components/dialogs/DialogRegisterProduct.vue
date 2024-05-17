<template>
  <v-dialog
    fullscreen
    v-model="dialogRegisterProduct"
  >
    <v-card
      color="white"
      style="border-radius: 0;"
    >
      <v-row
        no-gutters
        style="max-width: 1100px;"
        class="pa-4 mx-auto"
      >
        <v-col
          cols="12"
          class="text-end"
        >
          <v-btn
            text
            color="primary"
            fab
            @click.stop="dialogRegisterProduct = !dialogRegisterProduct"
            @keydown.esc.prevent="dialogRegisterProduct = !dialogRegisterProduct"
          >
            <v-icon
              size="32"
            >
              close
            </v-icon>
          </v-btn>
        </v-col>

        <v-col
          cols="12"
          class="py-3"
        />

        <v-col
          cols="12"
          class="text-center"
        >
          <h2
            v-font-size="$vuetify.breakpoint.smAndDown ? 21 : 26"
            class="font-weight-bold text-uppercase"
          >
            Registrar produto
          </h2>
        </v-col>

        <v-col
          cols="12"
          class="py-3"
        />

        <v-col
          cols="12"
          style="max-width: 400px;"
          class="mx-auto"
        >
          <div>
            comidas
          </div>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
  import { Component } from "vue-property-decorator"
  import { mixins } from "vue-class-component"
  import { $refs } from "@/implements/types"
  import { namespace } from "vuex-class"

  const dialogStore = namespace("dialogStoreModule")

  @Component({})
  export default class DialogRegisterProduct extends mixins(

  ) implements $refs {
    $refs

    @dialogStore.Getter("DialogRegisterProduct") getDialogRegisterProduct
    @dialogStore.Action("ActionDialogRegisterProduct") setDialogRegisterProduct

    showPassword = false

    get dialogRegisterProduct (): boolean {
      return this.getDialogRegisterProduct()
    }

    set dialogRegisterProduct (value:boolean) {
      this.setDialogRegisterProduct(value)
    }

    data = {}
  }
</script>