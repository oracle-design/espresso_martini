import * as types from './mutation-types'
import <%= model_name.classify %>Model from '../../resource_models/<%= model_name.underscore %>'

const <%= model_name.classify %> = new <%= model_name.classify %>Model()

export default {
  [types.FETCH_<%= model_name.underscore.pluralize.upcase %>_START](state) {
    state.isCallingAPI = true
  },

  [types.FETCH_<%= model_name.underscore.pluralize.upcase %>_SUCCESS](state, response) {
    <%= model_name.classify %>.replaceEntities(state, response)

    state.isCallingAPI = false
  },

  [types.GET_RELATED_<%= model_name.underscore.pluralize.upcase %>_SUCCESS](state, response) {
    <%= model_name.classify %>.storeResourcesToEntities(state, response)

    state.isCallingAPI = false
  },

  [types.GET_<%= model_name.underscore.upcase %>_START](state) {
    state.isCallingAPI = true
  },

  [types.GET_<%= model_name.underscore.upcase %>_SUCCESS](state, response) {
    <%= model_name.classify %>.storeOneResourceToEntities(state, response)

    state.isCallingAPI = false
  },

  [types.ADD_<%= model_name.underscore.upcase %>_START](state) {
    state.isCallingAPI = true
  },

  [types.ADD_<%= model_name.underscore.upcase %>_SUCCESS](state, response) {
    <%= model_name.classify %>.storeOneResourceToEntities(state, response)
    <%= model_name.classify %>.pushResourceToResult(state, response)

    state.isCallingAPI = false
  },

  [types.UPDATE_<%= model_name.underscore.upcase %>_START](state) {
    state.isCallingAPI = true
  },

  [types.UPDATE_<%= model_name.underscore.upcase %>_SUCCESS](state, response) {
    <%= model_name.classify %>.storeOneResourceToEntities(state, response)

    state.isCallingAPI = false
  },

  [types.DELETE_<%= model_name.underscore.upcase %>_START](state) {
    state.isCallingAPI = true
  },

  [types.DELETE_<%= model_name.underscore.upcase %>_SUCCESS](state, id) {
    <%= model_name.classify %>.removeOneResourceFromEntities(state, id)

    state.isCallingAPI = false
  },

  [types.API_REQUEST_FAIL](state, errors) {
    state.errors.record(errors)
    state.isCallingAPI = false
  }
}
