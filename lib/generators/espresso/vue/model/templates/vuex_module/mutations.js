import * as types from './mutation-types'
import MutationHelpers from '../mutation_helpers'

const helpers = new MutationHelpers('<%= model_name.underscore.pluralize %>')

export default {
  [types.FETCH_<%= model_name.underscore.pluralize.upcase %>_START](state) {
    state.isCallingAPI = true
  },

  [types.FETCH_<%= model_name.underscore.pluralize.upcase %>_SUCCESS](state, response) {
    <%= model_name.classify %>.replaceEntities(state, response)

    state.isCallingAPI = false
  },

  [types.GET_RELATED_<%= model_name.underscore.pluralize.upcase %>_SUCCESS](state, response) {
    helpers.storeResourcesToEntities(state, response)

    state.isCallingAPI = false
  },

  [types.GET_<%= model_name.underscore.upcase %>_START](state) {
    state.isCallingAPI = true
  },

  [types.GET_<%= model_name.underscore.upcase %>_SUCCESS](state, response) {
    helpers.storeOneResourceToEntities(state, response)

    state.isCallingAPI = false
  },

  [types.ADD_<%= model_name.underscore.upcase %>_START](state) {
    state.isCallingAPI = true
  },

  [types.ADD_<%= model_name.underscore.upcase %>_SUCCESS](state, response) {
    helpers.storeOneResourceToEntities(state, response)
    helpers.pushResourceToResult(state, response)

    state.isCallingAPI = false
  },

  [types.UPDATE_<%= model_name.underscore.upcase %>_START](state) {
    state.isCallingAPI = true
  },

  [types.UPDATE_<%= model_name.underscore.upcase %>_SUCCESS](state, response) {
    helpers.storeOneResourceToEntities(state, response)

    state.isCallingAPI = false
  },

  [types.DELETE_<%= model_name.underscore.upcase %>_START](state) {
    state.isCallingAPI = true
  },

  [types.DELETE_<%= model_name.underscore.upcase %>_SUCCESS](state, id) {
    helpers.removeOneResourceFromEntities(state, id)

    state.isCallingAPI = false
  },

  [types.API_REQUEST_FAIL](state, errors) {
    state.errors.record(errors)
    state.isCallingAPI = false
  }
}
