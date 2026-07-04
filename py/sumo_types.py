# Typed models for the Sumo SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Basho(TypedDict, total=False):
    end_date: str
    id: str
    kimarite: str
    match_number: int
    month: int
    rank: str
    rikishi1_id: str
    rikishi2_id: str
    rikishi_id: str
    shikona: str
    side: str
    start_date: str
    venue: str
    winner_id: str
    year: int


class BashoLoadMatch(TypedDict):
    division: str
    id: str


class BashoListMatch(TypedDict):
    basho_id: str
    day: int
    division: str


class Kimarite(TypedDict, total=False):
    category: str
    description: str
    english_name: str
    frequency: int
    name: str


class KimariteLoadMatch(TypedDict):
    id: str


class KimariteListMatch(TypedDict, total=False):
    category: str
    description: str
    english_name: str
    frequency: int
    name: str


class Measurement(TypedDict, total=False):
    height: float
    recorded_date: str
    rikishi_id: str
    weight: float


class MeasurementListMatch(TypedDict, total=False):
    height: float
    recorded_date: str
    rikishi_id: str
    weight: float


class Rank(TypedDict, total=False):
    division: str
    id: str
    level: int
    name: str


class RankListMatch(TypedDict, total=False):
    division: str
    id: str
    level: int
    name: str


class Rikishi(TypedDict, total=False):
    basho_id: str
    birthdate: str
    birthplace: str
    championship: int
    current_rank: str
    day: int
    debut: str
    division: str
    height: float
    heya: str
    highest_rank: str
    id: str
    kimarite: str
    real_name: str
    rikishi1_id: str
    rikishi2_id: str
    rikishi_id: str
    shikona: str
    total_loss: int
    total_win: int
    weight: float
    win_rate: float
    winner_id: str


class RikishiLoadMatch(TypedDict):
    id: str
    opponent_id: str


class RikishiListMatch(TypedDict):
    id: str


class Shikona(TypedDict, total=False):
    end_date: str
    rikishi_id: str
    shikona: str
    start_date: str


class ShikonaListMatch(TypedDict, total=False):
    end_date: str
    rikishi_id: str
    shikona: str
    start_date: str
