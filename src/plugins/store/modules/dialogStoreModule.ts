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
    dialogRegisterEmployee: false,
    dialogRegisterProduct: false,
    dialogTryAgain: false,
    dialogRegisterComplement: false,
    dialogGetCommentsProduct: false,
    dialogOpenStore: false,
    dialogStoreClosed: false,
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
  DialogRegisterEmployee: ({ dialogRegisterEmployee }) => () => {
    return dialogRegisterEmployee
  },
  DialogRegisterProduct: ({ dialogRegisterProduct }) => () => {
    return dialogRegisterProduct
  },
  DialogTryAgain: ({ dialogTryAgain }) => () => {
    return dialogTryAgain
  },
  DialogRegisterComplement: ({ dialogRegisterComplement }) => () => {
    return dialogRegisterComplement
  },
  DialogGetCommentsProduct: ({ dialogGetCommentsProduct }) => () => {
    return dialogGetCommentsProduct
  },
  DialogOpenStore: ({ dialogOpenStore }) => () => {
    return dialogOpenStore
  },
  DialogStoreClosed: ({ dialogStoreClosed }) => () => {
    return dialogStoreClosed
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
  },
  MutationRegisterEmployee (state, data) {
    state.dialogRegisterEmployee = data
  },
  MutationRegisterProduct (state, data) {
    state.dialogRegisterProduct = data
  },
  MutationTryAgain (state, data) {
    state.dialogTryAgain = data
  },
  MutationRegisterComplement (state, data) {
    state.dialogRegisterComplement = data
  },
  MutationGetCommentsProduct (state, data) {
    state.dialogGetCommentsProduct = data
  },
  MutationOpenStore (state, data) {
    state.dialogOpenStore = data
  },
  MutationStoreClose (state, data) {
    state.dialogStoreClosed = data
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
  ActionDialogRegisterEmployee ({ commit }, data) {
    commit("MutationRegisterEmployee", data)
  },
  ActionDialogRegisterProduct ({ commit }, data) {
    commit("MutationRegisterProduct", data)
  },
  ActionDialogTryAgain ({ commit }, data) {
    commit("MutationTryAgain", data)
  },
  ActionDialogRegisterComplement ({ commit }, data) {
    commit("MutationRegisterComplement", data)
  },
  ActionDialogGetCommentsProduct ({ commit }, data) {
    commit("MutationGetCommentsProduct", data)
  },
  ActionDialogOpenStore ({ commit }, data) {
    commit("MutationOpenStore", data)
  },
  ActionDialogStoreClosed ({ commit }, data) {
    commit("MutationStoreClose", data)
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
