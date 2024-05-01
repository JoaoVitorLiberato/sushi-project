import { Component, Vue } from "vue-property-decorator"
import { formatedPrice } from "@/helpers/formatedPrice"
import { IproductData } from "@/types/types-product"

@Component({})
export default class MixinHelperServiceProduct extends Vue {
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
      return this.priceFormated = formatedPrice(value)
    }
    
    return this.priceFormated = formatedPrice(value)
  }

}