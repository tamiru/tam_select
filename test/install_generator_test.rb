require "test_helper"
require "generators/tam_select/install_generator"

class InstallGeneratorTest < Rails::Generators::TestCase
  tests TamSelect::Generators::InstallGenerator
  destination File.expand_path("tmp/install_generator", __dir__)

  setup do
    prepare_destination
    FileUtils.mkdir_p(File.join(destination_root, "config"))
    File.write(File.join(destination_root, "config/importmap.rb"), <<~RUBY)
      pin "application"
      pin_all_from "app/javascript/controllers", under: "controllers"
    RUBY
    @simple_form_spec = Gem.loaded_specs.delete("simple_form")
  end

  teardown do
    if @simple_form_spec
      Gem.loaded_specs["simple_form"] = @simple_form_spec
    else
      Gem.loaded_specs.delete("simple_form")
    end
  end

  test "installs importmap-compatible JavaScript without requiring Simple Form" do
    run_generator

    assert_file "app/javascript/tam_select/tam_select.js"
    assert_file "app/javascript/controllers/tam_select_controller.js", /import TamSelect from "tam_select"/
    assert_file "config/importmap.rb", /pin "tam_select", to: "tam_select\/tam_select\.js"/
    assert_no_file "app/inputs/tam_select_input.rb"
  end

  test "running twice leaves exactly one importmap pin" do
    2.times { run_generator }

    importmap = File.read(File.join(destination_root, "config/importmap.rb"))
    assert_equal 1, importmap.scan(/^pin "tam_select"/).length
    assert_equal 1, Dir.glob(File.join(destination_root, "app/javascript/**/tam_select.js")).length
  end

  test "replaces an existing incorrect tam_select pin" do
    File.open(File.join(destination_root, "config/importmap.rb"), "a") do |file|
      file.puts 'pin "tam_select", to: "old/path.js"'
    end

    run_generator

    importmap = File.read(File.join(destination_root, "config/importmap.rb"))
    assert_equal 1, importmap.scan(/^pin "tam_select"/).length
    assert_includes importmap, 'pin "tam_select", to: "tam_select/tam_select.js"'
    refute_includes importmap, "old/path.js"
  end

  test "configures the esbuild alias when importmap is absent" do
    FileUtils.rm_f(File.join(destination_root, "config/importmap.rb"))
    File.write(File.join(destination_root, "package.json"), <<~JSON)
      {
        "scripts": {
          "build": "esbuild app/javascript/*.* --bundle --outdir=app/assets/builds"
        }
      }
    JSON

    run_generator

    assert_no_file "config/importmap.rb"
    assert_file "app/javascript/controllers/tam_select_controller.js", /from "tam_select"/
    assert_file "app/javascript/tam_select/tam_select.js"
    assert_file "package.json", /--alias:tam_select=.\/app\/javascript\/tam_select\/tam_select\.js/

    package = JSON.parse(File.read(File.join(destination_root, "package.json")))
    assert_includes package.dig("scripts", "build"), "--alias:tam_select="
  end

  test "running twice leaves exactly one esbuild alias" do
    FileUtils.rm_f(File.join(destination_root, "config/importmap.rb"))
    File.write(File.join(destination_root, "package.json"), <<~JSON)
      { "scripts": { "build": "esbuild app/javascript/*.* --bundle" } }
    JSON

    2.times { run_generator }

    package = JSON.parse(File.read(File.join(destination_root, "package.json")))
    assert_equal 1, package.dig("scripts", "build").scan("--alias:tam_select=").length
  end

  test "generates the Simple Form input only when Simple Form is installed" do
    specification = Gem::Specification.new do |spec|
      spec.name = "simple_form"
      spec.version = "5.3.1"
    end
    Gem.loaded_specs["simple_form"] = specification

    run_generator

    assert_file "app/inputs/tam_select_input.rb", /class TamSelectInput/
  end
end
