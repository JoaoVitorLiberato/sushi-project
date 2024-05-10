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
    </v-col>
  </v-row>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from "vue-property-decorator"

  @Component({})
  export default class viewOrder extends Vue {
    numeroPedido = ""
    error = {
      status: false,
      msg: ""
    }

    @Watch("numeroPedido")
      clearInput (): void {
        if (this.numeroPedido === "") {
          this.error.status = false
          this.error.msg = ""
        }
      }

    created (): void {
      const CACHE_ORDER = sessionStorage.getItem("numero-pedido")
      if (CACHE_ORDER) this.numeroPedido = CACHE_ORDER
      console.log("PEdido Fictício")
    }

    searchOrderClient (): void {
      if (!this.numeroPedido) {
        this.error = {
          status: true,
          msg: "Informe o número do seu pedido!"
        }
        return
      }
      this.error = {
        status: true,
        msg: "Pedido fictício, para exemplo de api que está em contrução. aguarde..."
      }
    }
  }
</script>