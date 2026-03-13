# Obul API Marketplace

Obul is the **universal API gateway for the agent economy**. It proxies requests to x402-enabled APIs and handles payment automatically — no crypto wallet, no USDC, no gas fees. One `OBUL_API_KEY`, consolidated billing, scoped keys with spending caps. Pay-per-use access to any supported service.

## What is x402?

[x402](https://www.x402.org/) is an open payment protocol (by Coinbase) that uses HTTP 402 for instant, per-request stablecoin payments. Obul abstracts x402 away entirely — you just make normal HTTP Started

1. requests.

## Getting **Sign up** at [my.obul.ai](https://my.obul.ai) (free, ~30 seconds)
2. **Set your API key** as an environment variable:
   ```sh
   export OBUL_API_KEY="your-key-here"
   ```
3. **Make requests** through the proxy. URL pattern:
   ```
   https://proxy.obul.ai/proxy/{scheme}/{host}{path}
   ```
   All requests must include the `x-obul-api-key` header.

## Available APIs by Category

| Category | Subcategories | Count |
|----------|---------------|-------|
| **Coding** | LLM, AI Inference, Storage, Media, Auth, Messaging, Utility, Browser, Blockchain | 16 |
| **Entertainment** | Image Gen, Audio Gen, Video, Video Gen, Prediction, Weather, Travel | 13 |
| **Productivity** | Search, Research, SERP, Scraping, Data, Document, Extraction, Enrichment, Intelligence, Signals | 42 |
| **Social Media** | Twitter, Far caster, Reddit, Multi-platform | 6 |
| **Obul** | Infrastructure, Tool | 3 |

### Coding (16 APIs)
LLM, Baseten, Zai, Pinata, Cnvrt.ing, DIDit, Textbelt, Chronos, Browserbase, CoinGecko, Nansen, SlamAI, Spraay, x402engine-chain, Dome

### Entertainment (13 APIs)
x402engine-image, x402engine-audio, DTelecom, Genbase, Nano-Banana, Nano-Banana-2, Tavus, Quiver, BlackSwan, Precip, Amadeus, FlightAware, Google Maps

### Productivity (42 APIs)
Firecrawl, Exa, Jina, Linkup, Andi, Parallel, Perplexity, Tavily, SearchAPI, Valyu, Sybil, GEO, Minifetch, x402engine-web, Aviato, Fiber, Notte, Olostep, Riveter, Scrapegraph, Apollo, Hunter, BrandDev, Coresignal, Ocean, OpenMart, PeopleDataLabs, PredictLeads, SixtyFour, Tomba, Logo, Clado, Influencer, Whitepages, ContactOut, API Optimizer, API Errors

### Social Media (6 APIs)
Twit, GrokX, ClawAPI X, Neynar, Reddit, Scrape-Creators

### Obul (3 APIs)
Proxy, CLI, API Finder

## API Finder

Need help finding the right API? Use the **API Finder** skill to search, browse, and install skills directly from this catalog.

### Quick Install

```bash
curl -fsSL https://raw.githubusercontent.com/obulai/obul-apis/main/skills/obul-api-finder/install.sh | bash
```

### Usage

```bash
# Search for an API by keyword
node skills/obul-api-finder/scripts/search.js "scrape website"

# List all APIs in a category
node skills/obul-api-finder/scripts/list.js "web-scraping"

# Get details about a specific skill
node skills/obul-api-finder/scripts/fetch.js obul-firecrawl

# Install a skill to ~/.claude/skills/
node skills/obul-api-finder/scripts/install.js obul-firecrawl
```

## Use Cases

### Run Your Entire GTM Workflow Directly in Claude Code

Just ran a full prospect enrichment pipeline, without writing a single line of code:

1. **Found the prospect's email** (Hunter)
2. **Pulled full LinkedIn profile + work history** (Fiber)
3. **Enriched the company data** (BrandDev)
4. **Found a phone number** (Tomba)
5. **Ready to send an SMS** (Textbelt)

That's 5 different APIs, stitched together in one conversation. Every API on Obul works as a Claude Code skill — just install and go.

### Single Skill Examples

- **Enrich a lead** — Use Apollo or Coresignal (Productivity → Enrichment)
- **Scrape a website** — Use Firecrawl or Browserbase (Productivity → Scraping)
- **Check crypto prices** — Use CoinGecko (Coding → Blockchain)
- **Generate images** — Use Nano-Banana or Genbase (Entertainment → Image Gen)
- **Send SMS** — Use Textbelt (Coding → Messaging)

### Compound (Multi-Skill) Examples

- **Lead Generation Engine**: Search (Exa) → Enrich (Apollo) → Verify (Hunter) → Enrich Company (BrandDev)
- **Market Research**: Scrape (Firecrawl) → Analyze (Jina) → Visualize (FreePik)
- **Crypto Portfolio Monitor**: Price Data (CoinGecko) → Wallet Analysis (Zapper) → Alerts (Telegram via some integration)
- **Content Pipeline**: Search (Perplexity) → Scrape (Browserbase) → Transcribe (DTelecom) → Publish (Neynar)
- **Security Audit**: Scrape Contract (Etherscan/Ordiscan) → Analyze (Blocksec) → Report (Orac)

These APIs work seamlessly in **OpenClaw**, **TinyClaw**, or **vanilla Claude Code** — just add your `OBUL_API_KEY` and start building.

## Audit Script Usage

The upstream audit script lives at `scripts/audit-upstreams.ts`.

Prerequisite:

```bash
export PRIVATE_KEY=0x...
```

Run all skills:

```bash
npm run audit
```

Run one skill only:

```bash
npm run audit -- --skill obul-agentmail
```

Use endpoint overrides:

```bash
npm run audit -- --overrides scripts/endpoint-overrides.json
```

Run one skill with overrides and update an existing results JSON (upsert by skill):

```bash
npm run audit -- --skill obul-agentmail --overrides scripts/endpoint-overrides.json --results-json scripts/audit-results/<run-id>/results.json
```

Write output JSON to a custom path:

```bash
npm run audit -- --output-json /tmp/audit-results.json
```
