export default [
  {
    path: "/produto",
    component: (): Promise<typeof import("*.vue")> => import(
      /* webpackChunkName: "product-route" */
      /* webpackPrefetch: 0 */
      "@/routes/routeProductView.vue"
    ),
    meta: {
      title: "Bangalô Sushi Lounge",
      description: "Conhece nossos produtos melhor do Bangalô",
    },
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
          viewProductEspecial: (): Promise<typeof import("*.vue")> => import(
            /* webpackChunkName: "especial-product-view" */
            /* webpackPrefetch: 1 */
            "@/views/product/viewProductEspecial.vue"
          ),
          viewProductCombinados: (): Promise<typeof import("*.vue")> => import(
            /* webpackChunkName: "combinados-product-view" */
            /* webpackPrefetch: 1 */
            "@/views/product/viewProductCombinados.vue"
          ),
          viewProductDoces: (): Promise<typeof import("*.vue")> => import(
            /* webpackChunkName: "doces-product-view" */
            /* webpackPrefetch: 1 */
            "@/views/product/viewProductDoces.vue"
          ),
        },
      },
    ],
  }
]
