<template>
  <div>
    <v-speed-dial
      v-model="open"
      bottom
      right
      fixed
      :direction="$vuetify.breakpoint.smAndDown ? 'top' : 'left'"
      transition="slide-y-reverse-transition"
    >
      <template v-slot:activator>
        <v-btn
          v-model="open"
          color="secondary"
          fab
          depressed
        >
          <v-icon
            v-if="open"
          >
            close
          </v-icon>
          <v-icon
            v-else
          >
            add
          </v-icon>
        </v-btn>
      </template>

      <v-btn
        dark
        :fab="$vuetify.breakpoint.smAndDown"
        color="success"
        title="Botão para cadastrar funcionário"
      >
        <v-icon>
          person_add
        </v-icon>

        <span
          class="ml-2 hidden-sm-and-down"
        >
          Registrar Funcionário
        </span>
      </v-btn>

      <v-btn
        dark
        :fab="$vuetify.breakpoint.smAndDown"
        color="success"
        title="Botão para cadastrar produto"
      >
        <v-icon>
          library_books
        </v-icon>

        <span
          class="ml-2 hidden-sm-and-down"
        >
          Registrar produto novo
        </span>
      </v-btn>
    </v-speed-dial>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator"

  @Component({})
  export default class ButtonAdd extends Vue {
    buttonModel = false
    get open (): boolean {
      return this.buttonModel
    }

    set open (value:boolean) {
      console.log("btn", value)
      this.buttonModel = value
    }
  }
</script>
