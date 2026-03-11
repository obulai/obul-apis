---
name: obul-dome
description: 'USE THIS SKILL WHEN: the user wants prediction market data, Polymarket/Kalshi
  market prices, orderbooks, trades, wallet positions, or sports betting markets.
  Dome provides comprehensive data across prediction markets.'
endpoints:
- path: /polymarket/market-price/{token_id}
  method: GET
  price: $0.01
  description: Polymarket market price
- path: /polymarket/markets
  method: GET
  price: $0.01
  description: List Polymarket markets
- path: /polymarket/orderbooks
  method: GET
  price: $0.01
  description: Polymarket orderbook snapshots
- path: /polymarket/positions/wallet/{addr}
  method: GET
  price: $0.01
  description: Wallet positions
- path: /polymarket/activity
  method: GET
  price: $0.01
  description: User activity
- path: /polymarket/wallet
  method: GET
  price: $0.01
  description: Wallet info
- path: /polymarket/candlesticks/{condition_id}
  method: GET
  price: $0.01
  description: Historical candlesticks
- path: /polymarket/wallet/pnl/{addr}
  method: GET
  price: $0.01
  description: Wallet PnL
- path: /polymarket/orders
  method: GET
  price: $0.01
  description: Historical orders
- path: /kalshi/market-price/{ticker}
  method: GET
  price: $0.01
  description: Kalshi market price
- path: /kalshi/markets
  method: GET
  price: $0.01
  description: List Kalshi markets
- path: /kalshi/orderbooks
  method: GET
  price: $0.01
  description: Kalshi orderbook snapshots
- path: /kalshi/trades
  method: GET
  price: $0.01
  description: Historical trades
- path: /matching-markets/sports
  method: GET
  price: $0.01
  description: Cross-platform sports markets
- path: /matching-markets/sports/{sport}
  method: GET
  price: $0.01
  description: Sports markets by sport
- path: /crypto-prices/binance
  method: GET
  price: $0.01
  description: Binance price data
- path: /crypto-prices/chainlink
  method: GET
  price: $0.01
  description: Chainlink price data
metadata:
  obul-skill:
    emoji: 🎯
    requires:
      env:
      - OBUL_API_KEY
      primaryEnv: OBUL_API_KEY
registries: {}
provider: orthogonal
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


