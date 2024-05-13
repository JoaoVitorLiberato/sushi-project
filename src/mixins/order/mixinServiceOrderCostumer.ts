import { Component, Vue } from "vue-property-decorator"
import { MiddlareConectAPI } from "@/middleware/middlewareBangaloSupportAPI"

@Component({})
export default class MixinServiceOrderCostumer extends Vue {
  getOrderCostumer (numeroPedido: string|number) {
    async function serviceAPI () {
      return await MiddlareConectAPI.get(`/pedido/${numeroPedido}`)
    }

    return new Promise((resolve) => {
      serviceAPI()
        .then((resposeApi) => {
          resolve(resposeApi)
        }).catch((error) => {
          window.log(`ERROR GETORDERCOSTUMER MIXIN`, error)
          console.log("mixin getOrderCostumer - catch")
          const API_FAKE = sessionStorage.getItem("api-fake")
          if (API_FAKE) {
            resolve({
              ...JSON.parse(API_FAKE)
            })
          }
        })
    })
  }
}