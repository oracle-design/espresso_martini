module Espresso
  module Vue
    module Generators
      class ComponentGenerator < Rails::Generators::NamedBase
        source_root File.expand_path('../templates', __FILE__)

        argument :scope_name, type: :string, default: 'application'

        def generate_vue_component
          component_path = name.split('::')[0..-2].join('/')

          template 'component_template.vue', File.join("app/javascript/src/#{scope_name}/js/components/", component_path.downcase, "#{file_name.dasherize}.vue")
        end
      end
    end
  end
end
