<template>
  <v-card
    class="mx-auto"
    max-width="344"
    height="202"
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div 
          class="text-overline mb-3"
          style="font-size: 9px !important;"
        >
          {{ name }}
        </div>

        <v-list-item-subtitle
          style="font-size: 12px !important;"
        >
          {{ description }}
        </v-list-item-subtitle>

        <p
          v-if="differences"
          v-font-size="11"
          class="font-weight-regular mt-3"
        >
          <Strong>Obs:</Strong> {{ showDiference(differences) }}
        </p>
      </v-list-item-content>

      <v-list-item-avatar
        tile
        size="80"
        color="grey"
      >
        <v-img 
          :src="image"
          :alt="`imagem de ${name}`"
        />
      </v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <v-row
        no-gutters
        align="center"
        justify="space-between"
      >
        <v-col
          cols="6"
        >
          <span>
            {{ formatedPrice(Number(price)) }}
          </span>
        </v-col>

        <v-col
          cols="6"
          class="text-end"
        >
          <v-btn
            text
            color="secondary"
            plain
            @click.stop="$emit('updateEmit')"
          >
            <v-icon>
              edit
            </v-icon>
          </v-btn>

          <v-btn
            text
            plain
            color="error"
            @click.stop="$emit('deleteEmit')"
          >
            <v-icon>
              delete
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
  import { Component, Vue, Prop, Emit } from "vue-property-decorator"
  import { IDifferences } from "@/types/types-product"
  import { formatedPrice } from "@/helpers/formatedPrice"

  @Component({})
  export default class CardProductAdmin extends Vue {
    @Emit()
      updateEmit () {}
    @Emit()
      deleteEmit () {}
    @Prop({ default: "" }) name?: string
    @Prop({ default: "" }) description?: string
    @Prop({ default: 0 }) price?: number
    @Prop({ default: "" }) image?:string
    @Prop({ default: {} }) differences?: IDifferences

    formatedPrice = formatedPrice

    showDiference (differences: IDifferences): string {
      let value = ""
      const PERMISSIONS: Array<string> = []

      Object.keys(differences).forEach(item => {
        switch (true) {
          case differences[item].readonly === true:
            PERMISSIONS.push("readonly")
            PERMISSIONS.push(item)
            break
          case /actived/i.test(String(differences[item].input || "")):
            PERMISSIONS.push("input")
            PERMISSIONS.push(item)
            break
          default:
            PERMISSIONS.push("natural")
            PERMISSIONS.push(item)
            break
        }
      })

      if (PERMISSIONS[0].includes("readonly") && PERMISSIONS[1].includes("especial")) {
        value = `Especial travado e não pode mudar para natural.`
      }
      if (PERMISSIONS[2].includes("readonly") && PERMISSIONS[3].includes("breaded")) {
        value = `Empanado travado e não pode mudar para natural.`
      }
      if (PERMISSIONS[3].includes("readonly") && PERMISSIONS[5].includes("flambed")) {
        value = `Flambado travado e não pode mudar para natural.`
      }
      if (PERMISSIONS[0].includes("input") && PERMISSIONS[1].includes("especial")) {
        value = `input escolha empanado liberado para usuário escolher.`
      }
      if (PERMISSIONS[2].includes("input") && PERMISSIONS[3].includes("breaded")) {
        value = `input escolha especial liberado para usuário escolher.`
      }
      if (PERMISSIONS[4].includes("input") && PERMISSIONS[5].includes("flambed")) {
        value = `input escolha famblado liberado para usuário escolher.`
      }
      if (PERMISSIONS[0].includes("natural") && PERMISSIONS[2].includes("natural") && PERMISSIONS[4].includes("natural")) {
        value = "Produto somente natural."
      }

      return value
    }
  }
</script>