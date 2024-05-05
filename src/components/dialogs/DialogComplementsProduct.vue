<template>
  <v-dialog
    v-model="dialogComplements"
    fullscreen
    hide-overlay
  >
    <v-card
      tile
    >
      <v-row
        no-gutters
      >
        <v-col
          cols="12"
        >
          <v-toolbar
            flat
            color="secondary"
            fixed
          >
            <v-toolbar-title
              class="font-weight-bold text-uppercase"
            >
              Complementos
            </v-toolbar-title>
          </v-toolbar>
        </v-col>

        <v-col
          :cols="$vuetify.breakpoint.smAndDown ? 12 : 8"
          style="width:100%;max-width:980px"
          class="mx-auto"
        >
          <v-row
            no-gutters
            class="ma-2"
          >
            <v-col
              cols="12"
            >
              <h2
                v-font-size="20"
                class="font-weight-medium text-uppercase"
              >
                Adicionais
              </h2>
            </v-col>

            <!-- <v-col
              cols="12"
              style="line-height: 1"
            >
              <span
                v-font-size="14"
                class="font-weight-regular warning--text"
              >
                <strong>Atenção:</strong> Você pode adicionar Dois complemento totalmente
                gratuitos.
              </span>
            </v-col> -->

            <v-col
              cols="12"
              class="py-2"
            />

            <v-col
              v-for="item in returnComplementAdditional"
              :key="`card-complemento-adicional-${item.id}`"
              :cols="$vuetify.breakpoint.smAndDown ? 12 : 6"
              class="pa-2 mx-sm-2 my-2 grey lighten-4"
              :style="`max-width:${$vuetify.breakpoint.xsOnly ? '100%' : 350}px;border-radius: 15px;`"
            >
              <card-complement
                :name="item.name"
                :description="item.description"
                :price="item.price"
                :dataComplement="item"
                @dataComplementEmit="v=>objetoComplete={...v}"
              />
            </v-col>
          </v-row>
        </v-col>

        <v-col
          :cols="$vuetify.breakpoint.smAndDown ? 12 : 4"
          class="pa-4 grey lighten-5"
        >
          <v-row
            no-gutters
          >
            <v-col
              cols="12"
            >
              <span
                class="font-weight-bold text-uppercase"
              >
                Resumo:
              </span>
            </v-col>

            <v-col
              cols="12"
            >
              <v-row
                no-gutters
              >
                <v-col
                  v-if="cacheTemporario()"
                  cols="12"
                >
                  <v-row
                    no-gutters
                  >
                    <v-col
                      cols="12"
                    >
                      <span
                        v-font-size="$vuetify.breakpoint.smAndDown ? 14 : 18"
                        class="text-uppercase font-weight-bold mr-1"
                      >
                        {{ cacheTemporario().name }}
                      </span>
                      <span
                        v-if="'qtd_product' in cacheTemporario().price"
                        v-font-size="$vuetify.breakpoint.smAndDown ? 13 : 16"
                        class="text-uppercase font-weight-medium"
                        v-text="`(x${ cacheTemporario().price.qtd_product})`"
                      />
                    </v-col>

                    <v-col
                      v-if="'qtd_product' in cacheTemporario().price"
                      cols="12"
                    >
                      <span
                        v-font-size="$vuetify.breakpoint.smAndDown ? 14 : 16"
                        class="font-weight-bold mr-2 text-uppercase"
                      >
                        Total:
                      </span>
                      <span
                        v-font-size="$vuetify.breakpoint.smAndDown ? 14 : 16"
                        class="font-weight-medium"
                        v-text="formatedPrice((Number(cacheTemporario().price.default) * Number(cacheTemporario().price.qtd_product)) + Number(totalComplementsCalculed))"
                      />
                    </v-col>

                    <v-col
                      cols="12"
                      class="py-2"
                    />

                    <v-col
                      v-if="complements.length > 0"
                      cols="12"
                    >
                      <span
                        v-font-size="13"
                        class="text-uppercase font-weight-bold"
                      >
                        Complementos:
                      </span>
                      <div>
                        <v-row
                          no-gutters
                          class="pa-2"
                        >
                          <v-col
                            v-for="item in complements"
                            :key="`complementes-${item.name}`"
                            cols="12"
                            class="my-1"
                          >
                            <v-card
                              elevation="0"
                              class="pa-2"
                            >
                              <v-row
                                no-gutters
                              >
                                <v-col
                                  cols="12"
                                  class="d-flex justify-space-between"
                                >
                                  <span
                                    class="font-weight-medium text-uppercase"
                                    v-text="item.name"
                                  />
  
                                  <v-btn
                                    text
                                    color="error"
                                    @click="removeComplement(String(item.id))"
                                  >
                                    <v-icon>
                                      delete
                                    </v-icon>
                                  </v-btn>
                                </v-col>
  
                                <v-col
                                  cols="12"
                                  class="py-2"
                                />
  
                                <v-col
                                  cols="12"
                                  class="d-flex justify-space-between"
                                >
                                  <span 
                                    v-text="item.priceTotal ? `R$ ${Number(item.priceTotal) < 100 ? '0' : '' }${formatedPrice(Number(item.priceTotal), '.')}` : `R$ ${Number(item.priceTotal) > 0 && Number(item.priceTotal) < 100 ? '0' : '' }${formatedPrice(Number(item.priceTotal), '.')}`"
                                  />
  
                                  <span>
                                    qtd: {{ item.qtd }}
                                  </span>
                                </v-col>
                              </v-row>
                            </v-card>
                          </v-col>
                        </v-row>
                      </div>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-col>

            <v-col
              cols="12"
              class="hidden-sm-and-down py-3"
            />

            <v-col
              cols="12"
              class="hidden-sm-and-down"
            >
              <v-btn
                block
                depressed
                color="secondary"
                @click="closeCostumerOrder"
              >
                <span
                  class="primary--text font-weight-bold"
                  style="letter-spacing: 0.20px;"
                >
                  Adicionar ao carrinho
                </span>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>

        <v-col
          cols="12"
          class="hidden-md-and-up mt-2 pa-1"
        >
          <v-btn
            block
            depressed
            large
            color="secondary"
            @click="closeCostumerOrder"
          >
            <span
              class="primary--text font-weight-bold"
              style="letter-spacing: 0.20px;"
            >
              Adicionar ao carrinho
            </span>
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
  import { Component, Watch } from "vue-property-decorator"
  import { mixins } from "vue-class-component"
  import { namespace } from "vuex-class"
  import { formatedPrice } from "@/helpers/formatedPrice"
  import DATA_COMPLEMENTS_ADDITIONAL from "@/data/complements/complementAdditional.json"
  import MixinHelperServiceProduct from "@/mixins/help-mixin/MixinHelperServiceProduct"
  import { dataComplement, IproductData } from "@/types/types-product"

  const dialogStore = namespace("dialogStoreModule")

  @Component({
    components: {
      CardComplement: () => import(
        /* webpackChuckName: "card-complement-component" */
        /* webpackMode: "eager" */
        "@/components/cards/CardComplement.vue"
      )
    }
  })

  export default class DialogComplementsProduct extends mixins(
    MixinHelperServiceProduct,
  ) {
    @dialogStore.Action("ActionDialogComplements") declare setDialogComplements
    @dialogStore.Getter("DialogComplements") declare getDialogComplements

    formatedPrice = formatedPrice

    objetoComplete = {} as dataComplement
    totalComplementsCalculed = 0

    get dialogComplements (): boolean {
      return this.getDialogComplements()
    }

    set dialogComplements (value:boolean) {
      this.setDialogComplements(value)
    }

    get returnComplementAdditional (): typeof DATA_COMPLEMENTS_ADDITIONAL {
      return DATA_COMPLEMENTS_ADDITIONAL
    }

    @Watch("dialogComplements")
      clearComplements (): void {
        this.objetoComplete = {} as dataComplement
        this.complements = []
        this.complements.shift()
      }

    complements = [] as dataComplement[]
    @Watch("objetoComplete")
      saveDataComplement (): void {
        const REMOVE_REDUNDANCE = this.complements.filter(item => {
          if (!item) return
          if (String(item.id) !== String(this.objetoComplete.id)) return item
        }) 

        if (this.objetoComplete && this.objetoComplete.id) {
          if (REMOVE_REDUNDANCE.length > 0) {
            this.complements = [
              ...REMOVE_REDUNDANCE,
              this.objetoComplete
            ]
          } else {
            this.complements = [
              this.objetoComplete
            ]
          }
          
        }

        this.handleValuesPrices()
      }

    cacheTemporario (): IproductData {
      const CACHE_TEMPORARY = sessionStorage.getItem("cacheProductTemp")
      if (CACHE_TEMPORARY) return JSON.parse(CACHE_TEMPORARY)
      else return {
        id: 0,
        url_image: "",
        category: "",
        name: "",
        description: "",
        price: {
            default: 0,
            discount: {
                active: false,
                value: 0
            },
            qtd_product: 0
        },
        note_client: 0,
        apper_start: false,
        hero_product: false
      } as IproductData
    }

    removeComplement (id: string): void {
      const COMPLEMENT_DELETED = this.complements.filter(item => String(item.id) !== String(id))
      this.complements = COMPLEMENT_DELETED
      this.handleValuesPrices()
    }

    showSectionComplements (): boolean|void {
      const CACHE_TEMPORARY = sessionStorage.getItem("cacheProductTemp")

      if (CACHE_TEMPORARY) {
        if (JSON.parse(CACHE_TEMPORARY).complements.especial) return true
        return false
      }

      return false
    }

    handleValuesPrices (): void {
      this.totalComplementsCalculed = 0
      this.complements.forEach(item => {
        if (item.priceTotal) {
          this.totalComplementsCalculed = this.totalComplementsCalculed + Number(item.priceTotal)
        } else if (item.price && item.qtd) {
          this.totalComplementsCalculed = this.totalComplementsCalculed + (Number(item.priceTotal) * Number(item.qtd))
        }
      })
    }

    closeCostumerOrder (): void {
      const CACHE_PRODUCT = sessionStorage.getItem("order")
      const CACHE_PRODUCT_TEMP = sessionStorage.getItem("cacheProductTemp")
      const CACHE_PRODUCT_ID = sessionStorage.getItem("productId")
      const PRODUCT_FILTER = new Set()
      const PRODUCT_CART: IproductData[] = []
      
      if (CACHE_PRODUCT_TEMP && CACHE_PRODUCT_ID) {
        this.handleValuesPrices()
        PRODUCT_FILTER.add({
          ...PRODUCT_FILTER,
          ...JSON.parse(CACHE_PRODUCT_TEMP),
          price: {
            ...JSON.parse(CACHE_PRODUCT_TEMP).price,
            total: (Number(JSON.parse(CACHE_PRODUCT_TEMP).price.default) * Number(JSON.parse(CACHE_PRODUCT_TEMP).price.qtd_product)) + Number(this.totalComplementsCalculed),
            total_price_complements: Number(this.totalComplementsCalculed),
          },
          complements: [
            ...this.complements
          ]
        })
  
        if (CACHE_PRODUCT) {
          const REMOVE_REDUDANCE = JSON.parse(CACHE_PRODUCT).filter(item => {
            return String(item.id) !== String(CACHE_PRODUCT_ID)
          })
  
          if (REMOVE_REDUDANCE) {
            PRODUCT_CART.push(
              ...REMOVE_REDUDANCE,
              Object.assign({}, ...PRODUCT_FILTER),
            )
          } else {
            PRODUCT_CART.push(
              ...JSON.parse(CACHE_PRODUCT_TEMP),
              Object.assign({}, ...PRODUCT_FILTER),
            )
          }
        } else {
          PRODUCT_CART.push(
            Object.assign({}, ...PRODUCT_FILTER),
          )
        }

        sessionStorage.removeItem("cacheProductTemp")
        sessionStorage.removeItem("productId")
        sessionStorage.setItem("order", JSON.stringify(PRODUCT_CART))
        this.setCacheOrdersCart(PRODUCT_CART)
        this.dialogComplements = !this.dialogComplements
      }
    }

  }
</script>
