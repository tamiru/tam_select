require "rails/engine"

module TamSelect
  class Engine < ::Rails::Engine
    initializer "tam_select.helpers" do
      ActiveSupport.on_load(:action_view) do
        include TamSelectHelper
      end
    end
  end
end
