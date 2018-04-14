module Espresso
  module Vue
    module Generators
      class InitializerGenerator < Rails::Generators::NamedBase
        source_root File.expand_path('../templates', __FILE__)

        argument :scope_name, type: :string, default: 'application'

        def generate_initializer
          initializer_path = name.split('::')[0..-2].join('/')

          template 'initializer_template.js', File.join("app/javascript/src/#{scope_name}/js/vue_initializers/", initializer_path.downcase, "#{file_name}.js")
        end

        def component_name
          file_name.dasherize
        end
      end
    end
  end
end
