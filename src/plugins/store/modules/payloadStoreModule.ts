import { Module, GetterTree, ActionTree, MutationTree } from "vuex"
import { rootStateInterface } from "@/plugins/store/interfaces/rootStateInterface"
import PAYLOAD_DEFAULT from "@/data/payload/payloadDefault.json"

const moduleCache = (): typeof PAYLOAD_DEFAULT => {
  return PAYLOAD_DEFAULT
}

const state: typeof PAYLOAD_DEFAULT = moduleCache()

const getters: GetterTree<typeof PAYLOAD_DEFAULT, rootStateInterface> = {
  getPayloadOrder: (state) => (key:string) => {
    if (state && state[key]) state[key]
    return state
  },
}

const mutations: MutationTree<typeof PAYLOAD_DEFAULT> = {
  mutationPayloadCostumerName (state, data) {
    state.consumidor.nome = data
  },
  mutationPayloadCostumerPhone (state, data) {
    state.consumidor.telefone.contato = data
  },
  mutationPayloadCostumerAddressCEP (state, data) {
    state.consumidor.endereco.cep = data
  },
  mutationPayloadCostumerStreetAddress (state, data) {
    state.consumidor.endereco.logradouro = data
  }
}

const actions: ActionTree<typeof PAYLOAD_DEFAULT, rootStateInterface> = {
  actionPayloadCostumerName ({ commit }, data) {
    commit("mutationPayloadCostumerName", data)
  },
  actionPayloadCostumerPhone ({ commit }, data) {
    commit("mutationPayloadCostumerPhone", data)
  },
  actionPayloadCostumerAddressCEP ({ commit }, data) {
    commit("mutationPayloadCostumerAddressCEP", data)
  },
  actionPayloadCostumerStreetAddress ({ commit }, data) {
    commit("mutationPayloadCostumerStreetAddress", data)
  }
}

const payloadStoreModule: Module<typeof PAYLOAD_DEFAULT, rootStateInterface> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}

export {
  payloadStoreModule
}
