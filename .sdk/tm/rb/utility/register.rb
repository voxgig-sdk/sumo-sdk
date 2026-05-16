# Sumo SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

SumoUtility.registrar = ->(u) {
  u.clean = SumoUtilities::Clean
  u.done = SumoUtilities::Done
  u.make_error = SumoUtilities::MakeError
  u.feature_add = SumoUtilities::FeatureAdd
  u.feature_hook = SumoUtilities::FeatureHook
  u.feature_init = SumoUtilities::FeatureInit
  u.fetcher = SumoUtilities::Fetcher
  u.make_fetch_def = SumoUtilities::MakeFetchDef
  u.make_context = SumoUtilities::MakeContext
  u.make_options = SumoUtilities::MakeOptions
  u.make_request = SumoUtilities::MakeRequest
  u.make_response = SumoUtilities::MakeResponse
  u.make_result = SumoUtilities::MakeResult
  u.make_point = SumoUtilities::MakePoint
  u.make_spec = SumoUtilities::MakeSpec
  u.make_url = SumoUtilities::MakeUrl
  u.param = SumoUtilities::Param
  u.prepare_auth = SumoUtilities::PrepareAuth
  u.prepare_body = SumoUtilities::PrepareBody
  u.prepare_headers = SumoUtilities::PrepareHeaders
  u.prepare_method = SumoUtilities::PrepareMethod
  u.prepare_params = SumoUtilities::PrepareParams
  u.prepare_path = SumoUtilities::PreparePath
  u.prepare_query = SumoUtilities::PrepareQuery
  u.result_basic = SumoUtilities::ResultBasic
  u.result_body = SumoUtilities::ResultBody
  u.result_headers = SumoUtilities::ResultHeaders
  u.transform_request = SumoUtilities::TransformRequest
  u.transform_response = SumoUtilities::TransformResponse
}
