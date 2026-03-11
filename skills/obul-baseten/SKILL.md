---
name: obul-baseten
description: 'USE THIS SKILL WHEN: the user wants OpenAI-compatible chat completions
  with high-performance LLMs including DeepSeek, GLM, Kimi, and GPT OSS. Provides
  LLM inference via Baseten through the Obul proxy.'
endpoints:
- path: /v1/chat/completions
  method: POST
  price: Dynamic
  description: Chat completions with LLMs (~$0.60/1M tokens)
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

# Baseten

Baseten provides OpenAI-compatible inference API for high-performance LLMs. Access DeepSeek, GLM, Kimi, and GPT OSS models with streaming, tool calling, and structured outputs through the Obul proxy.

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

**Base URL:** `https://proxy.obul.ai/proxy/https/x402.orth.sh/baseten`

## Supported Models

| Model | Slug | Context | Features |
|-------|------|---------|----------|
| DeepSeek V3 0324 | `deepseek-ai/DeepSeek-V3-0324` | 164k | Reasoning |
| DeepSeek V3.1 | `deepseek-ai/DeepSeek-V3.1` | 164k | Reasoning |
| GLM 4.6 (Zhipu) | `zai-org/GLM-4.6` | 200k | Reasoning |
| GLM 4.7 (Zhipu) | `zai-org/GLM-4.7` | 200k | Reasoning |
| Kimi K2 0905 | `moonshotai/Kimi-K2-Instruct-0905` | 128k | Chat |
| Kimi K2 Thinking | `moonshotai/Kimi-K2-Thinking` | 262k | Reasoning |
| Kimi K2.5 | `moonshotai/Kimi-K2.5` | 262k | Chat |
| OpenAI GPT OSS 120B | `openai/gpt-oss-120b` | 128k | Chat |

## Common Operations

### Chat Completions

Create a chat completion using OpenAI-compatible API.

**Pricing:** Dynamic (~$0.60/1M tokens)

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/baseten/v1/chat/completions",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "model": "deepseek-ai/DeepSeek-V3.1",
    "messages": [
      {"role": "user", "content": "Explain quantum computing in simple terms"}
    ],
    "temperature": 0.7,
    "max_tokens": 1000,
    "stream": false
  }
}
```

**Response:** OpenAI-compatible response with generated text, usage stats, and finish reason.

**Body Parameters:**
- `model` (required): Model slug (e.g., "deepseek-ai/DeepSeek-V3.1")
- `messages` (required): Array of message objects with role and content
- `temperature`: Sampling temperature (0-4, default: varies by model)
- `max_tokens`: Maximum tokens to generate (default: 4096)
- `stream`: Stream responses as server-sent events (boolean)
- `tools`: Array of function definitions for tool calling
- `tool_choice`: Tool calling mode ("auto", "none", or specific function)
- `reasoning_effort`: Reasoning depth for supported models ("low", "medium", "high")
- `top_p`: Nucleus sampling (0-1)
- `frequency_penalty`: Penalize by frequency (-2 to 2)
- `presence_penalty`: Penalize by presence (-2 to 2)
- `stop`: Stop sequences

## When to Use

- **High-performance LLM inference** — Access state-of-the-art models like DeepSeek V3 and Kimi K2
- **Reasoning tasks** — Use reasoning models (DeepSeek, GLM, Kimi Thinking) with reasoning_effort control
- **OpenAI compatibility** — Drop-in replacement for OpenAI API with same interface
- **Long context** — Models with up to 262k context windows for large documents
- **Tool calling** — Build agents with function calling capabilities
- **Streaming responses** — Real-time token streaming for interactive applications

## Best Practices

- **Choose models by task** — DeepSeek/GLM for reasoning, Kimi/GPT OSS for general chat
- **Use reasoning_effort** — Control thinking depth on reasoning models (low/medium/high)
- **Set appropriate temperature** — Lower for factual tasks, higher for creative tasks
- **Enable streaming** — Set stream: true for real-time responses in UI applications
- **Monitor token usage** — Dynamic pricing varies by model and token count
- **For errors** — See @skills/obul-api-errors/SKILL.md for complete error code reference and troubleshooting
