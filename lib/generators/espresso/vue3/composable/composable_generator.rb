module Espresso
  module Vue3
    module Generators
      class ComposableGenerator < Rails::Generators::NamedBase
        source_root File.expand_path('../templates', __FILE__)

        argument :scope_name, type: :string, default: 'application'

        def generate_composable
          file_path = name.split('::')[0..-2].join('/')

          template 'composable.js', File.join("app/javascript/src/#{scope_name}/js/composables/", file_path.downcase, "use_#{file_name}.js")
        end

        def composable_name
          "use#{file_name.classify}"
        end
      end
    end
  end
end
