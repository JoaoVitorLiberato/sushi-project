<template>
  <div>
    <v-app-bar
      color="primary"
      elevate-on-scroll
      app
    >
      <v-row
        no-gutters
        align="center"
        :class="routeOrderClient ? '' : 'pa-3'"
      >
        <v-col
          cols="10"
          md="1"
        >
          <v-img
            src="/img/project/logo.png"
            alt="Logo do Yumi Sushi"
            width="40"
            height="40"
            @click="redirectHome"
          />
        </v-col>
        <v-col
          cols="9"
          class="hidden-sm-and-down"
        >
          <span
            class="font-weight-regular text-uppercase white--text"
          >
            O melhor sushi de Santa Luzia de Paruá
          </span>
        </v-col>
        <v-col
          v-if="!routeOrderClient"
          cols="2"
          class="text-end"
        >
          <v-btn
            text
            dark
            depressed
            dense
            style="min-width: 60px;"
            @click="overdrawerMenu = !overdrawerMenu"
          >
            <v-icon>
              menu
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-app-bar>
    <overdrawer-menu />
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator"
  import { namespace } from "vuex-class"

  const cacheStore = namespace("cacheStoreModule")

  @Component({
    components: {
      OverdrawerMenu: () => import(
        /* webpackChunkName: "overdrawer-menu-dialog-component" */
        /* webpackMode: "eager" */
        "@/components/drawer/DrawerComponent.vue"
      )
    }
  })
  export default class ToolbarComponent extends Vue {
    @cacheStore.Getter("getCacheOverdrawerMenu") getOverdrawerMenu
    @cacheStore.Action("ActionCacheOverdrawerMenu") setOverdrawerMenu

    get overdrawerMenu (): boolean {
      return this.getOverdrawerMenu()
    }

    set overdrawerMenu (value: boolean) {
      this.setOverdrawerMenu(value)
    }

    get routeOrderClient (): boolean {
      return /pedido/i.test(String(this.$route.name || ""))
    }

    redirectHome (): void {
      location.replace("/")
    }
  }
</script>
