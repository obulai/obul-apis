---
name: obul-api-optimizer
description: "Find cheapest API providers, compare pricing across skills, and audit files for cost savings"
homepage: https://github.com/obulai/obul-apis/tree/main/skills/obul-api-optimizer
metadata:
  obul-skill:
    emoji: "💰"
    requires:
      env: []
registries: {}
---

# API Optimizer

Find the cheapest Obul API provider for any operation. The Obul catalog has 70+ APIs with significant overlap — many
operations can be done by multiple providers at wildly different prices. This skill automates cost analysis with a static
pricing database (no API calls, no cost, instant results).

## Overview

This is a local CLI tool (like obul-api-finder). It does not make API calls through the Obul proxy — it reads from a
static pricing database bundled with the skill. Three commands for cost optimization:

- **optimize** — Find cheapest provider for a use case
- **compare** — Side-by-side pricing table of 2+ skills
- **audit** — Scan a file for API URLs, flag cheaper alternatives

## Commands

### Optimize — Find Cheapest Provider

Search by keyword to find the cheapest provider for an operation:

```bash
node scripts/optimize.js "email verification"
node scripts/optimize.js "twitter profile"
node scripts/optimize.js "company enrich"
node scripts/optimize.js "web search"
```

Returns: Providers sorted by price with savings percentage.

### Compare — Side-by-Side Pricing

Compare pricing across 2+ skills for all overlapping operations:

```bash
node scripts/compare.js obul-stableenrich obul-hunter obul-tomba
node scripts/compare.js obul-scrape-creators obul-stableenrich
node scripts/compare.js obul-firecrawl obul-x402engine-web
```

Returns: ASCII table with operations as rows, skills as columns, cheapest marked.

### Audit — Scan File for Savings

Scan any file for API URLs and identify cheaper alternatives:

```bash
node scripts/audit.js tools.md
node scripts/audit.js src/api-client.js
node scripts/audit.js pipeline.sh
```

Returns: List of found APIs with alternatives, total cost vs optimized cost.

## Example Workflow

```bash
# 1. You need email verification — find the cheapest option
$ node scripts/optimize.js "email verification"

Email Verification (email-verify)
──────────────────────────────────────────────────
  1. $0.0100 — Hunter (obul-hunter) [cheapest]
  2. $0.0100 — Tomba (obul-tomba)
  3. $0.0300 — StableEnrich Hunter (obul-stableenrich)

  Savings: 67% by using Hunter instead of StableEnrich Hunter

# 2. Compare StableEnrich vs direct providers
$ node scripts/compare.js obul-stableenrich obul-hunter obul-tomba

# 3. Audit your existing tools file
$ node scripts/audit.js tools.md
```

## File Locations

| File | Purpose |
|------|---------|
| `scripts/optimize.js` | Find cheapest provider by keyword |
| `scripts/compare.js` | Side-by-side pricing comparison |
| `scripts/audit.js` | Scan files for API cost savings |
| `data/pricing.json` | Static pricing database (14 operations, 19 URL patterns) |

## Data Sources

- **Pricing Database**: `data/pricing.json` — verified from each skill's SKILL.md
- **14 operations**: social profiles, email, company, person enrichment, web scraping, search
- **19 URL patterns**: regex patterns matching upstream API hostnames
- **Last updated**: 2026-03-06

## Best Practices

- **For errors** — See @skills/obul-api-errors/SKILL.md for complete error code reference and troubleshooting
