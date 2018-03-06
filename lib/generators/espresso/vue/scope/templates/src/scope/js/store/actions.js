import * as types from './mutation-types'

export const setFlashMessages = ({ commit }, messages) => {
  commit(types.SET_FLASH_MESSAGES, messages)
}

export const addFlashMessage = ({ commit }, message) => {
  commit(types.ADD_FLASH_MESSAGES, message)
}

export const clearFlashMessages = ({ commit }) => {
  commit(types.CLEAR_FLASH_MESSAGES)
}

/**
 * 用 pushState 更新 URL，同時更新 queryString 的內容
 *
 * @param {Object} options 提供 `window.onpopstate` 使用，傳入的物件內容會包含在 popState event 的 state
 * @param {string} newQueryString 新的 URL path，盡量使用完整的絕對路徑比較不容易出錯。
 */
export const updateQueryString = ({ commit }, { options, newQueryString }) => {
  let title = document.title

  window.history.pushState(options, title, newQueryString)
  commit(types.UPDATE_QUERY_STRING)
}

/**
 * 重新把當前的 URL Query string 放到 vuex store 中。通常是給 window.onpopstate 使用的。
 */
export const updateQueryStringFromURL = ({ commit }) => {
  commit(types.UPDATE_QUERY_STRING)
}
