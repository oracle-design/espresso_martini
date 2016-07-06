# Espresso Martini

Espresso Martini 是針對 odd 內部 Rails 專案的開發慣例與設計架構製作的 gem。主要由一連串的 generators 所構成，方便產生各式開發過程中需要 建立的檔案，方便團隊成員遵守一致的 coding style。

## Installation

```ruby
gem 'espresso_martini', github: 'oracle-design/espresso_martini'
```

## Usage

### 產生 Model 的 i18n 檔案

`rails generate espresso:locale:model [MODEL] [LANGUAGE]`

例如：

`rails g espresso:locale:model user zh-TW`

會在路徑 `app/config/locales/models/user/zh-TW.yml` 產生一個 template

## Development

After checking out the repo, run `bin/setup` to install dependencies. Then, run `rake spec` to run the tests. You can also run `bin/console` for an interactive prompt that will allow you to experiment.

To install this gem onto your local machine, run `bundle exec rake install`. To release a new version, update the version number in `version.rb`, and then run `bundle exec rake release`, which will create a git tag for the version, push git commits and tags, and push the `.gem` file to [rubygems.org](https://rubygems.org).

## Contributing

Bug reports and pull requests are welcome on GitHub at <https://github.com/[USERNAME]/espresso_martini>. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
