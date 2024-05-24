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
    >
      <v-img
        src="/img/project/rede-sociais/whatsapp.png"
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

  @Component({})
  export default class ButtonCartProduct extends Vue {}
</script>
