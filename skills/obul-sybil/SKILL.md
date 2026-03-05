---
name: obul-sybil
description: Unified search API combining Exa web search and xAI Grok capabilities. Search the web, X/Twitter, or both simultaneously with structured output support, reasoning modes, and automatic truncation handling.
homepage: https://mavs-agent-army.fly.dev/api/sibyl
metadata:
  obul-skill:
    emoji: "🔮"
    requires:
      env: ["OBUL_API_KEY"]
    primaryEnv: "OBUL_API_KEY"
registries: {}
---

# Sybil

Unified search service through the Obul proxy. Access Exa's semantic web search and xAI's Grok (web + X/Twitter) from a single API with normalized citations, schema support, and intelligent truncation handling.

## Authentication

All requests route through the Obul proxy and require an API key header:

```json
{
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

**Base URL:** `https://proxy.obul.ai/proxy/https/mavs-agent-army.fly.dev/api/sibyl/api`

## Async Request Pattern

All search endpoints use an async request/polling pattern:

1. **POST** to start a task → returns `{ requestId }` with HTTP **202**
2. **GET** `/status?requestId=xxx` to poll → returns `{ status, result }`
3. Status flow: `pending` → `processing` → `completed` / `failed`

## Common Operations

### Health Check (Free)

Verify service availability before spending credits.

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/mavs-agent-army.fly.dev/api/sibyl/api/health",
  "headers": {
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Status Polling

Check the status of an async request.

**Pricing:** $0.0001

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/mavs-agent-army.fly.dev/api/sibyl/api/status?requestId=YOUR_REQUEST_ID",
  "headers": {
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Exa Web Search

Raw semantic search results from Exa with domain filtering.

**Pricing:** $0.02

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/mavs-agent-army.fly.dev/api/sibyl/api/search/exa",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "query": "latest AI research",
    "options": {
      "numResults": 10,
      "domains": {
        "allow": ["arxiv.org", "openai.com"],
        "block": ["example.com"]
      }
    }
  }
}
```

### Exa Answer (RAG with Schema)

Get synthesized answers with optional structured output via JSON Schema.

**Pricing:** $0.01

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/mavs-agent-army.fly.dev/api/sibyl/api/answer/exa",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "query": "What are the top 3 AI trends?",
    "systemPrompt": "Analyze and return structured data",
    "outputSchema": {
      "type": "object",
      "properties": {
        "trends": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "name": {"type": "string"},
              "impact_score": {"type": "number"}
            }
          }
        }
      },
      "required": ["trends"]
    }
  }
}
```

### Grok Web Search

Real-time web search via xAI's Grok. Max 2400 tokens by default.

**Pricing:** $0.06 (fast), $0.08 (thinking)

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/mavs-agent-army.fly.dev/api/sibyl/api/search/grok-web",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "query": "Analyze the implications of quantum computing on cryptography",
    "systemPrompt": "Provide deep technical analysis",
    "outputSchema": {
      "type": "object",
      "properties": {
        "sentiment": {"type": "string", "enum": ["bullish", "bearish", "neutral"]},
        "key_factors": {"type": "array", "items": {"type": "string"}}
      }
    },
    "options": {
      "domains": {
        "allow": ["bloomberg.com", "reuters.com"]
      }
    }
  }
}
```

**With reasoning/thinking mode:**

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/mavs-agent-army.fly.dev/api/sibyl/api/search/grok-web/thinking",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "query": "Analyze the implications of quantum computing on cryptography",
    "systemPrompt": "Provide deep technical analysis"
  }
}
```

### Grok X (Twitter) Search

Search X/Twitter posts with optional handle filtering. Max 2400 tokens by default.

**Pricing:** $0.06 (fast), $0.08 (thinking)

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/mavs-agent-army.fly.dev/api/sibyl/api/search/grok-x",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "query": "Summarize sentiment about AI regulation",
    "options": {
      "dateRange": {"from": "2025-01-01", "to": "2025-12-31"},
      "includeImages": true
    }
  }
}
```

### Grok Combined (Web + X)

Search both web and X/Twitter simultaneously. Max 2400 tokens by default.

**Pricing:** $0.10 (fast), $0.12 (thinking)

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/mavs-agent-army.fly.dev/api/sibyl/api/search/grok-combined",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "query": "What is the reaction to the latest iPhone release?",
    "systemPrompt": "Compare news coverage with social media sentiment",
    "outputSchema": {
      "type": "object",
      "properties": {
        "facts": {"type": "array", "items": {"type": "string"}},
        "sentiment": {"type": "string"},
        "sources": {"type": "array", "items": {"type": "string"}}
      }
    },
    "options": {
      "domains": {
        "allow": ["techcrunch.com", "theverge.com"]
      },
      "includeImages": true
    }
  }
}
```

### Grok Combined MAX (8000 tokens)

For longer responses that need more than 2400 tokens. Use when you need comprehensive, detailed answers.

