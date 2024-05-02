import { Component, Vue } from "vue-property-decorator"
import { formatedPrice } from "@/helpers/formatedPrice"
import { IproductData } from "@/types/types-product"
import { namespace } from "vuex-class"

const cacheStore = namespace("cacheStoreModule")
const dialogStore = namespace("dialogStoreModule")

@Component({})
export default class MixinHelperServiceProduct extends Vue {
  @cacheStore.Action("ActionCacheOrdersCart") setCacheOrdersCart
  @dialogStore.Action("ActionDialogComplements") setDialogComplements
  @dialogStore.Getter("DialogComplements") getDialogComplements
  formatedPrice = formatedPrice

  count = 1

  price = ""
  get priceFormated (): string|number|string[] {
    return this.price
  }

  set priceFormated (value: string|number|string[]) {
    this.price = String(value || "")
  }

  countSubtrationQuantityProduct (): void {
    if (this.count === 1) return
    this.count = this.count - 1
  }

  countSumQuantityProduct (): void {
    this.count = this.count + 1
  }

  formatedPriceWithBreadedAndQuantity (productData: IproductData): string|number|string[] {
    let value =  productData.price.default

    if (/actived/i.test(String(productData.price.breaded.input || "")) && productData.price.breaded.active) {
      value = value + productData.price.breaded.additional
    }

    if (this.count > 1) {
      value = value * this.count
      return this.priceFormated = value
    }

    return this.priceFormated = value
  }

  prepareAddToCart (product: IproductData, id?: number|string): void {
    const CACHE_PRODUCT_TEMP = sessionStorage.getItem("cacheProduct")
    const PRODUCT_FILTER = new Set()
    const PRODUCT_CART: IproductData[] = []


    PRODUCT_FILTER.add({
      ...PRODUCT_FILTER,
      ...product,
      price: {
        ...product.price,
        total: Number(this.priceFormated)
      }
    })

    if (CACHE_PRODUCT_TEMP) {
      const REMOVE_REDUDANCE = JSON.parse(CACHE_PRODUCT_TEMP).filter(item => {
        return String(item.id) !== String(id)
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

    sessionStorage.setItem("order", JSON.stringify(PRODUCT_CART))
    this.setCacheOrdersCart(PRODUCT_CART)
  }
}
