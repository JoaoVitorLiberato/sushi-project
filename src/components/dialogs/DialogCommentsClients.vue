<template>
  <v-dialog
    fullscreen
    v-model="dialogOpen"
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
            @click="$emit('closeDialog')"
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
          class="py-2"
        />

        <v-col
          cols="12"
          class="pa-2"
        >
          <div
            v-if="productComments.length <= 0"
            class="text-center"
          >
            <span
              v-font-size="18"
              class="font-weight-regular grey--text"
            >
              Não há produtos para avaliação no momento.
            </span>
          </div>
          <v-row
            v-else
            no-gutters
            style="max-width:440px"
            class="mx-auto"
          >
            <v-col
              cols="12"
              style="line-height:1"
            >
              <span
                v-font-size="$vuetify.breakpoint.smAndDown ? 16 : 18"
                class="font-weight-regular secondary--text"
              >
                Deixe sua avaliação abaixo do que achou de nossos produtos.
              </span>
            </v-col>

            <v-col
              cols="12"
              class="py-3 py-md-3"
            />

            <v-col
              cols="12"
            >
              <v-carousel 
                hide-delimiters
                :show-arrows="false"
                height="380"
              >
                <v-carousel-item
                  v-for="{ id, name } in productComments"
                  :key="`card-dialog-comments-client-${id}-${name}`"
                >
                  <v-row
                    no-gutters
                  >
                    <v-col
                      cols="12"
                    >
                      <span
                        class="font-weight-medium text-uppercase"
                        style="color:var(--v-primary-text);font-size:16px"
                      >
                        {{ name }}
                      </span>
                    </v-col>

                    <v-col
                      cols="12"
                    >
                      <v-row
                        no-gutters
                      >
                        <v-col
                          cols="12"
                        >
                          <span
                            v-font-size="14"
                            style="color:var(--v-primary-text)"
                            class="font-weight-regular"
                          >
                            Deixe sua nota de 1 à 5
                          </span>
                        </v-col>

                        <v-col
                          cols="12"
                          class="d-flex align-center"
                        >
                          <v-rating
                            v-model="data.rating"
                            background-color="secondary"
                            color="secondary"
                            class="px-0"
                            large
                          />

                          <span
                            v-font-size="18"
                            class="ml-2 font-weight-medium white--text"
                          >
                            {{ data.rating }}
                          </span>
                        </v-col>
                      </v-row>
                    </v-col>

                    <v-col
                      cols="12"
                      class="py-3"
                    />

                    <v-col
                      cols="12"
                    >
                      <v-textarea
                        v-font-size="$vuetify.breakpoint.smAndDown ? 14 : 16"
                        v-model="data.comment"
                        label="Comentário"
                        auto-grow
                        color="white"
                        dark
                        outlined
                        :placeholder="`Deixe seu comentario sobre o que achou do nosso produto ${name}.`"
                        rows="4"
                        row-height="40"
                      />
                    </v-col>

                    <v-col
                      cols="12"
                      class="py-1"
                    />

                    <v-col
                      cols="12"
                    >
                      <v-progress-linear
                        v-if="loading"
                        color="secondary"
                        indeterminate
                      />
                      <v-btn
                        v-else
                        color="secondary"
                        block
                        @click="sendRatingAndCommentClient(id)"
                      >
                        Enviar
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-carousel-item>
              </v-carousel>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
  /* eslint-disable @typescript-eslint/no-explicit-any*/
  import { Component, ModelSync } from "vue-property-decorator"
  import { mixins } from "vue-class-component"
  import { IproductData } from "@/types/types-product"
  import { namespace } from "vuex-class"
  import MixinServiceOrderCostumer from "@/mixins/order/mixinServiceOrderCostumer"

  const cacheStore = namespace("cacheStoreModule")

  @Component({})
  export default class DialogCommentsClients extends mixins(
    MixinServiceOrderCostumer,
  ) {
    @cacheStore.Action("ActionCacheRastreamentoComentariosProduto") setCacheRastreamentoComentariosProduto
    @cacheStore.Action("ActionCacheOrdersCart") setCacheOrdersCart
    @cacheStore.Getter("CacheOrderCart") getCacheOrdersCart

    @ModelSync("open", "closeDialog", { type: Boolean })
      readonly dialogOpen?:boolean
    @ModelSync("disableButton", "emitDisableButton", { type: String })
      statusDisable?:string

    loading = false
    data = {
      id: 0,
      rating: 1,
      name: "",
      comment: ""
    }

    get productComments (): IproductData[] {
      return this.getCacheOrdersCart() || []
    }

    set productComments (value) {
      this.setCacheOrdersCart(value)
    }

    created (): void {
      const CACHE_ORDER_DATA = sessionStorage.getItem("api-fake")
      if (CACHE_ORDER_DATA) this.data.name = JSON.parse(CACHE_ORDER_DATA).nome
    }

    sendRatingAndCommentClient (id:string|number): void {
      this.loading = true
      this.data.id = Number(id)
      const LIST_REMOVED = this.productComments.filter(item => Number(item.id) !== Number(id))

      this.commentProductCostumer(this.data)
        .then(responseMixin => {
          if (!responseMixin) throw Error("Caiu no catch")
          this.productComments = LIST_REMOVED
          this.setCacheRastreamentoComentariosProduto(Number(id))
          this.data.rating = 1
          this.data.comment = ""

          if (this.productComments.length === 0) this.statusDisable = "not-product"
          this.loading = false
        }).catch(err => {
          window.log(`ERROR MIXIN sendRatingAndCommentClient`, err)
          this.loading = false
        })
    }
  }
</script>
