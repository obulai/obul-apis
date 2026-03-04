---
name: obul-minimaxxing
description: "USE THIS SKILL WHEN: the user wants to generate text using MiniMax M2.5 chat completions. Provides pay-per-request access to MiniMax's large language model via x402 USDC micropayments on Base."
homepage: https://www.minimaxi.me
metadata:
  obul-skill:
    emoji: "🧠"
    requires:
      env: [ "OBUL_API_KEY" ]
      primaryEnv: "OBUL_API_KEY"
registries: {}
---

# MiniMax

MiniMax provides high-performance chat completions through their M2.5 model. Through the Obul proxy, each request is paid
individually in USDC via x402 micropayments on Base — no crypto wallet or gas fees required.

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

Base URL: `https://proxy.obul.ai/proxy/https/chat.minimaxi.me`

To get an Obul API key, sign up at **https://my.obul.ai**.

## Common Operations

### Chat Completions

Send a chat completion request using the OpenAI-compatible API. Supports the full OpenAI chat completion format.

**Pricing:** $0.001 per request

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/chat.minimaxi.me/v1/chat/completions",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "model": "MiniMax-M2.5",
    "messages": [
      {
        "role": "user",
        "content": "Hello, how can you help me today?"
      }
    ],
    "temperature": 0.7,
    "max_tokens": 4096
  }
}
```

**Response:** JSON object with the model's response in the standard OpenAI chat completion format.

### Available Models

| Model | Input Context | Output Context | Description |
|-------|---------------|-----------------|-------------|
| `MiniMax-M2.5` | 200K tokens | 128K tokens | Latest MiniMax chat model |
| `MiniMax-M2` | 100K tokens | 64K tokens | Previous generation model |

### Request Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `model` | string | required | Model to use (e.g., "MiniMax-M2.5") |
| `messages` | array | required | Array of message objects with role and content |
| `temperature` | float | 0.7 | Sampling temperature (0-2) |
| `max_tokens` | integer | 4096 | Maximum tokens to generate |
| `top_p` | float | 1.0 | Nucleus sampling parameter |
| `stream` | boolean | false | Enable streaming responses |

### Message Format

```json
{
  "messages": [
    {
      "role": "system",
      "content": "You are a helpful assistant."
    },
    {
      "role": "user",
      "content": "What is the capital of France?"
    },
    {
      "role": "assistant",
      "content": "The capital of France is Paris."
    },
    {
      "role": "user",
      "content": "What is its population?"
    }
  ]
}
```

## Endpoint Pricing Reference

| Endpoint | Price | Purpose |
|----------|-------|---------|
| `POST /v1/chat/completions` | $0.001/request | Generate chat completions |

## When to Use

- **Text generation** — Generate text for any use case with high-quality completions
- **Conversational AI** — Build chatbots and conversational interfaces
- **Content creation** — Write articles, summaries, code, and more
- **Question answering** — Answer questions with the model's knowledge
- **Reasoning tasks** — Leverage the model's reasoning capabilities

## Best Practices

- **Use appropriate temperature** — Lower values (0.1-0.3) for factual/technical tasks, higher values (0.7-1.0) for creative tasks
- **Set max_tokens appropriately** — Match to your expected output length to avoid unnecessary costs
- **Include system prompts** — Use system messages to set the model's behavior and context
- **Manage context window** — With 200K input context, you can include extensive context; be mindful of costs

## Error Handling

| Error | Cause | Solution |
|-------|-------|----------|
| `402 Payment Required` | Payment not processed or insufficient balance | Verify your OBUL_API_KEY is valid and your account has sufficient balance at my.obul.ai |
| `400 Bad Request` | Missing or invalid request body | Ensure required fields are present and correctly typed |
| `429 Too Many Requests` | Rate limit exceeded | Add a short delay between requests |
| `500 Internal Server Error` | Upstream MiniMax service issue | Wait a few seconds and retry |
| `503 Service Unavailable` | Service temporarily down | Retry after a brief wait |
