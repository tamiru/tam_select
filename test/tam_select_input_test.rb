require "test_helper"

module SimpleForm
  module Inputs
    class CollectionSelectInput; end
  end
end

load File.expand_path("../lib/generators/tam_select/templates/tam_select_input.rb", __dir__)

class TamSelectInputTest < Minitest::Test
  Builder = Struct.new(:arguments) do
    def collection_select(*arguments)
      self.arguments = arguments
      :rendered_select
    end
  end

  def test_forwards_multiple_prompt_selection_validation_and_nested_builder_context
    builder = Builder.new
    input = TamSelectInput.allocate
    input.instance_variable_set(:@builder, builder)

    input.define_singleton_method(:input_html_options) do
      {
        multiple: true,
        class: "is-invalid",
        aria: { describedby: "student_skill_ids_error", invalid: "true" },
        data: { controller: "nested tam-select" },
        tam_options: { closeAfterSelect: false }
      }
    end
    input.define_singleton_method(:merge_wrapper_options) { |attributes, wrapper| attributes.merge(wrapper || {}) }
    input.define_singleton_method(:detect_collection_methods) { %i[name id] }
    input.define_singleton_method(:attribute_name) { :skill_ids }
    input.define_singleton_method(:collection) { [["Ruby", 1], ["Rails", 2]] }
    input.define_singleton_method(:input_options) { { prompt: "Choose skills", selected: [1, 2] } }
    input.define_singleton_method(:options) { { searchable: true, prompt: "Choose skills" } }

    assert_equal :rendered_select, input.input(disabled: false)
    attribute, collection, value_method, label_method, select_options, html_options = builder.arguments

    assert_equal :skill_ids, attribute
    assert_equal [["Ruby", 1], ["Rails", 2]], collection
    assert_equal :id, value_method
    assert_equal :name, label_method
    assert_equal({ prompt: "Choose skills", selected: [1, 2] }, select_options)
    assert_equal true, html_options[:multiple]
    assert_equal false, html_options[:disabled]
    assert_equal "is-invalid", html_options[:class]
    assert_equal({ describedby: "student_skill_ids_error", invalid: "true" }, html_options[:aria])
    assert_equal "nested tam-select", html_options.dig(:data, :controller)
    assert_equal false, JSON.parse(html_options.dig(:data, :tam_select_options_value))["closeAfterSelect"]
    refute html_options.key?(:tam_options)
  end
end
