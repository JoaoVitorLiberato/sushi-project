import { Module, GetterTree, ActionTree, MutationTree } from "vuex"
import { rootStateInterface } from "@/plugins/store/interfaces/rootStateInterface"
import PAYLOAD_DEFAULT from "@/data/payload/payloadDefault.json"

const moduleCache = (): typeof PAYLOAD_DEFAULT => {
  return PAYLOAD_DEFAULT
}

const state: typeof PAYLOAD_DEFAULT = moduleCache()

const getters: GetterTree<typeof PAYLOAD_DEFAULT, rootStateInterface> = {
  PayloadOrder: (state) => (key:string) => {
    if (key && state[key]) return state[key]
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
  },
  mutationPayloadCostumerNumberAddress (state, data) {
    state.consumidor.endereco.numero = data
  },
  mutationPayloadCostumerComplementyAddress (state, data) {
    state.consumidor.endereco.complemento = data
  },
  mutationPayloadCostumerReferenceAddress (state, data) {
    state.consumidor.endereco.referencia = data
  },
  mutationPayloadCostumerDistrictAddress (state, data) {
    state.consumidor.endereco.bairro = data
  },
  mutationPayloadCostumerCityAddress (state, data) {
    state.consumidor.endereco.cidade = data
  },
  mutationPayloadCostumerStateAddress (state, data) {
    state.consumidor.endereco.uf = data
  },
  mutationPayloadPaymentFrete (state, data) {
    state.pagamento.valorFrete = data
  },
  mutationPayloadPaymentPriceTotal (state, data) {
    state.pagamento.valorTotal = data
  },
  mutationPayloadFormPayment (state, data) {
    state.pagamento.formaPagamento = data
  },
  mutationPayloadCostumerMessage (state, data) {
    state.consumidor.mensagem = data
  },
  mutationPayloadSegment (state, data) {
    state.segmento = data
  },
  mutationPayloadProducts (state, data) {
    state.produtos = data
  },
  mutationPaymentDiscount (state, data) {
    state.pagamento.desconto = {
      porcentagem: data.porcentagem,
      PrecoTotalComDesconto: data.PrecoTotalComDesconto
    }
  },
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
  },
  actionPayloadCostumerNumberAddress ({ commit }, data) {
    commit("mutationPayloadCostumerNumberAddress", data)
  },
  actionPayloadCostumerComplementyAddress ({ commit }, data) {
    commit("mutationPayloadCostumerComplementyAddress", data)
  },
  actionPayloadCostumerReferenceAddress ({ commit }, data) {
    commit("mutationPayloadCostumerReferenceAddress", data)
  },
  actionPayloadCostumerDistrictAddress ({ commit }, data) {
    commit("mutationPayloadCostumerDistrictAddress", data)
  },
  actionPayloadCostumerCityAddress ({ commit }, data) {
    commit("mutationPayloadCostumerCityAddress", data)
  },
  actionPayloadCostumerStateAddress ({ commit }, data) {
    commit("mutationPayloadCostumerStateAddress", data)
  },
  actionPayloadPaymentFrete ({ commit }, data) {
    commit("mutationPayloadPaymentFrete", data)
  },
  actionPayloadFormPayment ({ commit }, data) {
    commit("mutationPayloadFormPayment", data)
  },
  actionPayloadPriceTotal ({ commit }, data) {
    commit("mutationPayloadPaymentPriceTotal", data)
  },
  actionPayloadCostumerMessage ({ commit }, data) {
    commit("mutationPayloadCostumerMessage", data)
  },
  actionPayloadSegment ({ commit }, data) {
    commit("mutationPayloadSegment", data)
  },
  actionPayloadProducts ({ commit }, data) {
    commit("mutationPayloadProducts", [...data])
  },
  actionPayloadPaymentDiscount ({ commit }, data) {
    commit("mutationPaymentDiscount", data)
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
