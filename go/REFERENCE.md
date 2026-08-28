# Sumo Golang SDK Reference

Complete API reference for the Sumo Golang SDK.


## SumoSDK

### Constructor

```go
func NewSumoSDK(options map[string]any) *SumoSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *SumoSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *SumoSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `Basho(data map[string]any) SumoEntity`

Create a new `Basho` entity instance. Pass `nil` for no initial data.

#### `Kimarite(data map[string]any) SumoEntity`

Create a new `Kimarite` entity instance. Pass `nil` for no initial data.

#### `Measurement(data map[string]any) SumoEntity`

Create a new `Measurement` entity instance. Pass `nil` for no initial data.

#### `Rank(data map[string]any) SumoEntity`

Create a new `Rank` entity instance. Pass `nil` for no initial data.

#### `Rikishi(data map[string]any) SumoEntity`

Create a new `Rikishi` entity instance. Pass `nil` for no initial data.

#### `Shikona(data map[string]any) SumoEntity`

Create a new `Shikona` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## BashoEntity

```go
basho := client.Basho(nil)
fmt.Println(basho.GetName()) // "basho"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `endDate` | `string` | No | End date of the tournament |
| `id` | `string` | No | Unique identifier for the basho |
| `kimarite` | `string` | No | Winning technique used (if match completed) |
| `matchNumber` | `int` | No | Match number in the day's schedule |
| `month` | `int` | No | Month of the tournament |
| `rank` | `string` | No | Rank in the banzuke |
| `rikishi1Id` | `string` | No | First rikishi identifier |
| `rikishi2Id` | `string` | No | Second rikishi identifier |
| `rikishiId` | `string` | No | Unique identifier for the rikishi |
| `shikona` | `string` | No | Ring name of the rikishi |
| `side` | `string` | No | Side of the banzuke (east or west) |
| `startDate` | `string` | No | Start date of the tournament |
| `venue` | `string` | No | Tournament venue |
| `winnerId` | `string` | No | Winner rikishi identifier (if match completed) |
| `year` | `int` | No | Year of the tournament |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Basho(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Basho(nil).Load(map[string]any{"id": "basho_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `BashoEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## KimariteEntity

```go
kimarite := client.Kimarite(nil)
fmt.Println(kimarite.GetName()) // "kimarite"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `category` | `string` | No | Category of the technique |
| `description` | `string` | No | Detailed description of the technique |
| `englishName` | `string` | No | English translation of the technique name |
| `frequency` | `int` | No | Number of times this technique has been used |
| `id` | `string` | No |  |
| `name` | `string` | No | Name of the kimarite technique |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Kimarite(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Kimarite(nil).Load(map[string]any{"id": "kimarite_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `KimariteEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## MeasurementEntity

```go
measurement := client.Measurement(nil)
fmt.Println(measurement.GetName()) // "measurement"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `height` | `float64` | No | Height in centimeters |
| `recordedDate` | `string` | No | Date when measurement was recorded |
| `rikishiId` | `string` | No | Unique identifier for the rikishi |
| `weight` | `float64` | No | Weight in kilograms |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Measurement(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `MeasurementEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## RankEntity

```go
rank := client.Rank(nil)
fmt.Println(rank.GetName()) // "rank"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `division` | `string` | No | Division the rank belongs to |
| `id` | `string` | No | Unique identifier for the rank |
| `level` | `int` | No | Hierarchical level of the rank |
| `name` | `string` | No | Name of the rank |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Rank(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `RankEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## RikishiEntity

```go
rikishi := client.Rikishi(nil)
fmt.Println(rikishi.GetName()) // "rikishi"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bashoId` | `string` | No | Identifier of the basho where match took place |
| `birthdate` | `string` | No | Date of birth |
| `birthplace` | `string` | No | Birthplace of the rikishi |
| `championships` | `int` | No | Number of championships won |
| `currentRank` | `string` | No | Current rank of the rikishi |
| `day` | `int` | No | Day of the tournament |
| `debut` | `string` | No | Debut date or basho |
| `division` | `string` | No | Division of the match |
| `height` | `float64` | No | Height in centimeters |
| `heya` | `string` | No | Stable (heya) the rikishi belongs to |
| `highestRank` | `string` | No | Highest rank achieved |
| `id` | `string` | No | Unique identifier for the match |
| `kimarite` | `string` | No | Winning technique used |
| `realName` | `string` | No | Real name of the rikishi |
| `rikishi1Id` | `string` | No | First rikishi identifier |
| `rikishi2Id` | `string` | No | Second rikishi identifier |
| `rikishiId` | `string` | No | Unique identifier for the rikishi |
| `shikona` | `string` | No | Ring name of the rikishi |
| `totalLosses` | `int` | No | Total number of losses |
| `totalWins` | `int` | No | Total number of wins |
| `weight` | `float64` | No | Weight in kilograms |
| `winRate` | `float64` | No | Win rate percentage |
| `winnerId` | `string` | No | Winner rikishi identifier |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Rikishi(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Rikishi(nil).Load(map[string]any{"id": "rikishi_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `RikishiEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ShikonaEntity

```go
shikona := client.Shikona(nil)
fmt.Println(shikona.GetName()) // "shikona"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `endDate` | `string` | No | Date when rikishi stopped using this shikona |
| `rikishiId` | `string` | No | Identifier of the rikishi using this shikona |
| `shikona` | `string` | No | Ring name (shikona) |
| `startDate` | `string` | No | Date when rikishi started using this shikona |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Shikona(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ShikonaEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewSumoSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
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

