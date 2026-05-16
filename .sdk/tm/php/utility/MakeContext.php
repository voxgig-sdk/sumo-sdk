<?php
declare(strict_types=1);

// Sumo SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class SumoMakeContext
{
    public static function call(array $ctxmap, ?SumoContext $basectx): SumoContext
    {
        return new SumoContext($ctxmap, $basectx);
    }
}
