/**
 * @returns {boolean} 這個 module 是否正在與 API 溝通中
 */
export const isLoading = state => {
  return state.isCallingAPI
}

/**
 * 依照 server 回傳的排序列出所有 Resource
 * 若沒有 Resource 則不回傳
 *
 * @returns {array} 所有 Resource
 */
export const allResources = state => {
  if (state.result) {
    return state.result.map(id => state.entities[id])
  }
}

/**
 * 以 ID 在 vuex store 中尋找特定 Resource
 *
 * @param {number} id
 * @returns {object} Resource 物件
 */
export const findResourceById = state => id => {
  return state.entities[id]
}

/**
 * 回傳 state 中的 errors
 *
 * @returns {object} Errors 物件
 */
export const errors = state => {
  return state.errors
}
