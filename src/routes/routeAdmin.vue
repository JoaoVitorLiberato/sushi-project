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
  </v-main>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator"

  @Component({})
  export default class routeOrderView extends Vue {
        beforeRouteEnter (
      to: {
        name: string,
      },
      _from: never,
      next: (arg0: (vm) => void) => void,
    ) {
      next((vm) => {
        const TOKEN_CACHE = sessionStorage.getItem("token-admin")
        if (!TOKEN_CACHE && /admin-view/i.test(String(to.name ||""))) vm.$router.replace({ name: "login-admin-view" })
      })
    }
  }
</script>
