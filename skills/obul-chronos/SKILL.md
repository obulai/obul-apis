---
name: obul-chronos
description: Timezone conversion and current time service via Obul proxy. Provides
  current time lookups, datetime conversions between timezones, and IANA timezone
  listings with accurate pricing for each operation.
endpoints:
- path: /api/health
  method: GET
  price: $0.00
  description: Service status check
- path: /api/now
  method: GET
  price: $0.005
  description: Get current time for timezone
- path: /api/convert
  method: POST
  price: $0.005
  description: Convert datetime between timezones
- path: /api/timezones
  method: GET
  price: $0.005
  description: List supported IANA timezones
metadata:
  obul-skill:
    emoji: 🕐
    requires:
      env:
      - OBUL_API_KEY
    primaryEnv: OBUL_API_KEY
registries: {}
provider: mavs-agent-army
---

# Chronos

Timezone and datetime conversion service through the Obul proxy. Get current time for any timezone, convert datetimes between timezones, and retrieve supported IANA timezone lists.

## Authentication

All requests route through the Obul proxy and require an API key header:

```json
{
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

**Base URL:** `https://proxy.obul.ai/proxy/https/mavs-agent-army.fly.dev/api/chronos/api`

## Common Operations

### Get Current Time

Retrieve the current date and time for any IANA timezone.

**Pricing:** $0.005

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/mavs-agent-army.fly.dev/api/chronos/api/now?timezone=America/New_York",
  "headers": {
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

**Parameters:**
- `timezone` (required): IANA timezone identifier (e.g., `America/New_York`, `Europe/London`, `Asia/Tokyo`)

**Response fields:**
- `datetime`: ISO 8601 formatted datetime (e.g., `2026-02-17T14:30:45.123Z`)
- `timezone`: The requested timezone identifier
- `offset`: UTC offset in hours (e.g., `-5`)

### Convert Datetime Between Timezones

Convert a specific datetime from one timezone to another.

**Pricing:** $0.005

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/mavs-agent-army.fly.dev/api/chronos/api/convert",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "datetime": "2026-02-17T09:00:00",
    "fromTimezone": "America/New_York",
    "toTimezone": "Asia/Tokyo"
  }
}
```

**Request body fields:**
- `datetime` (required): Date and time to convert (ISO 8601 format or `YYYY-MM-DDTHH:mm:ss`)
- `fromTimezone` (required): Source IANA timezone identifier
- `toTimezone` (required): Target IANA timezone identifier

**Response fields:**
- `originalDatetime`: Input datetime
- `fromTimezone`: Source timezone
- `toTimezone`: Target timezone
- `convertedDatetime`: Converted datetime in target timezone
- `fromOffset`: Source timezone UTC offset
- `toOffset`: Target timezone UTC offset

### List Supported Timezones

Retrieve a filtered list of supported IANA timezone identifiers.

**Pricing:** $0.005

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/mavs-agent-army.fly.dev/api/chronos/api/timezones?region=America&limit=50",
  "headers": {
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

**Parameters:**
- `region` (optional): Filter by region prefix (e.g., `America`, `Europe`, `Asia`, `Pacific`)
- `limit` (optional): Maximum number of results to return (default: 50, max: 500)

**Response:** Array of timezone objects with `name` and `region` fields

### Health Check (Free)

Verify service availability before spending credits.

**Pricing:** $0.00

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/mavs-agent-army.fly.dev/api/chronos/api/health",
  "headers": {
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

## When to Use

- User asks "what time is it" or requests current time in a specific location
- Converting meeting times across multiple timezones
- Scheduling events that span different timezones
- Finding valid IANA timezone identifiers for other API calls
- Validating timezone strings before using them in datetime operations

## Best Practices

1. **Always check health first** before expensive operations when possible
2. **Cache timezone lists** – Timezone data changes infrequently; store locally to save costs
3. **Use standard IANA identifiers** – Always use full identifiers like `America/New_York` not abbreviations like `EST`
4. **Include full datetime** – For conversions, provide complete datetime strings to avoid ambiguity
5. **Filter timezone queries** – Use `region` parameter to narrow results instead of fetching all timezones
6. **Handle DST transitions** – Be aware that some timezones observe daylight saving time; conversions handle this automatically
7. **For errors** — See @skills/obul-api-errors/SKILL.md for complete error code reference and troubleshooting

