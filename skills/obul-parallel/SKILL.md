---
name: obul-parallel
description: 'USE THIS SKILL WHEN: the user wants to perform web research, extract
  content from URLs, run AI-powered tasks, or use FindAll for comprehensive entity
  discovery. Parallel provides purpose-built APIs for AI agents.'
endpoints:
- path: /v1beta/search
  method: POST
  price: $0.01
  description: Web search
- path: /v1beta/extract
  method: POST
  price: $0.01
  description: Extract content from URLs
- path: /chat/completions
  method: POST
  price: $0.01
  description: Chat completions for research
- path: /v1beta/findall/runs
  method: POST
  price: $0.01
  description: Start FindAll entity discovery
- path: /v1beta/findall/ingest
  method: POST
  price: $0.01
  description: Generate FindAll spec
- path: /v1/tasks/runs
  method: POST
  price: $0.01
  description: Start task run
- path: /v1beta/findall/runs/{id}
  method: GET
  price: Free
  description: Get FindAll run status
- path: /v1beta/findall/runs/{id}/result
  method: GET
  price: Free
  description: Get FindAll result
- path: /v1beta/findall/runs/{id}/cancel
  method: POST
  price: Free
  description: Cancel FindAll run
- path: /v1/tasks/runs/{id}
  method: GET
  price: Free
  description: Get task run status
- path: /v1/tasks/runs/{id}/result
  method: GET
  price: Free
  description: Get task result
- path: /v1/tasks/runs/{id}/input
  method: GET
  price: Free
  description: Get task input
metadata:
  obul-skill:
    emoji: ⚡
    requires:
      env:
      - OBUL_API_KEY
      primaryEnv: OBUL_API_KEY
registries: {}
provider: orthogonal
---

# Parallel

A web API purpose-built for AIs. Powering millions of daily requests through the Obul proxy. Supports web search, content extraction, chat completions, and FindAll entity discovery. No API key needed — payment is handled automatically.

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

Base URL: `https://proxy.obul.ai/proxy/https/x402.orth.sh/parallel`

To get an Obul API key, sign up at **https://my.obul.ai**.

## Common Operations

### Web Search

Search the web with intelligent processing.

**Pricing:** $0.01

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/parallel/v1beta/search",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "objective": "Find the latest developments in AI agents",
    "max_results": 10
  }
}
```

**Response:** JSON with search results including excerpts and sources.

### Extract Content

Extract relevant content from specific web URLs.

**Pricing:** $0.01

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/parallel/v1beta/extract",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "urls": ["https://example.com/article"],
    "objective": "Extract key information about the topic"
  }
}
```

**Response:** JSON with extracted content from URLs.

### Chat Completions

OpenAI-compatible chat API for web research.

**Pricing:** $0.01

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/parallel/chat/completions",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "model": "speed",
    "messages": [{"role": "user", "content": "What are the latest AI news?"}]
  }
}
```

**Response:** JSON with chat completion response.

### Start FindAll Run

Start a FindAll run for comprehensive entity discovery.

**Pricing:** $0.01

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/parallel/v1beta/findall/runs",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "objective": "Find all AI companies",
    "entity_type": "company",
    "match_limit": 50,
    "generator": "core"
  }
}
```

**Response:** JSON with run object and run_id for polling.

### Ingest FindAll

Transform a natural language search objective into a structured FindAll spec.

**Pricing:** $0.01

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/parallel/v1beta/findall/ingest",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "objective": "Find all AI companies in Silicon Valley"
  }
}
```

**Response:** JSON with generated FindAll specification.

### Start Task Run

Initiate a task run for processing.

**Pricing:** $0.01

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/parallel/v1/tasks/runs",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "processor": "web-scraper",
    "input": "https://example.com"
  }
}
```

**Response:** JSON with run object and run_id.

## When to Use

- **Web research** — User needs comprehensive web search with extraction
- **Content extraction** — User wants to extract content from specific URLs
- **AI chat** — User needs chat completions with research capabilities
- **Entity discovery** — User wants to find all entities matching criteria (FindAll)

## Best Practices

- **Use objective** — Describe what you're looking for in natural language
- **Set match limits** — Use `match_limit` to control result count (5-1000)
- **Choose generator** — Use 'base', 'core', 'pro', or 'preview' for different quality/speed
- **Poll for results** — Use the returned run_id to poll for completion
- **For errors** — See @skills/obul-api-errors/SKILL.md for complete error code reference and troubleshooting
