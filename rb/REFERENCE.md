# Sumo Ruby SDK Reference

Complete API reference for the Sumo Ruby SDK.


## SumoSDK

### Constructor

```ruby
require_relative 'Sumo_sdk'

client = SumoSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `SumoSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = SumoSDK.test
```


### Instance Methods

#### `Basho(data = nil)`

Create a new `Basho` entity instance. Pass `nil` for no initial data.

#### `Kimarite(data = nil)`

Create a new `Kimarite` entity instance. Pass `nil` for no initial data.

#### `Measurement(data = nil)`

Create a new `Measurement` entity instance. Pass `nil` for no initial data.

#### `Rank(data = nil)`

Create a new `Rank` entity instance. Pass `nil` for no initial data.

#### `Rikishi(data = nil)`

Create a new `Rikishi` entity instance. Pass `nil` for no initial data.

#### `Shikona(data = nil)`

Create a new `Shikona` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## BashoEntity

```ruby
basho = client.Basho
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `end_date` | `String` | No |  |
| `id` | `String` | No |  |
| `kimarite` | `String` | No |  |
| `match_number` | `Integer` | No |  |
| `month` | `Integer` | No |  |
| `rank` | `String` | No |  |
| `rikishi1_id` | `String` | No |  |
| `rikishi2_id` | `String` | No |  |
| `rikishi_id` | `String` | No |  |
| `shikona` | `String` | No |  |
| `side` | `String` | No |  |
| `start_date` | `String` | No |  |
| `venue` | `String` | No |  |
| `winner_id` | `String` | No |  |
| `year` | `Integer` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Basho.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Basho.load({ "id" => "basho_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `BashoEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## KimariteEntity

```ruby
kimarite = client.Kimarite
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `category` | `String` | No |  |
| `description` | `String` | No |  |
| `english_name` | `String` | No |  |
| `frequency` | `Integer` | No |  |
| `name` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Kimarite.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Kimarite.load({ "id" => "kimarite_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `KimariteEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## MeasurementEntity

```ruby
measurement = client.Measurement
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `height` | `Float` | No |  |
| `recorded_date` | `String` | No |  |
| `rikishi_id` | `String` | No |  |
| `weight` | `Float` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Measurement.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `MeasurementEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## RankEntity

```ruby
rank = client.Rank
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `division` | `String` | No |  |
| `id` | `String` | No |  |
| `level` | `Integer` | No |  |
| `name` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Rank.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `RankEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## RikishiEntity

```ruby
rikishi = client.Rikishi
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `basho_id` | `String` | No |  |
| `birthdate` | `String` | No |  |
| `birthplace` | `String` | No |  |
| `championship` | `Integer` | No |  |
| `current_rank` | `String` | No |  |
| `day` | `Integer` | No |  |
| `debut` | `String` | No |  |
| `division` | `String` | No |  |
| `height` | `Float` | No |  |
| `heya` | `String` | No |  |
| `highest_rank` | `String` | No |  |
| `id` | `String` | No |  |
| `kimarite` | `String` | No |  |
| `real_name` | `String` | No |  |
| `rikishi1_id` | `String` | No |  |
| `rikishi2_id` | `String` | No |  |
| `rikishi_id` | `String` | No |  |
| `shikona` | `String` | No |  |
| `total_loss` | `Integer` | No |  |
| `total_win` | `Integer` | No |  |
| `weight` | `Float` | No |  |
| `win_rate` | `Float` | No |  |
| `winner_id` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Rikishi.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Rikishi.load({ "id" => "rikishi_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `RikishiEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ShikonaEntity

```ruby
shikona = client.Shikona
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `end_date` | `String` | No |  |
| `rikishi_id` | `String` | No |  |
| `shikona` | `String` | No |  |
| `start_date` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Shikona.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ShikonaEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = SumoSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

