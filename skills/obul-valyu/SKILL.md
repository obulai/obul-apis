---
name: obul-valyu
description: "USE THIS SKILL WHEN: the user wants AI-powered web search, content extraction, or deep research. Valyu provides high-quality content from web and proprietary sources with full-text multimodal retrieval."
homepage: https://valyu.ai
metadata:
  obul-skill:
    emoji: "🔍"
    requires:
      env: ["OBUL_API_KEY"]
      primaryEnv: "OBUL_API_KEY"
registries: {}
---

# Valyu

Valyu's Search API lets your AI search for the information it needs. Access high-quality content from the web and proprietary sources, with full-text multimodal retrieval through the Obul proxy. No API key needed — payment is handled automatically.

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

Base URL: `https://proxy.obul.ai/proxy/https/x402.orth.sh/valyu`

To get an Obul API key, sign up at **https://my.obul.ai**.

## Common Operations

### Search

Search the web, research, and proprietary datasets.

**Pricing:** $0.01

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/valyu/v1/search",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "query": "latest developments in AI agents",
    "max_num_results": 10,
    "search_type": "web"
  }
}
```

**Response:** JSON with search results including content.

### Answer

Get AI-generated answers blended with search results.

**Pricing:** $0.01

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/valyu/v1/answer",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "query": "What are the key trends in quantum computing?",
    "search_type": "web"
  }
}
```

**Response:** JSON with AI-generated answer and cited sources.

### Extract Content

Extract clean, structured content from URLs.

**Pricing:** $0.01

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/valyu/v1/contents",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "urls": ["https://example.com/article"],
    "response_length": "medium"
  }
}
```

**Response:** JSON with extracted content from URLs.

### Deep Research

Create comprehensive research tasks.

**Pricing:** $0.01

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/valyu/v1/deepresearch/tasks",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "query": "Comprehensive analysis of AI in healthcare 2025",
    "mode": "standard"
  }
}
```

**Response:** JSON with research task ID for polling.

## Endpoint Pricing Reference

| Endpoint                                   | Price  | Purpose                              |
|--------------------------------------------|--------|-------------------------------------|
| `POST /v1/search`                        | $0.01  | Web and proprietary search          |
| `POST /v1/answer`                        | $0.01  | AI answer with citations            |
| `POST /v1/contents`                      | $0.01  | Content extraction from URLs         |
| `POST /v1/deepresearch/tasks`            | $0.01  | Create deep research task           |
| `GET /v1/deepresearch/tasks/{id}/status`| $0.01  | Get research task status            |
| `POST /v1/deepresearch/tasks/{id}/update`| $0.01  | Add follow-up instructions          |
| `POST /v1/deepresearch/tasks/{id}/cancel`| $0.01  | Cancel running task                 |
| `DELETE /v1/deepresearch/tasks/{id}/delete`| $0.01 | Delete task                     |
| `POST /v1/deepresearch/batches`         | $0.01  | Create research batch               |
| `GET /v1/deepresearch/batches/{id}`     | $0.01  | Get batch status                   |
| `GET /v1/deepresearch/batches/{id}/tasks`| $0.01 | List tasks in batch              |
| `POST /v1/deepresearch/batches/{id}/cancel`| $0.01 | Cancel batch                    |
| `POST /v1/deepresearch/batches/{id}/tasks`| $0.01 | Add tasks to batch               |

## When to Use

- **Web search** — User needs high-quality search results
- **AI answers** — User wants AI-generated answers with sources
- **Content extraction** — User needs to extract content from URLs
- **Deep research** — User wants comprehensive research reports

## Best Practices

- **Set search_type** — Use 'web', 'news', or 'proprietary' for different sources
- **Configure response_length** — Use 'short', 'medium', 'large', or 'max' for content size
- **Use filters** — Apply date filters, source filters for targeted results
- **Poll for research** — Use returned task ID to poll for deep research completion
- **For errors** — See @skills/obul-api-errors/SKILL.md for complete error code reference and troubleshooting
