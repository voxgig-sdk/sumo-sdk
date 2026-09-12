
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'Sumo',
        slug: "sumo",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      },
      "transport": "base"
    },

  }


  options = {
    base: "https://www.sumo-api.com",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      basho: {
      },

      kimarite: {
      },

      measurement: {
      },

      rank: {
      },

      rikishi: {
      },

      shikona: {
      },

    }
  }


  entity = {
    "basho": {
      "fields": [
        {
          "format": "date",
          "name": "endDate",
          "short": "End date of the tournament",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "short": "Unique identifier for the basho",
          "type": "`$STRING`"
        },
        {
          "name": "kimarite",
          "short": "Winning technique used (if match completed)",
          "type": "`$STRING`"
        },
        {
          "name": "matchNumber",
          "short": "Match number in the day's schedule",
          "type": "`$INTEGER`"
        },
        {
          "name": "month",
          "short": "Month of the tournament",
          "type": "`$INTEGER`"
        },
        {
          "name": "rank",
          "short": "Rank in the banzuke",
          "type": "`$STRING`"
        },
        {
          "name": "rikishi1Id",
          "short": "First rikishi identifier",
          "type": "`$STRING`"
        },
        {
          "name": "rikishi2Id",
          "short": "Second rikishi identifier",
          "type": "`$STRING`"
        },
        {
          "name": "rikishiId",
          "short": "Unique identifier for the rikishi",
          "type": "`$STRING`"
        },
        {
          "name": "shikona",
          "short": "Ring name of the rikishi",
          "type": "`$STRING`"
        },
        {
          "name": "side",
          "short": "Side of the banzuke (east or west)",
          "type": "`$STRING`"
        },
        {
          "format": "date",
          "name": "startDate",
          "short": "Start date of the tournament",
          "type": "`$STRING`"
        },
        {
          "name": "venue",
          "short": "Tournament venue",
          "type": "`$STRING`"
        },
        {
          "name": "winnerId",
          "short": "Winner rikishi identifier (if match completed)",
          "type": "`$STRING`"
        },
        {
          "name": "year",
          "short": "Year of the tournament",
          "type": "`$INTEGER`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "basho",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "basho_id",
                    "orig": "basho_id",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "param",
                    "name": "day",
                    "orig": "day",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "param",
                    "name": "division",
                    "orig": "division",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/basho/{bashoId}/torikumi/{division}/{day}",
              "rename": {
                "param": {
                  "bashoId": "basho_id"
                }
              },
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "basho"
                },
                {
                  "var": "basho_id"
                },
                {
                  "lit": "torikumi"
                },
                {
                  "var": "division"
                },
                {
                  "var": "day"
                }
              ],
              "select": {
                "exist": [
                  "basho_id",
                  "day",
                  "division"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "api",
                "basho",
                "{basho_id}",
                "torikumi",
                "{division}",
                "{day}"
              ]
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "division",
                    "orig": "division",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "basho_id",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/basho/{bashoId}/banzuke/{division}",
              "rename": {
                "param": {
                  "bashoId": "id"
                }
              },
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "basho"
                },
                {
                  "var": "id"
                },
                {
                  "lit": "banzuke"
                },
                {
                  "var": "division"
                }
              ],
              "select": {
                "exist": [
                  "division",
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "api",
                "basho",
                "{id}",
                "banzuke",
                "{division}"
              ]
            },
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "basho_id",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/basho/{bashoId}",
              "rename": {
                "param": {
                  "bashoId": "id"
                }
              },
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "basho"
                },
                {
                  "var": "id"
                }
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "api",
                "basho",
                "{id}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "banzuke"
          ],
          [
            "basho",
            "torikumi"
          ]
        ]
      }
    },
    "kimarite": {
      "fields": [
        {
          "name": "category",
          "short": "Category of the technique",
          "type": "`$STRING`"
        },
        {
          "name": "description",
          "short": "Detailed description of the technique",
          "type": "`$STRING`"
        },
        {
          "name": "englishName",
          "short": "English translation of the technique name",
          "type": "`$STRING`"
        },
        {
          "name": "frequency",
          "short": "Number of times this technique has been used",
          "type": "`$INTEGER`"
        },
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "name": "name",
          "short": "Name of the kimarite technique",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "kimarite",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/api/kimarite",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "kimarite"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "api",
                "kimarite"
              ]
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "kimarite",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/kimarite/{kimarite}",
              "rename": {
                "param": {
                  "kimarite": "id"
                }
              },
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "kimarite"
                },
                {
                  "var": "id"
                }
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "api",
                "kimarite",
                "{id}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "measurement": {
      "fields": [
        {
          "name": "height",
          "short": "Height in centimeters",
          "type": "`$NUMBER`"
        },
        {
          "format": "date",
          "name": "recordedDate",
          "short": "Date when measurement was recorded",
          "type": "`$STRING`"
        },
        {
          "name": "rikishiId",
          "short": "Unique identifier for the rikishi",
          "type": "`$STRING`"
        },
        {
          "name": "weight",
          "short": "Weight in kilograms",
          "type": "`$NUMBER`"
        }
      ],
      "name": "measurement",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/api/measurements",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "measurements"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "api",
                "measurements"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "rank": {
      "fields": [
        {
          "name": "division",
          "short": "Division the rank belongs to",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "short": "Unique identifier for the rank",
          "type": "`$STRING`"
        },
        {
          "name": "level",
          "short": "Hierarchical level of the rank",
          "type": "`$INTEGER`"
        },
        {
          "name": "name",
          "short": "Name of the rank",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "rank",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/api/ranks",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "ranks"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "api",
                "ranks"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "rikishi": {
      "fields": [
        {
          "name": "bashoId",
          "short": "Identifier of the basho where match took place",
          "type": "`$STRING`"
        },
        {
          "format": "date",
          "name": "birthdate",
          "short": "Date of birth",
          "type": "`$STRING`"
        },
        {
          "name": "birthplace",
          "short": "Birthplace of the rikishi",
          "type": "`$STRING`"
        },
        {
          "name": "championships",
          "short": "Number of championships won",
          "type": "`$INTEGER`"
        },
        {
          "name": "currentRank",
          "short": "Current rank of the rikishi",
          "type": "`$STRING`"
        },
        {
          "name": "day",
          "short": "Day of the tournament",
          "type": "`$INTEGER`"
        },
        {
          "name": "debut",
          "short": "Debut date or basho",
          "type": "`$STRING`"
        },
        {
          "name": "division",
          "short": "Division of the match",
          "type": "`$STRING`"
        },
        {
          "name": "height",
          "short": "Height in centimeters",
          "type": "`$NUMBER`"
        },
        {
          "name": "heya",
          "short": "Stable (heya) the rikishi belongs to",
          "type": "`$STRING`"
        },
        {
          "name": "highestRank",
          "short": "Highest rank achieved",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "short": "Unique identifier for the match",
          "type": "`$STRING`"
        },
        {
          "name": "kimarite",
          "short": "Winning technique used",
          "type": "`$STRING`"
        },
        {
          "name": "realName",
          "short": "Real name of the rikishi",
          "type": "`$STRING`"
        },
        {
          "name": "rikishi1Id",
          "short": "First rikishi identifier",
          "type": "`$STRING`"
        },
        {
          "name": "rikishi2Id",
          "short": "Second rikishi identifier",
          "type": "`$STRING`"
        },
        {
          "name": "rikishiId",
          "short": "Unique identifier for the rikishi",
          "type": "`$STRING`"
        },
        {
          "name": "shikona",
          "short": "Ring name of the rikishi",
          "type": "`$STRING`"
        },
        {
          "name": "totalLosses",
          "short": "Total number of losses",
          "type": "`$INTEGER`"
        },
        {
          "name": "totalWins",
          "short": "Total number of wins",
          "type": "`$INTEGER`"
        },
        {
          "name": "weight",
          "short": "Weight in kilograms",
          "type": "`$NUMBER`"
        },
        {
          "format": "float",
          "name": "winRate",
          "short": "Win rate percentage",
          "type": "`$NUMBER`"
        },
        {
          "name": "winnerId",
          "short": "Winner rikishi identifier",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "rikishi",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "rikishi_id",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/rikishi/{rikishiId}/matches",
              "rename": {
                "param": {
                  "rikishiId": "id"
                }
              },
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "rikishi"
                },
                {
                  "var": "id"
                },
                {
                  "lit": "matches"
                }
              ],
              "select": {
                "$action": "match",
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "api",
                "rikishi",
                "{id}",
                "matches"
              ]
            },
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/api/rikishis",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "rikishis"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "api",
                "rikishis"
              ]
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "rikishi_id",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "param",
                    "name": "opponent_id",
                    "orig": "opponent_id",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/rikishi/{rikishiId}/matches/{opponentId}",
              "rename": {
                "param": {
                  "opponentId": "opponent_id",
                  "rikishiId": "id"
                }
              },
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "rikishi"
                },
                {
                  "var": "id"
                },
                {
                  "lit": "matches"
                },
                {
                  "var": "opponent_id"
                }
              ],
              "select": {
                "exist": [
                  "id",
                  "opponent_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "api",
                "rikishi",
                "{id}",
                "matches",
                "{opponent_id}"
              ]
            },
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "rikishi_id",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/rikishi/{rikishiId}",
              "rename": {
                "param": {
                  "rikishiId": "id"
                }
              },
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "rikishi"
                },
                {
                  "var": "id"
                }
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "api",
                "rikishi",
                "{id}"
              ]
            },
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "rikishi_id",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/rikishi/{rikishiId}/stats",
              "rename": {
                "param": {
                  "rikishiId": "id"
                }
              },
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "rikishi"
                },
                {
                  "var": "id"
                },
                {
                  "lit": "stats"
                }
              ],
              "select": {
                "$action": "stat",
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "api",
                "rikishi",
                "{id}",
                "stats"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "match"
          ]
        ]
      }
    },
    "shikona": {
      "fields": [
        {
          "format": "date",
          "name": "endDate",
          "short": "Date when rikishi stopped using this shikona",
          "type": "`$STRING`"
        },
        {
          "name": "rikishiId",
          "short": "Identifier of the rikishi using this shikona",
          "type": "`$STRING`"
        },
        {
          "name": "shikona",
          "short": "Ring name (shikona)",
          "type": "`$STRING`"
        },
        {
          "format": "date",
          "name": "startDate",
          "short": "Date when rikishi started using this shikona",
          "type": "`$STRING`"
        }
      ],
      "name": "shikona",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/api/shikonas",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "shikonas"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "api",
                "shikonas"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

