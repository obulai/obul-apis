---
name: obul-apollo
description: "USE THIS SKILL WHEN: the user wants to enrich people and company data, search for contacts, find email addresses, or get job posting information. Apollo provides access to 270M+ contacts and 60M+ companies database."
homepage: https://apollo.io
metadata:
  obul-skill:
    emoji: "📡"
    requires:
      env: ["OBUL_API_KEY"]
      primaryEnv: "OBUL_API_KEY"
registries: {}
---

# Apollo

Apollo.io API provides people and company enrichment, search, and prospecting. Access the Apollo database of 270M+ contacts and 60M+ companies through the Obul proxy. No API key needed — payment is handled automatically.

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

Base URL: `https://proxy.obul.ai/proxy/https/x402.orth.sh/apollo`

To get an Obul API key, sign up at **https://my.obul.ai**.

## Common Operations

### Enrich Company

Enrich a company by domain. Returns industry, revenue, employee count, funding, locations, and more.

**Pricing:** $0.01

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/apollo/api/v1/organizations/enrich",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "params": {
    "domain": "apollo.io"
  }
}
```

**Response:** JSON with company information including industry, revenue, employee count, funding, and locations.

### Search People

Search Apollo database for people matching filters. Returns up to 100 results per page.

**Pricing:** $0.01

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/apollo/api/v1/mixed_people/api_search",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "person_titles": ["CEO", "CTO"],
    "organization_num_employees_ranges": ["51-200", "201-500"],
    "page": 1,
    "per_page": 10
  }
}
```

**Response:** JSON with array of person records including contact info, job title, company details.

### Search Companies

Search Apollo database for companies matching filters.

**Pricing:** $0.01

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/apollo/api/v1/mixed_companies/search",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "q_keywords": "AI",
    "organization_num_employees_ranges": ["51-200"],
    "page": 1,
    "per_page": 10
  }
}
```

**Response:** JSON with array of company records.

### Match Person

Enrich a person by email, LinkedIn URL, name+company, or other identifiers.

**Pricing:** $0.01

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/apollo/api/v1/people/match",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "email": "elon@tesla.com",
    "reveal_personal_emails": true,
    "reveal_phone_number": true
  }
}
```

**Response:** JSON with person details, contact info, job info, and social profiles.

### Get Organization Job Postings

Get current job postings for a company by Apollo organization ID.

**Pricing:** $0.01

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/apollo/api/v1/organizations/{organization_id}/job_postings",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

**Response:** JSON with job postings including title, location, description.

### Get Organization by ID

Get complete organization information by Apollo organization ID.

**Pricing:** $0.01

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/apollo/api/v1/organizations/{id}",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "params": {
    "id": "6123878493"
  }
}
```

**Response:** JSON with complete organization details.

### Search News Articles

Search for news articles related to companies in the Apollo database.

**Pricing:** $0.01

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/apollo/api/v1/news_articles/search",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "organization_ids": ["6123878493"],
    "q_keywords": "funding",
    "page": 1,
    "per_page": 10
  }
}
```

**Response:** JSON with news articles related to the company.

### Bulk Company Enrich

Enrich up to 10 organizations in a single request.

**Pricing:** $0.05

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/apollo/api/v1/organizations/bulk_enrich",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "domains": ["stripe.com", "airbnb.com", "uber.com"]
  }
}
```

**Response:** JSON with enriched data for all companies.

### Bulk Person Match

Enrich up to 10 people in a single request. Requires webhook for async results.

**Pricing:** $0.05

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/apollo/api/v1/people/bulk_match",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "details": [
      {"email": "elon@tesla.com"},
      {"linkedin_url": "https://linkedin.com/in/zuck"}
    ],
    "reveal_personal_emails": true,
    "reveal_phone_number": true,
    "webhook_url": "https://your-site.com/webhook"
  }
}
```

**Response:** JSON with bulk enrichment results (via webhook).

## Endpoint Pricing Reference

| Endpoint                              | Price  | Purpose                                    |
|---------------------------------------|--------|-------------------------------------------|
| `GET /api/v1/organizations/enrich`    | $0.01  | Enrich company by domain                  |
| `POST /api/v1/mixed_companies/search` | $0.01  | Search companies by filters               |
| `POST /api/v1/mixed_people/api_search`| $0.01  | Search people by filters                   |
| `POST /api/v1/people/match`           | $0.01  | Enrich person by email/LinkedIn/name      |
| `GET /api/v1/organizations/{id}`     | $0.01  | Get organization by Apollo ID             |
| `GET /api/v1/organizations/{id}/job_postings` | $0.01 | Get job postings |
| `POST /api/v1/news_articles/search`  | $0.01  | Search news articles                      |
| `POST /api/v1/organizations/bulk_enrich` | $0.05 | Bulk company enrichment (max 10)       |
| `POST /api/v1/people/bulk_match`      | $0.05  | Bulk person enrichment (max 10)           |

## When to Use

- **People enrichment** — User wants contact info for a person by email or name
- **Company enrichment** — User needs company data including revenue, employees, industry
- **Prospecting** — User wants to find leads by title, company size, location
- **Job postings** — User wants to see current openings at a company
- **Bulk enrichment** — User needs to enrich multiple people or companies at once

## Best Practices

- **Use bulk endpoints** — When enriching multiple records, use bulk endpoints to save costs
- **Include reveal flags** — Set `reveal_personal_emails` and `reveal_phone_number` to get contact details
- **Filter by employee count** — Use `organization_num_employees_ranges` to target companies of specific sizes
- **Use pagination** — Results are limited to 100 per page; use `page` and `per_page` to iterate
- **For errors** — See @skills/obul-api-errors/SKILL.md for complete error code reference and troubleshooting


