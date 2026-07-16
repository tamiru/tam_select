module TamSelectHelper
  def tam_select_tag(name, option_tags = nil, options: {}, html_options: {}, &block)
    data = (html_options[:data] ||= {})
    data[:controller] = [data[:controller], "tam-select"].compact.join(" ")
    data[:tam_select_options_value] = options.to_json
    select_tag(name, option_tags, html_options, &block)
  end

  def tam_select_options(**overrides)
    {
      searchable: true,
      clearable: true,
      creatable: false,
      placeholder: "Select…"
    }.merge(overrides)
  end
end
