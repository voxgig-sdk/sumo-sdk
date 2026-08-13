<?php
declare(strict_types=1);

// Typed models for the Sumo SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Basho entity data model. */
class Basho
{
    public ?string $endDate = null;
    public ?string $id = null;
    public ?string $kimarite = null;
    public ?int $matchNumber = null;
    public ?int $month = null;
    public ?string $rank = null;
    public ?string $rikishi1Id = null;
    public ?string $rikishi2Id = null;
    public ?string $rikishiId = null;
    public ?string $shikona = null;
    public ?string $side = null;
    public ?string $startDate = null;
    public ?string $venue = null;
    public ?string $winnerId = null;
    public ?int $year = null;
}

/** Request payload for Basho#load. */
class BashoLoadMatch
{
    public ?string $division = null;
    public string $id;
}

/** Request payload for Basho#list. */
class BashoListMatch
{
    public string $basho_id;
    public int $day;
    public string $division;
}

/** Kimarite entity data model. */
class Kimarite
{
    public ?string $category = null;
    public ?string $description = null;
    public ?string $englishName = null;
    public ?int $frequency = null;
    public ?string $name = null;
}

/** Request payload for Kimarite#load. */
class KimariteLoadMatch
{
    public string $id;
}

/** Request payload for Kimarite#list. */
class KimariteListMatch
{
    public ?string $category = null;
    public ?string $description = null;
    public ?string $englishName = null;
    public ?int $frequency = null;
    public ?string $name = null;
}

/** Measurement entity data model. */
class Measurement
{
    public ?float $height = null;
    public ?string $recordedDate = null;
    public ?string $rikishiId = null;
    public ?float $weight = null;
}

/** Request payload for Measurement#list. */
class MeasurementListMatch
{
    public ?float $height = null;
    public ?string $recordedDate = null;
    public ?string $rikishiId = null;
    public ?float $weight = null;
}

/** Rank entity data model. */
class Rank
{
    public ?string $division = null;
    public ?string $id = null;
    public ?int $level = null;
    public ?string $name = null;
}

/** Request payload for Rank#list. */
class RankListMatch
{
    public ?string $division = null;
    public ?string $id = null;
    public ?int $level = null;
    public ?string $name = null;
}

/** Rikishi entity data model. */
class Rikishi
{
    public ?string $bashoId = null;
    public ?string $birthdate = null;
    public ?string $birthplace = null;
    public ?int $championships = null;
    public ?string $currentRank = null;
    public ?int $day = null;
    public ?string $debut = null;
    public ?string $division = null;
    public ?float $height = null;
    public ?string $heya = null;
    public ?string $highestRank = null;
    public ?string $id = null;
    public ?string $kimarite = null;
    public ?string $realName = null;
    public ?string $rikishi1Id = null;
    public ?string $rikishi2Id = null;
    public ?string $rikishiId = null;
    public ?string $shikona = null;
    public ?int $totalLosses = null;
    public ?int $totalWins = null;
    public ?float $weight = null;
    public ?float $winRate = null;
    public ?string $winnerId = null;
}

/** Request payload for Rikishi#load. */
class RikishiLoadMatch
{
    public string $id;
    public ?string $opponent_id = null;
}

/** Request payload for Rikishi#list. */
class RikishiListMatch
{
    public ?string $bashoId = null;
    public ?string $birthdate = null;
    public ?string $birthplace = null;
    public ?int $championships = null;
    public ?string $currentRank = null;
    public ?int $day = null;
    public ?string $debut = null;
    public ?string $division = null;
    public ?float $height = null;
    public ?string $heya = null;
    public ?string $highestRank = null;
    public ?string $id = null;
    public ?string $kimarite = null;
    public ?string $realName = null;
    public ?string $rikishi1Id = null;
    public ?string $rikishi2Id = null;
    public ?string $rikishiId = null;
    public ?string $shikona = null;
    public ?int $totalLosses = null;
    public ?int $totalWins = null;
    public ?float $weight = null;
    public ?float $winRate = null;
    public ?string $winnerId = null;
}

/** Shikona entity data model. */
class Shikona
{
    public ?string $endDate = null;
    public ?string $rikishiId = null;
    public ?string $shikona = null;
    public ?string $startDate = null;
}

/** Request payload for Shikona#list. */
class ShikonaListMatch
{
    public ?string $endDate = null;
    public ?string $rikishiId = null;
    public ?string $shikona = null;
    public ?string $startDate = null;
}

