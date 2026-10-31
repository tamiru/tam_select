require "test_helper"
require "action_view"
load File.expand_path("../rails/app/helpers/tam_select_helper.rb", __dir__)

class TamSelectHelperTest < Minitest::Test
  def test_searchable_is_left_to_the_javascript_default_unless_given
    refute TamSelectHelperHost.new.tam_select_options.key?(:searchable)
    assert_equal false, TamSelectHelperHost.new.tam_select_options(searchable: false)[:searchable]
  end

  class TamSelectHelperHost
    include TamSelectHelper
  end
end
