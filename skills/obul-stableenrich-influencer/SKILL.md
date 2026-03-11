---
name: obul-stableenrich-influencer
description: "USE THIS SKILL WHEN: the user wants to enrich social media influencer profiles across Instagram, TikTok, YouTube, Twitter/X, Facebook to get follower counts, engagement metrics, and contact info via StableEnrich."
homepage: https://influencerapi.com
metadata:
  obul-skill:
    emoji: "📱"
    requires:
      env: ["OBUL_API_KEY"]
      primaryEnv: "OBUL_API_KEY"
registries: {}
---

# Influencer API (StableEnrich)

The Influencer API helps you enrich social media influencer profiles across multiple platforms (Instagram, TikTok, YouTube, Twitter/X, Facebook). Use this for influencer marketing research and social media contact enrichment through the Obul proxy via StableEnrich.

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

### Enrich by Email

Find social media profiles associated with an email address.

**Pricing:** $0.40

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/stableenrich.dev/api/influencer/enrich-by-email",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "email": "creator@example.com",
    "platform": "instagram",
    "enrichment_mode": "enhanced"
  }
}
```

**Response:** JSON with social media profiles found for the email, including follower counts and engagement metrics.

### Enrich by Social

Enrich a social media profile with additional data including contact info.

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
    "username": "example_creator",
    "enrichment_mode": "enhanced",
    "email_required": "must_have"
  }
}
```

**Response:** JSON with profile data including follower count, engagement rate, bio, contact info, and cross-platform links.

## Endpoint Pricing Reference

| Endpoint | Method | Price | Purpose |
|----------|--------|-------|---------|
| `/api/influencer/enrich-by-email` | POST | $0.40 | Find social profiles by email |
| `/api/influencer/enrich-by-social` | POST | $0.40 | Enrich social profile by platform username |

## When to Use

- **Influencer research** — Get follower counts, engagement rates, and contact info
- **Influencer marketing** — Find influencers for campaigns by platform and niche
- **Contact discovery** — Get email addresses for influencer outreach
- **Cross-platform analysis** — Find same influencer across multiple platforms

## Best Practices

- **Set email_required** — When you need an email address, set `email_required: "must_have"` to filter results
- **Use enrichment_mode: enhanced** — For more complete data
- **Specify platform** — Target specific platforms for faster results
- **For errors** — See @skills/obul-api-errors/SKILL.md for complete error code reference and troubleshooting
