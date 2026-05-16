<?php
declare(strict_types=1);

// Sumo SDK utility: result_headers

class SumoResultHeaders
{
    public static function call(SumoContext $ctx): ?SumoResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
