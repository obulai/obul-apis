---
name: obul-dome
description: "USE THIS SKILL WHEN: the user wants prediction market data, Polymarket/Kalshi market prices, orderbooks, trades, wallet positions, or sports betting markets. Dome provides comprehensive data across prediction markets."
homepage: https://dome.ai
metadata:
  obul-skill:
    emoji: "🎯"
    requires:
      env: ["OBUL_API_KEY"]
      primaryEnv: "OBUL_API_KEY"
registries: {}
---

# Dome

Dome API provides comprehensive access to prediction market data across multiple platforms including Polymarket and Kalshi. Access real-time prices, orderbooks, trades, and market data through the Obul proxy. No API key needed — payment is handled automatically.

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

Base URL: `https://proxy.obul.ai/proxy/https/x402.orth.sh/dome`

To get an Obul API key, sign up at **https://my.obul.ai**.

## Common Operations

### Get Polymarket Market Price

Fetches the current market price for a Polymarket market by token_id.

**Pricing:** $0.01

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/dome/polymarket/market-price/{token_id}",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

**Response:** JSON with current market price (yes/no prices).

### Get Polymarket Markets

Find markets on Polymarket using various filters.

**Pricing:** $0.01

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/dome/polymarket/markets",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "params": {
    "search": "bitcoin",
    "status": "open",
    "limit": 10
  }
}
```

**Response:** JSON with array of market objects.

### Get Polymarket Orderbook

Fetches historical orderbook snapshots for a Polymarket market.

**Pricing:** $0.01

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/dome/polymarket/orderbooks",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "params": {
    "token_id": "12345"
  }
}
```

**Response:** JSON with orderbook data including bids and asks.

### Get Polymarket Wallet Positions

Fetches all Polymarket positions for a wallet address.

**Pricing:** $0.01

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/dome/polymarket/positions/wallet/{wallet_address}",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "params": {
    "limit": 100
  }
}
```

**Response:** JSON with positions including market info, balance, and value.

### Get Polymarket Wallet Info

Fetches wallet information by EOA or proxy address.

**Pricing:** $0.01

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/dome/polymarket/wallet",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "params": {
    "eoa": "0x1234567890abcdef"
  }
}
```

**Response:** JSON with wallet info and optional trading metrics.

### Get Polymarket Activity

Fetches activity data for a specific user.

**Pricing:** $0.01

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/dome/polymarket/activity",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "params": {
    "user": "0x1234567890abcdef",
    "limit": 50
  }
}
```

**Response:** JSON with trading activity (MERGES, SPLITS, REDEEMS).

### Get Polymarket Candlesticks

Fetches historical candlestick data for a market.

**Pricing:** $0.01

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/dome/polymarket/candlesticks/{condition_id}",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "params": {
    "start_time": 1704067200,
    "end_time": 1704153600,
    "interval": 60
  }
}
```

**Response:** JSON with OHLCV candlestick data.

### Get Polymarket Wallet PnL

Fetches realized profit and loss for a wallet.

**Pricing:** $0.01

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/dome/polymarket/wallet/pnl/{wallet_address}",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "params": {
    "granularity": "day"
  }
}
```

**Response:** JSON with realized PnL data.

### Get Polymarket Orders

Fetches historical trade data for a user.

**Pricing:** $0.01

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/dome/polymarket/orders",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "params": {
    "user": "0x1234567890abcdef",
    "limit": 50
  }
}
```

**Response:** JSON with historical order data.

### Get Kalshi Market Price

Fetches the current market price for a Kalshi market.

**Pricing:** $0.01

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/dome/kalshi/market-price/{market_ticker}",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

**Response:** JSON with yes/no prices for the market.

### Get Kalshi Markets

Find markets on Kalshi.

