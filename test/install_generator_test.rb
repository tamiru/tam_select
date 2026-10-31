require "test_helper"
require "generators/tam_select/install_generator"
require "generators/tam_select/update_generator"

module InstallGeneratorSetup
  LEGACY = File.expand_path("fixtures/legacy", __dir__)

  def write(path, contents)
    full_path = File.join(destination_root, path)
    FileUtils.mkdir_p(File.dirname(full_path))
    File.binwrite(full_path, contents)
  end

  def copy_legacy(fixture, path)
    write(path, File.binread(File.join(LEGACY, fixture)))
  end

  def importmap_app
    write "config/importmap.rb", <<~RUBY
      pin "application"
      pin_all_from "app/javascript/controllers", under: "controllers"
    RUBY
    write "app/assets/tailwind/application.css", %(@import "tailwindcss";\n\n.btn { color: red; }\n)
  end
end

class InstallGeneratorTest < Rails::Generators::TestCase
  include InstallGeneratorSetup
  tests TamSelect::Generators::InstallGenerator
  destination File.expand_path("tmp/install_generator", __dir__)
  setup :prepare_destination

  test "an importmap app loads everything from the gem instead of copying it" do
    importmap_app
    run_generator

    assert_no_file "app/javascript/tam_select/tam_select.js"
    assert_no_file "app/javascript/controllers/tam_select_controller.js"
    assert_no_file "app/helpers/tam_select_helper.rb"
    assert_no_file "app/inputs/tam_select_input.rb"
    assert_no_file "app/controllers/concerns/tam_select_paginatable.rb"
    assert_file "app/controllers/tam_select_remote_controller.rb", /include TamSelectRemote/
    assert_file "config/importmap.rb" do |importmap|
      refute_match(/tam_select/, importmap, "the gem pins tam_select itself")
    end
  end

  test "Tailwind imports the gem's sources right after tailwindcss, once" do
    importmap_app
    2.times { run_generator }

    assert_file "app/assets/tailwind/application.css" do |css|
      assert_equal 1, css.scan(%(@import "../builds/tailwind/tam_select";)).length
      assert_match(/\A@import "tailwindcss";\n@import "..\/builds\/tailwind\/tam_select";\n/, css)
    end
  end

  test "an app installed by an older version loses untouched copies and the pin to them" do
    importmap_app
    copy_legacy "tam_select_helper.rb", "app/helpers/tam_select_helper.rb"
    copy_legacy "tam_select_controller.js", "app/javascript/controllers/tam_select_controller.js"
    File.open(File.join(destination_root, "config/importmap.rb"), "a") do |file|
      file.puts 'pin "tam_select", to: "tam_select/tam_select.js"'
    end

    run_generator

    assert_no_file "app/helpers/tam_select_helper.rb"
    assert_no_file "app/javascript/controllers/tam_select_controller.js"
    assert_file "config/importmap.rb" do |importmap|
      refute_match(/tam_select/, importmap)
    end
  end

  test "customized copies are kept, reported, and keep their pin" do
    importmap_app
    write "app/helpers/tam_select_helper.rb", "module TamSelectHelper\n  # customized\nend\n"
    write "app/javascript/tam_select/tam_select.js", "// patched locally\n"
    File.open(File.join(destination_root, "config/importmap.rb"), "a") do |file|
      file.puts 'pin "tam_select", to: "tam_select/tam_select.js"'
    end

    output = run_generator

    assert_file "app/helpers/tam_select_helper.rb", /customized/
    assert_file "app/javascript/tam_select/tam_select.js", /patched locally/
    assert_file "config/importmap.rb", %r{pin "tam_select", to: "tam_select/tam_select\.js"}
    assert_match %r{app/helpers/tam_select_helper\.rb}, output
    assert_match %r{app/javascript/tam_select/tam_select\.js}, output
  end

  test "a jsbundling app depends on the npm package and drops the old alias" do
    write "package.json", <<~JSON
      {
        "scripts": {
          "build": "esbuild app/javascript/*.* --bundle --outdir=app/assets/builds --alias:tam_select=./app/javascript/tam_select/tam_select.js"
        }
      }
    JSON
    copy_legacy "tam_select_controller.js", "app/javascript/controllers/tam_select_controller.js"

    2.times { run_generator }

    package = JSON.parse(File.read(File.join(destination_root, "package.json")))
    assert_equal "^#{TamSelect::VERSION}", package.dig("dependencies", "tam-select")
    assert_equal "esbuild app/javascript/*.* --bundle --outdir=app/assets/builds", package.dig("scripts", "build")
    assert_file "app/javascript/controllers/tam_select_controller.js", %r{export \{ default \} from "tam-select/stimulus"}
  end

  test "a jsbundling app keeps a version of tam-select it already depends on" do
    write "package.json", %({ "dependencies": { "tam-select": "1.2.0" } }\n)
    run_generator

    package = JSON.parse(File.read(File.join(destination_root, "package.json")))
    assert_equal "1.2.0", package.dig("dependencies", "tam-select")
  end
end

class UpdateGeneratorTest < Rails::Generators::TestCase
  include InstallGeneratorSetup
  tests TamSelect::Generators::UpdateGenerator
  destination File.expand_path("tmp/update_generator", __dir__)
  setup :prepare_destination

  test "tam_select:update removes untouched copies from older installs" do
    importmap_app
    copy_legacy "tam_select_helper.rb", "app/helpers/tam_select_helper.rb"

    output = run_generator

    assert_no_file "app/helpers/tam_select_helper.rb"
    assert_file "app/controllers/tam_select_remote_controller.rb"
    refute_match(/Could not find/, output)
  end
end

class EngineTest < Minitest::Test
  def test_engine_loads_the_rails_integration_from_the_gem
    assert_equal "tam_select", TamSelect::Engine.engine_name, "tailwindcss-rails looks up engine.css by this name"
    paths = TamSelect::Engine.paths
    root = TamSelect::Engine.root

    eager = paths.eager_load
    assert_includes eager, root.join("rails/app/helpers").to_s
    assert_includes eager, root.join("rails/app/controllers/concerns").to_s
    refute_includes eager, root.join("rails/app/javascript").to_s
    assert_equal [root.join("rails/app/helpers").to_s], paths["app/helpers"].existent
    assert root.join("config/importmap.rb").exist?
    assert root.join("app/assets/tailwind/tam_select/engine.css").exist?
    assert root.join("rails/app/controllers/concerns/tam_select_remote.rb").exist?
  end

  def test_legacy_digests_cover_every_file_older_versions_copied
    digests = JSON.parse(File.read(TamSelect::Engine.root.join("lib/generators/tam_select/legacy_copies.json")))
    assert_equal %w[
      app/controllers/concerns/tam_select_paginatable.rb
      app/controllers/concerns/tam_select_remote.rb
      app/helpers/tam_select_helper.rb
      app/inputs/tam_select_input.rb
      app/javascript/controllers/tam_select_controller.js
      app/javascript/tam_select/tam_select.js
    ], digests.keys.sort
    fixture = File.expand_path("fixtures/legacy/tam_select_helper.rb", __dir__)
    assert_includes digests.fetch("app/helpers/tam_select_helper.rb"), Digest::SHA256.file(fixture).hexdigest
  end
end
