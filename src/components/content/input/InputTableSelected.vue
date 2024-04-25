<template>
  <v-row
    no-gutters
  >
    <v-col
      cols="12"
    >
      <span
        class="font-weight-medium"
      >
        Por favor, Selecione a mesa:
      </span>
    </v-col>

    <v-col
      cols="12"
    >
      <v-autocomplete
        :items="allTables"
        v-model="tableSelected"
        label="Mesa"
        color="#fff"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts">
  import { Component, Vue, Watch, ModelSync } from "vue-property-decorator"

  @Component({})
  export default class InputTableSelected extends Vue {
    @ModelSync("tableSelecetModel", "TableSelectedModelEmit", { type: String })
      valueTableSelected?: string

    get allTables (): Array<string> {
      return [
        "01",
        "02",
        "03",
        "04",
        "05"
      ]
    }

    tableSelected = ""
    @Watch("tableSelected")
      emitValueTableSelected (): void {
        this.valueTableSelected = this.tableSelected
      }
  }
</script>