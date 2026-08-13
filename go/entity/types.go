// Typed models for the Sumo SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/sumo-sdk/go/core"
)

// Basho is the typed data model for the basho entity.
type Basho struct {
	EndDate *string `json:"endDate,omitempty"`
	Id *string `json:"id,omitempty"`
	Kimarite *string `json:"kimarite,omitempty"`
	MatchNumber *int `json:"matchNumber,omitempty"`
	Month *int `json:"month,omitempty"`
	Rank *string `json:"rank,omitempty"`
	Rikishi1Id *string `json:"rikishi1Id,omitempty"`
	Rikishi2Id *string `json:"rikishi2Id,omitempty"`
	RikishiId *string `json:"rikishiId,omitempty"`
	Shikona *string `json:"shikona,omitempty"`
	Side *string `json:"side,omitempty"`
	StartDate *string `json:"startDate,omitempty"`
	Venue *string `json:"venue,omitempty"`
	WinnerId *string `json:"winnerId,omitempty"`
	Year *int `json:"year,omitempty"`
}

// BashoLoadMatch is the typed request payload for Basho.LoadTyped.
type BashoLoadMatch struct {
	Division *string `json:"division,omitempty"`
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
	EnglishName *string `json:"englishName,omitempty"`
	Frequency *int `json:"frequency,omitempty"`
	Name *string `json:"name,omitempty"`
}

// KimariteLoadMatch is the typed request payload for Kimarite.LoadTyped.
type KimariteLoadMatch struct {
	Id string `json:"id"`
}

// KimariteListMatch is the typed request payload for Kimarite.ListTyped.
type KimariteListMatch struct {
	Category *string `json:"category,omitempty"`
	Description *string `json:"description,omitempty"`
	EnglishName *string `json:"englishName,omitempty"`
	Frequency *int `json:"frequency,omitempty"`
	Name *string `json:"name,omitempty"`
}

// Measurement is the typed data model for the measurement entity.
type Measurement struct {
	Height *float64 `json:"height,omitempty"`
	RecordedDate *string `json:"recordedDate,omitempty"`
	RikishiId *string `json:"rikishiId,omitempty"`
	Weight *float64 `json:"weight,omitempty"`
}

// MeasurementListMatch is the typed request payload for Measurement.ListTyped.
type MeasurementListMatch struct {
	Height *float64 `json:"height,omitempty"`
	RecordedDate *string `json:"recordedDate,omitempty"`
	RikishiId *string `json:"rikishiId,omitempty"`
	Weight *float64 `json:"weight,omitempty"`
}

// Rank is the typed data model for the rank entity.
type Rank struct {
	Division *string `json:"division,omitempty"`
	Id *string `json:"id,omitempty"`
	Level *int `json:"level,omitempty"`
	Name *string `json:"name,omitempty"`
}

// RankListMatch is the typed request payload for Rank.ListTyped.
type RankListMatch struct {
	Division *string `json:"division,omitempty"`
	Id *string `json:"id,omitempty"`
	Level *int `json:"level,omitempty"`
	Name *string `json:"name,omitempty"`
}

// Rikishi is the typed data model for the rikishi entity.
type Rikishi struct {
	BashoId *string `json:"bashoId,omitempty"`
	Birthdate *string `json:"birthdate,omitempty"`
	Birthplace *string `json:"birthplace,omitempty"`
	Championships *int `json:"championships,omitempty"`
	CurrentRank *string `json:"currentRank,omitempty"`
	Day *int `json:"day,omitempty"`
	Debut *string `json:"debut,omitempty"`
	Division *string `json:"division,omitempty"`
	Height *float64 `json:"height,omitempty"`
	Heya *string `json:"heya,omitempty"`
	HighestRank *string `json:"highestRank,omitempty"`
	Id *string `json:"id,omitempty"`
	Kimarite *string `json:"kimarite,omitempty"`
	RealName *string `json:"realName,omitempty"`
	Rikishi1Id *string `json:"rikishi1Id,omitempty"`
	Rikishi2Id *string `json:"rikishi2Id,omitempty"`
	RikishiId *string `json:"rikishiId,omitempty"`
	Shikona *string `json:"shikona,omitempty"`
	TotalLosses *int `json:"totalLosses,omitempty"`
	TotalWins *int `json:"totalWins,omitempty"`
	Weight *float64 `json:"weight,omitempty"`
	WinRate *float64 `json:"winRate,omitempty"`
	WinnerId *string `json:"winnerId,omitempty"`
}

// RikishiLoadMatch is the typed request payload for Rikishi.LoadTyped.
type RikishiLoadMatch struct {
	Id string `json:"id"`
	OpponentId *string `json:"opponent_id,omitempty"`
}

// RikishiListMatch is the typed request payload for Rikishi.ListTyped.
type RikishiListMatch struct {
	BashoId *string `json:"bashoId,omitempty"`
	Birthdate *string `json:"birthdate,omitempty"`
	Birthplace *string `json:"birthplace,omitempty"`
	Championships *int `json:"championships,omitempty"`
	CurrentRank *string `json:"currentRank,omitempty"`
	Day *int `json:"day,omitempty"`
	Debut *string `json:"debut,omitempty"`
	Division *string `json:"division,omitempty"`
	Height *float64 `json:"height,omitempty"`
	Heya *string `json:"heya,omitempty"`
	HighestRank *string `json:"highestRank,omitempty"`
	Id *string `json:"id,omitempty"`
	Kimarite *string `json:"kimarite,omitempty"`
	RealName *string `json:"realName,omitempty"`
	Rikishi1Id *string `json:"rikishi1Id,omitempty"`
	Rikishi2Id *string `json:"rikishi2Id,omitempty"`
	RikishiId *string `json:"rikishiId,omitempty"`
	Shikona *string `json:"shikona,omitempty"`
	TotalLosses *int `json:"totalLosses,omitempty"`
	TotalWins *int `json:"totalWins,omitempty"`
	Weight *float64 `json:"weight,omitempty"`
	WinRate *float64 `json:"winRate,omitempty"`
	WinnerId *string `json:"winnerId,omitempty"`
}

// Shikona is the typed data model for the shikona entity.
type Shikona struct {
	EndDate *string `json:"endDate,omitempty"`
	RikishiId *string `json:"rikishiId,omitempty"`
	Shikona *string `json:"shikona,omitempty"`
	StartDate *string `json:"startDate,omitempty"`
}

// ShikonaListMatch is the typed request payload for Shikona.ListTyped.
type ShikonaListMatch struct {
	EndDate *string `json:"endDate,omitempty"`
	RikishiId *string `json:"rikishiId,omitempty"`
	Shikona *string `json:"shikona,omitempty"`
	StartDate *string `json:"startDate,omitempty"`
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

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
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

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
