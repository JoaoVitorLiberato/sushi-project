<template>
  <v-footer
    padless
    :style="/order-view/i.test(String($route.name)) && $vuetify.breakpoint.mdAndUp ? 'position:fixed;bottom:0;left:0;width:100vw' : ''"
  >
    <v-card
      tile
      class="primary lighten-1"
      width="100%"
    >
      <v-row
        no-gutters
        style="max-width: 1100px;"
        class="pa-4 mx-auto"
      >
        <v-col
          cols="12"
          md="3"
        >
          <h3
            v-font-size="16"
            class="font-weight-medium text-uppercase"
            style="color: var(--v-primary-text);"
          >
            horario de atendimento:
          </h3>
          <p
            v-font-size="14"
            style="color: var(--v-primary-text);"
            class="font-weight-thin font-italic pl-1"
          >
            De <strong>segunda-feira</strong> à <strong>segunda-feira</strong><br>
            dás <strong>18:30</strong> às <strong>23:00</strong>
          </p>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <h3
            v-font-size="16"
            class="font-weight-medium text-uppercase"
            style="color: var(--v-primary-text);"
          >
            Nos sigam nas redes sociais:
          </h3>

          <v-row
            no-gutters
            class="pl-1"
          >
            <v-col
              v-for="item in icons"
              :key="`link-rede-social-${item.rede}`"
              cols="12"
              class="shrink py-1"
              :title="`Nos sigam no ${item.rede}`"
            >
              <a
                :href="item.link"
                target="_blank"
                class="d-flex align-center"
              >
                <img
                  :src="item.img"
                  :alt="`Nos sigam em nossas redes socias - ${item.rede}`"
                  width="20"
                  height="20"
                  class="mr-2"
                />

                <span
                  v-font-size="14"
                  class="font-weight-regular"
                  style="color:var(--v-primary-text)"
                  v-text="`${item.name}`"
                />
              </a>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-divider></v-divider>

      <v-card-text
        class="font-weight-medium text-center text-uppercase font-italic"
        style="color:var(--v-primary-text)"
      >
        {{ new Date().getFullYear() }} — <span>Bangalô Sushi Lounge</span>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator"

  @Component({})
  export default class Footercomponent extends Vue {
    icons = [
      {
        name: "@bangalosushislp",
        img: "/img/project/rede-sociais/instagram.png",
        link: "https://www.instagram.com/bangalosushislp?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
        rede: "Instagram"
      },
      // {
      //   name: "Bangalô Sushi Lounge",
      //   img: "/img/project/rede-sociais/facebook.png",
      //   link: "",
      //   rede: "Facebook"
      // },
    ]
  }
</script>
