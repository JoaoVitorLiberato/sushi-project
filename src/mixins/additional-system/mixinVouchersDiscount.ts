import { Vue, Component } from "vue-property-decorator"
import { MiddlewareConnectAPI } from "@/middleware/middlewareBangaloSupportAPI"
import { IVouchers } from "@/types/type-voucher"
import { namespace } from "vuex-class"

const cacheStore = namespace("cacheStoreModule")

@Component({})
export default class MixinVouchersDiscount extends Vue {
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

  getAllVouchers (): Promise<IVouchers[]|string> {
    this.cacheLoading.status = true
    this.cacheLoading.msg = "Carregando cupons..."

    async function productApi () {
      return await MiddlewareConnectAPI.get("/vouchers")
    }

    return new Promise((resolve, reject) => {
      productApi()
        .then(responseMiddleware => {
          if (!responseMiddleware.data) reject(Error("error"))
          else if (responseMiddleware.data.length <= 0) resolve("empty-vouchers")
          resolve(responseMiddleware.data)
        }).catch(err => {
          window.log("ERROR getAllVouchers", err)
          this.cacheLoading.status = false
          resolve("error")
        }).finally(() => {
          this.cacheLoading.status = false
        })
    })
  }

  createVoucher (voucher: IVouchers): Promise<string> {
    this.cacheLoading.status = true
    this.cacheLoading.msg = "Criando cupom..."

    async function productApi () {
      return await MiddlewareConnectAPI.post(`/voucher`, voucher)
    }

    return new Promise((resolve, reject) => {
      productApi()
        .then(responseMiddleware => {
          if (!responseMiddleware.data || responseMiddleware.data.message !== "Voucher cadastrado com sucesso!") reject(Error("error"))
          resolve(responseMiddleware.data)
        }).catch(err => {
          window.log("ERROR createVoucher", err)
          this.cacheLoading.status = false
          resolve("error")
        })
    })
  }

  updateVoucher (voucher: IVouchers): Promise<string> {
    this.cacheLoading.status = true
    this.cacheLoading.msg = "Atualizando cupom..."

    async function productApi () {
      return await MiddlewareConnectAPI.patch(`/voucher/${voucher.id}`, voucher)
    }

    return new Promise((resolve, reject) => {
      productApi()
        .then(responseMiddleware => {
          if (!responseMiddleware.data || responseMiddleware.data.message !== "Voucher atualizado com sucesso!") reject(Error("error"))
          resolve(responseMiddleware.data)
        }).catch(err => {
          window.log("ERROR updateVoucher", err)
          this.cacheLoading.status = false
          resolve("error")
        })
    })
  }

  deleteVoucher (voucherID:string): Promise<string> {
    this.cacheLoading.status = true
    this.cacheLoading.msg = "Deletando cupom..."

    async function productApi () {
      return await MiddlewareConnectAPI.delete(`/voucher/${voucherID}`)
    }

    return new Promise((resolve, reject) => {
      productApi()
        .then(responseMiddleware => {
          if (!responseMiddleware.data || responseMiddleware.data.message !== "Voucher deletado com sucesso!") reject(Error("error"))
          resolve(responseMiddleware.data)
        }).catch(err => {
          window.log("ERROR updateVoucher", err)
          this.cacheLoading.status = false
          resolve("error")
        })
    })
  }
}
