---
name: obul-nyne
description: People and company intelligence platform. Find contacts, enrich profiles, get social media activity, and discover event attendees.
homepage: https://nyne.ai
metadata:
  obul-skill: "🔍"
  requires.env: OBUL_API_KEY
  requires.primaryEnv: OBUL_API_KEY
registries: {}
---

# Nyne.ai

People and company intelligence platform. Find contacts, enrich profiles, get social media activity, and discover event attendees. Uses async processing with polling for results.

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

Base URL: `https://proxy.obul.ai/proxy/https/x402.orth.sh/nyne`

To get an Obul API key, sign up at **https://my.obul.ai**.

## Common Operations

### Person Search

Search for people by company, role, geography, and name with natural language queries.

**Pricing:** Dynamic

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/nyne/v1/person/search",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "query": "Software Engineers at Google in San Francisco",
    "limit": 10,
    "show_emails": true
  }
}
```

Returns request_id for polling. Use GET /person/search with request_id to get results.

### Person Enrichment

Enrich a person by email, phone, or social media URL.

**Pricing:** Dynamic

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/nyne/v1/person/enrichment",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "email": "sundar@google.com",
    "newsfeed": ["linkedin", "twitter"]
  }
}
```

### Company Enrichment

Enrich a company by email, phone, or LinkedIn URL.

**Pricing:** $0.076

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/nyne/v1/company/enrichment",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "social_media_url": "https://linkedin.com/company/google"
  }
}
```

### Company Search

Search for companies by industry or keyword.

**Pricing:** $0.363

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/nyne/v1/company/search",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "industry": "Healthcare SaaS",
    "location": "USA",
    "max_results": 25
  }
}
```

### Get Person Newsfeed

Get social media newsfeed from LinkedIn, Twitter, Instagram, GitHub, or Facebook.

**Pricing:** $0.435

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/nyne/v1/person/newsfeed",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "social_media_url": "https://linkedin.com/in/sundarpichai"
  }
}
```

### Get Person Interests

Retrieve interests, skills, and topics a person engages with.

**Pricing:** $0.363

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/nyne/v1/person/interests",
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

### Get Social Profiles

Find all social media profiles associated with a person.

**Pricing:** $0.363

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/nyne/v1/person/social-profiles",
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

### Person Events

Find people who attended specific events.

**Pricing:** $0.219

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/nyne/v1/person/events",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "event": "YC Demo Day",
    "role": "Founder"
  }
}
```

### Company Funding

Get company funding history and investment details.

**Pricing:** $0.578

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/nyne/v1/company/funding",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "company_name": "Stripe",
    "company_domain": "stripe.com"
  }
}
```

### Company Funders

Find investors and funders associated with a company.

**Pricing:** $1.44

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/nyne/v1/company/funders",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "company_name": "Y Combinator",
    "company_domain": "ycombinator.com"
  }
}
```

### Get Person Interactions

Get social media interactions for a person.

**Pricing:** $0.219

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/nyne/v1/person/interactions",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "social_media_url": "https://twitter.com/sundarpichai",
    "type": "followers"
  }
}
```

### Single Social Lookup

Lookup a single social media profile.

**Pricing:** $0.148

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/nyne/v1/person/single-social-lookup",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "social_media_url": "https://twitter.com/sundarpichai",
    "site": "twitter"
  }
}
```

### Company Check Seller

Check if a company sells a specific product/service.

**Pricing:** $0.148

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/nyne/v1/company/checkseller",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "company_name": "Stripe",
    "product_service": "payment processing"
  }
}
```

### Company Needs

Analyze company needs based on content.

**Pricing:** $0.219

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/nyne/v1/company/needs",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "company_name": "Uber",
    "content": "Regulatory challenges"
  }
}
```

## Endpoint Pricing Reference

| Endpoint | Price | Purpose |
|----------|-------|---------|
| `POST /v1/person/search` | Dynamic | Search people |
| `GET /v1/person/search` | Free | Poll search results |
| `POST /v1/person/enrichment` | Dynamic | Enrich person |
| `GET /v1/person/enrichment` | Free | Poll enrichment results |
| `POST /v1/person/newsfeed` | $0.435 | Get social newsfeed |
| `GET /v1/person/newsfeed` | Free | Poll newsfeed results |
| `POST /v1/person/interests` | $0.363 | Get interests/skills |
| `GET /v1/person/interests` | Free | Poll interests results |
| `POST /v1/person/social-profiles` | $0.363 | Get social profiles |
| `GET /v1/person/social-profiles` | Free | Poll social results |
| `POST /v1/person/events` | $0.219 | Find event attendees |
| `GET /v1/person/events` | Free | Poll event results |
| `POST /v1/person/interactions` | $0.219 | Get social interactions |
| `GET /v1/person/interactions` | Free | Poll interactions |
| `POST /v1/person/single-social-lookup` | $0.148 | Single profile lookup |
| `GET /v1/person/single-social-lookup` | Free | Poll lookup results |
| `POST /v1/company/search` | $0.363 | Search companies |
| `GET /v1/company/search` | Free | Poll company results |
| `POST /v1/company/enrichment` | $0.076 | Enrich company |
| `GET /v1/company/enrichment` | Free | Poll enrichment results |
| `POST /v1/company/funding` | $0.578 | Get funding history |
| `GET /v1/company/funding` | Free | Poll funding results |
| `POST /v1/company/funders` | $1.44 | Get company investors |
| `GET /v1/company/funders` | Free | Poll funder results |
| `POST /v1/company/needs` | $0.219 | Analyze company needs |
| `GET /v1/company/needs` | Free | Poll needs results |
| `POST /v1/company/checkseller` | $0.148 | Check if company sells product |
| `GET /v1/company/checkseller` | Free | Poll checkseller results |

## When to Use

- **Lead Generation**: Find and enrich prospects with contact data
- **Event Intelligence**: Discover attendees at conferences and events
- **Social Monitoring**: Track social media activity of targets
- **Company Research**: Get funding history and investor information
- **Interest Analysis**: Understand prospect interests and skills

## Best Practices

1. **Polling**: Most endpoints are async - use returned request_id to poll for results
2. **Search Tier**: Use appropriate tier (light/medium/premium) based on speed/quality needs
3. **Show Flags**: Set show_emails, show_phone_numbers to include contact data
4. **Callbacks**: Use callback_url for async delivery instead of polling
5. **For errors** — See @skills/obul-api-errors/SKILL.md for complete error code reference and troubleshooting
