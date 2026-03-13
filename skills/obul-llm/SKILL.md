---
name: obul-llm
description: "USE THIS SKILL WHEN: the user wants to call an LLM (GPT-4o, Claude, etc.) through Obul's category routing. Obul automatically routes to the cheapest available provider with failover — no need to pick a provider or handle retries."
homepage: https://obul.ai
metadata:
  obul-skill:
    emoji: "🤖"
    requires:
      env: ["OBUL_API_KEY"]
      primaryEnv: "OBUL_API_KEY"
registries: {}
---

# LLM

Access LLM models (GPT-4o, Claude, etc.) through Obul's category-based routing. Obul automatically selects the cheapest available provider, handles failover between providers on errors, and manages all payment negotiation. You never need to pick a provider or handle retries — just specify a category and Obul does the rest.

All LLM requests use the **OpenAI-compatible format** (`/v1/chat/completions`). This is the only supported format. Obul translates requests to each provider's native format behind the scenes.

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

Base URL: `https://proxy.obul.ai/proxy/c`

To get an Obul API key, sign up at **https://my.obul.ai**.

## Discovery

Before making LLM requests, discover which models are available and what they cost.

### List LLM Categories

Fetch all available LLM models.

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/c/llm",
  "headers": {
    "Content-Type": "application/json"
  }
}
```

**Response:**

```json
{
  "categories": [
    {
      "id": "llm/gpt-4o",
      "display_name": "GPT-4o",
      "description": "OpenAI GPT-4o",
      "model": "gpt-4o",
      "provider_count": 3
    },
    {
      "id": "llm/claude-sonnet",
      "display_name": "Claude Sonnet",
      "description": "Anthropic Claude Sonnet",
      "model": "claude-sonnet",
      "provider_count": 2
    }
  ]
}
```

No authentication required.

### Query Pricing

Check current pricing for a specific category. Pricing is dynamic and set by upstream providers.

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/c/llm/gpt-4o/_pricing",
  "headers": {
    "Content-Type": "application/json"
  }
}
```

**Response:** Returns per-provider pricing details for the category. No authentication required. Always query pricing rather than assuming a fixed cost — prices change as providers update their rates and Obul routes to the cheapest option.

## Common Operations

### Chat Completion

Send a chat completion request. Obul routes to the cheapest provider for the chosen category and fails over automatically if a provider errors.

**Pricing:** Varies by category — query the pricing endpoint to check current rates.

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/c/llm/gpt-4o/v1/chat/completions",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "model": "gpt-4o",
    "messages": [
      {"role": "system", "content": "You are a helpful assistant."},
      {"role": "user", "content": "Explain quantum computing in simple terms."}
    ]
  }
}
```

**Response:** Standard OpenAI-compatible chat completion response:

```json
{
  "id": "chatcmpl-abc123",
  "object": "chat.completion",
  "created": 1710000000,
  "model": "gpt-4o",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Quantum computing uses quantum bits (qubits)..."
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 25,
    "completion_tokens": 150,
    "total_tokens": 175
  }
}
```

### Chat Completion with Temperature

Control response creativity with standard OpenAI parameters.

**Pricing:** Varies by category — query the pricing endpoint to check current rates.

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/c/llm/claude-sonnet/v1/chat/completions",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "model": "claude-sonnet",
    "messages": [
      {"role": "user", "content": "Write a haiku about programming."}
    ],
    "temperature": 0.7,
    "max_tokens": 100
  }
}
```

**Response:** Standard OpenAI-compatible chat completion response.

### Streaming Chat Completion

Stream responses token-by-token using server-sent events.

**Pricing:** Varies by category — query the pricing endpoint to check current rates.

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/c/llm/gpt-4o/v1/chat/completions",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "model": "gpt-4o",
    "messages": [
      {"role": "user", "content": "Tell me a story."}
    ],
    "stream": true
  }
}
```

**Response:** Server-sent events stream. Each event is a JSON chunk:

```
data: {"id":"chatcmpl-abc123","object":"chat.completion.chunk","choices":[{"delta":{"content":"Once"},"index":0}]}

data: {"id":"chatcmpl-abc123","object":"chat.completion.chunk","choices":[{"delta":{"content":" upon"},"index":0}]}

data: [DONE]
```

## URL Pattern

All LLM requests follow this pattern:

```
https://proxy.obul.ai/proxy/c/{cat1}/{cat2}/v1/chat/completions
```

Where `{cat1}/{cat2}` is the category ID (e.g., `llm/gpt-4o`, `llm/claude-sonnet`).

The only supported path is `/v1/chat/completions` using the OpenAI chat completions format.

## Response Headers

Obul adds these headers to every proxied response:

| Header                   | Description                                     |
|--------------------------|-------------------------------------------------|
| `X-Obul-Provider`       | ID of the provider that served the request      |
| `X-Obul-Category`       | Category ID used for routing                    |
| `X-Obul-Failover-Count` | Number of failover attempts (0 = first provider)|

## Endpoint Pricing Reference

| Endpoint                                    | Price   | Purpose                                      |
|---------------------------------------------|---------|----------------------------------------------|
| `GET /proxy/c/llm`                          | $0.00   | List available LLM categories                |
| `GET /proxy/c/{cat1}/{cat2}/_pricing`       | $0.00   | Query per-provider pricing for a category    |
| `POST /proxy/c/{cat1}/{cat2}/v1/chat/completions` | Varies  | Chat completion (price set by upstream provider) |

## When to Use

- **LLM access** — User wants to call GPT-4o, Claude, or other LLMs without managing provider API keys
- **Cost optimization** — Obul automatically routes to the cheapest available provider
- **Reliability** — Automatic failover between providers if one is down or errors
- **Simplicity** — Single API key, single format (OpenAI-compatible), no provider selection needed
- **Discovery** — Query `/proxy/c/llm` to list models, `/proxy/c/llm/{model}/_pricing` to check costs

## Best Practices

- **Always use OpenAI format** — All requests must use `/v1/chat/completions` with the OpenAI request body format. This is the only supported format.
- **Set the model field** — The `model` field in the request body should match the category's model (e.g., `gpt-4o` for `llm/gpt-4o`).
- **Query pricing dynamically** — Never hardcode prices. Use `GET /proxy/c/llm/{model}/_pricing` to check current rates before making assumptions.
- **Discover categories first** — Use `GET /proxy/c/llm` to see which models are available rather than guessing category IDs.
- **Trust the routing** — Don't try to pick a specific provider. Obul routes to the cheapest and handles failover automatically.

## Error Handling

| Error                       | Cause                                    | Solution                                                                                  |
|-----------------------------|------------------------------------------|-------------------------------------------------------------------------------------------|
| `401 Unauthorized`          | Missing or invalid API key               | Verify `OBUL_API_KEY` is set and valid.                                                   |
| `402 Payment Required`      | Insufficient balance                     | Top up your account at https://my.obul.ai.                                                |
| `404 Not Found`             | Category does not exist                  | Query `GET /proxy/c/llm` to discover valid categories.                                    |
| `429 Too Many Requests`     | Rate limit exceeded                      | Add a short delay between requests.                                                       |
| `502 Bad Gateway`           | All providers failed                     | All providers in the category errored. Retry after a short delay.                         |
| `500 Internal Server Error` | Obul proxy issue                         | Retry the request. If persistent, check status at https://proxy.obul.ai/healthz.          |
