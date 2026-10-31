require "test_helper"
require "action_view"
load File.expand_path("../rails/app/helpers/tam_select_helper.rb", __dir__)

class TamSelectHelperTest < Minitest::Test
  def test_searchable_is_left_to_the_javascript_default_unless_given
    refute TamSelectHelperHost.new.tam_select_options.key?(:searchable)
    assert_equal false, TamSelectHelperHost.new.tam_select_options(searchable: false)[:searchable]
  end

  def test_tam_select_tag_adds_a_blank_option_to_single_selects_by_default
    host = TamSelectHelperHost.new
    tags = '<option value="1">Addis</option>'.html_safe

    assert_includes host.tam_select_tag(:region, tags), '<option value="" label=" "></option>'
    refute_includes host.tam_select_tag(:regions, tags, html_options: { multiple: true }), 'value=""'
    refute_includes host.tam_select_tag(:region, tags, html_options: { include_blank: false }), 'value=""'
    assert_equal 1, host.tam_select_tag(:region, tags, html_options: { prompt: "Pick" }).scan('value=""').length
    already_blank = '<option value="">Any</option><option value="1">Addis</option>'.html_safe
    assert_equal 1, host.tam_select_tag(:region, already_blank).scan('value=""').length
  end

  class TamSelectHelperHost
    include ActionView::Helpers::FormTagHelper
    include TamSelectHelper
  end
end
