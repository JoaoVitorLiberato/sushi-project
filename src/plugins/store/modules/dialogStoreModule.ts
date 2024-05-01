import { Module, GetterTree, ActionTree, MutationTree } from "vuex"
import { rootStateInterface } from "@/plugins/store/interfaces/rootStateInterface"
import { dialogStoreInterface } from "@/plugins/store/interfaces/dialogStoreInterface"

const moduleCache = (): dialogStoreInterface => {
  return {
    DialogTableSelected: false,
    dialogServiceClient: false,
    dialogCepDelivery: false,
    dialogOrdersClient: false,
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
  DialogCepDelivery: ({ dialogCepDelivery }) => () => {
    return dialogCepDelivery
  },
  DialogOrdersClient: ({ dialogOrdersClient }) => () => {
    return dialogOrdersClient
  },
}

const actions: ActionTree<dialogStoreInterface, rootStateInterface> = {
  ActionTableSelected ({ commit }, data) {
    commit("MutationTableSelected", data)
  },
  ActionServiceClient ({ commit }, data) {
    commit("MutationServiceClient", data)
  },
  ActionCepDelivery ({ commit }, data) {
    commit("MutationCepDelivery", data)
  },
  ActionOrdersClient ({ commit }, data) {
    commit("MutationOrdersClient", data)
  }
}

const mutations: MutationTree<dialogStoreInterface> = {
  MutationTableSelected (state, data) {
    state.DialogTableSelected = data
  },
  MutationServiceClient (state, data) {
    state.dialogServiceClient = data
  },
  MutationCepDelivery (state, data) {
    state.dialogCepDelivery = data
  },
  MutationOrdersClient (state, data) {
    state.dialogOrdersClient = data
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
