import { Component, Vue } from "vue-property-decorator"
import VueNativeSock from "vue-native-websocket"

Vue.use(VueNativeSock, "ws://bangalo-app.onrender.com/api/v1/dashboard ", {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 3000,
  passToStoreHandler: function (eventName, event) {
    if (eventName === "open") {
      console.log("ev", event)
      this.websocket.send(JSON.stringify({
        type: "x-api-key",
        apiKey: process.env.VUE_APP_BANGALO_SUPPORT_API_KEY
      }))
    }
  }

})

@Component({})
export default class MixinServiceDashboardOrder extends Vue {

}
