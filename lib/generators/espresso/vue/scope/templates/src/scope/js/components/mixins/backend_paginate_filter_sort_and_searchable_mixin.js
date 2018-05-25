/**
 * 提供分頁、Filter、排序、以及搜尋功能的 mixin
 *
 * 在 vue instance 引入此 mixin 後，需 override data 中的 `isUsingCreatedHook`、
 * `resourceType`、以及 `currentUrlPath`，並視情況 override 其他預設值。
 * TODO: 建立 option 可選擇是否開啟排序、filter 功能。（isSortable, isFilterable）
 */
import queryString from 'query-string'

export default {
  // components: {},

  // props: {},

  data() {
    return {
      resourceType: 'resourceType', //          [OPTION] resource 的 type，用於 `#fetchData` 中指定 vuex 的 module
      currentUrlPath: '/absolute/path', //      [OPTION] 當前頁面的絕對路徑，於更新 URL 時使用

      // 預設值
      currentPage: 1, //                                當前頁碼
      pageSize: 25, //                                  每頁數量
      sortOrder: 'desc', //                             排序方向
      sortField: 'created_at', //                       排序欄位
      currentFilter: 0, //                              Filter
      availableFilters: ['example1', 'example2'], //    可用的 filters 列表
      isSearchOptionsOpen: false, //                    可用來控制搜尋表單的開關
      searchOptions: {} //                              搜尋選項，物件內容須依需要自行 override
    }
  },

  computed: {
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
      if (this.sortOrder === null) {
        return ''
      }
      if (this.sortOrder === 'desc') {
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
    },

    /**
     * 將目前 data 中的 options 組合為 vuex 可接受的正規化格式
     *
     */
    currentOptions() {
      return {
        pageNumber: this.currentPage,
        pageSize: this.pageSize,
        sort: this.sortOrderValue,
        filter: this.availableFilters[this.currentFilter],
        search: this.searchOptions
      }
    }
  },

  methods: {
    /**
     * 這個方法會用於 Vue instance created hook 中。在 created 後檢查當前的 URL 所給
     * 的 query options。若 URL 有指定的 query options，則把 `page[number]`、`page[size]`
     * 和 `sort` 的值複寫至 instance 中；若 URL 沒有指定 query options，則使用 data 中設定
     * 的預設值。
     *
     * @returns {Object} query options
     */
    checkCurrentQueryStringOptionsFromURL() {
      let currentQueryString = queryString.parse(window.location.search)
      let options = {
        pageNumber: parseInt(currentQueryString['page[number]']) || this.currentPage,
        pageSize: parseInt(currentQueryString['page[size]']) || this.pageSize,
        sort: currentQueryString['sort'] || this.sortOrderValue,
        filter: currentQueryString['filter'] || this.availableFilters[this.currentFilter],
        search: this.parseSearchOptionsFromURL(currentQueryString) || this.searchOptions
      }

      if (this.parseSearchOptionsFromURL(currentQueryString)) {
        this.isSearchOptionsOpen = true
      }

      this.updateQueryOptions(options)

      return options
    },

    /**
     * 把 param 給的 query options 內容更新至 data 中。
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
    },

    /**
     * 切換分頁的 handler。可指定要切換到第幾頁，重新透過 API 取得資料，並透過 pushState
     * 更新 URL。
     *
     * @param {number} page 目標頁碼
     */
    onPageChange(page) {
      let options = {
        pageNumber: page,
        pageSize: this.pageSize,
        sort: this.sortOrderValue,
        filter: this.availableFilters[this.currentFilter],
        search: this.searchOptions
      }
      this.fetchData(options)
      this.updateQueryString(options)
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
      let options = {
        pageNumber: this.currentPage,
        pageSize: this.pageSize,
        sort: this.sortOrderValue,
        filter: this.availableFilters[this.currentFilter],
        search: this.searchOptions
      }

      this.fetchData(options)
      this.updateQueryString(options)
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
      let options = {
        pageNumber: this.currentPage,
        pageSize: this.pageSize,
        sort: this.sortOrderValue,
        filter: this.availableFilters[this.currentFilter],
        search: this.searchOptions
      }

      this.fetchData(options)
      this.updateQueryString(options)
    },

    onSearchHandler() {
      let options = {
        pageNumber: this.currentPage,
        pageSize: this.pageSize,
        sort: this.sortOrderValue,
        filter: this.availableFilters[this.currentFilter],
        search: this.searchOptions
      }

      this.fetchData(options)
      this.updateQueryString(options)
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
     * =========================================================================
     * 《請依照需要，在 vue instance 中 override 這個方法，提供正確的 Path》
     * =========================================================================
     *
     * @param {Object} options query options
     */
    updateQueryString(options) {
      let result = ''

      if (options.pageNumber) {
        result += `&page[number]=${options.pageNumber}`
      }
      if (options.pageSize) {
        result += `&page[size]=${options.pageSize}`
      }
      if (options.sort) {
        result += `&sort=${options.sort}`
      }
      if (options.filter) {
        result += `&filter=${options.filter}`
      }
      if (this.parsedSearchOptions) {
        result += `&${this.parsedSearchOptions}`
      }
      if (result[0] === '&') {
        result = result.substr(1)
      }

      this.$store.dispatch('updateQueryString', {
        options,
        newQueryString: `${this.currentUrlPath}?${result}`
      })
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
      // this.updateQueryString(options) // remove this can make [onpopstate] work correctlly with turbolinks, do not know why...

      window.onpopstate = event => {
        this.fetchData(event.state)
        this.$store.dispatch('updateQueryStringFromURL')
      }
    }
  }
}
