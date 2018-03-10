import Vue from "vue/dist/vue.esm"
import Buefy from "buefy"
import VueLocaleTranslator from '../../shared/plugins/vue_locale_translator'
import store from "./store"
import cloneDeep from "lodash.clonedeep"
import "../../../src/locale/zh-TW"
import moment from "moment"
import Cookies from "js-cookie"
import axios from "axios"

const storeState = cloneDeep(store.state)
const JWT = Cookies.get("client_jwt") || "" // Devise 登入時必須產生 JWT 並放在 Cookie，登出時刪掉

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
    Vue.use(Buefy, { defaultIconPack: "fa" })

    // using VueLocaleTranslator
    Vue.use(VueLocaleTranslator)

    // using zh-TW as defult locale file
    I18n.locale = "zh-TW"
    moment.locale("zh-TW")

    // setting up axios default headers with JWT
    axios.defaults.headers.common["Authorization"] = `Bearer ${JWT}`

    this.requireVueInitializers()
    this.detectAndInitializingVueInstances()
    this.destroyVueInstancesWhenPageChange()
  }

  /**
   * 讀取 `path` 中的所有檔案，以 Object 的形式記錄到 `vueInitializers` 中
   */
  requireVueInitializers() {
    let requireContextForvueInitializers = require.context(
      "./vue_initializers",
      true,
      /\.js$/
    )
    requireContextForvueInitializers.keys().forEach(key => {
      let name = key
        .split("/")
        .pop()
        .split(".")
        .shift()
      this.vueInitializers[name] = requireContextForvueInitializers(
        key
      ).default
    })
  }

  /**
   * 在 `turbolinks:load` 事件發生時，查詢頁面中有 `data-vue` 的所有元素，並建立 Vue instances，記錄到 `vms` 中
   */
  detectAndInitializingVueInstances() {
    document.addEventListener("turbolinks:load", () => {
      let templates = document.querySelectorAll("[data-vue]")
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
   */
  destroyVueInstancesWhenPageChange() {
    document.addEventListener("turbolinks:visit", () => {
      for (let vm of this.vms) {
        vm.$destroy()
      }
      this.vms = []
      store.replaceState(cloneDeep(storeState))
    })
  }
}

export default ApplicationInitializer
