---
name: obul-stabletravel-flightaware
description: 'USE THIS SKILL WHEN: the user wants real-time flight tracking, flight
  status, airport operations, historical flight data, or disruption statistics via
  FlightAware through the Obul proxy.'
endpoints:
- path: /api/flightaware/flights/search
  method: GET
  price: $0.10
  description: Search flights by query
- path: /api/flightaware/flights/search/positions
  method: GET
  price: $0.10
  description: Search with position data
- path: /api/flightaware/flights/search/count
  method: GET
  price: $0.04
  description: Get count of matches
- path: /api/flightaware/flights/search/advanced
  method: GET
  price: $0.10
  description: Advanced search
- path: /api/flightaware/flights/{ident}
  method: GET
  price: $0.01
  description: Get flights by ident
- path: /api/flightaware/flights/{ident}/canonical
  method: GET
  price: $0.002
  description: Get canonical ident
- path: /api/flightaware/flights/{ident}/intents
  method: POST
  price: $0.001
  description: Set flight intent
- path: /api/flightaware/flights/{id}/position
  method: GET
  price: $0.02
  description: Get position
- path: /api/flightaware/flights/{id}/track
  method: GET
  price: $0.024
  description: Get track
- path: /api/flightaware/flights/{id}/route-info
  method: GET
  price: $0.02
  description: Get route info
- path: /api/flightaware/flights/{id}/map
  method: GET
  price: $0.06
  description: Get map image
- path: /api/flightaware/airports
  method: GET
  price: $0.01
  description: List all airports
- path: /api/flightaware/airports/nearby
  method: GET
  price: $0.008
  description: Find nearby airports
- path: /api/flightaware/airports/delays
  method: GET
  price: $0.10
  description: All airport delays
- path: /api/flightaware/airports/{id}
  method: GET
  price: $0.03
  description: Get airport info
- path: /api/flightaware/airports/{id}/canonical
  method: GET
  price: $0.002
  description: Get canonical code
- path: /api/flightaware/airports/{id}/nearby
  method: GET
  price: $0.008
  description: Nearby airports
- path: /api/flightaware/airports/{id}/delays
  method: GET
  price: $0.02
  description: Airport delays
- path: /api/flightaware/airports/{id}/flights
  method: GET
  price: $0.04
  description: All flights
- path: /api/flightaware/airports/{id}/flights/arrivals
  method: GET
  price: $0.01
  description: Arrivals
- path: /api/flightaware/airports/{id}/flights/departures
  method: GET
  price: $0.01
  description: Departures
- path: /api/flightaware/airports/{id}/flights/scheduled-departures
  method: GET
  price: $0.01
  description: Scheduled departures
- path: /api/flightaware/airports/{id}/flights/scheduled-arrivals
  method: GET
  price: $0.01
  description: Scheduled arrivals
- path: /api/flightaware/airports/{id}/flights/to/{dest_id}
  method: GET
  price: $0.10
  description: Flights between airports
- path: /api/flightaware/airports/{id}/flights/counts
  method: GET
  price: $0.20
  description: Flight counts
- path: /api/flightaware/airports/{id}/weather/observations
  method: GET
  price: $0.004
  description: METAR weather
- path: /api/flightaware/airports/{id}/weather/forecast
  method: GET
  price: $0.004
  description: TAF forecast
- path: /api/flightaware/airports/{id}/routes/{dest_id}
  method: GET
  price: $0.04
  description: Route info
- path: /api/flightaware/history/flights/{ident}
  method: GET
  price: $0.04
  description: Historical flights
- path: /api/flightaware/history/flights/{id}/track
  method: GET
  price: $0.12
  description: Historical track
- path: /api/flightaware/history/flights/{id}/map
  method: GET
  price: $0.28
  description: Historical map
- path: /api/flightaware/history/flights/{id}/route-info
  method: GET
  price: $0.08
  description: Historical route
- path: /api/flightaware/history/airports/{id}/flights/arrivals
  method: GET
  price: $0.04
  description: Historical arrivals
- path: /api/flightaware/history/airports/{id}/flights/departures
  method: GET
  price: $0.04
  description: Historical departures
- path: /api/flightaware/history/airports/{id}/flights/to/{dest_id}
  method: GET
  price: $0.24
  description: Historical route flights
- path: /api/flightaware/history/aircraft/{registration}/last-flight
  method: GET
  price: $0.40
  description: Last aircraft flight
- path: /api/flightaware/history/operators/{id}/flights
  method: GET
  price: $0.04
  description: Historical operator flights
- path: /api/flightaware/disruption-counts/{entity_type}
  method: GET
  price: $0.01
  description: Disruption stats
- path: /api/flightaware/disruption-counts/{entity_type}/{id}
  method: GET
  price: $0.01
  description: Specific entity stats
metadata:
  obul-skill:
    emoji: 🛫
    requires:
      env:
      - OBUL_API_KEY
      primaryEnv: OBUL_API_KEY
registries: {}
provider: stabletravel
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
