export interface IproductData {
  id: number,
  url_image: string,
  category: string,
  name: string,
  description: string,
  price: {
    default: number,
    discount: {
      active: boolean,
      value: number
    },
    breaded: {
      input: string,
      active: boolean,
      additional: number
    }
  },
  complements: {
    default: boolean,
    especial: boolean
  },
  note_client: number,
  apper_start: boolean,
  hero_product: boolean
}
