<template>
  <v-dialog
    fullscreen
    v-model="dialogRegisterProduct"
  >
    <v-card
      color="white"
      style="border-radius: 0;"
    >
      <v-row
        no-gutters
        style="max-width: 1100px;"
        class="pa-4 mx-auto"
      >
        <v-col
          cols="12"
          class="text-end"
        >
          <v-btn
            text
            color="primary"
            fab
            @click.stop="dialogRegisterProduct = !dialogRegisterProduct"
            @keydown.esc.prevent="dialogRegisterProduct = !dialogRegisterProduct"
          >
            <v-icon
              size="32"
            >
              close
            </v-icon>
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
          <h2
            v-font-size="$vuetify.breakpoint.smAndDown ? 21 : 26"
            class="font-weight-bold text-uppercase"
          >
            Registrar produto
          </h2>
        </v-col>

        <v-col
          cols="12"
          class="py-3"
        />

        <v-col
          cols="12"
          style="max-width: 600px;"
          class="mx-auto"
        >
          <v-form
            ref="formRegisterProduct"
          >
            <v-row
              no-gutters
            >
              <v-col
                cols="12"
              >
                <v-autocomplete
                  :items="category"
                  item-text="name"
                  item-value="id"
                  label="Categoria do produto"
                  outlined
                  hide-details
                  @change="changeSelectCategory"
                />
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
                    md="4"
                  >
                    <v-autocomplete
                      :items="['dispositivo', 'url']"
                      v-model="chooseInputImage"
                      outlined
                      label="Imagem ou URL"
                      hint="Imagem do dispositivo ou apenas colocar a url de uma imagem"
                      hide-details
                    />
                  </v-col>

                  <v-col
                    cols="1"
                    class="px-md-1 py-2"
                  />

                  <v-col
                    cols="12"
                    md="7"
                  >
                    <v-file-input
                      v-if="/dispositivo/i.test(chooseInputImage)"
                      truncate-length="15"
                      outlined
                      label="Imagem do dispositivo"
                      prepend-icon=""
                      append-icon="folder"
                      hide-details
                      @change="changeInputFileImage"
                    />

                    <v-text-field
                      v-if="/url/i.test(chooseInputImage)"
                      label="URL da imagem"
                      outlined
                      hide-details
                      @change="changeInputUrlImage"
                    />
                  </v-col>
                </v-row>
              </v-col>

              <v-col
                cols="12"
                class="py-2"
              />

              <v-col
                cols="12"
                style="height:200px"
              >
                <v-img
                  v-if="readerImageDevice === ''"
                  src="https://static.vecteezy.com/system/resources/previews/000/696/278/original/textured-black-background-vector.jpg"
                  contain
                  height="200"
                  hide-delimiters
                />
                <v-img
                  v-else
                  :src="readerImageDevice"
                  contain
                  height="200"
                />
              </v-col>

              <v-col
                cols="12"
                class="py-2"
              />

              <v-col
                cols="12"
              >
                <v-text-field
                  v-model="productData.name"
                  label="Nome do produto"
                  outlined
                  hide-details
                />
              </v-col>

              <v-col
                cols="12"
                class="py-2"
              />

              <v-col
                cols="12"
              >
                <v-textarea
                  v-model="productData.description"
                  label="Descrição do produto"
                  outlined
                  hide-details
                />
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
                    <v-switch
                      v-model="showBreaded"
                      color="success"
                      hide-details
                      :disabled="showFlambed || showEspecial"
                      @change="changeInputDifference"
                    >
                      <template v-slot:label>
                        <span
                          class="font-weight-regular grey--text"
                        >
                          O produto é empanado
                        </span>
                      </template>
                    </v-switch>
                    <v-expand-transition>
                      <div
                        v-show="showBreaded"
                      >
                        <v-row
                          no-gutters
                          class="pa-4"
                        >
                          <v-col
                            cols="12"
                          >
                            <v-checkbox
                              v-model="productData.differences.breaded.readonly"
                              color="secondary"
                              hide-details
                              class="pa-0 ma-0"
                              @change="changeInputDifference"
                            >
                              <template v-slot:label>
                                <span
                                  class="font-weight-regular grey--text"
                                >
                                  Esse produto é exclussivamente empanano
                                </span>
                              </template>
                            </v-checkbox>
                          </v-col>

                          <v-col
                            cols="12"
                            class="py-2"
                          />

                          <v-col
                            cols="12"
                          >
                            <span
                              class="font-weight-medium d-block"
                            >
                              Você vai adicionar um valor adicional?
                            </span>

                            <v-row
                              no-gutters
                              align="center"
                              class="py-2"
                            >
                              <v-col
                                cols="7"
                              >
                                <v-text-field
                                  v-model.number="productData.differences.breaded.additional"
                                  label="Valor adicional"
                                  type="number"
                                  hide-details
                                  :disabled="productData.differences.breaded.readonly"
                                  outlined
                                />
                              </v-col>

                              <v-col
                                cols="5"
                                class="px-2"
                              >
                                <span
                                  v-font-size="20"
                                  class="font-weight-medium"
                                  v-text="formatedPrice(Number(productData.differences.breaded.additional))"
                                />
                              </v-col>
                            </v-row>
                          </v-col>
                        </v-row>
                      </div>
                    </v-expand-transition>
                  </v-col>

                  <v-col
                    cols="12"
                    class="py-1"
                  />

                  <v-col
                    cols="12"
                  >
                    <v-switch
                      v-model="showFlambed"
                      color="success"
                      hide-details
                      :disabled="showBreaded || showEspecial"
                      @change="changeInputDifference"
                    >
                      <template v-slot:label>
                        <span
                          class="font-weight-regular grey--text"
                        >
                          O produto é flambado
                        </span>
                      </template>
                    </v-switch>
                    <v-expand-transition>
                      <div
                        v-show="showFlambed"
                      >
                        <v-row
                          no-gutters
                          class="pa-4"
                        >
                          <v-col
                            cols="12"
                          >
                            <v-checkbox
                              v-model="productData.differences.flambed.readonly"
                              color="secondary"
                              hide-details
                              class="pa-0 ma-0"
                              @change="changeInputDifference"
                            >
                              <template v-slot:label>
                                <span
                                  class="font-weight-regular grey--text"
                                >
                                  Esse produto é exclussivamente flambado
                                </span>
                              </template>
                            </v-checkbox>
                          </v-col>

                          <v-col
                            cols="12"
                            class="py-2"
                          />

                          <v-col
                            cols="12"
                          >
                            <span
                              class="font-weight-medium d-block"
                            >
                              Você vai adicionar um valor adicional?
                            </span>

                            <v-row
                              no-gutters
                              align="center"
                              class="py-2"
                            >
                              <v-col
                                cols="7"
                              >
                                <v-text-field
                                  v-model.number="productData.differences.flambed.additional"
                                  label="Valor adicional"
                                  type="number"
                                  hide-details
                                  :disabled="productData.differences.flambed.readonly"
                                  outlined
                                />
                              </v-col>

                              <v-col
                                cols="5"
                                class="px-2"
                              >
                                <span
                                  v-font-size="20"
                                  class="font-weight-medium"
                                  v-text="formatedPrice(Number(productData.differences.flambed.additional))"
                                />
                              </v-col>
                            </v-row>
                          </v-col>
                        </v-row>
                      </div>
                    </v-expand-transition>
                  </v-col>

                  <v-col
                    cols="12"
                    class="py-1"
                  />

                  <v-col
                    cols="12"
                  >
                    <v-switch
                      v-model="showEspecial"
                      color="success"
                      hide-details
                      :disabled="showBreaded || showFlambed"
                      @change="changeInputDifference"
                    >
                      <template v-slot:label>
                        <span
                          class="font-weight-regular grey--text"
                        >
                          O produto é especial
                        </span>
                      </template>
                    </v-switch>
                    <v-expand-transition>
                      <div
                        v-show="showEspecial"
                      >
                        <v-row
                          no-gutters
                          class="pa-4"
                        >
                          <v-col
                            cols="12"
                          >
                            <v-checkbox
                              v-model="productData.differences.especial.readonly"
                              color="secondary"
                              hide-details
                              class="pa-0 ma-0"
                              @change="changeInputDifference"
                            >
                              <template v-slot:label>
                                <span
                                  class="font-weight-regular grey--text"
                                >
                                  Esse produto é exclussivamente especial
                                </span>
                              </template>
                            </v-checkbox>
                          </v-col>

                          <v-col
                            cols="12"
                            class="py-2"
                          />

                          <v-col
                            cols="12"
                          >
                            <span
                              class="font-weight-medium d-block"
                            >
                              Você vai adicionar um valor adicional?
                            </span>

                            <v-row
                              no-gutters
                              align="center"
                              class="py-2"
                            >
                              <v-col
                                cols="7"
                              >
                                <v-text-field
                                  v-model.number="productData.differences.especial.additional"
                                  label="Valor adicional"
                                  type="number"
                                  hide-details
                                  :disabled="productData.differences.especial.readonly"
                                  outlined
                                />
                              </v-col>

                              <v-col
                                cols="5"
                                class="px-2"
                              >
                                <span
                                  v-font-size="20"
                                  class="font-weight-medium"
                                  v-text="formatedPrice(Number(productData.differences.especial.additional))"
                                />
                              </v-col>
                            </v-row>
                          </v-col>
                        </v-row>
                      </div>
                    </v-expand-transition>
                  </v-col>
                </v-row>
              </v-col>

              <v-col
                cols="12"
                class="py-3"
              />

              <v-col
                cols="12"
              >
                <v-row
                  no-gutters
                  align="center"
                >
                  <v-col
                    cols="7"
                  >
                    <v-text-field
                      v-model.number="productData.price.default"
                      label="Preço do produto"
                      type="number"
                      hide-details
                      outlined
                    />
                  </v-col>

                  <v-col
                    cols="5"
                    class="px-2"
                  >
                    <span
                      v-font-size="20"
                      class="font-weight-medium"
                      v-text="formatedPrice(Number(productData.price.default))"
                    />
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
                <v-switch
                  v-model="productData.apper_start"
                  color="success"
                  hide-details
                >
                  <template v-slot:label>
                    <span
                      class="font-weight-regular grey--text"
                    >
                      Este produto irá aparecer na vitrine da página inicial para os
                      clientes visualizarem.
                    </span>
                  </template>
                </v-switch>
              </v-col>
              
              <v-col
                cols="12"
                class="py-4"
              />

              <v-col
                cols="12"
              >
                <v-progress-linear
                  v-if="loadingService"
                  color="secondary"
                  indeterminate
                />

                <v-btn
                  v-else
                  type="button"
                  block
                  depressed
                  large
                  color="secondary"
                  @click.stop="finishRegister()"
                >
                  <span
                    class="font-weight-bold primary--text"
                  >
                    Salvar
                  </span>
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-col>
      </v-row>

      <v-snackbar
        v-model="error.status"
      >
        <div
          class="text-center"
        >
          <span
            class="font-weight-regular"
          >
            {{ error.msg }}
          </span>
        </div>
      </v-snackbar>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
  import { Component } from "vue-property-decorator"
  import { mixins } from "vue-class-component"
  import { $refs } from "@/implements/types"
  import { IproductData } from "@/types/types-product"
  import { namespace } from "vuex-class"
  import { formatedPrice } from "@/helpers/formatedPrice"
  import DATA_CATEGORY from "@/data/products/category.json"
  import MixinProductAPI from "@/mixins/product/mixinProductAPI"

  const dialogStore = namespace("dialogStoreModule")

  @Component({})
  export default class DialogRegisterProduct extends mixins(
    MixinProductAPI
  ) implements $refs {
    $refs

    @dialogStore.Getter("DialogRegisterProduct") getDialogRegisterProduct
    @dialogStore.Action("ActionDialogRegisterProduct") setDialogRegisterProduct

    formatedPrice = formatedPrice

    showBreaded = false
    showFlambed = false
    showEspecial = false
    loadingService = false

    productData = {
      url_image: "",
      category: "",
      name: "",
      description: "",
      price: {
        default: 0,
        discount: {
          active: false,
          value: 0
        }
      },
      differences: {
        especial: {
          readonly: false,
          input: "desatived",
          active: false,
          additional: 0
        },
        breaded: {
          readonly: false,
          input: "desatived",
          active: false,
          additional: 0
        },
        flambed: {
          readonly: false,
          input: "desatived",
          active: false,
          additional: 0
        },
      },
      note_client: 0,
      apper_start: false,
      hero_product: false
    } as IproductData

    chooseInputImage = "dispositivo"
    filesInputDevice: Record<string, string|number|string[]|boolean> = {}
    readerImageDevice = ""

    error = {
      status: false,
      msg: ""
    }

    get category (): typeof DATA_CATEGORY {
      return DATA_CATEGORY
    }

    get dialogRegisterProduct (): boolean {
      return this.getDialogRegisterProduct()
    }

    set dialogRegisterProduct (value:boolean) {
      this.setDialogRegisterProduct(value)
    }

    changeSelectCategory (id?:string): void {
      this.productData.category = String(id || "")
    }

    changeInputUrlImage (url:string): void {
      this.productData.url_image = String(url || "")
      this.readerImageDevice = String(url || "")
    }

    changeInputFileImage (files: Record<string, string|string[]|number|boolean>): void {
      if (Object(files).length <= 0) return

      this.filesInputDevice = files
      this.productData.url_image = String(`${files.name}` || "")

      const READER_IMAGE = new FileReader()
      READER_IMAGE.onload = () => {
        this.readerImageDevice = String(READER_IMAGE.result)
      }

      READER_IMAGE.readAsDataURL(Object(files))
    }

    changeInputDifference (): void {
      if (this.showBreaded) {
        if (this.productData.differences.breaded.readonly) {
          this.productData.differences.breaded.input = "actived"
          this.productData.differences.breaded.additional = 0
          this.productData.differences.breaded.active = true
        } else {
          this.productData.differences.breaded.input = "actived"
          this.productData.differences.breaded.active = false
        }
      } else if (this.showFlambed) {
        if (this.productData.differences.flambed.readonly) {
          this.productData.differences.flambed.input = "actived"
          this.productData.differences.flambed.additional = 0
          this.productData.differences.flambed.active = true
        } else {
          this.productData.differences.flambed.input = "actived"
          this.productData.differences.flambed.active = false
        }
      } else if (this.showEspecial) {
        if (this.productData.differences.especial.readonly) {
          this.productData.differences.especial.input = "actived"
          this.productData.differences.especial.additional = 0
          this.productData.differences.especial.active = true
        } else {
          this.productData.differences.especial.input = "actived"
          this.productData.differences.especial.active = false
        }
      }
    }

    finishRegister (): void {
      if (
        this.productData.name === "" ||
        this.productData.description === "" ||
        this.productData.category === "" ||
        this.productData.price.default === 0
      ) return

      this.loadingService = true
      const PRODUCT_DATA = new FormData();
      
      if (/dispositivo/i.test(String(this.chooseInputImage || "")) && "name" in this.filesInputDevice) {
        PRODUCT_DATA.append('image', Object(this.filesInputDevice));
      }

      PRODUCT_DATA.append('product', JSON.stringify(this.productData));

      this.createNewProduct(PRODUCT_DATA)
        .then(responseMixin => {
          if (/erro/i.test(String(responseMixin || ""))) throw Error("error")
          this.error.status = true
          this.error.msg = "Produto criado com sucesso."
          setTimeout(() => {
            this.error.status = false
            this.dialogRegisterProduct = false
          }, 5000)
        }).catch(err => {
          window.log(`error finishRegister`, err)
          this.loadingService = false
          this.error.status = true
          this.error.msg = "Houve algum problema ao criar o produto, por favor, tente novamente."
        })
    }
  }
</script>