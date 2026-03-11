---
name: obul-predictleads
description: Company intelligence API providing job openings, news events, financing
  events, technology detections, and more for any company.
endpoints:
- path: /v3/companies/{id}
  method: GET
  price: $0.04
  description: Get company profile
- path: /v3/companies/{id}/job_openings
  method: GET
  price: $0.04
  description: Get job openings
- path: /v3/job_openings/{id}
  method: GET
  price: $0.04
  description: Get single job opening
- path: /v3/companies/{id}/financing_events
  method: GET
  price: $0.04
  description: Get funding events
- path: /v3/companies/{id}/news_events
  method: GET
  price: $0.04
  description: Get news events
- path: /v3/news_events/{id}
  method: GET
  price: $0.04
  description: Get single news event
- path: /v3/companies/{id}/technology_detections
  method: GET
  price: $0.04
  description: Get tech stack
- path: /v3/companies/{id}/similar_companies
  method: GET
  price: $0.04
  description: Find similar companies
- path: /v3/companies/{id}/products
  method: GET
  price: $0.04
  description: Get products
- path: /v3/products/{id}
  method: GET
  price: $0.04
  description: Get single product
- path: /v3/companies/{id}/connections
  method: GET
  price: $0.04
  description: Get connections
- path: /v3/companies/{id}/github_repositories
  method: GET
  price: $0.04
  description: Get GitHub repos
- path: /v3/companies/{id}/website_evolution
  method: GET
  price: $0.04
  description: Get website evolution
- path: /v3/discover/companies
  method: GET
  price: $0.04
  description: Discover companies
- path: /v3/discover/job_openings
  method: GET
  price: $0.04
  description: Search job openings
- path: /v3/discover/financing_events
  method: GET
  price: $0.04
  description: Search funding events
- path: /v3/discover/news_events
  method: GET
  price: $0.04
  description: Search news events
- path: /v3/discover/products/latest
  method: GET
  price: $0.04
  description: Discover latest products
- path: /v3/discover/portfolio_companies/connections
  method: GET
  price: $0.04
  description: Portfolio connections
- path: /v3/discover/startup_platform_posts
  method: GET
  price: $0.04
  description: Discover startup posts
- path: /v3/discover/technologies/{id}/technology_detections
  method: GET
  price: $0.04
  description: Find companies by tech
- path: /v3/technologies
  method: GET
  price: $0.04
  description: List technologies
- path: /v3/technologies/{id}
  method: GET
  price: $0.04
  description: Get technology
metadata:
  obul-skill: 📊
  requires.env: OBUL_API_KEY
  requires.primaryEnv: OBUL_API_KEY
registries: {}
provider: orthogonal
---

# PredictLeads

Company intelligence API providing job openings, news events, financing events, technology detections, connections, products, and more for any company. Track hiring trends, funding events, and company technologies.

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

Base URL: `https://proxy.obul.ai/proxy/https/x402.orth.sh/predictleads`

To get an Obul API key, sign up at **https://my.obul.ai**.

## Common Operations

### Get Company Profile

Get company profile by ID or domain.

**Pricing:** $0.04

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/predictleads/v3/companies/stripe.com",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Get Job Openings

Get current job openings for a company.

**Pricing:** $0.04

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/predictleads/v3/companies/stripe.com/job_openings",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Search Job Openings

Search and filter job openings across all companies.

**Pricing:** $0.04

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/predictleads/v3/discover/job_openings?location=San+Francisco",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Get Financing Events

Get funding/financing events for a company.

**Pricing:** $0.04

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/predictleads/v3/companies/stripe.com/financing_events",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Discover Financing Events

Search and filter financing events across all companies.

**Pricing:** $0.04

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/predictleads/v3/discover/financing_events",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Get News Events

Get news events for a company.

**Pricing:** $0.04

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/predictleads/v3/companies/stripe.com/news_events",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Get Technology Stack

Get technology detections for a company.

**Pricing:** $0.04

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/predictleads/v3/companies/stripe.com/technology_detections",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Find Similar Companies

Find companies similar to a given company.

**Pricing:** $0.04

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/predictleads/v3/companies/stripe.com/similar_companies",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Discover Companies

Search and filter companies by location and size.

**Pricing:** $0.04

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/predictleads/v3/discover/companies?location=USA&sizes=11-50",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Get Products

Get products associated with a company.

**Pricing:** $0.04

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/predictleads/v3/companies/stripe.com/products",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Get Single Job Opening

Get a single job opening by ID.

**Pricing:** $0.04

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/predictleads/v3/job_openings/{id}",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### List Technologies

List all tracked technologies.

**Pricing:** $0.04

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/predictleads/v3/technologies",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Get Single News Event

Get a single news event by ID.

**Pricing:** $0.04

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/predictleads/v3/news_events/{id}",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Get Single Product

Get a single product by ID.

**Pricing:** $0.04

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/predictleads/v3/products/{id}",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Get GitHub Repositories

Get GitHub repositories associated with a company.

**Pricing:** $0.04

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/predictleads/v3/companies/stripe.com/github_repositories",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Get Website Evolution

Track website changes over time for a company.

**Pricing:** $0.04

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/predictleads/v3/companies/stripe.com/website_evolution",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Get Technology

Get a specific technology by ID or name.

**Pricing:** $0.04

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/predictleads/v3/technologies/{id_or_fuzzy_name}",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Discover Portfolio Connections

Discover connections across portfolio companies.

**Pricing:** $0.04

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/predictleads/v3/discover/portfolio_companies/connections",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Discover Latest Products

Discover the latest products across all companies.

**Pricing:** $0.04

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/predictleads/v3/discover/products/latest",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Find Companies by Technology

Find companies using a specific technology.

**Pricing:** $0.04

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/predictleads/v3/discover/technologies/{technology_id_or_fuzzy_name}/technology_detections",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Discover Startup Posts

Discover posts from startup platforms (Product Hunt, Hacker News, etc.).

**Pricing:** $0.04

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/predictleads/v3/discover/startup_platform_posts",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Discover News Events

Search and filter news events across all companies.

**Pricing:** $0.04

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/predictleads/v3/discover/news_events",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Get Company Connections

Get business connections for a company.

**Pricing:** $0.04

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/predictleads/v3/companies/stripe.com/connections",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

## When to Use

- **Hiring Intelligence**: Track job openings to identify growing companies
- **Sales Intelligence**: Find companies recently funded or in news
- **Technology Tracking**: Monitor tech stacks of target accounts
- **Competitive Analysis**: Find similar companies and track competitors
- **Market Research**: Analyze industry trends and funding patterns

## Best Practices

1. **Filter by Active**: Use active_only=true for current job openings
2. **Track Events**: Use time filters to find recent events
3. **Discover for Prospecting**: Use discover endpoints for company discovery
4. **For errors** — See @skills/obul-api-errors/SKILL.md for complete error code reference and troubleshooting
