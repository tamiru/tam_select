require "rails/engine"

module TamSelect
  # Serves the JavaScript, Stimulus controller, helper, Simple Form input and
  # controller concerns straight from the gem, so `bundle update tam_select`
  # updates every app. An app file with the same path overrides the gem's.
  class Engine < ::Rails::Engine
    # tailwindcss-rails finds app/assets/tailwind/<engine_name>/engine.css by
    # this name; Rails would otherwise call it "tam_select_engine".
    engine_name "tam_select"

    # The Rails integration lives in rails/app; the npm package ships the same
    # files from there.
    paths.add "rails/app", eager_load: true, glob: "{*,*/concerns}", exclude: %w[javascript inputs]
    paths["app/helpers"] = "rails/app/helpers"

    # The Simple Form input subclasses a Simple Form class, so only load it
    # when the app uses Simple Form.
    paths.add "rails/app/inputs", eager_load: true if Gem.loaded_specs.key?("simple_form")

    initializer "tam_select.importmap", before: "importmap" do |app|
      if app.config.respond_to?(:importmap)
        app.config.importmap.paths << root.join("config/importmap.rb")
        # Refresh the cached importmap when the gem's JavaScript changes, for
        # example while developing against a local checkout of the gem.
        app.config.importmap.cache_sweepers << root.join("src") << root.join("rails/app/javascript")
      end
    end

    # Runs after importmap-rails adds app/javascript, so an app's own
    # controllers/tam_select_controller.js still wins over the gem's.
    initializer "tam_select.assets", after: "importmap.assets" do |app|
      if app.config.respond_to?(:assets) && app.config.respond_to?(:importmap)
        app.config.assets.paths << root.join("src").to_s
        app.config.assets.paths << root.join("rails/app/javascript").to_s
        if defined?(::Sprockets)
          app.config.assets.precompile += %w[tam-select.js controllers/tam_select_controller.js]
        end
      end
    end
  end
end
