# Sumo Ruby SDK Reference

Complete API reference for the Sumo Ruby SDK.


## SumoSDK

### Constructor

```ruby
require_relative 'sumo_sdk'

client = SumoSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["apikey"]` | `String` | API key for authentication. |
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

#### `direct(fetchargs = {}) -> Hash, err`

Make a direct HTTP request to any API endpoint.

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

**Returns:** `Hash, err`

#### `prepare(fetchargs = {}) -> Hash, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Hash, err`


---

## BashoEntity

```ruby
basho = client.Basho
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

#### `list(reqmatch, ctrl = nil) -> result, err`

List entities matching the given criteria. Returns an array.

```ruby
results, err = client.Basho.list(nil)
```

#### `load(reqmatch, ctrl = nil) -> result, err`

Load a single entity matching the given criteria.

```ruby
result, err = client.Basho.load({ "id" => "basho_id" })
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
| `category` | ``$STRING`` | No |  |
| `description` | ``$STRING`` | No |  |
| `english_name` | ``$STRING`` | No |  |
| `frequency` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl = nil) -> result, err`

List entities matching the given criteria. Returns an array.

```ruby
results, err = client.Kimarite.list(nil)
```

#### `load(reqmatch, ctrl = nil) -> result, err`

Load a single entity matching the given criteria.

```ruby
result, err = client.Kimarite.load({ "id" => "kimarite_id" })
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
| `height` | ``$NUMBER`` | No |  |
| `recorded_date` | ``$STRING`` | No |  |
| `rikishi_id` | ``$STRING`` | No |  |
| `weight` | ``$NUMBER`` | No |  |

### Operations

#### `list(reqmatch, ctrl = nil) -> result, err`

List entities matching the given criteria. Returns an array.

```ruby
results, err = client.Measurement.list(nil)
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
| `division` | ``$STRING`` | No |  |
| `id` | ``$STRING`` | No |  |
| `level` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl = nil) -> result, err`

List entities matching the given criteria. Returns an array.

```ruby
results, err = client.Rank.list(nil)
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

#### `list(reqmatch, ctrl = nil) -> result, err`

List entities matching the given criteria. Returns an array.

```ruby
results, err = client.Rikishi.list(nil)
```

#### `load(reqmatch, ctrl = nil) -> result, err`

Load a single entity matching the given criteria.

```ruby
result, err = client.Rikishi.load({ "id" => "rikishi_id" })
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
| `end_date` | ``$STRING`` | No |  |
| `rikishi_id` | ``$STRING`` | No |  |
| `shikona` | ``$STRING`` | No |  |
| `start_date` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl = nil) -> result, err`

List entities matching the given criteria. Returns an array.

```ruby
results, err = client.Shikona.list(nil)
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

