<template>
  <v-row
    no-gutters
  >
    <v-col
      cols="12"
    >
      <v-row
        no-gutters
      >
        <v-col
          cols="12"
          md="4"
        >
          <v-card
            color="primary"
            style="height: 100vh;"
            class="pa-4"
          >
            <v-row
              no-gutters
            >
              <v-col
                cols="12"
              >
                <v-img 
                  src="/img/project/logo.png"
                  alt="Logo Bangalô sushi"
                  contain
                />
              </v-col>

              <v-col 
                cols="12"
                class="py-6"
              />

              <v-col
                cols="12"
              >
                <span
                  v-font-size="$vuetify.breakpoint.smAndDown ? 16 : 18"
                  class="font-weight-medium text-uppercase"
                  style="color:var(--v-primary-text)"
                >
                  Informe o numero do pedido
                </span>
              </v-col>

              <v-col 
                cols="12"
                class="py-2"
              />

              <v-col
                cols="12"
              >
                <v-text-field 
                  label="Número do pedido"
                  outlined
                  v-model="numeroPedido"
                  hide-details
                  dark
                />
              </v-col>

              <v-col
                v-if="error.status"
                cols="12"
                class="my-3"
                style="line-height: 1;"
              >
                <span
                  v-font-size="14"
                  class="error--text"
                >
                  {{ error.msg }}
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
                  block
                  color="secondary"
                  dark
                  @click.stop="searchOrderClient()"
                >
                  <span>
                    Ver detalhes
                  </span>
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-col>

        <v-col
          cols="12"
          md="8"
        >
          <v-card
            color="secondary"
            style="height: 100vh;border-radius: 0;"
            elevation="0"
            class="pa-4"
          >
            <v-row
              no-gutters
            >
              <v-col
                cols="12"
                class="d-flex"
              >
                <v-progress-circular 
                  indeterminate
                  class="mr-3"
                />

                <h2>
                  Em construção...
                </h2>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>

      <v-overlay
        :value="dialogSearchOrderClient"
        opacity="1"
      >
        <v-dialog
          ref="componentDialogSearchOrderClient"
          v-model="dialogSearchOrderClient"
          hide-overlay
          persistent
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
                  style="line-height: 1;"
                >
                  <span
                    v-font-size="14"
                    class="font-weight-medium"
                  >
                    Infome no campo abaixo o número do seu pedido para ver os detalhes e
                    o andamento do pedido.
                  </span>
                </v-col>

                <v-col
                  cols="12"
                  class="py-3"
                />

                <v-col
                  cols="12"
                >
                  <v-form
                    ref="formInputBuscarPedido"
                    @submit.prevent="validateDataInput ? validateInput() : searchOrderClient()"
                    @keydown.enter="validateDataInput ? validateInput() : searchOrderClient()"
                  >
                    <v-row
                      no-gutters
                    >
                      <v-col
                        cols="12"
                      >
                        <v-text-field
                          label="Nº Pedido"
                          autocomplete="no"
                          v-mask="numeroPedido.mask"
                          v-model="numeroPedido.value"
                          outlined
                          dark
                          :rules="[required]"
                          hide-details="auto"
                        />

                        <!-- <div
                          v-if="statusAPICEP.error"
                          style="line-height: 1;"
                          class="mt-2"
                        >
                          <span
                            v-font-size="12"
                            class="font-weight-regular error--text"
                            v-text="statusAPICEP.msg"
                          />
                        </div> -->
                      </v-col>

                      <v-col
                        cols="12"
                        class="py-2"
                      />

                      <v-col
                        cols="12"
                      >
                        <v-progress-linear
                          v-if="loadingService"
                          indeterminate
                          color="yellow darken-2"
                        />

                        <v-btn
                          v-else
                          color="secondary"
                          depressed
                          type="submit"
                          block
                          large
                        >
                          <span
                            style="color:var(--v-primary-text)"
                            class="font-weight-bold"
                            v-text="'Pesquisar Pedido'"
                          />
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-col>
              </v-row>
            </div>
          </v-card>
        </v-dialog>
      </v-overlay>
    </v-col>
  </v-row>
</template>

<script lang="ts">
  import { Component } from "vue-property-decorator"
  import { mixins } from "vue-class-component"
  import { namespace } from "vuex-class"
  import { required } from "@/helpers/rules"
  import { $refs } from "@/implements/types"

  const dialogStore = namespace("dialogStoreModule")

  @Component({ })
  export default class viewOrder extends mixins() implements $refs {
    @dialogStore.Getter("DialogSearchOrderClient") getDialogSearchOrderClient
    @dialogStore.Action("ActionDialogSearchOrderClient") setDialogSearchOrderClient

    $refs
    required = required

    numeroPedido = {
      valid: "",
      mask: "######",
      value: ""
    }
    error = {
      status: false,
      msg: ""
    }
    loadingService = false
    formInputBuscarPedido = false

    get dialogSearchOrderClient (): boolean {
      return this.getDialogSearchOrderClient()
    }

    set dialogSearchOrderClient (value: boolean) {
      this.setDialogSearchOrderClient(value)
    }

    get validateDataInput (): boolean {
      if (String(this.numeroPedido.value) === "" || String(this.numeroPedido.value).length < 6 ) return true
      return false
    }

    created (): void {
      const CACHE_ORDER = sessionStorage.getItem("numero-pedido")
      if (CACHE_ORDER) this.numeroPedido.value = CACHE_ORDER
    }

    validateInput ():void {
      if (this.$refs.formInputBuscarPedido.validate) {
        this.$refs.formInputBuscarPedido.validate()
      }
    }

    searchOrderClient (): void {
      console.log("chamar Mixin")
    }
  }
</script>