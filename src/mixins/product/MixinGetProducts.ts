import { Component, Vue } from "vue-property-decorator"
import PRODUCT_DATA from "@/data/products/productDataBackend.json"

@Component({})
export default class MixinGetProduct extends Vue {
  get productDataCache (): typeof PRODUCT_DATA {
    return PRODUCT_DATA
  }

  get productDataApperStart (): typeof PRODUCT_DATA {
    return this.productDataCache.filter(productIndividual => {
      return productIndividual.apper_start === true
    })
  }
}
