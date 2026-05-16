# Sumo SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module SumoFeatures
  def self.make_feature(name)
    case name
    when "base"
      SumoBaseFeature.new
    when "test"
      SumoTestFeature.new
    else
      SumoBaseFeature.new
    end
  end
end
