---
name: obul-stableenrich-apollo
description: 'USE THIS SKILL WHEN: the user wants to enrich people and company data,
  search for contacts, find email addresses via StableEnrich. Apollo provides access
  to 270M+ contacts and 60M+ companies database.'
endpoints:
- path: /api/apollo/people-search
  method: POST
  price: $0.02
  description: Search people by keywords, title, location
- path: /api/apollo/people-enrich
  method: POST
  price: $0.0495
  description: Enrich person by email or person ID
- path: /api/apollo/org-search
  method: POST
  price: $0.02
  description: Search organizations by keywords
- path: /api/apollo/org-enrich
  method: POST
  price: $0.0495
  description: Enrich organization by domain
metadata:
  obul-skill:
    emoji: 📡
    requires:
      env:
      - OBUL_API_KEY
      primaryEnv: OBUL_API_KEY
registries: {}
provider: stableenrich
---

# Apollo (StableEnrich)

Apollo.io API provides people and company enrichment, search, and prospecting through the Obul proxy via StableEnrich. Access the Apollo database of 270M+ contacts and 60M+ companies. No separate API key needed — payment is handled automatically.

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

### People Search

Search for people by keywords, job title, location, or company.

**Pricing:** $0.02

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/stableenrich.dev/api/apollo/people-search",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "q_keywords": "software engineer",
    "person_locations": ["San Francisco"],
    "per_page": 10,
    "page": 1
  }
}
```

**Response:** Array of people objects with name, title, company, location, email (may be obfuscated), and LinkedIn URL. Use people-enrich with a specific email or person ID to get full details.

### People Enrich

Enrich a person by email or person ID to get full contact details.

**Pricing:** $0.0495

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/stableenrich.dev/api/apollo/people-enrich",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "email": "elon@tesla.com"
  }
}
```

**Response:** JSON with person details, contact info, job info, and social profiles.

### Organization Search

Search for organizations by keywords and location.

**Pricing:** $0.02

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/stableenrich.dev/api/apollo/org-search",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "q_keywords": "AI",
    "organization_locations": ["United States"],
    "per_page": 10,
    "page": 1
  }
}
```

### Organization Enrich

Enrich an organization by domain.

**Pricing:** $0.0495

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/stableenrich.dev/api/apollo/org-enrich",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "domain": "apollo.io"
  }
}
```

## When to Use

- **People enrichment** — User wants contact info for a person by email or name
- **Company enrichment** — User needs company data including revenue, employees, industry
- **Prospecting** — User wants to find leads by title, company size, location

## Best Practices

- **Verify org IDs first** — Apollo performs exact matching on organization IDs and domains. Always use org-search to find the correct ID before filtering people searches by company.
- **Enrich obfuscated results** — Apollo people-search may return obfuscated names or emails. Use people-enrich with the email or person ID to get full details.
- **For errors** — See @skills/obul-api-errors/SKILL.md for complete error code reference and troubleshooting
