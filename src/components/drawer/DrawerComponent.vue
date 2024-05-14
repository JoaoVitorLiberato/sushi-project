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
        class="d-flex align-center"
      >
        <v-img
          src="/img/project/logo.png"
          alt="Logo do Bangalô Sushi Lounge"
          width="20"
          height="20"
          contain
        />
      </v-list-item-content>
    </v-list-item>

    <v-divider
      style="background-color:var(--v-gray-primary)"
    />

    <v-list
      class="mt-8"
    >
      <v-list-item
        v-if="disabledRoutes"
        link
        @click="goToHome"
      >
        <v-list-item-icon>
          <v-icon
            color="white"
          >
            home
          </v-icon>
        </v-list-item-icon>

      <v-list-item-content>
        <v-list-item-title
          style="color:var(--v-primary-text)"
        >
          Inicio
        </v-list-item-title>
      </v-list-item-content>
      </v-list-item>

      <v-list-item
        v-if="!disabledRoutes"
        link
        @click.stop="returnProductRoute('delivery')"
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
        v-if="!disabledRoutes"
        link
        @click.stop="returnProductRoute('foodpark')"
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
        v-if="!disabledRoutes"
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

      <v-list-item
        v-if="!disabledRoutes"
        link
        @click="goToDatailOrder"
      >
        <v-list-item-icon>
          <v-icon
            color="white"
          >
            receipt_long
          </v-icon>
        </v-list-item-icon>

      <v-list-item-content>
        <v-list-item-title
          style="color:var(--v-primary-text)"
        >
          Meu pedido
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

  @Component({})
  export default class DrawerComponent extends mixins(
    MixinRedirectLinks,
  ) {
    @cacheStore.Getter("getCacheOverdrawerMenu") getOverdrawerMenu
    @cacheStore.Action("ActionCacheOverdrawerMenu") setOverdrawerMenu

    get overdrawerMenu (): boolean {
      return this.getOverdrawerMenu()
    }

    set overdrawerMenu (value: boolean) {
      this.setOverdrawerMenu(value)
    }

    get disabledRoutes (): boolean {
      return /product|order-view/i.test(String(this.$route.name || ""))
    }
  }
</script>
