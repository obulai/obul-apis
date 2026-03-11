---
name: x402engine-web
description: 'USE THIS SKILL WHEN: the user wants a quick single-page scrape to markdown
  or a webpage screenshot. Provides lightweight web scraping and screenshots via x402engine
  through the Obul proxy.'
endpoints:
- path: /api/web/scrape
  method: GET
  price: $0.005
  description: Scrape a URL to clean markdown
- path: /api/web/screenshot
  method: GET
  price: $0.01
  description: Capture a URL as a base64 PNG image
- path: /api/search/web
  method: POST
  price: $0.01
  description: Neural web search with snippets
- path: /api/search/contents
  method: POST
  price: $0.005
  description: Extract clean text from up to 10 URLs
metadata:
  obul-skill:
    emoji: ⚡
    requires:
      env:
      - OBUL_API_KEY
      primaryEnv: OBUL_API_KEY
registries: {}
provider: x402engine
---

# x402engine Web

x402engine provides pay-per-call web scraping and screenshot endpoints. Scrape any URL into clean markdown or capture a
full-page screenshot as a base64 image. Through the Obul proxy, each request is paid individually — no x402engine
account or API key required.

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

Base URL: `https://proxy.obul.ai/proxy/https/x402-gateway-production.up.railway.app`

To get an Obul API key, sign up at **https://my.obul.ai**.

## Common Operations

### Web Scrape

Scrape a single URL and receive clean markdown content. No configuration needed — just pass a URL and get back
well-structured markdown extracted from the page.

**Pricing:** $0.005

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/x402-gateway-production.up.railway.app/api/web/scrape?url=https://example.com/page",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

**Response:** JSON object with the scraped URL and clean markdown content extracted from the page.

### Web Screenshot

Capture a full-page screenshot of any URL. The page is rendered in a browser and returned as a base64-encoded PNG
image.

**Pricing:** $0.01

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/x402-gateway-production.up.railway.app/api/web/screenshot?url=https://example.com/page",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

**Response:** JSON object with the URL and a base64-encoded PNG image of the rendered page. Decode the base64 string
and save as a `.png` file to view.

### Web Search

Perform a neural web search with highlighted snippets. Returns relevant results with context for a given query.

**Pricing:** $0.01

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/x402-gateway-production.up.railway.app/api/search/web",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "query": "x402 payment protocol"
  }
}
```

**Response:** JSON object with search results, each containing title, URL, snippet, and relevance score.

### Extract Web Contents

Extract clean text content from up to 10 URLs in a single request. Useful for batch content extraction.

**Pricing:** $0.005

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/x402-gateway-production.up.railway.app/api/search/contents",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "urls": ["https://example.com/page1", "https://example.com/page2"]
  }
}
```

**Response:** JSON object with extracted text content for each provided URL.

## When to Use

- **Quick single-page scrape** — Fastest and simplest way to get markdown from a URL with zero configuration.
- **Webpage screenshots** — Capture how a page looks in a browser for visual verification or archiving.
- **Batch content extraction** — Extract clean text from multiple URLs in a single request with `/api/search/contents`.
- **Budget-conscious scraping** — At $0.005/scrape and $0.01/screenshot, x402engine is one of the cheapest options.

## Best Practices

- **Use for simple pages** — x402engine web scrape works well for straightforward content pages. For anti-bot protected
  sites, use Zyte instead.
- **Save screenshots properly** — The screenshot response is a base64-encoded image. Decode it with
  `base64 -d > screenshot.png` to save as a viewable file.
- **Batch with contents endpoint** — When you have multiple URLs to extract, use `/api/search/contents` (up to 10 URLs)
  instead of calling `/api/web/scrape` repeatedly.
- **Prefer Firecrawl for complex scraping** — For multi-page crawls, structured extraction, or site mapping, Firecrawl
  is more capable.
- **Use scrape for LLM input** — The markdown output from `/api/web/scrape` is clean and token-efficient, ideal for
  feeding into LLM prompts or RAG pipelines.
- **For errors** — See @skills/obul-api-errors/SKILL.md for complete error code reference and troubleshooting
