# Sumo TypeScript SDK



The TypeScript SDK for the Sumo API — a type-safe, entity-oriented client with full async/await support.

> Other languages, the CLI, and MCP server live alongside this one — see
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
import { SumoSDK } from '@voxgig-sdk/sumo'

const client = new SumoSDK()
```

### 2. List basho records

`list()` resolves to an array of Basho objects — iterate it directly:

```ts
const bashos = await client.Basho().list()

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

const basho = await client.Basho().load({ id: 'test01' })
// basho is a bare entity populated with mock response data
console.log(basho)
```

You can also use the instance method:

```ts
const client = new SumoSDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Basho()

// First call sets internal match
await entity.load({ id: 'example' })

// Subsequent calls reuse the stored match
const data = entity.data()
console.log(data.id) // 'example'
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
| `create` | `create(reqdata?, ctrl?): Promise<Entity>` | Create a new entity. |
| `update` | `update(reqdata?, ctrl?): Promise<Entity>` | Update an existing entity. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<void>` | Remove an entity. |
| `data` | `data(data?): any` | Get or set entity data. |
| `match` | `match(match?): any` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): SumoSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load`, `create` and `update` resolve to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).
- `remove` resolves to `void`.

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

Operations: list, load.

API path: `/api/basho/{bashoId}/torikumi/{division}/{day}`

#### Kimarite

| Field | Description |
| --- | --- |
| `category` |  |
| `description` |  |
| `english_name` |  |
| `frequency` |  |
| `name` |  |

Operations: list, load.

API path: `/api/kimarite`

#### Measurement

| Field | Description |
| --- | --- |
| `height` |  |
| `recorded_date` |  |
| `rikishi_id` |  |
| `weight` |  |

Operations: list.

API path: `/api/measurements`

#### Rank

| Field | Description |
| --- | --- |
| `division` |  |
| `id` |  |
| `level` |  |
| `name` |  |

Operations: list.

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

Operations: list, load.

API path: `/api/rikishi/{rikishiId}/matches`

#### Shikona

| Field | Description |
| --- | --- |
| `end_date` |  |
| `rikishi_id` |  |
| `shikona` |  |
| `start_date` |  |

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

```ts
const basho = await client.Basho().load({ id: 'basho_id' })
```

#### Example: List

```ts
const bashos = await client.Basho().list()
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
| `category` | ``$STRING`` |  |
| `description` | ``$STRING`` |  |
| `english_name` | ``$STRING`` |  |
| `frequency` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |

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
| `height` | ``$NUMBER`` |  |
| `recorded_date` | ``$STRING`` |  |
| `rikishi_id` | ``$STRING`` |  |
| `weight` | ``$NUMBER`` |  |

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
| `division` | ``$STRING`` |  |
| `id` | ``$STRING`` |  |
| `level` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |

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
| `end_date` | ``$STRING`` |  |
| `rikishi_id` | ``$STRING`` |  |
| `shikona` | ``$STRING`` |  |
| `start_date` | ``$STRING`` |  |

#### Example: List

```ts
const shikonas = await client.Shikona().list()
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
error is returned to the caller.

An unexpected exception triggers the `PreUnexpected` hook before
propagating.

### Features and hooks

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

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
import { SumoSDK } from '@voxgig-sdk/sumo'
```

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const basho = client.Basho()
await basho.load({ id: "example_id" })

// basho.data() now returns the loaded basho data
// basho.match() returns { id: "example_id" }
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
