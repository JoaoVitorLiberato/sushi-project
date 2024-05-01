<template>
  <v-dialog
    v-model="overdrawerMenu"
    fullscreen
    transition="dialog-top-transition"
  >
    <v-card
      color="black"
    >
      <v-row
        no-gutters
        align="center"
        class="py-3"
      >
        <v-col
          cols="10"
        >
          <span
            class="font-weigth-bold text-uppercase white--text"
          >
            Selecione a Opção
          </span>
        </v-col>
        <v-col
          cols="2"
          class="text-end"
        >
          <v-btn
            text
            dark
            @click="overdrawerMenu = !overdrawerMenu"
          >
            <v-icon>
              close
            </v-icon>
          </v-btn>
        </v-col>

        <v-col
          cols="12"
          class="py-6"
        />

        <v-col
          cols="12"
          class="mt-2"
        >
          <v-row
            no-gutters
          >
            <v-col
              cols="12"
              class="text-center"
            >
              <v-btn
                text
                style="border: 1px solid white;"
                dark
              >
                <span>
                  Pedir para sua mesa
                </span>
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
              <v-btn
                text
                style="border: 1px solid white;"
                dark
              >
                <span>
                  Pedir Delivery
                </span>
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
              <v-btn
                text
                style="border: 1px solid white;"
                dark
              >
                <span>
                  Login ADM
                </span>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator"
  import { namespace } from "vuex-class"

  const dialogStore = namespace("dialogStoreModule")

  @Component({})
  export default class DialogOverdrawerMenu extends Vue {
    @dialogStore.Getter("DialogOverdrawerMenu") getDialogOverdrawerMenu
    @dialogStore.Action("ActionOverdrawerMenu") setDialogOverdrawerMenu

    get overdrawerMenu (): boolean {
      return this.getDialogOverdrawerMenu()
    }

    set overdrawerMenu (value: boolean) {
      this.setDialogOverdrawerMenu(value)
    }
  }
</script>