/* eslint-disable @typescript-eslint/no-explicit-any*/
import { Component, Vue } from "vue-property-decorator"
import { MiddlewareConnectAPI } from "@/middleware/middlewareBangaloSupportAPI"
import { namespace } from "vuex-class"

interface IListUsers  {
  email: string
  id: string
  name: string
  role: string
}

const cacheStore = namespace("cacheStoreModule")

@Component({})
export default class MixinAuthUser extends Vue {
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

  authLogin (
    data: {
      email: string,
      password: string
    }
  ): Promise<any> {
    async function serviceAPI () {
      return await MiddlewareConnectAPI.post(`/auth/login`, data)
    }

    return new Promise((resolve) => {
      serviceAPI()
        .then(responseMiddleware => {
          resolve(responseMiddleware.data)
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
      role: string,
      name: string,
      email: string,
      password: string
    }
  ): Promise<string> {
    async function serviceAPI () {
      return await MiddlewareConnectAPI.post(`/auth/register`, data)
    }

    return new Promise((resolve, reject) => {
      serviceAPI()
        .then(responseMiddleware => {
          if (!responseMiddleware.data) reject(Error("sem-data"))
          resolve(responseMiddleware.data)
        }).catch(err => {
          window.log("registerEmployee", err)
          resolve("error")
        })
    })
  }

  resetPassword (data: {
    email:string
    password: string
  }): Promise<string> {
    async function serviceAPI () {
      return await MiddlewareConnectAPI.post(`/auth/password`, data)
    }

    return new Promise((resolve, reject) => {
      serviceAPI()
        .then(responseMiddleware => {
          if (!responseMiddleware.data || responseMiddleware.data.message !== "Senha atualizada com sucesso") reject(Error("sem-data"))
          resolve("")
        }).catch(err => {
          window.log("registerEmployee", err)
          resolve("error")
        })
    })
  }

  getAllUsers (): Promise<any> {
    this.cacheLoading = {
      status: true,
      msg: "Carregando lista de usuários cadastrados..."
    }
    async function serviceAPI () {
      return await MiddlewareConnectAPI.get(`/auth/list`)
    }

    return new Promise((resolve, reject) => {
      serviceAPI()
        .then(responseMiddleware => {
          if (!responseMiddleware.data) reject(Error("sem-data"))
          resolve(responseMiddleware.data as IListUsers[])
        }).catch(err => {
          window.log("registerEmployee", err)
          this.cacheLoading.status = false
          resolve("error")
        }).finally(() => {
          this.cacheLoading.status = false
        })
    })
  }

  deleteUser (id:string): Promise<string> {
    this.cacheLoading = {
      status: true,
      msg: "Deletando usuário..."
    }
    async function serviceAPI () {
      return await MiddlewareConnectAPI.delete(`/auth/account/${id}`)
    }

    return new Promise((resolve, reject) => {
      serviceAPI()
        .then(responseMiddleware => {
          if (!responseMiddleware.data || responseMiddleware.data.message !== "Conta deletada com sucesso") reject(Error("sem-data"))
          resolve("")
        }).catch(err => {
          window.log("error deleteUser", err)
          this.cacheLoading.status = false
          resolve("error")
        })
    })
  }

  logoutUser (): void {
    sessionStorage.clear()
    this.$router.replace({ name: "login-admin-view" })
  }
}
