---
name: obul-fiber
description: Reach anyone on the planet with verified contacts. Fiber AI delivers the most accurate contact data including email finding and validation.
homepage: https://fiber.io
metadata:
  obul-skill: "📧"
  requires.env: OBUL_API_KEY
  requires.primaryEnv: OBUL_API_KEY
registries: {}
---

# Fiber AI

Reach anyone on the planet with verified contacts. Fiber AI delivers the most accurate contact data for B2B prospecting, including email finding, validation, and LinkedIn data enrichment.

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

Base URL: `https://proxy.obul.ai/proxy/https/x402.orth.sh/fiber`

To get an Obul API key, sign up at **https://my.obul.ai**.

## Common Operations

### Email to Person Lookup

Given an email address, find someone's LinkedIn profile and personal details.

**Pricing:** $0.04

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/fiber/v1/email-to-person/single",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "email": "sundar@google.com"
  }
}
```

### Validate Email

Check if an email is likely to bounce using waterfall strategies.

**Pricing:** $0.02

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/fiber/v1/validate-email/single",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "email": "user@company.com"
  }
}
```

### Kitchen Sink Person Search

Search for a person using multiple parameters for best match accuracy.

**Pricing:** Dynamic

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/fiber/v1/kitchen-sink/person",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "personName": {"firstName": "John", "lastName": "Doe"},
    "companyIdentifier": "google",
    "companyName": {"name": "Google"}
  }
}
```

### LinkedIn Profile Enrichment

Get enriched profile details from a LinkedIn profile URL.

**Pricing:** $0.04

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/fiber/v1/linkedin-live-fetch/profile/single",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "identifier": "https://www.linkedin.com/in/williamhgates/"
  }
}
```

### Company Search

Search for companies using filters.

**Pricing:** Dynamic

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/fiber/v1/company-search",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "searchParams": {
      "name": {"contains": "Stripe"}
    }
  }
}
```

### LinkedIn Company Enrichment

Get enriched company details from LinkedIn.

**Pricing:** $0.04

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/fiber/v1/linkedin-live-fetch/company/single",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "type": "slug",
    "value": "microsoft"
  }
}
```

### Natural Language Search

Search companies using natural language queries.

**Pricing:** Dynamic

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/fiber/v1/natural-language-search/companies",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "query": "Series A startups in USA with 50-200 employees"
  }
}
```

### Get LinkedIn Profile Posts

Fetch recent posts from a LinkedIn profile.

**Pricing:** $0.04

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/fiber/v1/linkedin-live-fetch/profile-posts",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "identifier": "williamhgates"
  }
}
```

### People Search

Search for people using filters.

**Pricing:** Dynamic

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/fiber/v1/people-search",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "searchParams": {
      "location": {"in": ["San Francisco"]}
    },
    "pageSize": 10
  }
}
```

### Natural Language Search Profiles

Search people using natural language queries.

**Pricing:** Dynamic

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/fiber/v1/natural-language-search/profiles",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "query": "Software engineers in US with 5+ years experience"
  }
}
```

### Get Post Comments

Fetch comments from a LinkedIn post.

**Pricing:** $0.04

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/fiber/v1/linkedin-live-fetch/post-comments",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "contentId": "urn:li:activity:7123456789012345678"
  }
}
```

### Get Post Reactions

Fetch reactions from a LinkedIn post.

**Pricing:** $0.04

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/fiber/v1/linkedin-live-fetch/post-reactions",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "contentId": "urn:li:activity:7123456789012345678"
  }
}
```

### Text to Search Params Companies

Convert natural language to company search filters.

**Pricing:** $0.04

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/fiber/v1/text-to-search-params/companies",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "query": "Series A startups in USA with 50-200 employees"
  }
}
```

### Text to Search Params Profiles

Convert natural language to person search filters.

**Pricing:** $0.04

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/fiber/v1/text-to-search-params/profiles",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "query": "Software engineers in US with 5+ years experience"
  }
}
```

### Job Search

Search for job postings.

**Pricing:** Dynamic

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/fiber/v1/job-search",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "searchParams": {
      "title": {"contains": "Software Engineer"}
    },
    "pageSize": 10
  }
}
```

### Kitchen Sink Company

Search for a company using multiple parameters.

**Pricing:** Dynamic

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/fiber/v1/kitchen-sink/company",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "companyIdentifier": "microsoft",
    "companyName": {"name": "Microsoft"}
  }
}
```

### Investor Search

Search for investors.

**Pricing:** Dynamic

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/fiber/v1/investor-search",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "searchParams": {
      "location": {"in": ["San Francisco"]}
    },
    "pageSize": 10
  }
}
```

## Endpoint Pricing Reference

| Endpoint | Price | Purpose |
|----------|-------|---------|
| `POST /v1/email-to-person/single` | $0.04 | Reverse email lookup |
| `POST /v1/validate-email/single` | $0.02 | Email validation |
| `POST /v1/kitchen-sink/person` | Dynamic | Multi-param person search |
| `POST /v1/kitchen-sink/company` | Dynamic | Multi-param company search |
| `POST /v1/linkedin-live-fetch/profile/single` | $0.04 | LinkedIn profile enrichment |
| `POST /v1/linkedin-live-fetch/company/single` | $0.04 | LinkedIn company enrichment |
| `POST /v1/company-search` | Dynamic | Company search |
| `POST /v1/people-search` | Dynamic | People search |
| `POST /v1/natural-language-search/companies` | Dynamic | NLP company search |
| `POST /v1/natural-language-search/profiles` | Dynamic | NLP people search |
| `POST /v1/linkedin-live-fetch/profile-posts` | $0.04 | LinkedIn posts |
| `POST /v1/linkedin-live-fetch/post-comments` | $0.04 | Post comments |
| `POST /v1/linkedin-live-fetch/post-reactions` | $0.04 | Post reactions |
| `POST /v1/text-to-search-params/companies` | $0.04 | Text to company filters |
| `POST /v1/text-to-search-params/profiles` | $0.04 | Text to person filters |
| `POST /v1/job-search` | Dynamic | Job search |
| `POST /v1/investor-search` | Dynamic | Investor search |

## When to Use

- **B2B Lead Generation**: Find verified contact information for prospects
- **Email Verification**: Validate email deliverability before outreach
- **CRM Enrichment**: Enrich existing contacts with additional data
- **LinkedIn Intelligence**: Get enriched LinkedIn data for prospecting
- **Company Research**: Find company information and decision makers

## Best Practices

1. **Use Kitchen Sink**: Pass as many parameters as available for best match accuracy
2. **Live Fetch for Fresh Data**: Use live fetch for most recent LinkedIn data
3. **Validate Before Sending**: Always validate emails before cold outreach
4. **Natural Language**: Use NLP search for complex queries without building filters
5. **For errors** — See @skills/obul-api-errors/SKILL.md for complete error code reference and troubleshooting
