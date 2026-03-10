---
name: obul-spraay
description: "USE THIS SKILL WHEN: the user wants AI chat completions (Claude Opus 4.6, Sonnet 4.6), DeFi swaps, oracle prices, cross-chain bridges, payroll, invoicing, escrow, wallet analytics, on-chain inference, XMTP messaging, IPFS storage, KYC, or tax reports via Spraay's full-stack DeFi infrastructure gateway."
homepage: https://gateway.spraay.app
metadata:
  obul-skill:
    emoji: "🌊"
    requires:
      env: ["OBUL_API_KEY"]
      primaryEnv: "OBUL_API_KEY"
registries: {}
---

# Spraay

Full-stack DeFi infrastructure for AI agents. Spraay provides 50+ pay-per-use endpoints covering AI inference (Claude Opus 4.6 and Sonnet 4.6), token swaps, oracle price feeds, cross-chain bridges, payroll, invoicing, escrow, wallet analytics, on-chain intelligence, XMTP messaging, IPFS storage, scheduling, KYC, and compliance. Through the Obul proxy, each request is paid individually with no Spraay account or API key required.

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

Base URL: `https://proxy.obul.ai/proxy/https/gateway.spraay.app`

To get an Obul API key, sign up at **https://my.obul.ai**.

## Common Operations

### AI Chat Completions

Generate AI responses using Claude Opus 4.6 or Sonnet 4.6 models.

**Pricing:** $0.005

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/gateway.spraay.app/api/v1/chat/completions",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "model": "claude-opus-4-6",
    "messages": [
      {"role": "user", "content": "Explain how x402 micropayments work on Base."}
    ]
  }
}
```

**Response:** JSON with AI-generated completion including model, usage tokens, and response content.

### Get Swap Quote

Get optimal token swap routing and pricing across chains.

**Pricing:** $0.002

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/gateway.spraay.app/api/v1/swap/quote?from=ETH&to=USDC&amount=1.0",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

**Response:** JSON with swap route, expected output amount, price impact, and estimated gas.

### Oracle Price Feeds

Retrieve real-time token prices from on-chain oracles.

**Pricing:** $0.003

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/gateway.spraay.app/api/v1/oracle/prices?tokens=ETH,BTC,USDC",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

**Response:** JSON with current prices, sources, and timestamps for each requested token.

### Wallet Analytics

Analyze a wallet's holdings, transaction history, and behavioral patterns.

**Pricing:** $0.005

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/gateway.spraay.app/api/v1/analytics/wallet?address=0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

**Response:** JSON with wallet classification, token holdings, DeFi exposure, and risk indicators.

### On-Chain Inference

Classify wallet addresses, explain smart contracts, or summarize transaction activity using AI.

**Pricing:** $0.008 - $0.01

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/gateway.spraay.app/api/v1/inference/classify-address",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "address": "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
  }
}
```

**Response:** JSON with address classification (EOA, contract, multisig), risk score, and behavioral labels.

## Endpoint Pricing Reference

