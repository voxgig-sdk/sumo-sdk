# Sumo Golang SDK



The Golang SDK for the Sumo API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/sumo-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/sumo-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/sumo-sdk/go=../sumo-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "fmt"
    sdk "github.com/voxgig-sdk/sumo-sdk/go"
)

func main() {
    client := sdk.New()

    // List basho records — the value is the array of records itself.
    bashos, err := client.Basho(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }
    for _, item := range bashos.([]any) {
        fmt.Println(item)
    }

    // Load a single basho — the value is the loaded record.
    basho, err := client.Basho(nil).Load(map[string]any{"id": "example_id"}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(basho)
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

basho, err := client.Basho(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(basho) // the loaded mock data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewSumoSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
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
cd go && go test ./test/...
```


## Reference

### NewSumoSDK

```go
func NewSumoSDK(options map[string]any) *SumoSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *SumoSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### SumoSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `Basho` | `(data map[string]any) SumoEntity` | Create a Basho entity instance. |
| `Kimarite` | `(data map[string]any) SumoEntity` | Create a Kimarite entity instance. |
| `Measurement` | `(data map[string]any) SumoEntity` | Create a Measurement entity instance. |
| `Rank` | `(data map[string]any) SumoEntity` | Create a Rank entity instance. |
| `Rikishi` | `(data map[string]any) SumoEntity` | Create a Rikishi entity instance. |
| `Shikona` | `(data map[string]any) SumoEntity` | Create a Shikona entity instance. |

### Entity interface (SumoEntity)

All entities implement the `SumoEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity. |
| `Update` | `(reqdata, ctrl map[string]any) (any, error)` | Update an existing entity. |
| `Remove` | `(reqmatch, ctrl map[string]any) (any, error)` | Remove an entity. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` / `Create` / `Update` / `Remove` | the entity record (`map[string]any`) |
| `List` | a `[]any` of entity records |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    basho, err := client.Basho(nil).Load(map[string]any{"id": "example_id"}, nil)
    if err != nil { /* handle */ }
    // basho is the loaded record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### Basho

| Field | Description |
| --- | --- |
| `"end_date"` |  |
| `"id"` |  |
| `"kimarite"` |  |
| `"match_number"` |  |
| `"month"` |  |
| `"rank"` |  |
| `"rikishi1_id"` |  |
| `"rikishi2_id"` |  |
| `"rikishi_id"` |  |
| `"shikona"` |  |
| `"side"` |  |
| `"start_date"` |  |
| `"venue"` |  |
| `"winner_id"` |  |
| `"year"` |  |

Operations: List, Load.

API path: `/api/basho/{bashoId}/torikumi/{division}/{day}`

#### Kimarite

| Field | Description |
| --- | --- |
| `"category"` |  |
| `"description"` |  |
| `"english_name"` |  |
| `"frequency"` |  |
| `"name"` |  |

Operations: List, Load.

API path: `/api/kimarite`

#### Measurement

| Field | Description |
| --- | --- |
| `"height"` |  |
| `"recorded_date"` |  |
| `"rikishi_id"` |  |
| `"weight"` |  |

Operations: List.

API path: `/api/measurements`

#### Rank

| Field | Description |
| --- | --- |
| `"division"` |  |
| `"id"` |  |
| `"level"` |  |
| `"name"` |  |

Operations: List.

API path: `/api/ranks`

#### Rikishi

| Field | Description |
| --- | --- |
| `"basho_id"` |  |
| `"birthdate"` |  |
| `"birthplace"` |  |
| `"championship"` |  |
| `"current_rank"` |  |
| `"day"` |  |
| `"debut"` |  |
| `"division"` |  |
| `"height"` |  |
| `"heya"` |  |
| `"highest_rank"` |  |
| `"id"` |  |
| `"kimarite"` |  |
| `"real_name"` |  |
| `"rikishi1_id"` |  |
| `"rikishi2_id"` |  |
| `"rikishi_id"` |  |
| `"shikona"` |  |
| `"total_loss"` |  |
| `"total_win"` |  |
| `"weight"` |  |
| `"win_rate"` |  |
| `"winner_id"` |  |

Operations: List, Load.

API path: `/api/rikishi/{rikishiId}/matches`

#### Shikona

| Field | Description |
| --- | --- |
| `"end_date"` |  |
| `"rikishi_id"` |  |
| `"shikona"` |  |
| `"start_date"` |  |

Operations: List.

API path: `/api/shikonas`



## Entities


### Basho

Create an instance: `basho := client.Basho(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `end_date` | ``$STRING`` |  |
| `id` | ``$STRING`` |  |
| `kimarite` | ``$STRING`` |  |
| `match_number` | ``$INTEGER`` |  |
| `month` | ``$INTEGER`` |  |
| `rank` | ``$STRING`` |  |
| `rikishi1_id` | ``$STRING`` |  |
| `rikishi2_id` | ``$STRING`` |  |
| `rikishi_id` | ``$STRING`` |  |
| `shikona` | ``$STRING`` |  |
| `side` | ``$STRING`` |  |
| `start_date` | ``$STRING`` |  |
| `venue` | ``$STRING`` |  |
| `winner_id` | ``$STRING`` |  |
| `year` | ``$INTEGER`` |  |

#### Example: Load

```go
basho, err := client.Basho(nil).Load(map[string]any{"id": "basho_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(basho) // the loaded record
```

#### Example: List

```go
bashos, err := client.Basho(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(bashos) // the array of records
```


### Kimarite

Create an instance: `kimarite := client.Kimarite(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `category` | ``$STRING`` |  |
| `description` | ``$STRING`` |  |
| `english_name` | ``$STRING`` |  |
| `frequency` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |

#### Example: Load

```go
kimarite, err := client.Kimarite(nil).Load(map[string]any{"id": "kimarite_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(kimarite) // the loaded record
```

#### Example: List

```go
kimarites, err := client.Kimarite(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(kimarites) // the array of records
```


### Measurement

Create an instance: `measurement := client.Measurement(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `height` | ``$NUMBER`` |  |
| `recorded_date` | ``$STRING`` |  |
| `rikishi_id` | ``$STRING`` |  |
| `weight` | ``$NUMBER`` |  |

#### Example: List

```go
measurements, err := client.Measurement(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(measurements) // the array of records
```


### Rank

Create an instance: `rank := client.Rank(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `division` | ``$STRING`` |  |
| `id` | ``$STRING`` |  |
| `level` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |

#### Example: List

```go
ranks, err := client.Rank(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(ranks) // the array of records
```


### Rikishi

Create an instance: `rikishi := client.Rikishi(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `basho_id` | ``$STRING`` |  |
| `birthdate` | ``$STRING`` |  |
| `birthplace` | ``$STRING`` |  |
| `championship` | ``$INTEGER`` |  |
| `current_rank` | ``$STRING`` |  |
| `day` | ``$INTEGER`` |  |
| `debut` | ``$STRING`` |  |
| `division` | ``$STRING`` |  |
| `height` | ``$NUMBER`` |  |
| `heya` | ``$STRING`` |  |
| `highest_rank` | ``$STRING`` |  |
| `id` | ``$STRING`` |  |
| `kimarite` | ``$STRING`` |  |
| `real_name` | ``$STRING`` |  |
| `rikishi1_id` | ``$STRING`` |  |
| `rikishi2_id` | ``$STRING`` |  |
| `rikishi_id` | ``$STRING`` |  |
| `shikona` | ``$STRING`` |  |
| `total_loss` | ``$INTEGER`` |  |
| `total_win` | ``$INTEGER`` |  |
| `weight` | ``$NUMBER`` |  |
| `win_rate` | ``$NUMBER`` |  |
| `winner_id` | ``$STRING`` |  |

#### Example: Load

```go
rikishi, err := client.Rikishi(nil).Load(map[string]any{"id": "rikishi_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(rikishi) // the loaded record
```

#### Example: List

```go
rikishis, err := client.Rikishi(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(rikishis) // the array of records
```


### Shikona

Create an instance: `shikona := client.Shikona(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `end_date` | ``$STRING`` |  |
| `rikishi_id` | ``$STRING`` |  |
| `shikona` | ``$STRING`` |  |
| `start_date` | ``$STRING`` |  |

#### Example: List

```go
shikonas, err := client.Shikona(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(shikonas) // the array of records
```


## Explanation

### The operation pipeline

Every entity operation (load, list, create, update, remove) follows a
six-stage pipeline. Each stage fires a feature hook before executing:

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

If any stage returns an error, the pipeline short-circuits and the
error is returned to the caller. An unexpected panic triggers the
`PreUnexpected` hook.

### Features and hooks

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/sumo-sdk/go/
├── sumo.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/sumo-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `Load`, the entity
stores the returned data and match criteria internally.

```go
basho := client.Basho(nil)
basho.Load(map[string]any{"id": "example_id"}, nil)

// basho.Data() now returns the loaded basho data
// basho.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
