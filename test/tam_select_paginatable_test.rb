require "test_helper"
require "active_support/concern"
require "active_support/core_ext/object/blank"

load File.expand_path("../lib/generators/tam_select/templates/tam_select_paginatable.rb", __dir__)

class TamSelectPaginatableTest < Minitest::Test
  Record = Struct.new(:id, :name, :email, :avatar_url, keyword_init: true)

  # Minimal stand-in for an ActiveRecord relation's limit/offset chain.
  class Scope
    def initialize(records) = @records = records
    def limit(count) = tap { @limit = count }
    def offset(count) = tap { @offset = count }
    def to_a = @records.drop(@offset).first(@limit)
  end

  class Host
    include TamSelectPaginatable
    attr_reader :params

    def initialize(params = {}) = @params = params
    public :tam_select_payload
  end

  def test_omits_blank_optional_fields_so_no_empty_detail_or_image_renders
    records = [
      Record.new(id: 1, name: "Ada", email: "ada@example.com", avatar_url: "/ada.png"),
      Record.new(id: 2, name: "Lin", email: nil, avatar_url: "")
    ]

    payload = Host.new.tam_select_payload(Scope.new(records), label: :name, detail: :email, image: :avatar_url)

    assert_equal(
      [
        { value: "1", label: "Ada", detail: "ada@example.com", image: "/ada.png" },
        { value: "2", label: "Lin" }
      ],
      payload[:items]
    )
    assert_equal({ page: 1, next_page: nil, has_more: false }, payload[:pagination])
  end

  def test_paginates_with_a_look_ahead_record
    records = (1..3).map { Record.new(id: _1, name: "R#{_1}") }

    payload = Host.new({ page: "2" }).tam_select_payload(Scope.new(records), label: :name, per_page: 1)

    assert_equal [{ value: "2", label: "R2" }], payload[:items]
    assert_equal({ page: 2, next_page: 3, has_more: true }, payload[:pagination])
  end
end
