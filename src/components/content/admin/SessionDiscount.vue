<template>
  <v-row
    no-gutters
    class="pa-4"
  >
    <v-col
      cols="12"
    >
      <h2
        class="text-uppercase font-weight-bold"
      >
        Descontos
      </h2>
    </v-col>

    <v-col
      cols="12"
      class="py-2"
    />

    <v-col
      cols="12"
      style="width:100%;max-width: 1100px; max-height: 400px;overflow-y: scroll;"
      class="pa-2"
    >
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th
                class="text-left text-uppercase"
              >
                Nome
              </th>
              <th
                class="text-left text-uppercase"
              >
                Status
              </th>
              <th
                class="text-right"
              />
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in listDiscount"
              :key="`tr-user-${item.name}`"
            >
              <td>
                {{ item.name }}
              </td>
              <td>
                <v-switch 
                  v-model="item.active"
                  color="success"
                  @change="updateStatusDiscount"
                />
              </td>
              <td
                class="text-end"
              >
                <v-btn
                  icon
                  color="error"
                >
                  <v-icon>
                    delete
                  </v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-col>

    <v-col
      cols="12"
      class="py-2"
    />

    <v-col
      cols="12"
      style="max-width: 400px;"
      class="pa-4"
    >
      <v-row
        no-gutters
        align="end"
        justify="space-between"
      >
        <v-col
          cols="12"
        >
          <h2
            class="text-uppercase font-weight-bold"
          >
            Gerar cupom
          </h2>
        </v-col> 

        <v-col
          cols="12"
          class="py-1"
        />

        <v-col
          cols="5"
        >
          <v-autocomplete
            :items="numberDiscount()"
            label="Porcentagem"
            placeholder="Escolha de 1 a 100 a porcentagem do desconto "
            hide-details
            @change="generateCoupon"
          />
        </v-col> 

        <v-col
          cols="5"
        >

          <span
            v-font-size="18"
            class="font-weight-bold"
          >
            {{ coupon.name }}
          </span>
        </v-col>

        <v-col
          cols="12"
          class="py-1"
        />

        <v-col
          cols="12"
        >
          <v-switch 
            v-model="coupon.status"
            :label="coupon.status ? 'Desativar cupom' : 'Ativar cupom'"
            color="success"
            hide-details
          />
        </v-col> 

        <v-col
          cols="12"
          class="py-3"
        />

        <v-col
          cols="12"
        >
          <v-btn
            color="secondary"
            depressed
            block
            disabled
          >
            <span
              class="font-weight-bold primary--text"
            >
              Gerar - (esperando api)
            </span>
          </v-btn>
        </v-col> 
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
  import { Component } from "vue-property-decorator"
  import { mixins } from "vue-class-component"
  import { $refs } from "@/implements/types"

  @Component({})
  export default class ContentAdminSessionDiscount extends mixins(

  ) implements $refs {
    $refs

    coupon = {
      name: "",
      status: false
    }

    listDiscount = [
      { name: 'BANGALO10', active: true }, 
      { name: 'BANGALO40', active: false }
    ]

    updateStatusDiscount (e): void {
      console.log("chage", e)
    }

    numberDiscount (): number[] {
      const DISCOUNTS: number[] = []

      for(let discount = 1; discount <= 100; discount++) {
        DISCOUNTS.push(Number(discount))
      }

      return DISCOUNTS
    }

    generateCoupon (e): void {
      this.coupon.name = `BANGALO${e}`
    }
  }
</script>
