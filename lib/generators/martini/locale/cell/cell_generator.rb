module Martini
  module Locale
    module Generators
      class CellGenerator < Rails::Generators::NamedBase
        source_root File.expand_path('../templates', __FILE__)

        argument :language, type: :string, default: 'en'

        def generate_locale
          template "locale_template_cell.yml", File.join('config/locales/cells', file_path, "#{language}.yml")
        end
      end
    end
  end
end
