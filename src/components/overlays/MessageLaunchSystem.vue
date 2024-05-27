<template>
    <v-overlay
    :value="overlayMessageLaunchStore"
    opacity="1"
  >
    <v-dialog
      v-model="overlayMessageLaunchStore"
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
              v-font-size="16"
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
              class="font-weight-regular"
            >
              O lançamento do Bangalô Sushi Lounge está previsto para o dia 07/06 às 17H.
              Então até o momento do lançamento, os serviços estarão inativos para os clientes.
            </span>
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
  export default class OverlayMessageLaunchSystem extends Vue {
    @cacheStore.Getter("CacheOverlayMessageLaunchStore") getCacheOverlayMessageLaunchStore
    @cacheStore.Action("ActionCacheOverlayMessageLaunchStore") setCacheOverlayMessageLaunchStore

    get overlayMessageLaunchStore ():boolean {
      return this.getCacheOverlayMessageLaunchStore()
    }

    set overlayMessageLaunchStore (value) {
      this.setCacheOverlayMessageLaunchStore(value)
    }
  }
</script>
