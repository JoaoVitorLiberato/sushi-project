import { Component, Vue } from "vue-property-decorator"
import { MiddlewareConnectAPI } from "@/middleware/middlewareBangaloSupportAPI"

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
            resolve(responseMiddleware.data)
        }).catch(err => {
          window.log("error MixinCacheProduct", err)
          console.log("error MixinCacheProduct", err)
        })
        
    })
  }
}
