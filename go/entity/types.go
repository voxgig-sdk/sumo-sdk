// Typed models for the Sumo SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Basho is the typed data model for the basho entity.
type Basho struct {
	EndDate *string `json:"end_date,omitempty"`
	Id *string `json:"id,omitempty"`
	Kimarite *string `json:"kimarite,omitempty"`
	MatchNumber *int `json:"match_number,omitempty"`
	Month *int `json:"month,omitempty"`
	Rank *string `json:"rank,omitempty"`
	Rikishi1Id *string `json:"rikishi1_id,omitempty"`
	Rikishi2Id *string `json:"rikishi2_id,omitempty"`
	RikishiId *string `json:"rikishi_id,omitempty"`
	Shikona *string `json:"shikona,omitempty"`
	Side *string `json:"side,omitempty"`
	StartDate *string `json:"start_date,omitempty"`
	Venue *string `json:"venue,omitempty"`
	WinnerId *string `json:"winner_id,omitempty"`
	Year *int `json:"year,omitempty"`
}

// BashoLoadMatch is the typed request payload for Basho.LoadTyped.
type BashoLoadMatch struct {
	Division string `json:"division"`
	Id string `json:"id"`
}

// BashoListMatch is the typed request payload for Basho.ListTyped.
type BashoListMatch struct {
	BashoId string `json:"basho_id"`
	Day int `json:"day"`
	Division string `json:"division"`
}

// Kimarite is the typed data model for the kimarite entity.
type Kimarite struct {
	Category *string `json:"category,omitempty"`
	Description *string `json:"description,omitempty"`
	EnglishName *string `json:"english_name,omitempty"`
	Frequency *int `json:"frequency,omitempty"`
	Name *string `json:"name,omitempty"`
}

// KimariteLoadMatch is the typed request payload for Kimarite.LoadTyped.
type KimariteLoadMatch struct {
	Id string `json:"id"`
}

// KimariteListMatch mirrors the kimarite fields as an all-optional match
// filter (Go analog of Partial<Kimarite>).
type KimariteListMatch struct {
	Category *string `json:"category,omitempty"`
	Description *string `json:"description,omitempty"`
	EnglishName *string `json:"english_name,omitempty"`
	Frequency *int `json:"frequency,omitempty"`
	Name *string `json:"name,omitempty"`
}

// Measurement is the typed data model for the measurement entity.
type Measurement struct {
	Height *float64 `json:"height,omitempty"`
	RecordedDate *string `json:"recorded_date,omitempty"`
	RikishiId *string `json:"rikishi_id,omitempty"`
	Weight *float64 `json:"weight,omitempty"`
}

// MeasurementListMatch mirrors the measurement fields as an all-optional match
// filter (Go analog of Partial<Measurement>).
type MeasurementListMatch struct {
	Height *float64 `json:"height,omitempty"`
	RecordedDate *string `json:"recorded_date,omitempty"`
	RikishiId *string `json:"rikishi_id,omitempty"`
	Weight *float64 `json:"weight,omitempty"`
}

// Rank is the typed data model for the rank entity.
type Rank struct {
	Division *string `json:"division,omitempty"`
	Id *string `json:"id,omitempty"`
	Level *int `json:"level,omitempty"`
	Name *string `json:"name,omitempty"`
}

// RankListMatch mirrors the rank fields as an all-optional match
// filter (Go analog of Partial<Rank>).
type RankListMatch struct {
	Division *string `json:"division,omitempty"`
	Id *string `json:"id,omitempty"`
	Level *int `json:"level,omitempty"`
	Name *string `json:"name,omitempty"`
}

// Rikishi is the typed data model for the rikishi entity.
type Rikishi struct {
	BashoId *string `json:"basho_id,omitempty"`
	Birthdate *string `json:"birthdate,omitempty"`
	Birthplace *string `json:"birthplace,omitempty"`
	Championship *int `json:"championship,omitempty"`
	CurrentRank *string `json:"current_rank,omitempty"`
	Day *int `json:"day,omitempty"`
	Debut *string `json:"debut,omitempty"`
	Division *string `json:"division,omitempty"`
	Height *float64 `json:"height,omitempty"`
	Heya *string `json:"heya,omitempty"`
	HighestRank *string `json:"highest_rank,omitempty"`
	Id *string `json:"id,omitempty"`
	Kimarite *string `json:"kimarite,omitempty"`
	RealName *string `json:"real_name,omitempty"`
	Rikishi1Id *string `json:"rikishi1_id,omitempty"`
	Rikishi2Id *string `json:"rikishi2_id,omitempty"`
	RikishiId *string `json:"rikishi_id,omitempty"`
	Shikona *string `json:"shikona,omitempty"`
	TotalLoss *int `json:"total_loss,omitempty"`
	TotalWin *int `json:"total_win,omitempty"`
	Weight *float64 `json:"weight,omitempty"`
	WinRate *float64 `json:"win_rate,omitempty"`
	WinnerId *string `json:"winner_id,omitempty"`
}

// RikishiLoadMatch is the typed request payload for Rikishi.LoadTyped.
type RikishiLoadMatch struct {
	Id string `json:"id"`
	OpponentId string `json:"opponent_id"`
}

// RikishiListMatch is the typed request payload for Rikishi.ListTyped.
type RikishiListMatch struct {
	Id string `json:"id"`
}

// Shikona is the typed data model for the shikona entity.
type Shikona struct {
	EndDate *string `json:"end_date,omitempty"`
	RikishiId *string `json:"rikishi_id,omitempty"`
	Shikona *string `json:"shikona,omitempty"`
	StartDate *string `json:"start_date,omitempty"`
}

// ShikonaListMatch mirrors the shikona fields as an all-optional match
// filter (Go analog of Partial<Shikona>).
type ShikonaListMatch struct {
	EndDate *string `json:"end_date,omitempty"`
	RikishiId *string `json:"rikishi_id,omitempty"`
	Shikona *string `json:"shikona,omitempty"`
	StartDate *string `json:"start_date,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
