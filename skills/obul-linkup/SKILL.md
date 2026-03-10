---
name: obul-linkup
description: "USE THIS SKILL WHEN: the user wants web search and content fetching for AI applications with grounded data and source citations. Provides web search via Linkup through the Obul proxy."
homepage: https://linkup.so
metadata:
  obul-skill:
    emoji: "🔗"
    requires:
      env: ["OBUL_API_KEY"]
    primaryEnv: "OBUL_API_KEY"
registries: {}
---

# Linkup

Linkup is a web search engine for AI apps. It provides grounded data to enrich AI output and increase precision, accuracy, and factuality through the Obul proxy.

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

**Base URL:** `https://proxy.obul.ai/proxy/https/x402.orth.sh/linkup`

## Common Operations

### Search

Retrieve web content with natural language queries.

**Pricing:** $0.01

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/linkup/search",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "q": "What are the latest developments in AI safety?",
    "depth": "deep",
    "outputType": "sourcedAnswer",
    "includeSources": true,
    "maxResults": 10
  }
}
```

**Response:** Search results with answers, sources, and citations.

**Body Parameters:**
- `q` (required): Natural language search query
- `depth` (required): "standard" (faster) or "deep" (comprehensive)
- `outputType` (required): "sourcedAnswer", "structured", or "searchResults"
- `structuredOutputSchema`: JSON schema for structured output (when outputType is "structured")
- `includeSources`: Include source URLs in response (boolean)
- `includeImages`: Include images in results (boolean)
- `includeInlineCitations`: Add inline citations to answers (boolean)
- `maxResults`: Maximum results to return (number)
- `fromDate`: Start date in ISO 8601 format (YYYY-MM-DD)
- `toDate`: End date in ISO 8601 format (YYYY-MM-DD)
- `includeDomains`: Array of domains to include
- `excludeDomains`: Array of domains to exclude

### Fetch

Fetch a single webpage from a given URL.

**Pricing:** $0.01

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/linkup/fetch",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "url": "https://example.com/article",
    "renderJs": true,
    "includeRawHtml": false
  }
}
```

**Response:** Page content with rendered text, metadata, and optional raw HTML.

**Body Parameters:**
- `url` (required): URL of the webpage to fetch
- `renderJs`: Render JavaScript content (boolean)
- `includeRawHtml`: Include raw HTML in response (boolean)
- `extractImages`: Extract images from the page (boolean)

## Endpoint Pricing Reference

| Endpoint | Price | Purpose |
|----------|-------|---------|
| `POST /search` | $0.01 | Web search with natural language |
| `POST /fetch` | $0.01 | Fetch single webpage content |

## When to Use

- **AI grounding** — Provide grounded data to improve AI output accuracy
- **Natural language search** — Search using questions instead of keywords
- **Sourced answers** — Get answers with inline citations and source URLs
- **Structured output** — Define custom JSON schemas for structured responses
- **Content extraction** — Fetch and extract content from specific URLs
- **Date-filtered search** — Search within specific time periods

## Best Practices

- **Use natural language** — Phrase queries as questions for best results
- **Choose depth wisely** — "standard" for quick results, "deep" for comprehensive research
- **Enable sources** — Set includeSources: true to get reference URLs
- **Date filtering** — Use fromDate/toDate for time-sensitive queries
- **Domain control** — Use includeDomains/excludeDomains to control sources
- **Structured output** — Define outputType: "structured" with schema for consistent formatting
- **For errors** — See @skills/obul-api-errors/SKILL.md for complete error code reference and troubleshooting
