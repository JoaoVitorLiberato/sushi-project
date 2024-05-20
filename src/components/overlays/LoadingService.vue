<template>
  <v-overlay
    :value="cacheLoading.status"
    opacity="1"
  >
    <v-card
      class="mx-auto text-center"
      color="transparent"
      dark
      elevation="0"
    >
      <v-progress-circular 
        color="secondary"
        size="120"
        indeterminate
      />

      <span
        class="white--text d-block my-3 font-weight-regular"
      >
        {{ cacheLoading.msg }}
      </span>
    </v-card>
  </v-overlay>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator"
  import { namespace } from "vuex-class"

  const cacheStore = namespace("cacheStoreModule")

  @Component({})
  export default class LoadingService extends Vue {
    @cacheStore.Getter("CacheLoading") getCacheLoading

    get cacheLoading (): {
      status: boolean,
      msg: string
    }  {
      return this.getCacheLoading()
    }
  }
</script>
