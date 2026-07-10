-- Typed models for the Sumo SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Basho
---@field end_date? string
---@field id? string
---@field kimarite? string
---@field match_number? number
---@field month? number
---@field rank? string
---@field rikishi1_id? string
---@field rikishi2_id? string
---@field rikishi_id? string
---@field shikona? string
---@field side? string
---@field start_date? string
---@field venue? string
---@field winner_id? string
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
---@field english_name? string
---@field frequency? number
---@field name? string

---@class KimariteLoadMatch
---@field id string

---@class KimariteListMatch
---@field category? string
---@field description? string
---@field english_name? string
---@field frequency? number
---@field name? string

---@class Measurement
---@field height? number
---@field recorded_date? string
---@field rikishi_id? string
---@field weight? number

---@class MeasurementListMatch
---@field height? number
---@field recorded_date? string
---@field rikishi_id? string
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
---@field basho_id? string
---@field birthdate? string
---@field birthplace? string
---@field championship? number
---@field current_rank? string
---@field day? number
---@field debut? string
---@field division? string
---@field height? number
---@field heya? string
---@field highest_rank? string
---@field id? string
---@field kimarite? string
---@field real_name? string
---@field rikishi1_id? string
---@field rikishi2_id? string
---@field rikishi_id? string
---@field shikona? string
---@field total_loss? number
---@field total_win? number
---@field weight? number
---@field win_rate? number
---@field winner_id? string

---@class RikishiLoadMatch
---@field id string
---@field opponent_id? string

---@class RikishiListMatch
---@field basho_id? string
---@field birthdate? string
---@field birthplace? string
---@field championship? number
---@field current_rank? string
---@field day? number
---@field debut? string
---@field division? string
---@field height? number
---@field heya? string
---@field highest_rank? string
---@field id? string
---@field kimarite? string
---@field real_name? string
---@field rikishi1_id? string
---@field rikishi2_id? string
---@field rikishi_id? string
---@field shikona? string
---@field total_loss? number
---@field total_win? number
---@field weight? number
---@field win_rate? number
---@field winner_id? string

---@class Shikona
---@field end_date? string
---@field rikishi_id? string
---@field shikona? string
---@field start_date? string

---@class ShikonaListMatch
---@field end_date? string
---@field rikishi_id? string
---@field shikona? string
---@field start_date? string

local M = {}

return M
