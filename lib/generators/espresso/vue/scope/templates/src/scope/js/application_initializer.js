import Vue from 'vue/dist/vue.esm'
import Buefy from 'buefy'
import VueLocaleTranslator from '../../shared/plugins/vue_locale_translator'
import CurrentUserAssignService from '../../shared/services/current_user_assign_service'
import store from './store'
import cloneDeep from 'lodash.clonedeep'
import '../../../src/locale/zh-TW'
import moment from 'moment'
import axios from 'axios'

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

    // using Buefy
    Vue.use(Buefy, {
      defaultIconPack: 'fa'
    })

    // using VueLocaleTranslator
    Vue.use(VueLocaleTranslator)

    // using zh-TW as defult locale file
    I18n.locale = 'zh-TW'
    moment.locale('zh-TW')

    // setting up axios headers with JWT
    axios.defaults.headers.common['Application-Scope'] = envScope

    this.requireVueInitializers()
    this.detectAndInitializingVueInstances()
    this.destroyVueInstancesWhenPageChange()
  }

  /**
   * 讀取 `path` 中的所有檔案，以 Object 的形式記錄到 `vueInitializers` 中
   */
  requireVueInitializers() {
    let requireContextForVueInitializers = require.context('./vue_initializers', true, /\.js$/)
    requireContextForVueInitializers.keys().forEach(key => {
      let name = key
        .split('/')
        .pop()
        .split('.')
        .shift()
      this.vueInitializers[name] = requireContextForVueInitializers(key).default
    })
  }

  /**
   * 在 `turbolinks:load` 事件發生時，查詢頁面中有 `data-vue` 的所有元素，並建立 Vue instances，記錄到 `vms` 中
   */
  detectAndInitializingVueInstances() {
    document.addEventListener('turbolinks:load', () => {
      let templates = document.querySelectorAll('[data-vue]')
      for (let element of templates) {
        let vm = new Vue(Object.assign(this.vueInitializers[element.dataset.vue], {
          el: element,
          store
        }))

        this.vms.push(vm)
      }
    })
  }

  /**
   * 在 `turbolinks:visit` 事件發生時，把 `vms` 中的所有 Vue instances 都移除
   * 並更新 vuex store 中 currentUser 的內容
   */
  destroyVueInstancesWhenPageChange() {
    document.addEventListener('turbolinks:visit', () => {
      for (let vm of this.vms) {
        vm.$destroy()
      }
      this.vms = []
      store.replaceState(Object.assign({}, cloneDeep(storeState), {
        currentUser: CurrentUserAssignService.call(envScope)
      }))
    })
  }
}

export default ApplicationInitializer
