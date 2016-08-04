module Espresso
  module Generators
    class InstallGenerator < Rails::Generators::Base
      source_root File.expand_path("../../../../../app/assets/javascripts", __FILE__)

      def copy_files
        template '_em_base.coffee', 'app/assets/javascripts/_em_base.coffee'
        template '_espresso_martini.coffee', 'app/assets/javascripts/_espresso_martini.coffee'
        template 'components/.keep', 'app/assets/javascripts/components/.keep'
        template 'tools/.keep', 'app/assets/javascripts/tools/.keep'
      end
    end
  end
end
