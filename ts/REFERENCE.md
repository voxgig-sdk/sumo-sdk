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
| `endDate` | `string` | No | End date of the tournament |
| `id` | `string` | No | Unique identifier for the basho |
| `kimarite` | `string` | No | Winning technique used (if match completed) |
| `matchNumber` | `number` | No | Match number in the day's schedule |
| `month` | `number` | No | Month of the tournament |
| `rank` | `string` | No | Rank in the banzuke |
| `rikishi1Id` | `string` | No | First rikishi identifier |
| `rikishi2Id` | `string` | No | Second rikishi identifier |
| `rikishiId` | `string` | No | Unique identifier for the rikishi |
| `shikona` | `string` | No | Ring name of the rikishi |
| `side` | `string` | No | Side of the banzuke (east or west) |
| `startDate` | `string` | No | Start date of the tournament |
| `venue` | `string` | No | Tournament venue |
| `winnerId` | `string` | No | Winner rikishi identifier (if match completed) |
| `year` | `number` | No | Year of the tournament |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Basho().list({ basho_id: "example", day: 1, division: "example" })
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
| `category` | `string` | No | Category of the technique |
| `description` | `string` | No | Detailed description of the technique |
| `englishName` | `string` | No | English translation of the technique name |
| `frequency` | `number` | No | Number of times this technique has been used |
| `id` | `string` | No |  |
| `name` | `string` | No | Name of the kimarite technique |

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
| `height` | `number` | No | Height in centimeters |
| `recordedDate` | `string` | No | Date when measurement was recorded |
| `rikishiId` | `string` | No | Unique identifier for the rikishi |
| `weight` | `number` | No | Weight in kilograms |

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
| `division` | `string` | No | Division the rank belongs to |
| `id` | `string` | No | Unique identifier for the rank |
| `level` | `number` | No | Hierarchical level of the rank |
| `name` | `string` | No | Name of the rank |

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
| `bashoId` | `string` | No | Identifier of the basho where match took place |
| `birthdate` | `string` | No | Date of birth |
| `birthplace` | `string` | No | Birthplace of the rikishi |
| `championships` | `number` | No | Number of championships won |
| `currentRank` | `string` | No | Current rank of the rikishi |
| `day` | `number` | No | Day of the tournament |
| `debut` | `string` | No | Debut date or basho |
| `division` | `string` | No | Division of the match |
| `height` | `number` | No | Height in centimeters |
| `heya` | `string` | No | Stable (heya) the rikishi belongs to |
| `highestRank` | `string` | No | Highest rank achieved |
| `id` | `string` | No | Unique identifier for the match |
| `kimarite` | `string` | No | Winning technique used |
| `realName` | `string` | No | Real name of the rikishi |
| `rikishi1Id` | `string` | No | First rikishi identifier |
| `rikishi2Id` | `string` | No | Second rikishi identifier |
| `rikishiId` | `string` | No | Unique identifier for the rikishi |
| `shikona` | `string` | No | Ring name of the rikishi |
| `totalLosses` | `number` | No | Total number of losses |
| `totalWins` | `number` | No | Total number of wins |
| `weight` | `number` | No | Weight in kilograms |
| `winRate` | `number` | No | Win rate percentage |
| `winnerId` | `string` | No | Winner rikishi identifier |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `match` | `/api/rikishi/{rikishiId}/matches` | `client.Rikishi().list({ $action: 'match', ... })` |
| `stat` | `/api/rikishi/{rikishiId}/stats` | `client.Rikishi().load({ $action: 'stat', ... })` |

An action returns that action's OWN response, which is not necessarily a
Rikishi record — check the API definition for its shape.

```ts
const result = await client.Rikishi().list({
  $action: 'match',
  /* ...the action's own arguments */
})
```

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
| `endDate` | `string` | No | Date when rikishi stopped using this shikona |
| `rikishiId` | `string` | No | Identifier of the rikishi using this shikona |
| `shikona` | `string` | No | Ring name (shikona) |
| `startDate` | `string` | No | Date when rikishi started using this shikona |

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
| `ratelimit` | 0.0.1 | Client-side rate limiting via a token bucket |
| `retry` | 0.0.1 | Automatic retry of transient failures with exponential backoff |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |
| `timeout` | 0.0.1 | Per-request timeout with transport abort |


Features are activated via the `feature` option:

```ts
const client = new SumoSDK({
  feature: {
    ratelimit: { active: true },
    retry: { active: true },
    test: { active: true },
    timeout: { active: true },
  }
})
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

