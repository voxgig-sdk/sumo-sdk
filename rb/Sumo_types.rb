# frozen_string_literal: true

# Typed models for the Sumo SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Basho entity data model.
#
# @!attribute [rw] endDate
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] kimarite
#   @return [String, nil]
#
# @!attribute [rw] matchNumber
#   @return [Integer, nil]
#
# @!attribute [rw] month
#   @return [Integer, nil]
#
# @!attribute [rw] rank
#   @return [String, nil]
#
# @!attribute [rw] rikishi1Id
#   @return [String, nil]
#
# @!attribute [rw] rikishi2Id
#   @return [String, nil]
#
# @!attribute [rw] rikishiId
#   @return [String, nil]
#
# @!attribute [rw] shikona
#   @return [String, nil]
#
# @!attribute [rw] side
#   @return [String, nil]
#
# @!attribute [rw] startDate
#   @return [String, nil]
#
# @!attribute [rw] venue
#   @return [String, nil]
#
# @!attribute [rw] winnerId
#   @return [String, nil]
#
# @!attribute [rw] year
#   @return [Integer, nil]
Basho = Struct.new(
  :endDate,
  :id,
  :kimarite,
  :matchNumber,
  :month,
  :rank,
  :rikishi1Id,
  :rikishi2Id,
  :rikishiId,
  :shikona,
  :side,
  :startDate,
  :venue,
  :winnerId,
  :year,
  keyword_init: true
)

# Request payload for Basho#load.
#
# @!attribute [rw] division
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String]
BashoLoadMatch = Struct.new(
  :division,
  :id,
  keyword_init: true
)

# Request payload for Basho#list.
#
# @!attribute [rw] basho_id
#   @return [String]
#
# @!attribute [rw] day
#   @return [Integer]
#
# @!attribute [rw] division
#   @return [String]
BashoListMatch = Struct.new(
  :basho_id,
  :day,
  :division,
  keyword_init: true
)

# Kimarite entity data model.
#
# @!attribute [rw] category
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] englishName
#   @return [String, nil]
#
# @!attribute [rw] frequency
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
Kimarite = Struct.new(
  :category,
  :description,
  :englishName,
  :frequency,
  :name,
  keyword_init: true
)

# Request payload for Kimarite#load.
#
# @!attribute [rw] id
#   @return [String]
KimariteLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Kimarite#list.
#
# @!attribute [rw] category
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] englishName
#   @return [String, nil]
#
# @!attribute [rw] frequency
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
KimariteListMatch = Struct.new(
  :category,
  :description,
  :englishName,
  :frequency,
  :name,
  keyword_init: true
)

# Measurement entity data model.
#
# @!attribute [rw] height
#   @return [Float, nil]
#
# @!attribute [rw] recordedDate
#   @return [String, nil]
#
# @!attribute [rw] rikishiId
#   @return [String, nil]
#
# @!attribute [rw] weight
#   @return [Float, nil]
Measurement = Struct.new(
  :height,
  :recordedDate,
  :rikishiId,
  :weight,
  keyword_init: true
)

# Request payload for Measurement#list.
#
# @!attribute [rw] height
#   @return [Float, nil]
#
# @!attribute [rw] recordedDate
#   @return [String, nil]
#
# @!attribute [rw] rikishiId
#   @return [String, nil]
#
# @!attribute [rw] weight
#   @return [Float, nil]
MeasurementListMatch = Struct.new(
  :height,
  :recordedDate,
  :rikishiId,
  :weight,
  keyword_init: true
)

# Rank entity data model.
#
# @!attribute [rw] division
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] level
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
Rank = Struct.new(
  :division,
  :id,
  :level,
  :name,
  keyword_init: true
)

# Request payload for Rank#list.
#
# @!attribute [rw] division
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] level
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
RankListMatch = Struct.new(
  :division,
  :id,
  :level,
  :name,
  keyword_init: true
)

