---
name: obul-stabletravel-flightaware
description: "USE THIS SKILL WHEN: the user wants real-time flight tracking, flight status, airport operations, historical flight data, or disruption statistics via FlightAware through the Obul proxy."
homepage: https://flightaware.com
metadata:
  obul-skill:
    emoji: "🛫"
    requires:
      env: ["OBUL_API_KEY"]
      primaryEnv: "OBUL_API_KEY"
registries: {}
---

# FlightAware (StableTravel)

FlightAware provides real-time flight tracking, airport operations, flight history, and disruption statistics through the Obul proxy via StableTravel. Track flights, get positions, view historical data, and monitor airport operations.

## Authentication

All requests route through the Obul proxy. Include your Obul API key in every request:

```json
{
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

**Base URL:** `https://proxy.obul.ai/proxy/https/stabletravel.dev`

## Common Operations

### Flight Search

Search flights by query string using FlightAware syntax (idents, latlong, airline).

**Pricing:** $0.10

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/stabletravel.dev/api/flightaware/flights/search?query=UAL123",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

**Response:** JSON array of flights matching the query.

### Flight by Ident

Get flights by flight number, registration, or callsign.

**Pricing:** $0.01

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/stabletravel.dev/api/flightaware/flights/UAL123",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Flight Position

Get latest position data for a specific flight.

**Pricing:** $0.02

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/stabletravel.dev/api/flightaware/flights/{id}/position",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Flight Track

Get full position history/track for a flight.

**Pricing:** $0.024

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/stabletravel.dev/api/flightaware/flights/{id}/track",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Flight Map

Get flight track as a PNG map image.

**Pricing:** $0.06

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/stabletravel.dev/api/flightaware/flights/{id}/map",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Airport Info

Get information about a specific airport by code.

**Pricing:** $0.03

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/stabletravel.dev/api/flightaware/airports/JFK",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Airport Delays

Get delay information for a specific airport.

**Pricing:** $0.02

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/stabletravel.dev/api/flightaware/airports/JFK/delays",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Airport Flights

Get flights at an airport (arrivals, departures, enroute).

**Pricing:** $0.04

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/stabletravel.dev/api/flightaware/airports/JFK/flights",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Airport Weather (METAR)

Get current weather observations for an airport.

**Pricing:** $0.004

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/stabletravel.dev/api/flightaware/airports/JFK/weather/observations",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Historical Flight

Get historical flight data by ident.

**Pricing:** $0.04

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/stabletravel.dev/api/flightaware/history/flights/UAL123",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Historical Track

Get historical flight track.

**Pricing:** $0.12

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/stabletravel.dev/api/flightaware/history/flights/{id}/track",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Disruption Counts

Get disruption statistics for airlines or airports.

**Pricing:** $0.01

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/stabletravel.dev/api/flightaware/disruption-counts/airline/UAL",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

## Endpoint Pricing Reference

### Flight Operations

| Endpoint | Method | Price | Purpose |
|----------|--------|-------|---------|
| `/api/flightaware/flights/search` | GET | $0.10 | Search flights by query |
| `/api/flightaware/flights/search/positions` | GET | $0.10 | Search with position data |
| `/api/flightaware/flights/search/count` | GET | $0.04 | Get count of matches |
| `/api/flightaware/flights/search/advanced` | GET | $0.10 | Advanced search |
| `/api/flightaware/flights/{ident}` | GET | $0.01 | Get flights by ident |
| `/api/flightaware/flights/{ident}/canonical` | GET | $0.002 | Get canonical ident |
| `/api/flightaware/flights/{ident}/intents` | POST | $0.001 | Set flight intent |
| `/api/flightaware/flights/{id}/position` | GET | $0.02 | Get position |
| `/api/flightaware/flights/{id}/track` | GET | $0.024 | Get track |
| `/api/flightaware/flights/{id}/route-info` | GET | $0.02 | Get route info |
| `/api/flightaware/flights/{id}/map` | GET | $0.06 | Get map image |

