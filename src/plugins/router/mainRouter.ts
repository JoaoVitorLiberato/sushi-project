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
        },
      },
    ],
  },

  {
    path: "*",
    redirect: "/",
  },
]
