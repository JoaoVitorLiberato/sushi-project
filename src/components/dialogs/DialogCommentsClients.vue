<template>
  <v-dialog
    fullscreen
    v-model="open"
  >
    <v-card
      color="primary"
    >
      <v-row
        no-gutters
        class="pa-2"
      >
        <v-col
          cols="12"
          class="text-end"
        >
          <v-btn
            text
            color="secondary"
            large
            fab
          >
            <v-icon
              size="25"
            >
              close
            </v-icon>
          </v-btn>
        </v-col>

        <v-col
          cols="12"
          class="pa-2"
        >
          <v-row
            no-gutters
            style="max-width:440px"
            class="mx-auto"
          >
            <v-col
              cols="12"
              style="line-height:1"
            >
              <span
                class="font-weight-regular secondary--text"
                style="font-size:18px"
              >
                Deixe sua avaliação abaixo do que achou de nossos produtos.
              </span>
            </v-col>

            <v-col
              cols="12"
              class="py-3"
            />

            <v-col
              cols="12"
            >
              <div
                v-for="{ id, name, rating } in ProductComments"
                :key="`card-dialog-comments-client-${id}-${name}`"
                class="my-3"
              >
                <v-row
                  no-gutters
                >
                  <v-col
                    cols="12"
                  >
                    <span
                      class="font-weight-medium text-uppercase"
                      style="color:var(--v-primary-text);font-size:14px"
                    >
                      {{ name }}
                    </span>
                  </v-col>

                  <v-col
                    cols="12"
                  >
                    <v-rating
                      :value="rating"
                      background-color="secondary"
                      color="secondary"
                      class="px-0"
                      large
                      @input="chage(id)"
                    />
                  </v-col>

                  <v-col
                    cols="12"
                  >
                    <v-textarea
                      v-font-size="$vuetify.breakpoint.smAndDown ? 14 : 16"
                      v-model="data.message"
                      label="Comentário"
                      auto-grow
                      color="white"
                      dark
                      outlined
                      placeholder="Deixe seu comentario neste input"
                      rows="4"
                      row-height="40"
                    />
                  </v-col>

                  <v-col
                    cols="12"
                  >
                    <v-btn
                      color="secondary"
                      block
                      @click="ver()"
                    >
                      Enviar
                    </v-btn>
                  </v-col>
                </v-row>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
  import { Component, Prop, Emit } from "vue-property-decorator"
  import { mixins } from "vue-class-component"
    import { IproductData } from "@/types/types-product"

  @Component({})
  export default class DialogCommentsClients extends mixins() {
    @Emit()
      closeDialog() {}
    @Prop() products?: IproductData[]
    @Prop({ default: false }) open?: boolean

    data = {
      id: "",
      rating: 0,
      message: ""
    }

    get ProductComments () {
      if (!this.products) return []
      return this.products?.map(item => {

        return {
          ...item,
          rating: 0,
          message: ""
        }
      })
    }

    ver () {
      console.log(this.ProductComments)
    }
  }
</script>
