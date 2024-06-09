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
              @click="returnProductRoute('foodpark')"
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
  import { Component } from "vue-property-decorator"
  import { mixins } from "vue-class-component"
  import { namespace } from "vuex-class"
  import MixinRedirectLinks from "@/mixins/redirectLinks/MxiinRedirectLinks"

  const cacheStore = namespace("cacheStoreModule")

  @Component({})
  export default class OverlayMessageDeliveryDesatived extends mixins(
    MixinRedirectLinks,
  ) {
    @cacheStore.Getter("CacheOverlayMessageDeliveryDesatived") getCacheOverlayMessageDeliveryDesatived
    @cacheStore.Action("ActionCacheOverlayMessageDeliveryDesatived") setCacheOverlayMessageDeliveryDesatived

    get overlayMessageDeliveryDesatived ():boolean {
      return this.getCacheOverlayMessageDeliveryDesatived()
    }

    set overlayMessageDeliveryDesatived (value) {
      this.setCacheOverlayMessageDeliveryDesatived(value)
    }
  }
</script>
