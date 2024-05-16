export default [
  {
    path: "/admin",
    component: (): Promise<typeof import("*.vue")> => import(
      /* webpackChunkName: "admin-route" */
      /* webpackPrefetch: 0 */
      "@/routes/routeAdmin.vue"
    ),
    meta: {
      title: "Bangalô Sushi Lounge",
      description: "Área do administrador - Dashboard",
    },
    children: [
      {
        path: "login",
        name: "login-admin-view",
        components: {
          viewAdminLogin: (): Promise<typeof import("*.vue")> => import(
            /* webpackChunkName: "login-admin-view" */
            /* webpackPrefetch: 1 */
            "@/views/admin/viewLogin.vue"
          ),
        }
      }
    ]
  },
]
