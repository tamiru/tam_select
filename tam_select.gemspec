require_relative "lib/tam_select/version"

Gem::Specification.new do |spec|
  spec.name = "tam_select"
  spec.version = TamSelect::VERSION
  spec.authors = ["Tamiru Hailu"]
  spec.summary = "An accessible select component for Ruby on Rails"
  spec.description = "Tam Select provides searchable, multi-select, remote-data, and user-created option support for Ruby on Rails applications using Simple Form, Stimulus, Turbo, and Tailwind CSS."
  spec.homepage = "https://github.com/tamiru/tam_select"
  spec.license = "MIT"
  spec.required_ruby_version = ">= 3.2.0"

  spec.metadata = {
    "source_code_uri" => spec.homepage,
    "changelog_uri" => "#{spec.homepage}/releases",
    "rubygems_mfa_required" => "true"
  }

  spec.files = Dir.chdir(__dir__) do
    Dir["{lib,rails,src,examples}/**/*", "LICENSE", "README.md", "Rakefile", "package.json"]
  end
  spec.require_paths = ["lib"]

  spec.add_dependency "railties", ">= 8.0", "< 9.0"
  spec.add_dependency "stimulus-rails", ">= 1.3"
end
