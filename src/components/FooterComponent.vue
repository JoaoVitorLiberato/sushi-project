<template>
  <v-footer
    padless
    :absolute="$vuetify.breakpoint.mdAndUp"
  >
    <v-card
      tile
      class="primary lighten-1"
      width="100%"
    >
      <v-row
        no-gutters
        class="pa-4"
      >
        <v-col
          cols="12"
          md="3"
        >
          <h3
            v-font-size="18"
            class="font-weight-medium"
            style="color: var(--v-primary-text);"
          >
            horario de funcionamento:
          </h3>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <h3
            v-font-size="18"
            class="font-weight-medium"
            style="color: var(--v-primary-text);"
          >
            Nos sigam nas redes sociais:
          </h3>

          <v-row
            no-gutters
          >
            <v-col
              v-for="item in icons"
              :key="`link-rede-social-${item.name}`"
              class="shrink mr-2 py-2"
              :title="`Nos sigam no ${item.name}`"
            >
              <a
                :href="item.link"
                target="_blank"
              >
                <img 
                  :src="item.img"
                  :alt="`Nos sigam em nossas redes socias - ${item.name}`"
                  width="40"
                  height="40"
                />
              </a>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-card-text 
        class="white--text"
      >
        Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo
        interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed 
        massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi
        vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui
        sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque
        penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} — <strong>Yumi Sushi</strong>
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
        name: "instagram",
        img: "/img/project/rede-sociais/instagram.png",
        link: ""
      },
      {
        name: "facebook",
        img: "/img/project/rede-sociais/facebook.png",
        link: ""
      },
    ]
  }
</script>
