class TamSelectInput < SimpleForm::Inputs::CollectionSelectInput
  def input(wrapper_options = nil)
    merged_input_options = merge_wrapper_options(input_html_options, wrapper_options)
    label_method, value_method = detect_collection_methods
    tam_options = merged_input_options.delete(:tam_options) || {}
    data = merged_input_options[:data] ||= {}
    data[:controller] = [data[:controller], "tam-select"].compact.join(" ")
    data[:tam_select_options_value] = default_tam_options.merge(tam_options).to_json

    @builder.collection_select(
      attribute_name,
      collection,
      value_method,
      label_method,
      input_options,
      merged_input_options
    )
  end

  private

  def default_tam_options
    {
      searchable: options.fetch(:searchable, true),
      creatable: options.fetch(:creatable, false),
      clearable: options.fetch(:clearable, true),
      placeholder: options[:placeholder] || options[:prompt] || "Select…"
    }
  end
end
