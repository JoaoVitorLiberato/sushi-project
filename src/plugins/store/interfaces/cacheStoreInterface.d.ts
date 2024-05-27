import { IproductData, IComplements, ICommentProduct } from "@/types/types-product"

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
  commentsPorducts: ICommentProduct[]|string
  commentsIDPorductSelected: string
  ordersCart: IproductData[],
  priceTotal: number,
  overlayMessageLaunchStore: boolean,
  loading: {
    status: boolean,
    msg: string
  }
}

export {
  cacheStoreInterface,
}
