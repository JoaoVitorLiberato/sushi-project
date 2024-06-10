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
          viewProducts: (): Promise<typeof import("*.vue")> => import(
            /* webpackChunkName: "products-view" */
            /* webpackPrefetch: 1 */
            "@/views/product/viewProducts.vue"
          ),
        },
      },
    ],
  }
]
