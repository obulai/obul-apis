---
name: obul-zai
description: 'USE THIS SKILL WHEN: the user wants to use Z.ai''s GLM models for chat,
  translation, image generation, video generation, or web search. Z.ai provides GLM-4.5
  and GLM-4.6 with advanced reasoning and agentic capabilities.'
endpoints:
- path: /api/paas/v4/chat/completions
  method: POST
  price: $0.01
  description: Chat completions with GLM
- path: /api/paas/v4/images/generations
  method: POST
  price: $0.01
  description: Image generation (CogView)
- path: /api/paas/v4/videos/generations
  method: POST
  price: $0.01
  description: Video generation (CogVideoX)
- path: /api/paas/v4/web_search
  method: POST
  price: $0.01
  description: Web search
- path: /api/paas/v4/reader
  method: POST
  price: $0.01
  description: URL content extraction
- path: /api/paas/v4/files
  method: POST
  price: $0.01
  description: Upload files
- path: /api/v1/agents
  method: POST
  price: $0.01
  description: Translation agent
- path: /api/v1/agents/conversation
  method: POST
  price: $0.01
  description: Agent conversation history
- path: /v1/agents/async-result
  method: POST
  price: $0.01
  description: Get async agent result
- path: /api/paas/v4/async-result/{id}
  method: GET
  price: Free
  description: Get async result
metadata:
  obul-skill:
    emoji: 🤖
    requires:
      env:
      - OBUL_API_KEY
      primaryEnv: OBUL_API_KEY
registries: {}
provider: orthogonal
---

# Z.ai

Z.ai's GLM series large language models, including GLM-4.5 and GLM-4.6, focus on advanced reasoning, coding, and agentic capabilities through a unique Mixture-of-Experts (MoE) architecture through the Obul proxy. No API key needed — payment is handled automatically.

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

Base URL: `https://proxy.obul.ai/proxy/https/x402.orth.sh/zai`

To get an Obul API key, sign up at **https://my.obul.ai**.

## Common Operations

### Chat Completions

Create chat completion with GLM models.

**Pricing:** $0.01

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/zai/api/paas/v4/chat/completions",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "model": "glm-4",
    "messages": [
      {"role": "user", "content": "What are the latest developments in AI?"}
    ]
  }
}
```

**Response:** JSON with AI-generated response.

### Generate Images

Generate images from text prompts using CogView.

**Pricing:** $0.01

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/zai/api/paas/v4/images/generations",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "model": "CogView-4-250304",
    "prompt": "A beautiful sunset over mountains"
  }
}
```

**Response:** JSON with generated image URLs.

### Generate Videos

Generate videos from text or images using CogVideoX.

**Pricing:** $0.01

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/zai/api/paas/v4/videos/generations",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "model": "cogvideox-3",
    "prompt": "A cat playing with a ball"
  }
}
```

**Response:** JSON with generated video.

### Web Search

Search the web for AI-powered results.

**Pricing:** $0.01

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/zai/api/paas/v4/web_search",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "search_engine": "search-prime",
    "search_query": "latest AI news"
  }
}
```

**Response:** JSON with search results.

### Read URL

Read and parse content from URLs.

**Pricing:** $0.01

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/zai/api/paas/v4/reader",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "url": "https://example.com/article",
    "return_format": "markdown"
  }
}
```

**Response:** JSON with extracted content.

### Upload File

Upload auxiliary files for translation or other purposes.

**Pricing:** $0.01

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/zai/api/paas/v4/files",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "purpose": "agent",
    "file": "file_content_here"
  }
}
```

**Response:** JSON with file upload confirmation.

### Translation Agent

Use the general translation API for multilingual translation.

**Pricing:** $0.01

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/zai/api/v1/agents",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "agent_id": "general_translation",
    "messages": [{"role": "user", "content": "Translate to Spanish: Hello world"}]
  }
}
```

**Response:** JSON with translated content.

## When to Use

- **Chat** — User wants to use GLM models for conversation
- **Image generation** — User needs images from CogView models
- **Video generation** — User wants to create videos from text/images
- **Web search** — User needs AI-powered web search
- **Content extraction** — User wants to extract content from URLs

## Best Practices

- **Choose model** — Use glm-4, glm-4.5, or glm-4.6 for different capabilities
- **Set temperature** — Control randomness (0.0-1.0)
- **Enable thinking** — Use thinking parameter for chain-of-thought
- **Use tools** — Provide function definitions for tool use
- **For errors** — See @skills/obul-api-errors/SKILL.md for complete error code reference and troubleshooting
