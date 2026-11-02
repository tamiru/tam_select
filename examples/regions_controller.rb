class RegionsController < ApplicationController
  include TamSelectPaginatable

  def index
    query = params[:q].to_s.strip
    regions = Region.order(:name)
    regions = regions.where("name LIKE ?", "%#{Region.sanitize_sql_like(query)}%") if query.present?
    render json: tam_select_payload(regions, label: :name)
  end
end
