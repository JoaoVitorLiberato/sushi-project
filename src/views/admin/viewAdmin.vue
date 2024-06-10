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
            v-position.relative
            nav
            dense
          >
            <v-list-item
              link
              @click="changeSession('orders')"
            >
              <v-list-item-icon>
                <v-icon
                  :color="/orders/i.test(service) ? 'secondary' : 'primary'"
                >
                  list
                </v-icon>
              </v-list-item-icon>
              <v-list-item-title
                :class="/orders/i.test(service) ? 'secondary--text' : 'primary--text'"
              >
                Pedidos
              </v-list-item-title>
            </v-list-item>

            <v-list-item
              v-if="/admin/i.test(permission)"
              link
              @click="changeSession('products')"
            >
              <v-list-item-icon>
                <v-icon
                  :color="/products/i.test(service) ? 'secondary' : 'primary'"
                >
                  list_alt
                </v-icon>
              </v-list-item-icon>
              <v-list-item-title
                :class="/products/i.test(service) ? 'secondary--text' : 'primary--text'"
              >
                Produtos
              </v-list-item-title>
            </v-list-item>

            <v-list-item
              v-if="/admin/i.test(permission)"
              link
              @click="changeSession('discount')"
            >
              <v-list-item-icon>
                <v-icon
                  :color="/discount/i.test(service) ? 'secondary' : 'primary'"
                >
                  confirmation_number
                </v-icon>
              </v-list-item-icon>
              <v-list-item-title
                :class="/discount/i.test(service) ? 'secondary--text' : 'primary--text'"
              >
                Descontos
              </v-list-item-title>
            </v-list-item>

            <v-list-item
              v-if="/admin/i.test(permission)"
              link
              @click="changeSession('employee')"
            >
              <v-list-item-icon>
                <v-icon
                  :color="/employee/i.test(service) ? 'secondary' : 'primary'"
                >
                  how_to_reg
                </v-icon>
              </v-list-item-icon>
              <v-list-item-title
                :class="/employee/i.test(service) ? 'secondary--text' : 'primary--text'"
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
                  :color="/reset-password/i.test(service) ? 'secondary' : 'primary'"
                >
                  lock_reset
                </v-icon>
              </v-list-item-icon>
              <v-list-item-title
                :class="/reset-password/i.test(service) ? 'secondary--text' : 'primary--text'"
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

            <v-list-item
              link
              style="position:fixed;bottom:10px;width:93%;"
              @click="dialogOpenStore = !dialogOpenStore"
            >
              <v-list-item-icon>
                <v-progress-circular
                  v-if="loading"
                  width="2"
                  size="23"
                  indeterminate
                  color="secondary"
                />

                <v-icon
                  v-else
                  :color="colorButtonOpenStore"
                >
                  power_settings_new
                </v-icon>
              </v-list-item-icon>
              <v-list-item-title
                :class="`${colorButtonOpenStore}--text`"
              >
                {{ /success/i.test(String(colorButtonOpenStore || "")) ? "Sistema ligado" : "Sistema desligado" }}
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
          >
            <content-admin-session-products
              v-if="/products/i.test(service)"
            />

            <content-admin-session-orders
              v-if="/orders/i.test(service)"
            />

            <content-admin-session-discount
              v-if="/discount/i.test(service)"
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
      v-if="/admin/i.test(permission) && !/discount|reset-password/i.test(String(service))"
      :service="service"
    />

    <dialog-open-store 
      v-if="dialogOpenStore"
    />
  </v-card>
</template>

<script lang="ts">
  import { Component, Watch } from "vue-property-decorator"
  import { mixins } from "vue-class-component"
  import { namespace } from "vuex-class"
  import MixinAuthUser from "@/mixins/auth/mixinAuthUser"
  import MixinAdditionalSystem from "@/mixins/additional-system/mixinAdditionlSystem"

  const dialogStore = namespace("dialogStoreModule")

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
      ContentAdminSessionDiscount: () => import(
        /* chuckName: "content-admin-session-discount-component" */
        /* chuckMode: "eager" */
        "@/components/content/admin/SessionDiscount.vue"
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
      DialogOpenStore: () => import(
        /* chuckName: "dialog-open-store-component" */
        /* chuckMode: "eager" */
        "@/components/dialogs/DialogOpenStore.vue"
      ),
    }
  })
  export default class viewAdmin extends mixins(
    MixinAuthUser,
    MixinAdditionalSystem,
  ) {
    @dialogStore.Action("ActionDialogOpenStore") setDialogOpenStore
    @dialogStore.Getter("DialogOpenStore") getDialogOpenStore
    @dialogStore.Action("ActionDialogTryAgain") setDialogTryAgain

    service = ""
    colorButtonOpenStore = "primary"
    permission = ""
    loading = false


    get dialogOpenStore (): boolean {
      return this.getDialogOpenStore()
    }

    set dialogOpenStore (value) {
      this.setDialogOpenStore(value)
    }

    @Watch("dialogOpenStore")
      changeDialogOpenStore (): void {
        if (this.dialogOpenStore) return
        this.verifyOpenStore()
      }

    mounted (): void {
      const PERMISSION = sessionStorage.getItem("permission")
      const SESSION_CACHE = sessionStorage.getItem("session")
      if (PERMISSION) this.permission = PERMISSION

      if (SESSION_CACHE && /admin/i.test(String(PERMISSION))) this.service = String(SESSION_CACHE)
      else this.service = "orders"
      
      this.verifyOpenStore()
    }

    verifyOpenStore (): void {
      this.loading = true
      this.getOpenStore()
        .then(responseMixin => {
          if (/error/i.test(String(responseMixin))) throw Error("err")
          if (responseMixin)  this.colorButtonOpenStore = "success"
          else this.colorButtonOpenStore = "primary"
        }).catch(err => {
          window.log("ERROR mounted-view-admin", err)
          this.loading = false
          this.setDialogTryAgain(true)
        }).finally(() => {
          this.loading = false
        })
    }

    changeSession (session?:string): void {
      this.service = String(session)
      sessionStorage.setItem("session", String(session))
    }
  }
</script>
