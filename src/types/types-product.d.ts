export interface IproductData {
  id: number,
  url_image: string,
  category: string,
  name: string,
  description: string,
  price: {
    default: number,
    qtd_product?: number,
    total?: number,
    total_price_complements?: number
    discount: {
      active: boolean,
      value: number
    },
  },
  complements?: IComplements[],
  differences: IDifferences,
  note_client: number,
  apper_start: boolean,
  hero_product: boolean
}


export interface IComplements {
  description: string,
  id: string
  name: string,
  price: number
  priceTotal: number,
  qtd:number
}

export interface IDifferences {
  especial: {
    input: string,
    active: boolean,
    additional: number
  },
  breaded: {
    input: string,
    active: boolean,
    additional: number
  },
  flambed: {
    input: string,
    active: boolean,
    additional: number
  }
}
