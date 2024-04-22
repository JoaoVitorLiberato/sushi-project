import Vue from "vue"
import Vuetify from "vuetify/lib"
import "./directives"

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: "#000",
        secondary: "#fcb900"
      },
    },
  },
  icons: {
    iconfont: "md",
  },
})
