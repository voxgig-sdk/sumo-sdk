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
    endDate: str
    id: str
    kimarite: str
    matchNumber: int
    month: int
    rank: str
    rikishi1Id: str
    rikishi2Id: str
    rikishiId: str
    shikona: str
    side: str
    startDate: str
    venue: str
    winnerId: str
    year: int


class BashoLoadMatchRequired(TypedDict):
    id: str


class BashoLoadMatch(BashoLoadMatchRequired, total=False):
    division: str


class BashoListMatch(TypedDict):
    basho_id: str
    day: int
    division: str


class Kimarite(TypedDict, total=False):
    category: str
    description: str
    englishName: str
    frequency: int
    name: str


class KimariteLoadMatch(TypedDict):
    id: str


class KimariteListMatch(TypedDict, total=False):
    category: str
    description: str
    englishName: str
    frequency: int
    name: str


class Measurement(TypedDict, total=False):
    height: float
    recordedDate: str
    rikishiId: str
    weight: float


class MeasurementListMatch(TypedDict, total=False):
    height: float
    recordedDate: str
    rikishiId: str
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
    bashoId: str
    birthdate: str
    birthplace: str
    championships: int
    currentRank: str
    day: int
    debut: str
    division: str
    height: float
    heya: str
    highestRank: str
    id: str
    kimarite: str
    realName: str
    rikishi1Id: str
    rikishi2Id: str
    rikishiId: str
    shikona: str
    totalLosses: int
    totalWins: int
    weight: float
    winRate: float
    winnerId: str


class RikishiLoadMatchRequired(TypedDict):
    id: str


class RikishiLoadMatch(RikishiLoadMatchRequired, total=False):
    opponent_id: str


class RikishiListMatch(TypedDict, total=False):
    bashoId: str
    birthdate: str
    birthplace: str
    championships: int
    currentRank: str
    day: int
    debut: str
    division: str
    height: float
    heya: str
    highestRank: str
    id: str
    kimarite: str
    realName: str
    rikishi1Id: str
    rikishi2Id: str
    rikishiId: str
    shikona: str
    totalLosses: int
    totalWins: int
    weight: float
    winRate: float
    winnerId: str


class Shikona(TypedDict, total=False):
    endDate: str
    rikishiId: str
    shikona: str
    startDate: str


class ShikonaListMatch(TypedDict, total=False):
    endDate: str
    rikishiId: str
    shikona: str
    startDate: str
