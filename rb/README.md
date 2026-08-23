# Sumo Ruby SDK



The Ruby SDK for the Sumo API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Basho` — with named operations (`list`/`load`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/sumo-sdk/releases](https://github.com/voxgig-sdk/sumo-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "Sumo_sdk"

client = SumoSDK.new
```

### 2. List basho records

```ruby
begin
  # list returns an Array of Basho records — iterate directly.
  bashos = client.Basho.list
  bashos.each do |item|
    puts "#{item["id"]} #{item["endDate"]}"
  end
rescue => err
  warn "list failed: #{err}"
end
```

### 3. Load a basho

```ruby
begin
  # load returns the ENTITY — call data_get for the Basho record (raises on error).
  basho = client.Basho.load({ "id" => "example_id" })
  puts basho
rescue => err
  warn "load failed: #{err}"
end
```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  shikonas = client.Shikona.list()
rescue => err
  warn "list failed: #{err}"
end
```

`direct` does **not** raise — it returns the result hash. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example_id" },
})

warn "request failed: #{result["err"] || "HTTP #{result["status"]}"}" unless result["ok"]
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  # On an HTTP error status there is no err (only a transport failure sets
  # it), so fall back to the status code.
  warn(result["err"] || "HTTP #{result["status"]}")
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required:

```ruby
client = SumoSDK.test

# Entity ops return the ENTITY (raises on error);
# call data_get for the mock record.
shikona = client.Shikona.list()
puts shikona
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = SumoSDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
  },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
SUMO_TEST_LIVE=TRUE
```

Then run:

```bash
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### SumoSDK

```ruby
require_relative "Sumo_sdk"
client = SumoSDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = SumoSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### SumoSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
| `Basho` | `(data) -> BashoEntity` | Create a Basho entity instance. |
| `Kimarite` | `(data) -> KimariteEntity` | Create a Kimarite entity instance. |
| `Measurement` | `(data) -> MeasurementEntity` | Create a Measurement entity instance. |
| `Rank` | `(data) -> RankEntity` | Create a Rank entity instance. |
| `Rikishi` | `(data) -> RikishiEntity` | Create a Rikishi entity instance. |
| `Shikona` | `(data) -> ShikonaEntity` | Create a Shikona entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch = nil, ctrl) -> Array` | List entities matching the criteria (call with no argument to list all). Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the result data directly. On failure they
raise a `SumoError` (a `StandardError` subclass), so wrap
calls in `begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

### Entities

#### Basho

| Field | Description |
| --- | --- |
| `endDate` | End date of the tournament |
| `id` | Unique identifier for the basho |
| `kimarite` | Winning technique used (if match completed) |
| `matchNumber` | Match number in the day's schedule |
| `month` | Month of the tournament |
| `rank` | Rank in the banzuke |
| `rikishi1Id` | First rikishi identifier |
| `rikishi2Id` | Second rikishi identifier |
| `rikishiId` | Unique identifier for the rikishi |
| `shikona` | Ring name of the rikishi |
| `side` | Side of the banzuke (east or west) |
| `startDate` | Start date of the tournament |
| `venue` | Tournament venue |
| `winnerId` | Winner rikishi identifier (if match completed) |
| `year` | Year of the tournament |

Operations: List, Load.

API path: `/api/basho/{bashoId}/torikumi/{division}/{day}`

#### Kimarite

| Field | Description |
| --- | --- |
| `category` | Category of the technique |
| `description` | Detailed description of the technique |
| `englishName` | English translation of the technique name |
| `frequency` | Number of times this technique has been used |
| `name` | Name of the kimarite technique |

Operations: List, Load.

API path: `/api/kimarite`

#### Measurement

| Field | Description |
| --- | --- |
| `height` | Height in centimeters |
| `recordedDate` | Date when measurement was recorded |
| `rikishiId` | Unique identifier for the rikishi |
| `weight` | Weight in kilograms |

Operations: List.

API path: `/api/measurements`

#### Rank

| Field | Description |
| --- | --- |
| `division` | Division the rank belongs to |
| `id` | Unique identifier for the rank |
| `level` | Hierarchical level of the rank |
| `name` | Name of the rank |

Operations: List.

API path: `/api/ranks`

#### Rikishi

| Field | Description |
| --- | --- |
| `bashoId` | Identifier of the basho where match took place |
| `birthdate` | Date of birth |
| `birthplace` | Birthplace of the rikishi |
| `championships` | Number of championships won |
| `currentRank` | Current rank of the rikishi |
| `day` | Day of the tournament |
| `debut` | Debut date or basho |
| `division` | Division of the match |
| `height` | Height in centimeters |
| `heya` | Stable (heya) the rikishi belongs to |
| `highestRank` | Highest rank achieved |
| `id` | Unique identifier for the match |
| `kimarite` | Winning technique used |
| `realName` | Real name of the rikishi |
| `rikishi1Id` | First rikishi identifier |
| `rikishi2Id` | Second rikishi identifier |
| `rikishiId` | Unique identifier for the rikishi |
| `shikona` | Ring name of the rikishi |
| `totalLosses` | Total number of losses |
| `totalWins` | Total number of wins |
| `weight` | Weight in kilograms |
| `winRate` | Win rate percentage |
| `winnerId` | Winner rikishi identifier |

Operations: List, Load.

API path: `/api/rikishi/{rikishiId}/matches`

#### Shikona

| Field | Description |
| --- | --- |
| `endDate` | Date when rikishi stopped using this shikona |
| `rikishiId` | Identifier of the rikishi using this shikona |
| `shikona` | Ring name (shikona) |
| `startDate` | Date when rikishi started using this shikona |

Operations: List.

API path: `/api/shikonas`



## Entities


### Basho

Create an instance: `basho = client.Basho`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `endDate` | `String` | End date of the tournament |
| `id` | `String` | Unique identifier for the basho |
| `kimarite` | `String` | Winning technique used (if match completed) |
| `matchNumber` | `Integer` | Match number in the day's schedule |
| `month` | `Integer` | Month of the tournament |
| `rank` | `String` | Rank in the banzuke |
| `rikishi1Id` | `String` | First rikishi identifier |
| `rikishi2Id` | `String` | Second rikishi identifier |
| `rikishiId` | `String` | Unique identifier for the rikishi |
| `shikona` | `String` | Ring name of the rikishi |
| `side` | `String` | Side of the banzuke (east or west) |
| `startDate` | `String` | Start date of the tournament |
| `venue` | `String` | Tournament venue |
| `winnerId` | `String` | Winner rikishi identifier (if match completed) |
| `year` | `Integer` | Year of the tournament |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Basho record (raises on error).
basho = client.Basho.load({ "id" => "basho_id" })
```

