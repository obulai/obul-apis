---
name: obul-andi
description: "USE THIS SKILL WHEN: the user wants AI-powered web search with intelligent ranking, instant answers, and result enrichment. Provides AI search via Andi through the Obul proxy."
homepage: https://andisearch.com
metadata:
  obul-skill:
    emoji: "🔍"
    requires:
      env: ["OBUL_API_KEY"]
    primaryEnv: "OBUL_API_KEY"
registries: {}
---

# Andi

Andi provides AI-powered web search with intelligent ranking, instant answers, and enriched results. Get high-quality search results with smart filtering through the Obul proxy.

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

**Base URL:** `https://proxy.obul.ai/proxy/https/x402.orth.sh/andi`

## Common Operations

### Search

Fast, high-quality search API with intelligent ranking and result enrichment.

**Pricing:** $0.01

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/andi/v1/search?q=bitcoin&lang=en&limit=10",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

**Response:** JSON with search results including titles, URLs, snippets, and metadata.

**Query Parameters:**
- `q` (required): Search query or array of up to 5 queries
- `limit`: Number of results (1-100, default: 10)
- `depth`: Search depth - "fast" or "deep"
- `intent`: Search intent - ImageSearchIntent, VideoSearchIntent, NewsSearchIntent, WeatherSearchIntent, ComputationIntent, NavigationalSearchIntent
- `metadata`: Metadata level - "basic" or "full"
- `extracts`: Enable content extracts/highlights (boolean)
- `safe`: Enable safe search filtering (boolean)
- `country`: Country code (US, GB, etc.)
- `language`: Language code (en, es, fr, etc.)
- `dateRange`: Date filter - "day", "week", "month", "year", "90d"
- `includeDomains`: Comma-separated domains to include
- `excludeDomains`: Comma-separated domains to exclude

## Endpoint Pricing Reference

| Endpoint | Price | Purpose |
|----------|-------|---------|
| `GET /v1/search` | $0.01 | AI-powered web search |

## When to Use

- **Intelligent web search** — Get AI-ranked search results with smart filtering
- **Instant answers** — Find quick answers to questions with enriched results
- **Content discovery** — Search with specific intents (images, videos, news, weather)
- **Research queries** — Use deep search mode for comprehensive results
- **Filtered searching** — Include/exclude specific domains or date ranges

## Best Practices

- **Use intent parameter** — Specify ImageSearchIntent, VideoSearchIntent, or NewsSearchIntent for targeted results
- **Adjust depth** — Use "fast" for quick results, "deep" for comprehensive research
- **Filter by date** — Use dateRange to find recent content (day, week, month, year)
- **Domain filtering** — Use includeDomains/excludeDomains to control result sources
- **Safe search** — Enable safe parameter for family-friendly results
- **For errors** — See @skills/obul-api-errors/SKILL.md for complete error code reference and troubleshooting
