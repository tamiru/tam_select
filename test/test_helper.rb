ENV["RAILS_ENV"] ||= "test"

require "minitest/autorun"
require "fileutils"
require "json"
require "rails"
require "rails/generators/test_case"
require "tam_select"
