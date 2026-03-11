---
name: obul-stableenrich
description: "USE THIS SKILL WHEN: the user wants to enrich a person or company, look up a LinkedIn profile, verify an email address, find contact information, search for social profiles, look up people by name/phone/address, or search for businesses and places. Provides pay-per-use lead enrichment via StableEnrich through the Obul proxy."
homepage: https://stableenrich.dev
metadata:
  obul-skill:
    emoji: "👤"
    requires:
      env: [ "OBUL_API_KEY" ]
      primaryEnv: "OBUL_API_KEY"
registries: {}
---

# StableEnrich

StableEnrich's x402 API provides pay-per-use access to people and company enrichment, LinkedIn scraping, email
verification, social profile enrichment, people lookup, and business/place discovery. It wraps Apollo, Clado, Hunter,
Influencer API, Whitepages, and Google Maps behind x402 micropayments. No separate API keys needed for any upstream
provider — each request is paid individually through the Obul proxy.

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

Base URL: `https://proxy.obul.ai/proxy/https/stableenrich.dev`

## Common Operations

### People Search (Apollo)

Search for people by keywords, job title, location, or company. Returns matching profiles with name, title, company,
and contact details.

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

**Response:** Array of people objects with name, title, company, location, email (may be obfuscated), and LinkedIn URL.
Use people-enrich with a specific email or person ID to get full details. Apollo performs exact matching on organization
IDs — verify org IDs via org-search first when filtering by company.

### LinkedIn Profile Lookup (Clado)

Scrape a public LinkedIn profile to get full professional details including experience, education, skills, and headline.

**Pricing:** $0.04

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/stableenrich.dev/api/clado/linkedin-scrape",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "linkedin_url": "https://linkedin.com/in/johndoe"
  }
}
```

**Response:** JSON object with the person's headline, current position, work experience history, education, skills, and
profile summary.

### Email Verification (Hunter)

Verify whether an email address is deliverable, risky, or invalid. Checks MX records, SMTP response, and mailbox
existence.

**Pricing:** $0.03

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/stableenrich.dev/api/hunter/email-verifier",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "email": "john@acme.com"
  }
}
```

**Response:** JSON object with verification result (deliverable, risky, or undeliverable), confidence score, and details
about MX records, SMTP check, and whether the address is a catch-all, disposable, or role-based.

### Social Profile Enrichment (Influencer)

Enrich a social media profile to get cross-platform data including follower counts, engagement metrics, and contact
information. Supports Instagram, TikTok, YouTube, Twitter/X, and Facebook.

**Pricing:** $0.40

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/stableenrich.dev/api/influencer/enrich-by-social",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "platform": "instagram",
    "username": "johndoe",
    "enrichment_mode": "full",
    "email_required": false
  }
}
```

**Response:** JSON object with profile data including follower count, engagement rate, bio, contact info, and
cross-platform links. Set `email_required: true` to only return results that include an email address.

### Places Search (Google Maps)

Search for businesses and places by text query. Returns names, addresses, ratings, phone numbers, and opening hours.
Use the full variant for complete details or partial for basic info at lower cost.

**Pricing:** $0.02 (partial) / $0.08 (full)

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/stableenrich.dev/api/google-maps/text-search/full",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "textQuery": "coffee shops near Times Square NYC",
    "maxResultCount": 10
  }
}
```

**Response:** Array of place objects with name, address, phone number, website, rating, review count, opening hours, and
Google Maps place ID. Use place-details with the place ID for even more detail.

## Endpoint Pricing Reference

| Endpoint                                      | Method | Price | Purpose                                              |
|-----------------------------------------------|--------|-------|------------------------------------------------------|
| `/api/apollo/people-search`                   | POST   | $0.02 | Search people by keywords, title, location, company  |
| `/api/apollo/people-enrich`                   | POST   | $0.0495 | Enrich a person by email or person ID              |
| `/api/apollo/people-enrich/bulk`              | POST   | $0.495 | Bulk enrich up to 10 people                         |
| `/api/apollo/org-search`                      | POST   | $0.02 | Search organizations by keywords and location        |
| `/api/apollo/org-enrich`                      | POST   | $0.0495 | Enrich an organization by domain                   |
| `/api/apollo/org-enrich/bulk`                 | POST   | $0.495 | Bulk enrich up to 10 organizations by domain        |
| `/api/clado/linkedin-scrape`                  | POST   | $0.04 | Scrape a LinkedIn profile                            |
| `/api/clado/contacts-enrich`                  | POST   | $0.20 | Enrich contacts by LinkedIn URL, email, or phone     |
| `/api/hunter/email-verifier`                  | POST   | $0.03 | Verify email deliverability                          |
| `/api/influencer/enrich-by-email`             | POST   | $0.40 | Enrich social profiles by email                      |
| `/api/influencer/enrich-by-social`            | POST   | $0.40 | Enrich social profiles by platform username          |
| `/api/whitepages/person-search`               | POST   | $0.44 | Look up a person by name, phone, or address          |
| `/api/whitepages/property-search`             | POST   | $0.44 | Look up a property by street address                 |
| `/api/google-maps/text-search/full`           | POST   | $0.08 | Search places by text query (full details)           |
| `/api/google-maps/text-search/partial`        | POST   | $0.02 | Search places by text query (basic info)             |
| `/api/google-maps/nearby-search/full`         | POST   | $0.08 | Search places near a location (full details)         |
| `/api/google-maps/nearby-search/partial`      | POST   | $0.02 | Search places near a location (basic info)           |
| `/api/google-maps/place-details/full`         | GET    | $0.05 | Get full details for a place by ID                   |
| `/api/google-maps/place-details/partial`      | GET    | $0.02 | Get basic details for a place by ID                  |

## When to Use

- **Lead generation** — Find potential customers or partners by searching people and companies matching specific criteria.
- **Contact discovery** — Get email addresses, phone numbers, and social profiles for a known person or company.
- **LinkedIn research** — Scrape LinkedIn profiles to get professional background, experience, and skills.
- **Email verification** — Check whether an email address is valid before sending outreach to reduce bounce rates.
- **Influencer research** — Enrich social media profiles to get follower counts, engagement rates, and contact info.
- **People lookup** — Find people by name, phone, or address using Whitepages data.
- **Local business discovery** — Search for businesses, restaurants, or services by location using Google Maps data.
- **Sales prospecting** — Combine people search, enrichment, and email verification for a full prospecting workflow.
- **Company research** — Enrich organizations by domain to get employee count, industry, funding, and tech stack.

## Best Practices

- **Verify org IDs first** — Apollo performs exact matching on organization IDs and domains. Always use org-search to
  find the correct ID before filtering people searches by company.
- **Enrich obfuscated results** — Apollo people-search may return obfuscated names or emails. Use people-enrich with
  the email or person ID to get full details.
- **Use partial variants for Google Maps** — The partial endpoints cost 60-75% less than full. Use partial for listings
  and full only when you need complete details.
- **Use `state_code` for Whitepages** — Whitepages requires two-letter state abbreviations (e.g., "CA", "NY") in the
  `state_code` field. Using `state` instead is silently ignored.
- **Batch with bulk endpoints** — Apollo supports bulk enrichment for up to 10 people or organizations per request,
  which is cheaper per-record than individual calls.
- **Set `email_required` for Influencer** — When you need an email address from social enrichment, set
  `email_required: true` to filter out results without email.
- **For errors** — See @skills/obul-api-errors/SKILL.md for complete error code reference and troubleshooting
