export default [
  {
    path: "/pedido",
    component: (): Promise<typeof import("*.vue")> => import(
      /* webpackChunkName: "pedido-route" */
      /* webpackPrefetch: 0 */
      "@/routes/routePedidoView.vue"
    ),
    children: [
      {
        path: ":type/vamoscomecar",
        name: "pedido",
        components: {
          viewPedido: (): Promise<typeof import("*.vue")> => import(
            /* webpackChunkName: "pedido-pedido-route-view" */
            /* webpackPrefetch: 1 */
            "@/views/pedido/viewPedido.vue"
          ),
        },
      },
    ],
  }
]
