# Sumo Python SDK Reference

Complete API reference for the Sumo Python SDK.


## SumoSDK

### Constructor

```python
from sumo_sdk import SumoSDK

client = SumoSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `SumoSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = SumoSDK.test()
```


### Instance Methods

#### `Basho(data=None)`

Create a new `BashoEntity` instance. Pass `None` for no initial data.

#### `Kimarite(data=None)`

Create a new `KimariteEntity` instance. Pass `None` for no initial data.

#### `Measurement(data=None)`

Create a new `MeasurementEntity` instance. Pass `None` for no initial data.

#### `Rank(data=None)`

Create a new `RankEntity` instance. Pass `None` for no initial data.

#### `Rikishi(data=None)`

Create a new `RikishiEntity` instance. Pass `None` for no initial data.

#### `Shikona(data=None)`

Create a new `ShikonaEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## BashoEntity

```python
basho = client.Basho()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `endDate` | `str` | No |  |
| `id` | `str` | No |  |
| `kimarite` | `str` | No |  |
| `matchNumber` | `int` | No |  |
| `month` | `int` | No |  |
| `rank` | `str` | No |  |
| `rikishi1Id` | `str` | No |  |
| `rikishi2Id` | `str` | No |  |
| `rikishiId` | `str` | No |  |
| `shikona` | `str` | No |  |
| `side` | `str` | No |  |
| `startDate` | `str` | No |  |
| `venue` | `str` | No |  |
| `winnerId` | `str` | No |  |
| `year` | `int` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Basho().list({"basho_id": "example", "day": 1, "division": "example"})
for basho in results:
    print(basho)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Basho().load({"id": "basho_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BashoEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## KimariteEntity

```python
kimarite = client.Kimarite()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `category` | `str` | No |  |
| `description` | `str` | No |  |
| `englishName` | `str` | No |  |
| `frequency` | `int` | No |  |
| `name` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Kimarite().list()
for kimarite in results:
    print(kimarite)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Kimarite().load({"id": "kimarite_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `KimariteEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## MeasurementEntity

```python
measurement = client.Measurement()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `height` | `float` | No |  |
| `recordedDate` | `str` | No |  |
| `rikishiId` | `str` | No |  |
| `weight` | `float` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Measurement().list()
for measurement in results:
    print(measurement)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MeasurementEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## RankEntity

```python
rank = client.Rank()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `division` | `str` | No |  |
| `id` | `str` | No |  |
| `level` | `int` | No |  |
| `name` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Rank().list()
for rank in results:
    print(rank)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RankEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## RikishiEntity

```python
rikishi = client.Rikishi()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bashoId` | `str` | No |  |
| `birthdate` | `str` | No |  |
| `birthplace` | `str` | No |  |
| `championships` | `int` | No |  |
| `currentRank` | `str` | No |  |
| `day` | `int` | No |  |
| `debut` | `str` | No |  |
| `division` | `str` | No |  |
| `height` | `float` | No |  |
| `heya` | `str` | No |  |
| `highestRank` | `str` | No |  |
| `id` | `str` | No |  |
| `kimarite` | `str` | No |  |
| `realName` | `str` | No |  |
| `rikishi1Id` | `str` | No |  |
| `rikishi2Id` | `str` | No |  |
| `rikishiId` | `str` | No |  |
| `shikona` | `str` | No |  |
| `totalLosses` | `int` | No |  |
| `totalWins` | `int` | No |  |
| `weight` | `float` | No |  |
| `winRate` | `float` | No |  |
| `winnerId` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Rikishi().list()
for rikishi in results:
    print(rikishi)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Rikishi().load({"id": "rikishi_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RikishiEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ShikonaEntity

```python
shikona = client.Shikona()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `endDate` | `str` | No |  |
| `rikishiId` | `str` | No |  |
| `shikona` | `str` | No |  |
| `startDate` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Shikona().list()
for shikona in results:
    print(shikona)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ShikonaEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = SumoSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

