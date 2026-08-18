
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'Sumo',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
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
          "name": "endDate",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "name": "kimarite",
          "type": "`$STRING`"
        },
        {
          "name": "matchNumber",
          "type": "`$INTEGER`"
        },
        {
          "name": "month",
          "type": "`$INTEGER`"
        },
        {
          "name": "rank",
          "type": "`$STRING`"
        },
        {
          "name": "rikishi1Id",
          "type": "`$STRING`"
        },
        {
          "name": "rikishi2Id",
          "type": "`$STRING`"
        },
        {
          "name": "rikishiId",
          "type": "`$STRING`"
        },
        {
          "name": "shikona",
          "type": "`$STRING`"
        },
        {
          "name": "side",
          "type": "`$STRING`"
        },
        {
          "name": "startDate",
          "type": "`$STRING`"
        },
        {
          "name": "venue",
          "type": "`$STRING`"
        },
        {
          "name": "winnerId",
          "type": "`$STRING`"
        },
        {
          "name": "year",
          "type": "`$INTEGER`"
        }
      ],
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
              "parts": [
                "api",
                "basho",
                "{basho_id}",
                "torikumi",
                "{division}",
                "{day}"
              ],
              "rename": {
                "param": {
                  "bashoId": "basho_id"
                }
              },
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
              }
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
              "parts": [
                "api",
                "basho",
                "{id}",
                "banzuke",
                "{division}"
              ],
              "rename": {
                "param": {
                  "bashoId": "id"
                }
              },
              "select": {
                "exist": [
                  "division",
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "api",
                "basho",
                "{id}"
              ],
              "rename": {
                "param": {
                  "bashoId": "id"
                }
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
          "type": "`$STRING`"
        },
        {
          "name": "description",
          "type": "`$STRING`"
        },
        {
          "name": "englishName",
          "type": "`$STRING`"
        },
        {
          "name": "frequency",
          "type": "`$INTEGER`"
        },
        {
          "name": "name",
          "type": "`$STRING`"
        }
      ],
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
              "parts": [
                "api",
                "kimarite"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "api",
                "kimarite",
                "{id}"
              ],
              "rename": {
                "param": {
                  "kimarite": "id"
                }
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
          "type": "`$NUMBER`"
        },
        {
          "name": "recordedDate",
          "type": "`$STRING`"
        },
        {
          "name": "rikishiId",
          "type": "`$STRING`"
        },
        {
          "name": "weight",
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
              "parts": [
                "api",
                "measurements"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "name": "level",
          "type": "`$INTEGER`"
        },
        {
          "name": "name",
          "type": "`$STRING`"
        }
      ],
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
              "parts": [
                "api",
                "ranks"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
          "type": "`$STRING`"
        },
        {
          "name": "birthdate",
          "type": "`$STRING`"
        },
        {
          "name": "birthplace",
          "type": "`$STRING`"
        },
        {
          "name": "championships",
          "type": "`$INTEGER`"
        },
        {
          "name": "currentRank",
          "type": "`$STRING`"
        },
        {
          "name": "day",
          "type": "`$INTEGER`"
        },
        {
          "name": "debut",
          "type": "`$STRING`"
        },
        {
          "name": "division",
          "type": "`$STRING`"
        },
        {
          "name": "height",
          "type": "`$NUMBER`"
        },
        {
          "name": "heya",
          "type": "`$STRING`"
        },
        {
          "name": "highestRank",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "name": "kimarite",
          "type": "`$STRING`"
        },
        {
          "name": "realName",
          "type": "`$STRING`"
        },
        {
          "name": "rikishi1Id",
          "type": "`$STRING`"
        },
        {
          "name": "rikishi2Id",
          "type": "`$STRING`"
        },
        {
          "name": "rikishiId",
          "type": "`$STRING`"
        },
        {
          "name": "shikona",
          "type": "`$STRING`"
        },
        {
          "name": "totalLosses",
          "type": "`$INTEGER`"
        },
        {
          "name": "totalWins",
          "type": "`$INTEGER`"
        },
        {
          "name": "weight",
          "type": "`$NUMBER`"
        },
        {
          "name": "winRate",
          "type": "`$NUMBER`"
        },
        {
          "name": "winnerId",
          "type": "`$STRING`"
        }
      ],
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
              "parts": [
                "api",
                "rikishi",
                "{id}",
                "matches"
              ],
              "rename": {
                "param": {
                  "rikishiId": "id"
                }
              },
              "select": {
                "$action": "match",
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            },
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/api/rikishis",
              "parts": [
                "api",
                "rikishis"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "api",
                "rikishi",
                "{id}",
                "matches",
                "{opponent_id}"
              ],
              "rename": {
                "param": {
                  "opponentId": "opponent_id",
                  "rikishiId": "id"
                }
              },
              "select": {
                "exist": [
                  "id",
                  "opponent_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "api",
                "rikishi",
                "{id}"
              ],
              "rename": {
                "param": {
                  "rikishiId": "id"
                }
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "api",
                "rikishi",
                "{id}",
                "stats"
              ],
              "rename": {
                "param": {
                  "rikishiId": "id"
                }
              },
              "select": {
                "$action": "stat",
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
          "name": "endDate",
          "type": "`$STRING`"
        },
        {
          "name": "rikishiId",
          "type": "`$STRING`"
        },
        {
          "name": "shikona",
          "type": "`$STRING`"
        },
        {
          "name": "startDate",
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
              "parts": [
                "api",
                "shikonas"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
  config
}

