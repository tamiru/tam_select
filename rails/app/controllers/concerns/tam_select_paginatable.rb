module TamSelectPaginatable
  extend ActiveSupport::Concern

  private

  def tam_select_payload(scope, label:, value: :id, per_page: 20)
    page = [params.fetch(:page, 1).to_i, 1].max
    records = scope.limit(per_page + 1).offset((page - 1) * per_page).to_a
    has_more = records.length > per_page

    {
      items: records.first(per_page).map do |record|
        {
          value: record.public_send(value).to_s,
          label: label.respond_to?(:call) ? label.call(record) : record.public_send(label).to_s
        }
      end,
      pagination: {
        page: page,
        next_page: has_more ? page + 1 : nil,
        has_more: has_more
      }
    }
  end
end
