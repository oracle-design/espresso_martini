module Espresso
  module Vue3
    module Generators
      class ComponentGenerator < Rails::Generators::NamedBase
        source_root File.expand_path('../templates', __FILE__)

        argument :scope_name, type: :string, default: 'application'

        def generate_vue_component
          component_path = name.split('::')[0..-2].join('/')
          components_folder_path = "app/javascript/src/#{scope_name}/css/components/"
          sass_index_path = File.join(components_folder_path, '_index.sass')
          sass_file_path = File.join(component_path.underscore, "#{file_name.dasherize}.sass")
          sass_file_full_path = File.join(components_folder_path, sass_file_path)

          template 'component_template.vue', File.join("app/javascript/src/#{scope_name}/js/components/", component_path.underscore, "#{file_name.dasherize}.vue")
          template 'component_style_template.sass', sass_file_full_path

          # in new structure, there is a _index.sass file in root of components folder. it isn't exists in old
          # structure. For backward compatibility, we have to check if this file exists or not before modify _index.sass
          if File.exist?(sass_index_path)
            prepend_to_file sass_index_path, "@forward \"#{sass_file_path}\"\n"
            # sort lines and remove empty line
            system %(sort #{sass_index_path} -o #{sass_index_path} && grep . #{sass_index_path} -q)
          end
        end

        def css_class_name
          %(.vc-#{name.split('::').map(&:underscore).map(&:dasherize).join('-')})
        end
      end
    end
  end
end
