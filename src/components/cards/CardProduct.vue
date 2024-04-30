<template>
  <v-card
    class="mx-auto my-12"
    width="280"
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
      v-font-size="15"
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
          :value="note_client"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

        <div 
          class="grey--text ms-2 d-flex align-center"
        >
          {{ note_client }}
          
          <div
            class="ml-5"
          >
            <v-icon
              size="16"
            >
              forum
            </v-icon> (0)
          </div>
        </div>
      </v-row>

      <div
        class="mt-6"
        style="height:60px;overflow-y: scroll;line-height: 1;"
      >
        <span
          v-font-size="13"
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
    @Prop({ default: 0 }) readonly note_client?:string

    get verifyRoutePedido (): boolean {
      return /pedido/i.test(String(this.$route.name ||""))
    }
  }
</script>
