import * as types from './mutation-types'

export default {
  [types.SET_FLASH_MESSAGES](state, messages) {
    state.flashMessages = messages
  },

  [types.ADD_FLASH_MESSAGES](state, message) {
    state.flashMessages.push(message)
  },

  [types.CLEAR_FLASH_MESSAGES](state) {
    state.flashMessages = []
  }
}
