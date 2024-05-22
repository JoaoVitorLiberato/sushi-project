<template>
  <div>
    <v-data-iterator
      :items="items"
      :items-per-page.prop="itemsPerPage"
      hide-default-footer
    >
        <template v-slot:header>
          <v-toolbar
            class="mb-2"
          flat
        >
          <v-toolbar-title
            class="text-uppercase font-weight-bold"
          >
            Todos os pedidos
          </v-toolbar-title>
        </v-toolbar>
      </template>

      <template v-slot:default="props">
        <v-row
          no-gutters
          class="px-4"
        >
          <v-col
            v-for="item in props.items"
            :key="item.name"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card
              class="mx-md-2"
            >
              <v-card-title
                class="d-flex justify-space-between aling-center"
              >
                <span
                  v-font-size="18"
                  class="font-weight-bold text-uppercase"
                >
                  Pedido: 
                </span>

                <span
                  v-font-size="18"
                  class="font-weight-medium text-uppercase"
                >
                  {{ item.pedido }}
                </span>
              </v-card-title>

              <v-divider></v-divider>

              <v-list dense>
                <v-list-item>
                  <v-list-item-content>
                    <span
                      v-font-size="14"
                      class="font-weight-bold text-uppercase d-block"
                    >
                      Nome:
                    </span>

                    <span
                      v-font-size="14"
                      class="font-weight-regular text-uppercase d-block"
                    >
                      {{ item.nome }}
                    </span>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <span
                      v-font-size="14"
                      class="font-weight-bold text-uppercase d-block"
                    >
                      Telefone:
                    </span>

                    <span
                      v-font-size="14"
                      class="font-weight-regular text-uppercase d-block"
                    >
                      {{ item.telefone }}
                    </span>
                  </v-list-item-content>
                </v-list-item>
              </v-list>

              <v-card-actions
                class="pa-4"
              >
                <v-autocomplete
                  :items="statusOrders"
                  v-model="status"
                  item-text="name"
                  item-value="id"
                  hide-details
                  outlined
                  dense
                >
                ></v-autocomplete>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
  </div>
</template>

<script lang="ts">
  import { Vue, Component } from "vue-property-decorator"

  @Component({})
  export default class CardOrderAdmin extends Vue {
    itemsPerPage = 4
    items = [
      {
        pedido: '123456',
        nome: "sem nome",
        telefone: "21999999999"
      },
    ]

    status = "preparando"

    get statusOrders (): {
      id: string,
      name: string,
    }[] {
      return [
        {
          id: "preparando",
          name: "Preparando"
        },
        {
          id: "entrega",
          name: "Entrega"
        },
        {
          id: "concluido",
          name: "Concluído"
        },
      ]
    }
  }
</script>