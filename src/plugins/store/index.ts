import Vue from "vue"
import Vuex, { StoreOptions } from "vuex"

import { rootStateInterface } from "@/plugins/store/interfaces/rootStateInterface"
import { cacheStoreModule } from "@/plugins/store/cacheStore/cacheStoreModule"
import { dialogStoreModule } from "@/plugins/store/cacheStore/dialogStoreModule"

Vue.use(Vuex)

const store: StoreOptions<rootStateInterface> = {
  strict: false,
  modules: {
    cacheStoreModule,
    dialogStoreModule
  },
}

export default new Vuex.Store<rootStateInterface>(store)
