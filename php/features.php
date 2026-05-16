<?php
declare(strict_types=1);

// Sumo SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class SumoFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new SumoBaseFeature();
            case "test":
                return new SumoTestFeature();
            default:
                return new SumoBaseFeature();
        }
    }
}
