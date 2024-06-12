import Vue from "vue"
import "@/functions/windowFunctions"
import router from "@/plugins/router"
import store from "@/plugins/store"
import vuetify from "@/plugins/vuetify"
import App from "@/App.vue"
import "@/plugins/firebase"
import { VueMaskDirective } from 'v-mask'

Vue.config.productionTip = false
Vue.directive('mask', VueMaskDirective)

new Vue({
  store,
  router: router(),
  vuetify,
  render: (h) => h(App),
}).$mount("#app")
