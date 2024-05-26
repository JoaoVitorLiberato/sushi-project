<template>
  <v-card
    color="white"
    style="border-radius:0;"
  >
    <v-row
      no-gutters
      :style="`min-height:100vh;`"
    >
      <v-col
        cols="2"
        md="1"
        sm="1"
      >
        <v-navigation-drawer
          permanent
          expand-on-hover
          app
          touchless
          clipped
        >
          <v-list>
            <v-list-item
              class="px-2"
            >
              <v-list-item-avatar>
                <v-img
                  src="/img/project/logo.png"
                />
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title
                  class="text-uppercase font-weight-bold"
                >
                  Bangalô SLP
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-list
            nav
            dense
          >
            <v-list-item
              v-if="/admin/i.test(permission)"
              link
              @click="changeSession('products')"
            >
              <v-list-item-icon>
                <v-icon
                  :color="/products/i.test(service) ? 'error' : 'primary'"
                >
                  list_alt
                </v-icon>
              </v-list-item-icon>
              <v-list-item-title
                :class="/products/i.test(service) ? 'error--text' : 'primary--text'"
              >
                Produtos
              </v-list-item-title>
            </v-list-item>

            <v-list-item
              link
              @click="changeSession('orders')"
            >
              <v-list-item-icon>
                <v-icon
                  :color="/orders/i.test(service) ? 'error' : 'primary'"
                >
                  list
                </v-icon>
              </v-list-item-icon>
              <v-list-item-title
                :class="/orders/i.test(service) ? 'error--text' : 'primary--text'"
              >
                Pedidos
              </v-list-item-title>
            </v-list-item>

            <v-list-item
              v-if="/admin/i.test(permission)"
              link
              @click="changeSession('employee')"
            >
              <v-list-item-icon>
                <v-icon
                  :color="/employee/i.test(service) ? 'error' : 'primary'"
                >
                  how_to_reg
                </v-icon>
              </v-list-item-icon>
              <v-list-item-title
                :class="/employee/i.test(service) ? 'error--text' : 'primary--text'"
              >
                Funcionários
              </v-list-item-title>
            </v-list-item>

            <v-list-item
              link
              @click="changeSession('reset-password')"
            >
              <v-list-item-icon>
                <v-icon
                  :color="/reset-password/i.test(service) ? 'error' : 'primary'"
                >
                  lock_reset
                </v-icon>
              </v-list-item-icon>
              <v-list-item-title
                :class="/reset-password/i.test(service) ? 'error--text' : 'primary--text'"
              >
                Alterar senha
              </v-list-item-title>
            </v-list-item>

            <v-list-item
              link
              @click="logoutUser"
            >
              <v-list-item-icon>
                <v-icon
                  color="primary"
                >
                  logout
                </v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                Sair
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </v-col>

      <v-col
        cols="10"
        md="11"
      >
        <v-row
          no-gutters
          class="pa-4"
        >
          <v-col
            cols="12"
            class="py-3"
          />

          <v-col
            cols="12"
          >
            <content-admin-session-products
              v-if="/products/i.test(service)"
            />

            <content-admin-session-orders
              v-if="/orders/i.test(service)"
            />

            <content-admin-session-employee
              v-if="/employee/i.test(service)"
            />
            <content-admin-session-reset-password
              v-if="/reset-password/i.test(service)"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <button-add-products-or-employee
      v-if="/admin/i.test(permission)"
    />
  </v-card>
</template>

<script lang="ts">
  import { Component } from "vue-property-decorator"
  import { mixins } from "vue-class-component"
  import MixinAuthUser from "@/mixins/auth/mixinAuthUser"

  @Component({
    components: {
      ButtonAddProductsOrEmployee: () => import(
        /* chuckName: "button-add-products-or-employee-component" */
        /* chuckMode: "eager" */
        "@/components/buttons/ButtonAddProductsOrEmployee.vue"
      ),
      ContentAdminSessionProducts: () => import(
        /* chuckName: "content-admin-session-products-component" */
        /* chuckMode: "eager" */
        "@/components/content/admin/SessionProducts.vue"
      ),
      ContentAdminSessionOrders: () => import(
        /* chuckName: "content-admin-session-orders-component" */
        /* chuckMode: "eager" */
        "@/components/content/admin/SessionOrders.vue"
      ),
      ContentAdminSessionEmployee: () => import(
        /* chuckName: "content-admin-session-employee-component" */
        /* chuckMode: "eager" */
        "@/components/content/admin/SessionEmployee.vue"
      ),
      ContentAdminSessionResetPassword: () => import(
        /* chuckName: "content-admin-session-reset-password-component" */
        /* chuckMode: "eager" */
        "@/components/content/admin/SessionResetPassword.vue"
      ),
    }
  })
  export default class viewAdmin extends mixins(
    MixinAuthUser,
  ) {
    service = "products"
    permission = ""

    created (): void {
      const PERMISSION = sessionStorage.getItem("permission")
      const SESSION_CACHE = sessionStorage.getItem("session")
      if (PERMISSION) this.permission = PERMISSION

      if (SESSION_CACHE && /admin/i.test(String(PERMISSION))) this.service = String(SESSION_CACHE)
      else this.service = "orders"
    }

    changeSession (session?:string): void {
      this.service = String(session)
      sessionStorage.setItem("session", String(session))
    }
  }
</script>
