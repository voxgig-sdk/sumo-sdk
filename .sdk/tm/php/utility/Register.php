<?php
declare(strict_types=1);

// Sumo SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

SumoUtility::setRegistrar(function (SumoUtility $u): void {
    $u->clean = [SumoClean::class, 'call'];
    $u->done = [SumoDone::class, 'call'];
    $u->make_error = [SumoMakeError::class, 'call'];
    $u->feature_add = [SumoFeatureAdd::class, 'call'];
    $u->feature_hook = [SumoFeatureHook::class, 'call'];
    $u->feature_init = [SumoFeatureInit::class, 'call'];
    $u->fetcher = [SumoFetcher::class, 'call'];
    $u->make_fetch_def = [SumoMakeFetchDef::class, 'call'];
    $u->make_context = [SumoMakeContext::class, 'call'];
    $u->make_options = [SumoMakeOptions::class, 'call'];
    $u->make_request = [SumoMakeRequest::class, 'call'];
    $u->make_response = [SumoMakeResponse::class, 'call'];
    $u->make_result = [SumoMakeResult::class, 'call'];
    $u->make_point = [SumoMakePoint::class, 'call'];
    $u->make_spec = [SumoMakeSpec::class, 'call'];
    $u->make_url = [SumoMakeUrl::class, 'call'];
    $u->param = [SumoParam::class, 'call'];
    $u->prepare_auth = [SumoPrepareAuth::class, 'call'];
    $u->prepare_body = [SumoPrepareBody::class, 'call'];
    $u->prepare_headers = [SumoPrepareHeaders::class, 'call'];
    $u->prepare_method = [SumoPrepareMethod::class, 'call'];
    $u->prepare_params = [SumoPrepareParams::class, 'call'];
    $u->prepare_path = [SumoPreparePath::class, 'call'];
    $u->prepare_query = [SumoPrepareQuery::class, 'call'];
    $u->result_basic = [SumoResultBasic::class, 'call'];
    $u->result_body = [SumoResultBody::class, 'call'];
    $u->result_headers = [SumoResultHeaders::class, 'call'];
    $u->transform_request = [SumoTransformRequest::class, 'call'];
    $u->transform_response = [SumoTransformResponse::class, 'call'];
});
