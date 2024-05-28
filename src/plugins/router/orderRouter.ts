export default [
  {
    path: "/detalhes",
    component: (): Promise<typeof import("*.vue")> => import(
      /* webpackChunkName: "order-route" */
      /* webpackPrefetch: 0 */
      "@/routes/routeOrderView.vue"
    ),
    meta: {
      title: "Bangalô Sushi Lounge",
      description: "O melhor sushi de Santa Luzia de Paruá, Aproveite bastante seu pedido.",
    },
    children: [
      {
        path: "pedido",
        name: "order-view",
        components: {
          viewOrder: (): Promise<typeof import("*.vue")> => import(
            /* webpackChunkName: "order-view" */
            /* webpackPrefetch: 1 */
            "@/views/order/viewOrder.vue"
          )
        }
      }
    ]
  },
  {
    path: "/detalhes/foodpark",
    component: (): Promise<typeof import("*.vue")> => import(
      /* webpackChunkName: "order-route" */
      /* webpackPrefetch: 0 */
      "@/routes/routeOrderView.vue"
    ),
    meta: {
      title: "Bangalô Sushi Lounge",
      description: "O melhor sushi de Santa Luzia de Paruá, Aproveite bastante seu pedido.",
    },
    children: [
      {
        path: "pedido",
        name: "order-foodpark-view",
        components: {
          viewOrderFoodpark: (): Promise<typeof import("*.vue")> => import(
            /* webpackChunkName: "order-foodpark-view" */
            /* webpackPrefetch: 1 */
            "@/views/order/viewOrderFoodpark.vue"
          )
        }
      }
    ]
  },
  {
    path: "/pedido/:type",
    component: (): Promise<typeof import("*.vue")> => import(
      /* webpackChunkName: "form-route" */
      /* webpackPrefetch: 0 */
      "@/routes/routeFormView.vue"
    ),
    meta: {
      title: "Bangalô Sushi Lounge",
      description: "Venha conhecer o melhor sushi de Santa Luzia de Paruá",
    },
    children: [
      {
        path: "finalizar",
        name: "form-view",
        components: {
          viewForm: (): Promise<typeof import("*.vue")> => import(
            /* webpackChunkName: "form-view" */
            /* webpackPrefetch: 1 */
            "@/views/form/viewForm.vue"
          ),
        }
      }
    ]
  },
]
