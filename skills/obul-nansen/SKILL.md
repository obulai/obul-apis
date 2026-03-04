---
name: obul-nansen
description: "USE THIS SKILL WHEN: the user wants smart money analytics, whale tracking, token net flows, DEX trades by labeled wallets, or aggregate smart money holdings via Nansen."
homepage: https://www.nansen.ai/api
metadata:
  obul-skill:
    emoji: "🧠"
    requires:
      env: ["OBUL_API_KEY"]
      primaryEnv: "OBUL_API_KEY"
registries: {}
---

# Nansen

Nansen provides premium onchain analytics — smart money tracking, whale movements, and token flows — as a pay-per-use
API through the Obul proxy. Each request is paid individually with no Nansen account or API key required. Only the three
smart money endpoints below are available via x402; other Nansen API endpoints require a direct Nansen subscription.

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

Base URL: `https://proxy.obul.ai/proxy/https/api.nansen.ai`

To get an Obul API key, sign up at **https://my.obul.ai**.

## Common Operations

### Smart Money Net Flows

Retrieve token net flow data aggregated across labeled smart money wallets. Shows which tokens smart money is
accumulating or dumping over 1h, 24h, 7d, and 30d timeframes.

**Pricing:** $0.05

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/api.nansen.ai/api/v1/smart-money/netflow",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "chains": ["ethereum"],
    "filters": {
      "include_native_tokens": true,
      "include_stablecoins": false
    },
    "pagination": {
      "page": 1,
      "items_per_page": 10
    },
    "order_by": [
      {
        "field": "net_flow_24h_usd",
        "direction": "DESC"
      }
    ]
  }
}
```

**Response:** JSON array of tokens with net flow amounts in USD across timeframes (1h, 24h, 7d, 30d), number of smart
money wallets involved, and token metadata.

### Smart Money DEX Trades

Get real-time DEX trades executed by Nansen-labeled smart money wallets. Useful for spotting what whales are trading
right now.

**Pricing:** $0.05

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/api.nansen.ai/api/v1/smart-money/dex-trades",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "chains": ["ethereum"],
    "filters": {
      "include_smart_money_labels": ["Smart Money"]
    },
    "pagination": {
      "page": 1,
      "items_per_page": 10
    }
  }
}
```

**Response:** JSON array of recent DEX trades with wallet label, token pair, trade size in USD, DEX used, transaction
hash, and timestamp.

### Smart Money Holdings

View aggregate token holdings across all Nansen-labeled smart money wallets. Shows what the smart money is currently
holding.

**Pricing:** $0.05

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/api.nansen.ai/api/v1/smart-money/holdings",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "chains": ["ethereum"],
    "filters": {
      "include_stablecoins": false
    },
    "pagination": {
      "page": 1,
      "items_per_page": 10
    }
  }
}
```

**Response:** JSON array of tokens held by smart money wallets with aggregate USD value, number of holders, percentage
change over time, and token metadata.

## Endpoint Pricing Reference

| Endpoint                                | Price | Purpose                                        |
|-----------------------------------------|-------|------------------------------------------------|
| `POST /api/v1/smart-money/netflow`      | $0.05 | Token net flows by smart money (1h/24h/7d/30d) |
| `POST /api/v1/smart-money/dex-trades`   | $0.05 | Real-time DEX trades by labeled wallets        |
| `POST /api/v1/smart-money/holdings`     | $0.05 | Aggregate smart money token holdings           |

## When to Use

- **Smart money tracking** -- User wants to know what tokens smart money is buying or selling.
- **Whale watching** -- User wants to see large DEX trades by labeled wallets in real time.
- **Alpha hunting** -- User wants to find tokens with significant smart money inflows before they pump.
- **Portfolio intel** -- User wants to see what tokens smart money currently holds.
- **Chain comparison** -- User wants to compare smart money activity between Ethereum and Solana.

## Best Practices

- **Filter out stablecoins for signal** -- Set `include_stablecoins: false` to focus on tokens with alpha potential
  rather than stable parking.
- **Use order_by for ranking** -- Sort by `net_flow_24h_usd` descending to surface the highest-conviction moves first.
- **Combine endpoints for context** -- Cross-reference net flows with holdings to distinguish new accumulation from
  existing positions being increased.
- **Paginate large results** -- Default to 10 items per page and paginate forward to avoid oversized responses.
- **Respect rate limits** -- The API allows 5 requests per second and 60 per minute. Add short delays in batch
  workflows.
- **Chain selection matters** -- Pass `["ethereum"]`, `["solana"]`, or both in the `chains` array depending on which
  ecosystem you need.

## Error Handling

| Error                      | Cause                                        | Solution                                                                                 |
|----------------------------|----------------------------------------------|------------------------------------------------------------------------------------------|
| `402 Payment Required`     | Payment not processed or insufficient        | Verify your OBUL_API_KEY is valid and your account has sufficient balance at my.obul.ai. |
| `401 Unauthorized`         | Endpoint is not x402-enabled                 | Only netflow, dex-trades, and holdings are available. Other Nansen endpoints require a direct subscription. |
| `422 Unprocessable Entity` | Invalid request body or unsupported values   | Check that `chains` contains valid values and filter fields are correctly typed.          |
| `429 Too Many Requests`    | Rate limit exceeded (5/sec or 60/min)        | Add delays between requests. Back off and retry after a few seconds.                     |
| `500 Internal Server Error`| Upstream Nansen service issue                | Wait a few seconds and retry. If persistent, the service may be experiencing downtime.   |
