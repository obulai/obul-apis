---
name: obul-searchapi
description: "USE THIS SKILL WHEN: the user wants to scrape SERPs from Google, YouTube, Amazon, eBay, Reddit, and 100+ other platforms. SearchAPI provides real-time SERP scraping for various platforms."
homepage: https://www.searchapi.io
metadata:
  obul-skill:
    emoji: "🔍"
    requires:
      env: ["OBUL_API_KEY"]
      primaryEnv: "OBUL_API_KEY"
registries: {}
---

# SearchAPI

Real-time SERP scraping API — Search YouTube, Google, Amazon, TikTok, Instagram, and 100+ other platforms through the Obul proxy. No API key needed — payment is handled automatically.

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

Base URL: `https://proxy.obul.ai/proxy/https/x402.orth.sh/searchapi`

To get an Obul API key, sign up at **https://my.obul.ai**.

## Common Operations

### Search Google

Search Google for web results.

**Pricing:** $0.01

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/searchapi/api/v1/search",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "params": {
    "engine": "google",
    "q": "artificial intelligence news",
    "num": 10
  }
}
```

**Response:** JSON with Google search results.

### Search YouTube Videos

Search YouTube for videos.

**Pricing:** $0.01

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/searchapi/api/v1/search",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "params": {
    "engine": "youtube",
    "q": "python tutorial"
  }
}
```

**Response:** JSON with YouTube video results.

### Search Amazon Products

Search Amazon product listings.

**Pricing:** $0.01

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/searchapi/api/v1/search",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "params": {
    "engine": "amazon",
    "q": "wireless headphones",
    "amazon_domain": "amazon.com"
  }
}
```

**Response:** JSON with Amazon product results.

### Get YouTube Video Details

Get detailed info about a YouTube video.

**Pricing:** $0.01

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/searchapi/api/v1/search",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "params": {
    "engine": "youtube_video",
    "video_id": "dQw4w9WgXcQ"
  }
}
```

**Response:** JSON with YouTube video details.

## Endpoint Pricing Reference

| Endpoint                  | Price  | Purpose                         |
|---------------------------|--------|--------------------------------|
| `GET /api/v1/search`     | $0.01  | Google search                  |
| `GET /api/v1/search`     | $0.01  | YouTube videos                  |
| `GET /api/v1/search`     | $0.01  | YouTube channel                 |
| `GET /api/v1/search`     | $0.01  | YouTube comments                |
| `GET /api/v1/search`     | $0.01  | Amazon products                 |
| `GET /api/v1/search`     | $0.01  | eBay listings                   |
| `GET /api/v1/search`     | $0.01  | Walmart products                |
| `GET /api/v1/search`     | $0.01  | TikTok profile                  |
| `GET /api/v1/search`     | $0.01  | Instagram profile               |
| `GET /api/v1/search`     | $0.01  | Reddit ads                      |
| `GET /api/v1/search`     | $0.01  | Meta/Facebook ads               |
| `GET /api/v1/search`     | $0.01  | LinkedIn ads                    |
| `GET /api/v1/search`     | $0.01  | TikTok ads                      |
| `GET /api/v1/search`     | $0.01  | Apple App Store                 |
| `GET /api/v1/search`     | $0.01  | TripAdvisor                     |
| `GET /api/v1/search`     | $0.01  | Airbnb listings                  |

## When to Use

- **SERP scraping** — User needs search engine results for various platforms
- **Product search** — User wants Amazon, eBay, Walmart product data
- **Social media** — User needs TikTok, Instagram, YouTube data
- **Ads research** — User wants to research ads on various platforms

## Best Practices

- **Set engine** — Use the appropriate engine parameter for each platform
- **Specify domain** — For Amazon/eBay, specify the correct domain
- **Use pagination** — Use page and next_page_token for multiple results
- **Filter results** — Use available filters (price, date, etc.)
- **For errors** — See @skills/obul-api-errors/SKILL.md for complete error code reference and troubleshooting
