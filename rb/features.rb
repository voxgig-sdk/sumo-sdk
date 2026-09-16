# Sumo SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module SumoFeatures
  def self.make_feature(name)
    case name
    when "base"
      SumoBaseFeature.new
    when "ratelimit"
      SumoRatelimitFeature.new
    when "retry"
      SumoRetryFeature.new
    when "test"
      SumoTestFeature.new
    when "timeout"
      SumoTimeoutFeature.new
    else
      SumoBaseFeature.new
    end
  end
end
