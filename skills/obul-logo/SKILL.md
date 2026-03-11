---
name: obul-logo
description: "USE THIS SKILL WHEN: the user wants to find company logos, brand icons, or lookup company information by domain. Logo.dev provides brand search and company data."
homepage: https://logo.dev
metadata:
  obul-skill:
    emoji: "🏷️"
    requires:
      env: ["OBUL_API_KEY"]
      primaryEnv: "OBUL_API_KEY"
registries: {}
---

# Logo.dev

Logo.dev - Brand search and company data API. Find company logos, brand icons, and lookup company information by domain through the Obul proxy. No API key needed — payment is handled automatically.

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

Base URL: `https://proxy.obul.ai/proxy/https/x402.orth.sh/logo`

To get an Obul API key, sign up at **https://my.obul.ai**.

## Common Operations

### Search Brands

Search for company domains by brand name.

**Pricing:** $0.01

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/logo/search",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "params": {
    "q": "stripe"
  }
}
```

**Response:** JSON with company logo URLs and domain information.

## Endpoint Pricing Reference

| Endpoint     | Price  | Purpose                       |
|--------------|--------|------------------------------|
| `GET /search`| $0.01  | Search brands by name        |

## When to Use

- **Logo lookup** — User needs company logos for display
- **Brand search** — User wants to find company by brand name
- **Domain resolution** — User needs to map brand names to domains

## Best Practices

- **Use specific queries** — More specific brand names return better results
- **Check multiple results** — Several companies may match similar names
- **For errors** — See @skills/obul-api-errors/SKILL.md for complete error code reference and troubleshooting
