---
name: obul-cli
description: 'USE THIS SKILL WHEN: the user wants to install obulx, authenticate with
  Obul, make paid x402 proxy requests from the command line, set up API keys, check
  their identity, or troubleshoot obulx CLI issues. Also trigger when the user mentions
  obulx, obul login, x402 payments, paid API calls, or wants to call any x402-protected
  endpoint through the CLI.'
endpoints:
- path: obulx login
  method: CLI
  price: $0.00
  description: OAuth device flow authentication
- path: obulx whoami
  method: CLI
  price: $0.00
  description: Print current authenticated user
- path: obulx logout
  method: CLI
  price: $0.00
  description: Revoke session and clear credentials
- path: obulx <url>
  method: CLI
  price: Varies
  description: Proxy request — price depends on upstream endpoint
metadata:
  obul-skill:
    emoji: 💻
    requires:
      env: []
registries: {}
provider: dynamic
---

# obulx CLI

Command-line tool for calling x402-protected API endpoints through the Obul proxy. The proxy handles payment negotiation and settlement automatically — you authenticate, and Obul charges your account credits.

## Install

Check if `obulx` is already installed before installing:

```bash
obulx --version || npm install -g @obul.ai/obulx
```

## Authentication

### Device Flow Login (recommended)

No pre-registration needed. Run `obulx login` and you'll be guided through account creation and authentication in your browser via OAuth device flow.

```bash
obulx login
```

This prints a URL and a device code, then opens your browser. If you don't have an account yet, you'll create one during the browser flow. Once approved, credentials are saved to `~/.obul/credentials.json` (file mode 0600). Tokens auto-refresh on subsequent requests.

Check who you're logged in as:
```bash
obulx whoami
```

Re-authenticate (force a fresh login even if already logged in):
```bash
obulx login --force
```

Log out (revokes tokens and deletes local credentials):
```bash
obulx logout
```

### API Key (for scripts and non-interactive agents)

If you already have an Obul account and an API key (from https://app.obul.ai), you can skip the login step entirely:

```json
{
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

Set it in your environment:
```bash
export OBUL_API_KEY="your-api-key"
```

When `OBUL_API_KEY` is set, `obulx` uses it automatically — no `obulx login` needed.

### Auth Precedence

When making a proxy request, `obulx` resolves auth in this order:
1. `OBUL_API_KEY` environment variable (if set)
2. OAuth token from `~/.obul/credentials.json` (auto-refreshes if expired)
3. Error if neither is available

**Base URL:** `https://proxy.obul.ai/proxy/{scheme}/{host}`

## Common Operations

### GET Request

Fetch data from any x402-protected endpoint.

**Pricing:** Varies based on upstream endpoint

```bash
obulx https://api.example.com/v1/resource
```

The proxy rewrites the URL internally as `https://proxy.obul.ai/proxy/https/api.example.com/v1/resource`, authenticates you, and forwards the request with payment handling.

### POST with JSON Data

Send data to an x402-protected endpoint.

**Pricing:** Varies based on upstream endpoint

```bash
obulx -X POST \
  -H "Content-Type: application/json" \
  -d '{"query": "your data"}' \
  https://api.example.com/v1/resource
```

If you pass `-d` without `-X`, the method defaults to POST automatically:
```bash
obulx -d '{"query": "your data"}' https://api.example.com/v1/resource
```

### Custom Headers

Add request headers (repeatable).

```bash
obulx -H "Content-Type: application/json" \
  -H "X-Custom: value" \
  https://api.example.com/v1/resource
```

### Verbose Output

Debug requests with increasing verbosity levels.

```bash
# Show response status and headers
obulx -v https://api.example.com/v1/resource

# Show full request + response
obulx -vv https://api.example.com/v1/resource
```

## When to Use

- **CLI-based x402 access** — Call any x402-protected API from the terminal without writing code.
- **Agent setup** — Install, login once, and make paid API calls immediately.
- **Quick testing** — Verify x402 endpoints work before integrating into an application.
- **Script automation** — Use `OBUL_API_KEY` for non-interactive paid API calls in CI or cron jobs.

## Best Practices

1. **Use device flow for first-time setup** — `obulx login` handles registration and authentication in one step. No need to create an account separately.
2. **Use API keys for automation** — Store `OBUL_API_KEY` in env vars for scripts, CI, and non-interactive agents.
3. **Debug with `-vv`** — Shows full request and response details when something goes wrong.
4. **Never expose credentials** — Keep `OBUL_API_KEY` secure. Credentials at `~/.obul/credentials.json` are stored with restricted file permissions (0600).
5. **For errors** — See @skills/obul-api-errors/SKILL.md for complete error code reference and troubleshooting



## Environment Variables

| Variable | Default | Purpose |
|----------|---------|---------|
| `OBUL_API_KEY` | — | API key for proxy auth (skips OAuth) |
| `OBUL_PROXY_URL` | `https://proxy.obul.ai/proxy` | Override proxy base URL |
| `OBUL_ISSUER_URL` | `https://api.obul.ai` | Override OAuth issuer URL |

## Quick Reference

```
obulx login                    # authenticate (device flow + registration)
obulx login --force            # re-authenticate
obulx whoami                   # print current user
obulx logout                   # revoke and clear credentials
obulx <url>                    # GET through proxy
obulx -X POST -d <body> <url> # POST through proxy
obulx -H "Key: Val" <url>     # add headers
obulx -v <url>                 # verbose response
obulx -vv <url>                # verbose request + response
obulx --version                # print version
obulx --help                   # show help
```
