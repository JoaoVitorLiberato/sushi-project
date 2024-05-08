import { Component, Vue } from "vue-property-decorator"
import { formatedPrice } from "@/helpers/formatedPrice"
import { IproductData } from "@/types/types-product"
import { namespace } from "vuex-class"

const cacheStore = namespace("cacheStoreModule")
const dialogStore = namespace("dialogStoreModule")
const payloadStore = namespace("payloadStoreModule")

@Component({})
export default class MixinHelperServiceProduct extends Vue {
  @payloadStore.Getter("PayloadOrder") getPayloadOrder
  @payloadStore.Action("actionPayloadPaymentDiscount") getPayloadPaymentDiscount
  @cacheStore.Action("ActionCacheOrdersCart") setCacheOrdersCart
  @cacheStore.Getter("CachePriceTotal") getCachePriceTotal
  @cacheStore.Action("ActionCachePriceTotal") setCachePriceTotal
  @dialogStore.Action("ActionDialogComplements") setDialogComplements
  @dialogStore.Getter("DialogComplements") getDialogComplements
  formatedPrice = formatedPrice

  count = 1
  COUNT_PRICE = 0
  priceFormated = 0

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

  formatedPriceWithBreadedAndQuantity (productData?: IproductData): string|number|string[] {
    if (productData) {
      let value = productData.price.default
      Object.keys(productData.differences).forEach(item => {
        if (/actived/i.test(String(productData.differences[item].input || "")) && productData.differences[item].active) {
          value = value + productData.differences[item].additional
        }
      })

      if (this.count > 1) {
        value = value * this.count
        return this.priceFormated = value
      }
      this.priceFormated = value
    }

    return this.priceFormated
  }

  sumPriceDefaultWhiteDiffences (item: IproductData): number {
    let value = 0
    Object.keys(item.differences).forEach(obj => {
      if (item.differences[obj].active) {
        return value = value + Number(item.differences[obj].additional)
      }
    })

    return value = value + Number(item.price.default)
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
    let discount = 0
    this.priceTotalOrder = 0
    this.getPayloadPaymentDiscount({
      porcentagem: 0,
      PrecoTotalComDesconto: 0
    })

    if (!CACHE_PRODUCT_CART) this.priceTotalOrder = 0
    if (CACHE_PRODUCT_CART) {
      JSON.parse(CACHE_PRODUCT_CART).forEach(item => {
        if (item.price && item.price.total) {
          this.priceTotalOrder = this.priceTotalOrder + Number(item.price.total)
        }
      })

      discount = Number((5 / 100) * this.priceTotalOrder)
      if (Number(this.priceTotalOrder) >= 25000) {
        this.getPayloadPaymentDiscount({
          porcentagem: 5,
          PrecoTotalComDesconto: (this.priceTotalOrder - discount) + Number(this.getPayloadOrder("pagamento").valorFrete)
        }) 
      } else {
        this.priceTotalOrder = Number(this.priceTotalOrder) + Number(this.getPayloadOrder("pagamento").valorFrete)
      } 
    }
  }
}
