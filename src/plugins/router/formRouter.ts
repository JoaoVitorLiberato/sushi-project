export default [
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
