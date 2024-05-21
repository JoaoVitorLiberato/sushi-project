import { IproductData, IComplements } from "@/types/types-product"

interface cacheStoreInterface {
  rastreamentoUsuario: Record<string, string|string[]|number|number[]|boolean>
  cache: {
    [key:string]:unknown;
  };
  overdrawerMenu: boolean;
  drawerCartProduct: boolean;
  cepValidation: string,
  products: IproductData[],
  complements: IComplements[],
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