#### Example: List

```ruby
# list returns an Array of Basho records (raises on error).
bashos = client.Basho.list
```


### Kimarite

Create an instance: `kimarite = client.Kimarite`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `category` | `String` | Category of the technique |
| `description` | `String` | Detailed description of the technique |
| `englishName` | `String` | English translation of the technique name |
| `frequency` | `Integer` | Number of times this technique has been used |
| `name` | `String` | Name of the kimarite technique |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Kimarite record (raises on error).
kimarite = client.Kimarite.load({ "id" => "kimarite_id" })
```

#### Example: List

```ruby
# list returns an Array of Kimarite records (raises on error).
kimarites = client.Kimarite.list
```


### Measurement

Create an instance: `measurement = client.Measurement`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `height` | `Float` | Height in centimeters |
| `recordedDate` | `String` | Date when measurement was recorded |
| `rikishiId` | `String` | Unique identifier for the rikishi |
| `weight` | `Float` | Weight in kilograms |

#### Example: List

```ruby
# list returns an Array of Measurement records (raises on error).
measurements = client.Measurement.list
```


### Rank

Create an instance: `rank = client.Rank`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `division` | `String` | Division the rank belongs to |
| `id` | `String` | Unique identifier for the rank |
| `level` | `Integer` | Hierarchical level of the rank |
| `name` | `String` | Name of the rank |

#### Example: List

```ruby
# list returns an Array of Rank records (raises on error).
ranks = client.Rank.list
```


### Rikishi

Create an instance: `rikishi = client.Rikishi`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bashoId` | `String` | Identifier of the basho where match took place |
| `birthdate` | `String` | Date of birth |
| `birthplace` | `String` | Birthplace of the rikishi |
| `championships` | `Integer` | Number of championships won |
| `currentRank` | `String` | Current rank of the rikishi |
| `day` | `Integer` | Day of the tournament |
| `debut` | `String` | Debut date or basho |
| `division` | `String` | Division of the match |
| `height` | `Float` | Height in centimeters |
| `heya` | `String` | Stable (heya) the rikishi belongs to |
| `highestRank` | `String` | Highest rank achieved |
| `id` | `String` | Unique identifier for the match |
| `kimarite` | `String` | Winning technique used |
| `realName` | `String` | Real name of the rikishi |
| `rikishi1Id` | `String` | First rikishi identifier |
| `rikishi2Id` | `String` | Second rikishi identifier |
| `rikishiId` | `String` | Unique identifier for the rikishi |
| `shikona` | `String` | Ring name of the rikishi |
| `totalLosses` | `Integer` | Total number of losses |
| `totalWins` | `Integer` | Total number of wins |
| `weight` | `Float` | Weight in kilograms |
| `winRate` | `Float` | Win rate percentage |
| `winnerId` | `String` | Winner rikishi identifier |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Rikishi record (raises on error).
rikishi = client.Rikishi.load({ "id" => "rikishi_id" })
```

#### Example: List

```ruby
# list returns an Array of Rikishi records (raises on error).
rikishis = client.Rikishi.list
```


### Shikona

Create an instance: `shikona = client.Shikona`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `endDate` | `String` | Date when rikishi stopped using this shikona |
| `rikishiId` | `String` | Identifier of the rikishi using this shikona |
| `shikona` | `String` | Ring name (shikona) |
| `startDate` | `String` | Date when rikishi started using this shikona |

#### Example: List

```ruby
# list returns an Array of Shikona records (raises on error).
shikonas = client.Shikona.list
```


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── Sumo_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`Sumo_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```ruby
shikona = client.Shikona
shikona.list()

# shikona.data_get now returns the shikona data from the last list
# shikona.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
