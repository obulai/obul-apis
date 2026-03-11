---
name: obul-coresignal
description: Business data intelligence platform providing company, employee, and
  job data from multiple sources. Access 3B+ regularly updated records.
endpoints:
- path: /v2/company_clean/enrich
  method: GET
  price: $0.11
  description: Clean company by website
- path: /v2/company_clean/collect/{id}
  method: GET
  price: $0.06
  description: Clean company by ID
- path: /v2/company_base/search/filter
  method: POST
  price: $0.06
  description: Search companies
- path: /v2/company_base/search/filter/preview
  method: POST
  price: $0.06
  description: Preview company search
- path: /v2/company_base/collect/{id}
  method: GET
  price: $0.11
  description: Full company by ID
- path: /v2/company_base/collect/{url}
  method: GET
  price: $0.11
  description: Company by profile URL
- path: /v2/company_multi_source/enrich
  method: GET
  price: $0.22
  description: Rich company by website
- path: /v2/company_multi_source/collect/{id}
  method: GET
  price: $0.22
  description: Rich company by ID
- path: /v2/company_multi_source/collect/{url}
  method: GET
  price: $0.22
  description: Rich company by profile URL
- path: /v2/employee_base/search/filter
  method: POST
  price: $0.06
  description: Search employees
- path: /v2/employee_base/search/filter/preview
  method: POST
  price: $0.06
  description: Preview employee search
- path: /v2/employee_base/collect/{id}
  method: GET
  price: $0.11
  description: Employee by ID
- path: /v2/employee_base/collect/{url}
  method: GET
  price: $0.11
  description: Employee by profile URL
- path: /v2/employee_clean/collect/{id}
  method: GET
  price: $0.11
  description: Clean employee by ID
- path: /v2/employee_multi_source/collect/{id}
  method: GET
  price: $0.22
  description: Rich employee by ID
- path: /v2/employee_multi_source/collect/{url}
  method: GET
  price: $0.22
  description: Rich employee by profile URL
- path: /v2/job_base/search/filter
  method: POST
  price: $0.06
  description: Search jobs
- path: /v2/job_base/search/filter/preview
  method: POST
  price: $0.06
  description: Preview job search
- path: /v2/job_base/collect/{id}
  method: GET
  price: $0.11
  description: Job details by ID
- path: /v2/employee_post/collect/{id}
  method: GET
  price: $0.11
  description: LinkedIn post by ID
- path: /v2/employee_post/search/filter
  method: POST
  price: $0.06
  description: Search posts
metadata:
  obul-skill: 👥
  requires.env: OBUL_API_KEY
  requires.primaryEnv: OBUL_API_KEY
registries: {}
provider: orthogonal
---

# Coresignal

Business data intelligence platform providing company, employee, and job data from multiple sources. Access over 3 billion regularly updated records via simple filters and data collection endpoints.

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

Base URL: `https://proxy.obul.ai/proxy/https/x402.orth.sh/coresignal`

To get an Obul API key, sign up at **https://my.obul.ai**.

## Common Operations

### Enrich Company

Look up a company by website domain and get full cleaned company profile.

**Pricing:** $0.11

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/coresignal/v2/company_clean/enrich?website=stripe.com",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

Returns deduplicated, normalized data including name, industry, size, location, social URLs, and technology stack.

### Search Companies

Search for companies using filters like name, industry, country, and employee count.

**Pricing:** $0.06

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/coresignal/v2/company_base/search/filter",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "name": "Google",
    "industry": "Software Development",
    "country": "United States"
  }
}
```

Returns array of company IDs for use with collect endpoints.

### Search Employees

Search for professionals using filters like name, headline, location, skills, and experience.

**Pricing:** $0.06

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/coresignal/v2/employee_base/search/filter",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "headline": "Software Engineer",
    "location": "San Francisco",
    "country": "United States"
  }
}
```

### Collect Employee Profile

Get full employee profile by ID from search results.

**Pricing:** $0.11

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/coresignal/v2/employee_base/collect/374311229",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

