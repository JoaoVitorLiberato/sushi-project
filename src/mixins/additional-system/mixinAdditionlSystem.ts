import { Vue, Component } from "vue-property-decorator"
import { MiddlewareConnectAPI } from "@/middleware/middlewareBangaloSupportAPI"

@Component({})
export default class MixinAdditionalSystem extends Vue {
  getOpenStore (): Promise<boolean|string> {
    async function serviceAPI () {
      return await MiddlewareConnectAPI.get(`/open`)
    }

    return new Promise((resolve, reject) => {
      serviceAPI()
        .then(responseMiddleware => {
          if (!responseMiddleware.data) reject(Error("sem data"))
          resolve(responseMiddleware.data.store)
        }).catch(err => {
          window.log("error getOpenStore", err)
          resolve("error")
        })
    })
  }

  updateOpenStore (status:boolean): Promise<boolean|string> {
    async function serviceAPI () {
      return await MiddlewareConnectAPI.post(`/open`, {
        store: status
      })
    }

    return new Promise((resolve, reject) => {
      serviceAPI()
        .then(responseMiddleware => {
          if (!responseMiddleware.data) reject(Error("sem data"))
          if (responseMiddleware.data.message !== "Status atualizado") resolve("not-update")
          resolve(true)
        }).catch(err => {
          window.log("error getOpenStore", err)
          resolve("erro")
        })
    })
  }
}