---
name: obul-aviato
description: Company and person intelligence platform with funding rounds, investments, employees, founders, LinkedIn social data, and market maps. Access via Obul proxy.
homepage: https://aviato.ai
metadata:
  obul-skill: "🏢"
  requires.env: OBUL_API_KEY
  requires.primaryEnv: OBUL_API_KEY
registries: {}
---

# Aviato

Comprehensive company and person intelligence platform that enriches companies and people, searches with advanced DSL queries, retrieves funding rounds, investments, employees, founders, contact info, LinkedIn social data, and generates market maps.

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

Base URL: `https://proxy.obul.ai/proxy/https/x402.orth.sh/aviato`

To get an Obul API key, sign up at **https://my.obul.ai**.

## Common Operations

### Get Company Enrichment

Enrich a company with full details using any identifier (website, LinkedIn URL, domain, etc.).

**Pricing:** $0.12

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/aviato/company/enrich?website=stripe.com",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

Returns company name, industry, description, funding info, employee count, technologies, and more.

### Search Companies

Search for companies using Aviato's DSL query language.

**Pricing:** $0.02

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/aviato/company/search",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "dsl": {
      "filters": [
        {"field": "industry", "operator": "equals", "value": "Software"}
      ],
      "limit": 10,
      "offset": 0
    }
  }
}
```

### Get Person Enrichment

Enrich a person with full profile details using any identifier.

**Pricing:** $0.03

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/aviato/person/enrich?linkedinURL=https://linkedin.com/in/sundarpichai",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Search People

Search for people using Aviato's DSL query language.

**Pricing:** $0.02

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/aviato/person/search",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "dsl": {
      "filters": [
        {"field": "location", "operator": "equals", "value": "San Francisco"},
        {"field": "headline", "operator": "contains", "value": "CEO"}
      ],
      "limit": 10,
      "offset": 0
    }
  }
}
```

### Get Company Funding Rounds

Retrieve all funding rounds for a company.

**Pricing:** $0.08

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/aviato/company/funding-rounds?id=aviato-company-id&page=1&perPage=10",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Get Company Employees

Retrieve employees of a company with pagination.

**Pricing:** $0.02

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/aviato/company/employees?id=aviato-company-id&page=1&perPage=10",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Get Person Email

Retrieve email addresses for a person.

**Pricing:** $0.04

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/aviato/person/email?linkedinURL=https://linkedin.com/in/sundarpichai",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Get Company Founders

Retrieve founders of a company.

**Pricing:** $0.02

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/aviato/company/founders?id=aviato-company-id&page=1&perPage=10",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Get LinkedIn Company Posts

Retrieve posts from a company's LinkedIn page.

**Pricing:** $0.08

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/aviato/social/company/posts?linkedinNumID=1441",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Generate Market Map

Generate a market map to find similar companies.

