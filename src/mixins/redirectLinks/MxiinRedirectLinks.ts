import { Component, Vue } from "vue-property-decorator"

@Component({})

export default class MixinRedirectLinks extends Vue {
  redirectToRouteDelevery (): void {
    location.replace(`/produto/delivery/vamoscomecar`)
  }

  toGoRouteFoodPark (): void {
    location.replace("/produto/foodpark/vamoscomecar")
  }
}
