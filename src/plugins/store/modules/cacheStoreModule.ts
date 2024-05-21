import { Module, GetterTree, ActionTree, MutationTree } from "vuex"
import { rootStateInterface } from "@/plugins/store/interfaces/rootStateInterface"
import { cacheStoreInterface } from "@/plugins/store/interfaces/cacheStoreInterface"

const moduleCache = (): cacheStoreInterface => {
  return {
    rastreamentoUsuario: {},
    cache: {},
    overdrawerMenu: false,
    cepValidation: "",
    drawerCartProduct: false,
    ordersCart: [],
    priceTotal: 0,
    products: [],
    loading: {
      status: false,
      msg: ""
    },
    complements: []
  }
}

const state: cacheStoreInterface = moduleCache()

const getters: GetterTree<cacheStoreInterface, rootStateInterface> = {
  getCache: ({ cache }) => ({ data }) => {
    return cache[data]
  },
  CacheRastreamentoUsuarioPayloadSource: ({ rastreamentoUsuario }) => () => {
    return rastreamentoUsuario.source
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
  CachePriceTotal: ({ priceTotal }) => () => {
    return priceTotal
  },
  CacheProducts: ({ products }) => () => {
    return products
  },
  CacheLoading: ({ loading }) => () => {
    return loading
  },
  CacheComplements: ({ complements }) => () => {
    return complements
  },
}

const mutations: MutationTree<cacheStoreInterface> = {
  mutationCache ({ cache }, { data, value }) {
    cache[data] = value
  },
  mutationCacheRastreamentoSource: (state, source) => {
    state.rastreamentoUsuario.source = source
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
  mutationCachePriceTotal (state, data) {
    state.priceTotal = data
  },
  mutationCacheProducts (state, data) {
    state.products = data
  },
  mutationLoading (state, data) {
    state.loading = {
      status: data.status,
      msg: data.msg,
    }
  },
  mutationComplements (state, data) {
    state.complements = data
  },
}

const actions: ActionTree<cacheStoreInterface, rootStateInterface> = {
  setCache ({ commit }, { data, value }) {
    commit("mutationCache", { data, value })
  },
  ActionCacheRastreamentoUsuarioSource: ({ commit }, { source }) => {
    commit("mutationCacheRastreamentoSource", source)
    sessionStorage.setItem("payload.source", source)
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
  ActionCachePriceTotal ({ commit }, data) {
    commit("mutationCachePriceTotal", data)
  },
  ActionCacheProducts ({ commit }, data) {
    commit("mutationCacheProducts", data)
  },
  ActionCacheLoading ({ commit }, data) {
    commit("mutationLoading", data)
  },
  ActionCacheComplements({ commit }, data) {
    commit("mutationComplements", data)
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
