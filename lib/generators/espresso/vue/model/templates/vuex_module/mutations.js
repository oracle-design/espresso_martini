import * as types from './mutation-types'
import MutationHelpers from '../mutation_helpers'

const helpers = new MutationHelpers('<%= resource_type %>')

export default {
  [types.FETCH_<%= mutation_name_pluralized %>_START](state) {
    state.isCallingAPI = true
  },

  [types.FETCH_<%= mutation_name_pluralized %>_SUCCESS](state, response) {
    helpers.replaceEntities(state, response)

    state.isCallingAPI = false
  },

  [types.GET_RELATED_<%= mutation_name_pluralized %>_SUCCESS](state, response) {
    helpers.storeResourcesToEntities(state, response)

    state.isCallingAPI = false
  },

  [types.GET_<%= mutation_name %>_START](state) {
    state.isCallingAPI = true
  },

  [types.GET_<%= mutation_name %>_SUCCESS](state, response) {
    helpers.storeOneResourceToEntities(state, response)

    state.isCallingAPI = false
  },

  [types.ADD_<%= mutation_name %>_START](state) {
    state.isCallingAPI = true
  },

  [types.ADD_<%= mutation_name %>_SUCCESS](state, response) {
    helpers.storeOneResourceToEntities(state, response)
    helpers.pushResourceToResult(state, response)

    state.isCallingAPI = false
  },

  [types.UPDATE_<%= mutation_name %>_START](state) {
    state.isCallingAPI = true
  },

  [types.UPDATE_<%= mutation_name %>_SUCCESS](state, response) {
    helpers.storeOneResourceToEntities(state, response)

    state.isCallingAPI = false
  },

  [types.DELETE_<%= mutation_name %>_START](state) {
    state.isCallingAPI = true
  },

  [types.DELETE_<%= mutation_name %>_SUCCESS](state, id) {
    helpers.removeOneResourceFromEntities(state, id)

    state.isCallingAPI = false
  },

  [types.API_REQUEST_FAIL](state, errors) {
    state.errors.record(errors)
    state.isCallingAPI = false
  }
}
