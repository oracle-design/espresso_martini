module Martini
  module Locale
    module Generators
      class ActionsGenerator < Rails::Generators::Base
        source_root File.expand_path('../templates', __FILE__)

        argument :language, type: :string, default: 'en'

        def generate_locale
          template "locale_template_actions.yml", File.join('config/locales/actions', "#{language}.yml")
        end
      end
    end
  end
end
