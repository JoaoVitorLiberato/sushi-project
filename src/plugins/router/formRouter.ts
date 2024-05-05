export default [
  {
    path: "/pedido",
    component: (): Promise<typeof import("*.vue")> => import(
      /* webpackChunkName: "form-route" */
      /* webpackPrefetch: 0 */
      "@/routes/routeFormView.vue"
    ),
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