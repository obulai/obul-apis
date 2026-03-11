---
name: obul-textbelt
description: "USE THIS SKILL WHEN: the user wants to send SMS messages programmatically or check delivery status. Textbelt provides a simple SMS API without account configuration or logins."
homepage: https://textbelt.com
metadata:
  obul-skill:
    emoji: "💬"
    requires:
      env: ["OBUL_API_KEY"]
      primaryEnv: "OBUL_API_KEY"
registries: {}
---

# Textbelt

Textbelt is an SMS API built for developers who just want to send and receive SMS. Sending an SMS is simple — no account configuration, logins, or recurring billing required. Access Textbelt through the Obul proxy. No API key needed — payment is handled automatically.

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

Base URL: `https://proxy.obul.ai/proxy/https/x402.orth.sh/textbelt`

To get an Obul API key, sign up at **https://my.obul.ai**.

## Common Operations

### Send SMS

Send an SMS message.

**Pricing:** $0.025

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/textbelt/text",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "phone": "+15551234567",
    "message": "Hello from Obul!"
  }
}
```

**Response:** JSON with success status and message ID.

### Check Status

Check the delivery status of a sent SMS.

**Pricing:** Free

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/textbelt/status/{id}",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

**Response:** JSON with delivery status.

## Endpoint Pricing Reference

| Endpoint              | Price   | Purpose                  |
|----------------------|---------|-------------------------|
| `POST /text`         | $0.025  | Send SMS message        |
| `GET /status/{id}`   | Free    | Check delivery status   |

## When to Use

- **SMS sending** — User needs to send SMS messages programmatically
- **Status checking** — User wants to verify SMS delivery
- **Simple integration** — User wants SMS without complex setup

## Best Practices

- **Use E.164 format** — Format phone numbers with country code (e.g., +15551234567)
- **Keep messages under 800 characters** — Maximum message length is 800 characters
- **No URLs in messages** — URLs are not allowed in SMS content
- **Set sender** — Optionally set sender name for business messages
- **For errors** — See @skills/obul-api-errors/SKILL.md for complete error code reference and troubleshooting
