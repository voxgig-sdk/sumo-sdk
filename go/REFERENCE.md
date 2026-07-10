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
| `end_date` | `string` | No |  |
| `id` | `string` | No |  |
| `kimarite` | `string` | No |  |
| `match_number` | `int` | No |  |
| `month` | `int` | No |  |
| `rank` | `string` | No |  |
| `rikishi1_id` | `string` | No |  |
| `rikishi2_id` | `string` | No |  |
| `rikishi_id` | `string` | No |  |
| `shikona` | `string` | No |  |
| `side` | `string` | No |  |
| `start_date` | `string` | No |  |
| `venue` | `string` | No |  |
| `winner_id` | `string` | No |  |
| `year` | `int` | No |  |

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
| `category` | `string` | No |  |
| `description` | `string` | No |  |
| `english_name` | `string` | No |  |
| `frequency` | `int` | No |  |
| `name` | `string` | No |  |

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
| `height` | `float64` | No |  |
| `recorded_date` | `string` | No |  |
| `rikishi_id` | `string` | No |  |
| `weight` | `float64` | No |  |

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
| `division` | `string` | No |  |
| `id` | `string` | No |  |
| `level` | `int` | No |  |
| `name` | `string` | No |  |

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
| `basho_id` | `string` | No |  |
| `birthdate` | `string` | No |  |
| `birthplace` | `string` | No |  |
| `championship` | `int` | No |  |
| `current_rank` | `string` | No |  |
| `day` | `int` | No |  |
| `debut` | `string` | No |  |
| `division` | `string` | No |  |
| `height` | `float64` | No |  |
| `heya` | `string` | No |  |
| `highest_rank` | `string` | No |  |
| `id` | `string` | No |  |
| `kimarite` | `string` | No |  |
| `real_name` | `string` | No |  |
| `rikishi1_id` | `string` | No |  |
| `rikishi2_id` | `string` | No |  |
| `rikishi_id` | `string` | No |  |
| `shikona` | `string` | No |  |
| `total_loss` | `int` | No |  |
| `total_win` | `int` | No |  |
| `weight` | `float64` | No |  |
| `win_rate` | `float64` | No |  |
| `winner_id` | `string` | No |  |

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
| `end_date` | `string` | No |  |
| `rikishi_id` | `string` | No |  |
| `shikona` | `string` | No |  |
| `start_date` | `string` | No |  |

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

