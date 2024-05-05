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
        class="d-flex align-center justify-space-between"
      >
        <span
          v-font-size="$vuetify.breakpoint.smAndDown ? 13 : 16"
          class="font-weight-medium pr-2 text-uppercase"
          style="color:var(--v-primary-text)"
          v-text="name"
        />
        <div
          class="secondary px-2"
          style="border-radius: 10px;"
        >
          <span
            v-font-size="12"
            class="font-weight-bold text-uppercase"
            style="color:var(--v-primary-base)"
            v-text="typeDifferenceProduct()"
          />
        </div>
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
          v-text="formatedPrice(Number(price_total))"
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
            @click="$emit('deleteProduct')"
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
          class="d-flex justify-space-between"
          @click="() => open = !open"
        >
          <span
            v-font-size="12"
            class="font-weight-medium"
          >
            Ver complementos
          </span>
          <v-icon
            :style="open ? 'transform: rotate(180deg)' : 'transform: rotate(0deg)'"
          >
            expand_more
          </v-icon>
        </v-btn>
      </v-col>

      <v-col
        cols="12"
      >
        <v-expand-transition>
          <div 
            v-show="open"
          >
            <v-row
              no-gutters
              style="color: var(--v-primary-text)"
            >
              <v-col
                v-for="(item, i) in complements"
                :key="`complement-card-${i}`"
                cols="12"
                class="px-4 py-1 d-flex align-center justify-space-between"
              >
                <div>
                  <span
                    v-font-size="12"
                    class="font-weight-medium mr-1 text-uppercase"
                  >
                    {{ item.name }}
                  </span>
                  <span
                    v-font-size="12"
                    class="font-weight-regular"
                    v-text="`( x${item.qtd} )`"
                  />
                </div>
                  <span
                    v-font-size="12"
                    v-text="item.price ? `R$ ${Number(item.price) < 100 ? '0' : '' }${formatedPrice(Number(item.price), '.')}` : `R$ ${Number(item.price) > 0 && Number(item.price) < 100 ? '0' : '' }${formatedPrice(Number(item.price), '.')}`"
                  />
              </v-col>
              <v-col
                v-if="complements && complements.length <= 0 || !complements"
                cols="12"
                class="px-4"
              >
                <span
                  v-font-size="13"
                  class="font-weight-regular"
                >
                  Sem complementos Adicionados.
                </span>
              </v-col>
            </v-row>
          </div>
        </v-expand-transition>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
  import { Component, Prop, Emit } from "vue-property-decorator"
  import { mixins } from "vue-class-component"
  import MixinHelperServiceProduct from "@/mixins/help-mixin/MixinHelperServiceProduct"
  import { IComplements, IDifferences } from "@/types/types-product"

  @Component({})
  export default class CardProductCart extends mixins(
    MixinHelperServiceProduct,
  ) {
    @Emit()
      deleteProduct () {}
    @Prop({ default: "" }) name?:string
    @Prop({ default: "" }) qtd_product?:number|string
    @Prop({ default: "" }) price_total?:number|string
    @Prop({ default: [] }) complements?: IComplements[]
    @Prop({ default: {} }) differences?: IDifferences

    open = false

    typeDifferenceProduct (): string {
      let typeText = [] as string[]
      let returnText = ""

      if (this.differences) {
        Object.keys(this.differences).forEach(type => {
          if (!this.differences) return typeText.push("Natural")

          switch (true) {
            case /especial/i.test(type as string) && this.differences[type].active:
              return typeText.push("Especial")
            case /breaded/i.test(type as string) && this.differences[type].active:
              return typeText.push("Empanado")
            case /flambed/i.test(type as string) && this.differences[type].active:
              return typeText.push("Flambado")
            default:
              return typeText.push("Natural")
          }
        })
      }

      if ((String(typeText[0]).toLowerCase().includes(("Especial").toLowerCase()))) {
        returnText = "Especial"
      } else if ((String(typeText[1]).toLowerCase().includes(("Empanado").toLowerCase())))  {
        returnText = "Empanado"
      } else if ((String(typeText[2]).toLowerCase().includes(("Flambado").toLowerCase()))) {
        returnText = "Flambado"
      } else {
        returnText = "Natural"
      }

      return returnText
    }
  }
</script>
