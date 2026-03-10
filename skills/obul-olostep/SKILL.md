---
name: obul-olostep
description: AI-powered web search, extraction, and custom research agents. Scrape webpages, extract structured data, crawl websites, and build research workflows.
homepage: https://olostep.com
metadata:
  obul-skill: "🕷️"
  requires.env: OBUL_API_KEY
  requires.primaryEnv: OBUL_API_KEY
registries: {}
---

# Olostep

AI-powered web search, extraction, and custom research agents. Scrape webpages, extract structured data with AI, crawl websites at scale, and build custom research agent workflows.

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

Base URL: `https://proxy.obul.ai/proxy/https/x402.orth.sh/olostep`

To get an Obul API key, sign up at **https://my.obul.ai**.

## Common Operations

### Scrape Webpage

Initiate a web page scrape with various extraction options.

**Pricing:** $0.01

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/olostep/v1/scrapes",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "url_to_scrape": "https://example.com",
    "formats": ["markdown", "html"],
    "remove_css_selectors": "default"
  }
}
```

Returns scrape_id for retrieval.

### AI Answer

Get AI to perform research and find answers to questions by searching and browsing.

**Pricing:** $0.05

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/olostep/v1/answers",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "task": "What is the revenue of Stripe in 2023?",
    "json_format": {"revenue": "string", "year": "number"}
  }
}
```

### Get Website Links

Extract all URLs from a website.

**Pricing:** $0.01

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/olostep/v1/maps",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "url": "https://example.com"
  }
}
```

### Start Crawl

Start a website crawl with configurable depth and scope.

**Pricing:** Dynamic

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/olostep/v1/crawls",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "start_url": "https://example.com",
    "max_pages": 10,
    "max_depth": 2
  }
}
```

Returns crawl_id for status checking.

### Batch Processing

Process multiple URLs in a batch.

**Pricing:** Dynamic

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/olostep/v1/batches",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "items": [
      {"url": "https://example.com/page1"},
      {"url": "https://example.com/page2"}
    ]
  }
}
```

### Retrieve Content

Retrieve processed content from batches and crawls.

**Pricing:** Free

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/olostep/v1/retrieve",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "retrieve_id": "{retrieve_id}"
  }
}
```

### Get Scrape Status

Poll for status of a scrape operation.

**Pricing:** Free

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/olostep/v1/scrapes/{scrape_id}",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Get Answer Status

Poll for results of an AI research task.

**Pricing:** Free

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/olostep/v1/answers/{answer_id}",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Get Crawl Status

Poll for status of a website crawl.

**Pricing:** Free

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/olostep/v1/crawls/{crawl_id}",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Get Crawl Pages

Get the list of pages discovered during a crawl.

**Pricing:** Free

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/olostep/v1/crawls/{crawl_id}/pages",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Get Batch Status

Poll for status of a batch processing job.

**Pricing:** Free

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/olostep/v1/batches/{batch_id}",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Get Batch Items

Get the list of processed items from a batch.

**Pricing:** Free

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/olostep/v1/batches/{batch_id}/items",
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
| `POST /v1/scrapes` | $0.01 | Scrape single webpage |
| `GET /v1/scrapes/{id}` | Free | Get scrape status |
| `POST /v1/answers` | $0.05 | AI research task |
| `GET /v1/answers/{id}` | Free | Get answer results |
| `POST /v1/maps` | $0.01 | Extract website links |
| `POST /v1/crawls` | Dynamic | Start website crawl |
| `GET /v1/crawls/{id}` | Free | Get crawl status |
| `GET /v1/crawls/{id}/pages` | Free | Get crawl pages |
| `POST /v1/batches` | Dynamic | Batch processing |
| `GET /v1/batches/{id}` | Free | Get batch status |
| `GET /v1/batches/{id}/items` | Free | Get batch items |
| `POST /v1/retrieve` | Free | Retrieve processed content |

## When to Use

- **Web Scraping**: Extract content from any webpage
- **Data Extraction**: Get structured data from unstructured web content
- **Website Crawling**: Crawl entire websites at scale
- **Research Automation**: Build AI-powered research workflows
- **Batch Processing**: Process multiple URLs efficiently

## Best Practices

1. **Use Transformers**: Use Mercury parser to clean extracted content
2. **Configure Timeouts**: Set appropriate timeouts for complex pages
3. **Crawl Depth**: Start with limited depth to control costs
4. **Batch for Scale**: Use batches for processing many URLs
5. **For errors** — See @skills/obul-api-errors/SKILL.md for complete error code reference and troubleshooting
