import { Component, Vue } from "vue-property-decorator"

@Component({})

export default class MixinRedirectLinks extends Vue {
  redirectToRouteDelevery (): void {
    location.replace(`/produto/delivery/vamoscomecar`)
  }

  toGoRouteFoodPark (): void {
    location.replace("/produto/foodpark/vamoscomecar")
  }

  returnProductRoute (): void {
    location.replace(`/produto/${this.$route.query.location ? this.$route.query.location : this.$route.params.type}/vamoscomecar${location.search}`)
  }
}
