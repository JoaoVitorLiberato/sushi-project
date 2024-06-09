<template>
  <div>
    <v-btn
      color="success white--text"
      fab
      right
      bottom
      fixed
      href="https://wa.link/lu54ui"
      target="_blank"
      title="Entre em contato através do WhatsApp com o Bangalô Sushi Lounge"
      height="60"
      width="60"
      :style="/product/i.test(String($route.name)) ? 'bottom: 90px !important;' : ''"
      @click="dataLayer({'event': 'botao_whatsapp_global'})"
    >
      <v-img
        src="/img/project/rede-sociais/whatsapp.png"
        alt="Entre em contato através do WhatsApp com o Bangalô Sushi Lounge"
        title="Entre em contato através do WhatsApp com o Bangalô Sushi Lounge"
        contain
        height="60"
        width="60"
      />
    </v-btn>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator"
  import { dataLayer } from "@/helpers/dataLayer"

  @Component({})
  export default class ButtonCartProduct extends Vue {
    dataLayer = dataLayer
  }
</script>
