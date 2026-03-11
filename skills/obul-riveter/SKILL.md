---
name: obul-riveter
description: Web search, scraping, and data extraction API with structured output.
  Power your product with data from the web.
endpoints:
- path: /v1/scrape
  method: POST
  price: Dynamic
  description: Scrape webpage
- path: /v1/run
  method: POST
  price: Dynamic
  description: Run extraction project
- path: /v1/run_status
  method: GET
  price: Free
  description: Check run status
- path: /v1/run_data
  method: GET
  price: Free
  description: Get run results
- path: /v1/stop_run
  method: POST
  price: Free
  description: Stop running project
metadata:
  obul-skill: 🔧
  requires.env: OBUL_API_KEY
  requires.primaryEnv: OBUL_API_KEY
registries: {}
provider: orthogonal
---

# Riveter

Web search, scraping, and data extraction API. Power your product with data from the web. Agents manage web search, scraping, browser infrastructure, and proxies. Every result has a source.

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

Base URL: `https://proxy.obul.ai/proxy/https/x402.orth.sh/riveter`

To get an Obul API key, sign up at **https://my.obul.ai**.

## Common Operations

### Scrape Webpage

Scrape a webpage and return text content.

**Pricing:** Dynamic

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/riveter/v1/scrape",
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

### Run Data Extraction Project

Define structure of output directly in the API request with input data and output configuration.

**Pricing:** Dynamic

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/riveter/v1/run",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "input": {
      "urls": ["https://example.com/page1", "https://example.com/page2"]
    },
    "output": {
      "title": {
        "prompt": "Extract the page title",
        "format": "text"
      },
      "price": {
        "prompt": "Extract the product price",
        "format": "number"
      }
    }
  }
}
```

Returns run_key for status checking.

### Check Run Status

Check current status of a project run.

**Pricing:** Free

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/riveter/v1/run_status?run_key=uuid",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Get Run Data

Retrieve processed data from a completed project run.

**Pricing:** Free

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/riveter/v1/run_data?run_key=uuid",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Stop Run

Stop a currently running project.

**Pricing:** Free

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/riveter/v1/stop_run?run_key=uuid",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

## When to Use

- **Data Extraction**: Extract structured data from multiple webpages
- **Web Scraping**: Scrape content with proxy infrastructure
- **Batch Processing**: Process multiple URLs with custom extraction
- **Research Automation**: Build research workflows with structured outputs

## Best Practices

1. **Define Output Schema**: Use output configuration for structured results
2. **Use Tools**: Specify tools (web_search, web_scrape, query_pdf) for extraction
3. **Check Status**: Poll run_status for completion before getting data
4. **For errors** — See @skills/obul-api-errors/SKILL.md for complete error code reference and troubleshooting
