<template>
    <v-overlay
    :value="overlayMessageSegmetentFoodpark"
    opacity="1"
  >
    <v-dialog
      v-model="overlayMessageSegmetentFoodpark"
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
          v-if="messageDisableSegment"
          no-gutters
          class="pa-4"
          style="border: 1px solid var(--v-secondary-base);"
        >
          <v-col
            cols="12"
          >
            <h2
              v-font-size="18"
              class="font-weight-medium text-uppercase"
            >
              Prezado cliente,
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
              v-font-size="14"
              class="font-weight-regular d-block"
            >
              Atualmente o segmento foodpark está desabilitado.
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
              @click="$router.replace({ name: 'home' })"
            >
              <span
                class="font-weight-bold primary--text"
              >
                Voltar
              </span>
            </v-btn>
          </v-col>
        </v-row>

        <v-row
          v-else
          no-gutters
          class="pa-4"
          style="border: 1px solid var(--v-secondary-base);"
        >
          <v-col
            cols="12"
          >
            <h2
              v-font-size="18"
              class="font-weight-medium text-uppercase"
            >
              Prezado cliente,
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
              Você está no segmento Foodpark, Onde a retirada do produto está destinada apenas no estabelecimento.
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
              @click="overlayMessageSegmetentFoodpark = !overlayMessageSegmetentFoodpark"
            >
              <span
                class="font-weight-bold primary--text"
              >
                Estou ciente
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
  export default class OverlayMessageSegmentFoodpark extends Vue {
    @cacheStore.Getter("CacheOverlayMessageSegmentFoodpark") getCacheOverlayMessageSegmentFoodpark
    @cacheStore.Action("ActionCacheOverlayMessageSegmentFoodpark") setCacheOverlayMessageSegmentFoodpark

    messageDisableSegment = false

    get overlayMessageSegmetentFoodpark ():boolean {
      return this.getCacheOverlayMessageSegmentFoodpark()
    }

    set overlayMessageSegmetentFoodpark (value) {
      this.setCacheOverlayMessageSegmentFoodpark(value)
    }

    created ():void {
      const CACHE_DISABLE_SEGMENT = localStorage.getItem("disable-segment")
      if (CACHE_DISABLE_SEGMENT && /foodpark/i.test(String(CACHE_DISABLE_SEGMENT || ""))) {
        sessionStorage.removeItem("order")
        this.messageDisableSegment = true
      }
    }
  }
</script>
