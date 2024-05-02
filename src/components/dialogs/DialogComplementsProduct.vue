<template>
  <v-dialog
    v-model="dialogComplements"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
    scrollable
  >
    <v-card
      tile
    >
      <v-row
        no-gutters
      >
        <v-col
          cols="12"
        >
          <v-toolbar
            flat
            color="secondary"
          >
            <v-toolbar-title
              class="font-weight-bold text-uppercase"
            >
              Complementos
            </v-toolbar-title>
          </v-toolbar>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator"
  import { namespace } from "vuex-class"
  import DATA_COMPLEMENTS_ADDITIONAL from "@/data/complements/complementAdditional.json"
  import DATA_COMPLEMENTS_ESPECIAL from "@/data/complements/complementEspecial.json"

  const dialogStore = namespace("dialogStoreModule")

  @Component({})
  export default class DialogComplementsProduct extends Vue {
    @dialogStore.Action("ActionDialogComplements") setDialogComplements
    @dialogStore.Getter("DialogComplements") getDialogComplements

    get returnComplementEspecial (): typeof DATA_COMPLEMENTS_ESPECIAL {
      return DATA_COMPLEMENTS_ESPECIAL
    }

    get returnComplementAdditional (): typeof DATA_COMPLEMENTS_ADDITIONAL {
      return DATA_COMPLEMENTS_ADDITIONAL
    }

    get dialogComplements (): boolean {
      return this.getDialogComplements()
    }

    set dialogComplements (value:boolean) {
      this.setDialogComplements(value)
    }

  }
</script>
