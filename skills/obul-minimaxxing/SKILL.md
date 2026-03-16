---
name: obul-minimaxxing
description: "USE THIS SKILL WHEN: the user wants to access MiniMax M2.5 for chat completions. Provides pay-per-use AI chat completions via MiniMax through the Obul proxy."
homepage: https://minimax.ai
metadata:
  obul-skill:
    emoji: "🤖"
    requires:
      env: [ "OBUL_API_KEY" ]
      primaryEnv: "OBUL_API_KEY"
registries: {}
---

# MiniMax

MiniMax M2.5 provides pay-per-use chat completions through an OpenAI-compatible API. With 200K input and 128K output context
windows, it offers excellent performance for coding, agentic tasks, and office automation. Through the Obul proxy, each
request is paid individually — no MiniMax account or API key required.

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

Base URL: `https://proxy.obul.ai/proxy/https/minimaxxing.x402endpoints.com`

To get an Obul API key, sign up at **https://my.obul.ai**.

## Common Operations

### Chat Completions

Send a chat completion request using the OpenAI-compatible format. Supports streaming and non-streaming responses.

**Pricing:** $0.001

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/minimaxxing.x402endpoints.com/v1/chat/completions",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "model": "MiniMax-M2.5",
    "messages": [
      {
        "role": "user",
        "content": "Hello, how are you?"
      }
    ],
    "stream": false
  }
}
```

**Response:** JSON object with chat completion response in OpenAI-compatible format, containing `choices`, `usage`, and `model` fields.

## Endpoint Pricing Reference

| Endpoint                 | Price   | Purpose                           |
|--------------------------|---------|-----------------------------------|
| `POST /v1/chat/completions` | $0.001 | Chat completion request         |

## When to Use

- **Coding tasks** — MiniMax M2.5 scores 80.2% on SWE-Bench Verified, excellent for code generation and debugging.
- **Long context workflows** — 200K input context window for processing large documents.
- **Agentic workflows** — Strong tool-calling capabilities for autonomous agent tasks.
- **Cost-effective AI** — Pay-per-request with no subscription or account required.

## Best Practices

- **Use streaming for long outputs** — Set `stream: true` for real-time response streaming.
- **Include system prompts** — Use the `messages` array with `role: "system"` for system instructions.
- **Monitor usage** — Check response `usage` field for token consumption.

## Error Handling

| Error                       | Cause                                 | Solution                                                                                      |
|-----------------------------|---------------------------------------|-----------------------------------------------------------------------------------------------|
| `402 Payment Required`      | Payment not processed or insufficient | Verify your OBUL_API_KEY is valid and your account has sufficient balance.                    |
| `400 Bad Request`           | Invalid request format                | Check the request body matches the OpenAI-compatible format.                                   |
| `404 Not Found`             | Invalid endpoint                      | Verify the endpoint URL is correct.                                                            |
| `429 Too Many Requests`     | Rate limit exceeded                   | Add a short delay between requests.                                                           |
| `500 Internal Server Error`  | Upstream service issue                | Wait a few seconds and retry. If persistent, the service may be experiencing downtime.        |
| `503 Service Unavailable`   | Service temporarily down               | Retry after a brief wait.                                                                     |
