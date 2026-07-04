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
# @!attribute [rw] end_date
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] kimarite
#   @return [String, nil]
#
# @!attribute [rw] match_number
#   @return [Integer, nil]
#
# @!attribute [rw] month
#   @return [Integer, nil]
#
# @!attribute [rw] rank
#   @return [String, nil]
#
# @!attribute [rw] rikishi1_id
#   @return [String, nil]
#
# @!attribute [rw] rikishi2_id
#   @return [String, nil]
#
# @!attribute [rw] rikishi_id
#   @return [String, nil]
#
# @!attribute [rw] shikona
#   @return [String, nil]
#
# @!attribute [rw] side
#   @return [String, nil]
#
# @!attribute [rw] start_date
#   @return [String, nil]
#
# @!attribute [rw] venue
#   @return [String, nil]
#
# @!attribute [rw] winner_id
#   @return [String, nil]
#
# @!attribute [rw] year
#   @return [Integer, nil]
Basho = Struct.new(
  :end_date,
  :id,
  :kimarite,
  :match_number,
  :month,
  :rank,
  :rikishi1_id,
  :rikishi2_id,
  :rikishi_id,
  :shikona,
  :side,
  :start_date,
  :venue,
  :winner_id,
  :year,
  keyword_init: true
)

# Request payload for Basho#load.
#
# @!attribute [rw] division
#   @return [String]
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
# @!attribute [rw] english_name
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
  :english_name,
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

# Match filter for Kimarite#list (any subset of Kimarite fields).
#
# @!attribute [rw] category
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] english_name
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
  :english_name,
  :frequency,
  :name,
  keyword_init: true
)

# Measurement entity data model.
#
# @!attribute [rw] height
#   @return [Float, nil]
#
# @!attribute [rw] recorded_date
#   @return [String, nil]
#
# @!attribute [rw] rikishi_id
#   @return [String, nil]
#
# @!attribute [rw] weight
#   @return [Float, nil]
Measurement = Struct.new(
  :height,
  :recorded_date,
  :rikishi_id,
  :weight,
  keyword_init: true
)

# Match filter for Measurement#list (any subset of Measurement fields).
#
# @!attribute [rw] height
#   @return [Float, nil]
#
# @!attribute [rw] recorded_date
#   @return [String, nil]
#
# @!attribute [rw] rikishi_id
#   @return [String, nil]
#
# @!attribute [rw] weight
#   @return [Float, nil]
MeasurementListMatch = Struct.new(
  :height,
  :recorded_date,
  :rikishi_id,
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

# Match filter for Rank#list (any subset of Rank fields).
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
# @!attribute [rw] basho_id
#   @return [String, nil]
#
# @!attribute [rw] birthdate
#   @return [String, nil]
#
# @!attribute [rw] birthplace
#   @return [String, nil]
#
# @!attribute [rw] championship
#   @return [Integer, nil]
#
# @!attribute [rw] current_rank
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
# @!attribute [rw] highest_rank
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] kimarite
#   @return [String, nil]
#
# @!attribute [rw] real_name
#   @return [String, nil]
#
# @!attribute [rw] rikishi1_id
#   @return [String, nil]
#
# @!attribute [rw] rikishi2_id
#   @return [String, nil]
#
# @!attribute [rw] rikishi_id
#   @return [String, nil]
#
# @!attribute [rw] shikona
#   @return [String, nil]
#
# @!attribute [rw] total_loss
#   @return [Integer, nil]
#
# @!attribute [rw] total_win
#   @return [Integer, nil]
#
# @!attribute [rw] weight
#   @return [Float, nil]
#
# @!attribute [rw] win_rate
#   @return [Float, nil]
#
# @!attribute [rw] winner_id
#   @return [String, nil]
Rikishi = Struct.new(
  :basho_id,
  :birthdate,
  :birthplace,
  :championship,
  :current_rank,
  :day,
  :debut,
  :division,
  :height,
  :heya,
  :highest_rank,
  :id,
  :kimarite,
  :real_name,
  :rikishi1_id,
  :rikishi2_id,
  :rikishi_id,
  :shikona,
  :total_loss,
  :total_win,
  :weight,
  :win_rate,
  :winner_id,
  keyword_init: true
)

# Request payload for Rikishi#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] opponent_id
#   @return [String]
RikishiLoadMatch = Struct.new(
  :id,
  :opponent_id,
  keyword_init: true
)

# Request payload for Rikishi#list.
#
# @!attribute [rw] id
#   @return [String]
RikishiListMatch = Struct.new(
  :id,
  keyword_init: true
)

# Shikona entity data model.
#
# @!attribute [rw] end_date
#   @return [String, nil]
#
# @!attribute [rw] rikishi_id
#   @return [String, nil]
#
# @!attribute [rw] shikona
#   @return [String, nil]
#
# @!attribute [rw] start_date
#   @return [String, nil]
Shikona = Struct.new(
  :end_date,
  :rikishi_id,
  :shikona,
  :start_date,
  keyword_init: true
)

# Match filter for Shikona#list (any subset of Shikona fields).
#
# @!attribute [rw] end_date
#   @return [String, nil]
#
# @!attribute [rw] rikishi_id
#   @return [String, nil]
#
# @!attribute [rw] shikona
#   @return [String, nil]
#
# @!attribute [rw] start_date
#   @return [String, nil]
ShikonaListMatch = Struct.new(
  :end_date,
  :rikishi_id,
  :shikona,
  :start_date,
  keyword_init: true
)

