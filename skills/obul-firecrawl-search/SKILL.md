---
name: obul-firecrawl-search
description: "USE THIS SKILL WHEN: the user wants to search the web and get scraped content from results. Provides web search with auto-scraped markdown via Firecrawl through the Obul proxy."
homepage: https://www.firecrawl.dev
metadata:
  obul-skill:
    emoji: "🔍"
    requires:
      env: ["OBUL_API_KEY"]
      primaryEnv: "OBUL_API_KEY"
registries: {}
---

# Firecrawl Search

Firecrawl's web search endpoint — search the web and get clean, scraped content from the results in a single call.
Through the Obul proxy, each request is paid individually — no Firecrawl account or API key required.

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

Base URL: `https://proxy.obul.ai/proxy/https/firecrawl.x402endpoints.com`

## Common Operations

### Search the Web

Search the web and get clean, scraped content from the results. Useful for finding and reading pages on a topic without
knowing specific URLs.

**Pricing:** $0.002

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/firecrawl.x402endpoints.com/v1/search",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "query": "firecrawl web scraping API",
    "limit": 5
  }
}
```

**Response:** Array of search results, each containing the page URL, title, and scraped content in clean markdown
format.

### Search with Scrape Options

Search and control how result pages are scraped — request specific formats, include only certain tags, or exclude
elements like navigation.

**Pricing:** $0.002

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/firecrawl.x402endpoints.com/v1/search",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "query": "x402 payment protocol",
    "limit": 3,
    "scrapeOptions": {
      "formats": ["markdown", "links"]
    }
  }
}
```

**Response:** Search results with content in the requested formats. The `links` format returns all URLs found on each
result page.

### Search with Time Filter

Restrict search results to a specific time period using the `tbs` parameter.

**Pricing:** $0.002

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/firecrawl.x402endpoints.com/v1/search",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "query": "x402 ecosystem news",
    "tbs": "qdr:w",
    "lang": "en"
  }
}
```

**Response:** Search results filtered to the specified time period. `tbs` values: `qdr:h` (past hour), `qdr:d` (past
day), `qdr:w` (past week), `qdr:m` (past month).

## Endpoint Pricing Reference

| Endpoint            | Price  | Purpose                                |
|---------------------|--------|----------------------------------------|
| `POST /v1/search`   | $0.002 | Web search with scraped content        |

## When to Use

- **Web research** — Find and read pages on a topic without knowing specific URLs.
- **Current events** — Search for recent news or developments with time filters.
- **Competitive analysis** — Search for information about companies, products, or technologies.
- **Content discovery** — Find relevant pages to scrape or analyze further.

## Best Practices

- **Use `limit` to control cost** — Default is 5 results. Increase for broader research, decrease for quick lookups.
- **Add `scrapeOptions`** — Control output formats (`markdown`, `html`, `links`) to get exactly what you need.
- **Use time filters** — Add `tbs` for time-sensitive queries to get fresh results.
- **Prefer this over raw search + scrape** — Firecrawl search combines both in one call, saving time and cost.
- **For errors** — See @skills/obul-api-errors/SKILL.md for complete error code reference and troubleshooting
