<template>
  <v-card
    class="mx-auto my-12"
    max-width="300"
  >
    <template v-slot:progress>
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      height="200"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
    ></v-img>

    <v-card-title>Cafe Badilico</v-card-title>

    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >
        <v-rating
          :value="4.5"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

        <div class="grey--text ms-2">
          4.5 (413)
        </div>
      </v-row>

      <div
        class="my-4"
      >
        Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.
      </div>
    </v-card-text>

    <v-divider class="mx-1"></v-divider>
    <v-card-actions>
      <v-btn
        block
        color="secondary"
      >
        <span 
          v-text="'Comprar'"
        />
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator"

  @Component({})
  export default class CardProductComponent extends Vue {}
</script>