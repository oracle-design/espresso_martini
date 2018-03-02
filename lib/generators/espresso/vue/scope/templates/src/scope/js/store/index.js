import Vue from "vue/dist/vue.esm"
import Vuex from "vuex"
import * as getters from "./getters"
import * as actions from "./actions"
import mutations from "./mutations"

Vue.use(Vuex)

const state = {
  flashMessages: [],
  queryString: {}
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
