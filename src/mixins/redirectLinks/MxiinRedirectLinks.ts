import { Component, Vue } from "vue-property-decorator"

@Component({})

export default class MixinRedirectLinks extends Vue {
  redirectToRouteDelevery (): void {
    location.replace(`/pedido/delivery/vamoscomecar`)
  }
}