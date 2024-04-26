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
                title="Por favor, Selecione a mesa:"
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
                @click="redirectOrderView"
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
            <v-row
              no-gutters
            >
              <v-col
                cols="12"
              >
                <span
                  v-font-size="18"
                  v-text="'Escolha o serviço:'"
                />
              </v-col>

              <v-col
                cols="12"
              >
                <v-radio-group
                  v-model="serviceSelelected"
                >
                  <v-row
                    no-gutters
                    justify="center"
                  >
                    <v-col
                      v-for="servico in ['foodpark', 'delivery']"
                      :key="`input-radio-${servico}`"
                      cols="12"
                      class="py-2"
                    >
                      <v-row
                        no-gutters
                        justify="start"
                        justify-md="start"
                      >
                        <v-col
                          cols="12"
                        >
                          <v-radio
                            :value="servico"
                          >
                            <template
                              #label
                            >
                              <span
                                style="color: var(--v-primary-text);"
                                v-text="/delivery/i.test(String(servico)) ? 'Delivery (Entrega)' : 'Food Park (Estabelecimento)'"
                              />
                            </template>
                          </v-radio>
                        </v-col>

                        <v-col
                          v-if="String(serviceSelelected) === String(servico)"
                          cols="12"
                        >
                          <v-row
                            no-gutters
                          >
                            <v-col
                              v-if="String(serviceSelelected).includes('foodpark')"
                              cols="12"
                              class="pt-1"
                            >
                              <input-table-selected
                                @TableSelectedModelEmit="v=>tableSelected=v"
                              />
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-radio-group>
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
                  :disabled="tableSelected === '' && !/delivery/i.test(String(serviceSelelected))"
                  @click="redirectOrderView"
                >
                  <span
                    class="font-weight-bold"
                  >
                    Fazer meu pedido
                  </span>
                </v-btn>
              </v-col>
            </v-row>
          </div>
        </v-card>
      </v-dialog>
    </slot>
  </div>
</template>

<script lang="ts">
  import { Component } from "vue-property-decorator"
  import { mixins } from "vue-class-component"
  import { namespace } from "vuex-class"
  import MixinRedirectLinks from "@/mixins/redirectLinks/MxiinRedirectLinks"

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
  export default class DialogSlotFuncionalidades extends mixins(
    MixinRedirectLinks
  ) {
    @dialogStore.Getter("DialogTableSelected") getDialogTableSelected
    @dialogStore.Action("ActionTableSelected") setDialogTableSelected
    @dialogStore.Getter("DialogServiceClient") getDialogServiceClient
    @dialogStore.Action("ActionServiceClient") setDialogSeviceClient

    tableSelected = ""
    serviceSelelected = ""

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
      this.serviceSelelected = ""
      this.setDialogSeviceClient(value)
    }

    redirectOrderView (servico?:string): void {
      if (/delivery/i.test(String(servico))) {
        this.redirectToRouteDelevery()
      } else {
        location.replace(`/pedido/mesa${String(this.tableSelected).replace(/\D/g, "")}/vamoscomecar`)
      }
    }
  }
</script>
