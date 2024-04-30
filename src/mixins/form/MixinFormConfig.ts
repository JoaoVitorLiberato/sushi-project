import { Component, Vue } from "vue-property-decorator"
import { middlewareSearchCEP } from "@/middleware/middlewareSearchCEP"
import { ValuesViaCepAPI } from "@/types/type-form"
import Debounce from "lodash/debounce"
import { namespace } from "vuex-class"

const cacheStore = namespace("cacheStoreModule")
const dialogStore = namespace("dialogStoreModule")

@Component({})

export default class MixinFormConfig extends Vue {
  @cacheStore.Getter("CacheCepValidation") getCacheCepValidation
  @dialogStore.Action("ActionCepDelivery") setDialogCepDelivery

  statusAPICEP = {
    status: false,
    color: "",
    msg: "",
  }

  APIValidadorCEPMixin = Debounce(
    async function (this): Promise<ValuesViaCepAPI|void> {
      if (String(this.getCacheCepValidation()).length < 8) return
      sessionStorage.removeItem("viacep")

      return new Promise((resolve) => {
        middlewareSearchCEP(this.getCacheCepValidation())
          .then(responseMiddleware => {
            if (/error_api/i.test(String(responseMiddleware.erro || ""))) {
              sessionStorage.setItem("viacep", JSON.stringify(responseMiddleware))
              this.statusAPICEP.status = false
              if (String(responseMiddleware.cep || "") === String("65272000")) {
                this.setDialogCepDelivery(false)
              } else {
                this.statusAPICEP.msg = `
                  Infelizmente não entregamos para fora de Santa Luzia de Paruá,
                  Caso queira experimentar nossos produtos estaremos ansiosos por sua
                  visita em nosso estabelecimento.
                `
              }
            }

            this.statusAPICEP.status = false
            if ((String(responseMiddleware.cep || "").replace(/\D/g, "")) === String("65272000")) {
              sessionStorage.setItem("viacep", JSON.stringify(responseMiddleware))
              this.setDialogCepDelivery(false)
              resolve(responseMiddleware)
            } else {
              this.statusAPICEP.msg = `
                Infelizmente não entregamos para fora de Santa Luzia de Paruá,
                Caso queira experimentar nossos produtos estaremos ansiosos por sua
                visita em nosso estabelecimento.
              `

              resolve(responseMiddleware)
            }

          }).catch(err => {
            window.log(`error mixin api-debounce`, err)
            this.statusAPICEP.msg = `
              Está hanvendo alguma instabilidade no servidor, Por favor, Tente mais tarde!
            `
          })
      })
    },
    1500,
  )
}