| Endpoint                              | Price  | Purpose                                 |
|---------------------------------------|--------|-----------------------------------------|
| `POST /api/v1/chat/completions`       | $0.005 | AI chat with Claude Opus/Sonnet 4.6     |
| `GET /api/v1/models`                  | $0.001 | List available AI models                |
| `GET /api/v1/swap/quote`              | $0.002 | Get swap routing and pricing            |
| `GET /api/v1/swap/tokens`             | $0.001 | List supported swap tokens              |
| `POST /api/v1/swap/execute`           | $0.01  | Execute a token swap                    |
| `GET /api/v1/oracle/prices`           | $0.003 | Real-time token prices                  |
| `GET /api/v1/oracle/gas`              | $0.001 | Current gas prices                      |
| `GET /api/v1/oracle/fx`               | $0.002 | Foreign exchange rates                  |
| `GET /api/v1/bridge/quote`            | $0.005 | Cross-chain bridge quote                |
| `GET /api/v1/bridge/chains`           | $0.001 | List supported bridge chains            |
| `POST /api/v1/payroll/execute`        | $0.02  | Execute batch payroll                   |
| `POST /api/v1/payroll/estimate`       | $0.002 | Estimate payroll costs                  |
| `POST /api/v1/invoice/create`         | $0.005 | Create an invoice                       |
| `GET /api/v1/invoice/list`            | $0.002 | List invoices                           |
| `GET /api/v1/analytics/wallet`        | $0.005 | Wallet analytics and holdings           |
| `GET /api/v1/analytics/txhistory`     | $0.003 | Transaction history                     |
| `POST /api/v1/escrow/create`          | $0.008 | Create escrow contract                  |
| `POST /api/v1/escrow/fund`            | $0.002 | Fund escrow                             |
| `POST /api/v1/escrow/release`         | $0.005 | Release escrow funds                    |
| `POST /api/v1/inference/classify-address` | $0.008 | AI wallet classification            |
| `POST /api/v1/inference/classify-tx`  | $0.008 | AI transaction classification           |
| `POST /api/v1/inference/explain-contract` | $0.01 | AI contract explanation              |
| `POST /api/v1/inference/summarize`    | $0.008 | AI activity summarization               |
| `POST /api/v1/notify/email`           | $0.003 | Send email notification                 |
| `POST /api/v1/notify/sms`            | $0.005 | Send SMS notification                   |
| `POST /api/v1/xmtp/send`             | $0.003 | Send XMTP message                       |
| `GET /api/v1/xmtp/inbox`             | $0.002 | Read XMTP inbox                         |
| `POST /api/v1/rpc/call`              | $0.001 | JSON-RPC call                           |
| `POST /api/v1/storage/pin`           | $0.005 | Pin data to IPFS/Arweave                |
| `GET /api/v1/storage/get`            | $0.002 | Retrieve stored data                    |
| `POST /api/v1/cron/create`           | $0.005 | Create scheduled job                    |
| `POST /api/v1/kyc/verify`            | $0.05  | KYC verification                        |
| `POST /api/v1/tax/calculate`         | $0.01  | Calculate tax obligations               |
| `GET /api/v1/tax/report`             | $0.02  | Generate tax report                     |
| `POST /api/v1/batch/execute`         | $0.01  | Batch payment execution                 |
| `GET /api/v1/prices`                 | $0.002 | Token price lookup                      |
| `GET /api/v1/balances`               | $0.002 | Wallet balances                         |
| `GET /api/v1/resolve`                | $0.001 | ENS/address resolution                  |
| `GET /api/v1/tokens`                 | free   | List supported tokens                   |

## When to Use

- **AI inference** -- User wants Claude Opus 4.6 or Sonnet 4.6 chat completions at $0.005/request
- **Token swaps** -- User wants to swap tokens on-chain with optimal routing
- **Price feeds** -- User needs real-time token prices or gas costs from oracles
- **Cross-chain bridges** -- User wants to bridge tokens between chains
- **Payroll** -- User needs to execute batch crypto payroll
- **Invoicing** -- User wants to create or manage crypto invoices
- **Escrow** -- User needs trustless escrow for on-chain payments
- **Wallet analytics** -- User wants portfolio analysis or transaction history
- **On-chain intelligence** -- User wants AI-powered wallet classification, contract explanation, or tx analysis
- **Messaging** -- User wants to send XMTP messages, emails, or SMS
- **Storage** -- User needs to pin data to IPFS or Arweave
- **Compliance** -- User needs KYC verification, tax calculation, or audit trails

## Best Practices

- **List models first** -- Call `GET /api/v1/models` to see available AI models before making chat requests
- **Use oracle before swaps** -- Check `/api/v1/oracle/prices` to verify token prices before executing swaps
- **Estimate before executing** -- Use `/api/v1/payroll/estimate` or `/api/v1/batch/estimate` before committing to batch operations
- **Check bridge chains** -- Call `/api/v1/bridge/chains` to verify chain support before requesting bridge quotes
- **Use free endpoints** -- `/api/v1/tokens` is free and useful for discovering supported tokens
- **Batch where possible** -- Use `/api/v1/batch/execute` for multiple payments instead of individual transactions
- **For errors** -- See @skills/obul-api-errors/SKILL.md for complete error code reference and troubleshooting
