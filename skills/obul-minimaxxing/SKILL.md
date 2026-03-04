---
name: obul-minimaxxing
description: "USE THIS SKILL WHEN: the user wants to generate text or images using MiniMax models. Provides pay-per-request access to MiniMax's LLM and image generation models via x402 USDC micropayments on Base."
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

MiniMax provides high-performance chat completions and image generation through their M2.5 model. Through the Obul proxy, each request is paid individually in USDC via x402 micropayments on Base — no crypto wallet or gas fees required.

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

Send a chat completion request using the OpenAI-compatible API.

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
        "content": "Hello"
      }
    ]
  }
}
```

### List Models

Get available models.

**Pricing:** $0.001

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/chat.minimaxi.me/v1/models",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Embeddings

Generate embeddings for text.

**Pricing:** $0.001

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/chat.minimaxi.me/v1/embeddings",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "model": "embedding-01",
    "input": "Text to embed"
  }
}
```

### Image Generation

Generate images from text prompts.

**Pricing:** $0.015+

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/chat.minimaxi.me/v1/images/generations",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "model": "minimax-image-01",
    "prompt": "A beautiful sunset",
    "n": 1,
    "size": "1024x1024"
  }
}
```

## Available Models

| Model | Description |
|-------|-------------|
| `MiniMax-M2.5` | Latest chat model (200K input / 128K output) |
| `MiniMax-M2` | Previous generation (100K input / 64K output) |
| `embedding-01` | Text embeddings model |
| `minimax-image-01` | Image generation model |

## Endpoint Pricing Reference

| Endpoint | Price | Purpose |
|----------|-------|---------|
| `POST /v1/chat/completions` | $0.001/request | Chat completions |
| `GET /v1/models` | $0.001 | List available models |
| `POST /v1/embeddings` | $0.001 | Generate embeddings |
| `POST /v1/images/generations` | $0.015+ | Generate images |

## When to Use

- **Text generation** — Generate text for any use case
- **Conversational AI** — Build chatbots
- **Content creation** — Write articles, summaries, code
- **Embeddings** — Get vector representations of text
- **Image generation** — Create images from text prompts

## Error Handling

| Error | Cause | Solution |
|-------|-------|----------|
| `402 Payment Required` | Insufficient balance | Verify your OBUL_API_KEY is valid at my.obul.ai |
| `400 Bad Request` | Invalid request | Ensure required fields are present |
| `429 Too Many Requests` | Rate limit exceeded | Add delay between requests |
