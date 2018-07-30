/**
 * 提供分頁、Filter、排序、以及搜尋功能的 mixin
 *
 * 在 vue instance 引入此 mixin 後，需 override data 中的 `isUsingCreatedHook`、
 * `resourceType`、以及 `currentUrlPath`，並視情況 override 其他預設值。
 * TODO: 建立 option 可選擇是否開啟排序、filter 功能。（isSortable, isFilterable）
 */
import queryString from 'query-string'
import FetchingDataOptionsService from 'odd-fetching_data_options_service'
import merge from 'lodash.merge'

export default {
  // components: {},

  // props: {},

  data() {
    return {
      resourceType: 'resourceType', //          [OPTION] resource 的 type，用於 `#fetchData` 中指定 vuex 的 module

      // 預設值
      currentPage: 1, //                                當前頁碼
      pageSize: 25, //                                  每頁數量
      sortOrder: 'desc', //                             排序方向
      sortField: 'created_at', //                       排序欄位
      currentFilter: 0, //                              Filter
      availableFilters: [], //    可用的 filters 列表
      isSearchOptionsOpen: false, //                    可用來控制搜尋表單的開關
      searchOptions: {} //                              搜尋選項，物件內容須依需要自行 override
    }
  },

  computed: {
    currentPath() {
      return window.location.pathname
    },

    currentOptions() {
      return merge({
        pageNumber: this.currentPage,
        pageSize: this.pageSize,
        sort: this.sortOrderValue,
        filter: this.availableFilters[this.currentFilter],
        search: this.searchOptions
      }, this.additionalOptions)
    },

    // 可自行定義額外的 options
    additionalOptions() {
      // return {
      //   example: this.exampleValue
      // }
      return {}
    },

    /**
     * 計算出 `sort` 這個 key 的值。根據 JSONAPI 的規範，API 需要提供自訂排序的功能，在
     * URL 的設計上要以 `sort=attribute_name` 的形式表現。而預設是 ASC 排序，若是 DESC
     * 排序的話需要以 `sort=-attribute_name` 的形式表現，在最前面加上 `-` 號。
     *
     * 這個方法可以透過 sortOrder 和 sortField 的內容，回傳符合規格的 sort 值。
     *
     * @returns {string}
     */
    sortOrderValue() {
      if (this.sortOrder == 'desc') {
        return `-${this.sortField}`
      } else {
        return `${this.sortField}`
      }
    },

    /**
     * 把所有 searchOptions 排列為 API 可接受的 query string
     *
     * @returns {string}
     */
    parsedSearchOptions() {
      const searchOptionKeys = Object.keys(this.searchOptions)
      let result = ''

      searchOptionKeys.forEach(element => {
        if (this.searchOptions[element]) {
          result += `&q[${element}]=${this.searchOptions[element]}`
        }
      })

      return result
    },

    /**
     * 從 vuex 中取得 meta 中的 total_count
     *
     * @returns {number}
     */
    totalCount() {
      return this.$store.getters[`${this.resourceType}/meta`].total_count
    },

    /**
     * 從 vuex 中取得 isCallingAPI 的值
     *
     * @returns {boolean}
     */
    isLoading() {
      return this.$store.getters[`${this.resourceType}/isLoading`]
    }
  },

  methods: {
    /**
     * 這個方法會在初始化過程中使用。在初始化時先檢查當前的 URL 所給
     * 的 query options。若 URL 有指定的 query options，會把 `page[number]`、`page[size]`
     * 和 `sort` 的值複寫至 instance 中；若 URL 沒有指定 query options，則使用 data 中設定
     * 的預設值送出 API 取得資料。
     *
     * @returns {Object} query options
     */
    checkCurrentQueryStringOptionsFromURL() {
      let currentQueryString = queryString.parse(window.location.search)
      let options = merge({
        pageNumber: parseInt(currentQueryString['page[number]']) || this.currentPage,
        pageSize: parseInt(currentQueryString['page[size]']) || this.pageSize,
        sort: currentQueryString['sort'] || this.sortOrderValue,
        filter: currentQueryString['filter'] || this.availableFilters[this.currentFilter],
        search: this.parseSearchOptionsFromURL(currentQueryString) || this.searchOptions
      }, this.checkAdditionalOptionsFromUrl(currentQueryString))

      if (this.parseSearchOptionsFromURL(currentQueryString)) {
        this.isSearchOptionsOpen = true
      }

      this.updateQueryOptions(options)

      return options
    },

    /**
     * 定義如何從 QueryString 中取得額外定義的 options
     *
     * @param {Object} currentQueryString
     * @returns {Object}
     */
    checkAdditionalOptionsFromUrl(currentQueryString) {
      // return {
      //   example: currentQueryString['example'] || this.exampleValue
      // }

      return {}
    },

    /**
     * 把 queryString 給的 query options 內容更新至 data 中。
     *
     * @param {any} options query options
     */
    updateQueryOptions(options) {
      this.currentPage = options.pageNumber
      this.pageSize = options.pageSize
      this.currentFilter = this.availableFilters.indexOf(options.filter)
      this.searchOptions = options.search

      if (options.sort.charAt(0) == '-') {
        this.sortOrder = 'desc'
        this.sortField = options.sort.slice(1)
      } else {
        this.sortOrder = 'asc'
        this.sortField = options.sort
      }

      this.updateQueryOptionsForAdditionalOptions(options)
    },

    updateQueryOptionsForAdditionalOptions(options) {
      // this.exampleValue = options.example
    },

    /**
     * 切換分頁的 handler。可指定要切換到第幾頁，重新透過 API 取得資料，並透過 pushState
     * 更新 URL。
     *
     * @param {number} page 目標頁碼
     */
    onPageChange(page) {
      this.currentPage = page

      this.fetchData(this.currentOptions)
      this.updateQueryString(this.currentOptions)
    },

    /**
     * 變更排序選項的 handler。可依照指定的排序重新透過 API 取得資料，並透過 pushState
     * 更新 URL。
     *
     * @param {string} field
     * @param {string} order
     */
    onSort(field, order) {
      this.sortField = field
      this.sortOrder = order

      this.fetchData(this.currentOptions)
      this.updateQueryString(this.currentOptions)
    },

    /**
     * 變更 Filter 選項的 handler。可依照指定的 filter options 重新透過 API 取得資
     * 料，並透過 pushState 更新 URL。
     *
     * @param {number} index
     * @param {string} order
     */
    filterOnChangeHandler(index) {
      this.currentFilter = index

      this.fetchData(this.currentOptions)
      this.updateQueryString(this.currentOptions)
    },

    onSearchHandler() {
      this.fetchData(this.currentOptions)
      this.updateQueryString(this.currentOptions)
    },

    resetSearchOptions() {
      Object.keys(this.searchOptions).forEach(element => {
        this.searchOptions[element] = ''
      })

      this.onSearchHandler()
    },

    /**
     * 從 URL 的 query strings 中，找出與 search 有關的部分，嘗試轉換為可放到 data `searchOptions` 中的 js Object 形式。
     * （以 `ransack` gem 定義的 param 格式 `q[search_matcher]=key_word` 為準）
     *
     * @param {any} queryStringObj query-string package parse 出來的 queryString Object，會包含 URL 中所有的 query string
     * @returns {boolean|Object} 若有找到有效的 search option，會回傳 search options object，若沒有的話回傳 false
     */
    parseSearchOptionsFromURL(queryStringObj) {
      const searchOptionKeys = Object.keys(queryStringObj).filter(key => key.substring(0, 2) === 'q[')
      let newSearchOptions = {}

      searchOptionKeys.forEach(element => {
        if (queryStringObj[element]) {
          newSearchOptions[element.slice(2, -1)] = queryStringObj[element]
        }
      })

      if (Object.keys(newSearchOptions).length > 0) {
        return newSearchOptions
      } else {
        return false
      }
    },

    /**
     * 根據 query options 來從 API 取得資料。
     * =========================================================================
     * 《請依照需要，在 vue instance 中 override 這個方法，提供正確的 vuex actions》
     * =========================================================================
     *
     * @param {Object} options query options
     */
    fetchData(options) {
      this.currentPage = options.pageNumber
      this.$store.dispatch(`${this.resourceType}/all`, options)
    },

    /**
     * 把 query options 的內容透過 push state 更新至 URL。並更新 vuex 中 queryString 的內容。
     *
     * @param {Object} options query options
     */
    updateQueryString(options) {
      let result = FetchingDataOptionsService.call(options) + this.additionalOptionsToQueryString(options)

      this.$store.dispatch('updateQueryString', {
        options,
        newQueryString: `${this.currentPath}?${result}`
      })
    },

    /**
     * 定義額外 Options 的 QueryString 格式，會自動加入最後的結果更新至 Url。
     *
     * @param {*} options
     * @returns {String}
     */
    additionalOptionsToQueryString(options) {
      let result = ''

      // result += `&example=${options.example}`

      return result
    },

    /*
     * 獲取此頁面需要的初始資料
     *
     * 在 `options` 變數的賦值過程中檢是否當前的 URL 有給自訂設定，若沒有則使用在 data
     * 中指定的預設值。接著透過 vuex action 從 Server 取得資料，然後同樣透過 vuex
     * action 更新 queryString 的內容與 URL。
     *
     * 最後，監聽 `window.onpopstate` 事件，若發生時（使用者使用瀏覽器的上一頁或下一頁功能）
     * 重新取得正確的資料，並更新 vuex store 中 queryString 為當前 URL 的內容。
     */
    fetchingInitialData() {
      let options = this.checkCurrentQueryStringOptionsFromURL()

      this.fetchData(options)
      // this.updateQueryString(options) // remove this can make [onpopstate] work correctly with turbolinks, do not know why...

      window.onpopstate = event => {
        this.fetchData(event.state)
        this.$store.dispatch('updateQueryStringFromURL')
      }
    }
  }
}
