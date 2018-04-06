module Espresso
  module Vue
    module Generators
      class PolicyGenerator < Rails::Generators::Base
        source_root File.expand_path('../templates', __FILE__)

        argument :model_name, type: :string

        def generate_vue_policy
          template 'policies/policy_template.js', %(app/javascript/src/shared/policies/#{model_name.underscore}_policy.js)

          prepend_to_file 'app/javascript/src/shared/policies/index.js', "import #{model_name.classify} from './#{model_name.underscore}_policy'\n"
          insert_into_file 'app/javascript/src/shared/policies/index.js', "  #{model_name.underscore}: #{model_name.classify}Policy,\n", after: "const POLICIES = {\n"
        end
      end
    end
  end
end
