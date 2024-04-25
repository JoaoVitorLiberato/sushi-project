<template>
  <v-app-bar
    color="primary"
    elevate-on-scroll
    fixed
  >
    <v-row
      no-gutters
      align="center"
      class="pa-3"
    >
      <v-col
        cols="10"
        md="1"
        class="white--text"
      >
        imagem_logo
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

    <overdrawer-menu />
  </v-app-bar>
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
  }
</script>
