<?php
declare(strict_types=1);

// Sumo SDK utility: result_body

class SumoResultBody
{
    public static function call(SumoContext $ctx): ?SumoResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
