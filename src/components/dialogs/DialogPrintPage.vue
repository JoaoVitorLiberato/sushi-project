<template>
  <v-row
    no-gutters
  >
    <div>
      <v-btn
        :loading="isLoading"
        text
        color="error"
        class="px-2"
        @click="initPrintPage()"
      >
        Imprimir Pedido
      </v-btn>

      <v-row
        v-if="pedido && response"
        ref="printContent" 
        style="display: none;"
      >
        <h1>Detalhes do Pedido</h1>
        <p>
          <strong>Segmento:</strong> {{ pedido.segmento }}
        </p>
        
        <h2>Consumidor</h2>
        <p>
          <strong>Nome:</strong> {{ pedido.consumidor.nome }}
        </p>
        
        <p>
          <strong>Telefone:</strong> {{ pedido.consumidor.telefone.contato }}
        </p>
        
        <p>
          <strong>Endereço:</strong> {{ formatAddress(pedido.consumidor.endereco) }}
        </p>
        
        <h2>Produtos</h2>
        
        <div 
          v-for="produto in pedido.produtos" 
          :key="produto.id"
        >
          <h3>{{ produto.name }}</h3>
        
          <p>
            <strong>Categoria:</strong> {{ produto.category }}
          </p>
        
          <p>
            <strong>Descrição:</strong> {{ produto.description }}
          </p>
        
          <p>
            <strong>Preço:</strong> {{ formatPrice(produto.price.total) }}
          </p>
        
          <div 
            v-if="produto.complements && produto.complements.length"
          >
            <h4>Complementos</h4>
        
            <ul>
              <li v-for="(complement, key) in produto.complements" :key="key">
                {{ complement.name }} - {{ formatPrice(complement.price) }}
              </li>
            </ul>
          </div>
        </div>
        
        <h2>Pagamento</h2>
        <p><strong>Valor Total:</strong> {{ formatPrice(pedido.pagamento.valorTotal) }}</p>
        <p><strong>Forma de Pagamento:</strong> {{ pedido.pagamento.formaPagamento }}</p>
        
        <p><strong>Status:</strong> {{ pedido.status }}</p>
      </v-row>
    </div>
  </v-row>
</template>

<script lang="ts">
  import { Component, Prop } from "vue-property-decorator"
  import { mixins } from "vue-class-component"
  
  import MixinServiceOrderCostumer from "@/mixins/order/mixinServiceOrderCostumer"
  import { $refs } from "@/implements/types"
  import { IOrderDataAll } from "@/types/type-order"
  
  @Component({})
  export default class DialogPrintPage extends mixins(
    MixinServiceOrderCostumer
  ) implements $refs {
    $refs
    @Prop({ default: "" }) numeroDoPedido!:string
    pedido: IOrderDataAll = {} as IOrderDataAll
    response = false
    isLoading = false

    async initPrintPage () {
      this.isLoading = true
      const res = await this.getOrderPrinter(this.numeroDoPedido)
      if (typeof res === 'string') return

      this.pedido = res
      this.response = true

      setTimeout(() => {
        if (this.pedido) this.printPage()
        this.isLoading = false
      }, 700);
    }

    printPage() {
      const printContent = this.$refs.printContent as HTMLElement | null;
      console.log(this.$refs['printContent'], this.$refs)
      if (printContent) {
        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow!.document.write(`
          <html>
            <head>
              <title>Imprimir Página</title>
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

    formatAddress(address) {
      return `${address.logradouro}, ${address.numero} - ${address.bairro}, ${address.cidade} - ${address.uf}, ${address.cep} (${address.referencia})`;
    }

    formatPrice(price) {
      return `R$ ${(price / 100).toFixed(2)}`;
    }
  }
</script>