<template>
  <v-card
    class="mx-auto my-12"
    width="300"
  >
    <v-img
      height="200"
      :src="image"
    ></v-img>

    <v-row
      no-gutters
      class="pa-4"
    >
      <v-col
        cols="12"
      >
        <v-card-title
          v-font-size="14"
          class="pa-0"
        >
          <span
            class="font-weight-medium text-uppercase"
            v-text="title"
          />
        </v-card-title>
      </v-col>

      <v-col
        cols="12"
        class="py-1"
      />

      <v-col
        cols="12"
        @click.stop="setCacheCommentsIDPorductSelected(product?.id), dialogGetCommentsProduct = !dialogGetCommentsProduct"
      >
        <v-row
          align="center"
          class="mx-0"
        >
          <v-rating
            :value="note_client"
            color="secondary"
            dense
            half-increments
            readonly
            size="14"
          ></v-rating>

          <div
            class="grey--text ms-2 d-flex align-center"
            style="cursor: pointer;"
            @click.stop="setCacheCommentsIDPorductSelected(product?.id), dialogGetCommentsProduct = !dialogGetCommentsProduct"
          >
            <div
              class="ml-1"
            >
              <v-icon
                size="18"
              >
                forum
              </v-icon> ({{ countQuantityCommentOfPorduct(product?.id) }})
            </div>
          </div>
        </v-row>
      </v-col>

      <v-col
        cols="12"
        class="py-2"
      />

      <v-col
        cols="12"
        style="line-height:1;height: 70px;overflow-y: scroll;"
      >
        <span
          v-font-size="14"
          class="font-weight-regular grey--text"
          v-html="description"
        />
      </v-col>

      <v-col
        v-if="/product/i.test(String($route.name ||''))"
        cols="12"
      >
        <v-row
          no-gutters
          class="px-0"
        >
          <v-col
            cols="12"
          >
            <v-divider
              class="mx-1"
            />
          </v-col>

          <v-col
            cols="12"
            class="py-1"
          />

          <v-col
            v-if="differences"
            cols="12"
            class="px-0"
          >
            <v-checkbox
              v-if="/actived/i.test(String(differences?.breaded?.input || ''))"
              v-model="differences.breaded.active"
              color="success"
              :readonly="differences?.breaded?.readonly"
              dense
              @change="formatedPriceWithBreadedAndQuantity(product)"
            >
              <template v-slot:label>
                <span
                  v-font-size="14"
                  class="font-weight-regular gray--text text-uppercase"
                >
                  Desejo empanar o produto
                </span>
              </template>
            </v-checkbox>
            <v-checkbox
              v-else-if="/actived/i.test(String(differences?.especial.input || ''))"
              v-model="differences.especial.active"
              :readonly="differences?.breaded?.readonly"
              color="success"
              dense
              @change="formatedPriceWithBreadedAndQuantity(product)"
            >
              <template v-slot:label>
                <span
                  v-font-size="14"
                  class="font-weight-regular gray--text text-uppercase"
                >
                  Desejo o produto especial
                </span>
              </template>
            </v-checkbox>
            <v-checkbox
              v-else-if="/actived/i.test(String(differences?.flambed.input || ''))"
              v-model="differences.flambed.active"
              :readonly="differences?.breaded?.readonly"
              color="success"
              dense
              @change="formatedPriceWithBreadedAndQuantity(product)"
            >
              <template v-slot:label>
                <span
                  v-font-size="14"
                  class="font-weight-regular gray--text text-uppercase"
                >
                  Desejo flambar o produto
                </span>
              </template>
            </v-checkbox>
            <div
              v-else
              class="pb-4 pt-2"
            >
              <v-icon
                color="success"
              >
                check
              </v-icon>
              <span
                v-font-size="14"
                class="font-weight-regular gray--tex text-uppercase"
              >
                Produto natural
              </span>
            </div>
          </v-col>

          <v-col
            cols="12"
          >
            <v-divider
              class="mx-1"
            />
          </v-col>

          <v-col
            cols="12"
            class="py-1"
          />

          <v-col
            cols="12"
            class="px-2"
          >
            <v-row
              no-gutters
              align="center"
              justify="space-between"
            >
              <v-col
                cols="6"
              >
                <span
                  v-font-size="19"
                  class="font-weight-medium"
                  v-text="priceFormated ? formatedPrice(priceFormated) : formatedPrice(formatedPriceWithBreadedAndQuantity(product))"
                />
              </v-col>

              <v-col
                cols="4"
                class="d-flex align-center mr-2"
              >
                <v-btn
                  color="secondary"
                  fab
                  dense
                  depressed
                  style="width: 30px;height:30px"
                  @click="countSubtrationQuantityProduct(), formatedPriceWithBreadedAndQuantity(product)"
                >
                  <v-icon
                    color="primary"
                  >
                    remove
                  </v-icon>
                </v-btn>
                <span
                  v-font-size="20"
                  class="font-weight-bold mx-1"
                >
                  {{ count }}
                </span>
                <v-btn
                  color="secondary"
                  fab
                  dense
                  depressed
                  style="width: 30px;height:30px"
                  @click="countSumQuantityProduct(), formatedPriceWithBreadedAndQuantity(product)"
                >
                  <v-icon
                    color="primary"
                  >
                    add
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>

      <v-col
        v-if="/product/i.test(String($route.name ||''))"
        cols="12"
        class="mt-2"
      >
        <v-card-actions>
          <v-btn
            block
            large
            color="secondary"
            depressed
            :title="`Botão para Adicionar ${String(product?.name)} ao carrinho`"
            @click="openDialogComplement(product, product?.id)"
          >
            <span
              class="font-weight-bold mr-1 primary--text"
              style="font-family: 'Roboto', sans-serif;"
              v-text="'Adicionar'"
            />

            <v-icon
              color="primary"
              size="17"
            >
              add_shopping_cart
            </v-icon>
          </v-btn>
        </v-card-actions>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
  import { Component, Prop } from "vue-property-decorator"
  import { mixins } from "vue-class-component"
  import { IproductData } from "@/types/types-product"
  import MixinHelperServiceProduct from "@/mixins/help-mixin/MixinHelperServiceProduct"
  import { namespace } from "vuex-class"

  const dialogStore = namespace("dialogStoreModule")
  const cacheStore = namespace("cacheStoreModule")

  @Component({})

  export default class CardProductComponent extends mixins(
    MixinHelperServiceProduct,
  ) {
    @Prop({ default: "" }) readonly image?:string
    @Prop({ default: "" }) readonly title?:string
    @Prop({ default: "" }) readonly description?:string
    @Prop({ default: 0 }) readonly note_client?:string
    @Prop({ default: false }) readonly  differences?:boolean
    @Prop({ default: 0 }) readonly product?: IproductData

    @dialogStore.Action("ActionDialogGetCommentsProduct") setDialogGetCommentsProduct
    @dialogStore.Getter("DialogGetCommentsProduct") getDialogGetCommentsProduct
    @cacheStore.Getter("CacheCommentsProduct") getCacheCommentsProduct
    @cacheStore.Action("ActionCacheCommentsIDPorductSelected") setCacheCommentsIDPorductSelected

    get dialogGetCommentsProduct (): boolean {
      return this.getDialogGetCommentsProduct()
    }

    set dialogGetCommentsProduct (value) {
      this.setDialogGetCommentsProduct(value)
    }

    countQuantityCommentOfPorduct (producID:string): number {
      if (/error/i.test(this.getCacheCommentsProduct()) || this.getCacheCommentsProduct().length <= 0) return 0
      return this.getCacheCommentsProduct().filter(comment => {
        if ((comment.ProductID).includes(producID)) {
          return comment
        }
      }).length
    }

    openDialogComplement (product: IproductData, id:number|string): void {
      const CACHE_PRODUCT_CART = new Set()
      let sumInnitial = 0

      Object.keys(product.differences).forEach(item => {
        if (/actived/i.test(String(product.differences[item].input || "")) && product.differences[item].active) {
          return sumInnitial = Number(this.formatedPriceWithBreadedAndQuantity()) + Number(product.differences[item].additional)
        } else {
          return sumInnitial = Number(this.formatedPriceWithBreadedAndQuantity())
        }
      })

      CACHE_PRODUCT_CART.add({
        ...product,
        price: {
          ...product.price,
          qtd_product: this.count,
          total: sumInnitial
        }
      })

      sessionStorage.setItem("productId", String(id))
      sessionStorage.setItem("cacheProductTemp", JSON.stringify(Object.assign({}, ...CACHE_PRODUCT_CART)))
      this.setDialogComplements(!this.getDialogComplements())
    }
  }
</script>
