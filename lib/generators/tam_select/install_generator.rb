require "rails/generators"

module TamSelect
  module Generators
    class InstallGenerator < Rails::Generators::Base
      source_root File.expand_path("../../..", __dir__)

      desc "Install tam_select JavaScript, Stimulus, Simple Form and Rails integration"

      def copy_javascript
        copy_file "src/tam-select.js", "app/javascript/tam_select/tam_select.js"
        copy_file "lib/generators/tam_select/templates/tam_select_controller.js", "app/javascript/controllers/tam_select_controller.js"
      end

      def copy_simple_form_input
        copy_file "lib/generators/tam_select/templates/tam_select_input.rb", "app/inputs/tam_select_input.rb"
      end

      def copy_controller_concern
        copy_file "lib/generators/tam_select/templates/tam_select_paginatable.rb", "app/controllers/concerns/tam_select_paginatable.rb"
      end

      def copy_remote_controller
        copy_file "lib/generators/tam_select/templates/tam_select_remote_controller.rb", "app/controllers/tam_select_remote_controller.rb"
      end

      def copy_helper
        copy_file "lib/generators/tam_select/templates/tam_select_helper.rb", "app/helpers/tam_select_helper.rb"
      end

      def show_tailwind_instruction
        say "\ntam_select installed.", :green
        say "Tailwind CSS 4 scans app/javascript automatically in most Rails setups."
        say "If your setup uses explicit sources, add:"
        say '@source "../../javascript/tam_select/**/*.js";'
      end
    end
  end
end
