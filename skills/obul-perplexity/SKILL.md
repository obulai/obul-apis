---
name: obul-perplexity
description: "USE THIS SKILL WHEN: the user wants AI-powered answers to questions with citations, web search with reasoning, or deep research on topics. Perplexity provides the fastest, cheapest search APIs with source citations."
homepage: https://perplexity.ai
metadata:
  obul-skill:
    emoji: "🧠"
    requires:
      env: ["OBUL_API_KEY"]
      primaryEnv: "OBUL_API_KEY"
registries: {}
---

# Perplexity

Build with the best AI answer engine. Power your products with the fastest, cheapest search APIs out there. Access Perplexity's AI search and chat through the Obul proxy. No API key needed — payment is handled automatically.

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

Base URL: `https://proxy.obul.ai/proxy/https/x402.orth.sh/perplexity`

To get an Obul API key, sign up at **https://my.obul.ai**.

## Common Operations

### Chat Completions

Generate AI responses with web search integration and citations.

**Pricing:** $0.01

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/perplexity/chat/completions",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "model": "sonar",
    "messages": [
      {"role": "user", "content": "What are the latest developments in quantum computing?"}
    ]
  }
}
```

**Response:** JSON with AI-generated answer and cited sources.

### Search

Get ranked search results from Perplexity's index with filtering.

**Pricing:** $0.01

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/perplexity/search",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "query": "latest AI research breakthroughs",
    "max_results": 10
  }
}
```

**Response:** JSON with ranked search results and content snippets.

### Async Chat Completions

Create asynchronous chat completion job for long-running requests.

**Pricing:** $0.01

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/perplexity/async/chat/completions",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "request": {
      "model": "sonar-pro",
      "messages": [{"role": "user", "content": "Deep research on topic"}]
    }
  }
}
```

**Response:** JSON with request_id for polling.

## Endpoint Pricing Reference

| Endpoint                         | Price  | Purpose                              |
|----------------------------------|--------|-------------------------------------|
| `POST /chat/completions`        | $0.01  | AI chat with search citations       |
| `POST /search`                  | $0.01  | Ranked search results               |
| `POST /async/chat/completions` | $0.01  | Async chat for long requests        |
| `GET /async/chat/completions/{id}`| $0.01 | Get async result                  |
| `GET /async/chat/completions`   | $0.01  | List async requests                 |

## When to Use

- **AI answers** — User wants AI-generated answers with source citations
- **Research** — User needs comprehensive research with web sources
- **Search** — User wants ranked search results from Perplexity's index
- **Deep research** — User needs exhaustive research on complex topics

## Best Practices

- **Choose model** — Use 'sonar' for fast, 'sonar-pro' for advanced, 'sonar-deep-research' for exhaustive
- **Use search_mode** — Set 'academic', 'sec', or 'web' for specialized search
- **Set reasoning_effort** — Use 'low', 'medium', or 'high' for deep research models
- **Filter by date** — Use search_recency_filter for recent results
- **For errors** — See @skills/obul-api-errors/SKILL.md for complete error code reference and troubleshooting
