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
          detail: tam_select_optional_value(record, detail),
          meta: tam_select_optional_value(record, meta),
          image: tam_select_optional_value(record, image)
        }.compact
      end,
      pagination: {
        page: page,
        next_page: has_more ? page + 1 : nil,
        has_more: has_more
      }
    }
  end

  # Blank optional fields are omitted so the client never renders an empty
  # detail line, meta badge, or an <img> with an empty src.
  def tam_select_optional_value(record, resolver)
    resolver && tam_select_record_value(record, resolver).to_s.presence
  end

  def tam_select_record_value(record, resolver)
    resolver.respond_to?(:call) ? resolver.call(record) : record.public_send(resolver)
  end
end
