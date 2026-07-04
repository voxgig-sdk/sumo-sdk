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
| `end_date` | ``$STRING`` | No |  |
| `id` | ``$STRING`` | No |  |
| `kimarite` | ``$STRING`` | No |  |
| `match_number` | ``$INTEGER`` | No |  |
| `month` | ``$INTEGER`` | No |  |
| `rank` | ``$STRING`` | No |  |
| `rikishi1_id` | ``$STRING`` | No |  |
| `rikishi2_id` | ``$STRING`` | No |  |
| `rikishi_id` | ``$STRING`` | No |  |
| `shikona` | ``$STRING`` | No |  |
| `side` | ``$STRING`` | No |  |
| `start_date` | ``$STRING`` | No |  |
| `venue` | ``$STRING`` | No |  |
| `winner_id` | ``$STRING`` | No |  |
| `year` | ``$INTEGER`` | No |  |

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
| `category` | ``$STRING`` | No |  |
| `description` | ``$STRING`` | No |  |
| `english_name` | ``$STRING`` | No |  |
| `frequency` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |

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
| `height` | ``$NUMBER`` | No |  |
| `recorded_date` | ``$STRING`` | No |  |
| `rikishi_id` | ``$STRING`` | No |  |
| `weight` | ``$NUMBER`` | No |  |

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
| `division` | ``$STRING`` | No |  |
| `id` | ``$STRING`` | No |  |
| `level` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |

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
| `basho_id` | ``$STRING`` | No |  |
| `birthdate` | ``$STRING`` | No |  |
| `birthplace` | ``$STRING`` | No |  |
| `championship` | ``$INTEGER`` | No |  |
| `current_rank` | ``$STRING`` | No |  |
| `day` | ``$INTEGER`` | No |  |
| `debut` | ``$STRING`` | No |  |
| `division` | ``$STRING`` | No |  |
| `height` | ``$NUMBER`` | No |  |
| `heya` | ``$STRING`` | No |  |
| `highest_rank` | ``$STRING`` | No |  |
| `id` | ``$STRING`` | No |  |
| `kimarite` | ``$STRING`` | No |  |
| `real_name` | ``$STRING`` | No |  |
| `rikishi1_id` | ``$STRING`` | No |  |
| `rikishi2_id` | ``$STRING`` | No |  |
| `rikishi_id` | ``$STRING`` | No |  |
| `shikona` | ``$STRING`` | No |  |
| `total_loss` | ``$INTEGER`` | No |  |
| `total_win` | ``$INTEGER`` | No |  |
| `weight` | ``$NUMBER`` | No |  |
| `win_rate` | ``$NUMBER`` | No |  |
| `winner_id` | ``$STRING`` | No |  |

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
| `end_date` | ``$STRING`` | No |  |
| `rikishi_id` | ``$STRING`` | No |  |
| `shikona` | ``$STRING`` | No |  |
| `start_date` | ``$STRING`` | No |  |

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

