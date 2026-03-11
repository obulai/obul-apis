---
name: obul-stableenrich-clado
description: 'USE THIS SKILL WHEN: the user wants to scrape LinkedIn profiles or enrich
  contact information from LinkedIn URL, email, or phone number via StableEnrich.'
endpoints:
- path: /api/clado/linkedin-scrape
  method: POST
  price: $0.04
  description: Scrape full LinkedIn profile
- path: /api/clado/contacts-enrich
  method: POST
  price: $0.20
  description: Enrich contact by LinkedIn URL, email, or phone
metadata:
  obul-skill:
    emoji: 💼
    requires:
      env:
      - OBUL_API_KEY
      primaryEnv: OBUL_API_KEY
registries: {}
provider: stableenrich
---

# Clado (StableEnrich)

Clado provides LinkedIn scraping and contact enrichment capabilities through the Obul proxy via StableEnrich. Useful as a fallback when Apollo doesn't return personal emails, phone numbers, or data for newer LinkedIn accounts.

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

### LinkedIn Scrape

Scrape full LinkedIn profile data including experience, education, skills, and posts.

**Pricing:** $0.04

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/stableenrich.dev/api/clado/linkedin-scrape",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "linkedin_url": "https://www.linkedin.com/in/satyanadella"
  }
}
```

**Response:** JSON object with the person's headline, current position, work experience history, education, skills, and profile summary.

### Contacts Enrich

Enrich contact information from LinkedIn URL, email, or phone number. Must provide exactly one of: linkedin_url, email, or phone.

**Pricing:** $0.20

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/stableenrich.dev/api/clado/contacts-enrich",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "linkedin_url": "https://www.linkedin.com/in/satyanadella"
  }
}
```

**Response:** JSON object with contact information including email, phone, and social profiles.

## When to Use

- **LinkedIn research** — Get full profile data including experience, education, skills
- **Contact enrichment** — When Apollo doesn't return email/phone, use Clado as fallback
- **Newer accounts** — Clado often has better data for newer LinkedIn accounts
- **Personal emails** — Better at finding personal email addresses than Apollo

## Best Practices

- **Use as Apollo fallback** — Clado is particularly useful when Apollo doesn't return the needed data
- **Provide LinkedIn URL** — Most reliable enrichment method
- **For errors** — See @skills/obul-api-errors/SKILL.md for complete error code reference and troubleshooting
