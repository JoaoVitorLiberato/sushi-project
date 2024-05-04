import { Component, Vue } from "vue-property-decorator"
import { formatedPrice } from "@/helpers/formatedPrice"
import { IproductData } from "@/types/types-product"
import { namespace } from "vuex-class"

const cacheStore = namespace("cacheStoreModule")
const dialogStore = namespace("dialogStoreModule")

@Component({})
export default class MixinHelperServiceProduct extends Vue {
  @cacheStore.Action("ActionCacheOrdersCart") setCacheOrdersCart
  @cacheStore.Getter("CachePriceTotal") getCachePriceTotal
  @cacheStore.Action("ActionCachePriceTotal") setCachePriceTotal
  @dialogStore.Action("ActionDialogComplements") setDialogComplements
  @dialogStore.Getter("DialogComplements") getDialogComplements
  formatedPrice = formatedPrice

  count = 1
  COUNT_PRICE = 0
  price = ""

  get priceFormated (): string|number|string[] {
    return this.price
  }

  set priceFormated (value: string|number|string[]) {
    this.price = String(value || "")
  }

  get priceTotalOrder (): number {
    return this.getCachePriceTotal()
  }

  set priceTotalOrder (value: number) {
    this.setCachePriceTotal(value)
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

  removeProductCart (id?: number|string): void {
    const CACHE_PRODUCT_CART = sessionStorage.getItem("order")
    const PRODUCT_CART: IproductData[] = []

    if (CACHE_PRODUCT_CART) {
      const REMOVE_REDUDANCE = JSON.parse(CACHE_PRODUCT_CART).filter(item => {
        return String(item.id) !== String(id)
      })

      if (REMOVE_REDUDANCE) {
          PRODUCT_CART.push(
          ...REMOVE_REDUDANCE
        )
      }
    }

    sessionStorage.setItem("order", JSON.stringify(PRODUCT_CART))
    this.setCacheOrdersCart(PRODUCT_CART)
    this.totalPriceOrderClient()
  }

  totalPriceOrderClient (): void {
    const CACHE_PRODUCT_CART = sessionStorage.getItem("order")
    this.priceTotalOrder = 0
    if (!CACHE_PRODUCT_CART) this.priceTotalOrder = 0
    if (CACHE_PRODUCT_CART) {
      JSON.parse(CACHE_PRODUCT_CART).forEach(item => {
        if (item.price && item.price.total) {
          this.priceTotalOrder += Number(item.price.total)
        }
      })
    }
  }
}
