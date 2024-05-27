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
          v-if="!loading"
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
          class="py-1"
        />

        <v-col
          v-if="error"
          cols="12"
          class="my-2"
          style="line-height: 1;"
        >
            <span
              v-font-size="14"
              class="font-weight-regular error--text"
              v-text="error"
            />
        </v-col>

        <v-col
          cols="12"
          class="py-1"
        />

        <v-col
          cols="12"
        >
          <v-btn
            depressed
            block
            :color="openStore ? 'success' : 'grey lighten-1'"
            :disabled="loading"
            @click.stop="updateStatusStore()"
          >
            <span
              v-if="loading"
              class="font-weight-medium"
              v-text="'Aguarde...'"
            />

            <span
              v-else
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
  import MixinAdditionalSystem from "@/mixins/additional-system/mixinAdditionlSystem"

  const dialogStore = namespace("dialogStoreModule")

  @Component({})
  export default class DialogOpenStore extends mixins(
    MixinAdditionalSystem
  ) {
    @dialogStore.Action("ActionDialogOpenStore") setDialogOpenStore
    @dialogStore.Getter("DialogOpenStore") getDialogOpenStore
    @dialogStore.Action("ActionDialogTryAgain") setDialogTryAgain

    openStore = false
    loading = false
    error = ""

    get dialogOpenStore (): boolean {
      return this.getDialogOpenStore()
    }

    set dialogOpenStore (value) {
      this.setDialogOpenStore(value)
    }

    mounted (): void {
      this.verifyOpenStore()
    }

    verifyOpenStore (): void {
      this.loading = true
      this.getOpenStore()
        .then(responseMixin => {
          if (/error/i.test(String(responseMixin))) throw Error("err")
          this.openStore = Boolean(responseMixin)
        }).catch(err => {
          window.log("ERROR verifyOpenStore", err)
          this.loading = false
          this.setDialogTryAgain(true)
        }).finally(() => {
          this.loading = false
        })
    }

    updateStatusStore (): void {
      this.loading = true
      this.openStore = !this.openStore
      this.updateOpenStore(this.openStore)
        .then(responseMixin => {
          this.loading = false

          if (/error/i.test(String(responseMixin || ""))) throw Error("err")
          if (/not-update/i.test(String(responseMixin || ""))) {
            this.error = "Houve um erro ao atualizar o status da loja, por favor, tente novamente."
            return
          }
        }).catch(err => {
          window.log("ERROR updateStatusStore", err)
          this.setDialogTryAgain(true)
        })
    }
  }
</script>