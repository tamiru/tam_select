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

      def configure_importmap
        importmap = "config/importmap.rb"
        unless File.exist?(destination_path(importmap))
          say "Importmap was not detected. For jsbundling/esbuild, alias tam_select to app/javascript/tam_select/tam_select.js.", :yellow
          return
        end

        pin = 'pin "tam_select", to: "tam_select/tam_select.js"'
        contents = File.read(destination_path(importmap))
        existing_pin = /^\s*pin\s+["']tam_select["'].*$/

        if contents.match?(existing_pin)
          gsub_file importmap, existing_pin, pin unless contents.match?(/^#{Regexp.escape(pin)}$/)
        else
          append_to_file importmap, "\n#{pin}\n"
        end
      end

      def copy_simple_form_input
        if simple_form_available?
          copy_file "lib/generators/tam_select/templates/tam_select_input.rb", "app/inputs/tam_select_input.rb"
        else
          say "Simple Form is not installed; skipped app/inputs/tam_select_input.rb. Standard Rails form helpers remain available.", :yellow
        end
      end

      def copy_controller_concern
        copy_file "lib/generators/tam_select/templates/tam_select_paginatable.rb", "app/controllers/concerns/tam_select_paginatable.rb"
        copy_file "lib/generators/tam_select/templates/tam_select_remote.rb", "app/controllers/concerns/tam_select_remote.rb"
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

      private

      def destination_path(relative_path)
        File.join(destination_root, relative_path)
      end

      def simple_form_available?
        Gem.loaded_specs.key?("simple_form")
      end
    end
  end
end
