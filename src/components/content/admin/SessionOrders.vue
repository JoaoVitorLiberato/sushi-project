<template>
  <v-row
    no-gutters
  >
    <v-col
      cols="12"
    >
      <v-row
        no-gutters
      >
        <v-col
          cols="12"
        >
          <v-row
            no-gutters
            justify="center"
            justify-md="space-between"
            align="center"
          >
            <v-col
              cols="12"
              md="4"
            >
              <h2
                class="text-uppercase"
              >
                Pedidos em preparação
              </h2>
            </v-col>

            <v-col
              cols="12"
              class="hidden-md-and-up py-2"
            />

            <v-col
              cols="12"
              md="4"
            >
              <v-text-field 
                label="Pesquisar"
                outlined
                rounded
                placeholder="Pesquise pelo número do pedido ou nome"
                dense
                hide-details
                @input="filterOrderClient"
              />
            </v-col>
          </v-row>
        </v-col>

        <v-col
          cols="12"
          class="py-3"
        />

        <v-col
          cols="12"
        >
          <v-row
            v-if="orderFiltered.length > 0"
            no-gutters
          >
            <v-col
              cols="12"
              class="hidden-md-and-up"
            >
              <v-slide-group
                show-arrows
                prev-icon="arrow_back"
                next-icon="arrow_forward"
                :class="`d-flex fix--v-slide-group flex-wrap`"
                center-active
                mandatory
              >
                <v-slide-item
                  v-for="{ pedido, segmento, nome, status, telefone, produtos } in orderFiltered"
                  :key="`caroucel-order-client-${pedido}`"
                  class="mr-5"
                >
                  <div
                    style="width: 300px;"
                  >
                    <card-order-admin-component
                      :segment="segmento"
                      :order="pedido"
                      :name="nome"
                      :phone="telefone"
                      :statusOrder="status"
                      @dialogProductEmit="openDialogProducts(produtos)"
                    />
                  </div>
                </v-slide-item>
              </v-slide-group>
            </v-col>

            <v-col
              v-for="{ pedido, segmento, nome, status, telefone, produtos } in orderFiltered"
              :key="`order-client-${pedido}`"
              cols="12"
              md="3"
              class="hidden-sm-and-down"
            >
              <card-order-admin-component
                :segment="segmento"
                :order="pedido"
                :name="nome"
                :phone="telefone"
                :statusOrder="status"
                @dialogProductEmit="openDialogProducts(produtos)"
              />
            </v-col>
          </v-row>

          <v-row
            v-else
            no-gutters
          >
            <v-col
              cols="12"
              class="hidden-md-and-up"
            >
              <v-slide-group
                show-arrows
                prev-icon="arrow_back"
                next-icon="arrow_forward"
                :class="`d-flex fix--v-slide-group flex-wrap`"
                center-active
                mandatory
              >
                <v-slide-item
                  v-for="{ pedido, segmento, nome, status, telefone, produtos } in ordersFake"
                  :key="`caroucel-order-client-${pedido}`"
                  class="mr-5"
                >
                  <div
                    style="width: 300px;"
                  >
                    <card-order-admin-component
                      :segment="segmento"
                      :order="pedido"
                      :name="nome"
                      :phone="telefone"
                      :statusOrder="status"
                      @dialogProductEmit="openDialogProducts(produtos)"
                    />
                  </div>
                </v-slide-item>
              </v-slide-group>
            </v-col>

            <v-col
              v-for="{ pedido, segmento, nome, status, telefone, produtos } in ordersFake"
              :key="`order-client-${pedido}`"
              cols="12"
              md="3"
              class="hidden-sm-and-down"
            >
              <card-order-admin-component
                :segment="segmento"
                :order="pedido"
                :name="nome"
                :phone="telefone"
                :statusOrder="status"
                @dialogProductEmit="openDialogProducts(produtos)"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-col>

    <v-col
      cols="12"
    >
      <v-dialog
        ref="dialogOrderProduct"
        width="600"
      >
        <v-card
          class="pa-4"
        >
          <v-row
            no-gutters
          >
            <v-col
              cols="12"
              class="text-end"
            >
              <v-btn
                text
                fab
                color="primary"
                width="40"
                height="40"
                @click="$refs.dialogOrderProduct.save()"
              >
                <v-icon>
                  close
                </v-icon>
              </v-btn>
            </v-col>

            <v-col
              cols="12"
              class="py-3"
            />

            <v-col
              v-for="item in productsDialog"
              :key="`card-product-${item.id}`"
              cols="12"
            >
              <v-card
                class="mx-auto my-2"
                max-width="400"
                outlined
              >
                <v-list-item
                  three-line
                >
                  <v-list-item-content>
                    <v-list-item-title
                      class="text-h6 mb-1 text-uppercase font-weight-medium"
                      style="font-size: 13px !important;"
                    >
                      {{ item.name }}
                    </v-list-item-title>
                    <v-list-item-subtitle
                      style="font-size: 12px !important;"
                    >
                      {{ item.description }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
      
                  <v-list-item-avatar
                    tile
                    size="80"
                    color="grey"
                  >
                    <v-img 
                      :src="item.url_image"
                    />
                  </v-list-item-avatar>
                </v-list-item>
      
                <v-card-actions>
                  <v-btn
                    block
                    text
                    color="primary"
                    class="d-flex justify-space-between align-center"
                    @click.stop="showComplements = !showComplements"
                  >
                    <span
                      v-font-size="14"
                      class="font-weight-bold"
                    >
                      ver complementos
                    </span>

                    <v-icon
                      size="26"
                    >
                      {{ showComplements ? 'keyboard_arrow_up'  : 'keyboard_arrow_down' }}
                    </v-icon>
                  </v-btn>
                </v-card-actions>

                <v-expand-transition>
                  <div 
                    v-show="showComplements"
                  >
                    <v-divider></v-divider>

                    <v-row
                      no-gutters
                      class="pa-4"
                    >
                      <v-col
                        v-for="complement in item.complements"
                        :key="`complement-${complement.id}`"
                        cols="12"
                        class="d-flex justify-space-between aling-center"
                      >
                        <span
                          v-font-size="12"
                          class="grey--text text-uppercase font-weight-regular"
                        >
                          {{ complement.name }}
                        </span>

                        <span
                          v-font-size="12"
                          class="grey--text text-uppercase font-weight-regular"
                        >
                          ({{ complement.qtd }})
                        </span>
                      </v-col>
                    </v-row>
                  </div>
                </v-expand-transition>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script lang="ts">
  import { Component } from "vue-property-decorator"
  import { mixins } from "vue-class-component"
  import { IOrderData } from "@/types/type-order"
  import { IproductData } from "@/types/types-product"
  import { $refs } from "@/implements/types"
  import "@/styles/components/caroucels.styl"

  @Component({
    components: {
      CardOrderAdminComponent: () => import(
        /* webpackChuckName: "card-order-admin-component" */
        /* webpackMode: "eager" */
        "@/components/cards/CardOrderAdmin.vue"
      )
    }
  })

  export default class ContentAdminSessionOrders extends mixins() implements $refs {
    $refs
    productsDialog: IproductData[]  = []
    showComplements = false

    orderFiltered = [] as IOrderData[]
    ordersPreparing = [] as IOrderData[]
    ordersDelivery = [] as IOrderData[]
    ordersConcluded = [] as IOrderData[]

    get ordersFake (): IOrderData[] {
      const ORDER_FAKE = sessionStorage.getItem("order-fake")

      if (ORDER_FAKE) {
        return [
          ...JSON.parse(ORDER_FAKE)
        ]
      }

      return []
    }

    mounted (): void {
      const ORDER_FAKE = sessionStorage.getItem("order-fake")
      if (ORDER_FAKE) {
        JSON.parse(ORDER_FAKE).filter(item => {
          if (item.status === "concluido") {
            this.ordersConcluded = [
              ...this.ordersConcluded,
              item,
            ]
          } else if (item.status === "entrega") {
            this.ordersDelivery = [
              ...this.ordersDelivery,
              item,
            ]
          } else if (item.status === "preparando") {
            this.ordersPreparing = [
              ...this.ordersPreparing,
              item,
            ]
          }
          
        })
      }
    }

    filterOrderClient (e?:string) {
      const PRODUCT_FILTER = this.ordersFake.filter(item => {
        if (String(item.pedido).includes(String(e))) return item
        else if (String(item.nome).toLowerCase().includes(String(e).toLowerCase())) return item
      })

      this.orderFiltered = [ ...PRODUCT_FILTER ]
    }

    openDialogProducts (product): void {
      this.productsDialog = [ ...product ]
      this.$refs.dialogOrderProduct.isActive = true
    }

    handle (): void {
      sessionStorage.setItem("order-fake", JSON.stringify(
        [
          {
            "nome": "teste 2",
            "telefone": "21967559557",
            "status": "preparando",
            "segmento": "delivery",
            "produtos": [
              {
                  "id": "09992622-b8c0-4fef-950b-5480a2e25d91",
                  "url_image": "https://res.cloudinary.com/dd8rt2j02/image/upload/v1716406891/o7yypls1p0rbmh45lncn.jpg",
                  "category": "entrada",
                  "name": "test comment",
                  "description": "testing product comments",
                  "price": {
                      "default": 2300,
                      "discount": {
                          "active": false,
                          "value": 0
                      },
                      "qtd_product": 6,
                      "total": 17800,
                      "total_price_complements": 4000
                  },
                  "differences": {
                      "especial": {
                          "readonly": true,
                          "input": "actived",
                          "active": true,
                          "additional": 0
                      },
                      "breaded": {
                          "readonly": false,
                          "input": "desatived",
                          "active": false,
                          "additional": 0
                      },
                      "flambed": {
                          "readonly": false,
                          "input": "desatived",
                          "active": false,
                          "additional": 0
                      }
                  },
                  "note_client": 4,
                  "apper_start": false,
                  "hero_product": false,
                  "complements": [
                      {
                          "id": "molhotarê-a6e48743-d0ff-4f25-9890-562dfcc10295",
                          "name": "Molho Tarê",
                          "description": "100 ml",
                          "price": 400,
                          "qtd": 4,
                          "priceTotal": 800
                      },
                      {
                          "id": "molhoshoyu-a492f4fb-0939-45e8-9f9b-55c1093fe430",
                          "name": "Molho Shoyu",
                          "description": "100 ml",
                          "price": 400,
                          "qtd": 6,
                          "priceTotal": 1600
                      },
                      {
                          "id": "geleiadepimenta-82deab80-19cb-4921-9487-ef39661b32fb",
                          "name": "Geleia de pimenta",
                          "description": "100 ml",
                          "price": 400,
                          "qtd": 6,
                          "priceTotal": 1600
                      }
                  ]
              },
              {
                  "id": "bd4467e4-f231-4697-84ad-a625e8fc7001",
                  "url_image": "https://cdn.filestackcontent.com/CPOOv8j7Rcq5gB4nKORI",
                  "category": "entrada",
                  "name": "teste update",
                  "description": "update da imagem",
                  "price": {
                      "default": 3000,
                      "discount": {
                          "active": false,
                          "value": 0
                      },
                      "qtd_product": 6,
                      "total": 37600,
                      "total_price_complements": 1600
                  },
                  "differences": {
                      "especial": {
                          "readonly": false,
                          "input": "actived",
                          "active": false,
                          "additional": 0
                      },
                      "breaded": {
                          "readonly": false,
                          "input": "actived",
                          "active": true,
                          "additional": 3000
                      },
                      "flambed": {
                          "readonly": true,
                          "input": "actived",
                          "active": true,
                          "additional": 0
                      }
                  },
                  "note_client": 4.1,
                  "apper_start": true,
                  "hero_product": false,
                  "complements": [
                      {
                          "id": "molhodepepino-45bf34c3-a804-4b55-8652-2f5e322c194a",
                          "name": "Molho de Pepino",
                          "description": "100 ml",
                          "price": 400,
                          "qtd": 4,
                          "priceTotal": 800
                      },
                      {
                          "id": "geleiadepimenta-82deab80-19cb-4921-9487-ef39661b32fb",
                          "name": "Geleia de pimenta",
                          "description": "100 ml",
                          "price": 400,
                          "qtd": 4,
                          "priceTotal": 800
                      }
                  ]
              }
            ],
            "pedido": "123436"
          },
          {
            "nome": "teste 3",
            "telefone": "21967559557",
            "status": "concluido",
            "segmento": "foodpark",
            "produtos": [
              {
                  "id": "09992622-b8c0-4fef-950b-5480a2e25d91",
                  "url_image": "https://res.cloudinary.com/dd8rt2j02/image/upload/v1716406891/o7yypls1p0rbmh45lncn.jpg",
                  "category": "entrada",
                  "name": "test comment",
                  "description": "testing product comments",
                  "price": {
                      "default": 2300,
                      "discount": {
                          "active": false,
                          "value": 0
                      },
                      "qtd_product": 6,
                      "total": 17800,
                      "total_price_complements": 4000
                  },
                  "differences": {
                      "especial": {
                          "readonly": true,
                          "input": "actived",
                          "active": true,
                          "additional": 0
                      },
                      "breaded": {
                          "readonly": false,
                          "input": "desatived",
                          "active": false,
                          "additional": 0
                      },
                      "flambed": {
                          "readonly": false,
                          "input": "desatived",
                          "active": false,
                          "additional": 0
                      }
                  },
                  "note_client": 4,
                  "apper_start": false,
                  "hero_product": false,
                  "complements": [
                      {
                          "id": "molhotarê-a6e48743-d0ff-4f25-9890-562dfcc10295",
                          "name": "Molho Tarê",
                          "description": "100 ml",
                          "price": 400,
                          "qtd": 4,
                          "priceTotal": 800
                      },
                      {
                          "id": "molhoshoyu-a492f4fb-0939-45e8-9f9b-55c1093fe430",
                          "name": "Molho Shoyu",
                          "description": "100 ml",
                          "price": 400,
                          "qtd": 6,
                          "priceTotal": 1600
                      },
                      {
                          "id": "geleiadepimenta-82deab80-19cb-4921-9487-ef39661b32fb",
                          "name": "Geleia de pimenta",
                          "description": "100 ml",
                          "price": 400,
                          "qtd": 6,
                          "priceTotal": 1600
                      }
                  ]
              },
              {
                  "id": "bd4467e4-f231-4697-84ad-a625e8fc7001",
                  "url_image": "https://cdn.filestackcontent.com/CPOOv8j7Rcq5gB4nKORI",
                  "category": "entrada",
                  "name": "teste update",
                  "description": "update da imagem",
                  "price": {
                      "default": 3000,
                      "discount": {
                          "active": false,
                          "value": 0
                      },
                      "qtd_product": 6,
                      "total": 37600,
                      "total_price_complements": 1600
                  },
                  "differences": {
                      "especial": {
                          "readonly": false,
                          "input": "actived",
                          "active": false,
                          "additional": 0
                      },
                      "breaded": {
                          "readonly": false,
                          "input": "actived",
                          "active": true,
                          "additional": 3000
                      },
                      "flambed": {
                          "readonly": true,
                          "input": "actived",
                          "active": true,
                          "additional": 0
                      }
                  },
                  "note_client": 4.1,
                  "apper_start": true,
                  "hero_product": false,
                  "complements": [
                      {
                          "id": "molhodepepino-45bf34c3-a804-4b55-8652-2f5e322c194a",
                          "name": "Molho de Pepino",
                          "description": "100 ml",
                          "price": 400,
                          "qtd": 4,
                          "priceTotal": 800
                      },
                      {
                          "id": "geleiadepimenta-82deab80-19cb-4921-9487-ef39661b32fb",
                          "name": "Geleia de pimenta",
                          "description": "100 ml",
                          "price": 400,
                          "qtd": 4,
                          "priceTotal": 800
                      }
                  ]
              }
            ],
            "pedido": "143436"
          },
          {
            "nome": "teste 4",
            "telefone": "21967559557",
            "status": "entrega",
            "segmento": "delivery",
            "produtos": [
              {
                  "id": "09992622-b8c0-4fef-950b-5480a2e25d91",
                  "url_image": "https://res.cloudinary.com/dd8rt2j02/image/upload/v1716406891/o7yypls1p0rbmh45lncn.jpg",
                  "category": "entrada",
                  "name": "test comment",
                  "description": "testing product comments",
                  "price": {
                      "default": 2300,
                      "discount": {
                          "active": false,
                          "value": 0
                      },
                      "qtd_product": 6,
                      "total": 17800,
                      "total_price_complements": 4000
                  },
                  "differences": {
                      "especial": {
                          "readonly": true,
                          "input": "actived",
                          "active": true,
                          "additional": 0
                      },
                      "breaded": {
                          "readonly": false,
                          "input": "desatived",
                          "active": false,
                          "additional": 0
                      },
                      "flambed": {
                          "readonly": false,
                          "input": "desatived",
                          "active": false,
                          "additional": 0
                      }
                  },
                  "note_client": 4,
                  "apper_start": false,
                  "hero_product": false,
                  "complements": [
                      {
                          "id": "molhotarê-a6e48743-d0ff-4f25-9890-562dfcc10295",
                          "name": "Molho Tarê",
                          "description": "100 ml",
                          "price": 400,
                          "qtd": 4,
                          "priceTotal": 800
                      },
                      {
                          "id": "molhoshoyu-a492f4fb-0939-45e8-9f9b-55c1093fe430",
                          "name": "Molho Shoyu",
                          "description": "100 ml",
                          "price": 400,
                          "qtd": 6,
                          "priceTotal": 1600
                      },
                      {
                          "id": "geleiadepimenta-82deab80-19cb-4921-9487-ef39661b32fb",
                          "name": "Geleia de pimenta",
                          "description": "100 ml",
                          "price": 400,
                          "qtd": 6,
                          "priceTotal": 1600
                      }
                  ]
              },
              {
                  "id": "bd4467e4-f231-4697-84ad-a625e8fc7001",
                  "url_image": "https://cdn.filestackcontent.com/CPOOv8j7Rcq5gB4nKORI",
                  "category": "entrada",
                  "name": "teste update",
                  "description": "update da imagem",
                  "price": {
                      "default": 3000,
                      "discount": {
                          "active": false,
                          "value": 0
                      },
                      "qtd_product": 6,
                      "total": 37600,
                      "total_price_complements": 1600
                  },
                  "differences": {
                      "especial": {
                          "readonly": false,
                          "input": "actived",
                          "active": false,
                          "additional": 0
                      },
                      "breaded": {
                          "readonly": false,
                          "input": "actived",
                          "active": true,
                          "additional": 3000
                      },
                      "flambed": {
                          "readonly": true,
                          "input": "actived",
                          "active": true,
                          "additional": 0
                      }
                  },
                  "note_client": 4.1,
                  "apper_start": true,
                  "hero_product": false,
                  "complements": [
                      {
                          "id": "molhodepepino-45bf34c3-a804-4b55-8652-2f5e322c194a",
                          "name": "Molho de Pepino",
                          "description": "100 ml",
                          "price": 400,
                          "qtd": 4,
                          "priceTotal": 800
                      },
                      {
                          "id": "geleiadepimenta-82deab80-19cb-4921-9487-ef39661b32fb",
                          "name": "Geleia de pimenta",
                          "description": "100 ml",
                          "price": 400,
                          "qtd": 4,
                          "priceTotal": 800
                      }
                  ]
              }
            ],
            "pedido": "144476"
          },
        ]
      ))
    }
  }
</script>
