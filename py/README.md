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
    bashos = client.Basho().list()
    for basho in bashos:
        print(basho)
except Exception as err:
    print(f"list failed: {err}")
```

### 3. Load a basho

`load()` returns the bare record (a `dict`) and raises on error.

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
    bashos = client.Basho().list()
    print(bashos)
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

# Entity ops return the bare record and raise on error.
basho = client.Basho().list()
# basho contains the mock response record
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

Entity operations return the bare result data (a `dict` for single-entity
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
| `end_date` |  |
| `id` |  |
| `kimarite` |  |
| `match_number` |  |
| `month` |  |
| `rank` |  |
| `rikishi1_id` |  |
| `rikishi2_id` |  |
| `rikishi_id` |  |
| `shikona` |  |
| `side` |  |
| `start_date` |  |
| `venue` |  |
| `winner_id` |  |
| `year` |  |

Operations: List, Load.

API path: `/api/basho/{bashoId}/torikumi/{division}/{day}`

#### Kimarite

| Field | Description |
| --- | --- |
| `category` |  |
| `description` |  |
| `english_name` |  |
| `frequency` |  |
| `name` |  |

Operations: List, Load.

API path: `/api/kimarite`

#### Measurement

| Field | Description |
| --- | --- |
| `height` |  |
| `recorded_date` |  |
| `rikishi_id` |  |
| `weight` |  |

Operations: List.

API path: `/api/measurements`

#### Rank

| Field | Description |
| --- | --- |
| `division` |  |
| `id` |  |
| `level` |  |
| `name` |  |

Operations: List.

API path: `/api/ranks`

#### Rikishi

| Field | Description |
| --- | --- |
| `basho_id` |  |
| `birthdate` |  |
| `birthplace` |  |
| `championship` |  |
| `current_rank` |  |
| `day` |  |
| `debut` |  |
| `division` |  |
| `height` |  |
| `heya` |  |
| `highest_rank` |  |
| `id` |  |
| `kimarite` |  |
| `real_name` |  |
| `rikishi1_id` |  |
| `rikishi2_id` |  |
| `rikishi_id` |  |
| `shikona` |  |
| `total_loss` |  |
| `total_win` |  |
| `weight` |  |
| `win_rate` |  |
| `winner_id` |  |

Operations: List, Load.

API path: `/api/rikishi/{rikishiId}/matches`

#### Shikona

| Field | Description |
| --- | --- |
| `end_date` |  |
| `rikishi_id` |  |
| `shikona` |  |
| `start_date` |  |

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
| `end_date` | `str` |  |
| `id` | `str` |  |
| `kimarite` | `str` |  |
| `match_number` | `int` |  |
| `month` | `int` |  |
| `rank` | `str` |  |
| `rikishi1_id` | `str` |  |
| `rikishi2_id` | `str` |  |
| `rikishi_id` | `str` |  |
| `shikona` | `str` |  |
| `side` | `str` |  |
| `start_date` | `str` |  |
| `venue` | `str` |  |
| `winner_id` | `str` |  |
| `year` | `int` |  |

#### Example: Load

```python
basho = client.Basho().load({"id": "basho_id"})
```

#### Example: List

```python
bashos = client.Basho().list()
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
| `category` | `str` |  |
| `description` | `str` |  |
| `english_name` | `str` |  |
| `frequency` | `int` |  |
| `name` | `str` |  |

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
| `height` | `float` |  |
| `recorded_date` | `str` |  |
| `rikishi_id` | `str` |  |
| `weight` | `float` |  |

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
| `division` | `str` |  |
| `id` | `str` |  |
| `level` | `int` |  |
| `name` | `str` |  |

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
| `basho_id` | `str` |  |
| `birthdate` | `str` |  |
| `birthplace` | `str` |  |
| `championship` | `int` |  |
| `current_rank` | `str` |  |
| `day` | `int` |  |
| `debut` | `str` |  |
| `division` | `str` |  |
| `height` | `float` |  |
| `heya` | `str` |  |
| `highest_rank` | `str` |  |
| `id` | `str` |  |
| `kimarite` | `str` |  |
| `real_name` | `str` |  |
| `rikishi1_id` | `str` |  |
| `rikishi2_id` | `str` |  |
| `rikishi_id` | `str` |  |
| `shikona` | `str` |  |
| `total_loss` | `int` |  |
| `total_win` | `int` |  |
| `weight` | `float` |  |
| `win_rate` | `float` |  |
| `winner_id` | `str` |  |

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
| `end_date` | `str` |  |
| `rikishi_id` | `str` |  |
| `shikona` | `str` |  |
| `start_date` | `str` |  |

#### Example: List

```python
shikonas = client.Shikona().list()
```


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

- **TestFeature**: In-memory mock transport for testing without a live server

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
basho = client.Basho()
basho.list()

# basho.data_get() now returns the basho data from the last list
# basho.match_get() returns the last match criteria
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
