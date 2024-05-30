import { IproductData } from "@/types/types-product"

export interface IOrderData {
  nome: string,
  pedido: string,
  segmento: string,
  produtos: IproductData[],
  status: string,
  telefone: string,
  updated_at: string|Date
}

export interface IStatusOrder {
  id: string,
  status: string
}
