<template>
  <v-main
    class="pa-0"
  >
    <v-container
      fluid
      class="pa-0"
    >
      <router-view
        v-if="/^(login-admin-view)$/i.test(String($route.name ||''))"
        name="viewAdminLogin"
      />

      <router-view
        v-if="/^(admin-view)$/i.test(String($route.name ||''))"
        name="viewAdmin"
      />
    </v-container>

    <dialog-slot-funcionalidades-component>
      <template
        #tryAgain
      />
    </dialog-slot-funcionalidades-component>

    <overlay-loading-service />
  </v-main>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator"

  @Component({
    components: {
      dialogSlotFuncionalidadesComponent: () => import(
        /* webpackChunkName: "dialog-slot-funcionalidades-component" */
        /* webpackMode: "eager" */
        "@/components/dialogs/DialogSlotFuncionaliades.vue"
      ),
      OverlayLoadingService: () => import(
        /* webpackChunkName: "overlay-loading-service-component" */
        /* webpackMode: "eager" */
        "@/components/overlays/LoadingService.vue"
      ),
    }
  })

  export default class routeOrderView extends Vue {
    created (): void {
      const TOKEN_CACHE = sessionStorage.getItem("token-user")
      if (!TOKEN_CACHE && /^(admin-view)$/i.test(String(this.$route.name ||""))) this.$router.replace("/admin/login")
    }
  }
</script>
