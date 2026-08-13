-- Typed models for the Sumo SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Basho
---@field endDate? string
---@field id? string
---@field kimarite? string
---@field matchNumber? number
---@field month? number
---@field rank? string
---@field rikishi1Id? string
---@field rikishi2Id? string
---@field rikishiId? string
---@field shikona? string
---@field side? string
---@field startDate? string
---@field venue? string
---@field winnerId? string
---@field year? number

---@class BashoLoadMatch
---@field division? string
---@field id string

---@class BashoListMatch
---@field basho_id string
---@field day number
---@field division string

---@class Kimarite
---@field category? string
---@field description? string
---@field englishName? string
---@field frequency? number
---@field name? string

---@class KimariteLoadMatch
---@field id string

---@class KimariteListMatch
---@field category? string
---@field description? string
---@field englishName? string
---@field frequency? number
---@field name? string

---@class Measurement
---@field height? number
---@field recordedDate? string
---@field rikishiId? string
---@field weight? number

---@class MeasurementListMatch
---@field height? number
---@field recordedDate? string
---@field rikishiId? string
---@field weight? number

---@class Rank
---@field division? string
---@field id? string
---@field level? number
---@field name? string

---@class RankListMatch
---@field division? string
---@field id? string
---@field level? number
---@field name? string

---@class Rikishi
---@field bashoId? string
---@field birthdate? string
---@field birthplace? string
---@field championships? number
---@field currentRank? string
---@field day? number
---@field debut? string
---@field division? string
---@field height? number
---@field heya? string
---@field highestRank? string
---@field id? string
---@field kimarite? string
---@field realName? string
---@field rikishi1Id? string
---@field rikishi2Id? string
---@field rikishiId? string
---@field shikona? string
---@field totalLosses? number
---@field totalWins? number
---@field weight? number
---@field winRate? number
---@field winnerId? string

---@class RikishiLoadMatch
---@field id string
---@field opponent_id? string

---@class RikishiListMatch
---@field bashoId? string
---@field birthdate? string
---@field birthplace? string
---@field championships? number
---@field currentRank? string
---@field day? number
---@field debut? string
---@field division? string
---@field height? number
---@field heya? string
---@field highestRank? string
---@field id? string
---@field kimarite? string
---@field realName? string
---@field rikishi1Id? string
---@field rikishi2Id? string
---@field rikishiId? string
---@field shikona? string
---@field totalLosses? number
---@field totalWins? number
---@field weight? number
---@field winRate? number
---@field winnerId? string

---@class Shikona
---@field endDate? string
---@field rikishiId? string
---@field shikona? string
---@field startDate? string

---@class ShikonaListMatch
---@field endDate? string
---@field rikishiId? string
---@field shikona? string
---@field startDate? string

local M = {}

return M
