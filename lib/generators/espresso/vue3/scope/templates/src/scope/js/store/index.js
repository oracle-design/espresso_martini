import Vue from 'vue/dist/vue.esm'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'
import CurrentUserAssignService from '../../../shared/services/current_user_assign_service'

Vue.use(Vuex)

const state = {
  currentUser: CurrentUserAssignService.call('<%= normalized_scope_name %>'),
  flashMessages: [],
  queryString: {},
  retryCounter: 0,
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
