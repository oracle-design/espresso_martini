module Espresso
  module Vue
    module Generators
      class MixinGenerator < Rails::Generators::NamedBase
        source_root File.expand_path('../templates', __FILE__)

        argument :scope_name, type: :string, default: 'application'

        def generate_vue_mixin
          mixin_path = name.split('::')[0..-2].join('/')

          template 'mixin_template.js', File.join("app/javascript/src/#{scope_name}/js/components/mixins/", mixin_path.downcase, "#{file_name}_mixin.js")
        end
      end
    end
  end
end
