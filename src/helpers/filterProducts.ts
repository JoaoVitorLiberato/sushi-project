import ALL_PRODUCT_DATA from "@/data/products/productDataBackend.json"

export function filterDataProduct (category?: string): typeof ALL_PRODUCT_DATA {
  const PRODUCT_DATA = ALL_PRODUCT_DATA

  if (!category) return PRODUCT_DATA

  return PRODUCT_DATA.filter(individualProduct => {
    if (String(individualProduct.category) === String(category)) return individualProduct
  })
}