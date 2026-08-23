# Sumo SDK configuration

module SumoConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "Sumo",
        "slug" => "sumo",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://www.sumo-api.com",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "basho" => {},
          "kimarite" => {},
          "measurement" => {},
          "rank" => {},
          "rikishi" => {},
          "shikona" => {},
        },
      },
      "entity" => {
        "basho" => {
          "fields" => [
            {
              "name" => "endDate",
              "short" => "End date of the tournament",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "short" => "Unique identifier for the basho",
              "type" => "`$STRING`",
            },
            {
              "name" => "kimarite",
              "short" => "Winning technique used (if match completed)",
              "type" => "`$STRING`",
            },
            {
              "name" => "matchNumber",
              "short" => "Match number in the day's schedule",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "month",
              "short" => "Month of the tournament",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "rank",
              "short" => "Rank in the banzuke",
              "type" => "`$STRING`",
            },
            {
              "name" => "rikishi1Id",
              "short" => "First rikishi identifier",
              "type" => "`$STRING`",
            },
            {
              "name" => "rikishi2Id",
              "short" => "Second rikishi identifier",
              "type" => "`$STRING`",
            },
            {
              "name" => "rikishiId",
              "short" => "Unique identifier for the rikishi",
              "type" => "`$STRING`",
            },
            {
              "name" => "shikona",
              "short" => "Ring name of the rikishi",
              "type" => "`$STRING`",
            },
            {
              "name" => "side",
              "short" => "Side of the banzuke (east or west)",
              "type" => "`$STRING`",
            },
            {
              "name" => "startDate",
              "short" => "Start date of the tournament",
              "type" => "`$STRING`",
            },
            {
              "name" => "venue",
              "short" => "Tournament venue",
              "type" => "`$STRING`",
            },
            {
              "name" => "winnerId",
              "short" => "Winner rikishi identifier (if match completed)",
              "type" => "`$STRING`",
            },
            {
              "name" => "year",
              "short" => "Year of the tournament",
              "type" => "`$INTEGER`",
            },
          ],
          "name" => "basho",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "basho_id",
                        "orig" => "basho_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "param",
                        "name" => "day",
                        "orig" => "day",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                      {
                        "kind" => "param",
                        "name" => "division",
                        "orig" => "division",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/basho/{bashoId}/torikumi/{division}/{day}",
                  "parts" => [
                    "api",
                    "basho",
                    "{basho_id}",
                    "torikumi",
                    "{division}",
                    "{day}",
                  ],
                  "rename" => {
                    "param" => {
                      "bashoId" => "basho_id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "basho_id",
                      "day",
                      "division",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "division",
                        "orig" => "division",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "basho_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/basho/{bashoId}/banzuke/{division}",
                  "parts" => [
                    "api",
                    "basho",
                    "{id}",
                    "banzuke",
                    "{division}",
                  ],
                  "rename" => {
                    "param" => {
                      "bashoId" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "division",
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "basho_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/basho/{bashoId}",
                  "parts" => [
                    "api",
                    "basho",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "bashoId" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "banzuke",
              ],
              [
                "basho",
                "torikumi",
              ],
            ],
          },
        },
        "kimarite" => {
          "fields" => [
            {
              "name" => "category",
              "short" => "Category of the technique",
              "type" => "`$STRING`",
            },
            {
              "name" => "description",
              "short" => "Detailed description of the technique",
              "type" => "`$STRING`",
            },
            {
              "name" => "englishName",
              "short" => "English translation of the technique name",
              "type" => "`$STRING`",
            },
            {
              "name" => "frequency",
              "short" => "Number of times this technique has been used",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "name",
              "short" => "Name of the kimarite technique",
              "type" => "`$STRING`",
            },
          ],
          "name" => "kimarite",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/kimarite",
                  "parts" => [
                    "api",
                    "kimarite",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "kimarite",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/kimarite/{kimarite}",
                  "parts" => [
                    "api",
                    "kimarite",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "kimarite" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "measurement" => {
          "fields" => [
            {
              "name" => "height",
              "short" => "Height in centimeters",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "recordedDate",
              "short" => "Date when measurement was recorded",
              "type" => "`$STRING`",
            },
            {
              "name" => "rikishiId",
              "short" => "Unique identifier for the rikishi",
              "type" => "`$STRING`",
            },
            {
              "name" => "weight",
              "short" => "Weight in kilograms",
              "type" => "`$NUMBER`",
            },
          ],
          "name" => "measurement",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/measurements",
                  "parts" => [
                    "api",
                    "measurements",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "rank" => {
          "fields" => [
            {
              "name" => "division",
              "short" => "Division the rank belongs to",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "short" => "Unique identifier for the rank",
              "type" => "`$STRING`",
            },
            {
              "name" => "level",
              "short" => "Hierarchical level of the rank",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "name",
              "short" => "Name of the rank",
              "type" => "`$STRING`",
            },
          ],
          "name" => "rank",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/ranks",
                  "parts" => [
                    "api",
                    "ranks",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "rikishi" => {
          "fields" => [
            {
              "name" => "bashoId",
              "short" => "Identifier of the basho where match took place",
              "type" => "`$STRING`",
            },
            {
              "name" => "birthdate",
              "short" => "Date of birth",
              "type" => "`$STRING`",
            },
            {
              "name" => "birthplace",
              "short" => "Birthplace of the rikishi",
              "type" => "`$STRING`",
            },
            {
              "name" => "championships",
              "short" => "Number of championships won",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "currentRank",
              "short" => "Current rank of the rikishi",
              "type" => "`$STRING`",
            },
            {
              "name" => "day",
              "short" => "Day of the tournament",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "debut",
              "short" => "Debut date or basho",
              "type" => "`$STRING`",
            },
            {
              "name" => "division",
              "short" => "Division of the match",
              "type" => "`$STRING`",
            },
            {
              "name" => "height",
              "short" => "Height in centimeters",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "heya",
              "short" => "Stable (heya) the rikishi belongs to",
              "type" => "`$STRING`",
            },
            {
              "name" => "highestRank",
              "short" => "Highest rank achieved",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "short" => "Unique identifier for the match",
              "type" => "`$STRING`",
            },
            {
              "name" => "kimarite",
              "short" => "Winning technique used",
              "type" => "`$STRING`",
            },
            {
              "name" => "realName",
              "short" => "Real name of the rikishi",
              "type" => "`$STRING`",
            },
            {
              "name" => "rikishi1Id",
              "short" => "First rikishi identifier",
              "type" => "`$STRING`",
            },
            {
              "name" => "rikishi2Id",
              "short" => "Second rikishi identifier",
              "type" => "`$STRING`",
            },
            {
              "name" => "rikishiId",
              "short" => "Unique identifier for the rikishi",
              "type" => "`$STRING`",
            },
            {
              "name" => "shikona",
              "short" => "Ring name of the rikishi",
              "type" => "`$STRING`",
            },
            {
              "name" => "totalLosses",
              "short" => "Total number of losses",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "totalWins",
              "short" => "Total number of wins",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "weight",
              "short" => "Weight in kilograms",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "winRate",
              "short" => "Win rate percentage",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "winnerId",
              "short" => "Winner rikishi identifier",
              "type" => "`$STRING`",
            },
          ],
          "name" => "rikishi",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "rikishi_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/rikishi/{rikishiId}/matches",
                  "parts" => [
                    "api",
                    "rikishi",
                    "{id}",
                    "matches",
                  ],
                  "rename" => {
                    "param" => {
                      "rikishiId" => "id",
                    },
                  },
                  "select" => {
                    "$action" => "match",
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/rikishis",
                  "parts" => [
                    "api",
                    "rikishis",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "rikishi_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "param",
                        "name" => "opponent_id",
                        "orig" => "opponent_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/rikishi/{rikishiId}/matches/{opponentId}",
                  "parts" => [
                    "api",
                    "rikishi",
                    "{id}",
                    "matches",
                    "{opponent_id}",
                  ],
                  "rename" => {
                    "param" => {
                      "opponentId" => "opponent_id",
                      "rikishiId" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "id",
                      "opponent_id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "rikishi_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/rikishi/{rikishiId}",
                  "parts" => [
                    "api",
                    "rikishi",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "rikishiId" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "rikishi_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/rikishi/{rikishiId}/stats",
                  "parts" => [
                    "api",
                    "rikishi",
                    "{id}",
                    "stats",
                  ],
                  "rename" => {
                    "param" => {
                      "rikishiId" => "id",
                    },
                  },
                  "select" => {
                    "$action" => "stat",
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "match",
              ],
            ],
          },
        },
        "shikona" => {
          "fields" => [
            {
              "name" => "endDate",
              "short" => "Date when rikishi stopped using this shikona",
              "type" => "`$STRING`",
            },
            {
              "name" => "rikishiId",
              "short" => "Identifier of the rikishi using this shikona",
              "type" => "`$STRING`",
            },
            {
              "name" => "shikona",
              "short" => "Ring name (shikona)",
              "type" => "`$STRING`",
            },
            {
              "name" => "startDate",
              "short" => "Date when rikishi started using this shikona",
              "type" => "`$STRING`",
            },
          ],
          "name" => "shikona",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/shikonas",
                  "parts" => [
                    "api",
                    "shikonas",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    SumoFeatures.make_feature(name)
  end
end
