<template>
  <div>
    <slot
      name="tableSelected"
    >
      <v-dialog
        ref="componentDialogSlotTableSelected"
        v-model="DialogTableSelectedModel"
        hide-overlay
        :max-width="$vuetify.breakpoint.smAndDown ? 800 : 560"
      >
        <v-card
          color="primary"
          class="mx-auto px-3 py-2"
          dark
        >
          <v-row
            no-gutters
          >
            <v-col
              cols="12"
            >
              <v-row
                no-gutters
                align="center"
              >
                <v-col
                  cols="8"
                  md="11"
                />

                <v-col
                  cols="4"
                  md="1"
                  class="text-end"
                >
                  <v-btn
                    fab
                    dark
                    depressed
                    width="30"
                    height="30"
                    @click="DialogTableSelectedModel = !DialogTableSelectedModel"
                  >
                    <v-icon>
                      close
                    </v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>

            <v-col
              cols="12"
              class="py-2"
            />

            <v-col
              cols="12"
            >
              <span
                class="font-weight-medium"
              >
                Por favor, Selecione a mesa:
              </span>
            </v-col>

            <v-col
              cols="12"
            >
              <v-autocomplete
                :items="allTables"
                v-model="tableSelected"
                label="Mesa"
                color="#fff"
              />
            </v-col>

            <v-col
              cols="12"
              class="py-2"
            />

            <v-col
              cols="12"
            >
              <v-btn
                block
                large
                color="secondary"
                :disabled="tableSelected === ''"
                @click="handleRedirectShop"
              >
                <span
                  class="font-weight-bold"
                >
                  Fazer pedido para mesa {{ tableSelected }}
                </span>
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>
    </slot>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator"
  import { namespace } from "vuex-class"

  const dialogStore = namespace("dialogStoreModule")

  @Component({})
  export default class DialogSlotFuncionalidades extends Vue {
    @dialogStore.Getter("DialogTableSelected") getDialogTableSelected
    @dialogStore.Action("ActionTableSelected") setDialogTableSelected

    tableSelected = ""

    get allTables (): Array<string> {
      return [
        "01",
        "02",
        "03",
        "04",
        "05"
      ]
    }

    get DialogTableSelectedModel (): boolean {
      return this.getDialogTableSelected()
    }

    set DialogTableSelectedModel (value: boolean) {
      this.setDialogTableSelected(value)
    }

    handleRedirectShop (): void {
      this.$router.replace(`/mesa${String(this.tableSelected).replace(/\D/g, "")}/pedido`)
    }
  }
</script>