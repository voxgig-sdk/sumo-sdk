<?php
declare(strict_types=1);

// Sumo SDK utility: prepare_body

class SumoPrepareBody
{
    public static function call(SumoContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
