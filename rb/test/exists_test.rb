# Sumo SDK exists test

require "minitest/autorun"
require_relative "../Sumo_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = SumoSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
