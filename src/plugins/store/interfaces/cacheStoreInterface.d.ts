import { IproductData } from "@/types/types-product"

interface cacheStoreInterface {
  rastreamentoUsuario: Record<string, string|string[]|number|number[]|boolean>
  cache: {
    [key:string]:unknown;
  };
  overdrawerMenu: boolean;
  drawerCartProduct: boolean;
  cepValidation: string,
  products: IproductData[],
  ordersCart: IproductData[],
  priceTotal: number,
  loading: {
    status: boolean,
    msg: string
  }
}

export {
  cacheStoreInterface,
}
