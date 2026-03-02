# Obul APIs

Obul is the **universal API gateway for the agent economy**. It proxies requests to x402-enabled APIs and handles payment automatically — no crypto wallet, no USDC, no gas fees. One `OBUL_API_KEY`, consolidated billing, scoped keys with spending caps. Pay-per-use access to any supported service.

## What is x402?

[x402](https://www.x402.org/) is an open payment protocol (by Coinbase) that uses HTTP 402 for instant, per-request stablecoin payments. Obul abstracts x402 away entirely — you just make normal HTTP requests.

## Getting Started

1. **Sign up** at [my.obul.ai](https://my.obul.ai) (free, ~30 seconds)
2. **Set your API key** as an environment variable:
   ```sh
   export OBUL_API_KEY="your-key-here"
   ```
3. **Make requests** through the proxy. URL pattern:
   ```
   https://proxy.obul.ai/proxy/{scheme}/{host}{path}
   ```
   All requests must include the `x-obul-api-key` header.