**Pricing:** $0.15 (fast), $0.18 (thinking)

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/mavs-agent-army.fly.dev/api/sibyl/api/search/grok-combined/max",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "query": "Give me a comprehensive overview of AI development in 2026 including major breakthroughs, key players, market trends, and future predictions"
  }
}
```

**With thinking mode:**

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/mavs-agent-army.fly.dev/api/sibyl/api/search/grok-combined/thinking/max",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "query": "Provide an in-depth analysis of the current state of quantum computing and its potential impact on cryptography"
  }
}
```

## Response Format

### Standard Response

```json
{
  "requestId": "uuid-here",
  "status": "pending"
}
```

### Polling Response

```json
{
  "status": "completed",
  "result": {
    "content": "Search results or structured object",
    "citations": [
      {
        "id": "unique-id",
        "title": "Article Title",
        "url": "https://example.com/article",
        "publishedDate": "2025-01-15",
        "author": "Author Name",
        "snippet": "Article excerpt...",
        "source": "exa" | "web" | "x"
      }
    ],
    "metadata": {
      "provider": "exa" | "grok",
      "mode": "exa-search" | "exa-answer" | "grok-web" | "grok-x" | "grok-combined",
      "tokens": {"input": 100, "output": 500, "reasoning": 200},
      "latency": 1234
    }
  }
}
```

### Truncation Response

When a response exceeds the token limit (2400 for regular endpoints), the API returns partial results with a warning:

```json
{
  "status": "completed",
  "result": {
    "content": "...truncated content...",
    "citations": [...],
    "metadata": {...},
    "warning": "Response was truncated due to token limit (2400 tokens). Use /max endpoint for full response up to 8000 tokens.",
    "truncated": true,
    "maxEndpoint": "/api/search/grok-combined/max"
  }
}
```

## Endpoint Pricing Reference

| Endpoint | Price | Tokens | Purpose |
|----------|-------|--------|---------|
| `GET /api/health` | $0.00 | - | Service status check |
| `GET /api/status` | $0.0001 | - | Poll async request |
| `POST /api/search/exa` | $0.05 | - | Exa raw web search |
| `POST /api/answer/exa` | $0.05 | - | Exa RAG with schema |
| `POST /api/search/grok-web` | $0.06 | 2400 | Grok web search (fast) |
| `POST /api/search/grok-web/thinking` | $0.08 | 2400 | Grok web + reasoning |
| `POST /api/search/grok-x` | $0.06 | 2400 | Grok X/Twitter (fast) |
| `POST /api/search/grok-x/thinking` | $0.08 | 2400 | Grok X + reasoning |
| `POST /api/search/grok-combined` | $0.10 | 2400 | Web + X (fast) |
| `POST /api/search/grok-combined/thinking` | $0.12 | 2400 | Combined + reasoning |
| `POST /api/search/grok-combined/max` | $0.15 | 8000 | Web + X max tokens |
| `POST /api/search/grok-combined/thinking/max` | $0.18 | 8000 | Combined + reasoning max |

## Token Limits

- **Regular endpoints**: 2,400 tokens max
- **MAX endpoints**: 8,000 tokens max

When a response is truncated, use the `/max` endpoint for full results.

## When to Use

- **Exa Search**: Deep semantic web search, research papers, technical documentation
- **Exa Answer**: When you need synthesized answers with citations
- **Grok Web**: Real-time web search, current events, breaking news
- **Grok X**: Social media sentiment, public opinion, trending topics
- **Grok Combined**: Comprehensive research requiring both news and social context
- **Thinking Mode**: Complex analysis requiring reasoning (e.g., investment analysis, technical comparisons)
- **MAX Endpoints**: When you need detailed, comprehensive responses (>2400 tokens)
- **Schema Output**: When you need structured, parseable data instead of free text

## Best Practices

1. **Start with health check** before expensive operations
2. **Use POST for all search requests** - enables full options and schema support
3. **Check for truncation** - If `truncated: true`, use the `/max` endpoint
4. **Use MAX endpoints proactively** - If you need detailed answers, start with `/max`
5. **Prefer Exa for research** - Better for academic/technical content
6. **Prefer Grok for real-time** - Better for current events and social media
7. **Use domain filtering** - Narrow results to trusted sources with `allow` parameter
8. **Use schema for structured data** - Ensures consistent, parseable responses
9. **Reserve thinking mode** for complex analysis (costs more but provides reasoning)
10. **Handle citations** - Always display or store citations for attribution

## Error Handling

| Error | Cause | Solution |
|-------|-------|----------|
| `VALIDATION` | Missing query | Include required `query` field |
| `PARSE_ERROR` | Invalid JSON in POST body | Check JSON syntax |
| `EXA_ERROR` | Exa API failure | Check API key or retry |
| `XAI_ERROR` | xAI/Grok API failure | Check API key or retry |
| `INVALID_MODE` | Unknown search mode | Use valid mode from documentation |
| HTTP 429 | Rate limit exceeded | Back off and retry |
| HTTP 401 | Invalid API key | Verify x-obul-api-key header |
| HTTP 500 | Server error | Retry or contact support |