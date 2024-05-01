import PRODUCT_DATA_DEFAULT from "@/data/products/productDataDefault.json"

export function filterDataProduct (category?: string): typeof PRODUCT_DATA_DEFAULT {
  const PRODUCT_DATA = PRODUCT_DATA_DEFAULT.map(induvidualProduct => induvidualProduct)

  if (!category) return PRODUCT_DATA

  return PRODUCT_DATA.filter(individualProduct => {
    if (String(individualProduct.category) === String(category)) return individualProduct
  })
}