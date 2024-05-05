<template>
  <v-card
    elevation="0"
    class="pa-2 my-2 grey lighten-4"
    style="border-radius: 15px;"
  >          
    <v-row
      no-gutters
    >
      <v-col
        cols="4"
      >
        <h3
          v-font-size="18"
          class="font-weight-medium"
        >
          {{ name }}
        </h3>
      </v-col>

      <v-col
        cols="8"
        class="text-end"
      >
        <span
          v-font-size="18"
          class="font-weight-medium"
          v-text="priceCalculed ? `R$ ${Number(priceCalculed) < 100 ? '0' : '' }${formatedPrice(Number(priceCalculed), '.')}` : `R$ ${Number(priceCalculed) > 0 && Number(priceCalculed) < 100 ? '0' : '' }${formatedPrice(Number(priceCalculed), '.')}`"
        />
      </v-col>

      <v-col
        cols="12"
      >
        <span
          v-font-size="14"
          class="font-weight-regular"
        >
          {{ description }}
        </span>
      </v-col>

      
      <v-col
        cols="12"
        class="py-2"
      />

      <v-col
        cols="12"
      >
        <v-row
          no-gutters
          align="center"
          justify="space-between"
        >
          <v-col
            cols="5"
            class="d-flex align-center"
          >
            <v-btn
              color="secondary"
              text
              dense
              depressed
              style="width: 30px;height:30px"
              :disabled="count <= 0"
              @click="count -= 1, calculingPriceWithComplements(price)"
            >
              <v-icon>
                remove
              </v-icon>
            </v-btn>
            <span
              v-font-size="20"
              class="font-weight-bold"
            >
              {{ count }}
            </span>
            <v-btn
              color="secondary"
              text
              dense
              depressed
              style="width: 30px;height:30px"
              @click="count += 1, calculingPriceWithComplements(price)"
            >
              <v-icon>
                add
              </v-icon>
            </v-btn>
          </v-col>

          <v-col
            cols="5"
            class="text-end"
          >
            <v-btn
              block
              depressed
              color="secondary primary--text"
              :disabled="count === 0"
              @click="AddToResumeComplements(objComplement)"
            >
              <span
                v-font-size="$vuetify.breakpoint.smAndDown ? 11 : 13"
                class="font-weight-bold"
              >
                Adicionar
              </span>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
  import { Component, Vue, Prop, ModelSync, Watch } from "vue-property-decorator"
  import { formatedPrice } from "@/helpers/formatedPrice"
  import { IComplements } from "@/types/types-product"
  import { namespace } from "vuex-class"

  const dialogStore = namespace("dialogStoreModule")

  @Component({})
  export default class CardComplement extends Vue {
    @Prop({ default: "" }) id?: string|number
    @Prop({ default: "" }) name?: string
    @Prop({ default: "" }) description?: string
    @Prop({ default: 0 }) price?: number
    @ModelSync("dataComplement", "dataComplementEmit")
      objComplement?: IComplements

    @dialogStore.Action("ActionDialogComplements") setDialogComplements
    @dialogStore.Getter("DialogComplements") getDialogComplements

    formatedPrice = formatedPrice

    count = 0
    priceCalculed = 0

    get dialogComplements (): boolean {
      return this.getDialogComplements()
    }

    set dialogComplements (value:boolean) {
      this.setDialogComplements(value)
    }

    @Watch("dialogComplements")
      clearCacheData (): void {
        this.count = 0
        this.objComplement = {} as IComplements
      }

    calculingPriceWithComplements (price?:number): void {
      if (Number(price) <= 1) this.priceCalculed = 0
      else this.priceCalculed = Number(price) * Number(this.count)
    }

    AddToResumeComplements (data: IComplements): void {
      const DATA_COMPLEMENT = new Set()

      DATA_COMPLEMENT.add({
        ...data,
        id: `${String(data.name).replace(/\s/g, "").toLowerCase()}-${data.id}`,
        qtd: this.count,
        priceTotal: this.priceCalculed,
      })

      this.objComplement = Object.assign({}, ...DATA_COMPLEMENT)
    }
  }
</script>