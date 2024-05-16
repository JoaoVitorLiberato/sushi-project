import { IproductData } from "@/types/types-product"

interface cacheStoreInterface {
  rastreamentoUsuario: Record<string, string|string[]|number|number[]|boolean>
  cache: {
    [key:string]:unknown;
  };
  overdrawerMenu: boolean;
  drawerCartProduct: boolean;
  cepValidation: string,
  ordersCart: IproductData[],
  rastreamentoProdutos: number[]
  priceTotal: number,
}

export {
  cacheStoreInterface,
}
