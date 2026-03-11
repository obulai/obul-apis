---
name: obul-slamai
description: 'USE THIS SKILL WHEN: the user wants smart money intelligence, wallet
  reputation scoring, WalletDNA behavioral analysis, token trades and transfers with
  smart money enrichment, trending or newest tokens, or token holder reputation data.'
endpoints:
- path: /token/price
  method: GET
  price: $0.0001
  description: Current token prices with FDV and liquidity
- path: /token/price/history
  method: GET
  price: $0.0005
  description: Historical price at specific block or timestamp
- path: /token/price/exotic
  method: GET
  price: $0.0005
  description: Price quoted in any ERC20 token
- path: /token/price/exotic/history
  method: GET
  price: $0.0005
  description: Historical exotic pricing
- path: /token/trades
  method: GET
  price: $0.0005
  description: Recent trades for a token
- path: /token/trades/dna
  method: GET
  price: $0.003
  description: Trades with WalletDNA smart money enrichment
- path: /token/transfers
  method: GET
  price: $0.0003
  description: Token transfer records
- path: /token/transfers/dna
  method: GET
  price: $0.001
  description: Transfers with WalletDNA enrichment
- path: /token/holder/reputation
  method: GET
  price: $0.001
  description: Reputation scores for token holders
- path: /chain/tokens/trending
  method: GET
  price: $0.0005
  description: Trending tokens by smart money activity
- path: /chain/tokens/popular
  method: GET
  price: $0.0005
  description: Most popular tokens by volume
- path: /chain/tokens/popular/history
  method: GET
  price: $0.0005
  description: Historical popular token snapshots
- path: /chain/tokens/newest
  method: GET
  price: $0.0005
  description: Recently deployed tokens
- path: /chain/trades
  method: GET
  price: $0.0005
  description: Chain-wide trade feed
- path: /chain/trades/dna
  method: GET
  price: $0.003
  description: Chain-wide trades with WalletDNA
- path: /chain/transfers
  method: GET
  price: $0.0003
  description: Chain-wide transfer feed
- path: /chain/transfers/dna
  method: GET
  price: $0.001
  description: Chain-wide transfers with WalletDNA
- path: /wallet/reputation
  method: GET
  price: $0.0005
  description: Basic wallet reputation score
- path: /wallet/reputation/full
  method: GET
  price: $0.001
  description: Full wallet reputation profile with DNA
- path: /wallet/reputation/holder
  method: GET
  price: $0.001
  description: Wallet reputation for a specific token holding
- path: /wallet/trades
  method: GET
  price: $0.0005
  description: Trade history for a specific wallet
- path: /wallet/trades/dna
  method: GET
  price: $0.003
  description: Wallet trades with DNA enrichment
- path: /wallet/transfers
  method: GET
  price: $0.0003
  description: Transfer history for a specific wallet
- path: /wallet/transfers/dna
  method: GET
  price: $0.001
  description: Wallet transfers with DNA enrichment
- path: /pair/trades
  method: GET
  price: $0.0005
  description: Trading data for specific token pairs
- path: /pair/trades/dna
  method: GET
  price: $0.003
  description: Pair trades with WalletDNA enrichment
metadata:
  obul-skill:
    emoji: 💰
    requires:
      env:
      - OBUL_API_KEY
      primaryEnv: OBUL_API_KEY
registries: {}
provider: slamai
---

# SlamAI Smart Money Intelligence

SlamAI is the definitive platform for smart money intelligence, live on Base and Ethereum. It provides real-time
on-chain analytics enriched with WalletDNA behavioral metrics, including wallet reputation scoring, smart money trade
tracking, token transfer analysis, trending and newest token discovery, and token holder reputation data. Through the
Obul proxy, each request is paid individually with no SlamAI account required.

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

Base URL: `https://proxy.obul.ai/proxy/https/api.slamai.dev`

To get an Obul API key, sign up at **https://my.obul.ai**.

## Common Operations

### Get Token Price

Retrieve current token prices with fully diluted valuation, liquidity, and 24h price change. Supports quoting in USD,
ETH, or BTC.

**Pricing:** $0.0001

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/api.slamai.dev/token/price?blockchain=ethereum&symbols=ETH,USDC&quote_symbol=USD",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

**Response:** JSON object with current price, FDV, liquidity, and 24h price change for each requested token.

### Get Smart Money Trades (DNA-Enriched)

Retrieve recent trades for a token enriched with WalletDNA metrics, revealing whether buyers or sellers are smart
money wallets based on IQ score, reputation tier, and historical performance.

**Pricing:** $0.003

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/api.slamai.dev/token/trades/dna?blockchain=base&token_address=0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913&num=20",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

**Response:** JSON array of trades with wallet address, side (buy/sell), amount, price, and WalletDNA enrichment
including IQ score, reputation tier, win rate, and wallet balance.

### Get Wallet Reputation

Retrieve the full reputation profile for a wallet address, including IQ score, reputation tier, trading history,
win rate, and behavioral classification.

**Pricing:** $0.001

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/api.slamai.dev/wallet/reputation/full?blockchain=ethereum&wallet_address=0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

**Response:** JSON object with wallet IQ score, reputation tier (e.g., "Smart Money", "Veteran", "Newcomer"), total
trades, win rate, average hold time, and behavioral DNA classification.

### Get Trending Tokens

Retrieve currently trending tokens on a specific blockchain, ranked by smart money activity and volume.

**Pricing:** $0.0005

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/api.slamai.dev/chain/tokens/trending?blockchain=base&num=20",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

**Response:** JSON array of trending tokens with symbol, name, address, price, volume, and smart money activity score.

### Get Token Transfers with DNA

Retrieve token transfers enriched with WalletDNA behavioral data, showing whether large transfers are from smart
money wallets.

**Pricing:** $0.001

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/api.slamai.dev/token/transfers/dna?blockchain=ethereum&token_address=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48&num=20",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

**Response:** JSON array of transfers with sender, receiver, amount, direction, and WalletDNA enrichment for each
wallet involved.

## When to Use

- **Smart money tracking** -- User wants to see what smart money wallets are buying or selling.
- **Wallet reputation** -- User wants to assess the quality or history of a specific wallet address.
- **Token trade analysis** -- User wants to see recent trades with behavioral context (who is buying and are they
  smart money).
- **Trending tokens** -- User asks what tokens are trending, popular, or newly deployed on a chain.
- **Transfer monitoring** -- User wants to track large transfers and know whether they come from smart money wallets.
- **Token holder quality** -- User wants to know the reputation breakdown of a token's holders.
- **Historical pricing** -- User needs token prices at a specific block number or timestamp.
- **Exotic pricing** -- User wants a token's price quoted in another ERC20 token instead of USD.

## Best Practices

- **Use DNA-enriched endpoints for smart money insights** -- The `/dna` variants cost more but provide wallet
  behavioral data that standard endpoints do not. Use them when smart money context matters.
- **Use `estimate_cost=true` to preview costs** -- Append this parameter to any request to see the cost without
  actually executing the query.
- **Filter by blockchain** -- Always specify the `blockchain` parameter (ethereum or base) to get accurate results.
- **Use `num` to control response size** -- Limit results with the `num` parameter (1-1000) to reduce cost and
  response size.
- **Combine with wallet reputation** -- When analyzing trades, cross-reference with `/wallet/reputation/full` for
  deeper context on specific wallets.
- **Use address over symbol when possible** -- Token addresses are unambiguous. Use `addresses` parameter instead of
  `symbols` when you have the contract address.
- **For errors** -- See @skills/obul-api-errors/SKILL.md for complete error code reference and troubleshooting
