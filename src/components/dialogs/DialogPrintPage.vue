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
    </div>
  </v-row>
</template>

<script lang="ts">
  import { Component, Prop, Watch } from "vue-property-decorator"
  import { mixins } from "vue-class-component"
  import { IDifferences } from "@/types/types-product"
  import MixinServiceOrderCostumer from "@/mixins/order/mixinServiceOrderCostumer"
  import { $refs } from "@/implements/types"
  import { IOrderDataAll } from "@/types/type-order"

  @Component({})

  export default class DialogPrintPage extends mixins(
    MixinServiceOrderCostumer
  ) implements $refs {
    $refs
    @Prop({ default: "" }) numeroDoPedido!:string
    @Prop() pedidoUnificado!: IOrderDataAll

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
  }
</script>
