---
name: obul-brand-dev
description: API to personalize your product with logos, colors, and company info from any domain. Extract fonts, screenshots, styleguides, and more.
homepage: https://www.brand.dev
metadata:
  obul-skill: "🎨"
  requires.env: OBUL_API_KEY
  requires.primaryEnv: OBUL_API_KEY
registries: {}
---

# Brand.dev

API to personalize your product with logos, colors, and company info from any domain. Extract font information, screenshots, styleguides, NAICS codes, and use AI to extract product data from websites.

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

Base URL: `https://proxy.obul.ai/proxy/https/x402.orth.sh/brand-dev`

To get an Obul API key, sign up at **https://my.obul.ai**.

## Common Operations

### Retrieve Brand Data

Get logos, backdrops, colors, industry, description, and more from any domain.

**Pricing:** $0.03

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/brand-dev/v1/brand/retrieve?domain=stripe.com",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

Returns brand colors, logos, fonts, industry classification, and descriptive text.

### Extract Fonts

Get font information from a brand's website including font families, usage statistics, and fallbacks.

**Pricing:** $0.03

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/brand-dev/v1/brand/fonts?domain=google.com",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Get Stylguide

Extract comprehensive design system information including colors, typography, spacing, and UI components.

**Pricing:** $0.03

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/brand-dev/v1/brand/styleguide?domain=stripe.com",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Take Screenshot

Capture a screenshot of a website with viewport or full-page options.

**Pricing:** $0.03

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/brand-dev/v1/brand/screenshot?domain=stripe.com",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Retrieve by Ticker

Get brand information using a stock ticker symbol.

**Pricing:** $0.03

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/brand-dev/v1/brand/retrieve-by-ticker?ticker=AAPL",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Classify NAICS Code

Classify a brand into a 2022 NAICS code.

**Pricing:** $0.03

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/brand-dev/v1/brand/naics?input=stripe.com",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### AI Query

Use AI to extract specific data points from a brand's website.

**Pricing:** $0.03

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/brand-dev/v1/brand/ai/query",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "domain": "stripe.com",
    "data_to_extract": [
      {"field": "product_name", "description": "The main product name"},
      {"field": "pricing_model", "description": "How they charge customers"}
    ]
  }
}
```

### Extract AI Products

Extract product information from a brand's website using AI.

**Pricing:** $0.03

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/brand-dev/v1/brand/ai/products",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "domain": "stripe.com",
    "maxProducts": 10
  }
}
```

### Retrieve by Email

Get brand information from an email address domain.

**Pricing:** $0.03

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/brand-dev/v1/brand/retrieve-by-email?email=contact@stripe.com",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Retrieve by Name

Get brand information using a company name.

**Pricing:** $0.03

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/brand-dev/v1/brand/retrieve-by-name?name=Stripe",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Retrieve Simplified

Get simplified brand data (domain, title, colors, logos, backdrops).

**Pricing:** $0.03

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/brand-dev/v1/brand/retrieve-simplified?domain=stripe.com",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Retrieve by ISIN

Get brand information using an ISIN (International Securities Identification Number).

**Pricing:** $0.03

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/brand-dev/v1/brand/retrieve-by-isin?isin=US0378331005",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Transaction Identifier

Identify brand from transaction information.

**Pricing:** $0.03

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/brand-dev/v1/brand/transaction_identifier?transaction_info=Stripe+Payment",
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
| `GET /v1/brand/retrieve` | $0.03 | Get full brand data from domain |
| `GET /v1/brand/retrieve-by-name` | $0.03 | Get brand by company name |
| `GET /v1/brand/retrieve-by-ticker` | $0.03 | Get brand by stock ticker |
| `GET /v1/brand/retrieve-by-email` | $0.03 | Get brand from email domain |
| `GET /v1/brand/retrieve-by-isin` | $0.03 | Get brand by ISIN |
| `GET /v1/brand/retrieve-simplified` | $0.03 | Get simplified brand data |
| `GET /v1/brand/fonts` | $0.03 | Extract font information |
| `GET /v1/brand/styleguide` | $0.03 | Extract design system |
| `GET /v1/brand/screenshot` | $0.03 | Take website screenshot |
| `GET /v1/brand/naics` | $0.03 | Classify NAICS code |
| `GET /v1/brand/transaction_identifier` | $0.03 | Identify by transaction |
| `POST /v1/brand/ai/query` | $0.03 | AI extract data points |
| `POST /v1/brand/ai/products` | $0.03 | Extract product info |

## When to Use

- **Brand Personalization**: Auto-populate apps with company logos, colors, and branding
- **Sales Intelligence**: Enrich leads with company brand assets
- **Design Research**: Analyze competitor design systems and typography
- **Compliance**: Classify companies into industry codes
- **Lead Scoring**: Use brand data for B2B intelligence

## Best Practices

1. **Use Simplified Endpoint**: For quick enrichment, use `/retrieve-simplified` for faster responses
2. **Max Speed Mode**: Use `maxSpeed=true` for faster responses with less comprehensive data
3. **Preview Screenshots**: Use `prioritize=speed` for quick previews, `quality` for final captures
4. **Timeout Handling**: Set appropriate timeouts for complex pages (up to 5 minutes)
5. **For errors** — See @skills/obul-api-errors/SKILL.md for complete error code reference and troubleshooting


