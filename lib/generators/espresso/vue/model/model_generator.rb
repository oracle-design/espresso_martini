module Espresso
  module Vue
    module Generators
      class ModelGenerator < Rails::Generators::Base
        source_root File.expand_path('../templates', __FILE__)

        argument :model_name, type: :string

        def generate_vue_model
          template 'resource_model/model.js', %(app/javascript/src/shared/resource_models/#{model_name.underscore}.js)

          template 'vuex_module/actions.js', %(app/javascript/src/shared/store_modules/#{model_name.underscore.pluralize}/actions.js)
          template 'vuex_module/getters.js', %(app/javascript/src/shared/store_modules/#{model_name.underscore.pluralize}/getters.js)
          template 'vuex_module/index.js', %(app/javascript/src/shared/store_modules/#{model_name.underscore.pluralize}/index.js)
          template 'vuex_module/mutation-types.js', %(app/javascript/src/shared/store_modules/#{model_name.underscore.pluralize}/mutation-types.js)
          template 'vuex_module/mutations.js', %(app/javascript/src/shared/store_modules/#{model_name.underscore.pluralize}/mutations.js)
        end
      end
    end
  end
end
