import Vue from "vue/dist/vue.esm"
import Vuex from "vuex"
import * as getters from "./getters"
import * as actions from "./actions"
import mutations from "./mutations"
import queryString from "query-string"

Vue.use(Vuex)

const state = {
  flashMessages: [],
  queryString: queryString.parse(window.location.search)
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
