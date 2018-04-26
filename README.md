# Espresso Martini

Espresso Martini 是針對 odd 內部 Rails 專案的開發慣例與設計架構製作的 gem。主要由一連串的 generators 所構成，方便產生各式開發過程中需要建立的檔案，方便團隊成員遵守一致的 coding style。

這個 gem 主要分為 Espresso 和 Martini 兩個部分。Espresso 包含了與 javascript 相關的 generators，目前主要用於 Vuejs 的開發流程。而 Martini 則是和 Rails 相關的 generators。

---

## Installation

```ruby
gem 'espresso_martini', github: 'oracle-design/espresso_martini'
```

---

## Usage

### Espresso

我們 `javascript` 資料夾的檔案結構，會像下面這個樣子：

```bash
app/javascript
├── packs              # webpacker 定義的 entry files 放置處
│   ├── admin.js
│   └── application.js
└── src                # 其他的開發內容，我們會放在 src 資料夾
    ├── application    # 這是 scope，一個 entry file 對應一個 scope
    │   ├── css        # 與 CSS 相關的檔案
    │   ├── images     # webpacker 環境用得到的 images
    │   └── js         # javascript 相關的檔案
    ├── locale         # 由 i18n-js 產生的 locale files
    │   ├── en.js
    │   ├── i18n.js
    │   └── zh-TW.js
    └── shared               # 所有 scope 都會共用的檔案
        ├── forms            # Form Objects，用於處理前端表單的內容
        ├── plugins          # Vue plugins，用來提供 Vue 一些 global 的功能，例如 i18n 的 helpers
        ├── policies         # Policy Objects，使用者權限驗證的定義
        ├── resource_models  # 供 vuex 使用的 resource models，基本上會對應 rails 的 model
        ├── services         # Service Objects，常常會復用的功能或商業邏輯封裝
        ├── store_modules    # vuex 的 modules，一般來說所有 scope 會共用
        ├── user_models      # 提供 currentUser 功能，把每一種使用者的角色封裝起來，搭配 policy 使用
        ├── vue_components   # scopes 間會共用的 components
        └── vue_mixins       # scopes 間會共用的 mixins
```

#### 產生 Scope

`rails g espresso:vue:scope admin`

這會產生完整的 scope 檔案結構如下：

```bash
app/javascript/src/admin/
├── css
│   ├── application.css.sass # css 的 entry file
│   ├── base
│   │   ├── _buttons.sass # 可自訂 button 的 style
│   │   ├── _colors.sass  # 可自訂顏色的變數
│   │   ├── _form.sass    # 可自訂表單
│   │   ├── bulma-config                         # bulma css 的客製化設定內容
│   │   │   ├── _costomized-lists-and-maps.scss
│   │   │   ├── _costomized-variables.sass
│   │   │   └── index.sass                       # 這部分可參考官方文件
│   │   └── index.sass
│   ├── common       # 一般 styles
│   ├── components   # vue components 用的 styles
│   └── pages        # Rails 中獨立頁面的 styles
├── images
└── js
    ├── application_initializer.js  # 整個前端 javascript 環境的啟動設定
    ├── components                  # Vue 的 components
    │   ├── common
    │   │   └── flash-message.vue   # 用來顯示由 Rails 提供或 js 觸發的 flash message
    │   └── mixins                  # Vue 的 mixins
    ├── store                       # Vuex，root 這層會包含 flash message 的功能
    │   ├── actions.js
    │   ├── getters.js
    │   ├── index.js
    │   ├── modules
    │   ├── mutation-types.js
    │   └── mutations.js
    └── vue_initializers            # 用來讓 Rails views 使用的 vue initializer
        └── common
            └── flash_message.js
```

產生後可再依照開發上的需求進行細部自訂。

#### 產生 Model

`rails g espresso:vue:model OrderItem`

會產生一個 resource model 和一個完整的 vuex module 設定

```bash
app/javascript/src/shared
├── resource_models
│   └── order_item.js          # 繼承 base 提供的基本功能
└── store_modules
    └── order_items            # 提供基礎 vuex module 設定
        ├── actions.js         # 包含基本 CRUD 操作
        ├── getters.js         # 包含 all, find 等基本功能
        ├── index.js
        ├── mutation-types.js  # 包含 FETCH, GET, UPDATE, DELETE 等基本 mutations
        └── mutations.js
```

##### Resource Model 說明

