require "digest"
require "json"
require "rails/generators"
require "tam_select/version"

module TamSelect
  module Generators
    # Sets an app up to load Tam Select from the gem (importmap) or the npm
    # package (jsbundling), so updating is `bundle update tam_select` or
    # `npm update tam-select`. Safe to re-run; it also upgrades apps installed
    # by tam_select 1.3 and earlier, which copied every file into the app.
    class InstallGenerator < Rails::Generators::Base
      source_root File.expand_path("templates", __dir__)

      desc "Set up Tam Select so it updates with `bundle update tam_select` (importmap) or `npm update tam-select` (jsbundling)"

      LEGACY_LIBRARY = "app/javascript/tam_select/tam_select.js".freeze
      LEGACY_PIN = /^\s*pin\s+["']tam_select["'],\s*to:\s*["']tam_select\/tam_select\.js["'].*\n?/
      LEGACY_ALIAS = / ?--alias:tam_select=\.\/app\/javascript\/tam_select\/tam_select\.js/
      CONTROLLER = "app/javascript/controllers/tam_select_controller.js".freeze
      TAILWIND_CSS = "app/assets/tailwind/application.css".freeze
      TAILWIND_IMPORT = '@import "../builds/tailwind/tam_select";'.freeze

      def remove_legacy_copies
        @kept_legacy_files = []
        legacy_digests.each do |path, digests|
          next unless File.exist?(destination_path(path))

          if digests.include?(Digest::SHA256.file(destination_path(path)).hexdigest)
            remove_file path
          else
            @kept_legacy_files << path
          end
        end
        empty_directory_removed("app/javascript/tam_select")
        empty_directory_removed("app/inputs")
      end

      def configure_javascript
        if importmap?
          configure_importmap
        elsif File.exist?(destination_path("package.json"))
          configure_jsbundling
        else
          say "Neither config/importmap.rb nor package.json was found; import Tam Select from the tam-select npm package.", :yellow
        end
      end

      def configure_tailwind
        return unless importmap?

        if File.exist?(destination_path(TAILWIND_CSS))
          css = File.read(destination_path(TAILWIND_CSS))
          return if css.include?(TAILWIND_IMPORT)

          if css.match?(/^@import\s+["']tailwindcss["'];?[ \t]*$/)
            inject_into_file TAILWIND_CSS, "#{TAILWIND_IMPORT}\n", after: /^@import\s+["']tailwindcss["'];?[ \t]*\n/
          else
            append_to_file TAILWIND_CSS, "\n#{TAILWIND_IMPORT}\n"
          end
        else
          say "Add Tam Select's classes to your Tailwind build. With tailwindcss-rails 4.4+, add", :yellow
          say "  #{TAILWIND_IMPORT}"
          say "to your Tailwind CSS entry point."
        end
      end

      def copy_remote_controller
        copy_file "tam_select_remote_controller.rb", "app/controllers/tam_select_remote_controller.rb", skip: true
      end

      def report
        say "\nTam Select is set up.", :green
        if importmap?
          say "The library, Stimulus controller, helper, Simple Form input and concerns load from the gem."
          say "Update with: bundle update tam_select"
        else
          say "Run your package manager's install (for example `npm install`), then update with:"
          say "  bundle update tam_select && npm update tam-select"
        end

        return if @kept_legacy_files.empty?

        say "\nThese files differ from every released Tam Select version, so they were kept.", :yellow
        say "They override the gem's copy and will not update. Delete them to use the gem's version:", :yellow
        @kept_legacy_files.each { |path| say "  #{path}" }
      end

      private

      def configure_importmap
        importmap = "config/importmap.rb"
        # The gem pins tam_select itself. Drop the pin to the old copy once
        # that copy is gone; a kept, customized copy keeps its pin.
        return if File.exist?(destination_path(LEGACY_LIBRARY))
        return unless File.read(destination_path(importmap)).match?(LEGACY_PIN)

        gsub_file importmap, LEGACY_PIN, ""
      end

      def configure_jsbundling
        package_json = "package.json"
        unless File.exist?(destination_path(LEGACY_LIBRARY))
          gsub_file package_json, LEGACY_ALIAS, "" if File.read(destination_path(package_json)).match?(LEGACY_ALIAS)
        end

        package = JSON.parse(File.read(destination_path(package_json)))
        unless package.dig("dependencies", "tam-select") || package.dig("devDependencies", "tam-select")
          package["dependencies"] = (package["dependencies"] || {}).merge("tam-select" => "^#{TamSelect::VERSION}")
          create_file package_json, "#{JSON.pretty_generate(package)}\n", force: true
        end

        copy_file "tam_select_controller.js", CONTROLLER, skip: true
        say "Register the controller if your app uses a controllers manifest: bin/rails stimulus:manifest:update", :yellow
        say "Add Tam Select's classes to Tailwind: @source \"../../../node_modules/tam-select/src\"; (adjust the path to your CSS entry point)", :yellow
      end

      def importmap?
        File.exist?(destination_path("config/importmap.rb"))
      end

      def legacy_digests
        JSON.parse(File.read(File.expand_path("legacy_copies.json", __dir__)))
      end

      def empty_directory_removed(path)
        directory = destination_path(path)
        Dir.rmdir(directory) if Dir.exist?(directory) && Dir.empty?(directory)
      end

      def destination_path(relative_path)
        File.join(destination_root, relative_path)
      end
    end
  end
end
