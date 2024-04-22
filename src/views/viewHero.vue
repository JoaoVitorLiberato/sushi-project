<template>
  <v-row
    no-gutters
  >
    <v-col
      cols="12"
    >
      <v-img
        src="/img/project/sushi-bank.jpg"
        height="400"
      >
        <v-row
          no-gutters
          class="fill-height"
        >
          <v-col
            cols="12"
            md="5"
            :style="`background-color:#424242b0;border-radius:${$vuetify.breakpoint.mdAndUp ? '0 70px 70px 0' : '0'};`"
            class="px-3 py-6"
          >
            <v-row
              align="center"
              class="text-center"
            >
              <v-col
                cols="12"
              >
                <h4
                  v-font-size="$vuetify.breakpoint.smAndDown ? 12 : 16"
                  class="white--text text-uppercase font-weigt-medium"
                >
                  Qualidade, Sabor e Tradição
                </h4>
              </v-col>

              <v-col
                cols="12"
              >
                <h1
                  class="white--text font-weigt-bold mb-1"
                  :style="$vuetify.breakpoint.smAndDown ? 'font-size: 23px;line-height: 29px;' : 'font-size:37px;line-height: 40px;'"
                >
                  Seu Cantinho do Japão Mais<br> Próximo de Você
                </h1>

                <span
                  v-font-size="$vuetify.breakpoint.smAndDown ? 12 : 14"
                  class="white--text font-weight-regular"
                >
                  Experimente a Autêntica Culinária Japonesa no Yume Sushi
                </span>
              </v-col>

              <v-col
                cols="12"
                class="py-2"
              />

              <v-col
                cols="12"
              >
                <v-row
                  no-gutters
                >
                  <v-col
                    cols="12"
                  >
                    <v-btn
                      class="text-none"
                      color="secondary"
                      depressed
                      x-large
                      width="300"
                      @click="DialogTableSelected = !DialogTableSelected"
                    >
                      <span
                        v-font-size="15"
                        class="font-weight-bold text-uppercase"
                      >
                        Fazer meu pedido (Food Park)
                      </span>
                    </v-btn>
                  </v-col>

                  <v-col
                    cols="12"
                    class="py-2"
                  />

                  <v-col
                    cols="12"
                  >
                    <v-btn
                      class="text-none"
                      color="secondary"
                      depressed
                      x-large
                      width="300"
                    >
                      <span
                        v-font-size="15"
                        class="font-weight-bold text-uppercase"
                      >
                        Fazer meu pedido (Delivery)
                      </span>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-img>
    </v-col>
  </v-row>
</template>

style

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator"
  import { namespace } from "vuex-class"

  const dialogStore = namespace("dialogStoreModule")

  @Component({})

  export default class viewHero extends Vue {
    @dialogStore.Getter("DialogTableSelected") getDialogTableSelected
    @dialogStore.Action("ActionTableSelected") setDialogTableSelected

    get DialogTableSelected (): boolean {
      return this.getDialogTableSelected()
    }

    set DialogTableSelected (value: boolean) {
      this.setDialogTableSelected(value)
    }
  }
</script>
