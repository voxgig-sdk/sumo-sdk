# Sumo PHP SDK



The PHP SDK for the Sumo API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->Basho()` — with named operations (`list`/`load`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/sumo-sdk/releases](https://github.com/voxgig-sdk/sumo-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'sumo_sdk.php';

$client = new SumoSDK();
```

### 2. List basho records

```php
try {
    // list() returns an array of Basho records — iterate directly.
    $bashos = $client->Basho()->list();
    foreach ($bashos as $item) {
        echo $item["id"] . " " . $item["endDate"] . "\n";
    }
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

### 3. Load a basho

```php
try {
    // load() returns the ENTITY — call data_get() for the Basho record (throws on error).
    $basho = $client->Basho()->load(["id" => "example_id"]);
    print_r($basho);
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $shikonas = $client->Shikona()->list();
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required:

```php
$client = SumoSDK::test();

// Entity ops return the ENTITY (throws on error);
// call data_get() for the mock record.
$shikona = $client->Shikona()->list();
print_r($shikona);
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new SumoSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
SUMO_TEST_LIVE=TRUE
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### SumoSDK

```php
require_once 'sumo_sdk.php';
$client = new SumoSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = SumoSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### SumoSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `Basho` | `($data): BashoEntity` | Create a Basho entity instance. |
| `Kimarite` | `($data): KimariteEntity` | Create a Kimarite entity instance. |
| `Measurement` | `($data): MeasurementEntity` | Create a Measurement entity instance. |
| `Rank` | `($data): RankEntity` | Create a Rank entity instance. |
| `Rikishi` | `($data): RikishiEntity` | Create a Rikishi entity instance. |
| `Shikona` | `($data): ShikonaEntity` | Create a Shikona entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `list` | `(?array $reqmatch = null, $ctrl): array` | List entities matching the criteria (call with no argument to list all). |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

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
| `championships` | Number of championships won |
| `currentRank` | Current rank of the rikishi |
| `day` | Day of the tournament |
| `debut` | Debut date or basho |
| `division` | Division of the match |
| `height` | Height in centimeters |
| `heya` | Stable (heya) the rikishi belongs to |
| `highestRank` | Highest rank achieved |
| `id` | Unique identifier for the match |
| `kimarite` | Winning technique used |
| `realName` | Real name of the rikishi |
| `rikishi1Id` | First rikishi identifier |
| `rikishi2Id` | Second rikishi identifier |
| `rikishiId` | Unique identifier for the rikishi |
| `shikona` | Ring name of the rikishi |
| `totalLosses` | Total number of losses |
| `totalWins` | Total number of wins |
| `weight` | Weight in kilograms |
| `winRate` | Win rate percentage |
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

Create an instance: `$basho = $client->Basho();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `endDate` | `string` | End date of the tournament |
| `id` | `string` | Unique identifier for the basho |
| `kimarite` | `string` | Winning technique used (if match completed) |
| `matchNumber` | `int` | Match number in the day's schedule |
| `month` | `int` | Month of the tournament |
| `rank` | `string` | Rank in the banzuke |
| `rikishi1Id` | `string` | First rikishi identifier |
| `rikishi2Id` | `string` | Second rikishi identifier |
| `rikishiId` | `string` | Unique identifier for the rikishi |
| `shikona` | `string` | Ring name of the rikishi |
| `side` | `string` | Side of the banzuke (east or west) |
| `startDate` | `string` | Start date of the tournament |
| `venue` | `string` | Tournament venue |
| `winnerId` | `string` | Winner rikishi identifier (if match completed) |
| `year` | `int` | Year of the tournament |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Basho record (throws on error).
$basho = $client->Basho()->load(["id" => "basho_id"]);
```

#### Example: List

```php
// list() returns an array of Basho records (throws on error).
$bashos = $client->Basho()->list();
```


### Kimarite

Create an instance: `$kimarite = $client->Kimarite();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `category` | `string` | Category of the technique |
| `description` | `string` | Detailed description of the technique |
| `englishName` | `string` | English translation of the technique name |
| `frequency` | `int` | Number of times this technique has been used |
| `id` | `string` |  |
| `name` | `string` | Name of the kimarite technique |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Kimarite record (throws on error).
$kimarite = $client->Kimarite()->load(["id" => "kimarite_id"]);
```

#### Example: List

```php
// list() returns an array of Kimarite records (throws on error).
$kimarites = $client->Kimarite()->list();
```


### Measurement

Create an instance: `$measurement = $client->Measurement();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `height` | `float` | Height in centimeters |
| `recordedDate` | `string` | Date when measurement was recorded |
| `rikishiId` | `string` | Unique identifier for the rikishi |
| `weight` | `float` | Weight in kilograms |

#### Example: List

```php
// list() returns an array of Measurement records (throws on error).
$measurements = $client->Measurement()->list();
```


### Rank

Create an instance: `$rank = $client->Rank();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `division` | `string` | Division the rank belongs to |
| `id` | `string` | Unique identifier for the rank |
| `level` | `int` | Hierarchical level of the rank |
| `name` | `string` | Name of the rank |

#### Example: List

```php
// list() returns an array of Rank records (throws on error).
$ranks = $client->Rank()->list();
```


### Rikishi

Create an instance: `$rikishi = $client->Rikishi();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bashoId` | `string` | Identifier of the basho where match took place |
| `birthdate` | `string` | Date of birth |
| `birthplace` | `string` | Birthplace of the rikishi |
| `championships` | `int` | Number of championships won |
| `currentRank` | `string` | Current rank of the rikishi |
| `day` | `int` | Day of the tournament |
| `debut` | `string` | Debut date or basho |
| `division` | `string` | Division of the match |
| `height` | `float` | Height in centimeters |
| `heya` | `string` | Stable (heya) the rikishi belongs to |
| `highestRank` | `string` | Highest rank achieved |
| `id` | `string` | Unique identifier for the match |
| `kimarite` | `string` | Winning technique used |
| `realName` | `string` | Real name of the rikishi |
| `rikishi1Id` | `string` | First rikishi identifier |
| `rikishi2Id` | `string` | Second rikishi identifier |
| `rikishiId` | `string` | Unique identifier for the rikishi |
| `shikona` | `string` | Ring name of the rikishi |
| `totalLosses` | `int` | Total number of losses |
| `totalWins` | `int` | Total number of wins |
| `weight` | `float` | Weight in kilograms |
| `winRate` | `float` | Win rate percentage |
| `winnerId` | `string` | Winner rikishi identifier |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Rikishi record (throws on error).
$rikishi = $client->Rikishi()->load(["id" => "rikishi_id"]);
```

#### Example: List

```php
// list() returns an array of Rikishi records (throws on error).
$rikishis = $client->Rikishi()->list();
```


### Shikona

Create an instance: `$shikona = $client->Shikona();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `endDate` | `string` | Date when rikishi stopped using this shikona |
| `rikishiId` | `string` | Identifier of the rikishi using this shikona |
| `shikona` | `string` | Ring name (shikona) |
| `startDate` | `string` | Date when rikishi started using this shikona |

#### Example: List

```php
// list() returns an array of Shikona records (throws on error).
$shikonas = $client->Shikona()->list();
```

## Features

This SDK ships 1 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`test`](#test) | In-memory mock transport for testing without a live server |

### test

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.


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

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── sumo_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`sumo_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```php
$shikona = $client->Shikona();
$shikona->list();

// $shikona->data_get() now returns the shikona data from the last list
// $shikona->match_get() returns the last match criteria
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
