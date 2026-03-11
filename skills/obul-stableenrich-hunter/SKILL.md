---
name: obul-stableenrich-hunter
description: 'USE THIS SKILL WHEN: the user wants to verify email addresses and check
  deliverability via StableEnrich.'
endpoints:
- path: /api/hunter/email-verifier
  method: POST
  price: $0.03
  description: Verify email deliverability
metadata:
  obul-skill:
    emoji: 🎯
    requires:
      env:
      - OBUL_API_KEY
      primaryEnv: OBUL_API_KEY
registries: {}
provider: stableenrich
---

# Hunter (StableEnrich)

Hunter provides email verification capabilities through the Obul proxy via StableEnrich. Verify whether an email address is deliverable, risky, or invalid.

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

**Base URL:** `https://proxy.obul.ai/proxy/https/stableenrich.dev`

## Common Operations

### Email Verification

Verify whether an email address is deliverable, risky, or invalid. Checks MX records, SMTP response, and mailbox existence.

**Pricing:** $0.03

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/stableenrich.dev/api/hunter/email-verifier",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "email": "john@acme.com"
  }
}
```

**Response:** JSON object with verification result (deliverable, risky, or undeliverable), confidence score, and details about MX records, SMTP check, and whether the address is a catch-all, disposable, or role-based.

## When to Use

- **Email verification** — Check whether an email address is valid before sending outreach
- **Reduce bounce rates** — Verify emails to improve deliverability
- **Lead quality** — Ensure email addresses are valid before adding to marketing campaigns

## Best Practices

- **Verify before sending** — Always verify emails before cold outreach to reduce bounce rates
- **Check confidence scores** — Use the confidence score to determine if an email is safe to use
- **For errors** — See @skills/obul-api-errors/SKILL.md for complete error code reference and troubleshooting
