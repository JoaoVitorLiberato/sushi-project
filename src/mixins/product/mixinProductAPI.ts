/* eslint-disable @typescript-eslint/no-explicit-any*/
import { Component, Vue } from "vue-property-decorator"
import { MiddlewareConnectAPI } from "@/middleware/middlewareBangaloSupportAPI"
import { IproductData } from "@/types/types-product"
import { namespace } from "vuex-class"

const cacheStore = namespace("cacheStoreModule")

@Component({})

export default class MixinProductAPI extends Vue {
  @cacheStore.Action("ActionCacheProducts") setCacheProducts
  @cacheStore.Getter("CacheProducts") getCacheProducts
  @cacheStore.Action("ActionCacheLoading") setCacheLoading
  @cacheStore.Getter("CacheLoading") getCacheLoading

  get cacheProduct (): IproductData[] {
    return this.getCacheProducts
  }

  set cacheProduct (value) {
    this.setCacheProducts(value)
  }

  get cacheLoading (): {
    status: boolean,
    msg: string
  } {
    return this.getCacheLoading()
  }

  set cacheLoading (value) {
    this.setCacheLoading(value)
  }

  createNewProduct (product): Promise<string> {
    async function serviceAPI () {
      return await MiddlewareConnectAPI.post(`/product`, product)
    }

    return new Promise((resolve, reject) => {
      serviceAPI()
        .then(responseMiddleware => {
          if (!responseMiddleware.data || /error/i.test(String(responseMiddleware.data.status))) reject(Error("sem data"))
          if (responseMiddleware.data.message === "Product created") {
            resolve(responseMiddleware.data)
          }
        }).catch(err => {
          window.log("error MixinCacheProduct", err)
          resolve("erro")
        })
        
    })
  }

  getProducts (): Promise<string|IproductData[]> {
    this.cacheLoading = {
      status: true,
      msg: "Carregando produtos...",
    }

    async function serviceAPI () {
      return await MiddlewareConnectAPI.get(`/products`)
    }

    return new Promise((resolve, reject) => {
      serviceAPI()
        .then(responseMiddleware => {
          if (!responseMiddleware.data || /error/i.test(String(responseMiddleware.data.status))) reject(Error("sem data"))
          else if (responseMiddleware.data.length <= 0) resolve("list-void-product")
          else {
            this.cacheProduct = responseMiddleware.data
            sessionStorage.setItem("cache-product", JSON.stringify(responseMiddleware.data))
            resolve(responseMiddleware.data)
          }
        }).catch(err => {
          window.log("error MixinCacheProduct", err)
          resolve("erro")
        }).finally(() => {
          this.cacheLoading = {
            status: false,
            msg: "",
          }
        })
    })
  }

  deleteProduct (id: string): Promise<void|string> {
    async function serviceAPI () {
      return await MiddlewareConnectAPI.delete(`/product/${id || ""}`)
    }

    return new Promise((resolve) => {
      serviceAPI()
        .then(responseMiddleware => {
          resolve(responseMiddleware.data)
        }).catch(err => {
          window.log("error MixinCacheProduct", err)
          console.log("error ao deletar", err.response.data)
        })
        
    })
  }
}
