import { Component, Vue } from "vue-property-decorator"
import { MiddlareConectAPI } from "@/middleware/middlewareBangaloSupportAPI"

@Component({})
export default class MixinServiceOrderCostumer extends Vue {
  getOrderCostumer (numeroPedido: string|number) {
    async function serviceAPI () {
      return await MiddlareConectAPI.get(`/order/${numeroPedido}`)
    }

    return new Promise((resolve) => {
      serviceAPI()
        .then((resposeApi) => {
          if (resposeApi) resolve(resposeApi)
        }).catch((error) => {
          window.log(`ERROR GETORDERCOSTUMER MIXIN`, error)
          console.log("mixin getOrderCostumer - catch")
          const API_FAKE = sessionStorage.getItem("api-fake")
          if (API_FAKE) {
            resolve({
              ...JSON.parse(API_FAKE)
            })
          } else {
            resolve("")
          }
        })
    })
  }

  commentProductCostumer (data: {
    id: number
    name: string,
    rating: number,
    comment: string
  }) {
    async function serviceAPI () {
      return await MiddlareConectAPI.post(`/product/${data.id}/rate`, data)
    }

    return new Promise((resolve) => {
      serviceAPI()
        .then((responseApi) => {
          if (responseApi) resolve(true)
        }).catch(erro => {
          window.log(`ERROR MIXIN COMMENT-PRODUCT-COSTUMER`, erro.response.data.error)
          console.log(`catch MIXIN commentProductCostumer - `, erro.response.data.error)
          resolve(false)
        })
    })
  }
}