**Pricing:** $0.20

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/aviato/marketmap/generate",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "name": "Stripe",
    "website": "stripe.com"
  }
}
```

### Simple Person Search

Simplified person search with pre-defined query parameters.

**Pricing:** $0.02

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/aviato/person/simple/search?fullName=John+Doe&page=1&perPage=10",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Get Company Investments

Get investments made into the specified company.

**Pricing:** $0.04

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/aviato/company/investments?website=stripe.com&page=1&perPage=10",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Get Outbound Investments

Get outbound investments that a company has made.

**Pricing:** $0.04

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/aviato/company/investments/outbound?website=stripe.com&page=1&perPage=10",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Get Company Funds

Get funds that a company has raised.

**Pricing:** $0.08

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/aviato/company/funds?website=stripe.com&page=1&perPage=10",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Get Company Acquisitions

Get companies acquired by the specified company.

**Pricing:** $0.12

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/aviato/company/acquisitions?website=stripe.com&page=1&perPage=10",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Get Person Vestings

Get vestings of a person.

**Pricing:** $0.16

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/aviato/person/vestings?linkedinURL=https://linkedin.com/in/sundarpichai&page=1&perPage=10",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Get Person Investments in Companies

Get companies that a person has invested in.

**Pricing:** $0.02

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/aviato/person/investments/companies?linkedinURL=https://linkedin.com/in/sundarpichai&page=1&perPage=10",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Get Person Founded Companies

Get companies that a person has founded.

**Pricing:** $0.02

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/aviato/person/founded-companies?linkedinURL=https://linkedin.com/in/sundarpichai&page=1&perPage=10",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Get Person LinkedIn Posts

Get posts from a person's LinkedIn profile.

**Pricing:** $0.08

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/aviato/social/person/posts?linkedinID=AC123456",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Get LinkedIn Post Reactions

Get reactions for a LinkedIn post.

**Pricing:** $0.08

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/aviato/social/post/urn:li:activity:1234567890123456789/reactions?page=1&perPage=10",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Get LinkedIn Post Comments

Get comments for a LinkedIn post.

**Pricing:** $0.08

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/aviato/social/post/urn:li:activity:1234567890123456789/comments?page=1&perPage=10",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Get LinkedIn Post Reshares

Get reshares for a LinkedIn post.

**Pricing:** $0.08

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/aviato/social/post/urn:li:activity:1234567890123456789/reshares?page=1&perPage=10",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Get Company Investment Funds

Get individual funds that a company has invested in.

**Pricing:** $0.04

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/aviato/company/investments/funds?website=sequoiacap.com&page=1&perPage=10",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Get Person Investment Funds

Get funds that a person has invested in.

**Pricing:** $0.02

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/aviato/person/investments/funds?linkedinURL=https://linkedin.com/in/sundarpichai&page=1&perPage=10",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Search Locations

Search for a location and get geocoded matches.

**Pricing:** $0.01

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/aviato/geocoder/search?text=San+Francisco",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

## Endpoint Pricing Reference

| Endpoint | Price | Purpose |
|----------|-------|---------|
| `GET /company/enrich` | $0.12 | Get full company details |
| `POST /company/search` | $0.02 | Search companies with DSL |
| `GET /person/enrich` | $0.03 | Get full person details |
| `POST /person/search` | $0.02 | Search people with DSL |
| `GET /person/simple/search` | $0.02 | Simplified person search |
| `GET /company/funding-rounds` | $0.08 | Get company funding history |
| `GET /company/employees` | $0.02 | Get company employees |
| `GET /person/email` | $0.04 | Get person email addresses |
| `GET /company/founders` | $0.02 | Get company founders |
| `GET /company/investments` | $0.04 | Get company investments |
| `GET /company/investments/outbound` | $0.04 | Get outbound investments |
| `GET /company/funds` | $0.08 | Get funds raised |
| `GET /company/acquisitions` | $0.12 | Get acquisitions |
| `GET /company/investments/funds` | $0.04 | Get company investment funds |
| `GET /social/company/posts` | $0.08 | Get LinkedIn company posts |
| `GET /social/person/posts` | $0.08 | Get LinkedIn person posts |
| `GET /social/post/{postUrn}/reactions` | $0.08 | Get post reactions |
| `GET /social/post/{postUrn}/comments` | $0.08 | Get post comments |
| `GET /social/post/{postUrn}/reshares` | $0.08 | Get post reshares |
| `GET /person/founded-companies` | $0.02 | Get companies founded by person |
| `GET /person/vestings` | $0.16 | Get person vestings |
| `GET /person/investments/companies` | $0.02 | Get person company investments |
| `GET /person/investments/funds` | $0.02 | Get person investment funds |
| `POST /marketmap/generate` | $0.20 | Generate market map |
| `GET /geocoder/search` | $0.01 | Search locations |

## When to Use

- **Company Research**: Enrich company profiles with funding, employees, technology stack
- **Lead Generation**: Find decision makers and their contact information
- **Market Intelligence**: Generate market maps to discover similar companies
- **Competitor Analysis**: Track funding rounds, investments, and acquisitions
- **Recruiting**: Find employees at target companies
- **Sales Outreach**: Identify potential leads with verified contact data

## Best Practices

1. **Use Company Enrichment First**: Start with `/company/enrich` to get the Aviato company ID, then use that for related endpoints
2. **DSL for Complex Searches**: Use the DSL query language for complex filters rather than simple searches
3. **Preview Mode**: Use the `preview` parameter on enrich endpoints to get minimal info without charging
4. **Pagination**: Always implement pagination for endpoints that return lists
5. **Rescrape for Fresh Data**: Use `rescrape=true` to get fresh data if cached data is stale
6. **For errors** — See @skills/obul-api-errors/SKILL.md for complete error code reference and troubleshooting


