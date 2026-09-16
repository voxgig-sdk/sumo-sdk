# Sumo TypeScript SDK



The TypeScript SDK for the Sumo API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Basho()` — each with a small set of operations (`list`, `load`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Also generated from this model: `go`, `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb` — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/sumo-sdk/releases](https://github.com/voxgig-sdk/sumo-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { SumoSDK } from '@voxgig-sdk/sumo-sdk'

const client = new SumoSDK()
```

### 2. List basho records

`list()` resolves to an array of Basho ENTITIES — every operation
resolves to entities, not raw records. Iterate them directly, and call
`.data()` on one for the record it holds:

```ts
const bashos = await client.Basho().list({ basho_id: "example", day: 1, division: "example" })

for (const basho of bashos) {
  console.log(basho)
}
```

### 3. Load a basho

`load()` returns the entity directly and throws on failure:

```ts
try {
  const basho = await client.Basho().load({ id: 'example_id' })
  console.log(basho)
} catch (err) {
  console.error('load failed:', err)
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const shikonas = await client.Shikona().list()
  console.log(shikonas)
} catch (err) {
  console.error('list failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = SumoSDK.test()

const shikona = await client.Shikona().list()
// shikona is the entity, populated with mock response data
// — call shikona.data() for the record itself
console.log(shikona)
```

You can also use the instance method:

```ts
const client = new SumoSDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Shikona()

// First call runs the operation and stores its result
await entity.list()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new SumoSDK({
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
SUMO_TEST_LIVE=TRUE
```

Then run:

```bash
cd ts && npm test
```

Live entity tests continue independent operations after errors and attempt
supported cleanup. Their final result reports failures and missing prerequisites
after the remaining work completes. The model and test inputs determine which
API operations the generated scenarios cover.


## Reference

### SumoSDK

#### Constructor

```ts
new SumoSDK(options?: {
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Basho(data?)` | `BashoEntity` | Create a Basho entity instance. |
| `Kimarite(data?)` | `KimariteEntity` | Create a Kimarite entity instance. |
| `Measurement(data?)` | `MeasurementEntity` | Create a Measurement entity instance. |
| `Rank(data?)` | `RankEntity` | Create a Rank entity instance. |
| `Rikishi(data?)` | `RikishiEntity` | Create a Rikishi entity instance. |
| `Shikona(data?)` | `ShikonaEntity` | Create a Shikona entity instance. |
| `tester(testopts?, sdkopts?)` | `SumoSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `SumoSDK.test(testopts?, sdkopts?)` | `SumoSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): SumoSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load` resolves to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

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

Operations: list, load.

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

Operations: list, load.

API path: `/api/kimarite`

#### Measurement

| Field | Description |
| --- | --- |
| `height` | Height in centimeters |
| `recordedDate` | Date when measurement was recorded |
| `rikishiId` | Unique identifier for the rikishi |
| `weight` | Weight in kilograms |

Operations: list.

API path: `/api/measurements`

#### Rank

| Field | Description |
| --- | --- |
| `division` | Division the rank belongs to |
| `id` | Unique identifier for the rank |
| `level` | Hierarchical level of the rank |
| `name` | Name of the rank |

Operations: list.

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

Operations: list, load.

API path: `/api/rikishi/{rikishiId}/matches`

#### Shikona

| Field | Description |
| --- | --- |
| `endDate` | Date when rikishi stopped using this shikona |
| `rikishiId` | Identifier of the rikishi using this shikona |
| `shikona` | Ring name (shikona) |
| `startDate` | Date when rikishi started using this shikona |

Operations: list.

API path: `/api/shikonas`



## Entities


### Basho

Create an instance: `const basho = client.Basho()`

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
| `matchNumber` | `number` | Match number in the day's schedule |
| `month` | `number` | Month of the tournament |
| `rank` | `string` | Rank in the banzuke |
| `rikishi1Id` | `string` | First rikishi identifier |
| `rikishi2Id` | `string` | Second rikishi identifier |
| `rikishiId` | `string` | Unique identifier for the rikishi |
| `shikona` | `string` | Ring name of the rikishi |
| `side` | `string` | Side of the banzuke (east or west) |
| `startDate` | `string` | Start date of the tournament |
| `venue` | `string` | Tournament venue |
| `winnerId` | `string` | Winner rikishi identifier (if match completed) |
| `year` | `number` | Year of the tournament |

#### Example: Load

```ts
const basho = await client.Basho().load({ id: 'basho_id' })
```

#### Example: List

```ts
const bashos = await client.Basho().list({ basho_id: "example", day: 1, division: "example" })
```


### Kimarite

Create an instance: `const kimarite = client.Kimarite()`

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
| `frequency` | `number` | Number of times this technique has been used |
| `id` | `string` |  |
| `name` | `string` | Name of the kimarite technique |

#### Example: Load

```ts
const kimarite = await client.Kimarite().load({ id: 'kimarite_id' })
```

#### Example: List

```ts
const kimarites = await client.Kimarite().list()
```


### Measurement

Create an instance: `const measurement = client.Measurement()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `height` | `number` | Height in centimeters |
| `recordedDate` | `string` | Date when measurement was recorded |
| `rikishiId` | `string` | Unique identifier for the rikishi |
| `weight` | `number` | Weight in kilograms |

#### Example: List

```ts
const measurements = await client.Measurement().list()
```


### Rank

Create an instance: `const rank = client.Rank()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `division` | `string` | Division the rank belongs to |
| `id` | `string` | Unique identifier for the rank |
| `level` | `number` | Hierarchical level of the rank |
| `name` | `string` | Name of the rank |

#### Example: List

```ts
const ranks = await client.Rank().list()
```


### Rikishi

Create an instance: `const rikishi = client.Rikishi()`

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
| `championships` | `number` | Number of championships won |
| `currentRank` | `string` | Current rank of the rikishi |
| `day` | `number` | Day of the tournament |
| `debut` | `string` | Debut date or basho |
| `division` | `string` | Division of the match |
| `height` | `number` | Height in centimeters |
| `heya` | `string` | Stable (heya) the rikishi belongs to |
| `highestRank` | `string` | Highest rank achieved |
| `id` | `string` | Unique identifier for the match |
| `kimarite` | `string` | Winning technique used |
| `realName` | `string` | Real name of the rikishi |
| `rikishi1Id` | `string` | First rikishi identifier |
| `rikishi2Id` | `string` | Second rikishi identifier |
| `rikishiId` | `string` | Unique identifier for the rikishi |
| `shikona` | `string` | Ring name of the rikishi |
| `totalLosses` | `number` | Total number of losses |
| `totalWins` | `number` | Total number of wins |
| `weight` | `number` | Weight in kilograms |
| `winRate` | `number` | Win rate percentage |
| `winnerId` | `string` | Winner rikishi identifier |

#### Example: Load

```ts
const rikishi = await client.Rikishi().load({ id: 'rikishi_id' })
```

#### Example: List

```ts
const rikishis = await client.Rikishi().list()
```


### Shikona

Create an instance: `const shikona = client.Shikona()`

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

```ts
const shikonas = await client.Shikona().list()
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

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Client-side rate limiting via a token bucket
- **RetryFeature**: Automatic retry of transient failures with exponential backoff
- **TestFeature**: In-memory mock transport for testing without a live server
- **TimeoutFeature**: Per-request timeout with transport abort

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
sumo/
├── src/
│   ├── SumoSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { SumoSDK } from '@voxgig-sdk/sumo-sdk'
```

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const shikona = client.Shikona()
await shikona.list()

// shikona.data() now returns the shikona data from the last `list`
// shikona.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
