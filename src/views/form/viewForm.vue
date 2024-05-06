<template>
  <v-row
    no-gutters
    style="background-color: white;"
  >
    <v-col
      :cols="$vuetify.breakpoint.smAndDown ? 12 : 4"
      order="1"
      order-md="2"
      @click="openPainel"
    >
      <v-card
        style="border-radius: 0;"
        color="secondary"
        :height="$vuetify.breakpoint.smAndDown ? expand ? '100vh' : '65px' :'100vh'"
        elevation="0"
        class="pa-4"
      >
        <v-row
          no-gutters
        >
          <v-col
            cols="12"
          >
            <v-row
              no-gutters
              justify="space-between"
              align="center"
            >
              <v-col
                :cols="$vuetify.breakpoint.smAndDown ? 10 : 12"
              >
                <span
                  v-font-size="$vuetify.breakpoint.smAndDown ? 16 : 18"
                  class="font-weight-bold text-uppercase"
                >
                  Resumo do pedido:
                </span>
              </v-col>
              <v-col
                cols="2"
                class="hidden-sm-and-up"
              >
                <v-btn
                  text
                  color="primary"
                >
                  <v-icon
                    size="32"
                    :style="expand ? 'transform: rotate(180deg)' : 'transform: rotate(0deg)'"
                  >
                    expand_more
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-col>

          <v-col
            cols="12"
          >
            <v-expand-transition>
              <div
                v-show="expand"
                :style="expand ? '100vh' : '65px'"
              >
                COMIDA
              </div>
            </v-expand-transition>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
    <v-col
      :cols="$vuetify.breakpoint.smAndDown ? 12 : 8"
      order="2"
      order-md="1"
      class="pa-4"
    >
      <v-row
        no-gutters
      >
        <v-col
          cols="12"
          class="py-3"
        />
      
        <v-col
          cols="12"
        >
          <h2
            v-font-size="$vuetify.breakpoint.smAndDown ? 18 : 22"
            class="font-weight-bold text-uppercase primary--text"
          >
            Finalizar compra
          </h2>
        </v-col>

        <v-col
          cols="12"
          class="py-1"
        />

        <v-col
          cols="12"
          style="line-height: 1;"
        >
          <span
            v-font-size="$vuetify.breakpoint.smAndDown ? 14 : 16"
            class="font-weight-regular grey--text"
          >
            Por favor, preencha os campos abaixo para concluir a compra.
          </span>
        </v-col>

        <v-col
          cols="12"
          class="py-5"
        />

        <v-col
          cols="12"
        >
          <v-form>
            <v-row
              no-gutters
              :justify="$vuetify.breakpoint.smAndDown ? 'center' : 'space-between'"
              align="center"
            >
              <v-col
                v-for="({label,ref,type, optional,mask,readonly}, input) in itemsFirstFields"
                :key="`peencha-seus-dados-cadastrais-${label}`"
                v-show="!/formaPagamento|frete/i.test(String(input))"
                :cols="$vuetify.breakpoint.smAndDown ? 12 : 6"
                class="mb-3"
              >
                <v-text-field
                  :id="ref||input"
                  :ref="ref||input"
                  v-model="itemsFirstFields[input].value"
                  v-mask="mask"
                  :label="label"
                  :name="label"
                  :type="type||'text'"
                  :rules="optional?[itemsFirstFields[input].valid||true]:[required,itemsFirstFields[input].valid]"
                  tabindex="0"
                  flat
                  color="secondary"
                  class="mx-1"
                  outlined
                  hide-details="auto"
                  :title="label"
                  :readonly="readonly"
                >
                  <template
                    v-slot:message="props"
                  >
                    <span
                      v-text="props.message"
                    />
                  </template>
                </v-text-field>
              </v-col>

              <v-col
                :cols="$vuetify.breakpoint.smAndDown ? 12 : 6"
                class="mb-3"
              >
                <v-autocomplete
                  :items="['Pix', 'Cartão de Crédito']"
                  v-model="itemsFirstFields.formaPagamento.value"
                  :rules="[required]"
                  tabindex="0"
                  label="Forma de pagamento"
                  flat
                  color="secondary"
                  class="mx-1"
                  outlined
                  hide-details="auto"
                >
                  <template
                    v-slot:message="props"
                  >
                    <span
                      v-text="props.message"
                    />
                  </template>
                </v-autocomplete>
              </v-col>
              <v-col
                :cols="$vuetify.breakpoint.smAndDown ? 12 : 6"
                class="mb-3"
              >
                <v-text-field
                  v-model="itemsFirstFields.frete.value"
                  :rules="[required]"
                  tabindex="0"
                  flat
                  label="Frete"
                  color="secondary"
                  class="mx-1"
                  outlined
                  readonly
                  hide-details="auto"
                >
                  <template
                    v-slot:message="props"
                  >
                    <span
                      v-text="props.message"
                    />
                  </template>
                </v-text-field>
              </v-col>

              <v-col
                cols="12"
                class="px-1"
              >
                <v-textarea
                  label="Messagem"
                  auto-grow
                  outlined
                  placeholder="Caso você tenha alguma observação, por favor, escreva nesse campo. Ex. Retire as cebolas."
                  rows="4"
                  row-height="40"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-col>

        <v-col
          cols="12"
          class="py-1"
        />

        <v-col
          cols="12"
        >
          <v-row
            no-gutters
            class="px-1"
          >
            <v-col
              v-if="loading"
              cols="12"
            >
              <v-progress-linear
                indeterminate
                color="secondary"
              />
            </v-col>

            <v-col
              v-else
              cols="12"
              :class="$vuetify.breakpoint.smAndDown ? 'd-flex flex-column-reverse' : ''"
            >
              <v-btn
                color="grey lighten-3"
                large
                depressed
                :width="$vuetify.breakpoint.smAndDown ? '100%' : 250"
                class="mr-md-4"
              >
                <span
                  class="font-weight-bold"
                >
                  Voltar
                </span>
              </v-btn>

              <v-btn
                color="secondary"
                large
                depressed
                :class="$vuetify.breakpoint.smAndDown && 'mb-3'"
                :width="$vuetify.breakpoint.smAndDown ? '100%' : 250"
              >
                <span
                  class="font-weight-bold primary--text"
                >
                  Finalizar compra
                </span>
              </v-btn>
            </v-col>
          </v-row>
          <v-col></v-col>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator"
  import { $refs } from "@/implements/types"
  import { required } from "@/helpers/rules"
  import { formatedPrice } from "@/helpers/formatedPrice"

  @Component({})

  export default class viewForm extends Vue 
    implements $refs {
    $refs
    required = required

    expand = true
    loading = false

    itemsFirstFields: {
      [key:string]:{
        [key:string]:string|boolean|number
      }
    } = {
      nomeCompleto: {
        label: "Nome completo",
        value: "",
        valid: "",
      },
      numeroDeContato: {
        label: "Telefone",
        mask: "(##) #####-####",
        type: "tel",
        value: "",
        valid: "",
      },
      cep: {
        ref: "ipt_gtm_modal_event_consumidor_endereco_cep",
        label: "CEP",
        mask: "#####-###",
        type: "tel",
        value: "",
        valid: "",
      },
      enderecoLogradouro: {
        label: "Endereço",
        value: "",
        valid: "",
      },
      enderecoNumero: {
        label: "Número",
        type: "text",
        value: "",
        valid: "",
      },
      enderecoComplemento: {
        optional: true,
        label: "Complemento",
        value: "",
        valid: "",
      },
      enderecoReferencia: {
        label: "Ponto de referência",
        value: "",
        valid: "",
      },
      enderecoBairro: {
        label: "Bairro",
        value: "",
        valid: "",
      },
      enderecoCidade: {
        label: "Cidade",
        value: "",
        valid: "",
        readonly: true,
      },
      enderecoUf: {
        label: "UF",
        mask: "AA",
        value: "",
        valid: "",
        readonly: true,
      },
      formaPagamento: {
        label: "Forma de Pagamento",
        value: "",
        valid: "",
      },
      frete: {
        label: "Frete",
        value: String(formatedPrice(Number(500))),
        valid: true,
        readonly: true
      },
    }


    openPainel (): void {
      if (this.$vuetify.breakpoint.mdAndUp) return
      this.expand = !this.expand
    }
  }
</script>
