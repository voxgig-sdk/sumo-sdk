# Sumo API

Free API for accessing sumo database including rikishi, basho, banzuke, torikumi, hoshitori, matches, and more. Explore sumo data, learn about sumo history, and check match results.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 6 entities and 13 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### Basho

Results: Successful response with torikumi schedule; Successful response with banzuke rankings; Successful response with basho details.

SDK operations: `list`, `load`.

Key fields to recognise:

- `endDate`: End date of the tournament
- `id`: Unique identifier for the basho
- `kimarite`: Winning technique used (if match completed)
- `matchNumber`: Match number in the day&#39;s schedule
- `month`: Month of the tournament

### Kimarite

Results: Successful response with list of kimarite; Successful response with kimarite details.

SDK operations: `list`, `load`.

Key fields to recognise:

- `category`: Category of the technique
- `description`: Detailed description of the technique
- `englishName`: English translation of the technique name
- `frequency`: Number of times this technique has been used
- `name`: Name of the kimarite technique

### Measurement

Results: Successful response with measurements data.

SDK operations: `list`.

Key fields to recognise:

- `height`: Height in centimeters
- `recordedDate`: Date when measurement was recorded
- `rikishiId`: Unique identifier for the rikishi
- `weight`: Weight in kilograms

### Rank

Results: Successful response with list of ranks.

SDK operations: `list`.

Key fields to recognise:

- `division`: Division the rank belongs to
- `id`: Unique identifier for the rank
- `level`: Hierarchical level of the rank
- `name`: Name of the rank

### Rikishi

Results: Successful response with match history; Successful response with list of rikishi; Successful response with match history between two rikishi; Successful response with rikishi details; Successful response with rikishi statistics.

SDK operations: `list`, `load`.

Key fields to recognise:

- `bashoId`: Identifier of the basho where match took place
- `birthdate`: Date of birth
- `birthplace`: Birthplace of the rikishi
- `championships`: Number of championships won
- `currentRank`: Current rank of the rikishi

### Shikona

Results: Successful response with list of shikonas.

SDK operations: `list`.

Key fields to recognise:

- `endDate`: Date when rikishi stopped using this shikona
- `rikishiId`: Identifier of the rikishi using this shikona
- `shikona`: Ring name (shikona)
- `startDate`: Date when rikishi started using this shikona

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| Basho | `list` | `GET /api/basho/{bashoId}/torikumi/{division}/{day}` | See reference |
| Basho | `load` | `GET /api/basho/{bashoId}/banzuke/{division}` | See reference |
| Basho | `load` | `GET /api/basho/{bashoId}` | See reference |
| Kimarite | `list` | `GET /api/kimarite` | See reference |
| Kimarite | `load` | `GET /api/kimarite/{kimarite}` | See reference |
| Measurement | `list` | `GET /api/measurements` | See reference |
| Rank | `list` | `GET /api/ranks` | See reference |
| Rikishi | `list` | `GET /api/rikishi/{rikishiId}/matches` | See reference |
| Rikishi | `list` | `GET /api/rikishis` | See reference |
| Rikishi | `load` | `GET /api/rikishi/{rikishiId}/matches/{opponentId}` | See reference |
| Rikishi | `load` | `GET /api/rikishi/{rikishiId}` | See reference |
| Rikishi | `load` | `GET /api/rikishi/{rikishiId}/stats` | See reference |
| Shikona | `list` | `GET /api/shikonas` | See reference |

## Connect to the API

- Production server: `https://www.sumo-api.com`

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Golang | `go/` | Build from source |
| Lua | `lua/` | Build from source |
| PHP | `php/` | Build from source |
| Python | `py/` | Build from source |
| Ruby | `rb/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### Go CLI

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### Go MCP server

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `sumo_list`: List records for an entity. Supported entities: `basho`, `kimarite`, `measurement`, `rank`, `rikishi`, `shikona`.
- `sumo_load`: Load one record for an entity. Supported entities: `basho`, `kimarite`, `rikishi`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `ratelimit`: Client-side rate limiting via a token bucket
- `retry`: Automatic retry of transient failures with exponential backoff
- `test`: In-memory mock transport for testing without a live server
- `timeout`: Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

