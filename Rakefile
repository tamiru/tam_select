require "bundler/gem_tasks"

begin
  require "rake/testtask"
  Rake::TestTask.new do |test|
    test.libs << "test"
    test.pattern = "test/**/*_test.rb"
  end
rescue LoadError
  # Rake's test task is unavailable.
end
