---
name: obul-ocean
description: "USE THIS SKILL WHEN: the user wants company and people search, enrichment, and discovery with lookalike matching and B2B intelligence. Provides B2B data via Ocean.io through the Obul proxy."
homepage: https://ocean.io
metadata:
  obul-skill:
    emoji: "🌊"
    requires:
      env: ["OBUL_API_KEY"]
    primaryEnv: "OBUL_API_KEY"
registries: {}
---

# Ocean.io

Ocean.io provides B2B data for company and people search, enrichment, lookup, and discovery. Find lookalike companies, enrich contacts, and reveal decision makers through the Obul proxy.

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

**Base URL:** `https://proxy.obul.ai/proxy/https/x402.orth.sh/ocean-io`

## Common Operations

### Search Companies

Search for companies using filters (industry, size, location, technologies, revenue).

**Pricing:** Dynamic

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/ocean-io/v3/search/companies",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "size": 50,
    "companiesFilters": {
      "companySizes": ["51-200", "201-500"],
      "industries": {
        "industries": ["Software", "SaaS"],
        "mode": "anyOf"
      },
      "primaryLocations": {
        "includeCountries": ["US", "GB"]
      }
    }
  }
}
```

### Search People

Search for people using job title, seniority, department, and location filters.

**Pricing:** Dynamic

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/ocean-io/v3/search/people",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "size": 50,
    "peopleFilters": {
      "jobTitleKeywords": {
        "anyOf": ["CEO", "CTO", "VP"]
      },
      "seniorities": ["C-Level", "VP"],
      "departments": ["Engineering", "Sales"]
    }
  }
}
```

### Enrich Company

Match and enrich a company with additional information.

**Pricing:** $0.01

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/ocean-io/v2/enrich/company",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "company": {
      "domain": "stripe.com",
      "name": "Stripe"
    },
    "fields": ["domain", "companySize", "revenue", "technologies"]
  }
}
```

### Enrich Person

Match and enrich a person with job title, company, and contact info.

**Pricing:** $0.01

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/ocean-io/v2/enrich/person",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "person": {
      "linkedin": "john-doe",
      "name": "John Doe",
      "jobTitle": "Software Engineer"
    }
  }
}
```

### Lookup Companies by Domain

Lookup and enrich multiple companies by domain (max 1000).

**Pricing:** Dynamic

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/ocean-io/v2/lookup/companies",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "domains": ["stripe.com", "google.com", "apple.com"],
    "fields": ["domain", "companySize", "industries", "revenue"]
  }
}
```

### Get Data Fields

Returns all valid filter values for search endpoints.

**Pricing:** $0.00

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/ocean-io/v2/data-fields",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

## Endpoint Pricing Reference

| Endpoint | Price | Purpose |
|----------|-------|---------|
| `POST /v3/search/companies` | Dynamic | Search companies with filters |
| `POST /v3/search/people` | Dynamic | Search people with filters |
| `POST /v2/enrich/company` | $0.01 | Enrich company data |
| `POST /v2/enrich/person` | $0.01 | Enrich person data |
| `POST /v2/lookup/companies` | Dynamic | Lookup companies by domain |
| `POST /v2/lookup/people` | Dynamic | Lookup people by LinkedIn |
| `GET /v2/data-fields` | $0.00 | Get valid filter values |
| `POST /v2/warmup/companies` | $0.00 | Check domain availability |

## When to Use

- **Company search** — Find companies by size, industry, location, technology stack
- **People search** — Find decision makers by job title, seniority, department
- **Lookalike matching** — Find companies similar to your best customers
- **Account enrichment** — Add firmographic data to company records
- **Contact enrichment** — Add job titles, emails, and social profiles to people
- **Technographic data** — Discover what technologies companies use
- **B2B prospecting** — Build targeted lead lists with advanced filters

## Best Practices

- **Use data fields endpoint** — Call /v2/data-fields first to get valid filter values
- **Specify fields** — Use fields parameter to reduce bandwidth and improve speed
- **Pagination** — Use searchAfter cursor from previous response for next page
- **Combine filters** — Use multiple filters (size, industry, location) for precise targeting
- **Warmup before search** — Use /v2/warmup/companies to check domain availability
- **Set result size** — Use size parameter (1-10,000) to control result count
- **For errors** — See @skills/obul-api-errors/SKILL.md for complete error code reference and troubleshooting
