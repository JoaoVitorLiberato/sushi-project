import { Component, Vue } from "vue-property-decorator"
import { MiddlewareConnectAPI } from "@/middleware/middlewareBangaloSupportAPI"
import { namespace } from "vuex-class"

const payloadStore = namespace("payloadStoreModule")

@Component({})
export default class MixinServiceOrderCostumer extends Vue {
  @payloadStore.Getter("PayloadOrder") getPayloadOrder

  getOrderCostumer (numeroPedido: string|number) {
    async function serviceAPI () {
      return await MiddlewareConnectAPI.get(`/order/${numeroPedido}`)
    }

    return new Promise((resolve, reject) => {
      serviceAPI()
        .then((responseApi) => {
          if (!responseApi.data) reject(Error("err"))
          resolve(responseApi.data)
        }).catch((error) => {
          window.log(`ERROR GETORDERCOSTUMER MIXIN`, error)
          if (error.response.data.message === "ordem não encontrada") resolve("not-order")
          else resolve("error")
        })
    })
  }

  setOrderCostumer () {
    async function serviceAPI (data) {
      return await MiddlewareConnectAPI.post(`/order`, data)
    }

    return new Promise((resolve, reject) => {
      serviceAPI(this.getPayloadOrder())
        .then((responseApi) => {
          if (!responseApi.data) reject(Error("err"))
          if (responseApi.data && responseApi.data.id) resolve(responseApi.data.id)
        }).catch((error) => {
          window.log(`ERROR GETORDERCOSTUMER MIXIN`, error)
          resolve("error")
        })
    })
  }


  commentProductCostumer (data: {
    id: number|string
    name: string,
    rating: number,
    comment: string
  }) {
    async function serviceAPI () {
      return await MiddlewareConnectAPI.post(`/product/${data.id}/rate`, data)
    }

    return new Promise((resolve) => {
      serviceAPI()
        .then((responseApi) => {
          if (responseApi.data) resolve(true)
        }).catch(erro => {
          window.log(`ERROR MIXIN COMMENT-PRODUCT-COSTUMER`, erro.response.data.error)
          if (erro.response.data.error === "não existe um produto com esse id") resolve("product-not-found")
          else resolve("error-api")
        })
    })
  }
}
