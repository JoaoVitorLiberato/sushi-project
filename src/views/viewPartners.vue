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
  import "@/styles/view/viewDishes.styl"

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
          link: "https://www.instagram.com/postoeconvenienciaaguia?igsh=cXRhbjg3ODN6dWh4 "
        },
        {
          name: "360 - Assessoria de capital",
          url: "/img/project/parceiros/360.png",
          link: "https://www.instagram.com/360assessoriabr?igsh=YjVlajJsbGdybm84"
        },
        {
          name: "Águia Fitness - A melhor forma de se cuidar",
          url: "/img/project/parceiros/aguia-fitness.png",
          link: "https://www.instagram.com/aguiafiitness?igsh=MTVueHJzbDRiaWFwag=="
        },
        {
          name: "Distribuidora SOL - Delivery de bebidas",
          url: "/img/project/parceiros/sol-distribuidora.png",
          link: "https://www.instagram.com/soldeliverybeer?igsh=cjEwMWZuZ3h4cTVk"
        },
        {
          name: "Center Car - O centro de serviços do seu carro",
          url: "/img/project/parceiros/center-car.png",
          link: ""
        },
        {
          name: "Rosana Andrade Estética",
          url: "/img/project/parceiros/rosana.png",
          link: "https://www.instagram.com/rosanaaestetica?igsh=MWc4cW9zZGEwNXR5dg%3D%3D"
        },
        {
          name: "Cabana - Espaço de eventos ",
          url: "/img/project/parceiros/cabana-eventos.png",
          link: "https://www.instagram.com/cabanashowseeventos?igsh=MW91YzJud2E4dGhkZg%3D%3D"
        },
        {
          name: "Águia Motos - A casa do motoqueiro",
          url: "/img/project/parceiros/aguia-motos.png",
          link: ""
        },
        {
          name: "Taynara Gomes - Bolos, Salgados e Petiscos",
          url: "/img/project/parceiros/taynara-gomes.jpg",
          link: "https://www.instagram.com/tanara_gomes?igsh=MTV6NGFuZmt6NXJjbg=="
        },
        {
          name: "Diamond Black Store - O rei das jóias e relógios importados",
          url: "/img/project/parceiros/diamond-black-store.JPG",
          link: "https://www.instagram.com/diamontblackst?igsh=MWx6NWM5dWR1ZDIxZA=="
        },
        {
          name: "SLP Online Ativa",
          url: "/img/project/parceiros/slp-online-ativa.jpg",
          link: "https://www.instagram.com/slp_onlineativa?igsh=N2wxYjRveHAwN3k5"
        }
      ]
    }

  }
</script>
