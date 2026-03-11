---
name: obul-tavily
description: 'USE THIS SKILL WHEN: the user wants real-time search, web crawling,
  content extraction, or comprehensive research. Tavily provides search, crawl, extract,
  map, and research APIs for AI agents.'
endpoints:
- path: /search
  method: POST
  price: $0.016
  description: Web search
- path: /crawl
  method: POST
  price: Dynamic
  description: Website crawling
- path: /extract
  method: POST
  price: Dynamic
  description: Content extraction
- path: /map
  method: POST
  price: Dynamic
  description: Site mapping
- path: /research
  method: POST
  price: $0.50
  description: Comprehensive research
- path: /research/{id}
  method: GET
  price: Free
  description: Get research results
metadata:
  obul-skill:
    emoji: 🔎
    requires:
      env:
      - OBUL_API_KEY
      primaryEnv: OBUL_API_KEY
registries: {}
provider: orthogonal
---

# Tavily

Real-time search, extraction, and web crawling through a single, secure API. Access Tavily's search, crawl, extract, map, and research capabilities through the Obul proxy. No API key needed — payment is handled automatically.

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

Base URL: `https://proxy.obul.ai/proxy/https/x402.orth.sh/tavily`

To get an Obul API key, sign up at **https://my.obul.ai**.

## Common Operations

### Search

Execute a search query using Tavily Search.

**Pricing:** $0.016

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/tavily/search",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "query": "latest developments in AI agents",
    "search_depth": "advanced",
    "max_results": 10,
    "include_answer": true
  }
}
```

**Response:** JSON with search results including snippets and optional AI answer.

### Crawl

Graph-based website traversal with intelligent discovery.

**Pricing:** Dynamic

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/tavily/crawl",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "url": "https://example.com",
    "max_depth": 2,
    "limit": 50
  }
}
```

**Response:** JSON with crawled content from website.

### Extract

Extract web page content from specific URLs.

**Pricing:** Dynamic

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/tavily/extract",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "urls": ["https://example.com/article"],
    "extract_depth": "basic"
  }
}
```

**Response:** JSON with extracted content from URLs.

### Map

Traverse websites like a graph to generate comprehensive site maps.

**Pricing:** Dynamic

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/tavily/map",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "url": "https://example.com/docs",
    "max_depth": 3,
    "limit": 100
  }
}
```

**Response:** JSON with site map of discovered URLs.

### Research

Comprehensive research with multiple searches and synthesis.

**Pricing:** $0.50

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/tavily/research",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "input": "What is the current state of AI in healthcare?",
    "model": "pro"
  }
}
```

**Response:** JSON with comprehensive research report and citations.

## When to Use

- **Search** — User wants real-time web search with filtering
- **Crawling** — User needs to crawl websites with intelligent discovery
- **Extraction** — User wants to extract content from specific URLs
- **Site mapping** — User needs to discover all pages on a website
- **Research** — User wants comprehensive research reports

## Best Practices

- **Use search_depth** — 'fast' for speed, 'advanced' for best relevance
- **Set max_results** — Control the number of returned results
- **Include_answer** — Get AI-generated answers alongside search results
- **Use filters** — Apply date, domain, and topic filters for targeted results
- **For errors** — See @skills/obul-api-errors/SKILL.md for complete error code reference and troubleshooting
