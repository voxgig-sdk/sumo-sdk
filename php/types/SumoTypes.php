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
    public ?string $end_date = null;
    public ?string $id = null;
    public ?string $kimarite = null;
    public ?int $match_number = null;
    public ?int $month = null;
    public ?string $rank = null;
    public ?string $rikishi1_id = null;
    public ?string $rikishi2_id = null;
    public ?string $rikishi_id = null;
    public ?string $shikona = null;
    public ?string $side = null;
    public ?string $start_date = null;
    public ?string $venue = null;
    public ?string $winner_id = null;
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
    public ?string $english_name = null;
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
    public ?string $english_name = null;
    public ?int $frequency = null;
    public ?string $name = null;
}

/** Measurement entity data model. */
class Measurement
{
    public ?float $height = null;
    public ?string $recorded_date = null;
    public ?string $rikishi_id = null;
    public ?float $weight = null;
}

/** Request payload for Measurement#list. */
class MeasurementListMatch
{
    public ?float $height = null;
    public ?string $recorded_date = null;
    public ?string $rikishi_id = null;
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
    public ?string $basho_id = null;
    public ?string $birthdate = null;
    public ?string $birthplace = null;
    public ?int $championship = null;
    public ?string $current_rank = null;
    public ?int $day = null;
    public ?string $debut = null;
    public ?string $division = null;
    public ?float $height = null;
    public ?string $heya = null;
    public ?string $highest_rank = null;
    public ?string $id = null;
    public ?string $kimarite = null;
    public ?string $real_name = null;
    public ?string $rikishi1_id = null;
    public ?string $rikishi2_id = null;
    public ?string $rikishi_id = null;
    public ?string $shikona = null;
    public ?int $total_loss = null;
    public ?int $total_win = null;
    public ?float $weight = null;
    public ?float $win_rate = null;
    public ?string $winner_id = null;
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
    public ?string $basho_id = null;
    public ?string $birthdate = null;
    public ?string $birthplace = null;
    public ?int $championship = null;
    public ?string $current_rank = null;
    public ?int $day = null;
    public ?string $debut = null;
    public ?string $division = null;
    public ?float $height = null;
    public ?string $heya = null;
    public ?string $highest_rank = null;
    public ?string $id = null;
    public ?string $kimarite = null;
    public ?string $real_name = null;
    public ?string $rikishi1_id = null;
    public ?string $rikishi2_id = null;
    public ?string $rikishi_id = null;
    public ?string $shikona = null;
    public ?int $total_loss = null;
    public ?int $total_win = null;
    public ?float $weight = null;
    public ?float $win_rate = null;
    public ?string $winner_id = null;
}

/** Shikona entity data model. */
class Shikona
{
    public ?string $end_date = null;
    public ?string $rikishi_id = null;
    public ?string $shikona = null;
    public ?string $start_date = null;
}

/** Request payload for Shikona#list. */
class ShikonaListMatch
{
    public ?string $end_date = null;
    public ?string $rikishi_id = null;
    public ?string $shikona = null;
    public ?string $start_date = null;
}