### Airports

| Endpoint | Method | Price | Purpose |
|----------|--------|-------|---------|
| `/api/flightaware/airports` | GET | $0.01 | List all airports |
| `/api/flightaware/airports/nearby` | GET | $0.008 | Find nearby airports |
| `/api/flightaware/airports/delays` | GET | $0.10 | All airport delays |
| `/api/flightaware/airports/{id}` | GET | $0.03 | Get airport info |
| `/api/flightaware/airports/{id}/canonical` | GET | $0.002 | Get canonical code |
| `/api/flightaware/airports/{id}/nearby` | GET | $0.008 | Nearby airports |
| `/api/flightaware/airports/{id}/delays` | GET | $0.02 | Airport delays |
| `/api/flightaware/airports/{id}/flights` | GET | $0.04 | All flights |
| `/api/flightaware/airports/{id}/flights/arrivals` | GET | $0.01 | Arrivals |
| `/api/flightaware/airports/{id}/flights/departures` | GET | $0.01 | Departures |
| `/api/flightaware/airports/{id}/flights/scheduled-departures` | GET | $0.01 | Scheduled departures |
| `/api/flightaware/airports/{id}/flights/scheduled-arrivals` | GET | $0.01 | Scheduled arrivals |
| `/api/flightaware/airports/{id}/flights/to/{dest_id}` | GET | $0.10 | Flights between airports |
| `/api/flightaware/airports/{id}/flights/counts` | GET | $0.20 | Flight counts |
| `/api/flightaware/airports/{id}/weather/observations` | GET | $0.004 | METAR weather |
| `/api/flightaware/airports/{id}/weather/forecast` | GET | $0.004 | TAF forecast |
| `/api/flightaware/airports/{id}/routes/{dest_id}` | GET | $0.04 | Route info |

### Flight History

| Endpoint | Method | Price | Purpose |
|----------|--------|-------|---------|
| `/api/flightaware/history/flights/{ident}` | GET | $0.04 | Historical flights |
| `/api/flightaware/history/flights/{id}/track` | GET | $0.12 | Historical track |
| `/api/flightaware/history/flights/{id}/map` | GET | $0.28 | Historical map |
| `/api/flightaware/history/flights/{id}/route-info` | GET | $0.08 | Historical route |
| `/api/flightaware/history/airports/{id}/flights/arrivals` | GET | $0.04 | Historical arrivals |
| `/api/flightaware/history/airports/{id}/flights/departures` | GET | $0.04 | Historical departures |
| `/api/flightaware/history/airports/{id}/flights/to/{dest_id}` | GET | $0.24 | Historical route flights |
| `/api/flightaware/history/aircraft/{registration}/last-flight` | GET | $0.40 | Last aircraft flight |
| `/api/flightaware/history/operators/{id}/flights` | GET | $0.04 | Historical operator flights |

### Disruption Counts

| Endpoint | Method | Price | Purpose |
|----------|--------|-------|---------|
| `/api/flightaware/disruption-counts/{entity_type}` | GET | $0.01 | Disruption stats |
| `/api/flightaware/disruption-counts/{entity_type}/{id}` | GET | $0.01 | Specific entity stats |

## When to Use

- **Real-time tracking** — Monitor live flights with position updates
- **Flight status** — Get current flight information and status
- **Airport operations** — View arrivals, departures, delays at airports
- **Historical data** — Research past flights and routes
- **Disruption monitoring** — Track delays and disruptions for airlines/airports
- **Weather** — Get METAR and TAF weather for airports

## Best Practices

- **Use ident first** — Start with /flights/{ident} to get the fa_flight_id
- **Track with ID** — Use the fa_flight_id for position/track queries
- **Check airport status** — Use /airports/{id} + /delays + /weather/observations
- **Compare with Amadeus** — Use obul-stabletravel-amadeus for booking; FlightAware for tracking
- **For errors** — See @skills/obul-api-errors/SKILL.md for complete error code reference and troubleshooting
