import { Component, Vue } from "vue-property-decorator"
import { namespace } from "vuex-class"

  const dialogStore = namespace("payloadStoreModule")
  const cacheStore = namespace("cacheStoreModule")

@Component({})

export default class MixinCacheProduct extends Vue {
  @dialogStore.Getter("DialogOrdersClient") getDialogOrdersClient
  @dialogStore.Action("ActionDialogOrdersClient") setDialogOrdersClient
  @cacheStore.Getter("CacheOrderCart") getCacheOrderCart

  verifyCache (): void {
    const CACHE_ORDER = sessionStorage.getItem("order")
    if (/^(foodpark|delivery)$/i.test(String(this.$route.query.location || this.$route.params.type))) {
        if (this.getCacheOrderCart().length <= 0 && CACHE_ORDER && JSON.parse(CACHE_ORDER).length > 0) {
          this.setDialogOrdersClient(!this.getDialogOrdersClient())
        } else if (!CACHE_ORDER) {
          location.replace(`/produto/${this.$route.query.location}/vamoscomecar`)
        }
      } else {
        location.replace("/")
      }
  }
}