import { Component } from "vue-property-decorator"
import { mixins } from "vue-class-component"
import { middlewareSearchCEP } from "@/middleware/middlewareSearchCEP"
import { ValuesViaCepAPI } from "@/types/type-form"
import Debounce from "lodash/debounce"
import { namespace } from "vuex-class"
import MixinCacheProduct from "@/mixins/product/mixinsCacheProduct"

const cacheStore = namespace("cacheStoreModule")
const dialogStore = namespace("dialogStoreModule")

@Component({})

export default class MixinFormConfig extends mixins(
  MixinCacheProduct,
) {
  @cacheStore.Getter("CacheCepValidation") declare getCacheCepValidation
  @dialogStore.Action("ActionDialogCepDelivery") setDialogCepDelivery

  statusAPICEP = {
    status: false,
    error: false,
    msg: "",
  }

  get CEP_VALID_CITY (): string[] {
    return [
      "65272000",
      "65272-000"
    ]
  }

  APIValidadorCEPMixin = Debounce(
    async function (this): Promise<ValuesViaCepAPI|void> {
      if (String(this.getCacheCepValidation()).length < 8) return
      sessionStorage.removeItem("viacep")

      return new Promise((resolve) => {
        middlewareSearchCEP(this.getCacheCepValidation())
        .then(responseMiddleware => {
          this.statusAPICEP.status = false
          if (/error_api/i.test(String(responseMiddleware.erro || ""))) {
            this.setDialogCepDelivery(false)
            this.verifyCache()
            sessionStorage.setItem("viacep", JSON.stringify(responseMiddleware))
          } else if (/cep-invalid/i.test(String(responseMiddleware.erro))) {
            this.statusAPICEP.error = true
            this.statusAPICEP.msg = `
              CEP inválido, Por favor informe um CEP correto.
            `
          } else {
            if (this.CEP_VALID_CITY.includes(String(responseMiddleware.cep || ""))) {
              sessionStorage.setItem("viacep", JSON.stringify(responseMiddleware))
              this.setDialogCepDelivery(false)
              this.verifyCache()
            } else {
              this.statusAPICEP.error = true
              this.statusAPICEP.msg = `
                Infelizmente não entregamos para fora de Santa Luzia de Paruá,
                Caso queira experimentar nossos produtos estaremos ansiosos por sua
                visita em nosso estabelecimento.
              `
            }
          }
          resolve(responseMiddleware)
        }).catch(err => {
          window.log(`error mixin api-debounce`, err)
        })
      })
    },
    800,
  )
}
