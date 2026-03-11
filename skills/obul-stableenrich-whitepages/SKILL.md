---
name: obul-stableenrich-whitepages
description: "USE THIS SKILL WHEN: the user wants to search for people by name, phone, or address, or look up property ownership and resident information via StableEnrich."
homepage: https://whitepages.com
metadata:
  obul-skill:
    emoji: "📋"
    requires:
      env: ["OBUL_API_KEY"]
      primaryEnv: "OBUL_API_KEY"
registries: {}
---

# Whitepages (StableEnrich)

Whitepages provides people search and property lookup capabilities. Search for people by name, phone, or address, and get property ownership, resident, and property details through the Obul proxy via StableEnrich.

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

### Person Search

Search for people by name, phone number, or address.

**Pricing:** $0.44

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/stableenrich.dev/api/whitepages/person-search",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "first_name": "John",
    "last_name": "Smith",
    "state_code": "CA"
  }
}
```

**Response:** JSON with person information including name, address, phone number, and associated properties.

### Property Search

Get property ownership, resident, and property details by street address.

**Pricing:** $0.44

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/stableenrich.dev/api/whitepages/property-search",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "street": "123 Main St",
    "city": "San Francisco",
    "state_code": "CA"
  }
}
```

**Response:** JSON with property details including owner information, assessed value, and resident history.

## Endpoint Pricing Reference

| Endpoint | Method | Price | Purpose |
|----------|--------|-------|---------|
| `/api/whitepages/person-search` | POST | $0.44 | Search people by name, phone, address |
| `/api/whitepages/property-search` | POST | $0.44 | Property lookup by address |

## When to Use

- **People lookup** — Find people by name, phone, or address
- **Property research** — Get property ownership and resident information
- **Background checks** — Verify address and property information
- **Lead enrichment** — Add address and property data to leads

## Best Practices

- **Use state_code** — Whitepages requires two-letter state abbreviations (e.g., "CA", "NY") in the `state_code` field. Using `state` instead is silently ignored.
- **Provide more fields** — More search criteria (phone, address) yields better results
- **For errors** — See @skills/obul-api-errors/SKILL.md for complete error code reference and troubleshooting
