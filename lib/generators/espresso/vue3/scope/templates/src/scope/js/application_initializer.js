import Vue from 'vue/dist/vue.esm'
import VueCompositionAPI from '@vue/composition-api'
import Buefy from 'buefy'
import VueLazyload from 'vue-lazyload'
import VueLocaleTranslator from '../../shared/plugins/vue_locale_translator.js'
import VueCommonHelpers from '../../shared/plugins/vue_common_helpers.js'
// import CurrentUserAssignService from '../../shared/services/current_user_assign_service'
import store from './store'
import cloneDeep from 'lodash.clonedeep'
import '../../../src/locale/zh-TW'
import moment from 'moment'
import 'moment/locale/zh-tw'
import axios from 'axios'
import smoothscroll from 'smoothscroll-polyfill'
import Vlf from 'vlf'
import localforage from 'localforage'

const storeState = cloneDeep(store.state)
const envScope = '<%= normalized_scope_name %>'

/**
 * 啟動 Application
 *
 * @class ApplicationInitializer
 */
class ApplicationInitializer {
  /**
   * instance 建立時直接啟動 Application
   */
  constructor() {
    this.vms = []
    this.vueInitializers = {}

    this.start()
  }

  /**
   * 啟動
   */
  start() {
    // booting up rails-ujs and Turbolinks
    Rails.start()
    Turbolinks.start()

    // using VueCompositionApi
    Vue.use(VueCompositionAPI)

    // using Buefy
    Vue.use(Buefy, {
      defaultIconPack: 'fa'
    })

    // using VueLocaleTranslator
    Vue.use(VueLocaleTranslator)

    // using VueCommonHelpers
    Vue.use(VueCommonHelpers, {
      envScope
    })

    // using Vue Lazyload
    Vue.use(VueLazyload)

    // using LocalForage
    Vue.use(Vlf, localforage)

    // using zh-TW as defult locale file
    I18n.locale = 'zh-TW'
    moment.locale('zh-TW')

    // setting up axios default header
    axios.defaults.headers.common['Application-Scope'] = envScope

    // polyfill for smooth scroll behavior
    smoothscroll.polyfill()

    this.requireVueInitializers()
    this.detectAndInitializingVueInstances()
    this.destroyVueInstancesWhenPageChange()
  }

  /**
   * 讀取 `path` 中的所有檔案，以 Object 的形式記錄到 `vueInitializers` 中
   */
  requireVueInitializers() {
    let requireContextForVueInitializers = require.context(
      './vue_initializers',
      true,
      /\.js$/
    )
    requireContextForVueInitializers.keys().forEach((key) => {
      let name = key.split('/').pop().split('.').shift()
      this.vueInitializers[name] = requireContextForVueInitializers(key).default
    })
  }

  /**
   * 在 `turbolinks:load` 事件發生時，查詢頁面中有 `data-vue` 的所有元素，並建立 Vue instances，記錄到 `vms` 中
   */
  detectAndInitializingVueInstances() {
    document.addEventListener('turbolinks:load', async () => {
      document.querySelector('html').classList.remove('is-clipped')

      await store.dispatch('siteConfigs/fetchCustomDisplayConfig')

      let templates = document.querySelectorAll('[data-vue]')
      for (let element of templates) {
        let vm = new Vue(
          Object.assign(this.vueInitializers[element.dataset.vue], {
            el: element,
            store
          })
        )

        this.vms.push(vm)
      }
    })
  }

  /**
   * 在 `turbolinks:visit` 事件發生時，把 `vms` 中的所有 Vue instances 都移除
   * 並重置 vuex states 以及設定更新後的 currentUser 資料
   */
  destroyVueInstancesWhenPageChange() {
    document.addEventListener('turbolinks:visit', () => {
      for (let vm of this.vms) {
        vm.$destroy()
      }
      this.vms = []

      store.replaceState(
        Object.assign({}, cloneDeep(storeState), {
          currentUser: CurrentUserAssignService.call(envScope)
        })
      )
    })
  }
}

export default ApplicationInitializer
