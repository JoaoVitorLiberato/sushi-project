<template>
  <v-row
    no-gutters
  >
    <v-col
      cols="12"
    >
      <div
        v-if="loading"
        class="text-center"
      >
        <v-progress-linear
          color="secondary"
          indeterminate
        />
        
        <p
          class="font-weight-regular mt-2"
        >
          Carregando a lista produtos e complementos...
        </p>
      </div>
      <v-row
        v-else
        no-gutters
      >
        <v-col
          v-if="listProducts.length <= 0"
          cols="12"
        >
          <span
            class="font-weight-regular grey--text"
          >
            Não há produtos cadastrado em nosso bando de dados mo momento.
          </span>
        </v-col>

        <v-col
          v-else
          cols="12"
        >
          <v-row
            no-gutters
          >
            <v-col
              cols="12"
            >
              <h2
                v-font-size="$vuetify.breakpoint.smAndDown ? 18 : 22"
                class="font-weight-bold text-uppercase"
              >
                Produtos
              </h2>
            </v-col>

            <v-col
              cols="12"
              class="py-2"
            />

            <v-col
              cols="12"
              style="max-height: 600px;overflow-y: scroll;"
            >
              <v-expansion-panels
                focusable
                class="fix--expansion-panel d-flex flex-column justify-start"
              >
                <v-expansion-panel
                  v-for="{ id, name, description, differences, price, url_image }, in listProducts"
                  :key="`expanse-paniel-product-admin-${id}`"
                  :style="`max-width:${$vuetify.breakpoint.smAndDown ? '100%' : '500px'}`"
                  :value="[true]"
                  elevation="0"
                >
                  <v-expansion-panel-header>
                    <span
                      v-font-size="14"
                      class="font-weight-medium text-uppercase"
                      v-text="name"
                    />
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <div>
                      <v-row
                        no-gutters
                      >
                        <v-col
                          cols="12"
                          md="4"
                        >
                          <v-img
                            :src="url_image"
                            cover
                            height="150"
                            width="100%"
                          />
                        </v-col>

                        <v-col
                          cols="12"
                          md="8"
                        >
                          <v-row
                            no-gutters
                            class="pa-md-2"
                          >
                            <v-col
                              cols="12"
                              class="py-2 hidden-md-and-up"
                            />

                            <v-col
                              cols="12"
                              style="line-height: 1"
                            >
                              <span
                                v-font-size="14"
                                class="font-weight-regular"
                              >
                                {{ description }}
                              </span>
                            </v-col>

                            <v-col
                              cols="12"
                              class="py-1"
                            />

                            <v-col
                              cols="12"
                              style="line-height: 1"
                            >
                              <span
                                v-font-size="14"
                                class="font-weight-regular"
                              >
                                <Strong>Obs:</Strong> {{ showDiference(differences) }}
                              </span>
                            </v-col>

                            <v-col
                              cols="12"
                              class="py-1"
                            />

                            <v-col
                              cols="12"
                            >
                              <span
                                v-font-size="16"
                                class="font-weight-medium"
                              >
                                {{ formatedPrice(price.default) }}
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
                                color="secondary"
                                text
                                class="mr-1"
                              >
                                <span
                                  class="pr-1"
                                >
                                  Editar
                                </span>

                                <v-icon>
                                  edit
                                </v-icon>
                              </v-btn>

                              <v-btn
                                color="error"
                                text
                                @click.stop="deleteProductAPI(String(id))"
                              >
                                <span
                                  class="pr-1"
                                >
                                  Deletar
                                </span>

                                <v-icon>
                                  delete
                                </v-icon>
                              </v-btn>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </div>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-col>

    <v-col
      cols="12"
      class="py-8"
    />

    <v-col
      cols="12"
    >
      <v-row
        no-gutters
      >
        <v-col
          v-if="listComplements.length <= 0"
          cols="12"
        >
          <span
            class="font-weight-regular grey--text"
          >
            Não há complementos salvo em nosso banco de dados.
          </span>
        </v-col>

        <v-col
          v-else
          cols="12"
        >
          <v-row
            no-gutters
          >
            <v-col
              cols="12"
            >
              <h2
                v-font-size="$vuetify.breakpoint.smAndDown ? 18 : 22"
                class="font-weight-bold text-uppercase"
              >
                Complementos
              </h2>
            </v-col>

            <v-col
              cols="12"
              class="py-2"
            />

            <v-col
              cols="12"
              style="max-height: 600px;overflow-y: scroll;"
            >
              <v-row
                no-gutters
                style="max-width: 1100px;"
              >
                <v-col
                  v-for="{ id, name, description, price } in listComplements"
                  :key="`card-complement-${id}`"
                  cols="12"
                  sm="6"
                  md="4"
                  class="pa-2"
                >
                  <v-card
                    :max-width="$vuetify.breakpoint.smAndDown ? 300 : 344"
                    outlined
                  >
                    <v-list-item 
                      three-line
                    >
                      <v-list-item-content>
                        <div
                          class="d-flex justify-space-between align-center"
                        >
                          <div
                            style="font-size: 12px !important;letter-spacing: 0.12px !important;"
                            class="text-overline mb-4 font-weight-bold"
                          >
                            complempemento
                          </div>

                          <span
                            v-font-size="14"
                            class="text-uppercase font-weight-bold mb-4"
                          >
                            {{ formatedPrice(price) }}
                          </span>
                        </div>
                        <v-list-item-title
                          style="font-size: 18px !important;"
                          class="text-h5 mb-1"
                        >
                          {{ name }}
                        </v-list-item-title>
                        <v-list-item-subtitle>
                          {{ description }}
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
    
                    <v-card-actions>
                      <v-btn
                        text
                        color="warning"
                      >
                        editar
                      </v-btn>
    
                      <v-btn
                        text
                        color="error"
                      >
                        deletar
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-col>

    <v-col
      cols="12"
    >
      <v-dialog
        ref="dialogErrorProducts"
        width="400"
      >
        <v-card>
          <v-row
            no-gutters
            class="pa-4"
            persistent
          >
            <v-col
              cols="12"
              class="text-end"
            >
              <v-btn
                text
                fab
                depressed
                dense
                width="30"
                height="30"
                @click="$refs.dialogErrorProducts.save()"
              >
                <v-icon>
                  close
                </v-icon>
              </v-btn>
            </v-col>

            <v-col
              cols="12"
              class="py-2"
              style="line-height: 1;"
            >
              <span
                class="font-weight-regular primary--text"
                v-text="errorMsg"
              />
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script lang="ts">
  import { Component, Watch } from "vue-property-decorator"
  import { mixins } from "vue-class-component"
  import MixinProductAPI from "@/mixins/product/mixinProductAPI"
  import { $refs } from "@/implements/types"
  import { IproductData, IDifferences, IComplements } from "@/types/types-product"
  import { formatedPrice } from "@/helpers/formatedPrice"
  import { namespace } from "vuex-class"
  import "@/styles/components/content/admin/sessionProducts.styl"

  const dialogStore = namespace("dialogStoreModule")

  @Component({})
  export default class ContentAdminSessionProducts extends mixins(
    MixinProductAPI,
  ) implements $refs {
    @dialogStore.Getter("DialogRegisterProduct") getDialogRegisterProduct
    @dialogStore.Action("ActionDialogRegisterProduct") setDialogRegisterProduct

    $refs
    formatedPrice = formatedPrice

    loading = false
    listProducts: IproductData[] = []
    listComplements = [] as IComplements[]
    errorMsg = ""

    get dialogRegisterProduct (): boolean {
      return this.getDialogRegisterProduct()
    }

    set dialogRegisterProduct (value:boolean) {
      this.setDialogRegisterProduct(value)
    }

    @Watch("dialogRegisterProduct")
      changeVariableRegisterProduct (): void {
        this.loadingProducts()
        this.loadingComplements()
      }

    mounted (): void {
      this.loadingProducts()
      this.loadingComplements()
    }

    loadingProducts (): void {
      this.loading = true
      this.getProducts()
        .then(responseMixin => {
          if (/erro/i.test(String(responseMixin || ""))) {
            this.errorMsg = `
              Ops, Error ao buscar produtos no servidor.
              Recarregue a página e tente novemente ou chame o suporte.
            `
            this.$refs.dialogErrorProducts.isActive = true
          } else if (/list-void-product/i.test(String(responseMixin || ""))) {
            this.listProducts = []
          } else {
            this.listProducts = [ ...responseMixin as IproductData[] ]
          }
        }).finally(() => {
          this.loading = false
        })
    }

    loadingComplements (): void {
      this.loading = true
      this.getComplements()
        .then(responseMixin => {
          if (/erro/i.test(String(responseMixin || ""))) {
            this.errorMsg = `
              Ops, Error ao buscar produtos no servidor.
              Recarregue a página e tente novemente ou chame o suporte.
            `
            this.$refs.dialogErrorProducts.isActive = true
          } else if (responseMixin.length <= 0) {
            this.listComplements = []
          } else {
            this.listComplements = [ ...responseMixin as IComplements[] ]
          }
        }).finally(() => {
          this.loading = false
        })
    }

    showDiference (differences: IDifferences): string {
      let value = ""
      const PERMISSIONS: Array<string> = []

      Object.keys(differences).forEach(item => {
        switch (true) {
          case differences[item].readonly === true:
            PERMISSIONS.push("readonly")
            PERMISSIONS.push(item)
            break
          case /actived/i.test(String(differences[item].input || "")):
            PERMISSIONS.push("input")
            PERMISSIONS.push(item)
            break
          default:
            PERMISSIONS.push("natural")
            PERMISSIONS.push(item)
            break
        }
      })

      if (PERMISSIONS[0].includes("readonly") && PERMISSIONS[1].includes("especial")) {
        value = `Especial travado e não pode mudar para natural.`
      }
      if (PERMISSIONS[2].includes("readonly") && PERMISSIONS[3].includes("breaded")) {
        value = `Empanado travado e não pode mudar para natural.`
      }
      if (PERMISSIONS[3].includes("readonly") && PERMISSIONS[5].includes("flambed")) {
        value = `Flambado travado e não pode mudar para natural.`
      }
      if (PERMISSIONS[0].includes("input") && PERMISSIONS[1].includes("especial")) {
        value = `input escolha empanado liberado para usuário escolher.`
      }
      if (PERMISSIONS[2].includes("input") && PERMISSIONS[3].includes("breaded")) {
        value = `input escolha especial liberado para usuário escolher.`
      }
      if (PERMISSIONS[4].includes("input") && PERMISSIONS[5].includes("flambed")) {
        value = `input escolha famblado liberado para usuário escolher.`
      }
      if (PERMISSIONS[0].includes("natural") && PERMISSIONS[2].includes("natural") && PERMISSIONS[4].includes("natural")) {
        value = "Produto somente natural."
      }

      return value
    }

    deleteProductAPI (id: string): void {
      this.loading = true
      this.listProducts.find(item => {
        if (String(item.id) === String(id)) {
          this.deleteProduct(id)
            .then(responseMixin => {
              if (!responseMixin) this.loadingProducts()
              else if (/error/i.test(String(responseMixin || ""))) {
                this.$refs.dialogErrorProducts.isActive = true
                this.errorMsg = `
                  Ops, Error ao deletar o produtos no servidor.
                  Recarregue a página e tente novemente ou chame o suporte.
                `
                this.$refs.dialogErrorProducts.isActive = true
              } 
            })
            .finally(() => {
              this.loading = false
            })
        }
      })
    }
  }
</script>
