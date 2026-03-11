---
name: obul-scrapegraph
description: AI-powered web scraping and content extraction. Extract structured data, perform web searches, and convert pages to markdown.
homepage: https://scrapegraph.ai
metadata:
  obul-skill: "🤖"
  requires.env: OBUL_API_KEY
  requires.primaryEnv: OBUL_API_KEY
registries: {}
---

# ScrapeGraphAI

AI-powered web scraping and content extraction API. Extract structured data from any website using AI, perform AI-powered web searches, and convert web pages to clean markdown format.

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

Base URL: `https://proxy.obul.ai/proxy/https/x402.orth.sh/scrapegraph`

To get an Obul API key, sign up at **https://my.obul.ai**.

## Common Operations

### Smart Scraper

Extract content from a webpage using AI with a natural language prompt.

**Pricing:** Dynamic

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/scrapegraph/v1/smartscraper",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "website_url": "https://example.com",
    "user_prompt": "Extract all product names and prices"
  }
}
```

Returns request_id for polling.

### Search Scraper

Start an AI-powered web search request.

**Pricing:** Dynamic

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/scrapegraph/v1/searchscraper",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "user_prompt": "What is the latest Python version?"
  }
}
```

### Markdownify

Convert any webpage into clean, readable Markdown format.

**Pricing:** Dynamic

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/scrapegraph/v1/markdownify",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "website_url": "https://example.com"
  }
}
```

### Extract Sitemap

Extract all URLs from a website sitemap.

**Pricing:** Dynamic

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/scrapegraph/v1/sitemap",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "website_url": "https://example.com"
  }
}
```

### Scrape HTML

Extract raw HTML content with JavaScript rendering support.

**Pricing:** Dynamic

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/scrapegraph/v1/scrape",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "website_url": "https://example.com",
    "render_heavy_js": false
  }
}
```

### Crawl Website

Start a web crawl with AI extraction or markdown conversion.

**Pricing:** Dynamic

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/scrapegraph/v1/crawl",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "url": "https://example.com",
    "max_pages": 10,
    "depth": 2
  }
}
```

### Get Smart Scraper Results

Check status and retrieve SmartScraper results.

**Pricing:** Free

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/scrapegraph/v1/smartscraper/{request_id}",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Get Search Scraper Results

Check status and retrieve SearchScraper results.

**Pricing:** Free

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/scrapegraph/v1/searchscraper/{request_id}",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Get Markdownify Results

Check status and retrieve Markdownify results.

**Pricing:** Free

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/scrapegraph/v1/markdownify/{request_id}",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Get Sitemap Results

Check status and retrieve Sitemap results.

**Pricing:** Free

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/scrapegraph/v1/sitemap/{request_id}",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Get Crawl Results

Check status and retrieve crawl results.

**Pricing:** Free

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/scrapegraph/v1/crawl/{task_id}",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

## Endpoint Pricing Reference

| Endpoint | Price | Purpose |
|----------|-------|---------|
| `POST /v1/smartscraper` | Dynamic | AI extract with prompt |
| `GET /v1/smartscraper/{id}` | Free | Get results |
| `POST /v1/searchscraper` | Dynamic | AI web search |
| `GET /v1/searchscraper/{id}` | Free | Get results |
| `POST /v1/markdownify` | Dynamic | Convert to markdown |
| `GET /v1/markdownify/{id}` | Free | Get results |
| `POST /v1/sitemap` | Dynamic | Extract sitemap |
| `GET /v1/sitemap/{id}` | Free | Get results |
| `POST /v1/scrape` | Dynamic | Raw HTML scrape |
| `POST /v1/crawl` | Dynamic | Website crawl |
| `GET /v1/crawl/{id}` | Free | Get crawl results |

## When to Use

- **Data Extraction**: Extract structured data with AI from any website
- **Content Conversion**: Convert web pages to clean markdown
- **Web Search**: Perform AI-powered web searches
- **Crawling**: Crawl entire websites with extraction
- **Research**: Build research pipelines with AI extraction

## Best Practices

1. **Use Output Schema**: Define output_schema for structured extraction
2. **Enable Stealth**: Use stealth mode for sites with bot protection
3. **Handle Pagination**: Use total_pages for multi-page extraction
4. **For errors** — See @skills/obul-api-errors/SKILL.md for complete error code reference and troubleshooting
