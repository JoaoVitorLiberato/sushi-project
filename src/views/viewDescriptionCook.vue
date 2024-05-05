<template>
  <v-row
    no-gutters
    class="primary lighten-1 pa-4"
  >
    <v-col
      v-width.max="'1400px'"
      cols="12"
      class="mx-auto"
    >
      <v-row
        no-gutters
      >
        <v-col
          cols="12"
          style="line-height:1"
          class="text-center pt-8"
        >
          <h2
            class="font-weight-bold text-uppercase"
          >
            Curiosidades sobre o CEO da Bangalô Sushi Lounge
          </h2>
        </v-col>

        <v-col
          cols="12"
          class="py-4 py-md-6"
        />

        <v-col
          cols="12"
        >
          <v-row
            no-gutters
            justify="center"
          >
            <v-col
              v-width.max="$vuetify.breakpoint.smAndDown ? '400px': ''"
              cols="12"
              :md="$vuetify.breakpoint.width >= 965 && $vuetify.breakpoint.width < 1200 ? 5 : 4"
              class="mx-auto mx-md-2"
            >
              <v-img
                v-border.radius="'10px 0 0 10px'"
                src="/img/project/ceo-sushi.webp"
                alt="Imagem do CEO e Sushiman do Yumi shusi"
                contain
                width="400"
                height="500"
              />
            </v-col>

            <v-col
              cols="12"
              class="py-4 hidden-md-and-up"
            />

            <v-col
              cols="12"
              :md="$vuetify.breakpoint.width >= 965 && $vuetify.breakpoint.width < 1200 ? 6 : 5"
            >
              <v-row
                no-gutters
              >
                <v-col
                  cols="12"
                  style="line-height:1"
                  class="text-center text-md-start"
                >
                  <h2
                    v-font-size="28"
                    class="font-weight-medium"
                  >
                    Lailson Leal
                  </h2>
                  <span
                    v-font-size="13"
                    class="font-weight-thin font-italic"
                  >
                    Ceo &amp; Sushiman
                  </span>
                </v-col>

                <v-col
                  cols="12"
                  class="py-3"
                />

                <v-col
                  cols="12"
                  style="line-height:1"
                >
                  <p
                    class="font-weight-regular"
                  >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, sint libero beatae rerum magni dolores sunt eum sapiente nulla cumque iusto! Voluptatem eum alias officiis quod laborum obcaecati quas accusamus magnam laboriosam unde. Fugiat perferendis quisquam non quibusdam quos ipsam, magni alias velit? Quidem quae dignissimos pariatur, quas modi minus laudantium velit qui tempore perferendis, facilis repellat tempora aut at delectus rem a ab! Vitae harum, molestiae nostrum labore hic dolores reiciendis in fugit a quae nihil iusto aliquam sit facere quos rerum velit ipsum maxime nesciunt voluptates deleniti nemo!
                    Culpa adipisci esse, et nam explicabo voluptas quas voluptate eos.
                  </p>
                </v-col>

                <v-col
                  cols="12"
                  class="py-3"
                />

                <v-col
                  cols="12"
                  style="line-height:1"
                >
                  <p
                    class="font-weight-regular"
                  >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, sint libero beatae rerum magni dolores sunt eum sapiente nulla cumque iusto! Voluptatem eum alias officiis quod laborum obcaecati quas accusamus magnam laboriosam unde. Fugiat perferendis quisquam non quibusdam quos ipsam, magni alias velit? Quidem quae dignissimos pariatur, quas modi minus laudantium velit qui tempore perferendis, facilis repellat tempora aut at delectus rem a ab! Vitae harum, molestiae nostrum labore hic dolores reiciendis in fugit a quae nihil iusto aliquam sit facere quos rerum velit ipsum maxime nesciunt voluptates deleniti nemo!
                    Culpa adipisci esse, et nam explicabo voluptas quas voluptate eos.
                  </p>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator"

  @Component({})
  export default class viewDesciptionCook extends Vue {}
</script>