Returns professional data including name, headline, work experience, education, and skills.

### Collect Company Profile

Get full company profile by ID.

**Pricing:** $0.11

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/coresignal/v2/company_base/collect/4744382",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Search Jobs

Search for job listings using filters like title, location, and employment type.

**Pricing:** $0.06

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/coresignal/v2/job_base/search/filter",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "title": "Software Engineer",
    "location": "San Francisco, CA",
    "employment_type": "Full-time"
  }
}
```

### Get Multi-Source Company

Get most comprehensive company profile aggregated from multiple sources.

**Pricing:** $0.22

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/coresignal/v2/company_multi_source/enrich?website=google.com",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Search Employee Posts

Search for professional network posts using filters.

**Pricing:** $0.06

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/coresignal/v2/employee_post/search/filter",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "author_profile_url": "https://linkedin.com/in/sundarpichai",
    "article_body": "artificial intelligence"
  }
}
```

### Preview Employee Search

Preview employee search results with summary data.

**Pricing:** $0.06

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/coresignal/v2/employee_base/search/filter/preview",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "full_name": "Sundar Pichai",
    "headline": "CEO",
    "location": "San Francisco"
  }
}
```

### Preview Company Search

Preview company search results with summary data.

**Pricing:** $0.06

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/coresignal/v2/company_base/search/filter/preview",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "name": "Google",
    "industry": "Software Development",
    "country": "United States"
  }
}
```

### Preview Job Search

Preview job search results with summary data.

**Pricing:** $0.06

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/coresignal/v2/job_base/search/filter/preview",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "title": "Software Engineer",
    "location": "San Francisco, CA",
    "employment_type": "Full-time"
  }
}
```

### Get Employee Post

Get a full professional network post by ID.

**Pricing:** $0.11

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/coresignal/v2/employee_post/collect/7431869637207928834",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Collect Clean Employee

Get cleaned, deduplicated employee profile by ID.

**Pricing:** $0.11

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/coresignal/v2/employee_clean/collect/374311229",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Collect Clean Company

Get cleaned, deduplicated company profile by ID.

**Pricing:** $0.06

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/coresignal/v2/company_clean/collect/4744382",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Collect Employee by Profile URL

Get employee profile by professional network URL.

**Pricing:** $0.11

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/coresignal/v2/employee_base/collect/https%3A%2F%2Fwww.linkedin.com%2Fin%2Fsundarpichai",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Collect Company by Profile URL

Get company profile by professional network URL.

**Pricing:** $0.11

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/coresignal/v2/company_base/collect/https%3A%2F%2Fwww.linkedin.com%2Fcompany%2Fgoogle",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Get Multi-Source Employee

Get comprehensive employee profile from multiple sources.

**Pricing:** $0.22

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/coresignal/v2/employee_multi_source/collect/374311229",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Get Multi-Source Company by Profile URL

Get comprehensive company profile by professional network URL.

**Pricing:** $0.22

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/coresignal/v2/company_multi_source/collect/https%3A%2F%2Fwww.linkedin.com%2Fcompany%2Fgoogle",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Get Job Details

Get full job listing by ID.

**Pricing:** $0.11

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/coresignal/v2/job_base/collect/406480270",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

## When to Use

- **Recruiting**: Find candidates with specific skills and experience
- **Sales Prospecting**: Enrich leads with company and contact data
- **Market Research**: Analyze company sizes, industries, and growth
- **Job Market Analysis**: Track hiring trends and job openings
- **Competitor Intelligence**: Monitor company headcount and technologies

## Best Practices

1. **Search First, Then Collect**: Use search to get IDs, then collect full profiles
2. **Preview for Testing**: Use preview endpoints to test filters before full search
3. **Multi-Source for Rich Data**: Use multi-source endpoints for comprehensive data
4. **Clean Endpoints for Deduplication**: Use clean endpoints for deduplicated, normalized data
5. **For errors** — See @skills/obul-api-errors/SKILL.md for complete error code reference and troubleshooting


