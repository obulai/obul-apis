---
name: obul-stableenrich-exa
description: "USE THIS SKILL WHEN: the user wants AI-powered web search with semantic understanding, neural search, content extraction, and research capabilities via the StableEnrich provider."
homepage: https://exa.ai
metadata:
  obul-skill:
    emoji: "🧠"
    requires:
      env: ["OBUL_API_KEY"]
      primaryEnv: "OBUL_API_KEY"
registries: {}
---

# Exa (StableEnrich)

Exa is a search engine made for AIs. It provides semantic web search, neural embeddings-based search, content extraction, and AI-powered research with citations through the Obul proxy via StableEnrich.

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

### Search

Intelligent web search with neural embeddings and semantic understanding. Supports category filtering for company, research paper, news, pdf, github, tweet, personal site, linkedin profile, financial report.

**Pricing:** $0.01

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/stableenrich.dev/api/exa/search",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "query": "latest developments in quantum computing",
    "numResults": 5
  }
}
```

**Response:** JSON array of search results with title, url, highlights, and score.

### Find Similar

Find pages similar to a given URL using semantic similarity.

**Pricing:** $0.01

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/stableenrich.dev/api/exa/find-similar",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "url": "https://openai.com",
    "numResults": 5
  }
}
```

**Response:** JSON array of similar pages with relevance scores.

### Contents

Extract content from specific URLs. Useful for getting full text of pages found via search.

**Pricing:** $0.002

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/stableenrich.dev/api/exa/contents",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "urls": ["https://example.com"]
  }
}
```

**Response:** JSON array of extracted content from each URL.

### Answer

Get an AI-generated answer to a question based on web search with citations.

**Pricing:** $0.01

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/stableenrich.dev/api/exa/answer",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "query": "What is the capital of France?"
  }
}
```

**Response:** JSON with answer text and source citations.

## Endpoint Pricing Reference

| Endpoint | Method | Price | Purpose |
|----------|--------|-------|---------|
| `/api/exa/search` | POST | $0.01 | Semantic web search with optional category filtering |
| `/api/exa/find-similar` | POST | $0.01 | Find similar pages to a URL |
| `/api/exa/contents` | POST | $0.002 | Extract content from URLs |
| `/api/exa/answer` | POST | $0.01 | AI-generated answer with citations |

## When to Use

- **AI-powered search** — When you need semantic understanding of search queries
- **Research** — When you need citations and sources for answers
- **Content extraction** — When you need to scrape content from specific URLs
- **Similar page discovery** — When you want to find related pages to a given URL
- **Category filtering** — When searching for specific types: linkedin profile, company, research paper, news, etc.

## Best Practices

- **Use category filters** — The `category` parameter scopes results to specific types. Use `linkedin profile` for people searches before enriching with Apollo or Clado.
- **Use contents for full text** — Search returns highlights; use contents endpoint for full page extraction
- **Limit results** — Set `numResults` to control costs (max 100)
- **For errors** — See @skills/obul-api-errors/SKILL.md for complete error code reference and troubleshooting
