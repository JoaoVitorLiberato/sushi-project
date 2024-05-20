import { IproductData } from "@/types/types-product"
import store from "@/plugins/store"

function dataCache (): IproductData[] {
  const PRODUCT_DATA_STORE = store.getters["cacheStoreModule/CacheProducts"]()
  const PRODUCT_DATA_CACHE = sessionStorage.getItem("cache-product")

  if (PRODUCT_DATA_STORE.length > 0) return PRODUCT_DATA_STORE as IproductData[]
  else if (PRODUCT_DATA_CACHE && JSON.parse(PRODUCT_DATA_CACHE).length > 0) JSON.parse(PRODUCT_DATA_CACHE) as IproductData[]

  return []
}

export function filterDataProduct (category?: string): IproductData[] {
  if (!dataCache()) return []
  else {
    if (!category) return dataCache()
    return dataCache().filter(individualProduct => {
      if (String(individualProduct.category) === String(category)) return individualProduct
    })
  }
}