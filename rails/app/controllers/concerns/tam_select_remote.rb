module TamSelectRemote
  extend ActiveSupport::Concern

  included do
    include TamSelectPaginatable
    class_attribute :tam_select_remote_config, instance_writer: false
  end

  class_methods do
    def tam_select_remote(model:, label:, value: :id, detail: nil, meta: nil, image: nil, search_by: nil, scope: nil, per_page: 20)
      self.tam_select_remote_config = {
        model: model,
        label: label,
        value: value,
        detail: detail,
        meta: meta,
        image: image,
        search_by: Array(search_by || label),
        scope: scope,
        per_page: per_page
      }.freeze
    end
  end

  def tam_select_options
    config = tam_select_remote_config!
    records = tam_select_remote_search(tam_select_remote_scope(config), config)

    render json: tam_select_payload(
      records,
      label: config[:label],
      value: config[:value],
      detail: config[:detail],
      meta: config[:meta],
      image: config[:image],
      per_page: config[:per_page]
    )
  end

  private

  def tam_select_remote_config!
    self.class.tam_select_remote_config ||
      raise("Configure #{self.class.name} with tam_select_remote(...)")
  end

  def tam_select_remote_scope(config)
    config[:scope] ? instance_exec(&config[:scope]) : config[:model].all
  end

  def tam_select_remote_search(records, config)
    query = params[:q].to_s.strip
    return records if query.blank?

    model = config[:model]
    pattern = "%#{model.sanitize_sql_like(query)}%"
    predicates = config[:search_by].map { |field| model.arel_table[field].matches(pattern) }
    records.where(predicates.reduce(&:or))
  end
end
