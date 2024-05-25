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
              style="max-height: 500px;overflow-y: scroll;"
              class="d-flex aling-center flex-wrap"
            >
              <div
                v-for="{ id, name, description, differences, price, url_image }, in listProducts"
                :key="`expanse-paniel-product-admin-${id}`"
                class="ma-1"
              >
                <card-product-admin 
                  :name="name"
                  :image="url_image"
                  :differences="differences"
                  :description="description"
                  :price="price.default"
                  @updateEmit="openDialogRegisterProductToUpdate(String(id))"
                  @deleteEmit="deleteProductAPI(String(id))"
                />
              </div>
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
                        @click="openDialogRegisterComplementToUpdate(String(id))"
                      >
                        editar
                      </v-btn>

                      <v-btn
                        text
                        color="error"
                        @click="deleteComplementAPI(String(id))"
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
        ref="dialogErrorProductOrComplement"
        width="340"
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
                @click="$refs.dialogErrorProductOrComplement.save()"
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
  import { IproductData, IComplements } from "@/types/types-product"
  import { formatedPrice } from "@/helpers/formatedPrice"
  import { namespace } from "vuex-class"
  import "@/styles/components/content/admin/sessionProducts.styl"

  const dialogStore = namespace("dialogStoreModule")

  @Component({
    components: {
      CardProductAdmin :() => import(
        /* chuckName: "card-product-admin-component" */
        /* chuckMode: "eager" */
        "@/components/cards/CardProductAdmin.vue"
      )
    }
  })
  export default class ContentAdminSessionProducts extends mixins(
    MixinProductAPI,
  ) implements $refs {
    @dialogStore.Getter("DialogRegisterProduct") getDialogRegisterProduct
    @dialogStore.Action("ActionDialogRegisterProduct") setDialogRegisterProduct
    @dialogStore.Getter("DialogRegisterComplement") getDialogRegisterComplement
    @dialogStore.Action("ActionDialogRegisterComplement") setDialogRegisterComplement

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

    get dialogRegisterComplement (): boolean {
      return this.getDialogRegisterComplement()
    }

    set dialogRegisterComplement (value:boolean) {
      this.setDialogRegisterComplement(value)
    }

    @Watch("dialogRegisterProduct")
      @Watch("dialogRegisterComplement")
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
            this.$refs.dialogErrorProductOrComplement.isActive = true
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
            this.$refs.dialogErrorProductOrComplement.isActive = true
          } else if (responseMixin.length <= 0) {
            this.listComplements = []
          } else {
            this.listComplements = [ ...responseMixin as IComplements[] ]
          }
        }).finally(() => {
          this.loading = false
        })
    }

    deleteProductAPI (id: string): void {
      this.loading = true
      this.listProducts.find(item => {
        if (String(item.id) === String(id)) {
          this.deleteProduct(id)
            .then(responseMixin => {
              if (!responseMixin) this.loadingProducts()
              else if (/error/i.test(String(responseMixin || ""))) {
                this.$refs.dialogErrorProductOrComplement.isActive = true
                this.errorMsg = `
                  Ops, Error ao deletar o produtos no servidor.
                  Recarregue a página e tente novemente ou chame o suporte.
                `
                this.$refs.dialogErrorProductOrComplement.isActive = true
              }
            })
            .finally(() => {
              this.loading = false
            })
        }
      })
    }

    deleteComplementAPI (id: string): void {
      this.deleteComplement(id)
        .then(responseMixin => {
          if (!responseMixin) this.loadingComplements()
          else if (/error/i.test(String(responseMixin || ""))) {
            this.$refs.dialogErrorProductOrComplement.isActive = true
            this.errorMsg = `
              Ops, Error ao deletar o complemento no servidor.
              Recarregue a página e tente novemente ou chame o suporte.
            `
            this.$refs.dialogErrorProductOrComplement.isActive = true
          }
        })
    }

    openDialogRegisterProductToUpdate (id: string): void {
      this.listProducts.find(item => {
        if (String(item.id) === String(id)) {
          sessionStorage.setItem("update", JSON.stringify(item))
          this.dialogRegisterProduct = true
        }
      })
    }

    openDialogRegisterComplementToUpdate (id: string): void {
      this.listComplements.find(item => {
        if (String(item.id) === String(id)) {
          sessionStorage.setItem("update", JSON.stringify(item))
          this.dialogRegisterComplement = true
        }
      })
    }
  }
</script>
