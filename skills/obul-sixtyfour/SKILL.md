---
name: obul-sixtyfour
description: Build custom research agents to enrich people and company data with real-time signals. Find emails, phones, and company details.
homepage: https://sixtyfour.ai
metadata:
  obul-skill: "🔐"
  requires.env: OBUL_API_KEY
  requires.primaryEnv: OBUL_API_KEY
registries: {}
---

# Sixtyfour

Build custom research agents to enrich people and company data, and surface real-time signals with a simple API call. Find emails, phone numbers, and company details using AI-powered research agents.

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

Base URL: `https://proxy.obul.ai/proxy/https/x402.orth.sh/sixtyfour`

To get an Obul API key, sign up at **https://my.obul.ai**.

## Common Operations

### Enrich Company

Enrich company data with additional information and find associated people.

**Pricing:** $0.10

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/sixtyfour/enrich-company",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "target_company": {"domain": "stripe.com"},
    "struct": {"description": "string", "technologies": "array"},
    "find_people": true,
    "people_focus_prompt": "Find engineering leaders"
  }
}
```

### Enrich Lead

Enrich lead information with additional details.

**Pricing:** $0.10

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/sixtyfour/enrich-lead",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "lead_info": {"email": "user@company.com"},
    "struct": {"name": "string", "title": "string", "company": "string"}
  }
}
```

### Find Phone

Discover phone numbers for leads using AI.

**Pricing:** $0.30

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/sixtyfour/find-phone",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "lead": {"name": "John Doe", "company": "Google", "email": "john@google.com"}
  }
}
```

### Find Email

Find email address for a lead.

**Pricing:** Dynamic

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/sixtyfour/find-email",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "lead": {"name": "John Doe", "company": "Google"},
    "mode": "PROFESSIONAL"
  }
}
```

## Endpoint Pricing Reference

| Endpoint | Price | Purpose |
|----------|-------|---------|
| `POST /enrich-company` | $0.10 | Enrich company data |
| `POST /enrich-lead` | $0.10 | Enrich lead data |
| `POST /find-phone` | $0.30 | Find phone number |
| `POST /find-email` | Dynamic | Find email address |

## When to Use

- **Lead Enrichment**: Enrich leads with contact info and company data
- **Company Research**: Get company details and technologies
- **Contact Discovery**: Find phone numbers and emails for prospects
- **Sales Intelligence**: Build enriched lead lists

## Best Practices

1. **Provide Multiple Inputs**: More input data improves match accuracy
2. **Use Focus Prompts**: Guide research with specific prompts
3. **Select Mode**: Choose PROFESSIONAL vs PERSONAL for email finding
4. **For errors** — See @skills/obul-api-errors/SKILL.md for complete error code reference and troubleshooting
