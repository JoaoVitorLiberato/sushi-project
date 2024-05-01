import { Module, GetterTree, ActionTree, MutationTree } from "vuex"
import { rootStateInterface } from "@/plugins/store/interfaces/rootStateInterface"
import { cacheStoreInterface } from "@/plugins/store/interfaces/cacheStoreInterface"

const moduleCache = (): cacheStoreInterface => {
  return {
    cache: {},
    overdrawerMenu: false,
    cepValidation: "",
    drawerCartProduct: false,
    ordersCart: []
  }
}

const state: cacheStoreInterface = moduleCache()

const getters: GetterTree<cacheStoreInterface, rootStateInterface> = {
  getCache: ({ cache }) => ({ data }) => {
    return cache[data]
  },
  getCacheOverdrawerMenu: ({ overdrawerMenu }) => () => {
    return overdrawerMenu
  },
  CacheCepValidation: ({ cepValidation }) => () => {
    return cepValidation
  },
  CacheDrawerCartProduct: ({ drawerCartProduct }) => () => {
    return drawerCartProduct
  },
  CacheOrderCart: ({ ordersCart }) => () => {
    return ordersCart
  },
}

const actions: ActionTree<cacheStoreInterface, rootStateInterface> = {
  setCache ({ commit }, { data, value }) {
    commit("mutationCache", { data, value })
  },
  ActionCacheOverdrawerMenu ({ commit }, data) {
    commit("mutationCacheOverdrawerMenu", data)
  },
  ActionCacheCepValidation ({ commit }, data) {
    commit("mutationCacheCepValidation", data)
  },
  ActionCacheDrawerCartProduct ({ commit }, data) {
    commit("mutationCacheDrawerCartProduct", data)
  },
  ActionCacheOrdersCart ({ commit }, data) {
    commit("mutationCacheOrdersCart", data)
  },
}

const mutations: MutationTree<cacheStoreInterface> = {
  mutationCache ({ cache }, { data, value }) {
    cache[data] = value
  },
  mutationCacheOverdrawerMenu (state, data) {
    state.overdrawerMenu = data
  },
  mutationCacheCepValidation (state, data) {
    state.cepValidation = data
  },
  mutationCacheDrawerCartProduct (state, data) {
    state.drawerCartProduct = data
  },
  mutationCacheOrdersCart (state, data) {
    state.ordersCart = data
  },
}

const cacheStoreModule: Module<cacheStoreInterface, rootStateInterface> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}

export {
  cacheStoreModule
}
