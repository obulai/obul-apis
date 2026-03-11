---
name: obul-tomba
description: Email finding and verification API. Find email addresses, verify deliverability, and enrich person/company data.
homepage: https://tomba.io
metadata:
  obul-skill: "📬"
  requires.env: OBUL_API_KEY
  requires.primaryEnv: OBUL_API_KEY
registries: {}
---

# Tomba

Email finding and verification API. Find email addresses from domain and name, verify email deliverability, discover company technologies, and get person/company enrichment.

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

Base URL: `https://proxy.obul.ai/proxy/https/x402.orth.sh/tomba`

To get an Obul API key, sign up at **https://my.obul.ai**.

## Common Operations

### Email Finder

Find the most likely email address from domain, first name, and last name.

**Pricing:** $0.01

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/tomba/v1/email-finder?domain=stripe.com&full_name=Sundar+Pichai",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Domain Search

Search emails based on website domain.

**Pricing:** $0.01

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/tomba/v1/domain-search?domain=stripe.com&company=Stripe",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Enrich Email

Enrich an email address with person and company data.

**Pricing:** $0.01

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/tomba/v1/enrich?email=sundar@google.com",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Email Verifier

Verify deliverability of an email address.

**Pricing:** $0.01

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/tomba/v1/email-verifier?email=user@company.com",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Find LinkedIn Email

Find email from a LinkedIn profile URL.

**Pricing:** $0.01

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/tomba/v1/linkedin?url=https://linkedin.com/in/sundarpichai",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Company Finder

Get company information from a domain.

**Pricing:** $0.01

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/tomba/v1/companies/find?domain=stripe.com",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Technology Finder

Discover technologies used by a website.

**Pricing:** $0.01

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/tomba/v1/technology?domain=stripe.com",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Phone Finder

Find phone numbers associated with an email or domain.

**Pricing:** $0.01

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/tomba/v1/phone-finder?email=user@company.com",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Domain Suggestions

Get domain suggestions for a company name.

**Pricing:** $0.01

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/tomba/v1/domain-suggestions?query=Stripe",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Company Reveal Search

Search for companies using natural language queries or structured filters.

**Pricing:** $0.01

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/tomba/v1/reveal/search",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "query": "AI companies in San Francisco",
    "filters": {
      "size": {"include": ["11-50", "51-200"]}
    }
  }
}
```

### Author Finder

Find the email address of a blog post author from the article URL.

**Pricing:** $0.01

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/tomba/v1/author-finder?url=https://example.com/blog/post",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Email Format

Get email format patterns used by a domain.

**Pricing:** $0.01

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/tomba/v1/email-format?domain=stripe.com",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Employee Locations

Get employee location distribution for a domain.

**Pricing:** $0.01

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/tomba/v1/location?domain=stripe.com",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Email Count

Get count of email addresses for a domain by department and seniority.

**Pricing:** $0.01

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/tomba/v1/email-count?domain=stripe.com",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Domain Status

Check the status and availability of a domain.

**Pricing:** $0.01

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/tomba/v1/domain-status?domain=stripe.com",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Person Finder

Get person information from an email address.

**Pricing:** $0.01

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/tomba/v1/people/find?email=user@company.com",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Combined Find

Get combined person and company information from an email.

**Pricing:** $0.01

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/tomba/v1/combined/find?email=user@company.com",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Phone Validator

Validate a phone number and get carrier information.

**Pricing:** $0.01

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/tomba/v1/phone-validator?phone=+14155551234&country_code=US",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Similar Domains

Find domains similar to a given domain.

**Pricing:** $0.01

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/tomba/v1/similar?domain=stripe.com",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Email Sources

Find the sources where an email was found on the web.

**Pricing:** $0.01

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/tomba/v1/email-sources?email=user@company.com",
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
| `POST /v1/reveal/search` | $0.01 | Company search |
| `GET /v1/email-finder` | $0.01 | Find email from name+domain |
| `GET /v1/domain-search` | $0.01 | Search emails by domain |
| `GET /v1/enrich` | $0.01 | Enrich email with data |
| `GET /v1/email-verifier` | $0.01 | Verify email deliverability |
| `GET /v1/linkedin` | $0.01 | Find email from LinkedIn |
| `GET /v1/author-finder` | $0.01 | Find blog author email |
| `GET /v1/companies/find` | $0.01 | Get company info |
| `GET /v1/technology` | $0.01 | Find company tech |
| `GET /v1/phone-finder` | $0.01 | Find phone numbers |
| `GET /v1/phone-validator` | $0.01 | Validate phone |
| `GET /v1/email-count` | $0.01 | Count emails by dept |
| `GET /v1/domain-status` | $0.01 | Check domain status |
| `GET /v1/people/find` | $0.01 | Get person from email |
| `GET /v1/combined/find` | $0.01 | Combined person+company |
| `GET /v1/email-format` | $0.01 | Get email format pattern |
| `GET /v1/location` | $0.01 | Get employee locations |
| `GET /v1/similar` | $0.01 | Find similar domains |
| `GET /v1/email-sources` | $0.01 | Find email sources |

## When to Use

- **Email Discovery**: Find email addresses for outreach
- **Email Verification**: Verify deliverability before sending
- **Lead Enrichment**: Enrich leads with company and contact data
- **Technology Intelligence**: Discover tech stacks of companies
- **Phone Discovery**: Find phone numbers for prospects

## Best Practices

1. **Verify Before Sending**: Always verify emails before cold outreach
2. **Use Multiple Sources**: Combine finder and enrich for best data
3. **Department Filters**: Use department filters for targeted discovery
- **For errors** -- See @skills/obul-api-errors/SKILL.md for complete error code reference and troubleshooting

| Code | Cause | Solution |
|------|-------|----------|
| 400 | Invalid parameters | Check required fields and format |
| 401 | Missing API key | Include `x-obul-api-key` header |
| 402 | Payment required | Check Obul account balance |
| 404 | Not found | Email/person not found |
| 429 | Rate limited | Implement exponential backoff |
| 500 | Server error | Retry with exponential backoff |
