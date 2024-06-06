import { IproductData } from "@/types/types-product"

export interface IOrderData {
  nome: string,
  pedido: string,
  segmento: string,
  produtos: IproductData[],
  pagamento: {
    formaPagamento: string,
    statusPagamento: string,
    valorFrete: number,
    valorProdutos: number,
    valorTotal: number,
  },
  status: string,
  vip: boolean,
  telefone: string
  updated_at: string|Date
}

export interface IStatusOrder {
  id: string,
  status: string
}

export interface IOrderDataAll extends IOrderData {
  consumidor: {
    nome: string,
    telefone: {
      contato: string
    },
    endereco: {
      cep: string,
      logradouro: string,
      bairro: string,
      cidade: string,
      uf: string,
      numero: string,
      complemento: string,
      referencia: string
    },
    mensagem: string
  },
  pagamento: {
    desconto: {
      PrecoTotalComDesconto: number
      porcentagem: number
    }
    valorTotal: number,
    formaPagamento: string
  }
}