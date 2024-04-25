import { Module, GetterTree, ActionTree, MutationTree } from "vuex"
import { rootStateInterface } from "@/plugins/store/interfaces/rootStateInterface"
import { cacheStoreInterface } from "@/plugins/store/interfaces/cacheStoreInterface"

const moduleCache = (): cacheStoreInterface => {
  return {
    cache: {},
    overdrawerMenu: false,
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
}

const actions: ActionTree<cacheStoreInterface, rootStateInterface> = {
  setCache ({ commit }, { data, value }) {
    commit("mutationCache", { data, value })
  },
  ActionCacheOverdrawerMenu ({ commit }, data) {
    commit("mutationCacheOverdrawerMenu", data)
  }
}

const mutations: MutationTree<cacheStoreInterface> = {
  mutationCache ({ cache }, { data, value }) {
    cache[data] = value
  },
  mutationCacheOverdrawerMenu (state, data) {
    state.overdrawerMenu = data
  }
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
