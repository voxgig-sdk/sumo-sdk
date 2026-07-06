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
        echo $item["id"] . " " . $item["end_date"] . "\n";
    }
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

### 3. Load a basho

```php
try {
    // load() returns the bare Basho record (throws on error).
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
    $bashos = $client->Basho()->list();
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

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```php
$client = SumoSDK::test([
    "entity" => ["basho" => ["test01" => ["id" => "test01"]]],
]);

// Entity ops return the bare mock record (throws on error).
$basho = $client->Basho()->list();
print_r($basho);
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

Entity operations return the bare result data (an `array` for single-entity
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

Create an instance: `$basho = $client->Basho();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `end_date` | `string` |  |
| `id` | `string` |  |
| `kimarite` | `string` |  |
| `match_number` | `int` |  |
| `month` | `int` |  |
| `rank` | `string` |  |
| `rikishi1_id` | `string` |  |
| `rikishi2_id` | `string` |  |
| `rikishi_id` | `string` |  |
| `shikona` | `string` |  |
| `side` | `string` |  |
| `start_date` | `string` |  |
| `venue` | `string` |  |
| `winner_id` | `string` |  |
| `year` | `int` |  |

#### Example: Load

```php
// load() returns the bare Basho record (throws on error).
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
| `category` | `string` |  |
| `description` | `string` |  |
| `english_name` | `string` |  |
| `frequency` | `int` |  |
| `name` | `string` |  |

#### Example: Load

```php
// load() returns the bare Kimarite record (throws on error).
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
| `height` | `float` |  |
| `recorded_date` | `string` |  |
| `rikishi_id` | `string` |  |
| `weight` | `float` |  |

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
| `division` | `string` |  |
| `id` | `string` |  |
| `level` | `int` |  |
| `name` | `string` |  |

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
| `basho_id` | `string` |  |
| `birthdate` | `string` |  |
| `birthplace` | `string` |  |
| `championship` | `int` |  |
| `current_rank` | `string` |  |
| `day` | `int` |  |
| `debut` | `string` |  |
| `division` | `string` |  |
| `height` | `float` |  |
| `heya` | `string` |  |
| `highest_rank` | `string` |  |
| `id` | `string` |  |
| `kimarite` | `string` |  |
| `real_name` | `string` |  |
| `rikishi1_id` | `string` |  |
| `rikishi2_id` | `string` |  |
| `rikishi_id` | `string` |  |
| `shikona` | `string` |  |
| `total_loss` | `int` |  |
| `total_win` | `int` |  |
| `weight` | `float` |  |
| `win_rate` | `float` |  |
| `winner_id` | `string` |  |

#### Example: Load

```php
// load() returns the bare Rikishi record (throws on error).
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
| `end_date` | `string` |  |
| `rikishi_id` | `string` |  |
| `shikona` | `string` |  |
| `start_date` | `string` |  |

#### Example: List

```php
// list() returns an array of Shikona records (throws on error).
$shikonas = $client->Shikona()->list();
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
$basho = $client->Basho();
$basho->list();

// $basho->data_get() now returns the basho data from the last list
// $basho->match_get() returns the last match criteria
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
