import Vue from "vue"
import VueRouter, { RouteConfig } from "vue-router"
import { titleUpdate } from "@/plugins/router/functions/titleupdate"

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

router.beforeEach((to, from, next) => {
  if (to.query.location && /product/i.test(String(to.name || ""))) {
    to.query.location = to.params.type
  }

  try {
    titleUpdate(to)
  } catch {/* EMPTY */}
  next()
})

export default ():typeof router|undefined => router
