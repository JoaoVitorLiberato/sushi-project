<template>
  <v-dialog
    v-model="dialogGetCommentsProduct"
    fullscreen
    hide-overlay
  >
    <v-card
      color="primary"
      style="overflow-y: scroll;"
    >
      <v-row
        no-gutters
      >
        <v-col
          v-position.fixed
          cols="12"
          style="top: 0;left:0;right:0;"
        >
          <v-toolbar
            dark
            color="secondary"
          >
            <v-toolbar-title
              class="text-uppercase primary--text font-weight-bold"
            >
              Comentários
            </v-toolbar-title>

            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn
                text
                color="primary"
                @click="dialogGetCommentsProduct = !dialogGetCommentsProduct"
              >
                <v-icon>
                  close
                </v-icon>
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
        </v-col>

        <v-col
          cols="12"
          class="py-7"
        />

        <v-col
          v-if="/error/i.test(String(renderCommentsProduct()))"
          cols="12"
          class="pa-4 text-center"
        >
          <span
            class="grey--text font-italic d-block"
          >
            Houve algum erro ao carregar os comentários, por favor, tente novamente mais tarde.
          </span>

          <span 
            style='font-size:100px;'>
            &#128532;
          </span>
        </v-col>

        <v-col
          v-else-if="renderCommentsProduct().length <= 0"
          cols="12"
          class="pa-4 text-center"
        >
          <span
            class="grey--text font-italic d-block"
          >
            Este produto não possui comentários.
          </span>
        </v-col>

        <v-col
          v-else
          cols="12"
          class="pa-4"
        >
          <div
            v-for="comment in renderCommentsProduct()"
            :key="`card-comment-${String(comment.Id)}`"
            class="my-2"
          >
            <v-row
              no-gutters
            >
              <v-col
                cols="12"
                style="line-height: 1;"
              >
                <span
                  class="font-weight-medium text-uppercase d-block"
                  style="color: var(--v-primary-text);"
                >
                  {{ comment.Name }}
                </span>

                <div
                  class="d-flex align-center"
                >
                  <v-rating
                    :value="comment.Rating"
                    color="secondary"
                    dense
                    half-increments
                    readonly
                    size="14"
                  />
                  <span
                    v-font-size="11"
                    class="font-weight-thin grey--text font-italic ml-2"
                  >
                    {{ comment.CreatedAt }}
                  </span>
                </div>

              </v-col>

              <v-col
                cols="12"
                class="py-2"
              />

              <v-col
                cols="12"
                style="line-height: 1;"
              >
                <p
                  v-font-size="14"
                  class="font-weight-regular font-italic"
                  style="color: var(--v-primary-text);"
                >
                  {{ comment.Comment }}
                </p>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator"
  import { namespace } from "vuex-class"
  import { ICommentProduct } from "@/types/types-product"

  const dialogStore = namespace("dialogStoreModule")
  const cacheStore = namespace("cacheStoreModule")
  
  @Component({})
  export default class dialogGetCommentsProduct extends Vue {
    @dialogStore.Action("ActionDialogGetCommentsProduct") setDialogGetCommentsProduct
    @dialogStore.Getter("DialogGetCommentsProduct") getDialogGetCommentsProduct
    @cacheStore.Getter("CacheCommentsProduct") getCacheCommentsProduct
    @cacheStore.Getter("CacheCommentsIDPorductSelected") getCacheCommentsIDPorductSelected

    get dialogGetCommentsProduct (): boolean {
      return this.getDialogGetCommentsProduct()
    }

    set dialogGetCommentsProduct (value) {
      this.setDialogGetCommentsProduct(value)
    }

    renderCommentsProduct (): ICommentProduct[]|string {
      if (/error/i.test(this.getCacheCommentsProduct())) return this.getCacheCommentsProduct()
      else if (this.getCacheCommentsProduct().length <= 0) return "vazio"

      return this.getCacheCommentsProduct().filter(comment => {
        if ((comment.ProductID).includes(this.getCacheCommentsIDPorductSelected())) {
          return comment as ICommentProduct[]
        }
      })
    }
  }
</script>