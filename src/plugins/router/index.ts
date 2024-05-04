import Vue from "vue"
import VueRouter, { RouteConfig } from "vue-router"

import "@/plugins/router/routerRegisterHooks"
import mainRouter from "@/plugins/router/mainRouter"
import productRouter from "@/plugins/router/productRouter"
import formRouter from "@/plugins/router/formRouter"

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [].concat(
  mainRouter as never[],
  productRouter as never[],
  formRouter as never[],
)

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

export default ():typeof router|undefined => router