請注意 resource model 檔案產生後，需要自訂 `OPTIONS` 這個常數，定義好 API 會提供的所有 attributes、以及有哪些 editableAttributes 是使用者可編輯的，這個部分 Form Object 產生欄位內容時會使用到，必須詳細定義。

每個 resource model 預設會有 `.all(options = {})` 和 `.find(id)` 兩個 static method，可以和 API 溝通取得所有、或特定 ID 的資料。而 resource model 的 instance 預設會有 `#save` 和 `#destroy` 可用來透過 API 建立、更新、或刪除資料。若 resource 本身還有其他特殊的 API 則需要自行定義。例如 User 可能會有 `#suspend` 等等。

除此之外 resource model 還提供 helper methods，例如預設的 `#attributes`、`#isNewRecord` 等。若 resource 有非常常用的功能也可自行增加到 helpers。例如若有個 resource 有價格欄位，則可選擇自行定義一個 helper 來把從 API 得到的資料轉換為可用於前端顯示的格式。

#### 產生 Initializer

`rails g espresso:vue:initializer project::project_list_table_container`

這會產生一個讓 rails 可以在 views 中使用的 vue initializer

```bash
app/javascript/src/application/js/vue_initializers
└── project
    └── project_list_table_container.js
```

在 application_initializer.js 中，會自動找到這個檔案，並在頁面的 DOM 中找到有需要的 node 自動建立 Vue 的 instance。

例如：

```slim
// projects/index.html.slim

.project-list-container(data-vue="project_list_table_container")
  ...
```

#### 產生 component

`rails g espresso:vue:component project::list_item`

這會產生一個 vue component

```bash
app/javascript/src/application/js/components
└── Project
    └── list-item.vue
```

#### 產生 Mixin

`rails g espresso:vue:mixin attachable`

可以產生一個 mixin

```bash
app/javascript/src/application/js/components/mixins
└── attachable_mixin.js
```

#### 產生 Form Object

一般來說，`FormBase` 可以應付大部分的狀況，但由於它的 constructor 和 model 本身的 `#attributes` 方法耦合在一起，所以若有些 Form 需要較高程度的自訂欄位時，會需要產生一個新的 Form Object 繼承 `FormBase`，並修改 constructor 與 `#sync` 方法。

`rails g espresso:vue:form Admin::CreateProduct`

可以產生一個 form object

```bash
app/javascript/src/shared/forms/admin
└── create_product_form.js
```

#### 產生 Policy Object

`rails g espresso:vue:policy Article`

可以產生一個 policy object

```bash
app/javascript/src/shared/policies/
└── article_policy.js
```

並自動在 `app/javascript/src/shared/policies/index.js` import 這個新的 policy。預設會有 `index`, `show`, `create`, `update`, `destroy` 這五個動作的 policy 繼承自 PolicyBase 預設都是回傳 false，必須自行定義。

##### 使用方法

假設在 Article 的 index 頁面，只有建立 Article 的使用者本身才能夠修改、刪除它。那在 vue 中可能會像下面這樣使用 policy object。

```js
import ArticlePolicy from '../../../../shared/policies/article_policy'

// ...
methods: {
    canEdit(article) {
        return new ArticlePolicy(this.currentUser, article).update()
    },

    canDestroy(article) {
        return new ArticlePolicy(this.currentUser, article).destroy()
    }
}
```

---

### Martini

#### 產生 Model 的 i18n 檔案

`rails generate martini:locale:model [MODEL] [LANGUAGE]`

例如：

`rails g espresso:locale:model user zh-TW`

會在路徑 `app/config/locales/models/user/zh-TW.yml` 產生一個 template

#### 產生 Cell 的 i18n 檔案

`rails generate martini:locale:cell [CELL] [LANGUAGE]`

例如：

`rails g espresso:locale:cell user zh-TW`

會在路徑 `app/config/locales/cells/user/zh-TW.yml` 產生一個 template

## Development

After checking out the repo, run `bin/setup` to install dependencies. Then, run `rake spec` to run the tests. You can also run `bin/console` for an interactive prompt that will allow you to experiment.

To install this gem onto your local machine, run `bundle exec rake install`. To release a new version, update the version number in `version.rb`, and then run `bundle exec rake release`, which will create a git tag for the version, push git commits and tags, and push the `.gem` file to [rubygems.org](https://rubygems.org).

## Contributing

Bug reports and pull requests are welcome on GitHub at <https://github.com/[USERNAME]/espresso_martini>. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
