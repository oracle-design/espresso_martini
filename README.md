# Espresso Martini

Espresso Martini 是針對 odd 內部 Rails 專案的開發慣例與設計架構製作的 gem。主要由一連串的 generators 所構成，方便產生各式開發過程中需要 建立的檔案，方便團隊成員遵守一致的 coding style。

這個 gem 主要分為 Espresso 和 Martini 兩個部分。Espresso 包含了一些 coffeescript 的 generators 和我們常用的工具。而 Martini 則是和 Rails 相關的 generators。

## Installation

```ruby
gem 'espresso_martini', github: 'oracle-design/espresso_martini'
```

## Usage

### Espresso

#### 安裝 Coffeescript 基本設定檔案

`rails generate espresso:install`

#### 產生 Coffeescript ViewController 檔案

`rails generate espresso:controller LandingPage`

會產生 `app/assets/javascript/controllers/_landing_page_controller.coffee` 檔案

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
