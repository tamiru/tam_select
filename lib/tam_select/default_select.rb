require "json"

module TamSelect
  # Makes Tam Select the default for every select rendered with Rails' own
  # helpers: select_tag, select, collection_select and grouped_collection_select,
  # and so form builders' f.select and friends. Enabled by
  # `config.tam_select.default_select = true`; the engine then prepends this
  # module to ActionView::Base and maps Simple Form's :select type to
  # TamSelectInput. Opt a field out with `data: { tam_select: false }`.
  module DefaultSelect
    def select_tag(name, option_tags = nil, options = {})
      options = DefaultSelect.html_options(options, template: self, option_tags: option_tags)
      super(name, option_tags, options)
    end

    def select(object, method, choices = nil, options = {}, html_options = {}, &block)
      html_options = DefaultSelect.html_options(html_options, template: self)
      options = DefaultSelect.select_options(options, html_options, choices: choices) unless DefaultSelect.opted_out?(html_options)
      super(object, method, choices, options, html_options, &block)
    end

    def collection_select(object, method, collection, value_method, text_method, options = {}, html_options = {})
      html_options = DefaultSelect.html_options(html_options, template: self)
      options = DefaultSelect.select_options(options, html_options) unless DefaultSelect.opted_out?(html_options)
      super(object, method, collection, value_method, text_method, options, html_options)
    end

    def grouped_collection_select(object, method, collection, group_method, group_label_method, option_key_method, option_value_method, options = {}, html_options = {})
      html_options = DefaultSelect.html_options(html_options, template: self)
      options = DefaultSelect.select_options(options, html_options) unless DefaultSelect.opted_out?(html_options)
      super(object, method, collection, group_method, group_label_method, option_key_method, option_value_method, options, html_options)
    end

    class << self
      # Adds the tam-select controller (and its default options) to a select's
      # HTML options. For select_tag the same hash also carries include_blank.
      def html_options(html, template:, option_tags: nil)
        html = (html || {}).to_h.transform_keys(&:to_sym)
        return html if opted_out?(html)

        data = (html[:data] || {}).to_h.transform_keys(&:to_sym)
        controllers = data[:controller].to_s.split
        unless controllers.include?("tam-select")
          data[:controller] = (controllers + ["tam-select"]).join(" ")
          data[:tam_select_options_value] ||= defaults(template).to_json
        end
        html[:data] = data
        html[:include_blank] = true if option_tags && add_blank?(html, html, option_tags: option_tags)
        html
      end

      # Adds include_blank to the options hash of select/collection_select.
      def select_options(options, html, choices: nil)
        options = (options || {}).to_h.transform_keys(&:to_sym)
        return options unless add_blank?(options, html, choices: choices)

        options.merge(include_blank: true)
      end

      # A single select needs a blank option to be cleared and to show its
      # placeholder. Add one unless the caller handles it or the choices
      # already contain one.
      def add_blank?(options, html, option_tags: nil, choices: nil)
        return false if html[:multiple] || options.key?(:include_blank) || options.key?(:prompt)

        !blank_present?(option_tags || choices)
      end

      def opted_out?(html)
        data = html[:data] || html["data"]
        return false unless data.respond_to?(:key?)

        value = data.key?(:tam_select) ? data[:tam_select] : data["tam_select"]
        value == false || value.to_s == "false"
      end

      private

      def defaults(template)
        template.respond_to?(:tam_select_options, true) ? template.tam_select_options : {}
      end

      def blank_present?(choices)
        case choices
        when String then choices.match?(/<option\b[^>]*\bvalue=(""|'')/)
        when Hash then choices.values.any? { |value| value.to_s.empty? }
        when Array
          choices.any? do |choice|
            value = choice.is_a?(Array) && choice.size > 1 ? choice[1] : choice
            value.to_s.empty?
          end
        else false
        end
      end
    end
  end
end
