import * as types from './mutation-types'
import queryString from 'query-string'

export default {
  [types.SET_FLASH_MESSAGES](state, messages) {
    state.flashMessages = messages
  },

  [types.ADD_FLASH_MESSAGES](state, message) {
    state.flashMessages.push(message)
  },

  [types.CLEAR_FLASH_MESSAGES](state) {
    state.flashMessages = []
  },

  [types.UPDATE_QUERY_STRING](state) {
    state.queryString = queryString.parse(window.location.search)
  },
}
