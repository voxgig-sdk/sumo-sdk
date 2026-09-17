# Sumo Python SDK



The Python SDK for the Sumo API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Basho()` — each
carrying a small, uniform set of operations (`list`, `load`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/sumo-sdk/releases)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
from sumo_sdk import SumoSDK

client = SumoSDK()
```

### 2. List basho records

`list()` returns a `list` of records (each a `dict`) and raises on
error — iterate it directly.

```python
try:
    bashos = client.Basho().list({"basho_id": "example", "day": 1, "division": "example"})
    for basho in bashos:
        print(basho)
except Exception as err:
    print(f"list failed: {err}")
```

### 3. Load a basho

`load()` returns the ENTITY — call data_get() for the record — and raises on error.

```python
try:
    basho = client.Basho().load({"id": "example_id"})
    print(basho)
except Exception as err:
    print(f"load failed: {err}")
```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    shikonas = client.Shikona().list()
    print(shikonas)
except Exception as err:
    print(f"list failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = SumoSDK.test()

# Entity ops return the ENTITY and raises on error;
# call data_get() for the record.
shikona = client.Shikona().list()
# shikona contains the mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = SumoSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
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
cd py && pytest test/
```


## Reference

### SumoSDK

```python
from sumo_sdk import SumoSDK

client = SumoSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = SumoSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### SumoSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
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
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (a `dict` for single-entity
ops, a `list` for `list`) and raise on error. Wrap calls in
`try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

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
| `currentRank` | Current rank of the rikishi |
| `day` | Day of the tournament |
| `debut` | Debut date or basho |
| `division` | Division of the match |
| `height` | Height in centimeters |
| `heya` | Stable (heya) the rikishi belongs to |
| `id` | Unique identifier for the match |
| `kimarite` | Winning technique used |
| `realName` | Real name of the rikishi |
| `rikishi1Id` | First rikishi identifier |
| `rikishi2Id` | Second rikishi identifier |
| `shikona` | Ring name of the rikishi |
| `weight` | Weight in kilograms |
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

Create an instance: `basho = client.Basho()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `endDate` | `str` | End date of the tournament |
| `id` | `str` | Unique identifier for the basho |
| `kimarite` | `str` | Winning technique used (if match completed) |
| `matchNumber` | `int` | Match number in the day's schedule |
| `month` | `int` | Month of the tournament |
| `rank` | `str` | Rank in the banzuke |
| `rikishi1Id` | `str` | First rikishi identifier |
| `rikishi2Id` | `str` | Second rikishi identifier |
| `rikishiId` | `str` | Unique identifier for the rikishi |
| `shikona` | `str` | Ring name of the rikishi |
| `side` | `str` | Side of the banzuke (east or west) |
| `startDate` | `str` | Start date of the tournament |
| `venue` | `str` | Tournament venue |
| `winnerId` | `str` | Winner rikishi identifier (if match completed) |
| `year` | `int` | Year of the tournament |

#### Example: Load

```python
basho = client.Basho().load({"id": "basho_id"})
```

#### Example: List

```python
bashos = client.Basho().list({"basho_id": "example", "day": 1, "division": "example"})
```


### Kimarite

Create an instance: `kimarite = client.Kimarite()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `category` | `str` | Category of the technique |
| `description` | `str` | Detailed description of the technique |
| `englishName` | `str` | English translation of the technique name |
| `frequency` | `int` | Number of times this technique has been used |
| `id` | `str` |  |
| `name` | `str` | Name of the kimarite technique |

#### Example: Load

```python
kimarite = client.Kimarite().load({"id": "kimarite_id"})
```

#### Example: List

```python
kimarites = client.Kimarite().list()
```


### Measurement

Create an instance: `measurement = client.Measurement()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `height` | `float` | Height in centimeters |
| `recordedDate` | `str` | Date when measurement was recorded |
| `rikishiId` | `str` | Unique identifier for the rikishi |
| `weight` | `float` | Weight in kilograms |

#### Example: List

```python
measurements = client.Measurement().list()
```


### Rank

Create an instance: `rank = client.Rank()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `division` | `str` | Division the rank belongs to |
| `id` | `str` | Unique identifier for the rank |
| `level` | `int` | Hierarchical level of the rank |
| `name` | `str` | Name of the rank |

#### Example: List

```python
ranks = client.Rank().list()
```


### Rikishi

Create an instance: `rikishi = client.Rikishi()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bashoId` | `str` | Identifier of the basho where match took place |
| `birthdate` | `str` | Date of birth |
| `birthplace` | `str` | Birthplace of the rikishi |
| `currentRank` | `str` | Current rank of the rikishi |
| `day` | `int` | Day of the tournament |
| `debut` | `str` | Debut date or basho |
| `division` | `str` | Division of the match |
| `height` | `float` | Height in centimeters |
| `heya` | `str` | Stable (heya) the rikishi belongs to |
| `id` | `str` | Unique identifier for the match |
| `kimarite` | `str` | Winning technique used |
| `realName` | `str` | Real name of the rikishi |
| `rikishi1Id` | `str` | First rikishi identifier |
| `rikishi2Id` | `str` | Second rikishi identifier |
| `shikona` | `str` | Ring name of the rikishi |
| `weight` | `float` | Weight in kilograms |
| `winnerId` | `str` | Winner rikishi identifier |

#### Example: Load

```python
rikishi = client.Rikishi().load({"id": "rikishi_id"})
```

#### Example: List

```python
rikishis = client.Rikishi().list()
```


### Shikona

Create an instance: `shikona = client.Shikona()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `endDate` | `str` | Date when rikishi stopped using this shikona |
| `rikishiId` | `str` | Identifier of the rikishi using this shikona |
| `shikona` | `str` | Ring name (shikona) |
| `startDate` | `str` | Date when rikishi started using this shikona |

#### Example: List

```python
shikonas = client.Shikona().list()
```

## Features

This SDK ships 4 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`ratelimit`](#ratelimit) | Client-side rate limiting via a token bucket |
| [`retry`](#retry) | Automatic retry of transient failures with exponential backoff |
| [`test`](#test) | In-memory mock transport for testing without a live server |
| [`timeout`](#timeout) | Per-request timeout with transport abort |

> **Order matters for `ratelimit`, `retry`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### ratelimit

Client-side rate limiting via a token bucket.

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

Set `feature.ratelimit.active` to enable it, then override any of the options above.

`ratelimit` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### retry

Automatic retry of transient failures with exponential backoff.

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

Set `feature.retry.active` to enable it, then override any of the options above.

`retry` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### test

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Per-request timeout with transport abort.

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

Set `feature.timeout.active` to enable it, then override any of the options above.

`timeout` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.


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

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Client-side rate limiting via a token bucket
- **RetryFeature**: Automatic retry of transient failures with exponential backoff
- **TestFeature**: In-memory mock transport for testing without a live server
- **TimeoutFeature**: Per-request timeout with transport abort

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── sumo_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── schema.py                    -- Generated option + entity specs
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`sumo_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```python
shikona = client.Shikona()
shikona.list()

# shikona.data_get() now returns the shikona data from the last list
# shikona.match_get() returns the last match criteria
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
