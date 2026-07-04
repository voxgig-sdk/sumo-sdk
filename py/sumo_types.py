# Typed models for the Sumo SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Basho:
    end_date: Optional[str] = None
    id: Optional[str] = None
    kimarite: Optional[str] = None
    match_number: Optional[int] = None
    month: Optional[int] = None
    rank: Optional[str] = None
    rikishi1_id: Optional[str] = None
    rikishi2_id: Optional[str] = None
    rikishi_id: Optional[str] = None
    shikona: Optional[str] = None
    side: Optional[str] = None
    start_date: Optional[str] = None
    venue: Optional[str] = None
    winner_id: Optional[str] = None
    year: Optional[int] = None


@dataclass
class BashoLoadMatch:
    division: str
    id: str


@dataclass
class BashoListMatch:
    basho_id: str
    day: int
    division: str


@dataclass
class Kimarite:
    category: Optional[str] = None
    description: Optional[str] = None
    english_name: Optional[str] = None
    frequency: Optional[int] = None
    name: Optional[str] = None


@dataclass
class KimariteLoadMatch:
    id: str


@dataclass
class KimariteListMatch:
    category: Optional[str] = None
    description: Optional[str] = None
    english_name: Optional[str] = None
    frequency: Optional[int] = None
    name: Optional[str] = None


@dataclass
class Measurement:
    height: Optional[float] = None
    recorded_date: Optional[str] = None
    rikishi_id: Optional[str] = None
    weight: Optional[float] = None


@dataclass
class MeasurementListMatch:
    height: Optional[float] = None
    recorded_date: Optional[str] = None
    rikishi_id: Optional[str] = None
    weight: Optional[float] = None


@dataclass
class Rank:
    division: Optional[str] = None
    id: Optional[str] = None
    level: Optional[int] = None
    name: Optional[str] = None


@dataclass
class RankListMatch:
    division: Optional[str] = None
    id: Optional[str] = None
    level: Optional[int] = None
    name: Optional[str] = None


@dataclass
class Rikishi:
    basho_id: Optional[str] = None
    birthdate: Optional[str] = None
    birthplace: Optional[str] = None
    championship: Optional[int] = None
    current_rank: Optional[str] = None
    day: Optional[int] = None
    debut: Optional[str] = None
    division: Optional[str] = None
    height: Optional[float] = None
    heya: Optional[str] = None
    highest_rank: Optional[str] = None
    id: Optional[str] = None
    kimarite: Optional[str] = None
    real_name: Optional[str] = None
    rikishi1_id: Optional[str] = None
    rikishi2_id: Optional[str] = None
    rikishi_id: Optional[str] = None
    shikona: Optional[str] = None
    total_loss: Optional[int] = None
    total_win: Optional[int] = None
    weight: Optional[float] = None
    win_rate: Optional[float] = None
    winner_id: Optional[str] = None


@dataclass
class RikishiLoadMatch:
    id: str
    opponent_id: str


@dataclass
class RikishiListMatch:
    id: str


@dataclass
class Shikona:
    end_date: Optional[str] = None
    rikishi_id: Optional[str] = None
    shikona: Optional[str] = None
    start_date: Optional[str] = None


@dataclass
class ShikonaListMatch:
    end_date: Optional[str] = None
    rikishi_id: Optional[str] = None
    shikona: Optional[str] = None
    start_date: Optional[str] = None

