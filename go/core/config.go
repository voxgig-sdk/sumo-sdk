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
			"slug": "sumo",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
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
						"format": "date",
						"name": "endDate",
						"short": "End date of the tournament",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Unique identifier for the basho",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "kimarite",
						"short": "Winning technique used (if match completed)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "matchNumber",
						"short": "Match number in the day's schedule",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "month",
						"short": "Month of the tournament",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "rank",
						"short": "Rank in the banzuke",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rikishi1Id",
						"short": "First rikishi identifier",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rikishi2Id",
						"short": "Second rikishi identifier",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rikishiId",
						"short": "Unique identifier for the rikishi",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "shikona",
						"short": "Ring name of the rikishi",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "side",
						"short": "Side of the banzuke (east or west)",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "date",
						"name": "startDate",
						"short": "Start date of the tournament",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "venue",
						"short": "Tournament venue",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "winnerId",
						"short": "Winner rikishi identifier (if match completed)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "year",
						"short": "Year of the tournament",
						"type": "`$INTEGER`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
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
								"rename": map[string]any{
									"param": map[string]any{
										"bashoId": "basho_id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "basho",
									},
									map[string]any{
										"var": "basho_id",
									},
									map[string]any{
										"lit": "torikumi",
									},
									map[string]any{
										"var": "division",
									},
									map[string]any{
										"var": "day",
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
								"parts": []any{
									"api",
									"basho",
									"{basho_id}",
									"torikumi",
									"{division}",
									"{day}",
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
								"rename": map[string]any{
									"param": map[string]any{
										"bashoId": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "basho",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "banzuke",
									},
									map[string]any{
										"var": "division",
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
								"parts": []any{
									"api",
									"basho",
									"{id}",
									"banzuke",
									"{division}",
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
								"rename": map[string]any{
									"param": map[string]any{
										"bashoId": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "basho",
									},
									map[string]any{
										"var": "id",
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
								"parts": []any{
									"api",
									"basho",
									"{id}",
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
						"short": "Category of the technique",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "description",
						"short": "Detailed description of the technique",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "englishName",
						"short": "English translation of the technique name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "frequency",
						"short": "Number of times this technique has been used",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"short": "Name of the kimarite technique",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
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
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "kimarite",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"kimarite",
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
								"rename": map[string]any{
									"param": map[string]any{
										"kimarite": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "kimarite",
									},
									map[string]any{
										"var": "id",
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
								"parts": []any{
									"api",
									"kimarite",
									"{id}",
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
						"short": "Height in centimeters",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"format": "date",
						"name": "recordedDate",
						"short": "Date when measurement was recorded",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rikishiId",
						"short": "Unique identifier for the rikishi",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "weight",
						"short": "Weight in kilograms",
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
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "measurements",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"measurements",
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
						"short": "Division the rank belongs to",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Unique identifier for the rank",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "level",
						"short": "Hierarchical level of the rank",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name",
						"short": "Name of the rank",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
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
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "ranks",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"ranks",
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
						"short": "Identifier of the basho where match took place",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "date",
						"name": "birthdate",
						"short": "Date of birth",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "birthplace",
						"short": "Birthplace of the rikishi",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "championships",
						"short": "Number of championships won",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "currentRank",
						"short": "Current rank of the rikishi",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "day",
						"short": "Day of the tournament",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "debut",
						"short": "Debut date or basho",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "division",
						"short": "Division of the match",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "height",
						"short": "Height in centimeters",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "heya",
						"short": "Stable (heya) the rikishi belongs to",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "highestRank",
						"short": "Highest rank achieved",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Unique identifier for the match",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "kimarite",
						"short": "Winning technique used",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "realName",
						"short": "Real name of the rikishi",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rikishi1Id",
						"short": "First rikishi identifier",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rikishi2Id",
						"short": "Second rikishi identifier",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rikishiId",
						"short": "Unique identifier for the rikishi",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "shikona",
						"short": "Ring name of the rikishi",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "totalLosses",
						"short": "Total number of losses",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "totalWins",
						"short": "Total number of wins",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "weight",
						"short": "Weight in kilograms",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"format": "float",
						"name": "winRate",
						"short": "Win rate percentage",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "winnerId",
						"short": "Winner rikishi identifier",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
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
								"rename": map[string]any{
									"param": map[string]any{
										"rikishiId": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "rikishi",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "matches",
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
								"parts": []any{
									"api",
									"rikishi",
									"{id}",
									"matches",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/api/rikishis",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "rikishis",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"rikishis",
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
								"rename": map[string]any{
									"param": map[string]any{
										"opponentId": "opponent_id",
										"rikishiId": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "rikishi",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "matches",
									},
									map[string]any{
										"var": "opponent_id",
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
								"parts": []any{
									"api",
									"rikishi",
									"{id}",
									"matches",
									"{opponent_id}",
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
								"rename": map[string]any{
									"param": map[string]any{
										"rikishiId": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "rikishi",
									},
									map[string]any{
										"var": "id",
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
								"parts": []any{
									"api",
									"rikishi",
									"{id}",
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
								"rename": map[string]any{
									"param": map[string]any{
										"rikishiId": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "rikishi",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "stats",
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
								"parts": []any{
									"api",
									"rikishi",
									"{id}",
									"stats",
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
						"format": "date",
						"name": "endDate",
						"short": "Date when rikishi stopped using this shikona",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rikishiId",
						"short": "Identifier of the rikishi using this shikona",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "shikona",
						"short": "Ring name (shikona)",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "date",
						"name": "startDate",
						"short": "Date when rikishi started using this shikona",
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
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "shikonas",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"shikonas",
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

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
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
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
