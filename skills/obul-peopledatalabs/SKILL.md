---
name: obul-peopledatalabs
description: "USE THIS SKILL WHEN: the user wants to enrich, search, and clean person and company data from the world's largest people and company dataset. Provides B2B data via People Data Labs through the Obul proxy."
homepage: https://peopledatalabs.com
metadata:
  obul-skill:
    emoji: "👥"
    requires:
      env: ["OBUL_API_KEY"]
    primaryEnv: "OBUL_API_KEY"
registries: {}
---

# People Data Labs

People Data Labs provides access to the world's largest people and company dataset. Enrich, search, and clean person, company, school, location, job title, and IP data through the Obul proxy.

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

**Base URL:** `https://proxy.obul.ai/proxy/https/x402.orth.sh/peopledatalabs`

## Common Operations

### Enrich Person

Enrich a person by name, email, phone, LinkedIn URL, or other identifiers.

**Pricing:** $0.35

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/peopledatalabs/v5/person/enrich?email=john@example.com&pretty=true",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

**Response:** Full profile with work history, education, skills, and social profiles.

**Query Parameters:**
- `name`: Full name (e.g., "Jennifer C. Jackson")
- `first_name`: First name
- `last_name`: Last name
- `email`: Email address
- `phone`: Phone number
- `lid`: LinkedIn ID or URL
- `profile`: Social profile URL
- `company`: Current company name
- `location`: Location string
- `min_likelihood`: Minimum match confidence (1-10, default: 2)

### Identify Person

Broad person lookup returning up to 20 candidate matches with confidence scores.

**Pricing:** $0.70

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/peopledatalabs/v5/person/identify?name=John%20Doe&company=Google&pretty=true",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Search People

Search and filter people using Elasticsearch or SQL queries.

**Pricing:** $0.35

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/peopledatalabs/v5/person/search?pretty=true",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "sql": "SELECT * FROM person WHERE job_title='Software Engineer' AND location_country='united states' LIMIT 10"
  }
}
```

### Enrich Company

Enrich a company by name, website, ticker, or LinkedIn URL.

**Pricing:** $0.11

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/peopledatalabs/v5/company/enrich?website=stripe.com&pretty=true",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Search Companies

Search and filter companies using Elasticsearch or SQL queries.

**Pricing:** $0.11

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/peopledatalabs/v5/company/search?pretty=true",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "sql": "SELECT * FROM company WHERE industry='software' AND size='51-200' LIMIT 10"
  }
}
```

### Enrich IP Address

Enrich an IP address with associated company, location, and metadata.

**Pricing:** $0.09

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/peopledatalabs/v5/ip/enrich?ip=8.8.8.8&pretty=true",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

## Endpoint Pricing Reference

| Endpoint | Price | Purpose |
|----------|-------|---------|
| `GET /v5/person/enrich` | $0.35 | Enrich person by identifiers |
| `GET /v5/person/identify` | $0.70 | Identify with multiple candidates |
| `POST /v5/person/search` | $0.35 | Search people with SQL/ES |
| `GET /v5/company/enrich` | $0.11 | Enrich company by identifiers |
| `POST /v5/company/search` | $0.11 | Search companies with SQL/ES |
| `GET /v5/ip/enrich` | $0.09 | Enrich IP with company data |

## When to Use

- **Person enrichment** — Add work history, education, skills from email/LinkedIn
- **Company enrichment** — Get industry, size, funding, location from domain
- **Prospect search** — Find people by job title, company, location with SQL queries
- **Account research** — Find companies by industry, size, funding stage
- **IP intelligence** — Identify companies from website visitor IP addresses
- **Data cleansing** — Verify and standardize person/company records
- **Identity resolution** — Match partial info to full profiles with confidence scores

## Best Practices

- **Use multiple identifiers** — Include name, email, LinkedIn for better match rates
- **Set min_likelihood** — Adjust confidence threshold (1-10) based on use case
- **Use SQL queries** — Powerful filtering with familiar SQL syntax
- **Pagination** — Use size and from parameters for large result sets
- **Pretty print** — Add pretty=true for readable JSON during development
- **Handle nulls** — Some fields may be null; design for partial data
- **For errors** — See @skills/obul-api-errors/SKILL.md for complete error code reference and troubleshooting
