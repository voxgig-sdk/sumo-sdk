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
| `endDate` | `String` | No | End date of the tournament |
| `id` | `String` | No | Unique identifier for the basho |
| `kimarite` | `String` | No | Winning technique used (if match completed) |
| `matchNumber` | `Integer` | No | Match number in the day's schedule |
| `month` | `Integer` | No | Month of the tournament |
| `rank` | `String` | No | Rank in the banzuke |
| `rikishi1Id` | `String` | No | First rikishi identifier |
| `rikishi2Id` | `String` | No | Second rikishi identifier |
| `rikishiId` | `String` | No | Unique identifier for the rikishi |
| `shikona` | `String` | No | Ring name of the rikishi |
| `side` | `String` | No | Side of the banzuke (east or west) |
| `startDate` | `String` | No | Start date of the tournament |
| `venue` | `String` | No | Tournament venue |
| `winnerId` | `String` | No | Winner rikishi identifier (if match completed) |
| `year` | `Integer` | No | Year of the tournament |

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
| `category` | `String` | No | Category of the technique |
| `description` | `String` | No | Detailed description of the technique |
| `englishName` | `String` | No | English translation of the technique name |
| `frequency` | `Integer` | No | Number of times this technique has been used |
| `id` | `String` | No |  |
| `name` | `String` | No | Name of the kimarite technique |

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
| `height` | `Float` | No | Height in centimeters |
| `recordedDate` | `String` | No | Date when measurement was recorded |
| `rikishiId` | `String` | No | Unique identifier for the rikishi |
| `weight` | `Float` | No | Weight in kilograms |

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
| `division` | `String` | No | Division the rank belongs to |
| `id` | `String` | No | Unique identifier for the rank |
| `level` | `Integer` | No | Hierarchical level of the rank |
| `name` | `String` | No | Name of the rank |

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
| `bashoId` | `String` | No | Identifier of the basho where match took place |
| `birthdate` | `String` | No | Date of birth |
| `birthplace` | `String` | No | Birthplace of the rikishi |
| `championships` | `Integer` | No | Number of championships won |
| `currentRank` | `String` | No | Current rank of the rikishi |
| `day` | `Integer` | No | Day of the tournament |
| `debut` | `String` | No | Debut date or basho |
| `division` | `String` | No | Division of the match |
| `height` | `Float` | No | Height in centimeters |
| `heya` | `String` | No | Stable (heya) the rikishi belongs to |
| `highestRank` | `String` | No | Highest rank achieved |
| `id` | `String` | No | Unique identifier for the match |
| `kimarite` | `String` | No | Winning technique used |
| `realName` | `String` | No | Real name of the rikishi |
| `rikishi1Id` | `String` | No | First rikishi identifier |
| `rikishi2Id` | `String` | No | Second rikishi identifier |
| `rikishiId` | `String` | No | Unique identifier for the rikishi |
| `shikona` | `String` | No | Ring name of the rikishi |
| `totalLosses` | `Integer` | No | Total number of losses |
| `totalWins` | `Integer` | No | Total number of wins |
| `weight` | `Float` | No | Weight in kilograms |
| `winRate` | `Float` | No | Win rate percentage |
| `winnerId` | `String` | No | Winner rikishi identifier |

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
| `endDate` | `String` | No | Date when rikishi stopped using this shikona |
| `rikishiId` | `String` | No | Identifier of the rikishi using this shikona |
| `shikona` | `String` | No | Ring name (shikona) |
| `startDate` | `String` | No | Date when rikishi started using this shikona |

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

