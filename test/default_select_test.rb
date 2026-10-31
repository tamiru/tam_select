require "test_helper"
require "action_view"
load File.expand_path("../rails/app/helpers/tam_select_helper.rb", __dir__)

class DefaultSelectTest < Minitest::Test
  class View
    include ActionView::Helpers::FormTagHelper
    include ActionView::Helpers::FormOptionsHelper
    include TamSelectHelper
    prepend TamSelect::DefaultSelect
  end

  def setup
    @view = View.new
  end

  def test_select_tag_becomes_a_tam_select_with_a_blank_option
    html = @view.select_tag(:region, @view.options_for_select([["Addis", 1]]), class: "select")
    assert_includes html, 'data-controller="tam-select"'
    assert_includes html, "data-tam-select-options-value="
    assert_includes html, '<option value="" label=" "></option>'
    assert_includes html, 'class="select"'
  end

  def test_select_tag_keeps_existing_controllers_and_blank_handling
    html = @view.select_tag(:sort, @view.options_for_select([["All", ""], ["Name", "name"]]), data: { controller: "auto-submit", action: "change->auto-submit#submit" })
    assert_includes html, 'data-controller="auto-submit tam-select"'
    assert_includes html, 'data-action="change-&gt;auto-submit#submit"'
    assert_equal 1, html.scan('value=""').length, "an existing blank option is not doubled"

    html = @view.select_tag(:region, @view.options_for_select([["Addis", 1]]), prompt: "Pick")
    assert_equal 1, html.scan('value=""').length
  end

  def test_form_select_and_collection_select_become_tam_selects
    html = @view.select(:person, :region, [["Addis", 1], ["Oromia", 2]], {}, class: "select w-full")
    assert_includes html, 'data-controller="tam-select"'
    assert_includes html, '<option value="" label=" "></option>'

    html = @view.select(:person, :region, [["All", ""], ["Addis", 1]], {}, {})
    assert_equal 1, html.scan('value=""').length

    html = @view.select(:person, :regions, [["Addis", 1]], {}, multiple: true)
    refute_includes html, '<option value=""', "multiple selects get no blank option"
    assert_includes html, 'data-controller="tam-select"'

    region = Struct.new(:id, :name)
    html = @view.collection_select(:person, :region_id, [region.new(1, "Addis")], :id, :name)
    assert_includes html, 'data-controller="tam-select"'
    assert_includes html, '<option value="" label=" "></option>'
  end

  def test_a_prompt_stays_as_a_blank_option_after_a_value_is_chosen
    person = Struct.new(:region).new("1")
    html = @view.select(:person, :region, [["Addis", "1"]], { prompt: "Select region", object: person }, {})
    assert_includes html, '<option value="">Select region</option>', "the blank option survives a selected value"
    assert_includes html, '<option selected="selected" value="1">Addis</option>'
    assert_equal 1, html.scan('value=""').length

    html = @view.select(:person, :regions, [["Addis", "1"]], { prompt: "Pick" }, multiple: true)
    assert_equal 1, html.scan('<option value="">Pick</option>').length, "multiple selects keep Rails' own prompt handling"
  end

  def test_a_field_opts_out_with_data_tam_select_false
    html = @view.select_tag(:region, @view.options_for_select([["Addis", 1]]), data: { controller: "tom-select", tam_select: false })
    assert_includes html, 'data-controller="tom-select"'
    refute_includes html, "tam-select\""
    refute_includes html, 'value=""'
  end

  def test_the_engine_maps_simple_forms_select_type_when_enabled
    assert_equal false, TamSelect::Engine.config.tam_select.default_select
    initializer = TamSelect::Engine.initializers.find { |i| i.name == "tam_select.default_select" }
    assert initializer, "the engine registers the default_select initializer"
  end
end
