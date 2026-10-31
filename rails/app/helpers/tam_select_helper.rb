module TamSelectHelper
  def tam_select_tag(name, option_tags = nil, options: {}, html_options: {}, &block)
    data = (html_options[:data] ||= {})
    data[:controller] = (data[:controller].to_s.split + ["tam-select"]).uniq.join(" ")
    data[:tam_select_options_value] = tam_select_options.merge(options.to_h.symbolize_keys).to_json
    select_tag(name, option_tags, html_options, &block)
  end

  def tam_select_options(**overrides)
    # `searchable` is left to the JavaScript default (true) unless given, so
    # an app's Stimulus controller can decide it, e.g. by option count.
    {
      clearable: true,
      creatable: false,
      theme: "auto",
      placeholder: "Select…"
    }.merge(overrides)
  end
end
