# Sumo Lua SDK Reference

Complete API reference for the Sumo Lua SDK.


## SumoSDK

### Constructor

```lua
local sdk = require("sumo_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `Basho(data)`

Create a new `Basho` entity instance. Pass `nil` for no initial data.

#### `Kimarite(data)`

Create a new `Kimarite` entity instance. Pass `nil` for no initial data.

#### `Measurement(data)`

Create a new `Measurement` entity instance. Pass `nil` for no initial data.

#### `Rank(data)`

Create a new `Rank` entity instance. Pass `nil` for no initial data.

#### `Rikishi(data)`

Create a new `Rikishi` entity instance. Pass `nil` for no initial data.

#### `Shikona(data)`

Create a new `Shikona` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## BashoEntity

```lua
local basho = client:Basho(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `endDate` | `string` | No | End date of the tournament |
| `id` | `string` | No | Unique identifier for the basho |
| `kimarite` | `string` | No | Winning technique used (if match completed) |
| `matchNumber` | `number` | No | Match number in the day's schedule |
| `month` | `number` | No | Month of the tournament |
| `rank` | `string` | No | Rank in the banzuke |
| `rikishi1Id` | `string` | No | First rikishi identifier |
| `rikishi2Id` | `string` | No | Second rikishi identifier |
| `rikishiId` | `string` | No | Unique identifier for the rikishi |
| `shikona` | `string` | No | Ring name of the rikishi |
| `side` | `string` | No | Side of the banzuke (east or west) |
| `startDate` | `string` | No | Start date of the tournament |
| `venue` | `string` | No | Tournament venue |
| `winnerId` | `string` | No | Winner rikishi identifier (if match completed) |
| `year` | `number` | No | Year of the tournament |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Basho():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Basho():load({ id = "basho_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BashoEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## KimariteEntity

```lua
local kimarite = client:Kimarite(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `category` | `string` | No | Category of the technique |
| `description` | `string` | No | Detailed description of the technique |
| `englishName` | `string` | No | English translation of the technique name |
| `frequency` | `number` | No | Number of times this technique has been used |
| `id` | `string` | No |  |
| `name` | `string` | No | Name of the kimarite technique |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Kimarite():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Kimarite():load({ id = "kimarite_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `KimariteEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## MeasurementEntity

```lua
local measurement = client:Measurement(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `height` | `number` | No | Height in centimeters |
| `recordedDate` | `string` | No | Date when measurement was recorded |
| `rikishiId` | `string` | No | Unique identifier for the rikishi |
| `weight` | `number` | No | Weight in kilograms |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Measurement():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MeasurementEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## RankEntity

```lua
local rank = client:Rank(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `division` | `string` | No | Division the rank belongs to |
| `id` | `string` | No | Unique identifier for the rank |
| `level` | `number` | No | Hierarchical level of the rank |
| `name` | `string` | No | Name of the rank |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Rank():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RankEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## RikishiEntity

```lua
local rikishi = client:Rikishi(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bashoId` | `string` | No | Identifier of the basho where match took place |
| `birthdate` | `string` | No | Date of birth |
| `birthplace` | `string` | No | Birthplace of the rikishi |
| `championships` | `number` | No | Number of championships won |
| `currentRank` | `string` | No | Current rank of the rikishi |
| `day` | `number` | No | Day of the tournament |
| `debut` | `string` | No | Debut date or basho |
| `division` | `string` | No | Division of the match |
| `height` | `number` | No | Height in centimeters |
| `heya` | `string` | No | Stable (heya) the rikishi belongs to |
| `highestRank` | `string` | No | Highest rank achieved |
| `id` | `string` | No | Unique identifier for the match |
| `kimarite` | `string` | No | Winning technique used |
| `realName` | `string` | No | Real name of the rikishi |
| `rikishi1Id` | `string` | No | First rikishi identifier |
| `rikishi2Id` | `string` | No | Second rikishi identifier |
| `rikishiId` | `string` | No | Unique identifier for the rikishi |
| `shikona` | `string` | No | Ring name of the rikishi |
| `totalLosses` | `number` | No | Total number of losses |
| `totalWins` | `number` | No | Total number of wins |
| `weight` | `number` | No | Weight in kilograms |
| `winRate` | `number` | No | Win rate percentage |
| `winnerId` | `string` | No | Winner rikishi identifier |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Rikishi():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Rikishi():load({ id = "rikishi_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RikishiEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ShikonaEntity

```lua
local shikona = client:Shikona(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `endDate` | `string` | No | Date when rikishi stopped using this shikona |
| `rikishiId` | `string` | No | Identifier of the rikishi using this shikona |
| `shikona` | `string` | No | Ring name (shikona) |
| `startDate` | `string` | No | Date when rikishi started using this shikona |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Shikona():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ShikonaEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

In-memory mock transport for testing without a live server.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

Options above are those the model carries a default for. A feature may
also accept callback options — a `sink` to receive each record, for
instance — which have no default and are covered in the full feature
reference.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

