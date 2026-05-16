package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewBashoEntityFunc func(client *SumoSDK, entopts map[string]any) SumoEntity

var NewKimariteEntityFunc func(client *SumoSDK, entopts map[string]any) SumoEntity

var NewMeasurementEntityFunc func(client *SumoSDK, entopts map[string]any) SumoEntity

var NewRankEntityFunc func(client *SumoSDK, entopts map[string]any) SumoEntity

var NewRikishiEntityFunc func(client *SumoSDK, entopts map[string]any) SumoEntity

var NewShikonaEntityFunc func(client *SumoSDK, entopts map[string]any) SumoEntity

