import { Module, GetterTree, ActionTree, MutationTree } from "vuex"
import { rootStateInterface } from "@/plugins/store/interfaces/rootStateInterface"
import { dialogStoreInterface } from "@/plugins/store/interfaces/dialogStoreInterface"

const moduleCache = (): dialogStoreInterface => {
  return {
    DialogTableSelected: false,
    dialogServiceClient: false,
  }
}

const state: dialogStoreInterface = moduleCache()

const getters: GetterTree<dialogStoreInterface, rootStateInterface> = {
  DialogTableSelected: ({ DialogTableSelected }) => () => {
    return DialogTableSelected
  },
  DialogServiceClient: ({ dialogServiceClient }) => () => {
    return dialogServiceClient
  },
}

const actions: ActionTree<dialogStoreInterface, rootStateInterface> = {
  ActionTableSelected ({ commit }, data) {
    commit("MutationTableSelected", data)
  },
  ActionServiceClient ({ commit }, data) {
    commit("MutationServiceClient", data)
  }
}

const mutations: MutationTree<dialogStoreInterface> = {
  MutationTableSelected (state, data) {
    state.DialogTableSelected = data
  },
  MutationServiceClient (state, data) {
    state.dialogServiceClient = data
  }
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
