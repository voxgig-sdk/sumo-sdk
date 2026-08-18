package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Sumo",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://www.sumo-api.com",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"basho": map[string]any{},
				"kimarite": map[string]any{},
				"measurement": map[string]any{},
				"rank": map[string]any{},
				"rikishi": map[string]any{},
				"shikona": map[string]any{},
			},
		},
		"entity": map[string]any{
			"basho": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "endDate",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "kimarite",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "matchNumber",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "month",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "rank",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rikishi1Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rikishi2Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rikishiId",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "shikona",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "side",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "startDate",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "venue",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "winnerId",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "year",
						"type": "`$INTEGER`",
					},
				},
				"name": "basho",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "basho_id",
											"orig": "basho_id",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "day",
											"orig": "day",
											"reqd": true,
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "param",
											"name": "division",
											"orig": "division",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/basho/{bashoId}/torikumi/{division}/{day}",
								"parts": []any{
									"api",
									"basho",
									"{basho_id}",
									"torikumi",
									"{division}",
									"{day}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"bashoId": "basho_id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"basho_id",
										"day",
										"division",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "division",
											"orig": "division",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "basho_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/basho/{bashoId}/banzuke/{division}",
								"parts": []any{
									"api",
									"basho",
									"{id}",
									"banzuke",
									"{division}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"bashoId": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"division",
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "basho_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/basho/{bashoId}",
								"parts": []any{
									"api",
									"basho",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"bashoId": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"banzuke",
						},
						[]any{
							"basho",
							"torikumi",
						},
					},
				},
			},
			"kimarite": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "category",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "englishName",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "frequency",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
				},
				"name": "kimarite",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/api/kimarite",
								"parts": []any{
									"api",
									"kimarite",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "kimarite",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/kimarite/{kimarite}",
								"parts": []any{
									"api",
									"kimarite",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"kimarite": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"measurement": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "height",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "recordedDate",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rikishiId",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "weight",
						"type": "`$NUMBER`",
					},
				},
				"name": "measurement",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/api/measurements",
								"parts": []any{
									"api",
									"measurements",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"rank": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "division",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "level",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
				},
				"name": "rank",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/api/ranks",
								"parts": []any{
									"api",
									"ranks",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"rikishi": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "bashoId",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "birthdate",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "birthplace",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "championships",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "currentRank",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "day",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "debut",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "division",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "height",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "heya",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "highestRank",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "kimarite",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "realName",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rikishi1Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rikishi2Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rikishiId",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "shikona",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "totalLosses",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "totalWins",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "weight",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "winRate",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "winnerId",
						"type": "`$STRING`",
					},
				},
				"name": "rikishi",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "rikishi_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/rikishi/{rikishiId}/matches",
								"parts": []any{
									"api",
									"rikishi",
									"{id}",
									"matches",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"rikishiId": "id",
									},
								},
								"select": map[string]any{
									"$action": "match",
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/api/rikishis",
								"parts": []any{
									"api",
									"rikishis",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "rikishi_id",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "opponent_id",
											"orig": "opponent_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/rikishi/{rikishiId}/matches/{opponentId}",
								"parts": []any{
									"api",
									"rikishi",
									"{id}",
									"matches",
									"{opponent_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"opponentId": "opponent_id",
										"rikishiId": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"opponent_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "rikishi_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/rikishi/{rikishiId}",
								"parts": []any{
									"api",
									"rikishi",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"rikishiId": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "rikishi_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/rikishi/{rikishiId}/stats",
								"parts": []any{
									"api",
									"rikishi",
									"{id}",
									"stats",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"rikishiId": "id",
									},
								},
								"select": map[string]any{
									"$action": "stat",
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"match",
						},
					},
				},
			},
			"shikona": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "endDate",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rikishiId",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "shikona",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "startDate",
						"type": "`$STRING`",
					},
				},
				"name": "shikona",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/api/shikonas",
								"parts": []any{
									"api",
									"shikonas",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
