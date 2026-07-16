class TamSelectRemoteController < ApplicationController
  include TamSelectPaginatable

  class_attribute :tam_select_config, instance_writer: false

  def self.tam_select(model:, label:, value: :id, search_by: nil, per_page: 20)
    self.tam_select_config = {
      model: model,
      label: label,
      value: value,
      search_by: Array(search_by || label),
      per_page: per_page
    }.freeze
  end

  def index
    config = self.class.tam_select_config
    raise "Configure #{self.class.name} with tam_select(...)" unless config

    records = search(tam_select_scope(config), config)
    render json: tam_select_payload(
      records,
      label: config[:label],
      value: config[:value],
      per_page: config[:per_page]
    )
  end

  private

  def tam_select_scope(config)
    config[:model].all
  end

  def search(records, config)
    query = params[:q].to_s.strip
    return records if query.blank?

    model = config[:model]
    pattern = "%#{model.sanitize_sql_like(query)}%"
    predicates = config[:search_by].map { |field| model.arel_table[field].matches(pattern) }
    records.where(predicates.reduce(&:or))
  end
end
