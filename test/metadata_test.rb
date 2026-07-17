require "test_helper"

class MetadataTest < Minitest::Test
  def test_project_metadata_versions_and_runtime_files
    specification = Gem::Specification.load(File.expand_path("../tam_select.gemspec", __dir__))
    package = JSON.parse(File.read(File.expand_path("../package.json", __dir__)))

    assert_equal "https://github.com/tamiru/tam_select", specification.homepage
    assert_equal specification.homepage, specification.metadata["source_code_uri"]
    assert_equal "true", specification.metadata["rubygems_mfa_required"]
    assert_equal specification.version.to_s, package.fetch("version")
    assert_includes specification.files, "src/tam-select.js"
    assert_includes specification.files, "lib/generators/tam_select/install_generator.rb"
    assert_includes specification.files, "rails/app/javascript/controllers/tam_select_controller.js"
  end
end
