module Espresso
  module Generators
    class ControllerGenerator < Rails::Generators::Base
      source_root File.expand_path("../templates", __FILE__)

      argument :controller_name, type: :string

      def generate_coffee_controller
        template 'controller_template.coffee', "app/assets/javascripts/view_controllers/_#{controller_name.underscore}_viewController.coffee"
      end
    end
  end
end
