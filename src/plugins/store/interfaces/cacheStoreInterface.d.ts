import { IproductData } from "@/types/types-product"

interface cacheStoreInterface {
  rastreamentoUsuario: Record<string, string|string[]|number|boolean>
  cache: {
    [key:string]:unknown;
  };
  overdrawerMenu: boolean;
  drawerCartProduct: boolean;
  cepValidation: string,
  ordersCart: IproductData[],
  priceTotal: number,
}

export {
  cacheStoreInterface,
}
