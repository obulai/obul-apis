---
name: obul-stabletravel-amadeus
description: "USE THIS SKILL WHEN: the user wants to search and book flights, hotels, activities, and airport transfers. Provides pay-per-use travel booking via Amadeus through the Obul proxy."
homepage: https://stabletravel.dev
metadata:
  obul-skill:
    emoji: "✈️"
    requires:
      env: ["OBUL_API_KEY"]
      primaryEnv: "OBUL_API_KEY"
registries: {}
---

# StableTravel Amadeus

StableTravel provides pay-per-use access to flight search, hotel booking, activities, and airport transfers powered by Amadeus through x402 micropayments. No API keys, no subscriptions — pay per request.

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

### Flight Search (GET)

Search for flight offers using simple GET parameters. Best for one-way or round-trip searches.

**Pricing:** $0.05

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/stabletravel.dev/api/flights/search?originLocationCode=JFK&destinationLocationCode=LAX&departureDate=2025-06-15&adults=1&max=5",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

**Response:** JSON with flight offers including airline, price, duration, and segments.

### Flight Search (POST)

Advanced flight search with multi-city support and complex itineraries.

**Pricing:** $0.05

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/stabletravel.dev/api/flights/search",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "originDestinations": [
      {
        "id": "1",
        "originLocationCode": "JFK",
        "destinationLocationCode": "LAX",
        "departureDateTimeRange": { "date": "2025-06-15" }
      }
    ],
    "travelers": [{ "id": "1", "travelerType": "ADULT" }],
    "sources": ["GDS"],
    "searchCriteria": { "maxFlightOffers": 5 }
  }
}
```

### Flight Price

Confirm pricing for a flight offer before booking.

**Pricing:** $0.03

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/stabletravel.dev/api/flights/price",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "data": {
      "type": "flight-offers-pricing",
      "flightOffers": [<flight-offer-object>]
    }
  }
}
```

### Flight Book

Book a flight order after confirming price.

**Pricing:** $0.09

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/stabletravel.dev/api/flights/book",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": { /* flight order object */ }
}
```

### Flight Status

Get real-time flight status by carrier and flight number.

**Pricing:** $0.005

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/stabletravel.dev/api/flights/status?carrierCode=AA&flightNumber=100&scheduledDepartureDate=2025-06-15",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Hotel List

List hotels by IATA city code.

**Pricing:** $0.03

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/stabletravel.dev/api/hotels/list?cityCode=PAR&max=10",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Hotel Search

Search hotel offers by hotel IDs (get IDs from /hotels/list first).

**Pricing:** $0.03

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/stabletravel.dev/api/hotels/search?hotelIds=RTLONMCI,RTLMADCI&checkInDate=2025-06-15&checkOutDate=2025-06-18&adults=2",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Hotel Book

Book a hotel offer.

**Pricing:** $0.002

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/stabletravel.dev/api/hotels/book",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": { /* hotel offer object */ }
}
```

### Activities Search

Search tours and activities by latitude/longitude.

**Pricing:** $0.05

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/stabletravel.dev/api/activities/search?latitude=48.8566&longitude=2.3522&radius=5&max=10",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Transfers Search

Search airport transfer options.

**Pricing:** $0.003

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/stabletravel.dev/api/transfers/search",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "startLocationCode": "CDG",
    "endAddressLine": "Avenue des Champs-Elysees 1",
    "endCityName": "Paris",
    "endZipCode": "75008",
    "endCountryCode": "FR",
    "transferType": "PRIVATE",
    "startDateTime": "2025-06-15T10:00:00",
    "passengers": 2
  }
}
```

### Reference Locations

Search for airports and cities by keyword.

**Pricing:** $0.005

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/stabletravel.dev/api/reference/locations?keyword=Paris&subType=AIRPORT,CITY",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

## Endpoint Pricing Reference

### Flights

| Endpoint | Method | Price | Purpose |
|----------|--------|-------|---------|
| `/api/flights/search` | GET, POST | $0.05 | Search flight offers |
| `/api/flights/price` | POST | $0.03 | Confirm flight pricing |
| `/api/flights/book` | POST | $0.09 | Book a flight |
| `/api/flights/orders` | GET | $0.005 | Retrieve flight order |
| `/api/flights/orders/cancel` | POST | $0.005 | Cancel flight order |
| `/api/flights/seatmap` | GET, POST | $0.03 | Get seat maps |
| `/api/flights/upsell` | POST | $0.03 | Get upsell offers |
| `/api/flights/availability` | POST | $0.03 | Check availability |
| `/api/flights/status` | GET | $0.005 | Get flight status |
| `/api/flights/checkin-links` | GET | $0.005 | Get check-in URLs |

### Hotels

| Endpoint | Method | Price | Purpose |
|----------|--------|-------|---------|
| `/api/hotels/list` | GET | $0.03 | List hotels by city |
| `/api/hotels/list/by-geocode` | GET | $0.03 | List hotels by lat/lng |
| `/api/hotels/search` | GET | $0.03 | Search hotel offers |
| `/api/hotels/search/by-hotel` | GET | $0.03 | Search by hotel ID |
| `/api/hotels/offer` | GET | $0.03 | Get offer details |
| `/api/hotels/book` | POST | $0.002 | Book hotel |
| `/api/hotels/autocomplete` | GET | $0.005 | Autocomplete names |
| `/api/hotels/ratings` | GET | $0.05 | Get ratings/reviews |

### Activities

| Endpoint | Method | Price | Purpose |
|----------|--------|-------|---------|
| `/api/activities/search` | GET | $0.05 | Search by lat/lng |
| `/api/activities/by-square` | GET | $0.05 | Search by geographic square |
| `/api/activities/details` | GET | $0.05 | Get activity details |

### Transfers

| Endpoint | Method | Price | Purpose |
|----------|--------|-------|---------|
| `/api/transfers/search` | POST | $0.003 | Search transfers |
| `/api/transfers/book` | POST | $0.002 | Book transfer |
| `/api/transfers/cancel` | POST | $0.002 | Cancel transfer |

### Reference

| Endpoint | Method | Price | Purpose |
|----------|--------|-------|---------|
| `/api/reference/locations` | GET | $0.005 | Search locations |
| `/api/reference/airports` | GET | $0.005 | Find nearby airports |
| `/api/reference/airlines` | GET | $0.005 | Look up airline |
| `/api/reference/airline-routes` | GET | $0.005 | Get airline routes |
| `/api/reference/airport-routes` | GET | $0.005 | Get airport destinations |
| `/api/reference/cities` | GET | $0.005 | Search cities |

## When to Use

- **Flight booking** — Search, price, and book flights
- **Hotel booking** — Find and book hotels
- **Activities** — Discover tours and activities at destinations
- **Airport transfers** — Book private or shared transfers
- **Reference data** — Look up airports, airlines, cities

## Best Practices

- **Search then price then book** — Workflow: flight search → price confirm → book
- **List hotels first** — Get hotel IDs from /hotels/list before searching offers
- **Use GET for simple searches** — Use POST only for multi-city or complex itineraries
- **Check flight status** — Use /flights/status for real-time updates
- **For real-time tracking** — Use obul-stabletravel-flightaware for live flight positions
- **For errors** — See @skills/obul-api-errors/SKILL.md for complete error code reference and troubleshooting
