package voxgigsumosdk

import (
	"github.com/voxgig-sdk/sumo-sdk/go/core"
	"github.com/voxgig-sdk/sumo-sdk/go/entity"
	"github.com/voxgig-sdk/sumo-sdk/go/feature"
	_ "github.com/voxgig-sdk/sumo-sdk/go/utility"
)

// Type aliases preserve external API.
type SumoSDK = core.SumoSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type SumoEntity = core.SumoEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type SumoError = core.SumoError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewBashoEntityFunc = func(client *core.SumoSDK, entopts map[string]any) core.SumoEntity {
		return entity.NewBashoEntity(client, entopts)
	}
	core.NewKimariteEntityFunc = func(client *core.SumoSDK, entopts map[string]any) core.SumoEntity {
		return entity.NewKimariteEntity(client, entopts)
	}
	core.NewMeasurementEntityFunc = func(client *core.SumoSDK, entopts map[string]any) core.SumoEntity {
		return entity.NewMeasurementEntity(client, entopts)
	}
	core.NewRankEntityFunc = func(client *core.SumoSDK, entopts map[string]any) core.SumoEntity {
		return entity.NewRankEntity(client, entopts)
	}
	core.NewRikishiEntityFunc = func(client *core.SumoSDK, entopts map[string]any) core.SumoEntity {
		return entity.NewRikishiEntity(client, entopts)
	}
	core.NewShikonaEntityFunc = func(client *core.SumoSDK, entopts map[string]any) core.SumoEntity {
		return entity.NewShikonaEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewSumoSDK = core.NewSumoSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewSumoSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *SumoSDK  { return NewSumoSDK(nil) }
func Test() *SumoSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
