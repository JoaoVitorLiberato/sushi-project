import Vue from "vue"
import Vuetify from "vuetify/lib"
import "./directives"
import "@/styles/extends/font.styl"

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: "#000",
        secondary: "#fcb900",

        "gray-primary": "#5f5f5f"
      },
    },
  },
  icons: {
    iconfont: "md",
  },
})
