import { Component, Vue } from "vue-property-decorator"
import { MiddlewareConnectAPI } from "@/middleware/middlewareBangaloSupportAPI"
import { namespace } from "vuex-class"
import { IOrderData, IStatusOrder, IOrderDataAll, dataDatailsOrders } from "@/types/type-order"

const payloadStore = namespace("payloadStoreModule")
const cacheStore = namespace("cacheStoreModule")

@Component({})
export default class MixinServiceOrderCostumer extends Vue {
  @payloadStore.Getter("PayloadOrder") getPayloadOrder
  @cacheStore.Action("ActionCacheLoading") setCacheLoading
  @cacheStore.Getter("CacheLoading") getCacheLoading

  get cacheLoading (): {
    status: boolean,
    msg: string
  } {
    return this.getCacheLoading()
  }

  set cacheLoading (value) {
    this.setCacheLoading(value)
  }

  getOrderCostumer (numeroPedido: string|number): Promise<IOrderData|string> {
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

  getAllOrdersExisting (): Promise<dataDatailsOrders|string> {
    async function serviceAPI () {
      return await MiddlewareConnectAPI.get(`/orders/all`)
    }

    return new Promise((resolve, reject) => {
      serviceAPI()
        .then((responseApi) => {
          if (!responseApi.data) reject(Error("err"))
          resolve(responseApi.data)
        }).catch((error) => {
          window.log(`ERROR GETORDERCOSTUMER MIXIN`, error)
          resolve("error")
        })
    })
  }

  getOrderPrinter (numeroPedido: string|number): Promise<IOrderDataAll|string> {
    async function serviceAPI () {
      return await MiddlewareConnectAPI.get(`/order/printer/${numeroPedido}`)
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

  getAllOrderCostumer (): Promise<IOrderData[]|string> {
    async function serviceAPI () {
      return await MiddlewareConnectAPI.get(`/orders`)
    }

    return new Promise((resolve, reject) => {
      serviceAPI()
        .then((responseApi) => {
          if (!responseApi.data) reject(Error("err") || responseApi.data.message === "não foi possível obter os pedidos")
          resolve(responseApi.data)
        }).catch((error) => {
          window.log(`ERROR GETORDERCOSTUMER MIXIN`, error)
          this.cacheLoading.status = false
          resolve("error")
        })
    })
  }

  setOrderCostumer (): Promise<string> {
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

  setChangeStatusOrder (data: IStatusOrder): Promise<string> {
    this.cacheLoading = {
      status: true,
      msg: "Atualizando status do pedido..."
    }

    async function serviceAPI () {
      return await MiddlewareConnectAPI.patch(`/order`, data)
    }

    return new Promise((resolve, reject) => {
      serviceAPI()
        .then((responseApi) => {
          if (!responseApi.data) reject(Error("err"))
          resolve("")
        }).catch((error) => {
          window.log(`ERROR GETORDERCOSTUMER MIXIN`, error)
          resolve("error")
        }).finally(() => {
          this.cacheLoading.status = false
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

  updateStatusCostumeVip (data: {
    id: string,
    status: boolean
  }): Promise<boolean|string> {
    this.cacheLoading = {
      status: true,
      msg: data.status ? "Ativando vip..." : "Desativando vip..."
    }

    async function serviceAPI () {
      return await MiddlewareConnectAPI.patch(`order/vip`, data)
    }

    return new Promise((resolve, reject) => {
      serviceAPI()
        .then((responseApi) => {
          if (!responseApi.data || responseApi.data.message !== "Status atualizado com sucesso") reject(Error('err'))
          resolve(true)
        }).catch(err => {
          window.log(`Error updateStatusCostumeVip`, err)
          this.cacheLoading.status = false
          resolve("error")
        }).finally(() => {
          this.cacheLoading.status = false
        })
    })
  }

  updateStatusPaymentOrder (data: {
    id: string,
    status: string
  }): Promise<boolean|string> {
    this.cacheLoading = {
      status: true,
      msg: "Aguarde, Estamos processando o pagamento..."
    }

    async function serviceAPI () {
      return await MiddlewareConnectAPI.patch(`order/payment`, data)
    }

    return new Promise((resolve, reject) => {
      serviceAPI()
        .then((responseApi) => {
          if (!responseApi.data || responseApi.data.message !== "Status atualizado com sucesso") reject(Error('err'))
          this.cacheLoading.msg = "Pagamento realizado com sucesso!"
          resolve(true)
        }).catch(err => {
          window.log(`Error updateStatusPaymentOrder`, err)
          this.cacheLoading.msg = "Erro ao processar o pagamento."
          setTimeout(() => {
            this.cacheLoading.status = false
            resolve("error")
          }, 2000)
        }).finally(() => {
          setTimeout(() => {
            this.cacheLoading.status = false
          }, 2000)
        })
    })
  }

  unificationAllOrders (phone: string) {
    this.cacheLoading = {
      status: true,
      msg: ``
    }

    async function serviceAPI () {
      return await MiddlewareConnectAPI.get(`/order/printer/client/${phone}`)
    }

    return new Promise((resolve, reject) => {
      serviceAPI()
        .then((responseApi) => {
          if (!responseApi.data) reject(Error("err"))
          resolve(responseApi.data)
        }).catch(erro => {
          window.log(`ERROR MIXIN CunificationAllOrders`, erro)
          this.cacheLoading.status = false
          resolve("error")
        }).finally(() => {
          this.cacheLoading.status = false
        })
    })
  }

  updateStatusPaymentOrderUnificated (phone: string) {
    this.cacheLoading = {
      status: true,
      msg: ``
    }

    async function serviceAPI () {
      return await MiddlewareConnectAPI.patch(`/payment/confirm/${phone}`)
    }

    return new Promise((resolve, reject) => {
      serviceAPI()
        .then((responseApi) => {
          if (!responseApi.data || responseApi.data.message !== "Pedidos atualizados") reject(Error("err"))
          resolve(responseApi.data)
        }).catch(erro => {
          window.log(`ERROR MIXIN updateStatusPaymentOrderUnificated`, erro)
          this.cacheLoading.status = false
          resolve("error")
        }).finally(() => {
          this.cacheLoading.status = false
        })
    })
  }
}

