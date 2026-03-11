---
name: obul-spraay
description: 'USE THIS SKILL WHEN: the user wants AI chat completions (Claude Opus
  4.6, Sonnet 4.6), DeFi swaps, oracle prices, cross-chain bridges, payroll, invoicing,
  escrow, wallet analytics, on-chain inference, XMTP messaging, IPFS storage, KYC,
  or tax reports via Spraay''s full-stack DeFi infrastructure gateway.'
endpoints:
- path: /api/v1/chat/completions
  method: POST
  price: $0.005
  description: AI chat with Claude Opus/Sonnet 4.6
- path: /api/v1/models
  method: GET
  price: $0.001
  description: List available AI models
- path: /api/v1/swap/quote
  method: GET
  price: $0.002
  description: Get swap routing and pricing
- path: /api/v1/swap/tokens
  method: GET
  price: $0.001
  description: List supported swap tokens
- path: /api/v1/swap/execute
  method: POST
  price: $0.01
  description: Execute a token swap
- path: /api/v1/oracle/prices
  method: GET
  price: $0.003
  description: Real-time token prices
- path: /api/v1/oracle/gas
  method: GET
  price: $0.001
  description: Current gas prices
- path: /api/v1/oracle/fx
  method: GET
  price: $0.002
  description: Foreign exchange rates
- path: /api/v1/bridge/quote
  method: GET
  price: $0.005
  description: Cross-chain bridge quote
- path: /api/v1/bridge/chains
  method: GET
  price: $0.001
  description: List supported bridge chains
- path: /api/v1/payroll/execute
  method: POST
  price: $0.02
  description: Execute batch payroll
- path: /api/v1/payroll/estimate
  method: POST
  price: $0.002
  description: Estimate payroll costs
- path: /api/v1/invoice/create
  method: POST
  price: $0.005
  description: Create an invoice
- path: /api/v1/invoice/list
  method: GET
  price: $0.002
  description: List invoices
- path: /api/v1/analytics/wallet
  method: GET
  price: $0.005
  description: Wallet analytics and holdings
- path: /api/v1/analytics/txhistory
  method: GET
  price: $0.003
  description: Transaction history
- path: /api/v1/escrow/create
  method: POST
  price: $0.008
  description: Create escrow contract
- path: /api/v1/escrow/fund
  method: POST
  price: $0.002
  description: Fund escrow
- path: /api/v1/escrow/release
  method: POST
  price: $0.005
  description: Release escrow funds
- path: /api/v1/inference/classify-address
  method: POST
  price: $0.008
  description: AI wallet classification
- path: /api/v1/inference/classify-tx
  method: POST
  price: $0.008
  description: AI transaction classification
- path: /api/v1/inference/explain-contract
  method: POST
  price: $0.01
  description: AI contract explanation
- path: /api/v1/inference/summarize
  method: POST
  price: $0.008
  description: AI activity summarization
- path: /api/v1/notify/email
  method: POST
  price: $0.003
  description: Send email notification
- path: /api/v1/notify/sms
  method: POST
  price: $0.005
  description: Send SMS notification
- path: /api/v1/xmtp/send
  method: POST
  price: $0.003
  description: Send XMTP message
- path: /api/v1/xmtp/inbox
  method: GET
  price: $0.002
  description: Read XMTP inbox
- path: /api/v1/rpc/call
  method: POST
  price: $0.001
  description: JSON-RPC call
- path: /api/v1/storage/pin
  method: POST
  price: $0.005
  description: Pin data to IPFS/Arweave
- path: /api/v1/storage/get
  method: GET
  price: $0.002
  description: Retrieve stored data
- path: /api/v1/cron/create
  method: POST
  price: $0.005
  description: Create scheduled job
- path: /api/v1/kyc/verify
  method: POST
  price: $0.05
  description: KYC verification
- path: /api/v1/tax/calculate
  method: POST
  price: $0.01
  description: Calculate tax obligations
- path: /api/v1/tax/report
  method: GET
  price: $0.02
  description: Generate tax report
- path: /api/v1/batch/execute
  method: POST
  price: $0.01
  description: Batch payment execution
- path: /api/v1/prices
  method: GET
  price: $0.002
  description: Token price lookup
- path: /api/v1/balances
  method: GET
  price: $0.002
  description: Wallet balances
- path: /api/v1/resolve
  method: GET
  price: $0.001
  description: ENS/address resolution
- path: /api/v1/tokens
  method: GET
  price: free
  description: List supported tokens
metadata:
  obul-skill:
    emoji: 🌊
    requires:
      env:
      - OBUL_API_KEY
      primaryEnv: OBUL_API_KEY
registries: {}
provider: spraay
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
