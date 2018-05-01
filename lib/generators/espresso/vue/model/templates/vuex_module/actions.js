import * as types from './mutation-types'
import <%= model_class_name %> from '../../resource_models/<%= model_name.underscore %>'

/**
 * 從 Server 取得所有 Resource
 *
 * @param {object} options 可傳入 paginate options 或其他 filter 功能。
 *
 * @returns {promise} response or errors
 */
export const all = ({ dispatch, commit }, options) => {
  commit(types.API_REQUEST_START, 'all')

  return new Promise((resolve, reject) => {
    <%= model_class_name %>.all(options)
      .then(response => {
        commit(types.FETCH_<%= mutation_name_pluralized %>_SUCCESS, response)

        resolve(response)
      })
      .catch(errors => {
        commit(types.API_REQUEST_FAIL, errors)
        dispatch('errorMessageHandler', errors, { root: true })

        reject(errors)
      })
  })
}

/**
 * 從 Server 取得一個特定 Resource
 *
 * @param {number} id 指定的 resource ID
 * @returns {promise} response or errors
 */
export const find = ({ dispatch, commit }, id) => {
  commit(types.API_REQUEST_START, 'find')

  return new Promise((resolve, reject) => {
    <%= model_class_name %>.find(id)
      .then(response => {
        commit(types.GET_<%= mutation_name %>_SUCCESS, response)

        resolve(response)
      })
      .catch(errors => {
        commit(types.API_REQUEST_FAIL, errors)
        dispatch('errorMessageHandler', errors, { root: true })

        reject(errors)
      })
  })
}

/**
 * 將 Resource 資料儲存到 Server。新資料會 create, 舊資料則 update。
 *
 * @param {object} resource JSON:API 規格的 request body
 * @returns {promise} response or errors
 */
export const save = ({ dispatch, commit }, model) => {
  commit(types.API_REQUEST_START, 'save')

  return new Promise((resolve, reject) => {
    model.save()
      .then(response => {
        if (model.isNewRecord()) {
          commit(types.ADD_<%= mutation_name %>_SUCCESS, response)
        } else {
          commit(types.UPDATE_<%= mutation_name %>_SUCCESS, response)
        }

        resolve(response)
      })
      .catch(errors => {
        model.errors.record(errors)
        commit(types.API_REQUEST_FAIL, errors)
        dispatch('errorMessageHandler', errors, { root: true })

        reject(errors)
      })
  })
}

/**
 * 從 Server 刪除一筆 resource
 *
 * @param {number} id 指定的 resource ID
 * @returns {promise} response or errors
 */
export const destroy = ({ dispatch, commit }, model) => {
  commit(types.API_REQUEST_START, 'destroy')

  return new Promise((resolve, reject) => {
    model.destroy()
      .then(response => {
        commit(types.DELETE_<%= mutation_name %>_SUCCESS, model.id)

        resolve(response)
      })
      .catch(errors => {
        model.errors.record(errors)
        commit(types.API_REQUEST_FAIL, errors)
        dispatch('errorMessageHandler', errors, { root: true })

        reject(errors)
      })
  })
}

/**
 * 收到多筆其他 resource 的 relationships
 *
 * @param {object} response axios response object
 * @returns {promise} response or errors
 */
export const receiveResourcesFromRelationships = ({ commit }, response) => {
  return new Promise((resolve, reject) => {
    commit(types.GET_RELATED_<%= mutation_name_pluralized %>_SUCCESS, response)

    resolve(response)
  })
}

/**
 * 收到單筆其他 resource 的 relationship
 *
 * @param {object} response axios response object
 * @returns {promise} response or errors
 */
export const getResourceFromRelationship = ({ commit }, response) => {
  return new Promise((resolve, reject) => {
    commit(types.GET_<%= mutation_name %>_SUCCESS, response)

    resolve(response)
  })
}
