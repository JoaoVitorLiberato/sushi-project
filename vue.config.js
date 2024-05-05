module.exports = {
  configureWebpack: () => {
    const ENV = (env) => (!env && (process.env.NODE_ENV)) || ((process.env.NODE_ENV) === env)
    // eslint-disable-next-line
    const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin")
    // eslint-disable-next-line
    const os = require("os")

    return {
      devtool: false,
      node: {
        __filename: ENV("development")
      },
      plugins: [
        new ForkTsCheckerWebpackPlugin({
          memoryLimit: Math.floor(((os.totalmem() / 1024) / 1024) / 2)
        })
      ]
    }
  },

  pages: {
    index: {
      title: "Bangalô Sushi Lounge",
      description: "O melhor sushi de Santa Luzia de Paruá.",
      subject: "typescript, vue.js, vuex, vuetify, vue-router",
      color: "#000",
      entry: "./src/main",
    }
  },

  pwa: {
    name: "Bangalô Sushi Lounge",
    themeColor: "#000",
    msTileColor: "#000",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppTitle: "app",
    appleMobileWebAppStatusBarStyle: "black",
    assetsVersion: process.env.npm_package_version,
    manifestOptions: {
      id: process.env.npm_package_version,
      short_name: "Bangalô Sushi Lounge",
      description: "O melhor sushi de Santa Luzia de Paruá.p",
      background_color: "#000",
      orientation: "portrait",
      start_url: "/",
      protocol_handlers: [
        {
          protocol: "web+app",
          url: "/%s"
        }
      ]
    }
  }
}
