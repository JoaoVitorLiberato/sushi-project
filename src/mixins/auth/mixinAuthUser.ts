import { Component, Vue } from "vue-property-decorator"
import { MiddlareConectAPI } from "@/middleware/middlewareBangaloSupportAPI"

@Component({})
export default class MixinAuthUser extends Vue {
  authLogin (
    data: {
      email: string,
      password: string
    }
  ): Promise<string> {
    async function serviceAPI () {
      return await MiddlareConectAPI.post(`/auth/login`, data)
    }

    return new Promise((resolve) => {
      serviceAPI()
        .then(responseMiddleware => {
          console.log(responseMiddleware)
          resolve(responseMiddleware.data)
        }).catch(err => {
          window.log("AUTH USER ERROR", err)
          if (err.response.data.error === "senha incorreta") resolve("senha-incorreta")
        })
    })
  }
}