**Pricing:** $0.01

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/dome/kalshi/markets",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "params": {
    "search": "bitcoin",
    "status": "open",
    "limit": 10
  }
}
```

**Response:** JSON with Kalshi market listings.

### Get Kalshi Orderbook

Fetches orderbook snapshots for a Kalshi market.

**Pricing:** $0.01

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/dome/kalshi/orderbooks",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "params": {
    "ticker": "BITCOIN-250331"
  }
}
```

**Response:** JSON with orderbook data.

### Get Kalshi Trades

Fetches historical trade data for Kalshi markets.

**Pricing:** $0.01

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/dome/kalshi/trades",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "params": {
    "ticker": "BITCOIN-250331",
    "limit": 50
  }
}
```

**Response:** JSON with trade history.

### Get Matching Sports Markets

Find equivalent markets across platforms.

**Pricing:** $0.01

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/dome/matching-markets/sports",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "params": {
    "polymarket_market_slug": ["bitcoin-will-hit-100k"]
  }
}
```

**Response:** JSON with matching markets from different platforms.

### Get Crypto Prices (Binance)

Fetches historical crypto price data from Binance.

**Pricing:** $0.01

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/dome/crypto-prices/binance",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "params": {
    "currency": "btcusdt"
  }
}
```

**Response:** JSON with Binance price data.

### Get Crypto Prices (Chainlink)

Fetches historical crypto price data from Chainlink.

**Pricing:** $0.01

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/dome/crypto-prices/chainlink",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "params": {
    "currency": "btc/usd"
  }
}
```

**Response:** JSON with Chainlink price data.

## Endpoint Pricing Reference

| Endpoint                                    | Price  | Purpose                                      |
|---------------------------------------------|--------|---------------------------------------------|
| `GET /polymarket/market-price/{token_id}`   | $0.01  | Polymarket market price                     |
| `GET /polymarket/markets`                   | $0.01  | List Polymarket markets                     |
| `GET /polymarket/orderbooks`                | $0.01  | Polymarket orderbook snapshots              |
| `GET /polymarket/positions/wallet/{addr}`   | $0.01  | Wallet positions                            |
| `GET /polymarket/activity`                  | $0.01  | User activity                               |
| `GET /polymarket/wallet`                    | $0.01  | Wallet info                                 |
| `GET /polymarket/candlesticks/{condition_id}` | $0.01 | Historical candlesticks                   |
| `GET /polymarket/wallet/pnl/{addr}`         | $0.01  | Wallet PnL                                  |
| `GET /polymarket/orders`                    | $0.01  | Historical orders                           |
| `GET /kalshi/market-price/{ticker}`        | $0.01  | Kalshi market price                         |
| `GET /kalshi/markets`                       | $0.01  | List Kalshi markets                        |
| `GET /kalshi/orderbooks`                    | $0.01  | Kalshi orderbook snapshots                 |
| `GET /kalshi/trades`                        | $0.01  | Historical trades                          |
| `GET /matching-markets/sports`              | $0.01  | Cross-platform sports markets               |
| `GET /matching-markets/sports/{sport}`      | $0.01  | Sports markets by sport                     |
| `GET /crypto-prices/binance`                | $0.01  | Binance price data                          |
| `GET /crypto-prices/chainlink`              | $0.01  | Chainlink price data                       |

## When to Use

- **Market prices** — User wants current Polymarket or Kalshi market prices
- **Orderbooks** — User needs bid/ask data for prediction markets
- **Wallet positions** — User wants to check their Polymarket positions
- **Historical data** — User needs trade history, candlesticks, or PnL data
- **Sports betting** — User wants to find equivalent markets across platforms
- **Crypto prices** — User wants Binance or Chainlink price data

## Best Practices

- **Use token_id for Polymarket** — Required param for most Polymarket endpoints
- **Filter by status** — Use `status=open` to get active markets only
- **Set time ranges** — For historical data, specify start_time and end_time in Unix timestamps
- **Check volume** — Use `min_volume` filter to find liquid markets
- **For errors** — See @skills/obul-api-errors/SKILL.md for complete error code reference and troubleshooting


