---
name: obul-zai
description: "USE THIS SKILL WHEN: the user wants to use Z.ai's GLM models for chat, translation, image generation, video generation, or web search. Z.ai provides GLM-4.5 and GLM-4.6 with advanced reasoning and agentic capabilities."
homepage: https://zhipuai.cn
metadata:
  obul-skill:
    emoji: "🤖"
    requires:
      env: ["OBUL_API_KEY"]
      primaryEnv: "OBUL_API_KEY"
registries: {}
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

## Endpoint Pricing Reference

| Endpoint                            | Price  | Purpose                              |
|-------------------------------------|--------|-------------------------------------|
| `POST /api/paas/v4/chat/completions` | $0.01  | Chat completions with GLM           |
| `POST /api/paas/v4/images/generations` | $0.01  | Image generation (CogView)      |
| `POST /api/paas/v4/videos/generations` | $0.01  | Video generation (CogVideoX)   |
| `POST /api/paas/v4/web_search`    | $0.01  | Web search                          |
| `POST /api/paas/v4/reader`        | $0.01  | URL content extraction              |
| `POST /api/paas/v4/files`         | $0.01  | Upload files                        |
| `POST /api/v1/agents`             | $0.01  | Translation agent                  |
| `POST /api/v1/agents/conversation`| $0.01  | Agent conversation history          |
| `POST /v1/agents/async-result`    | $0.01  | Get async agent result              |
| `GET /api/paas/v4/async-result/{id}` | Free   | Get async result                 |

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
