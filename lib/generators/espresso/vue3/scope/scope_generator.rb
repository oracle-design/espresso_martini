module Espresso
  module Vue3
    module Generators
      class ScopeGenerator < Rails::Generators::Base
        source_root File.expand_path('../templates', __FILE__)

        argument :scope_name, type: :string

        def generate_vue_scope_files
          template 'packs/scope.js', %(app/javascript/packs/#{normalized_scope_name}.js)

          template 'src/scope/css/abstracts/_color.sass', %(app/javascript/src/#{normalized_scope_name}/css/abstracts/_color.sass)
          template 'src/scope/css/abstracts/_index.sass', %(app/javascript/src/#{normalized_scope_name}/css/abstracts/_index.sass)
          template 'src/scope/css/abstracts/_size.sass', %(app/javascript/src/#{normalized_scope_name}/css/abstracts/_size.sass)
          template 'src/scope/css/abstracts/_zindex.sass', %(app/javascript/src/#{normalized_scope_name}/css/abstracts/_zindex.sass)
          template 'src/scope/css/components/_index.sass', %(app/javascript/src/#{normalized_scope_name}/css/components/_index.sass)
          template 'src/scope/css/overrides/_button.sass', %(app/javascript/src/#{normalized_scope_name}/css/overrides/_button.sass)
          template 'src/scope/css/overrides/_form.sass', %(app/javascript/src/#{normalized_scope_name}/css/overrides/_form.sass)
          template 'src/scope/css/overrides/_index.sass', %(app/javascript/src/#{normalized_scope_name}/css/overrides/_index.sass)
          template 'src/scope/css/pages/_index.sass', %(app/javascript/src/#{normalized_scope_name}/css/pages/_index.sass)
          template 'src/scope/css/utils/_bulma.sass', %(app/javascript/src/#{normalized_scope_name}/css/utils/_bulma.sass)
          template 'src/scope/css/utils/_debugger.sass', %(app/javascript/src/#{normalized_scope_name}/css/utils/_debugger.sass)
          template 'src/scope/css/utils/_extends.sass', %(app/javascript/src/#{normalized_scope_name}/css/utils/_extends.sass)
          template 'src/scope/css/utils/_functions.sass', %(app/javascript/src/#{normalized_scope_name}/css/utils/_functions.sass)
          template 'src/scope/css/utils/_index.sass', %(app/javascript/src/#{normalized_scope_name}/css/utils/_index.sass)
          template 'src/scope/css/utils/_mixins.sass', %(app/javascript/src/#{normalized_scope_name}/css/utils/_mixins.sass)
          template 'src/scope/css/vendors/bulma/_customized-lists-and-maps.scss', %(app/javascript/src/#{normalized_scope_name}/css/vendors/bulma/_customized-lists-and-maps.scss)
          template 'src/scope/css/vendors/bulma/_customized-variables.sass', %(app/javascript/src/#{normalized_scope_name}/css/vendors/bulma/_customized-variables.sass)
          template 'src/scope/css/vendors/bulma/_index.sass', %(app/javascript/src/#{normalized_scope_name}/css/vendors/bulma/_index.sass)
          template 'src/scope/css/vendors/_index.sass', %(app/javascript/src/#{normalized_scope_name}/css/vendors/_index.sass)
          template 'src/scope/css/application.css.sass', %(app/javascript/src/#{normalized_scope_name}/css/application.css.sass)

          template 'src/scope/images/.keep', %(app/javascript/src/#{normalized_scope_name}/images/.keep)

          template 'src/scope/js/components/common/flash-message.vue', %(app/javascript/src/#{normalized_scope_name}/js/components/common/flash-message.vue)
          template 'src/scope/js/components/mixins/.keep', %(app/javascript/src/#{normalized_scope_name}/js/components/mixins/.keep)
          template 'src/scope/js/store/modules/.keep', %(app/javascript/src/#{normalized_scope_name}/js/store/modules/.keep)
          template 'src/scope/js/store/actions.js', %(app/javascript/src/#{normalized_scope_name}/js/store/actions.js)
          template 'src/scope/js/store/getters.js', %(app/javascript/src/#{normalized_scope_name}/js/store/getters.js)
          template 'src/scope/js/store/index.js', %(app/javascript/src/#{normalized_scope_name}/js/store/index.js)
          template 'src/scope/js/store/mutation-types.js', %(app/javascript/src/#{normalized_scope_name}/js/store/mutation-types.js)
          template 'src/scope/js/store/mutations.js', %(app/javascript/src/#{normalized_scope_name}/js/store/mutations.js)
          template 'src/scope/js/vue_initializers/common/basic_initializer.js', %(app/javascript/src/#{normalized_scope_name}/js/vue_initializers/common/basic_initializer.js)
          template 'src/scope/js/application_initializer.js', %(app/javascript/src/#{normalized_scope_name}/js/application_initializer.js)
        end

        def normalized_scope_name
          @normalized_scope_name ||= scope_name.downcase.underscore
        end
      end
    end
  end
end
