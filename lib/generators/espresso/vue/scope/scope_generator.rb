module Espresso
  module Vue
    module Generators
      class ScopeGenerator < Rails::Generators::Base
        source_root File.expand_path('../templates', __FILE__)

        argument :scope_name, type: :string

        def generate_vue_scope_files
          template 'packs/scope.js', %(app/javascript/packs/#{normalized_scope_name}.js)

          template 'src/scope/css/base/bulma-config/_costomized-lists-and-maps.scss', %(app/javascript/src/#{normalized_scope_name}/css/base/bulma-config/_costomized-lists-and-maps.scss)
          template 'src/scope/css/base/bulma-config/_costomized-variables.sass', %(app/javascript/src/#{normalized_scope_name}/css/base/bulma-config/_costomized-variables.sass)
          template 'src/scope/css/base/bulma-config/index.sass', %(app/javascript/src/#{normalized_scope_name}/css/base/bulma-config/index.sass)
          template 'src/scope/css/base/_buttons.sass', %(app/javascript/src/#{normalized_scope_name}/css/base/_buttons.sass)
          template 'src/scope/css/base/_colors.sass', %(app/javascript/src/#{normalized_scope_name}/css/base/_colors.sass)
          template 'src/scope/css/base/_form.sass', %(app/javascript/src/#{normalized_scope_name}/css/base/_form.sass)
          template 'src/scope/css/base/_form.sass', %(app/javascript/src/#{normalized_scope_name}/css/base/_mixins.sass)
          template 'src/scope/css/base/_variables.sass', %(app/javascript/src/#{normalized_scope_name}/css/base/_variables.sass)
          template 'src/scope/css/base/_zindex.sass', %(app/javascript/src/#{normalized_scope_name}/css/base/_zindex.sass)
          template 'src/scope/css/base/index.sass', %(app/javascript/src/#{normalized_scope_name}/css/base/index.sass)
          template 'src/scope/css/common/.keep', %(app/javascript/src/#{normalized_scope_name}/css/common/.keep)
          template 'src/scope/css/application.css.sass', %(app/javascript/src/#{normalized_scope_name}/css/application.css.sass)

          template 'src/scope/images/.keep', %(app/javascript/src/#{normalized_scope_name}/images/.keep)

          template 'src/scope/js/components/common/flash-message.vue', %(app/javascript/src/#{normalized_scope_name}/js/components/common/flash-message.vue)
          template 'src/scope/js/components/mixins/backend_paginate_and_filter_and_sortable_mixin.js', %(app/javascript/src/#{normalized_scope_name}/js/components/mixins/backend_paginate_and_filter_and_sortable_mixin.js)
          template 'src/scope/js/store/modules/.keep', %(app/javascript/src/#{normalized_scope_name}/js/store/modules/.keep)
          template 'src/scope/js/store/actions.js', %(app/javascript/src/#{normalized_scope_name}/js/store/actions.js)
          template 'src/scope/js/store/getters.js', %(app/javascript/src/#{normalized_scope_name}/js/store/getters.js)
          template 'src/scope/js/store/index.js', %(app/javascript/src/#{normalized_scope_name}/js/store/index.js)
          template 'src/scope/js/store/mutation-types.js', %(app/javascript/src/#{normalized_scope_name}/js/store/mutation-types.js)
          template 'src/scope/js/store/mutations.js', %(app/javascript/src/#{normalized_scope_name}/js/store/mutations.js)
          template 'src/scope/js/vue_initializers/common/flash_message.js', %(app/javascript/src/#{normalized_scope_name}/js/vue_initializers/common/flash_message.js)
          template 'src/scope/js/application_initializer.js', %(app/javascript/src/#{normalized_scope_name}/js/application_initializer.js)
        end

        def normalized_scope_name
          @normalized_scope_name ||= scope_name.downcase.underscore
        end
      end
    end
  end
end
