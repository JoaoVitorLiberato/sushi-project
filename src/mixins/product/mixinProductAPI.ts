/* eslint-disable @typescript-eslint/no-explicit-any*/
import { Component, Vue } from "vue-property-decorator"
import { MiddlewareConnectAPI } from "@/middleware/middlewareBangaloSupportAPI"
import { IproductData } from "@/types/types-product"

@Component({})

export default class MixinProductAPI extends Vue {
  createNewProduct (product): Promise<string> {
    async function serviceAPI () {
      return await MiddlewareConnectAPI.post(`/product`, product)
    }

    return new Promise((resolve, reject) => {
      serviceAPI()
        .then(responseMiddleware => {
          if (!responseMiddleware.data) reject(Error("sem data"))
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
    async function serviceAPI () {
      return await MiddlewareConnectAPI.get(`/products`)
    }

    return new Promise((resolve, reject) => {
      serviceAPI()
        .then(responseMiddleware => {
          if (!responseMiddleware.data) reject(Error("sem data"))
          else if (responseMiddleware.data.length <= 0) resolve("list-void-product")
          resolve(responseMiddleware.data)
        }).catch(err => {
          window.log("error MixinCacheProduct", err)
          resolve("erro")
        })
        
    })
  }

  deleteProduct (data: any): Promise<void|string> {
    async function serviceAPI () {
      return await MiddlewareConnectAPI.delete(`/product`, data)
    }

    return new Promise((resolve) => {
      serviceAPI()
        .then(responseMiddleware => {
          resolve(responseMiddleware.data)
        }).catch(err => {
          window.log("error MixinCacheProduct", err)
          resolve("")
        })
        
    })
  }
}
