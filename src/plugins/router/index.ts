import Vue from "vue"
import VueRouter, { RouteConfig } from "vue-router"
import { titleUpdate } from "@/plugins/router/functions/titleupdate"

import "@/plugins/router/routerRegisterHooks"
import mainRouter from "@/plugins/router/mainRouter"
import productRouter from "@/plugins/router/productRouter"
import orderRouter from "@/plugins/router/orderRouter"
import adminRouter from "@/plugins/router/adminRouter"

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [].concat(
  mainRouter as never[],
  productRouter as never[],
  orderRouter as never[],
  adminRouter as never[],
)

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  try {
    titleUpdate(to)
  } catch {/* EMPTY */}
  next()
})

export default ():typeof router|undefined => router
