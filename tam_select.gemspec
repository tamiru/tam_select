require_relative "lib/tam_select/version"

Gem::Specification.new do |spec|
  spec.name = "tam_select"
  spec.version = TamSelect::VERSION
  spec.authors = ["Winner Systems"]
  spec.email = ["developers@example.com"]
  spec.summary = "Tailwind CSS 4 select component for Rails 8, Turbo and Stimulus"
  spec.description = "An accessible searchable, multi-select and remote-data select component that preserves the native Rails select as the source of truth."
  spec.homepage = "https://github.com/tamiru/tam_select"
  spec.license = "MIT"
  spec.required_ruby_version = ">= 3.2.0"

  spec.metadata = {
    "source_code_uri" => spec.homepage,
    "changelog_uri" => "#{spec.homepage}/releases",
    "rubygems_mfa_required" => "true"
  }

  spec.files = Dir.chdir(__dir__) do
    Dir["{app,lib,src,examples}/**/*", "LICENSE", "README.md", "Rakefile"]
  end
  spec.require_paths = ["lib"]

  spec.add_dependency "railties", ">= 8.0", "< 9.0"
  spec.add_dependency "stimulus-rails", ">= 1.3"
end
