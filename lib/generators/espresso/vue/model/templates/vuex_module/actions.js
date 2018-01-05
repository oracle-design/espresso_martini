import * as types from './mutation-types'
import <%= model_name.classify %>Model from '../../resource_models/<%= model_name.underscore %>'

const <%= model_name.classify %> = new <%= model_name.classify %>Model

/**
 * 從 Server 取得所有 Resource
 *
 * @returns {promise} response or errors
 */
export const fetchAllResources = ({ dispatch, commit }) => {
  commit(types.FETCH_<%= model_name.underscore.pluralize.upcase %>_START)

  return new Promise((resolve, reject) => {
    <%= model_name.classify %>.index()
      .then(response => {
        commit(types.FETCH_<%= model_name.underscore.pluralize.upcase %>_SUCCESS, response)

        resolve(response)
      })
      .catch(errors => {
        commit(types.API_REQUEST_FAIL, errors)

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
export const getResource = ({ dispatch, commit }, id) => {
  commit(types.GET_<%= model_name.underscore.upcase %>_START)

  return new Promise((resolve, reject) => {
    <%= model_name.classify %>.show(id)
      .then(response => {
        commit(types.GET_<%= model_name.underscore.upcase %>_SUCCESS, response)

        resolve(response)
      })
      .catch(errors => {
        commit(types.API_REQUEST_FAIL, errors)

        reject(errors)
      })
  })
}

/**
 * 新增 Resource 到 Server
 *
 * @param {object} resource JSON:API 規格的 request body
 * @returns {promise} response or errors
 */
export const addResource = ({ dispatch, commit }, resource) => {
  commit(types.ADD_<%= model_name.underscore.upcase %>_START)

  return new Promise((resolve, reject) => {
    <%= model_name.classify %>.create(resource)
      .then(response => {
        commit(types.ADD_<%= model_name.underscore.upcase %>_SUCCESS, response)

        resolve(response)
      })
      .catch(errors => {
        commit(types.API_REQUEST_FAIL, errors)

        reject(errors)
      })
  })
}

/**
 * 從 Server 更新一筆 resource 的內容
 *
 * @param {object} resource JSON:API 規格的 request body
 * @returns {promise} response or errors
 */
export const updateResource = ({ dispatch, commit }, resource) => {
  commit(types.UPDATE_<%= model_name.underscore.upcase %>_START)

  return new Promise((resolve, reject) => {
    <%= model_name.classify %>.update(resource)
      .then(response => {
        commit(types.UPDATE_<%= model_name.underscore.upcase %>_SUCCESS, response)

        resolve(response)
      })
      .catch(errors => {
        commit(types.API_REQUEST_FAIL, errors)

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
export const deleteResource = ({ dispatch, commit }, id) => {
  commit(types.DELETE_<%= model_name.underscore.upcase %>_START)

  return new Promise((resolve, reject) => {
    <%= model_name.classify %>.destroy(id)
      .then(response => {
        commit(types.DELETE_<%= model_name.underscore.upcase %>_SUCCESS, id)

        resolve(response)
      })
      .catch(errors => {
        commit(types.API_REQUEST_FAIL, errors)

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
    commit(types.FETCH_<%= model_name.underscore.pluralize.upcase %>_SUCCESS, response)

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
    commit(types.GET_<%= model_name.underscore.upcase %>_SUCCESS, response)

    resolve(response)
  })
}
