import { IproductData } from "@/types/types-product"

export interface IOrderData {
  nome: string,
  pedido: string,
  segmento: string,
  produtos: IproductData[],
  status: string,
  telefone: string,
}

export interface IStatusOrder {
  id: string,
  status: string
}
