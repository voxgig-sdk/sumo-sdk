
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'ProjectName',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    }

  }


  options = {
    base: 'https://www.sumo-api.com',

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
          "active": true,
          "name": "end_date",
          "req": false,
          "type": "`$STRING`",
          "index$": 0
        },
        {
          "active": true,
          "name": "id",
          "req": false,
          "type": "`$STRING`",
          "index$": 1
        },
        {
          "active": true,
          "name": "kimarite",
          "req": false,
          "type": "`$STRING`",
          "index$": 2
        },
        {
          "active": true,
          "name": "match_number",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 3
        },
        {
          "active": true,
          "name": "month",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 4
        },
        {
          "active": true,
          "name": "rank",
          "req": false,
          "type": "`$STRING`",
          "index$": 5
        },
        {
          "active": true,
          "name": "rikishi1_id",
          "req": false,
          "type": "`$STRING`",
          "index$": 6
        },
        {
          "active": true,
          "name": "rikishi2_id",
          "req": false,
          "type": "`$STRING`",
          "index$": 7
        },
        {
          "active": true,
          "name": "rikishi_id",
          "req": false,
          "type": "`$STRING`",
          "index$": 8
        },
        {
          "active": true,
          "name": "shikona",
          "req": false,
          "type": "`$STRING`",
          "index$": 9
        },
        {
          "active": true,
          "name": "side",
          "req": false,
          "type": "`$STRING`",
          "index$": 10
        },
        {
          "active": true,
          "name": "start_date",
          "req": false,
          "type": "`$STRING`",
          "index$": 11
        },
        {
          "active": true,
          "name": "venue",
          "req": false,
          "type": "`$STRING`",
          "index$": 12
        },
        {
          "active": true,
          "name": "winner_id",
          "req": false,
          "type": "`$STRING`",
          "index$": 13
        },
        {
          "active": true,
          "name": "year",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 14
        }
      ],
      "name": "basho",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "basho_id",
                    "orig": "basho_id",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  },
                  {
                    "active": true,
                    "kind": "param",
                    "name": "day",
                    "orig": "day",
                    "reqd": true,
                    "type": "`$INTEGER`",
                    "index$": 1
                  },
                  {
                    "active": true,
                    "kind": "param",
                    "name": "division",
                    "orig": "division",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 2
                  }
                ]
              },
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
              },
              "index$": 0
            }
          ],
          "key$": "list"
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "division",
                    "orig": "division",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  },
                  {
                    "active": true,
                    "kind": "param",
                    "name": "id",
                    "orig": "basho_id",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 1
                  }
                ]
              },
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
              },
              "index$": 0
            },
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "id",
                    "orig": "basho_id",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  }
                ]
              },
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
              },
              "index$": 1
            }
          ],
          "key$": "load"
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
          "active": true,
          "name": "category",
          "req": false,
          "type": "`$STRING`",
          "index$": 0
        },
        {
          "active": true,
          "name": "description",
          "req": false,
          "type": "`$STRING`",
          "index$": 1
        },
        {
          "active": true,
          "name": "english_name",
          "req": false,
          "type": "`$STRING`",
          "index$": 2
        },
        {
          "active": true,
          "name": "frequency",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 3
        },
        {
          "active": true,
          "name": "name",
          "req": false,
          "type": "`$STRING`",
          "index$": 4
        }
      ],
      "name": "kimarite",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {},
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
              },
              "index$": 0
            }
          ],
          "key$": "list"
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "id",
                    "orig": "kimarite",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  }
                ]
              },
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
              },
              "index$": 0
            }
          ],
          "key$": "load"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "measurement": {
      "fields": [
        {
          "active": true,
          "name": "height",
          "req": false,
          "type": "`$NUMBER`",
          "index$": 0
        },
        {
          "active": true,
          "name": "recorded_date",
          "req": false,
          "type": "`$STRING`",
          "index$": 1
        },
        {
          "active": true,
          "name": "rikishi_id",
          "req": false,
          "type": "`$STRING`",
          "index$": 2
        },
        {
          "active": true,
          "name": "weight",
          "req": false,
          "type": "`$NUMBER`",
          "index$": 3
        }
      ],
      "name": "measurement",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {},
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
              },
              "index$": 0
            }
          ],
          "key$": "list"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "rank": {
      "fields": [
        {
          "active": true,
          "name": "division",
          "req": false,
          "type": "`$STRING`",
          "index$": 0
        },
        {
          "active": true,
          "name": "id",
          "req": false,
          "type": "`$STRING`",
          "index$": 1
        },
        {
          "active": true,
          "name": "level",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 2
        },
        {
          "active": true,
          "name": "name",
          "req": false,
          "type": "`$STRING`",
          "index$": 3
        }
      ],
      "name": "rank",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {},
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
              },
              "index$": 0
            }
          ],
          "key$": "list"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "rikishi": {
      "fields": [
        {
          "active": true,
          "name": "basho_id",
          "req": false,
          "type": "`$STRING`",
          "index$": 0
        },
        {
          "active": true,
          "name": "birthdate",
          "req": false,
          "type": "`$STRING`",
          "index$": 1
        },
        {
          "active": true,
          "name": "birthplace",
          "req": false,
          "type": "`$STRING`",
          "index$": 2
        },
        {
          "active": true,
          "name": "championship",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 3
        },
        {
          "active": true,
          "name": "current_rank",
          "req": false,
          "type": "`$STRING`",
          "index$": 4
        },
        {
          "active": true,
          "name": "day",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 5
        },
        {
          "active": true,
          "name": "debut",
          "req": false,
          "type": "`$STRING`",
          "index$": 6
        },
        {
          "active": true,
          "name": "division",
          "req": false,
          "type": "`$STRING`",
          "index$": 7
        },
        {
          "active": true,
          "name": "height",
          "req": false,
          "type": "`$NUMBER`",
          "index$": 8
        },
        {
          "active": true,
          "name": "heya",
          "req": false,
          "type": "`$STRING`",
          "index$": 9
        },
        {
          "active": true,
          "name": "highest_rank",
          "req": false,
          "type": "`$STRING`",
          "index$": 10
        },
        {
          "active": true,
          "name": "id",
          "req": false,
          "type": "`$STRING`",
          "index$": 11
        },
        {
          "active": true,
          "name": "kimarite",
          "req": false,
          "type": "`$STRING`",
          "index$": 12
        },
        {
          "active": true,
          "name": "real_name",
          "req": false,
          "type": "`$STRING`",
          "index$": 13
        },
        {
          "active": true,
          "name": "rikishi1_id",
          "req": false,
          "type": "`$STRING`",
          "index$": 14
        },
        {
          "active": true,
          "name": "rikishi2_id",
          "req": false,
          "type": "`$STRING`",
          "index$": 15
        },
        {
          "active": true,
          "name": "rikishi_id",
          "req": false,
          "type": "`$STRING`",
          "index$": 16
        },
        {
          "active": true,
          "name": "shikona",
          "req": false,
          "type": "`$STRING`",
          "index$": 17
        },
        {
          "active": true,
          "name": "total_loss",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 18
        },
        {
          "active": true,
          "name": "total_win",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 19
        },
        {
          "active": true,
          "name": "weight",
          "req": false,
          "type": "`$NUMBER`",
          "index$": 20
        },
        {
          "active": true,
          "name": "win_rate",
          "req": false,
          "type": "`$NUMBER`",
          "index$": 21
        },
        {
          "active": true,
          "name": "winner_id",
          "req": false,
          "type": "`$STRING`",
          "index$": 22
        }
      ],
      "name": "rikishi",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "id",
                    "orig": "rikishi_id",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
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
              },
              "index$": 0
            },
            {
              "active": true,
              "args": {},
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
              },
              "index$": 1
            }
          ],
          "key$": "list"
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "id",
                    "orig": "rikishi_id",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  },
                  {
                    "active": true,
                    "kind": "param",
                    "name": "opponent_id",
                    "orig": "opponent_id",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 1
                  }
                ]
              },
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
              },
              "index$": 0
            },
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "id",
                    "orig": "rikishi_id",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  }
                ]
              },
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
              },
              "index$": 1
            },
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "id",
                    "orig": "rikishi_id",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
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
              },
              "index$": 2
            }
          ],
          "key$": "load"
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
          "active": true,
          "name": "end_date",
          "req": false,
          "type": "`$STRING`",
          "index$": 0
        },
        {
          "active": true,
          "name": "rikishi_id",
          "req": false,
          "type": "`$STRING`",
          "index$": 1
        },
        {
          "active": true,
          "name": "shikona",
          "req": false,
          "type": "`$STRING`",
          "index$": 2
        },
        {
          "active": true,
          "name": "start_date",
          "req": false,
          "type": "`$STRING`",
          "index$": 3
        }
      ],
      "name": "shikona",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {},
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
              },
              "index$": 0
            }
          ],
          "key$": "list"
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

