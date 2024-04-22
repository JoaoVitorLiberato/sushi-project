import { Module, GetterTree, ActionTree, MutationTree } from "vuex"
import { rootStateInterface } from "@/plugins/store/interfaces/rootStateInterface"
import { dialogStoreInterface } from "@/plugins/store/interfaces/dialogStoreInterface"

const moduleCache = (): dialogStoreInterface => {
  return {
    dialogOverdrawerMenu: false,
    DialogTableSelected: false
  }
}

const state: dialogStoreInterface = moduleCache()

const getters: GetterTree<dialogStoreInterface, rootStateInterface> = {
  DialogOverdrawerMenu: ({ dialogOverdrawerMenu }) => () => {
    return dialogOverdrawerMenu
  },
  DialogTableSelected: ({ DialogTableSelected }) => () => {
    return DialogTableSelected
  }
}

const actions: ActionTree<dialogStoreInterface, rootStateInterface> = {
  ActionOverdrawerMenu: ({ commit }, data) => {
    commit("MutationOverdrawerMenu", data)
  },
  ActionTableSelected: ({ commit }, data) => {
    commit("MutationTableSelected", data)
  }
}

const mutations: MutationTree<dialogStoreInterface> = {
  MutationOverdrawerMenu: (state, data) => {
    state.dialogOverdrawerMenu = data
  },
  MutationTableSelected: (state, data) => {
    state.DialogTableSelected = data
  },
}

const dialogStoreModule: Module<dialogStoreInterface, rootStateInterface> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}

export {
  dialogStoreModule
}
