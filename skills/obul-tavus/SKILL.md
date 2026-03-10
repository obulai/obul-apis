---
name: obul-tavus
description: "USE THIS SKILL WHEN: the user wants to create conversational video experiences with AI replicas, generate personalized video messages, or build real-time video interfaces. Tavus provides AI-powered video generation."
homepage: https://tavus.io
metadata:
  obul-skill:
    emoji: "🎥"
    requires:
      env: ["OBUL_API_KEY"]
      primaryEnv: "OBUL_API_KEY"
registries: {}
---

# Tavus

Tavus APIs allow you to create a Conversational Video Interface (CVI), an end-to-end pipeline for building real-time video conversations with an AI replica through the Obul proxy. Each replica is integrated with a persona that enables it to see, hear, and respond like a human. No API key needed — payment is handled automatically.

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

Base URL: `https://proxy.obul.ai/proxy/https/x402.orth.sh/tavus`

To get an Obul API key, sign up at **https://my.obul.ai**.

## Common Operations

### List Personas

Get a list of all available personas.

**Pricing:** $0.01

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/tavus/v2/personas",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

**Response:** JSON with list of available personas and their details.

### Create Conversation

Start a real-time video conversation with an AI replica.

**Pricing:** $0.02

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/tavus/v2/conversations",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "persona_id": "p1b06420cfdc"
  }
}
```

**Response:** JSON with conversation details and connection information.

## Endpoint Pricing Reference

| Endpoint                  | Price  | Purpose                        |
|---------------------------|--------|-------------------------------|
| `GET /v2/personas`       | $0.01  | List available personas       |
| `POST /v2/conversations` | $0.02  | Start video conversation      |

## When to Use

- **AI video** — User wants to create AI-powered video conversations
- **Personalized video** — User needs personalized video messages
- **Real-time video** — User wants to build real-time video interfaces

## Best Practices

- **List personas first** — Get available personas to choose the right one
- **Use correct persona_id** — Provide the persona_id from the list endpoint
- **Understand pricing** — Conversations are billed per use
- **For errors** — See @skills/obul-api-errors/SKILL.md for complete error code reference and troubleshooting
