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
    complements: [],
    commentsPorducts: [],
    commentsIDPorductSelected: "",
    overlayMessageLaunchStore: false,
    overlayMessageDeliveryDesatived: true
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
  CacheCommentsProduct: ({ commentsPorducts }) => () => {
    return commentsPorducts
  },
  CacheCommentsIDPorductSelected: ({ commentsIDPorductSelected }) => () => {
    return commentsIDPorductSelected
  },
  CacheOverlayMessageLaunchStore: ({ overlayMessageLaunchStore }) => () => {
    return overlayMessageLaunchStore
  },
  CacheOverlayMessageDeliveryDesatived: ({ overlayMessageDeliveryDesatived }) => () => {
    return overlayMessageDeliveryDesatived
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
  mutationCommentProduct (state, data) {
    state.commentsPorducts = data
  },
  mutationCommentsIDPorductSelected (state, data) {
    state.commentsIDPorductSelected = data
  },
  mutationOverlayMessageLaunchStore (state, data) {
    state.overlayMessageLaunchStore = data
  },
  mutationOverlayMessageDeliveryDesatived (state, data) {
    state.overlayMessageDeliveryDesatived = data
  }
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
  ActionCacheComplements ({ commit }, data) {
    commit("mutationComplements", data)
  },
  ActionCacheCommentProduct ({ commit }, data) {
    commit("mutationCommentProduct", data)
  },
  ActionCacheCommentsIDPorductSelected ({ commit }, data) {
    commit("mutationCommentsIDPorductSelected", data)
  },
  ActionCacheOverlayMessageLaunchStore ({ commit }, data) {
    commit("mutationOverlayMessageLaunchStore", data)
  },
  ActionCacheOverlayMessageDeliveryDesatived ({ commit }, data) {
    commit("mutationOverlayMessageDeliveryDesatived", data)
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
