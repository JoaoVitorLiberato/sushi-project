<template>
    <v-overlay
    :value="overlayMessageDeliveryDesatived"
    opacity="1"
  >
    <v-dialog
      v-model="overlayMessageDeliveryDesatived"
      hide-overlay
      max-width="400"
      persistent
    >
      <v-card
        color="primary"
        dark
        min-height="50"
      >
        <v-row
          no-gutters
          class="pa-4"
          style="border: 1px solid var(--v-secondary-base);"
        >
          <v-col
            cols="12"
            class="text-center"
          >
            <h2
              v-font-size="18"
              class="font-weight-medium text-uppercase"
            >
              Aviso importante
            </h2>
          </v-col>

          <v-col
            cols="12"
            class="py-2"
          />

          <v-col
            cols="12"
            style="line-height: 1;"
          >
            <span
              v-font-size="13"
              class="font-weight-regular d-block pb-2"
            >
              O serviço de delivery está indisponível temporariamente, para não haver possíveis transtornos,
              recomendamos que você clique no botão abaixo para realizar sua compra e busque seu pedido no estabelecimento.
            </span>

            <small>
              Atenciosamente, Equipe Bangalô.
            </small>
          </v-col>

          <v-col
            cols="12"
            class="py-3"
          />

          <v-col
            cols="12"
            style="line-height: 1;"
          >
            <v-btn
              color="secondary"
              large
              block
              @click="handleChangeSegment"
            >
              <span
                v-if="$vuetify.breakpoint.width < 375"
                class="font-weight-bold primary--text"
              >
                Estabelecimento
              </span>

              <span
                v-else
                class="font-weight-bold primary--text"
              >
                Foodpark (Estabelecimento)
              </span>
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </v-overlay>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator"
  import { namespace } from "vuex-class"

  const cacheStore = namespace("cacheStoreModule")

  @Component({})
  export default class OverlayMessageDeliveryDesatived extends Vue {
    @cacheStore.Getter("CacheOverlayMessageDeliveryDesatived") getCacheOverlayMessageDeliveryDesatived
    @cacheStore.Action("ActionCacheOverlayMessageDeliveryDesatived") setCacheOverlayMessageDeliveryDesatived
    @cacheStore.Getter("CacheOverlayMessageSegmentFoodpark") getCacheOverlayMessageSegmentFoodpark
    @cacheStore.Action("ActionCacheOverlayMessageSegmentFoodpark") setCacheOverlayMessageSegmentFoodpark

    get overlayMessageSegmetentFoodpark ():boolean {
      return this.getCacheOverlayMessageSegmentFoodpark()
    }

    set overlayMessageSegmetentFoodpark (value) {
      this.setCacheOverlayMessageSegmentFoodpark(value)
    }

    get overlayMessageDeliveryDesatived ():boolean {
      return this.getCacheOverlayMessageDeliveryDesatived()
    }

    set overlayMessageDeliveryDesatived (value) {
      this.setCacheOverlayMessageDeliveryDesatived(value)
    }

    handleChangeSegment (): void {
      this.overlayMessageSegmetentFoodpark = false
      this.$router.push({ name: "product", params: { type: "foodpark" } })
    }
  }
</script>
