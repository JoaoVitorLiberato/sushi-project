<template>
  <v-card
    elevation="0"
    color="primary"
    class="my-2"
  >
    <v-row
      no-gutters
      style="border:1px solid var(--v-secondary-base)"
      class="pa-2"
    >
      <v-col
        cols="12"
      >
        <span
          v-font-size="$vuetify.breakpoint.smAndDown ? 13 : 16"
          class="font-weight-medium pr-2 text-uppercase"
          style="color:var(--v-primary-text)"
          v-text="name"
        />
        <span
          v-font-size="12"
          class="font-weight-thin"
          style="color:var(--v-primary-text)"
          v-text="`(${qtd_product}x)`"
        />
      </v-col>

      <v-col
        cols="12"
        class="py-1"
      />

      <v-col
        cols="12"
      >
        <span
          v-font-size="$vuetify.breakpoint.smAndDown ? 16 : 18"
          class="font-weight-medium pr-2 text-uppercase"
          style="color:var(--v-primary-text)"
          v-text="formatedPrice(price_total)"
        />
      </v-col>

      <v-col
        cols="12"
        class="py-1"
      />

      <v-col
        cols="12"
      >
        <v-row
          no-gutters
        >
          <v-col
            cols="8"
            class="d-flex align-center"
          >
            <v-btn
              color="secondary"
              fab
              dense
              depressed
              dark
              disabled
              style="width:20px;height:20px"
            >
              <v-icon>
                remove
              </v-icon>
            </v-btn>
            <span
              v-font-size="20"
              class="font-weight-bold mx-3"
              style="color:var(--v-primary-text)"
            >
              {{ qtd_product }}
            </span>
            <v-btn
            color="secondary"
              fab
              dense
              depressed
              dark
              disabled
              style="width:20px;height:20px"
            >
              <v-icon>
                add
              </v-icon>
            </v-btn>
          </v-col>
          <v-col
            cols="4"
            class="text-end"
          >
            <v-btn
              text
              color="error"
              title="Remover produto do carrinho"
            >
              <v-icon>
                delete
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>

      <v-col
        cols="12"
        class="py-1"
      />

      <v-col
        cols="12"
      >
        <v-btn
          text
          color="secondary"
          block
        >
          <span
            v-font-size="12"
            class="font-weight-medium"
          >
            Ver complementos
          </span>
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
  import { Component, Prop } from "vue-property-decorator"
  import { mixins } from "vue-class-component"
  import MixinHelperServiceProduct from "@/mixins/help-mixin/MixinHelperServiceProduct"

  @Component({})
  export default class CardProductCart extends mixins(
    MixinHelperServiceProduct,
  ) {
    @Prop({ default: "" }) name?:string
    @Prop({ default: "" }) qtd_product?:number|string
    @Prop({ default: "" }) price_total?:number|string
  }
</script>
