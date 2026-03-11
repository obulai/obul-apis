---
name: obul-browserbase
description: "USE THIS SKILL WHEN: the user needs headless browser automation, wants to launch a remote browser session for Playwright or Puppeteer, or needs full JavaScript execution in a cloud browser. Provides pay-per-use browser sessions via Browserbase through the Obul proxy."
homepage: https://www.browserbase.com
metadata:
  obul-skill:
    emoji: "🌐"
    requires:
      env: ["OBUL_API_KEY"]
      primaryEnv: "OBUL_API_KEY"
registries: {}
---

# Browserbase

Browserbase provides pay-per-use headless browser sessions with full Chromium capabilities — navigation, DOM access,
screenshots, cookies, storage, and more. Through the Obul proxy, each session is paid individually via x402 — no
Browserbase account or API key required. Sessions return a WebSocket URL you can connect to with Playwright or
Puppeteer for full browser automation.

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

Base URL: `https://proxy.obul.ai/proxy/https/x402.browserbase.com`

To get an Obul API key, sign up at **https://my.obul.ai**.

## Common Operations

### Create a Browser Session

Launch a new headless Chromium browser session. Returns a WebSocket URL you can connect to with Playwright or
Puppeteer for full browser automation including navigation, clicking, typing, and screenshots.

**Pricing:** $0.01 (5-minute session)

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/x402.browserbase.com/browser/session/create",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {}
}
```

**Response:** JSON object containing a `wsUrl` field with the WebSocket endpoint to connect your Playwright or
Puppeteer client. The session is live and ready for browser automation immediately.

### Check Session Status

Check the current state of an active browser session. Useful for monitoring long-running automation tasks or verifying
a session is still alive before reconnecting.

**Pricing:** $0.0001

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/x402.browserbase.com/browser/session/{id}/status",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

**Response:** JSON object with the session's current status, including whether it is active, idle, or terminated, and
the remaining time before expiration.

### Extend a Session

Add more time to an existing browser session before it expires. Useful for long-running automation workflows that need
more than the default 5-minute window.

**Pricing:** $0.01 per additional 5 minutes

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/x402.browserbase.com/browser/session/{id}/extend",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {}
}
```

**Response:** JSON object confirming the session has been extended, with the new expiration time.

### Terminate a Session

Close and terminate a browser session when you are done. This releases resources and stops further billing.

**Pricing:** $0.0001

```json
{
  "method": "DELETE",
  "url": "https://proxy.obul.ai/proxy/https/x402.browserbase.com/browser/session/{id}",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

**Response:** JSON object confirming the session has been terminated.

## Endpoint Pricing Reference

| Endpoint                              | Price                  | Purpose                                  |
|---------------------------------------|------------------------|------------------------------------------|
| `POST /browser/session/create`        | $0.01                  | Create a new 5-minute browser session    |
| `GET /browser/session/:id/status`     | $0.0001                | Check session status                     |
| `POST /browser/session/:id/extend`    | $0.01 per 5 min        | Extend an active session                 |
| `DELETE /browser/session/:id`         | $0.0001                | Terminate a session                      |

## When to Use

- **JavaScript-heavy pages** — When you need to scrape or interact with pages that require full JS execution, SPAs, or
  dynamic content that simple HTTP requests cannot handle.
- **Browser automation** — Automate form submissions, multi-step workflows, login flows, or any task that needs a real
  browser environment.
- **Screenshot capture** — Take screenshots of web pages as they appear in a real browser, including after JavaScript
  rendering.
- **Testing and verification** — Verify that a web page renders correctly, test user flows, or validate UI behavior in
  a real browser.
- **Agent browsing** — Give AI agents full browser capabilities to navigate the web, interact with pages, and complete
  tasks that require clicking, typing, and reading rendered content.

## Best Practices

- **Terminate sessions when done** — Always call `DELETE /browser/session/:id` when your automation is complete to
  avoid unnecessary charges from idle sessions.
- **Use status checks sparingly** — Poll session status only when needed. Avoid tight polling loops.
- **Start with short sessions** — Create a 5-minute session first. Only extend if your workflow genuinely needs more
  time.
- **Prefer scraping tools for simple pages** — If you only need the text content of a page and it does not require
  JavaScript rendering, use Firecrawl or Minifetch instead. Browserbase is best when you need full browser interaction.
- **Connect quickly** — The WebSocket URL is available immediately after session creation. Connect your Playwright or
  Puppeteer client promptly to maximize your session time.
- **For errors** — See @skills/obul-api-errors/SKILL.md for complete error code reference and troubleshooting


