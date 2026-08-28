# Sumo Lua SDK



The Lua SDK for the Sumo API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:Basho()` — each with the same small set of operations (`list`, `load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/sumo-sdk/releases)),
or add the source directory to your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("sumo_sdk")

local client = sdk.new()
```

### 2. List basho records

Entity operations return `(value, err)`. For `list`, `value` is the
array of records itself — iterate it directly (there is no wrapper).

```lua
local bashos, err = client:Basho():list()
if err then error(err) end

for _, item in ipairs(bashos) do
  print(item["id"], item["endDate"])
end
```

### 3. Load a basho

```lua
local basho, err = client:Basho():load({ id = "example_id" })
if err then error(err) end
print(basho)
```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local shikonas, err = client:Shikona():list()
if err then error(err) end
```

`direct` follows the same `(value, err)` convention:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example_id" },
})
if err then error(err) end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test()

local result, err = client:Shikona():list()
-- result is the returned data; err is set on failure
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
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
cd lua && busted test/
```


## Reference

### SumoSDK

```lua
local sdk = require("sumo_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### SumoSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
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
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria. |
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the operation's
data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `load` | the entity record (a `table`) |
| `list` | an array (`table`) of entity records |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local basho, err = client:Basho():load({ id = "example_id" })
    if err then error(err) end
    -- basho is the loaded record

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

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
| `id` |  |
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

Create an instance: `local basho = client:Basho(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `endDate` | `string` | End date of the tournament |
| `id` | `string` | Unique identifier for the basho |
| `kimarite` | `string` | Winning technique used (if match completed) |
| `matchNumber` | `number` | Match number in the day's schedule |
| `month` | `number` | Month of the tournament |
| `rank` | `string` | Rank in the banzuke |
| `rikishi1Id` | `string` | First rikishi identifier |
| `rikishi2Id` | `string` | Second rikishi identifier |
| `rikishiId` | `string` | Unique identifier for the rikishi |
| `shikona` | `string` | Ring name of the rikishi |
| `side` | `string` | Side of the banzuke (east or west) |
| `startDate` | `string` | Start date of the tournament |
| `venue` | `string` | Tournament venue |
| `winnerId` | `string` | Winner rikishi identifier (if match completed) |
| `year` | `number` | Year of the tournament |

#### Example: Load

```lua
local basho, err = client:Basho():load({ id = "basho_id" })
```

#### Example: List

```lua
local bashos, err = client:Basho():list()
```


### Kimarite

Create an instance: `local kimarite = client:Kimarite(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `category` | `string` | Category of the technique |
| `description` | `string` | Detailed description of the technique |
| `englishName` | `string` | English translation of the technique name |
| `frequency` | `number` | Number of times this technique has been used |
| `id` | `string` |  |
| `name` | `string` | Name of the kimarite technique |

#### Example: Load

```lua
local kimarite, err = client:Kimarite():load({ id = "kimarite_id" })
```

#### Example: List

```lua
local kimarites, err = client:Kimarite():list()
```


### Measurement

Create an instance: `local measurement = client:Measurement(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `height` | `number` | Height in centimeters |
| `recordedDate` | `string` | Date when measurement was recorded |
| `rikishiId` | `string` | Unique identifier for the rikishi |
| `weight` | `number` | Weight in kilograms |

#### Example: List

```lua
local measurements, err = client:Measurement():list()
```


### Rank

Create an instance: `local rank = client:Rank(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `division` | `string` | Division the rank belongs to |
| `id` | `string` | Unique identifier for the rank |
| `level` | `number` | Hierarchical level of the rank |
| `name` | `string` | Name of the rank |

#### Example: List

```lua
local ranks, err = client:Rank():list()
```


### Rikishi

Create an instance: `local rikishi = client:Rikishi(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bashoId` | `string` | Identifier of the basho where match took place |
| `birthdate` | `string` | Date of birth |
| `birthplace` | `string` | Birthplace of the rikishi |
| `championships` | `number` | Number of championships won |
| `currentRank` | `string` | Current rank of the rikishi |
| `day` | `number` | Day of the tournament |
| `debut` | `string` | Debut date or basho |
| `division` | `string` | Division of the match |
| `height` | `number` | Height in centimeters |
| `heya` | `string` | Stable (heya) the rikishi belongs to |
| `highestRank` | `string` | Highest rank achieved |
| `id` | `string` | Unique identifier for the match |
| `kimarite` | `string` | Winning technique used |
| `realName` | `string` | Real name of the rikishi |
| `rikishi1Id` | `string` | First rikishi identifier |
| `rikishi2Id` | `string` | Second rikishi identifier |
| `rikishiId` | `string` | Unique identifier for the rikishi |
| `shikona` | `string` | Ring name of the rikishi |
| `totalLosses` | `number` | Total number of losses |
| `totalWins` | `number` | Total number of wins |
| `weight` | `number` | Weight in kilograms |
| `winRate` | `number` | Win rate percentage |
| `winnerId` | `string` | Winner rikishi identifier |

#### Example: Load

```lua
local rikishi, err = client:Rikishi():load({ id = "rikishi_id" })
```

#### Example: List

```lua
local rikishis, err = client:Rikishi():list()
```


### Shikona

Create an instance: `local shikona = client:Shikona(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `endDate` | `string` | Date when rikishi stopped using this shikona |
| `rikishiId` | `string` | Identifier of the rikishi using this shikona |
| `shikona` | `string` | Ring name (shikona) |
| `startDate` | `string` | Date when rikishi started using this shikona |

#### Example: List

```lua
local shikonas, err = client:Shikona():list()
```

## Features

This SDK ships 1 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`test`](#test) | In-memory mock transport for testing without a live server |

### test

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.


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

Features are the extension mechanism. A feature is a Lua table
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── sumo_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`sumo_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```lua
local shikona = client:Shikona()
shikona:list()

-- shikona:data_get() now returns the shikona data from the last list
-- shikona:match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
