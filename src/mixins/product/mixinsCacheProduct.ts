import { Component, Vue } from "vue-property-decorator"
import { namespace } from "vuex-class"

  const dialogStore = namespace("dialogStoreModule")
  const cacheStore = namespace("cacheStoreModule")

@Component({})

export default class MixinCacheProduct extends Vue {
  @dialogStore.Getter("DialogOrdersClient") getDialogOrdersClient
  @dialogStore.Action("ActionDialogOrdersClient") setDialogOrdersClient
  @cacheStore.Getter("CacheOrderCart") getCacheOrderCart

  verifyCache (): void {
    const CACHE_ORDER = sessionStorage.getItem("order")
    if (CACHE_ORDER) {
      if (this.getCacheOrderCart().length <= 0 && JSON.parse(CACHE_ORDER).length > 0) {
        this.setDialogOrdersClient(!this.getDialogOrdersClient())
      } else if (/^(form-view)$/i.test(String(this.$route.name || "")) && !CACHE_ORDER) {
        location.replace(`/produto/${this.$route.params.type}/vamoscomecar`)
      }
    }
  }
}
