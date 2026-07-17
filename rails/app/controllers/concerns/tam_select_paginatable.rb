module TamSelectPaginatable
  extend ActiveSupport::Concern

  private

  def tam_select_payload(scope, label:, value: :id, detail: nil, meta: nil, image: nil, per_page: 20)
    page = [params.fetch(:page, 1).to_i, 1].max
    records = scope.limit(per_page + 1).offset((page - 1) * per_page).to_a
    has_more = records.length > per_page

    {
      items: records.first(per_page).map do |record|
        {
          value: tam_select_record_value(record, value).to_s,
          label: tam_select_record_value(record, label).to_s,
          detail: detail && tam_select_record_value(record, detail).to_s,
          meta: meta && tam_select_record_value(record, meta).to_s,
          image: image && tam_select_record_value(record, image).to_s
        }.compact
      end,
      pagination: {
        page: page,
        next_page: has_more ? page + 1 : nil,
        has_more: has_more
      }
    }
  end

  def tam_select_record_value(record, resolver)
    resolver.respond_to?(:call) ? resolver.call(record) : record.public_send(resolver)
  end
end
