import { Module, GetterTree, ActionTree, MutationTree } from "vuex"
import { rootStateInterface } from "@/plugins/store/interfaces/rootStateInterface"
import { dialogStoreInterface } from "@/plugins/store/interfaces/dialogStoreInterface"

const moduleCache = (): dialogStoreInterface => {
  return {
    dialogServiceClient: false,
    dialogCepDelivery: false,
    dialogOrdersClient: false,
    dialogComplements: false,
    dialogCommentsCostumers: false,
    dialogSearchOrderClient: false,
  }
}

const state: dialogStoreInterface = moduleCache()

const getters: GetterTree<dialogStoreInterface, rootStateInterface> = {
  DialogServiceClient: ({ dialogServiceClient }) => () => {
    return dialogServiceClient
  },
  DialogCepDelivery: ({ dialogCepDelivery }) => () => {
    return dialogCepDelivery
  },
  DialogOrdersClient: ({ dialogOrdersClient }) => () => {
    return dialogOrdersClient
  },
  DialogComplements: ({ dialogComplements }) => () => {
    return dialogComplements
  },
  DialogCommentsCostumers: ({ dialogCommentsCostumers }) => () => {
    return dialogCommentsCostumers
  },
  DialogSearchOrderClient: ({ dialogSearchOrderClient }) => () => {
    return dialogSearchOrderClient
  },
}

const mutations: MutationTree<dialogStoreInterface> = {
  MutationServiceClient (state, data) {
    state.dialogServiceClient = data
  },
  MutationCepDelivery (state, data) {
    state.dialogCepDelivery = data
  },
  MutationOrdersClient (state, data) {
    state.dialogOrdersClient = data
  },
  MutationComplements (state, data) {
    state.dialogComplements = data
  },
  MutationCommentsCostumers (state, data) {
    state.dialogCommentsCostumers = data
  },
  MutationSearchOrderClient (state, data) {
    state.dialogSearchOrderClient = data
  }
}

const actions: ActionTree<dialogStoreInterface, rootStateInterface> = {
  ActionDialogServiceClient ({ commit }, data) {
    commit("MutationServiceClient", data)
  },
  ActionDialogCepDelivery ({ commit }, data) {
    commit("MutationCepDelivery", data)
  },
  ActionDialogOrdersClient ({ commit }, data) {
    commit("MutationOrdersClient", data)
  },
  ActionDialogComplements ({ commit }, data) {
    commit("MutationComplements", data)
  },
  ActionDialogCommentsCostumers ({ commit }, data) {
    commit("MutationCommentsCostumers", data)
  },
  ActionDialogSearchOrderClient ({ commit }, data) {
    commit("MutationSearchOrderClient", data)
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
