<?php
declare(strict_types=1);

// Sumo SDK utility: feature_add

class SumoFeatureAdd
{
    public static function call(SumoContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
