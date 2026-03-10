---
name: obul-openmart
description: Local business search, enrichment, and lead intelligence. Search 30M+ US/CA/AU businesses by query, tags, location, reviews, and ownership type.
homepage: https://openmart.ai
metadata:
  obul-skill: "🏪"
  requires.env: OBUL_API_KEY
  requires.primaryEnv: OBUL_API_KEY
registries: {}
---

# Openmart

Local business search, enrichment, and lead intelligence platform. Search over 30 million businesses in the US, Canada, and Australia by query, tags, location, reviews, ownership type, price tier, and revenue. Enrich companies, find decision makers with verified emails and phones, and detect tech stacks.

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

Base URL: `https://proxy.obul.ai/proxy/https/x402.orth.sh/openmart`

To get an Obul API key, sign up at **https://my.obul.ai**.

## Common Operations

### Search Local Businesses

Search local businesses by natural language query with 22+ filter categories.

**Pricing:** $0.01

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/openmart/api/v1/search",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "query": "coffee shops in San Francisco",
    "geo": {"city": "San Francisco", "country": "US"},
    "page_size": 10
  }
}
```

### Enrich Company

Enrich a company by website URL or social media link.

**Pricing:** $0.01

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/openmart/api/v1/enrich_company",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "company_website": "https://example.com"
  }
}
```

### Get Business Records

Fetch full business records by openmart_id or google_place_id.

**Pricing:** $0.01

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/openmart/api/v1/business_records/list/openmart_id?ids=id1,id2",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Search Only IDs

Lightweight search returning only business IDs for quick discovery.

**Pricing:** $0.01

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/openmart/api/v1/search/only_ids",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "query": "restaurants in Los Angeles",
    "geo": {"city": "Los Angeles", "country": "US"}
  }
}
```

## Endpoint Pricing Reference

| Endpoint | Price | Purpose |
|----------|-------|---------|
| `POST /api/v1/search` | $0.01 | Search local businesses |
| `POST /api/v1/enrich_company` | $0.01 | Enrich company |
| `GET /api/v1/business_records/list/{type}` | $0.01 | Get business records |
| `POST /api/v1/search/only_ids` | $0.01 | Search IDs only |

## When to Use

- **Local Lead Generation**: Find local businesses by category and location
- **Business Enrichment**: Enrich business profiles with contact info
- **Market Research**: Analyze local business landscapes
- **Directory Building**: Build business directories
- **Location-Based Sales**: Target businesses in specific geographic areas

## Best Practices

1. **Use Filters**: Leverage geo, tags, and other filters for targeted results
2. **Start with ID Search**: Use only_ids for quick discovery before full enrich
3. **Batch Requests**: Combine multiple IDs for efficient retrieval
4. **For errors** — See @skills/obul-api-errors/SKILL.md for complete error code reference and troubleshooting
