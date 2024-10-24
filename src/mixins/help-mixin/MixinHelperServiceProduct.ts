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
  @cacheStore.Getter("CacheRastreamentoUsuarioPayloadSource") getCacheRastreamentoUsuarioPayloadSource
  @cacheStore.Action("ActionCachePriceTotal") setCachePriceTotal
  @dialogStore.Action("ActionDialogComplements") setDialogComplements
  @dialogStore.Getter("DialogComplements") getDialogComplements
  @payloadStore.Action("actionPayloadPriceTotal") setPayloadPriceTotal
  @payloadStore.Action("actionPayloadPriceTotalProducts") setPayloadPriceTotalProducts
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

  get discountPartners (): boolean {
    return !/^(web)$/i.test(String(this.getPayloadOrder("canal") || ""))
  }

  countSumQuantityProduct (): void {
    this.count = this.count + 1
  }

  formatedPriceWithBreadedAndQuantity (productData?: IproductData): string|number|string[] {
    if (productData) {
      let value = 0

      if (productData.price.discount.active === true) value = productData.price.discount.value
      else value = productData.price.default

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

  removeProductCart (id: number|string): void {
    const CACHE_PRODUCT_CART = sessionStorage.getItem("order")
    const PRODUCT_CART: IproductData[] = []

    if (!CACHE_PRODUCT_CART) return

    const REMOVE_REDUDANCE = JSON.parse(CACHE_PRODUCT_CART).filter((product) => {
      return String(product.item_cart_id) !== String(id)
    })

    if (REMOVE_REDUDANCE) {
        PRODUCT_CART.push(
        ...REMOVE_REDUDANCE
      )
    }

    sessionStorage.setItem("order", JSON.stringify(PRODUCT_CART))
    this.setCacheOrdersCart(PRODUCT_CART)
    this.totalPriceOrderClient()
  }

  totalPriceOrderClient (): void {
    const CACHE_PRODUCT_CART = sessionStorage.getItem("order")

    this.priceTotalOrder = 0
    this.getPayloadPaymentDiscount({
      porcentagem: 0,
      PrecoTotalComDesconto: 0
    })

    if (!CACHE_PRODUCT_CART) this.priceTotalOrder = 0
    if (CACHE_PRODUCT_CART) {
      JSON.parse(CACHE_PRODUCT_CART).forEach(item => {
        if (item.price && item.price.total) {
          this.priceTotalOrder = Number(this.priceTotalOrder) + Number(item.price.total)
        }
      })
    }

    this.dicountAplicated()
  }

  dicountAplicated (): void {
    if (this.discountPartners || Number(this.priceTotalOrder) >= 25000) {
      const discount = Number(this.priceTotalOrder) - Number((5 / 100) * this.priceTotalOrder)
      this.getPayloadPaymentDiscount({
        porcentagem: 5,
        PrecoTotalComDesconto: Number(Math.ceil(discount)) + Number(this.getPayloadOrder("pagamento").valorFrete)
      })
    }

    this.setPayloadPriceTotalProducts(this.getCachePriceTotal())
    this.setPayloadPriceTotal(Number(this.getPayloadOrder("pagamento").valorProdutos) + Number(this.getPayloadOrder("pagamento").valorFrete))
  }

  applyingCouponDiscount (cupom:string): void {
    if (!cupom) return

    const discount = Number(this.priceTotalOrder) - ((Number(String(cupom).replace(/\D/g, "")) / 100) * Number(this.priceTotalOrder))

    this.getPayloadPaymentDiscount({
      porcentagem: Number(String(cupom).replace(/\D/g, "")),
      PrecoTotalComDesconto: Number(Math.ceil(discount)) + Number(this.getPayloadOrder("pagamento").valorFrete)
    })
  }
}
