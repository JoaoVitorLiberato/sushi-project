<template>
  <v-dialog
    v-model="dialogOpenStore"
    width="400"
  >
    <v-card
      min-height="180"
      style="border: 1px solid var(--v-secondary-base);"
    >
      <v-row
        no-gutters
        class="pa-4"
      >
        <v-col
          cols="12"
          class="text-center"
        >
          <h2
            class="font-weight-bold text-uppercase"
          >
            Atenção
          </h2>
        </v-col>

        <v-col
          cols="12"
          class="py-1"
        />

        <v-col
          cols="12"
          style="line-height: 1;"
        >
          <span
            v-if="openStore"
            v-font-size="14"
            class="font-weight-regular"
          >
            A loja está aberta no momento, caso você queria desativar o sistema para clientes não
            realizar compras, clique no botão abaixo.
          </span>

          <span
            v-else
            v-font-size="14"
            class="font-weight-regular"
          >
            A loja está fechada no momento, caso você queria ativar o sistema para clientes poder
            fazer compras, clique no botão abaixo.
          </span>
        </v-col>

        <v-col
          cols="12"
          class="py-2"
        />

        <v-col
          cols="12"
        >
          <v-btn
            depressed
            block
            :color="openStore ? 'success' : 'grey lighten-1'"
            @click.stop="updateStatusStore()"
          >
            <span
              class="font-weight-medium"
              v-text="openStore ? 'A Loja está aberta' : 'A Loja está fechada'"
            />
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
  import { Component } from "vue-property-decorator"
  import { mixins } from "vue-class-component"
  import { namespace } from "vuex-class"

  const dialogStore = namespace("dialogStoreModule")

  @Component({})
  export default class DialogOpenStore extends mixins() {
    @dialogStore.Action("ActionDialogOpenStore") setDialogOpenStore
    @dialogStore.Getter("DialogOpenStore") getDialogOpenStore

    openStore = false

    get dialogOpenStore (): boolean {
      return this.getDialogOpenStore()
    }

    set dialogOpenStore (value) {
      this.setDialogOpenStore(value)
    }

    mounted (): void {
      const OPEN_STORE = sessionStorage.getItem("status-store")
      if (OPEN_STORE && /actived/i.test(OPEN_STORE)) this.openStore = true
    }

    updateStatusStore (): void {
      this.openStore = !this.openStore

      if (this.openStore) sessionStorage.setItem("status-store", "actived")
      else sessionStorage.removeItem("status-store")
    }
  }
</script>