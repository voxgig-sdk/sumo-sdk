# Sumo PHP SDK Reference

Complete API reference for the Sumo PHP SDK.


## SumoSDK

### Constructor

```php
require_once __DIR__ . '/sumo_sdk.php';

$client = new SumoSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `SumoSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = SumoSDK::test();
```


### Instance Methods

#### `Basho($data = null)`

Create a new `BashoEntity` instance. Pass `null` for no initial data.

#### `Kimarite($data = null)`

Create a new `KimariteEntity` instance. Pass `null` for no initial data.

#### `Measurement($data = null)`

Create a new `MeasurementEntity` instance. Pass `null` for no initial data.

#### `Rank($data = null)`

Create a new `RankEntity` instance. Pass `null` for no initial data.

#### `Rikishi($data = null)`

Create a new `RikishiEntity` instance. Pass `null` for no initial data.

#### `Shikona($data = null)`

Create a new `ShikonaEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): SumoUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## BashoEntity

```php
$basho = $client->Basho();
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

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Basho()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Basho()->load(["id" => "basho_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): BashoEntity`

Create a new `BashoEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## KimariteEntity

```php
$kimarite = $client->Kimarite();
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

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Kimarite()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Kimarite()->load(["id" => "kimarite_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): KimariteEntity`

Create a new `KimariteEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## MeasurementEntity

```php
$measurement = $client->Measurement();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `height` | `float` | No |  |
| `recorded_date` | `string` | No |  |
| `rikishi_id` | `string` | No |  |
| `weight` | `float` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Measurement()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): MeasurementEntity`

Create a new `MeasurementEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## RankEntity

```php
$rank = $client->Rank();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `division` | `string` | No |  |
| `id` | `string` | No |  |
| `level` | `int` | No |  |
| `name` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Rank()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): RankEntity`

Create a new `RankEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## RikishiEntity

```php
$rikishi = $client->Rikishi();
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
| `height` | `float` | No |  |
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
| `weight` | `float` | No |  |
| `win_rate` | `float` | No |  |
| `winner_id` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Rikishi()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Rikishi()->load(["id" => "rikishi_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): RikishiEntity`

Create a new `RikishiEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ShikonaEntity

```php
$shikona = $client->Shikona();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `end_date` | `string` | No |  |
| `rikishi_id` | `string` | No |  |
| `shikona` | `string` | No |  |
| `start_date` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Shikona()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ShikonaEntity`

Create a new `ShikonaEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new SumoSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

