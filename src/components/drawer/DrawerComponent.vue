<template>
  <v-navigation-drawer
    v-model="overdrawerMenu"
    right
    temporary
    app
    color="primary"
  >
    <v-list-item>
      <v-list-item-content
        class="d-flex justify-space-between align-center"
      >
        <span
          class="text-uppercase"
        >
          Yumi Sushi
        </span>
      </v-list-item-content>
    </v-list-item>

    <v-divider
      style="background-color:var(--v-gray-primary)"
    />

    <v-list
      class="mt-8"
    >
      <v-list-item
        link
        @click="redirectToRouteDelevery"
      >
        <v-list-item-icon>
          <v-icon
            color="white"
          >
            airport_shuttle
          </v-icon>
        </v-list-item-icon>

      <v-list-item-content>
        <v-list-item-title
          style="color:var(--v-primary-text)"
        >
          Delivery
        </v-list-item-title>
      </v-list-item-content>
      </v-list-item>

      <v-list-item
        link
        @click="overdrawerMenu = false, setDialogTableSelected(true)"
      >
        <v-list-item-icon>
          <v-icon
            color="white"
          >
            room_service
          </v-icon>
        </v-list-item-icon>

      <v-list-item-content>
        <v-list-item-title
          style="color:var(--v-primary-text)"
        >
          Estabelecimento
        </v-list-item-title>
      </v-list-item-content>
      </v-list-item>

      <v-list-item
        link
      >
        <v-list-item-icon>
          <v-icon
            color="white"
          >
            person
          </v-icon>
        </v-list-item-icon>

      <v-list-item-content>
        <v-list-item-title
          style="color:var(--v-primary-text)"
        >
          Administrador
        </v-list-item-title>
      </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
  import { Component } from "vue-property-decorator"
  import { mixins } from "vue-class-component"
  import MixinRedirectLinks from "@/mixins/redirectLinks/MxiinRedirectLinks"
  import { namespace } from "vuex-class"

  const cacheStore = namespace("cacheStoreModule")
  const dialogStore = namespace("dialogStoreModule")

  @Component({})
  export default class DrawerComponent extends mixins(
    MixinRedirectLinks,
  ) {
    @cacheStore.Getter("getCacheOverdrawerMenu") getOverdrawerMenu
    @cacheStore.Action("ActionCacheOverdrawerMenu") setOverdrawerMenu
    @dialogStore.Action("ActionTableSelected") setDialogTableSelected

    get overdrawerMenu (): boolean {
      return this.getOverdrawerMenu()
    }

    set overdrawerMenu (value: boolean) {
      this.setOverdrawerMenu(value)
    }
  }
</script>
