class TamSelectInput < SimpleForm::Inputs::CollectionSelectInput
  def input(wrapper_options = nil)
    attributes = merge_wrapper_options(input_html_options, wrapper_options)
    # With config.tam_select.default_select this input renders every select;
    # `input_html: { data: { tam_select: false } }` keeps one native.
    return super if TamSelect::DefaultSelect.opted_out?(attributes)

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
      TamSelect::DefaultSelect.prompt_as_blank(input_options, attributes),
      attributes
    )
  end

  private

  # Simple Form adds a blank option to single selects unless `prompt`,
  # `include_blank`, `selected` or `default` is given. Keep it for `selected`
  # and `default` too: the blank option is what lets the field be cleared and
  # show its placeholder.
  def skip_include_blank?
    (options.keys & %i[prompt include_blank]).any? || multiple?
  end

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