# Rikishi entity data model.
#
# @!attribute [rw] bashoId
#   @return [String, nil]
#
# @!attribute [rw] birthdate
#   @return [String, nil]
#
# @!attribute [rw] birthplace
#   @return [String, nil]
#
# @!attribute [rw] championships
#   @return [Integer, nil]
#
# @!attribute [rw] currentRank
#   @return [String, nil]
#
# @!attribute [rw] day
#   @return [Integer, nil]
#
# @!attribute [rw] debut
#   @return [String, nil]
#
# @!attribute [rw] division
#   @return [String, nil]
#
# @!attribute [rw] height
#   @return [Float, nil]
#
# @!attribute [rw] heya
#   @return [String, nil]
#
# @!attribute [rw] highestRank
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] kimarite
#   @return [String, nil]
#
# @!attribute [rw] realName
#   @return [String, nil]
#
# @!attribute [rw] rikishi1Id
#   @return [String, nil]
#
# @!attribute [rw] rikishi2Id
#   @return [String, nil]
#
# @!attribute [rw] rikishiId
#   @return [String, nil]
#
# @!attribute [rw] shikona
#   @return [String, nil]
#
# @!attribute [rw] totalLosses
#   @return [Integer, nil]
#
# @!attribute [rw] totalWins
#   @return [Integer, nil]
#
# @!attribute [rw] weight
#   @return [Float, nil]
#
# @!attribute [rw] winRate
#   @return [Float, nil]
#
# @!attribute [rw] winnerId
#   @return [String, nil]
Rikishi = Struct.new(
  :bashoId,
  :birthdate,
  :birthplace,
  :championships,
  :currentRank,
  :day,
  :debut,
  :division,
  :height,
  :heya,
  :highestRank,
  :id,
  :kimarite,
  :realName,
  :rikishi1Id,
  :rikishi2Id,
  :rikishiId,
  :shikona,
  :totalLosses,
  :totalWins,
  :weight,
  :winRate,
  :winnerId,
  keyword_init: true
)

# Request payload for Rikishi#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] opponent_id
#   @return [String, nil]
RikishiLoadMatch = Struct.new(
  :id,
  :opponent_id,
  keyword_init: true
)

# Request payload for Rikishi#list.
#
# @!attribute [rw] bashoId
#   @return [String, nil]
#
# @!attribute [rw] birthdate
#   @return [String, nil]
#
# @!attribute [rw] birthplace
#   @return [String, nil]
#
# @!attribute [rw] championships
#   @return [Integer, nil]
#
# @!attribute [rw] currentRank
#   @return [String, nil]
#
# @!attribute [rw] day
#   @return [Integer, nil]
#
# @!attribute [rw] debut
#   @return [String, nil]
#
# @!attribute [rw] division
#   @return [String, nil]
#
# @!attribute [rw] height
#   @return [Float, nil]
#
# @!attribute [rw] heya
#   @return [String, nil]
#
# @!attribute [rw] highestRank
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] kimarite
#   @return [String, nil]
#
# @!attribute [rw] realName
#   @return [String, nil]
#
# @!attribute [rw] rikishi1Id
#   @return [String, nil]
#
# @!attribute [rw] rikishi2Id
#   @return [String, nil]
#
# @!attribute [rw] rikishiId
#   @return [String, nil]
#
# @!attribute [rw] shikona
#   @return [String, nil]
#
# @!attribute [rw] totalLosses
#   @return [Integer, nil]
#
# @!attribute [rw] totalWins
#   @return [Integer, nil]
#
# @!attribute [rw] weight
#   @return [Float, nil]
#
# @!attribute [rw] winRate
#   @return [Float, nil]
#
# @!attribute [rw] winnerId
#   @return [String, nil]
RikishiListMatch = Struct.new(
  :bashoId,
  :birthdate,
  :birthplace,
  :championships,
  :currentRank,
  :day,
  :debut,
  :division,
  :height,
  :heya,
  :highestRank,
  :id,
  :kimarite,
  :realName,
  :rikishi1Id,
  :rikishi2Id,
  :rikishiId,
  :shikona,
  :totalLosses,
  :totalWins,
  :weight,
  :winRate,
  :winnerId,
  keyword_init: true
)

# Shikona entity data model.
#
# @!attribute [rw] endDate
#   @return [String, nil]
#
# @!attribute [rw] rikishiId
#   @return [String, nil]
#
# @!attribute [rw] shikona
#   @return [String, nil]
#
# @!attribute [rw] startDate
#   @return [String, nil]
Shikona = Struct.new(
  :endDate,
  :rikishiId,
  :shikona,
  :startDate,
  keyword_init: true
)

# Request payload for Shikona#list.
#
# @!attribute [rw] endDate
#   @return [String, nil]
#
# @!attribute [rw] rikishiId
#   @return [String, nil]
#
# @!attribute [rw] shikona
#   @return [String, nil]
#
# @!attribute [rw] startDate
#   @return [String, nil]
ShikonaListMatch = Struct.new(
  :endDate,
  :rikishiId,
  :shikona,
  :startDate,
  keyword_init: true
)

