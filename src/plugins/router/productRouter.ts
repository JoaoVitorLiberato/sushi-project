export default [
  {
    path: "/product",
    component: (): Promise<typeof import("*.vue")> => import(
      /* webpackChunkName: "product-route" */
      /* webpackPrefetch: 0 */
      "@/routes/routeProductView.vue"
    ),
    children: [
      {
        path: ":type/vamoscomecar",
        name: "product",
        components: {
          viewProductEntrada: (): Promise<typeof import("*.vue")> => import(
            /* webpackChunkName: "entrada-product-view" */
            /* webpackPrefetch: 1 */
            "@/views/product/viewProductEntrada.vue"
          ),
          viewProductPecas: (): Promise<typeof import("*.vue")> => import(
            /* webpackChunkName: "pecas-product-view" */
            /* webpackPrefetch: 1 */
            "@/views/product/viewProductPecas.vue"
          ),
          viewProductTemaki: (): Promise<typeof import("*.vue")> => import(
            /* webpackChunkName: "temaki-product-view" */
            /* webpackPrefetch: 1 */
            "@/views/product/viewProductTemaki.vue"
          ),
          viewProductHot: (): Promise<typeof import("*.vue")> => import(
            /* webpackChunkName: "hot-product-view" */
            /* webpackPrefetch: 1 */
            "@/views/product/viewProductHot.vue"
          ),
        },
      },
    ],
  }
]