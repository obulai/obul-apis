---
name: obul-stableenrich-grokx
description: "USE THIS SKILL WHEN: the user wants to search X (Twitter) posts using natural language, search for X users, or get recent posts from a specific user via the StableEnrich provider."
homepage: https://x.com
metadata:
  obul-skill:
    emoji: "𝕏"
    requires:
      env: ["OBUL_API_KEY"]
      primaryEnv: "OBUL_API_KEY"
registries: {}
---

# Grok (StableEnrich)

Grok provides AI-powered search of X (Twitter) posts using natural language understanding. It allows you to search posts, find users, and get recent tweets from specific accounts through the Obul proxy via StableEnrich.

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

**Base URL:** `https://proxy.obul.ai/proxy/https/stableenrich.dev`

## Common Operations

### X Search

Search X (Twitter) posts using natural language. Grok interprets the query and returns relevant posts with AI-generated summaries.

**Pricing:** $0.02

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/stableenrich.dev/api/grok/x-search",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "query": "AI agents",
    "maxResults": 5
  }
}
```

**Response:** JSON array of matching posts with text, author, timestamp, and engagement metrics.

### User Search

Search for X (Twitter) users by query. Returns user profiles matching the search terms.

**Pricing:** $0.02

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/stableenrich.dev/api/grok/user-search",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "query": "AI researcher",
    "maxResults": 5
  }
}
```

**Response:** JSON array of user profiles with handle, name, bio, and follower count.

### User Posts

Get recent posts from a specific X user by handle.

**Pricing:** $0.02

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/stableenrich.dev/api/grok/user-posts",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "handle": "elonmusk",
    "maxResults": 5
  }
}
```

**Response:** JSON array of recent posts from the user.

## Endpoint Pricing Reference

| Endpoint | Method | Price | Purpose |
|----------|--------|-------|---------|
| `/api/grok/x-search` | POST | $0.02 | Search X posts using natural language |
| `/api/grok/user-search` | POST | $0.02 | Search for X users by query |
| `/api/grok/user-posts` | POST | $0.02 | Get recent posts from a user |

## When to Use

- **Social media research** — When you need to find posts about specific topics on X
- **User discovery** — When you want to find X users matching certain criteria
- **Account monitoring** — When you want to see recent posts from a specific user
- **Trend analysis** — When analyzing discussions around specific topics on X

## Best Practices

- **Use natural language** — Grok understands natural language queries, so be descriptive
- **Limit maxResults** — Set appropriately to control costs
- **Compare with twit.sh** — For structured Twitter v2 lookups, consider obul-twit; for AI-interpreted searches, use Grok
- **For errors** — See @skills/obul-api-errors/SKILL.md for complete error code reference and troubleshooting
