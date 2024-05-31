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
              :key="`tr-user-${item.id}`"
            >
              <td>
                {{ item.name }}
              </td>
              <td>
                <v-switch 
                  v-model="item.status"
                  :label="item.status ? 'Ativado' : 'Desativado'"
                  color="success"
                  @change="updateStatusDiscount(item)"
                />
              </td>
              <td
                class="text-end"
              >
                <v-btn
                  icon
                  color="error"
                  @click.stop="deleteVoucherSelected(String(item.id))"
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
      class="py-4"
    />

    <v-col
      cols="12"
      style="max-width: 400px"
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
          md="7"
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
          class="text-end"
        >

          <span
            v-font-size="$vuetify.breakpoint.smAndDown ? 14 : 18"
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
            :disabled="coupon.name === ''"
            @click.stop="createdCouponDiscount"
          >
            <span
              class="font-weight-bold primary--text"
            >
              Gerar
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
  import { IVouchers } from "@/types/type-voucher"
  import { $refs } from "@/implements/types"
  import { namespace } from "vuex-class"
  import MixinVouchersDiscount from "@/mixins/additional-system/mixinVouchersDiscount"

  const dialogStore = namespace("dialogStoreModule")

  @Component({})
  export default class ContentAdminSessionDiscount extends mixins(
    MixinVouchersDiscount,
  ) implements $refs {
    @dialogStore.Action("ActionDialogTryAgain") setDialogTryAgain
    @dialogStore.Getter("DialogTryAgain") getDialogTryAgain

    $refs

    listDiscount: IVouchers[] = []
    coupon = {
      name: "",
      status: false
    }

    created (): void {
      this.getVouchers()
    }

    getVouchers (): void {
      this.getAllVouchers()
        .then(responseMixin => {
          if (/error/i.test(String(responseMixin || ""))) {
            this.setDialogTryAgain(!this.getDialogTryAgain())
            return
          } else if (/empty-vouchers/i.test(String(responseMixin || ""))) {
            this.listDiscount = []
            return
          } else {
            this.listDiscount = [ ...responseMixin as IVouchers[] ]
          }
        })
    }

    updateStatusDiscount (e): void {
      this.updateVoucher(e)
        .then(responseMixin => {
          if (/error/i.test(String(responseMixin || ""))) {
            this.setDialogTryAgain(!this.getDialogTryAgain())
            return
          }

          this.getVouchers()
        })
    }

    deleteVoucherSelected (id:string) {
      this.deleteVoucher(id)
        .then(responseMixin => {
          if (/error/i.test(String(responseMixin || ""))) {
            this.setDialogTryAgain(!this.getDialogTryAgain())
            return
          }

          this.getVouchers()
        })
    }

    numberDiscount (): number[] {
      const DISCOUNTS: number[] = []

      for(let discount = 1; discount <= 100; discount++) {
        DISCOUNTS.push(Number(discount))
      }

      return DISCOUNTS
    }

    generateCoupon (e:number): void {
      this.coupon.name = `BANGALO${e}`
    }

    createdCouponDiscount (): void {
      this.createVoucher(this.coupon)
        .then(responseMixin => {
          if (/error/i.test(String(responseMixin || ""))) {
            this.setDialogTryAgain(!this.getDialogTryAgain())
            return
          }

          this.coupon.status = false
          this.coupon.name = ""
          this.getVouchers()
        })
    }
  }
</script>
