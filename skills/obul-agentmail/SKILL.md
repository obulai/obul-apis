---
name: obul-agentmail
description: "USE THIS SKILL WHEN: the user wants to create email inboxes for AI agents, send/receive emails programmatically, manage email threads, or build agent-to-agent email communication. Provides pay-per-use email via AgentMail through the Obul proxy."
homepage: https://agentmail.to
metadata:
  obul-skill:
    emoji: "📧"
    requires:
      env: ["OBUL_API_KEY"]
      primaryEnv: "OBUL_API_KEY"
registries: {}
---

# AgentMail

AgentMail is an API-first email platform built for AI agents. Create dedicated email inboxes, send and receive messages, manage threads, and build agent-to-agent communication — all programmatically. Access AgentMail through the Obul proxy. No API key needed — payment is handled automatically via AgentMail's native x402 layer.

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

Base URL: `https://proxy.obul.ai/proxy/https/x402.api.agentmail.to`

To get an Obul API key, sign up at **https://my.obul.ai**.

## Common Operations

### Create Inbox

Create a new email inbox for an AI agent. Each inbox gets a unique email address.

**Pricing:** $2.00

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/x402.api.agentmail.to/v0/inboxes",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "username": "my-agent"
  }
}
```

**Response:** JSON with the created inbox details including its email address and inbox ID.

### Send Email

Send an email from an inbox.

**Pricing:** $0.01

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/x402.api.agentmail.to/v0/inboxes/{inbox_id}/messages/send",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "to": ["recipient@example.com"],
    "subject": "Hello from my agent",
    "text": "This is an automated message from my AI agent."
  }
}
```

**Response:** JSON with the sent message details and message ID.

### List Messages

Retrieve all messages in an inbox.

**Pricing:** Free

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/x402.api.agentmail.to/v0/inboxes/{inbox_id}/messages",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

**Response:** JSON array of messages with sender, subject, body, and timestamps.

### Get Thread

Retrieve a full email thread by ID.

**Pricing:** Free

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/x402.api.agentmail.to/v0/inboxes/{inbox_id}/threads/{thread_id}",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

**Response:** JSON with the thread details and all messages in the conversation.

### Reply to Message

Reply to a specific message in an inbox.

**Pricing:** $0.01

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/x402.api.agentmail.to/v0/inboxes/{inbox_id}/messages/{message_id}/reply",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "text": "Thanks for your message. Here is my reply."
  }
}
```

**Response:** JSON with the reply message details and message ID.

## Endpoint Pricing Reference

| Endpoint                                              | Price | Purpose                          |
|-------------------------------------------------------|-------|----------------------------------|
| `POST /v0/inboxes`                                    | $2.00 | Create a new email inbox         |
| `POST /v0/inboxes/{id}/messages/send`                 | $0.01 | Send an email                    |
| `POST /v0/inboxes/{id}/messages/{mid}/reply`          | $0.01 | Reply to a message               |
| `POST /v0/inboxes/{id}/messages/{mid}/reply-all`      | $0.01 | Reply all to a message           |
| `POST /v0/inboxes/{id}/messages/{mid}/forward`        | $0.01 | Forward a message                |
| `POST /v0/inboxes/{id}/drafts`                        | $0.01 | Create a draft                   |
| `POST /v0/inboxes/{id}/drafts/{did}/send`             | Free  | Send a draft                     |
| `GET /v0/inboxes`                                     | Free  | List all inboxes                 |
| `GET /v0/inboxes/{id}`                                | Free  | Get inbox details                |
| `GET /v0/inboxes/{id}/messages`                       | Free  | List messages in inbox           |
| `GET /v0/inboxes/{id}/messages/{mid}`                 | Free  | Get a specific message           |
| `GET /v0/inboxes/{id}/threads`                        | Free  | List threads in inbox            |
| `GET /v0/inboxes/{id}/threads/{tid}`                  | Free  | Get a specific thread            |
| `PATCH /v0/inboxes/{id}`                              | Free  | Update inbox settings            |
| `DELETE /v0/inboxes/{id}`                             | Free  | Delete an inbox                  |

## When to Use

- **Agent email inboxes** — User needs dedicated email addresses for AI agents
- **Programmatic email** — User wants to send and receive emails via API
- **Thread management** — User needs to track and manage email conversations
- **Agent-to-agent communication** — Building multi-agent systems that communicate via email
- **Email automation** — Automating email workflows without traditional email service setup

## Best Practices

- **Reuse inboxes** — Inbox creation costs $2.00, so create inboxes once and reuse them across sessions
- **Use threads** — Track conversations via threads rather than individual messages for better context
- **Poll for new messages** — Use `GET /v0/inboxes/{id}/messages` to check for incoming mail (reads are free)
- **Draft before sending** — Use drafts to compose messages before sending, especially for complex emails
- **For errors** — See @skills/obul-api-errors/SKILL.md for complete error code reference and troubleshooting


