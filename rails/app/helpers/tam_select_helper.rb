module TamSelectHelper
  def tam_select_tag(name, option_tags = nil, options: {}, html_options: {}, &block)
    data = (html_options[:data] ||= {})
    data[:controller] = (data[:controller].to_s.split + ["tam-select"]).uniq.join(" ")
    data[:tam_select_options_value] = tam_select_options.merge(options.to_h.symbolize_keys).to_json
    # A single select needs a blank option to be cleared and to show its
    # placeholder, so add one unless the caller handles it.
    html_options[:include_blank] = true if tam_select_add_blank?(option_tags, html_options)
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

  private

  def tam_select_add_blank?(option_tags, html_options)
    TamSelect::DefaultSelect.add_blank?(html_options, html_options, option_tags: option_tags.to_s)
  end
end
