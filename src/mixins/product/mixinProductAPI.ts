/* eslint-disable @typescript-eslint/no-explicit-any*/
import { Component, Vue } from "vue-property-decorator"
import { MiddlewareConnectAPI } from "@/middleware/middlewareBangaloSupportAPI"
import { IComplements, IproductData } from "@/types/types-product"
import { namespace } from "vuex-class"

const cacheStore = namespace("cacheStoreModule")

@Component({})

export default class MixinProductAPI extends Vue {
  @cacheStore.Action("ActionCacheProducts") setCacheProducts
  @cacheStore.Getter("CacheProducts") getCacheProducts
  @cacheStore.Action("ActionCacheLoading") setCacheLoading
  @cacheStore.Getter("CacheLoading") getCacheLoading
  @cacheStore.Action("ActionCacheCommentProduct") setCacheCommentProduct

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
      msg: /admin-view/i.test(String(this.$route.name)) ? "Carregando os produtos e complemento..." : "Carregando produtos..."
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
          this.getCommentsProduc()
        })
      })
    }

  deleteProduct (id: string): Promise<void|string> {
    this.cacheLoading = {
      status: true,
      msg: "Deletando Produto, Por favor aguarde..."
    }

    async function serviceAPI () {
      return await MiddlewareConnectAPI.delete(`/product/${id || ""}`)
    }

    return new Promise((resolve, reject) => {
      serviceAPI()
        .then(responseMiddleware => {
          if (responseMiddleware.data.message === "Produto deletado com sucesso.") {
            resolve("")
          } else reject(Error("error"))
        }).catch(err => {
          window.log("error MixinCacheProduct", err)
          this.cacheLoading.status = false
          resolve("error")
        })
    })
  }

  updateProduct (product): Promise<void|string> {
    async function serviceAPI () {
      return await MiddlewareConnectAPI.patch(`/product`, product)
    }

    return new Promise((resolve, reject) => {
      serviceAPI()
        .then(responseMiddleware => {
          if (!responseMiddleware.data) reject(Error("sem-data"))
          resolve(responseMiddleware.data)
        }).catch(err => {
          window.log("ERR UPDATE PRODUCT", err)
          resolve("erro")
        })
    })
  }

  getComplements (): Promise<IComplements[]|string> {
    this.cacheLoading = {
      status: true,
      msg: /admin-view/i.test(String(this.$route.name)) ? "Carregando os produtos e complemento..." : "Carregando complementos..."
    }

    async function serviceAPI () {
      return await MiddlewareConnectAPI.get(`/complements`)
    }

    return new Promise((resolve, reject) => {
      serviceAPI()
        .then(responseMiddleware => {
          if (!responseMiddleware.data) reject("error")
          else if (responseMiddleware.data.length <= 0) resolve([])
          resolve(responseMiddleware.data)
        }).catch(err => {
          window.log("error MixinCacheProduct", err)
          resolve("error")
        }).finally(() => {
          this.cacheLoading = {
            status: false,
            msg: "",
          }
        })
    })
  }

  createComplement (data): Promise<string> {
    async function serviceAPI () {
      return await MiddlewareConnectAPI.post(`/complement`, data)
    }

    return new Promise((resolve, reject) => {
      serviceAPI()
        .then(responseMiddleware => {
          if (responseMiddleware.data.message === "Complemento cadastrado com sucesso!") {
            resolve(responseMiddleware.data)
          } else reject(Error("error"))
        }).catch(err => {
          window.log("error MixinCacheProduct", err)
          resolve("error")
        })
    })
  }

  deleteComplement (id:string): Promise<string> {
    this.cacheLoading = {
      status: true,
      msg: "Deletando complemento, Por favor aguarde..."
    }

    async function serviceAPI () {
      return await MiddlewareConnectAPI.delete(`/complement/${id}`)
    }

    return new Promise((resolve, reject) => {
      serviceAPI()
        .then(responseMiddleware => {
          if (responseMiddleware.data.message === "Complemento deletado com sucesso!") {
            resolve("")
          } else reject(Error("error"))
        }).catch(err => {
          window.log("error MixinCacheProduct", err)
          this.cacheLoading.status = false
          resolve("error")
        })
    })
  }

  updateComplement (data): Promise<string> {
    async function serviceAPI () {
      return await MiddlewareConnectAPI.patch(`/complement`, data)
    }

    return new Promise((resolve, reject) => {
      serviceAPI()
        .then(responseMiddleware => {
          if (responseMiddleware.data.message === "Complemento atualizado com sucesso!") {
            resolve(responseMiddleware.data)
          } else reject(Error("error"))
        }).catch(err => {
          window.log("error MixinCacheProduct", err)
          resolve("error")
        })
    })
  }

  getCommentsProduc (): Promise<string> {
    if (!/admin-view/i.test(String(this.$route.name))) {
      this.cacheLoading = {
        status: true,
        msg: "Carregando comentários..."
      }
    }

    async function serviceAPI () {
      return await MiddlewareConnectAPI.get(`/products/comments`)
    }

    return new Promise((resolve, reject) => {
      serviceAPI()
        .then(responseMiddleware => {
          if (!responseMiddleware.data) reject(Error("error"))
          else {
            this.setCacheCommentProduct(responseMiddleware.data)
            resolve(responseMiddleware.data)
          }
        }).catch((err) => {
          window.log("ERROR getCommentsProduc", err)
          this.setCacheCommentProduct("error")
          this.cacheLoading.status = false
          resolve("error")
        }).finally(() => {
          this.cacheLoading = {
            status: false,
            msg: "",
          }
        })
    })
  }
}
