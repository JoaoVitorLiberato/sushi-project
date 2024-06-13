<template>
  <v-row
    no-gutters
  >
    <div>
      <v-btn
        :loading="isLoading"
        text
        width="110"
        color="success"
        @click="initPrintPage()"
      >
        Imprimir
      </v-btn>

      <div
        v-if="pedido && response"
        ref="printContent"
        style="display: none;"
      >
        <div>
          <h2
            style="text-transform:uppercase;font-size:18px;"
          >
            Detalhes do Pedido
          </h2>

          <div
            style="line-height: 1;"
          >
            <p
              style="padding:0;margin:0;text-transform:uppercase"
            >
              <strong>Segmento:</strong> {{ pedido.segmento }}
            </p>

            <p
              style="padding:0;margin:0;text-transform:uppercase;letter-spacing:0.32px"
            >
              <strong>Nome:</strong> {{ pedido.consumidor.nome }}
            </p>

            <p
              style="padding:0;margin:0;text-transform:uppercase"
            >
              <strong>Telefone:</strong> {{ pedido.consumidor.telefone.contato !== "" ?  pedido.consumidor.telefone.contato : 'S/N' }}
            </p>

            <p
              style="padding:0;margin:0;text-transform:uppercase"
            >
              <strong>Endereço:</strong> {{ formatAddress(pedido.consumidor) }}
            </p>
          </div>
        </div>

        <div
          style="margin-top: 15px;"
        >
          <h2
            v-if="pedido.produtos.length > 0"
            style="text-transform:uppercase;font-size:18px;line-height:1;"
          >
            Produtos
          </h2>

          <div>
            <div
              v-for="(produto, i) in pedido.produtos"
              :key="`produto-${produto.id}-${i}`"
              v-show="pedido.produtos.length > 0"
              style="line-height: 1;"
            >
              <p
                style="padding:0;margin:0;text-transform:uppercase"
              >
                <strong>Nome:</strong> {{ produto.name }}
              </p>

              <p
                style="padding:0;margin:0;text-transform:uppercase"
              >
                <strong>Tipo:</strong> {{ typeDifferenceProduct(produto.differences) }}
              </p>

              <p
                style="padding:0;margin:0;text-transform:uppercase"
              >
                <strong>Qtd Produto:</strong> {{ produto.price.qtd_product }}
              </p>

              <p
                v-if="produto.complements"
                style="padding:0;margin:0;text-transform:uppercase"
              >
                <strong>Complementos: </strong>
                <ul
                  v-if="produto.complements.length <= 0"
                >
                  <li
                    style="margin-left:5px;margin:0;margin-bottom:0;line-height:1;text-transform: uppercase"
                  >
                    Sem complementos
                  </li>
                </ul>
                <ul
                  v-else
                >
                  <li
                    v-for="(complement, key) in produto.complements"
                    :key="`complemente-${complement.name}-${key}`"
                    style="margin-left:5px;margin:0;margin-bottom:0;line-height:1;text-transform: uppercase"
                  >
                    {{ complement.name }} - {{ formatPrice(complement.priceTotal) }} -  qtd: {{ complement.qtd }}
                  </li>
                </ul>
              </p>
            </div>

            <div
              v-if="pedido.consumidor.mensagem"
              style="margin-top:10px;line-height:1"
            >
              <span>
                <strong>OBS:</strong> {{ pedido.consumidor.mensagem }}
              </span>
            </div>

            <div
              style="margin-top: 15px;"
            >
              <p
                v-if="pedido.pagamento.formaPagamento"
                style="padding:0;margin:0;text-transform:uppercase"
              >
                <strong>Forma de Pagamento:</strong> {{ pedido.pagamento.formaPagamento }}
              </p>

              <p
                v-if="pedido.peso"
                style="padding:0;margin:0;text-transform:uppercase"
              >
                <strong>Peso:</strong> {{ formtedWeight(Number(pedido.peso)) }}
              </p>

              <p
                style="padding:0;margin:0;text-transform:uppercase"
              >
                <strong>Valor Total:</strong> {{  formatPrice(pedido.pagamento.valorTotal) }}
              </p>

              <p
                v-if="pedido.pagamento.desconto.PrecoTotalComDesconto > 0"
                style="padding:0;margin:0;text-transform:uppercase"
              >
                <strong>% do desconto:</strong> {{ pedido.pagamento.desconto.porcentagem }}%
              </p>

              <p
                v-if="pedido.pagamento.desconto.PrecoTotalComDesconto > 0"
                style="padding:0;margin:0;text-transform:uppercase"
              >
                <strong>Valor C/ desconto:</strong> {{ formatPrice(pedido.pagamento.desconto.PrecoTotalComDesconto) }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <v-dialog
        ref="dialogAfterPrint"
        width="500"
        persistent
      >
        <v-card>
          <v-row
            no-gutters
            style="border: 1px solid var(--v-secondary-base);min-height:50px"
            class="pa-4"
          >
            <v-col
              cols="12"
              class="text-center"
            >
              <h2
                class="font-weight-bold text-uppercase"
              >
                Importante
              </h2>
            </v-col>

            <v-col
              cols="12"
              class="py-2"
            />

            <v-col
              cols="12"
              style="line-height: 19px"
            >
              <span
                v-font-size="17"
                class="font-weight-regular"
              >
                Houve algum problema com impressão? Caso sim, não tenha imprimido ou dado algum problema com a impressora,
                clique no botão amarelo "tentar novamente".
              </span>
            </v-col>

            <v-col
              cols="12"
              class="py-4"
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
                  cols="12"
                  md="6"
                >
                  <v-btn
                    color="secondary"
                    depressed
                    large
                    block
                    @click="handleDialogAfterPrint('tentar')"
                  >
                    <span
                      v-font-size="14"
                      class="font-weight-bold primary--text"
                    >
                      Tentar nomavente
                    </span>
                  </v-btn>
                </v-col>

                <v-col
                  cols="12"
                  class="hidden-md-and-up py-2"
                />

                <v-col
                  cols="12"
                  md="5"
                >
                  <v-btn
                    color="success"
                    depressed
                    large
                    block
                    @click="handleDialogAfterPrint('concluir')"
                  >
                    <span
                      v-font-size="14"
                      class="font-weight-bold primary--text"
                    >
                      Fechar
                    </span>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>
    </div>
  </v-row>
</template>

<script lang="ts">
  import { Component, Prop, Watch, ModelSync } from "vue-property-decorator"
  import { mixins } from "vue-class-component"
  import { IDifferences } from "@/types/types-product"
  import MixinServiceOrderCostumer from "@/mixins/order/mixinServiceOrderCostumer"
  import { $refs } from "@/implements/types"
  import { IOrderDataAll } from "@/types/type-order"
  import { namespace } from "vuex-class"

  const dialogStore = namespace("dialogStoreModule")

  @Component({})

  export default class DialogPrintPage extends mixins(
    MixinServiceOrderCostumer
  ) implements $refs {
    $refs
    @Prop({ default: "" }) numeroDoPedido!:string
    @Prop() pedidoUnificado!: IOrderDataAll
    @ModelSync("statusPrinted", "statusPrintedEmit")
      setStatusPrinted!: boolean

    @dialogStore.Action("ActionDialogTryAgain") setDialogTryAgain
    @dialogStore.Getter("DialogTryAgain") getDialogTryAgain

    pedido: IOrderDataAll = {} as IOrderDataAll
    response = false
    isLoading = false
    requestWatch = false

    @Watch("pedidoUnificado")
      changePropPedidoUnificado (): void {
        this.requestWatch = true
        this.pedido = this.pedidoUnificado
        if (this.pedido) this.initPrintPage()
      }

    async initPrintPage () {
      this.isLoading = true
      if (!this.requestWatch) {
        const res =  await this.getOrderPrinter(this.numeroDoPedido)
        if (typeof res === 'string') return
        this.pedido = res
      }

      this.response = true

      setTimeout(() => {
        if (this.pedido) this.printPage()
        this.isLoading = false
      }, 700);
    }

    printPage() {
      const printContent = this.$refs.printContent as HTMLElement | null;

      if (printContent) {
        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow!.document.write(`
          <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; }
                h1, h2, h3, p { margin: 0; padding: 8px 0; }
                img { display: block; margin: 10px 0; }
                ul { margin: 0; padding: 0 0 0 20px; }
              </style>
            </head>
            <body>
              ${printContent.innerHTML}
            </body>
          </html>
        `);
        printWindow!.document.close();
        printWindow!.focus();
        printWindow!.print();
        printWindow!.close();

        this.$refs.dialogAfterPrint.isActive = true
      }
    }

    formtedWeight (e:number):string {
      let textWeight = ""

      if (e > 999) {
        const PESO_FORMATED = Number(e) > 999 ? Number(e) / 1000 :  Number(e)
        const SPLIT_PESO = String(PESO_FORMATED).split(".")
        textWeight = `${SPLIT_PESO[0]} KG e ${String(SPLIT_PESO[1]).length <= 1 ? `${SPLIT_PESO[1]}00` : SPLIT_PESO[1] === undefined ? 0 : SPLIT_PESO[1]} Gramas`
      } else textWeight = `${e} Gramas`

      return textWeight
    }

    formatAddress(data): string {
      let addressFormated = ""

      Object.keys(data.endereco).forEach(item => {
        if (data.endereco[item] === "") return addressFormated = "s/n"
        addressFormated = `${data.endereco.logradouro}, ${data.endereco.numero} - ${data.endereco.bairro}, ${data.endereco.cidade} - ${data.endereco.uf}, ${data.endereco.cep} (${data.endereco.referencia})`;
      })

      return addressFormated
    }

    formatPrice(price) {
      return `R$ ${(price / 100).toFixed(2)}`;
    }

    typeDifferenceProduct (differences: IDifferences): string {
      let typeText = [] as string[]
      let returnText = ""

      if (differences) {
        Object.keys(differences).forEach(type => {
          if (!differences) return typeText.push("Natural")

          switch (true) {
            case /especial/i.test(type as string) && differences[type].active:
              return typeText.push("Especial")
            case /breaded/i.test(type as string) && differences[type].active:
              return typeText.push("Empanado")
            case /flambed/i.test(type as string) && differences[type].active:
              return typeText.push("Flambado")
            default:
              return typeText.push("Natural")
          }
        })
      }

      if ((String(typeText).toLowerCase().includes(("Especial").toLowerCase()))) {
        returnText = "Especial"
      } else if ((String(typeText).toLowerCase().includes(("Empanado").toLowerCase())))  {
        returnText = "Empanado"
      } else if ((String(typeText).toLowerCase().includes(("Flambado").toLowerCase()))) {
        returnText = "Flambado"
      } else {
        returnText = "Natural"
      }

      return returnText
    }

    handleDialogAfterPrint (event:string): void {
      if (/tentar/i.test(event)) {
        this.$refs.dialogAfterPrint.save()
        this.initPrintPage()
      } else {
        const ORDER_PRINTED = localStorage.getItem("order-printed")

        if (!ORDER_PRINTED) {
          this.$refs.dialogAfterPrint.save()
          this.setDialogTryAgain(true)
          return
        }

        if (!JSON.parse(ORDER_PRINTED).includes(String(this.numeroDoPedido))) {
          localStorage.setItem("order-printed", JSON.stringify([
            ...JSON.parse(ORDER_PRINTED),
            this.numeroDoPedido,
          ]))
        }

        this.setStatusPrinted = !this.setStatusPrinted
        this.$refs.dialogAfterPrint.save()
      }
    }
  }
</script>
