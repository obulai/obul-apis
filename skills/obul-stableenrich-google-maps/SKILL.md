---
name: obul-stableenrich-google-maps
description: "USE THIS SKILL WHEN: the user wants to search for businesses and places by text query or location, get place details, ratings, reviews, and contact information via StableEnrich."
homepage: https://maps.google.com
metadata:
  obul-skill:
    emoji: "🗺️"
    requires:
      env: ["OBUL_API_KEY"]
      primaryEnv: "OBUL_API_KEY"
registries: {}
---

# Google Maps (StableEnrich)

Google Maps API provides place search, nearby search, and place details through the Obul proxy via StableEnrich. Search for businesses, restaurants, or services by location, get ratings, reviews, contact info, and opening hours.

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

**Base URL:** `https://proxy.obul.ai/proxy/https/stableenrich.dev`

## Common Operations

### Text Search (Full)

Search for places using a text query with full field details (includes ratings, reviews, contact info, and atmosphere data).

**Pricing:** $0.08

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/stableenrich.dev/api/google-maps/text-search/full",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "textQuery": "coffee shops in San Francisco",
    "maxResultCount": 5
  }
}
```

**Response:** Array of place objects with name, address, phone, website, rating, review count, opening hours, and Google Maps place ID.

### Text Search (Partial)

Search for places using a text query with partial field details (basic info only, lower cost).

**Pricing:** $0.02

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/stableenrich.dev/api/google-maps/text-search/partial",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "textQuery": "coffee shops in San Francisco",
    "maxResultCount": 5
  }
}
```

### Nearby Search (Full)

Search for places near a geographic location with full details.

**Pricing:** $0.08

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/stableenrich.dev/api/google-maps/nearby-search/full",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "locationRestriction": {
      "circle": {
        "center": { "latitude": 37.7749, "longitude": -122.4194 },
        "radius": 1000
      }
    },
    "maxResultCount": 5
  }
}
```

### Nearby Search (Partial)

Search for places near a geographic location with partial details.

**Pricing:** $0.02

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/stableenrich.dev/api/google-maps/nearby-search/partial",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "locationRestriction": {
      "circle": {
        "center": { "latitude": 37.7749, "longitude": -122.4194 },
        "radius": 1000
      }
    },
    "maxResultCount": 5
  }
}
```

### Place Details (Full)

Get full details for a specific place by ID.

**Pricing:** $0.05

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/stableenrich.dev/api/google-maps/place-details/full?placeId=ChIJN1t_tDeuEmsRUsoyG83frY4",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Place Details (Partial)

Get partial details for a specific place by ID.

**Pricing:** $0.02

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/stableenrich.dev/api/google-maps/place-details/partial?placeId=ChIJN1t_tDeuEmsRUsoyG83frY4",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

## Endpoint Pricing Reference

| Endpoint | Method | Price | Purpose |
|----------|--------|-------|---------|
| `/api/google-maps/text-search/full` | POST | $0.08 | Search places by text (full details) |
| `/api/google-maps/text-search/partial` | POST | $0.02 | Search places by text (basic info) |
| `/api/google-maps/nearby-search/full` | POST | $0.08 | Search nearby (full details) |
| `/api/google-maps/nearby-search/partial` | POST | $0.02 | Search nearby (basic info) |
| `/api/google-maps/place-details/full` | GET | $0.05 | Get place details by ID |
| `/api/google-maps/place-details/partial` | GET | $0.02 | Get basic place details |

## When to Use

- **Local business search** — Find businesses, restaurants, services by location
- **Place research** — Get ratings, reviews, contact info for specific places
- **Lead enrichment** — Add business location and contact data
- **Opening hours** — Check if a business is open now
- **Atmosphere data** — Get vibe/atmosphere details for venues

## Best Practices

- **Use partial for listings** — Partial endpoints cost 60-75% less; use full only when you need complete details
- **Use excludeFields** — Reduce response size by omitting specific fields
- **Default exclusions** — Google Maps endpoints default to excluding "photos" - pass an empty array to include them
- **For errors** — See @skills/obul-api-errors/SKILL.md for complete error code reference and troubleshooting
