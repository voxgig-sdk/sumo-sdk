# Sumo TypeScript SDK Reference

Complete API reference for the Sumo TypeScript SDK.


## SumoSDK

### Constructor

```ts
new SumoSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `SumoSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = SumoSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `SumoSDK` instance in test mode.


### Instance Methods

#### `Basho(data?: object)`

Create a new `Basho` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BashoEntity` instance.

#### `Kimarite(data?: object)`

Create a new `Kimarite` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `KimariteEntity` instance.

#### `Measurement(data?: object)`

Create a new `Measurement` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MeasurementEntity` instance.

#### `Rank(data?: object)`

Create a new `Rank` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `RankEntity` instance.

#### `Rikishi(data?: object)`

Create a new `Rikishi` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `RikishiEntity` instance.

#### `Shikona(data?: object)`

Create a new `Shikona` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ShikonaEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `SumoSDK.test()`.

**Returns:** `SumoSDK` instance in test mode.


---

## BashoEntity

```ts
const basho = client.Basho()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `end_date` | `string` | No |  |
| `id` | `string` | No |  |
| `kimarite` | `string` | No |  |
| `match_number` | `number` | No |  |
| `month` | `number` | No |  |
| `rank` | `string` | No |  |
| `rikishi1_id` | `string` | No |  |
| `rikishi2_id` | `string` | No |  |
| `rikishi_id` | `string` | No |  |
| `shikona` | `string` | No |  |
| `side` | `string` | No |  |
| `start_date` | `string` | No |  |
| `venue` | `string` | No |  |
| `winner_id` | `string` | No |  |
| `year` | `number` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Basho().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Basho().load({ id: 'basho_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BashoEntity` instance with the same client and
options.

#### `client()`

Return the parent `SumoSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## KimariteEntity

```ts
const kimarite = client.Kimarite()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `category` | `string` | No |  |
| `description` | `string` | No |  |
| `english_name` | `string` | No |  |
| `frequency` | `number` | No |  |
| `name` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Kimarite().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Kimarite().load({ id: 'kimarite_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `KimariteEntity` instance with the same client and
options.

#### `client()`

Return the parent `SumoSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MeasurementEntity

```ts
const measurement = client.Measurement()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `height` | `number` | No |  |
| `recorded_date` | `string` | No |  |
| `rikishi_id` | `string` | No |  |
| `weight` | `number` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Measurement().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MeasurementEntity` instance with the same client and
options.

#### `client()`

Return the parent `SumoSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## RankEntity

```ts
const rank = client.Rank()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `division` | `string` | No |  |
| `id` | `string` | No |  |
| `level` | `number` | No |  |
| `name` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Rank().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `RankEntity` instance with the same client and
options.

#### `client()`

Return the parent `SumoSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## RikishiEntity

```ts
const rikishi = client.Rikishi()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `basho_id` | `string` | No |  |
| `birthdate` | `string` | No |  |
| `birthplace` | `string` | No |  |
| `championship` | `number` | No |  |
| `current_rank` | `string` | No |  |
| `day` | `number` | No |  |
| `debut` | `string` | No |  |
| `division` | `string` | No |  |
| `height` | `number` | No |  |
| `heya` | `string` | No |  |
| `highest_rank` | `string` | No |  |
| `id` | `string` | No |  |
| `kimarite` | `string` | No |  |
| `real_name` | `string` | No |  |
| `rikishi1_id` | `string` | No |  |
| `rikishi2_id` | `string` | No |  |
| `rikishi_id` | `string` | No |  |
| `shikona` | `string` | No |  |
| `total_loss` | `number` | No |  |
| `total_win` | `number` | No |  |
| `weight` | `number` | No |  |
| `win_rate` | `number` | No |  |
| `winner_id` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Rikishi().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Rikishi().load({ id: 'rikishi_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `RikishiEntity` instance with the same client and
options.

#### `client()`

Return the parent `SumoSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ShikonaEntity

```ts
const shikona = client.Shikona()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `end_date` | `string` | No |  |
| `rikishi_id` | `string` | No |  |
| `shikona` | `string` | No |  |
| `start_date` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Shikona().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ShikonaEntity` instance with the same client and
options.

#### `client()`

Return the parent `SumoSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new SumoSDK({
  feature: {
    test: { active: true },
  }
})
```

