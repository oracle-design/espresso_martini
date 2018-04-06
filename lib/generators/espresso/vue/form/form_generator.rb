module Espresso
  module Vue
    module Generators
      class FormGenerator < Rails::Generators::NamedBase
        source_root File.expand_path('../templates', __FILE__)

        def generate_form
          file_path = name.split('::')[0..-2].join('/')

          template 'forms/form_template.js', File.join("app/javascript/src/shared/forms/", file_path.downcase, "#{file_name.underscore}_form.js")
        end
      end
    end
  end
end
