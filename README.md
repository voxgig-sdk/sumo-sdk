# Sumo SDK

Query a comprehensive sumo database covering rikishi, basho, matches, and ranks from 1958 to today

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Sumo API

[Sumo-API](https://www.sumo-api.com) is a free, community-maintained REST API offering a comprehensive database of sumo statistics spanning from 1958 to the present day. The service is continually updated with the latest results from Grand Sumo tournaments and powers a number of fantasy sumo games.

What you get from the API:

- **Rikishi** records, per-wrestler stats, and head-to-head match histories
- **Basho** tournament details, **banzuke** (ranking lists) by division, and **torikumi** (daily match pairings)
- **Kimarite** (winning technique) reference data and per-technique usage
- Historical **measurements**, **ranks**, and **shikona** (ring names) tracked over a rikishi's career

The API is free to use without authentication. The maintainer asks users to access it responsibly, and contributions help cover operating costs (contact: thesumoapi@gmail.com).

## Try it

**TypeScript**
```bash
npm install sumo
```

**Python**
```bash
pip install sumo-sdk
```

**PHP**
```bash
composer require voxgig/sumo-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/sumo-sdk/go
```

**Ruby**
```bash
gem install sumo-sdk
```

**Lua**
```bash
luarocks install sumo-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { SumoSDK } from 'sumo'

const client = new SumoSDK({})

// List all bashos
const bashos = await client.Basho().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o sumo-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "sumo": {
      "command": "/abs/path/to/sumo-mcp"
    }
  }
}
```

## Entities

The API exposes 6 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Basho** | A grand sumo tournament; fetched via `GET /api/basho/:bashoId`, with division banzuke at `GET /api/basho/:bashoId/banzuke/:division` and daily match pairings at `GET /api/basho/:bashoId/torikumi/:division/:day`. | `/api/basho/{bashoId}/torikumi/{division}/{day}` |
| **Kimarite** | A winning technique used to end a bout; listed via `GET /api/kimarite` and detailed at `GET /api/kimarite/:kimarite`. | `/api/kimarite` |
| **Measurement** | Historical body measurements (height, weight) recorded for rikishi over their careers; available via `GET /api/measurements`. | `/api/measurements` |
| **Rank** | A rikishi's ranking on the banzuke at a given basho, with its full history available via `GET /api/ranks`. | `/api/ranks` |
| **Rikishi** | A sumo wrestler; listed via `GET /api/rikishis` (paginated with limit/skip), with details at `GET /api/rikishi/:rikishiId`, career stats at `/stats`, and match histories at `/matches` and `/matches/:opponentId`. | `/api/rikishi/{rikishiId}/matches` |
| **Shikona** | The ring name a rikishi competes under, with all historical names tracked via `GET /api/shikonas`. | `/api/shikonas` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from sumo_sdk import SumoSDK

client = SumoSDK({})

# List all bashos
bashos, err = client.Basho(None).list(None, None)

# Load a specific basho
basho, err = client.Basho(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'sumo_sdk.php';

$client = new SumoSDK([]);

// List all bashos
[$bashos, $err] = $client->Basho(null)->list(null, null);

// Load a specific basho
[$basho, $err] = $client->Basho(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/sumo-sdk/go"

client := sdk.NewSumoSDK(map[string]any{})

// List all bashos
bashos, err := client.Basho(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "Sumo_sdk"

client = SumoSDK.new({})

# List all bashos
bashos, err = client.Basho(nil).list(nil, nil)

# Load a specific basho
basho, err = client.Basho(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("sumo_sdk")

local client = sdk.new({})

-- List all bashos
local bashos, err = client:Basho(nil):list(nil, nil)

-- Load a specific basho
local basho, err = client:Basho(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = SumoSDK.test()
const result = await client.Basho().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = SumoSDK.test(None, None)
result, err = client.Basho(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = SumoSDK::test(null, null);
[$result, $err] = $client->Basho(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Basho(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = SumoSDK.test(nil, nil)
result, err = client.Basho(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Basho(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Sumo API

- Upstream: [https://www.sumo-api.com](https://www.sumo-api.com)
- API docs: [https://www.sumo-api.com/api-guide](https://www.sumo-api.com/api-guide)

---

Generated from the Sumo API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
