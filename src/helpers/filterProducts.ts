import PRODUCT_DATA_DEFAULT from "@/data/products/productDefinitive.json"

export function filterDataProduct (category?: string): typeof PRODUCT_DATA_DEFAULT {
  const PRODUCT_DATA = PRODUCT_DATA_DEFAULT

  if (!category) return PRODUCT_DATA.map(induvidualProduct => induvidualProduct)

  return PRODUCT_DATA.filter(individualProduct => {
    if (String(individualProduct.category) === String(category)) return individualProduct
  })
}