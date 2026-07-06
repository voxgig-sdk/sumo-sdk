// Typed models for the Sumo SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Basho {
  end_date?: string
  id?: string
  kimarite?: string
  match_number?: number
  month?: number
  rank?: string
  rikishi1_id?: string
  rikishi2_id?: string
  rikishi_id?: string
  shikona?: string
  side?: string
  start_date?: string
  venue?: string
  winner_id?: string
  year?: number
}

export interface BashoLoadMatch {
  division: string
  id: string
}

export interface BashoListMatch {
  basho_id: string
  day: number
  division: string
}

export interface Kimarite {
  category?: string
  description?: string
  english_name?: string
  frequency?: number
  name?: string
}

export interface KimariteLoadMatch {
  id: string
}

export interface KimariteListMatch {
  category?: string
  description?: string
  english_name?: string
  frequency?: number
  name?: string
}

export interface Measurement {
  height?: number
  recorded_date?: string
  rikishi_id?: string
  weight?: number
}

export interface MeasurementListMatch {
  height?: number
  recorded_date?: string
  rikishi_id?: string
  weight?: number
}

export interface Rank {
  division?: string
  id?: string
  level?: number
  name?: string
}

export interface RankListMatch {
  division?: string
  id?: string
  level?: number
  name?: string
}

export interface Rikishi {
  basho_id?: string
  birthdate?: string
  birthplace?: string
  championship?: number
  current_rank?: string
  day?: number
  debut?: string
  division?: string
  height?: number
  heya?: string
  highest_rank?: string
  id?: string
  kimarite?: string
  real_name?: string
  rikishi1_id?: string
  rikishi2_id?: string
  rikishi_id?: string
  shikona?: string
  total_loss?: number
  total_win?: number
  weight?: number
  win_rate?: number
  winner_id?: string
}

export interface RikishiLoadMatch {
  id: string
  opponent_id: string
}

export interface RikishiListMatch {
  id: string
}

export interface Shikona {
  end_date?: string
  rikishi_id?: string
  shikona?: string
  start_date?: string
}

export interface ShikonaListMatch {
  end_date?: string
  rikishi_id?: string
  shikona?: string
  start_date?: string
}

