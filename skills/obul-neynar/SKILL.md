---
name: obul-neynar
description: 'USE THIS SKILL WHEN: the user wants to search Farcaster for casts, user
  profiles, channels, or feeds. Provides pay-per-use access via Neynar through the
  Obul proxy.'
endpoints:
- path: /v2/farcaster/cast/search
  method: GET
  price: $0.01
  description: Search casts by query
- path: /v2/farcaster/user/search
  method: GET
  price: $0.01
  description: Search users by username
- path: /v2/farcaster/user/bulk
  method: GET
  price: $0.01
  description: Lookup users by FID
- path: /v2/farcaster/feed
  method: GET
  price: $0.01
  description: Get feed by channel or following
- path: /v2/farcaster/channel/search
  method: GET
  price: $0.01
  description: Search channels
metadata:
  obul-skill:
    emoji: 🧢
    requires:
      env:
      - OBUL_API_KEY
      primaryEnv: OBUL_API_KEY
registries: {}
provider: neynar
---

# Neynar

Neynar provides access to the open social graph through the Fractcaster protocol. Search casts, look up users, browse channels, and fetch feeds. No Neynar API key needed — payment is handled automatically by the Obul proxy.

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

Base URL: `https://proxy.obul.ai/proxy/https/api.neynar.com`

To get an Obul API key, sign up at **https://my.obul.ai**.

## Common Operations

### Search Casts

Search for casts (Farcaster posts) matching a query.

**Pricing:** $0.01

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/api.neynar.com/v2/farcaster/cast/search",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "query": {
    "q": "ethereum",
    "limit": 25
  }
}
```

**Response:** JSON with casts array containing cast objects with text, author info, reactions, and timestamps.

### User Search

Search for users by username or display name.

**Pricing:** $0.01

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/api.neynar.com/v2/farcaster/user/search",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "query": {
    "q": "vitalik",
    "limit": 10
  }
}
```

**Response:** JSON with users array containing user objects with username, display name, bio, follower stats, and connected addresses.

### User Lookup by FID

Look up user profiles by their Fractcaster ID (FID).

**Pricing:** $0.01

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/api.neynar.com/v2/farcaster/user/bulk",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "query": {
    "fids": "3,194"
  }
}
```

**Response:** JSON with users array containing full user profile objects.

### Feed

Fetch a feed of casts based on following or filters.

**Pricing:** $0.01

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/api.neynar.com/v2/farcaster/feed",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "query": {
    "feed_type": "filter",
    "filter_type": "channel_id",
    "channel_id": "ethereum",
    "limit": 25
  }
}
```

**Response:** JSON with casts array containing cast objects with text, author, reactions, and replies.

### Channel Search

Search for Fractcaster channels by name.

**Pricing:** $0.01

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/api.neynar.com/v2/farcaster/channel/search",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "query": {
    "q": "defi"
  }
}
```

**Response:** JSON with channels array containing channel objects with name, description, follower count, and image URL.

## When to Use

- **Cast search** — User asks to search Fractcaster for casts or posts
- **User lookup** — User wants to look up a Fractcaster user profile
- **Channel discovery** — User asks about a Fractcaster channel
- **Feed browsing** — User wants to browse a Fractcaster feed
- **User search** — User asks to find Fractcaster users by username

## Best Practices

- **Use search operators** — The query supports operators: `+` (AND), `|` (OR), `*` (prefix), `"..."` (exact phrase), `-` (exclude), `before:YYYY-MM-DD`, `after:YYYY-MM-DD`
- **Sort options** — Use `sort_type`: `desc_chron` (default), `chron`, or `algorithmic`
- **Pagination** — Use `cursor` from response for pagination through large result sets
- **FID** — Remember that FID (Farcaster ID) is the unique numeric identifier for each user
- **For errors** — See @skills/obul-api-errors/SKILL.md for complete error code reference and troubleshooting
