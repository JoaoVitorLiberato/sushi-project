<template>
  <v-card
    class="mx-auto my-12"
    width="280"
  >
    <template v-slot:progress>
      <v-progress-linear
        color="deep-purple"
        height="5"
        indeterminate
      />
    </template>

    <v-img
      height="200"
      :src="image"
    ></v-img>

    <v-row
      no-gutters
      class="pa-4"
    >
      <v-col
        cols="12"
      >
        <v-card-title
          v-font-size="16"
          class="pa-0"
        >
          <span
            class="font-weight-medium"
            v-text="title"
          />
        </v-card-title>
      </v-col>

      <v-col
        cols="12"
        class="py-1"
      />

      <v-col
        cols="12"
      >
        <v-row
          align="center"
          class="mx-0"
        >
          <v-rating
            :value="note_client"
            color="secondary"
            dense
            half-increments
            readonly
            size="14"
          ></v-rating>

          <div 
            class="grey--text ms-2 d-flex align-center"
          >
            <div
              class="ml-1"
            >
              <v-icon
                size="16"
              >
                forum
              </v-icon> (0)
            </div>
          </div>
        </v-row>
      </v-col>

      <v-col
        cols="12"
        class="py-2"
      />

      <v-col
        cols="12"
        style="line-height:1;height: 70px;overflow-y: scroll;"
      >
        <span
          v-font-size="14"
          class="font-weight-regular grey--text"
          v-html="description"
        />
      </v-col>

      <v-col
        v-if="verifyRouteProduct"
        cols="12"
      >
        <v-row
          no-gutters
          class="px-0"
        >
          <v-col
            cols="12"
          >
            <v-divider
              class="mx-1"
            />
          </v-col>

          <v-col
            cols="12"
            class="py-1"
          />

          <v-col
            cols="12"
            class="px-0"
          >
            <v-checkbox
              color="success"
              dense
              class="mx-0"
            >
              <template v-slot:label>
                <span
                  v-font-size="14"
                  class="font-weight-regular gray--text"
                >
                  Desejo empanar o produto
                </span>
              </template>
            </v-checkbox>
          </v-col>

          <v-col
            cols="12"
          >
            <v-divider
              class="mx-1"
            />
          </v-col>

          <v-col
            cols="12"
            class="py-1"
          />

          <v-col
            cols="12"
            class="px-2"
          >
            <v-row
              no-gutters
              align="center"
              justify="space-between"
            >
              <v-col
                cols="4"
              >
                <span
                  v-font-size="19"
                  class="font-weight-medium"
                  v-text="`${formatedPrice(Number(price))}`"
                />
              </v-col>

              <v-col
                cols="4"
                class="d-flex align-center mr-2"
              >
                <v-btn
                  color="secondary"
                  fab
                  dense
                  depressed
                  dark
                  style="width: 30px;height:30px"
                  @click="countQTDProduct('subtrair')"
                >
                  <v-icon>
                    remove
                  </v-icon>
                </v-btn>
                <span
                  v-font-size="20"
                  class="font-weight-bold mx-1"
                >
                  {{ count }}
                </span>
                <v-btn
                color="secondary"
                  fab
                  dense
                  depressed
                  dark
                  style="width: 30px;height:30px"
                  @click="count = count + 1 "
                >
                  <v-icon>
                    add
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>

      <v-col
        cols="12"
        class="mt-2"
      >
        <v-card-actions>
          <v-btn
            block
            color="secondary"
          >
            <span
              class="font-weight-bold mr-1 primary--text"
              style="font-family: 'Roboto', sans-serif;"
              v-text="'Adicionar'"
            />

            <v-icon
              color="primary"
              size="17"
            >
              shopping_cart
            </v-icon>
          </v-btn>
        </v-card-actions>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from "vue-property-decorator"
  import { formatedPrice, additionalPriceBreaded } from "@/helpers/formatedPrice"

  @Component({})
  export default class CardProductComponent extends Vue {
    @Prop({ default: "" }) readonly image?:string
    @Prop({ default: "" }) readonly title?:string
    @Prop({ default: "" }) readonly description?:string
    @Prop({ default: 0 }) readonly note_client?:string
    @Prop({ default: 0 }) readonly price?: number|string|string[]

    formatedPrice = formatedPrice
    additionalPriceBreaded = additionalPriceBreaded

    count = 0

    get verifyRouteProduct (): boolean {
      return /product/i.test(String(this.$route.name ||""))
    }

    countQTDProduct (operation:string): void {
      if (/subtrair/i.test(String(operation || "")) && this.count === 0) return
      if (/subtrair/i.test(String(operation || ""))) this.count = this.count - 1 
    }

    // priceBreadedActive (activedBreaded: boolean, additional:string|number): string|number|string[]|void {
    //   if (activedBreaded === false) return
    // }
  }
</script>
