<template>
  <v-row
    no-gutters
    class="pa-4 mx-auto"
    justify="center"
    style="width: 100%;max-width: 1100px;"
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
      class="py-4"
    />

    <v-col
      cols="12"
      class="hidden-sm-and-down"
    >
      <div
        class="d-flex justify-center align-center"
      >
        <v-slide-group
          show-arrows
          mobile
          prev-icon="arrow_back"
          next-icon="arrow_forward"
          :class="`d-flex fix--v-slide-group flex-wrap`"
          center-active
          mandatory
        >
          <v-slide-item
            v-for="{ name, url, link } in imagesPartners"
            :key="`partners-${name}`"
            class="mr-5 py-5"
          >
            <div>
              <a
                :href="link"
                target="_blank"
                @click="dataLayer({
                  'event': 'click_conhecer_parceiro',
                  'name': `Parceiro ${name}`
                })"
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
          </v-slide-item>
        </v-slide-group>
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
            @click="dataLayer({
              'event': 'click_conhecer_parceiro',
              'name': `Parceiro ${name}`
            })"
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
  import PARTNERS_DATA from "@/data/partners/partners.json"
  import { dataLayer } from "@/helpers/dataLayer"
  import "@/styles/view/viewPartners.styl"
  import "@/styles/view/viewDishes.styl"

  @Component({})
  export default class viewPartners extends Vue {
    dataLayer = dataLayer

    get imagesPartners (): typeof PARTNERS_DATA {
      return PARTNERS_DATA
    }
  }
</script>
