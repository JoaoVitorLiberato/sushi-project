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
      :src="image"
    ></v-img>

    <v-card-title
      class="font-weight-medium"
    >
      {{ title }}
    </v-card-title>

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
        class="my-4 px-1"
        style="height:140px;overflow-y: scroll;"
      >
        <span
          v-font-size="14"
          style="line-height: 16px;"
          class="font-weight-regular"
          v-html="description"
        />
      </div>
    </v-card-text>

    <v-divider
      v-if="verifyRoutePedido"
      class="mx-1"
    />

    <v-card-actions
      v-if="verifyRoutePedido"
    >
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
  import { Component, Vue, Prop } from "vue-property-decorator"

  @Component({})
  export default class CardProductComponent extends Vue {
    @Prop({ default: "" }) readonly image?:string
    @Prop({ default: "" }) readonly title?:string
    @Prop({ default: "" }) readonly description?:string

    get verifyRoutePedido (): boolean {
      return /pedido/i.test(String(this.$route.name ||""))
    }
  }
</script>
