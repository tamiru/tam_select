require "generators/tam_select/install_generator"

module TamSelect
  module Generators
    # Upgrades an app installed by tam_select 1.3 or earlier: removes the
    # copied files it never changed so the gem's versions load instead.
    # After that, `bundle update tam_select` is the whole update.
    class UpdateGenerator < InstallGenerator
      desc "Switch an app installed by tam_select 1.3 or earlier to the gem-served files"
      source_root File.expand_path("templates", __dir__)
    end
  end
end
