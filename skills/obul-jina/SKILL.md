---
name: obul-jina
description: "USE THIS SKILL WHEN: the user wants to perform web search, get SERP results, or search for information on the web. Jina Search provides fast, multilingual web search."
homepage: https://jina.ai
metadata:
  obul-skill:
    emoji: "🔍"
    requires:
      env: ["OBUL_API_KEY"]
      primaryEnv: "OBUL_API_KEY"
registries: {}
---

# Jina Search

Your Search Foundation, Supercharged. Search AI for multilingual and multimodal data. Access Jina's web search capabilities through the Obul proxy. No API key needed — payment is handled automatically.

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

Base URL: `https://proxy.obul.ai/proxy/https/x402.orth.sh/jina-s`

To get an Obul API key, sign up at **https://my.obul.ai**.

## Common Operations

### Web Search

Search the web and get SERP (Search Engine Results Page) results.

**Pricing:** $0.01

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/jina-s/",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "q": "latest AI developments 2025"
  }
}
```

**Response:** JSON with search results including titles, URLs, descriptions.

## Endpoint Pricing Reference

| Endpoint    | Price  | Purpose                  |
|-------------|--------|-------------------------|
| `GET /`     | $0.01  | Web search and SERP     |

## When to Use

- **Web search** — User needs to search the web for information
- **SERP data** — User wants search engine results page data
- **Multilingual search** — User needs search in multiple languages

## Best Practices

- **Use specific queries** — More specific queries return better results
- **URL encode queries** — Ensure special characters are properly encoded

## Error Handling

| Error                       | Cause                                    | Solution                                                                                  |
|-----------------------------|------------------------------------------|-------------------------------------------------------------------------------------------|
| `402 Payment Required`      | Payment not processed or insufficient    | Verify your OBUL_API_KEY is valid and your account has sufficient balance at my.obul.ai.   |
| `400 Bad Request`           | Invalid request parameters               | Ensure required fields are present and correctly formatted.                                |
| `429 Too Many Requests`    | Rate limit exceeded                      | Add a short delay between requests.                                                       |
| `500 Internal Server Error` | Jina service issue                       | Wait a few seconds and retry. If persistent, the service may be experiencing downtime.     |
