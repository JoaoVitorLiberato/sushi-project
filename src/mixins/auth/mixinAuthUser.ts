import { Component, Vue } from "vue-property-decorator"
import { MiddlewareConnectAPI } from "@/middleware/middlewareBangaloSupportAPI"

@Component({})
export default class MixinAuthUser extends Vue {
  authLogin (
    data: {
      email: string,
      password: string
    }
  ): Promise<string> {
    async function serviceAPI () {
      return await MiddlewareConnectAPI.post(`/auth/login`, data)
    }

    return new Promise((resolve) => {
      serviceAPI()
        .then(responseMiddleware => {
          resolve(responseMiddleware.data.token)
        }).catch(err => {
          window.log("AUTH USER ERROR", err)
          if (err.response.data.error === "senha incorreta") resolve("senha-incorreta")
          else if (err.response.data.error === "usuário não encontrado") resolve("user-not-exist")
          else resolve("error-api")
        })
    })
  }

  registerEmployee (
    data: {
      admin: boolean,
      name: string,
      email: string,
      password: string
    }
  ): Promise<string> {
    async function serviceAPI () {
      return await MiddlewareConnectAPI.post(`/admin/register`, data)
    }

    return new Promise((resolve) => {
      serviceAPI()
        .then(responseMiddleware => {
          resolve(responseMiddleware.data)
        }).catch(err => {
          window.log("registerEmployee", err)
          resolve("error-api")
        })
    })
  }

  logoutUser (): void {
    sessionStorage.removeItem("token-admin")
    location.reload()
  }
}
