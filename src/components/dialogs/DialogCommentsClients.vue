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
            v-if="productCacheComment().length <= 0"
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
                  v-for="{ id, name } in productCacheComment()"
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
                        @click="sendRatingAndCommentClient(String(id))"
                      >
                        Enviar
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-carousel-item>
              </v-carousel>
            </v-col>
          </v-row>

          <v-dialog
            ref="dialogErrorComment"
            width="400"
          >
            <v-card
              style="border-radius:0;"
              color="primary"
            >
              <v-row
                no-gutters
                style="border: 1px solid var(--v-secondary-base);"
                class="pa-4"
              >
                <v-col
                  cols="12"
                  style="line-height: 1;"
                >
                  <span
                    class="grey--text font-weight-regular"
                  >
                    Houve um erro no servidor ao tentar avaliar nosso produto. Por favor,
                    tente mais tarde.
                  </span>
                </v-col>

                <v-col
                  cols="12"
                  class="py-2"
                />

                <v-col
                  cols="12"
                >
                  <v-btn
                    color="secondary"
                    depressed
                    block
                    @click="$refs.dialogErrorComment.save()"
                  >
                    <span
                      class="primary--text font-weight-bold"
                    >
                      Tentar mais tarde
                    </span>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-dialog>
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
  import { $refs } from "@/implements/types"
  import MixinServiceOrderCostumer from "@/mixins/order/mixinServiceOrderCostumer"

  const cacheStore = namespace("cacheStoreModule")

  @Component({})
  export default class DialogCommentsClients extends mixins(
    MixinServiceOrderCostumer,
  ) implements $refs {
    $refs
    @cacheStore.Action("ActionCacheRastreamentoComentariosProduto") setCacheRastreamentoComentariosProduto
    @cacheStore.Action("ActionCacheOrdersCart") setCacheOrdersCart
    @cacheStore.Getter("CacheOrderCart") getCacheOrdersCart

    @ModelSync("open", "closeDialog", { type: Boolean })
      readonly dialogOpen?:boolean
    @ModelSync("disableButton", "emitDisableButton", { type: String })
      statusDisable?:string

    loading = false
    data = {
      id: 0 || "",
      rating: 1,
      name: "",
      comment: ""
    }

    productCacheComment (): IproductData[] {
      const CACHE_RASTREIO_PRODUCT = sessionStorage.getItem("cache-coment")
      if (CACHE_RASTREIO_PRODUCT) return JSON.parse(CACHE_RASTREIO_PRODUCT)
      else return []
    }

    created (): void {
      sessionStorage.removeItem("cache-coment")
      const CACHE_ORDER_DATA = sessionStorage.getItem("api-fake")
      if (CACHE_ORDER_DATA) this.data.name = JSON.parse(CACHE_ORDER_DATA).nome
    }

    sendRatingAndCommentClient (id:string|number): void {
      this.loading = true
      this.data.id = String(id)

      const LIST_REMOVED = this.productCacheComment().filter(item => String(item.id) !== String(id))
      const CACHE_IDS_COMMENTED = localStorage.getItem("id-commented")

      this.commentProductCostumer(this.data)
        .then(responseMixin => {
          if (/error-api|product-not-found/i.test(String(responseMixin || ""))) throw Error("Caiu no catch")

          if (CACHE_IDS_COMMENTED) {
            localStorage.setItem("id-commented", JSON.stringify([
              ...JSON.parse(CACHE_IDS_COMMENTED),
              String(id)
            ]))
          } else  localStorage.setItem("id-commented", JSON.stringify([String(id)]))

          sessionStorage.setItem("cache-coment", JSON.stringify([...LIST_REMOVED]))
          this.data.rating = 1
          this.data.comment = ""
        }).catch(err => {
          window.log(`ERROR MIXIN sendRatingAndCommentClient`, err)
          this.loading = false
          this.$refs.dialogErrorComment.isActive = true
        }).finally(() => {
          if (this.productCacheComment().length === 0) this.statusDisable = "not-product"
          this.loading = false
        })
    }
  }
</script>
