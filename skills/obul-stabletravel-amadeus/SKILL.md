---
name: obul-stabletravel-amadeus
description: 'USE THIS SKILL WHEN: the user wants to search and book flights, hotels,
  activities, and airport transfers. Provides pay-per-use travel booking via Amadeus
  through the Obul proxy.'
endpoints:
- path: /api/flights/search
  method: GET, POST
  price: $0.05
  description: Search flight offers
- path: /api/flights/price
  method: POST
  price: $0.03
  description: Confirm flight pricing
- path: /api/flights/book
  method: POST
  price: $0.09
  description: Book a flight
- path: /api/flights/orders
  method: GET
  price: $0.005
  description: Retrieve flight order
- path: /api/flights/orders/cancel
  method: POST
  price: $0.005
  description: Cancel flight order
- path: /api/flights/seatmap
  method: GET, POST
  price: $0.03
  description: Get seat maps
- path: /api/flights/upsell
  method: POST
  price: $0.03
  description: Get upsell offers
- path: /api/flights/availability
  method: POST
  price: $0.03
  description: Check availability
- path: /api/flights/status
  method: GET
  price: $0.005
  description: Get flight status
- path: /api/flights/checkin-links
  method: GET
  price: $0.005
  description: Get check-in URLs
- path: /api/hotels/list
  method: GET
  price: $0.03
  description: List hotels by city
- path: /api/hotels/list/by-geocode
  method: GET
  price: $0.03
  description: List hotels by lat/lng
- path: /api/hotels/search
  method: GET
  price: $0.03
  description: Search hotel offers
- path: /api/hotels/search/by-hotel
  method: GET
  price: $0.03
  description: Search by hotel ID
- path: /api/hotels/offer
  method: GET
  price: $0.03
  description: Get offer details
- path: /api/hotels/book
  method: POST
  price: $0.002
  description: Book hotel
- path: /api/hotels/autocomplete
  method: GET
  price: $0.005
  description: Autocomplete names
- path: /api/hotels/ratings
  method: GET
  price: $0.05
  description: Get ratings/reviews
- path: /api/activities/search
  method: GET
  price: $0.05
  description: Search by lat/lng
- path: /api/activities/by-square
  method: GET
  price: $0.05
  description: Search by geographic square
- path: /api/activities/details
  method: GET
  price: $0.05
  description: Get activity details
- path: /api/transfers/search
  method: POST
  price: $0.003
  description: Search transfers
- path: /api/transfers/book
  method: POST
  price: $0.002
  description: Book transfer
- path: /api/transfers/cancel
  method: POST
  price: $0.002
  description: Cancel transfer
- path: /api/reference/locations
  method: GET
  price: $0.005
  description: Search locations
- path: /api/reference/airports
  method: GET
  price: $0.005
  description: Find nearby airports
- path: /api/reference/airlines
  method: GET
  price: $0.005
  description: Look up airline
- path: /api/reference/airline-routes
  method: GET
  price: $0.005
  description: Get airline routes
- path: /api/reference/airport-routes
  method: GET
  price: $0.005
  description: Get airport destinations
- path: /api/reference/cities
  method: GET
  price: $0.005
  description: Search cities
metadata:
  obul-skill:
    emoji: ✈️
    requires:
      env:
      - OBUL_API_KEY
      primaryEnv: OBUL_API_KEY
registries: {}
provider: stabletravel
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
