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
| `category` | `string` | No | Category of the technique |
| `description` | `string` | No | Detailed description of the technique |
| `englishName` | `string` | No | English translation of the technique name |
| `frequency` | `int` | No | Number of times this technique has been used |
| `id` | `string` | No |  |
| `name` | `string` | No | Name of the kimarite technique |

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
| `height` | `float` | No | Height in centimeters |
| `recordedDate` | `string` | No | Date when measurement was recorded |
| `rikishiId` | `string` | No | Unique identifier for the rikishi |
| `weight` | `float` | No | Weight in kilograms |

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
| `division` | `string` | No | Division the rank belongs to |
| `id` | `string` | No | Unique identifier for the rank |
| `level` | `int` | No | Hierarchical level of the rank |
| `name` | `string` | No | Name of the rank |

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
| `bashoId` | `string` | No | Identifier of the basho where match took place |
| `birthdate` | `string` | No | Date of birth |
| `birthplace` | `string` | No | Birthplace of the rikishi |
| `championships` | `int` | No | Number of championships won |
| `currentRank` | `string` | No | Current rank of the rikishi |
| `day` | `int` | No | Day of the tournament |
| `debut` | `string` | No | Debut date or basho |
| `division` | `string` | No | Division of the match |
| `height` | `float` | No | Height in centimeters |
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
| `weight` | `float` | No | Weight in kilograms |
| `winRate` | `float` | No | Win rate percentage |
| `winnerId` | `string` | No | Winner rikishi identifier |

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
| `endDate` | `string` | No | Date when rikishi stopped using this shikona |
| `rikishiId` | `string` | No | Identifier of the rikishi using this shikona |
| `shikona` | `string` | No | Ring name (shikona) |
| `startDate` | `string` | No | Date when rikishi started using this shikona |

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
| `ratelimit` | 0.0.1 | Client-side rate limiting via a token bucket |
| `retry` | 0.0.1 | Automatic retry of transient failures with exponential backoff |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |
| `timeout` | 0.0.1 | Per-request timeout with transport abort |


Features are activated via the `feature` option:

```php
$client = new SumoSDK([
  "feature" => [
    "ratelimit" => ["active" => true],
    "retry" => ["active" => true],
    "test" => ["active" => true],
    "timeout" => ["active" => true],
  ],
]);
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### Ordering

`ratelimit`, `retry`, `timeout` wrap the transport. Each
wraps whatever is already installed, so **activation order is nesting order**:
a feature activated later sits OUTSIDE one activated earlier, and sees the call
first.

That decides behaviour, not just sequence: a feature that short-circuits the
call, such as a cache serving a hit, stops every feature nested inside it from
ever seeing that call.

`test` attach to pipeline hooks
rather than the transport, so their order does not affect what they observe.

#### `ratelimit`

Client-side rate limiting via a token bucket.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

| Option | Type |
|---|---|
| `now` | function |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.ratelimit.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `retry`

Automatic retry of transient failures with exponential backoff.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

| Option | Type |
|---|---|
| `jitter` | boolean |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.retry.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `test`

In-memory mock transport for testing without a live server.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

#### `timeout`

Per-request timeout with transport abort.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

| Option | Type |
|---|---|
| `clearTimer` | function |
| `setTimer` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.timeout.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

