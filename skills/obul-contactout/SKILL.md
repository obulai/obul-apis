---
name: obul-contactout
description: "USE THIS SKILL WHEN: the user wants to find email addresses, phone numbers, and LinkedIn enrichment for sales and recruitment intelligence. Provides contact discovery via ContactOut through the Obul proxy."
homepage: https://contactout.com
metadata:
  obul-skill:
    emoji: "📧"
    requires:
      env: ["OBUL_API_KEY"]
    primaryEnv: "OBUL_API_KEY"
registries: {}
---

# ContactOut

ContactOut provides sales and recruitment intelligence with email finding, phone number lookup, LinkedIn enrichment, and decision maker discovery through the Obul proxy.

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

**Base URL:** `https://proxy.obul.ai/proxy/https/x402.orth.sh/contactout`

## Common Operations

### Enrich Email

Get profile details from an email address.

**Pricing:** $0.33

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/contactout/v1/email/enrich?email=john@example.com&include=work_email",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

**Response:** Profile data including name, job title, company, and contact info.

### Enrich LinkedIn Profile

Get full profile details from a LinkedIn URL.

**Pricing:** Dynamic

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/contactout/v1/linkedin/enrich?profile=https://linkedin.com/in/johndoe",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

**Response:** Full profile with email, phone, work history, education, and skills.

### Enrich Person

Enrich a person using multiple data points.

**Pricing:** $0.55

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/contactout/v1/people/enrich",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "full_name": "John Doe",
    "email": "john@example.com",
    "linkedin_url": "https://linkedin.com/in/johndoe",
    "company": "Acme Inc",
    "include": ["work_email", "personal_email", "phone"]
  }
}
```

### Enrich Domain

Get company information from domain names.

**Pricing:** Dynamic

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/contactout/v1/domain/enrich",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "domains": ["stripe.com", "google.com"]
  }
}
```

### Count Matching Profiles

Count profiles matching search criteria (free).

**Pricing:** $0.00

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/contactout/v1/people/count",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "job_title": ["Software Engineer"],
    "company": ["Google"],
    "location": ["San Francisco"]
  }
}
```

## Endpoint Pricing Reference

| Endpoint | Price | Purpose |
|----------|-------|---------|
| `GET /v1/email/enrich` | $0.33 | Enrich profile from email |
| `GET /v1/linkedin/enrich` | Dynamic | Full profile from LinkedIn URL |
| `GET /v1/people/linkedin` | Dynamic | Contact details from LinkedIn |
| `POST /v1/people/enrich` | $0.55 | Enrich with multiple data points |
| `POST /v1/people/linkedin/batch` | Dynamic | Batch LinkedIn enrichment (up to 30) |
| `POST /v1/domain/enrich` | Dynamic | Company info from domains |
| `POST /v1/people/count` | $0.00 | Count matching profiles |

## When to Use

- **Email discovery** — Find email addresses from names or LinkedIn profiles
- **LinkedIn enrichment** — Get full profile data including contact info from LinkedIn URLs
- **Sales prospecting** — Find decision makers and their contact information
- **Recruitment sourcing** — Discover candidates with specific job titles and skills
- **Company research** — Enrich company data from domain names
- **Batch processing** — Process up to 30 LinkedIn profiles at once

## Best Practices

- **Start with count** — Use /v1/people/count (free) to estimate results before enriching
- **Provide multiple identifiers** — Include name, email, LinkedIn for better match rates
- **Use batch endpoints** — Process multiple profiles efficiently with batch operations
- **Specify include fields** — Request only needed data (work_email, personal_email, phone)
- **Validate results** — Contact data accuracy varies; validate before outreach
- **For errors** — See @skills/obul-api-errors/SKILL.md for complete error code reference and troubleshooting
