<template>
  <div>
    <slot
      name="tableSelected"
    >
      <v-dialog
        ref="componentDialogSlotTableSelected"
        v-model="dialogTableSelectedModel"
        hide-overlay
        :max-width="400"
      >
        <v-card
          color="primary"
          class="mx-auto px-3 py-4"
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
                    @click="dialogTableSelectedModel = !dialogTableSelectedModel"
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
              <input-table-selected
                @TableSelectedModelEmit="v=>tableSelected=v"
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
                  Fazer pedido para mesa
                </span>
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>
    </slot>
    <slot
      name="serviceClient"
    >
      <v-dialog
        ref="componentDialogSlotTableSelected"
        v-model="dialogServiceClientModel"
        hide-overlay
        :max-width="400"
      >
        <v-card
          color="primary"
          class="mx-auto"
          dark
        >
          <div
            style="border:1px solid var(--v-secondary-base)"
            class=" px-3 py-4"
          >
            <v-radio-group
              v-model="radioGroup"
            >
              <v-radio
                v-for="n in 3"
                :key="n"
                :label="`Radio ${n}`"
                :value="n"
              ></v-radio>
            </v-radio-group>
          </div>
        </v-card>
      </v-dialog>
    </slot>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator"
  import { namespace } from "vuex-class"

  const dialogStore = namespace("dialogStoreModule")

  @Component({
    components: {
      InputTableSelected: () => import(
        /* webpackChunkName: "input-table-selected-component" */
        /* webpackMode: "eager" */
        "@/components/content/input/InputTableSelected.vue"
      )
    }
  })
  export default class DialogSlotFuncionalidades extends Vue {
    @dialogStore.Getter("DialogTableSelected") getDialogTableSelected
    @dialogStore.Action("ActionTableSelected") setDialogTableSelected
    @dialogStore.Getter("DialogServiceClient") getDialogServiceClient
    @dialogStore.Action("ActionServiceClient") setDialogSeviceClient

    tableSelected = ""
    radioGroup = 1

    get dialogTableSelectedModel (): boolean {
      return this.getDialogTableSelected()
    }

    set dialogTableSelectedModel (value: boolean) {
      this.setDialogTableSelected(value)
    }

    get dialogServiceClientModel (): boolean {
      return this.getDialogServiceClient()
    }

    set dialogServiceClientModel (value: boolean) {
      this.setDialogSeviceClient(value)
    }

    handleRedirectShop (): void {
      location.replace(`/pedido/mesa${String(this.tableSelected).replace(/\D/g, "")}/vamoscomecar`)
    }
  }
</script>
