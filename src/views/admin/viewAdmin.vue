<template>
  <v-card
    color="white"
    style="border-radius:0;d-flex"
  >
    <v-row
      no-gutters
      style="height:100vh"
    >
      <v-col
        cols="2"
        md="1"
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
                  class="text-uppercase"
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
              link
            >
              <v-list-item-icon>
                <v-icon
                  color="primary"
                >
                  list_alt
                </v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                Produtos
              </v-list-item-title>
            </v-list-item>

            <v-list-item
              link
            >
              <v-list-item-icon>
                <v-icon
                  color="primary"
                >
                  list
                </v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                Pedidos
              </v-list-item-title>
            </v-list-item>

            <v-list-item
              link
            >
              <v-list-item-icon>
                <v-icon
                  color="primary"
                >
                  how_to_reg
                </v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                Funcionários
              </v-list-item-title>
            </v-list-item>

            <v-list-item
              link
            >
              <v-list-item-icon>
                <v-icon
                  color="primary"
                >
                  lock_reset
                </v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                Alterar senha
              </v-list-item-title>
            </v-list-item>

            <v-list-item
              link
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
        class="pa-4"
      >
        <span>
          comdia
        </span>
      </v-col>
    </v-row>

    <button-add />
  </v-card>
</template>

<script lang="ts">
  import { Component } from "vue-property-decorator"
  import { mixins } from "vue-class-component"
  import MixinAuthUser from "@/mixins/auth/mixinAuthUser"

  @Component({
    components: {
      ButtonAdd: () => import(
        "@/components/buttons/ButtonAdd.vue"
      )
    }
  })
  export default class viewAdmin extends mixins(
    MixinAuthUser,
  ) {}
</script>
