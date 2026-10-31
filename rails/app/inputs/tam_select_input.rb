class TamSelectInput < SimpleForm::Inputs::CollectionSelectInput
  def input(wrapper_options = nil)
    attributes = merge_wrapper_options(input_html_options, wrapper_options)
    label_method, value_method = detect_collection_methods
    tam_options = attributes.delete(:tam_options) || {}
    data = attributes[:data] ||= {}
    data[:controller] = (data[:controller].to_s.split + ["tam-select"]).uniq.join(" ")
    data[:tam_select_options_value] = defaults.merge(tam_options.to_h.symbolize_keys).to_json

    @builder.collection_select(
      attribute_name,
      collection,
      value_method,
      label_method,
      input_options,
      attributes
    )
  end

  private

  def defaults
    {
      creatable: options.fetch(:creatable, false),
      clearable: options.fetch(:clearable, true),
      theme: options.fetch(:theme, "auto"),
      placeholder: options[:placeholder] || options[:prompt] || "Select…"
    }.tap do |defaults|
      # Left to the JavaScript default (true) unless given.
      defaults[:searchable] = options[:searchable] if options.key?(:searchable)
    end
  end
end
