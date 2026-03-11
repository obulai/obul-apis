---
name: obul-ortho-hunter
description: 'USE THIS SKILL WHEN: the user wants to find, verify, or enrich email
  addresses, search for company information, or discover email patterns for domains.
  Hunter.io provides professional email discovery and verification.'
endpoints:
- path: /v2/email-finder
  method: GET
  price: $0.01
  description: Find email from name + company
- path: /v2/email-verifier
  method: GET
  price: $0.01
  description: Verify email deliverability
- path: /v2/domain-search
  method: GET
  price: $0.01
  description: Find all emails for a domain
- path: /v2/companies/find
  method: GET
  price: $0.01
  description: Get company information
- path: /v2/email-count
  method: GET
  price: $0.01
  description: Count emails by department/seniority
- path: /v2/combined/find
  method: GET
  price: $0.01
  description: Get person + company from email
- path: /v2/people/find
  method: GET
  price: $0.01
  description: Get person info from email
- path: /v2/discover
  method: POST
  price: $0.01
  description: Discover companies by criteria
metadata:
  obul-skill:
    emoji: 🎯
    requires:
      env:
      - OBUL_API_KEY
      primaryEnv: OBUL_API_KEY
registries: {}
provider: orthogonal
---

# Hunter (x402.orth.sh)

Hunter.io API for finding and verifying professional email addresses. Domain search, email finder, email verification, and company/person enrichment through the Obul proxy. No API key needed — payment is handled automatically.

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

Base URL: `https://proxy.obul.ai/proxy/https/x402.orth.sh/hunter`

To get an Obul API key, sign up at **https://my.obul.ai**.

## Common Operations

### Email Finder

Find the most likely email address for a person given their name and company domain.

**Pricing:** $0.01

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/hunter/v2/email-finder",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "params": {
    "domain": "stripe.com",
    "first_name": "Patrick",
    "last_name": "Collison"
  }
}
```

**Response:** JSON with email address, confidence score, and sources.

### Email Verifier

Verify if an email address is deliverable.

**Pricing:** $0.01

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/hunter/v2/email-verifier",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "params": {
    "email": "patrick@stripe.com"
  }
}
```

**Response:** JSON with status: valid, invalid, accept_all, webmail, disposable, or unknown.

### Domain Search

Find all email addresses for a domain.

**Pricing:** $0.01

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/hunter/v2/domain-search",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "params": {
    "domain": "stripe.com",
    "limit": 10
  }
}
```

**Response:** JSON with emails, sources, confidence scores, and verification status.

### Company Finder

Get detailed company information from a domain.

**Pricing:** $0.01

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/hunter/v2/companies/find",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "params": {
    "domain": "stripe.com"
  }
}
```

**Response:** JSON with company details: industry, description, location, size, tech stack, funding.

### Email Count

Get count of email addresses for a domain, broken down by department and seniority.

**Pricing:** $0.01

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/hunter/v2/email-count",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "params": {
    "domain": "stripe.com"
  }
}
```

**Response:** JSON with email counts by department and seniority level.

### Combined Find

Get both person AND company information from an email address in a single request.

**Pricing:** $0.01

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/hunter/v2/combined/find",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "params": {
    "email": "patrick@stripe.com"
  }
}
```

**Response:** JSON with both person and company information.

### People Find

Get detailed person information from an email address.

**Pricing:** $0.01

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/hunter/v2/people/find",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "params": {
    "email": "patrick@stripe.com"
  }
}
```

**Response:** JSON with person details including name, location, employment, social profiles.

### Discover Companies

Find companies matching criteria using filters or natural language.

**Pricing:** $0.01

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/hunter/v2/discover",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "query": "Companies in Europe in Tech",
    "limit": 10
  }
}
```

**Response:** JSON with matching companies.

## When to Use

- **Email finding** — User needs to find a professional email address for a contact
- **Email verification** — User wants to verify if an email is deliverable
- **Domain research** — User wants to find all email addresses for a company
- **Company enrichment** — User needs company information from a domain

## Best Practices

- **Use domain as primary** — Always prefer `domain` over `company` name for accuracy
- **Verify before sending** — Always verify emails before using them in campaigns
- **Check confidence scores** — Use emails with high confidence scores for better deliverability
- **Filter by department** — Use `department` and `seniority` filters to target specific roles
- **For errors** — See @skills/obul-api-errors/SKILL.md for complete error code reference and troubleshooting
