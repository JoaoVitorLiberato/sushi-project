<template>
  <v-row
    no-gutters
    class="pa-4"
    justify="center"
  >
    <v-col
      cols="12"
      class="text-center"
    >
      <h2
        class="font-weight-bold text-uppercase"
      >
        Conheça nossos parceiros
      </h2>
    </v-col>
    <v-col
      cols="12"
      class="hidden-sm-and-down"
    >
      <div
        class="d-flex justify-center align-center"
      >
        <div
          v-for="{ name, url, link } in imagesPartners"
          :key="`partners-${name}`"
        >
          <a 
            :href="link"
            target="_blank"
          >
            <v-img
              :src="url"
              :alt="`Conheça nosso parceiro ${name}`"
              :title="`Conheça nosso parceiro ${name}`"
              contain
              :width="$vuetify.breakpoint.width > 970 && $vuetify.breakpoint.width <= 1024 ? 260 : 300"
              :height="$vuetify.breakpoint.width > 970 && $vuetify.breakpoint.width <= 1024 ? 200 : 250"
            />
          </a>
        </div>
      </div>
    </v-col>
    <v-col
      cols="12"
      class="hidden-md-and-up"
    >
      <v-carousel
        cycle
        height="300"
        hide-delimiter-background
        :show-arrows="false"
        centered
        class="fix-caroucel-parceiro"
      >
        <v-carousel-item
          v-for="{ name, url, link } in imagesPartners"
          :key="`partners-mobile-${name}`"
          style="max-width: 400px;"
          class="mx-auto"
        >
          <a 
            :href="link"
            target="_blank"
          >
            <v-img
              :src="url"
              :alt="`Conheça nosso parceiro ${name}`"
              :title="`Conheça nosso parceiro ${name}`"
              contain
              width="300"
              height="250"
            />
          </a>
        </v-carousel-item>
      </v-carousel>
    </v-col>
  </v-row>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator"
  import "@/styles/view/viewPartners.styl"

  @Component({})
  export default class viewPartners extends Vue {
    get imagesPartners (): {
      name: string,
      url: string
      link?: string
    }[] {
      return [
        {
          name: "Posto Águia",
          url: "/img/project/parceiros/posto-aguia.png",
          link: ""
        },
        {
          name: "Águia Fitness",
          url: "/img/project/parceiros/aguia-fitness.png",
          link: ""
        },
        {
          name: "Águia Motos",
          url: "/img/project/parceiros/aguia-motos.png",
          link: ""
        },
        {
          name: "Center Car",
          url: "/img/project/parceiros/center-car.png",
          link: ""
        },
      ]
    }

  }
</script>
