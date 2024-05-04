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
        {{ title }}
      </span>
    </v-col>

    <v-col
      cols="12"
      style="line-height:12px"
      class="py-1"
    >
      <span
        v-font-size="12"
        class="font-weight-light warning--text"
      >
        Essa opção é valida apenas para clientes que estão no estabelecimento.
      </span>
    </v-col>

    <v-col
      cols="12"
    >
      <v-autocomplete
        :items="allTables"
        v-model="tableSelected"
        color="#fff"
        class="text-uppercase"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts">
  import { Component, Vue, Watch, ModelSync, Prop } from "vue-property-decorator"
  import FOOD_PARK_TABLES from "@/data/foodParkTables/foodParkTable.json"

  @Component({})
  export default class InputTableSelected extends Vue {
    @Prop({ default: "" }) title?: string
    @ModelSync("tableSelecetModel", "TableSelectedModelEmit", { type: String })
      valueTableSelected?: string

    get allTables (): typeof FOOD_PARK_TABLES {
      return FOOD_PARK_TABLES
    }

    tableSelected = ""
    @Watch("tableSelected")
      emitValueTableSelected (): void {
        this.valueTableSelected = this.tableSelected
      }
  }
</script>
