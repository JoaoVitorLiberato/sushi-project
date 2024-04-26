<template>
  <div>
    estabeceimento
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7971.7579995287015!2d-45.77757465!3d-2.5462876999999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x92b3907a2690c73d%3A0x2b53d0b87609ad91!2sSanta%20Luzia%20do%20Paru%C3%A1%2C%20MA%2C%2065272-000!5e0!3m2!1spt-BR!2sbr!4v1714162795861!5m2!1spt-BR!2sbr"
      :width="$vuetify.breakpoint.smAndDown ? '100%' : 500"
      height="300"
      style="border:0;border-radius: 0 15px 15px 0"
      allowfullscreen=""
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
    />
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator"

  @Component({})
  export default class viewEstabelishLocation extends Vue {}
</script>
