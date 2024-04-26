export default [
  {
    path: "/",
    component: (): Promise<typeof import("*.vue")> => import(
      /* webpackChunkName: "main-route" */
      /* webpackPrefetch: 0 */
      "@/routes/routeHomeView.vue"
    ),
    children: [
      {
        path: ":uri?",
        name: "home",
        components: {
          viewHero: (): Promise<typeof import("*.vue")> => import(
            /* webpackChunkName: "hero-route-view" */
            /* webpackPrefetch: 1 */
            "@/views/viewHero.vue"
          ),
          viewDishes: (): Promise<typeof import("*.vue")> => import(
            /* webpackChunkName: "dishes-route-view" */
            /* webpackPrefetch: 1 */
            "@/views/viewDishes.vue"
          ),
          viewDescriptionCook: (): Promise<typeof import("*.vue")> => import(
            /* webpackChunkName: "description-cook-route-view" */
            /* webpackPrefetch: 1 */
            "@/views/viewDescriptionCook.vue"
          ),
          viewEstabelishLocation: (): Promise<typeof import("*.vue")> => import(
            /* webpackChunkName: "estabelish-location-route-view" */
            /* webpackPrefetch: 1 */
            "@/views/viewEstabelishLocation.vue"
          ),
        },
      },
    ],
  },

  {
    path: "*",
    redirect: "/",
  },
]
