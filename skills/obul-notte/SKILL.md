---
name: obul-notte
description: Browser automation API for AI agents. Start browser sessions, run AI
  agents, scrape webpages, and automate browser tasks with headless Chrome/Firefox.
endpoints:
- path: /sessions/start
  method: POST
  price: Dynamic
  description: Start browser session
- path: /sessions/{session_id}
  method: GET
  price: Free
  description: Get session status
- path: /sessions/{session_id}/stop
  method: DELETE
  price: Free
  description: Stop session
- path: /sessions/{session_id}/cookies
  method: GET
  price: Free
  description: Get cookies
- path: /sessions/{session_id}/cookies
  method: POST
  price: $0.001
  description: Set cookies
- path: /sessions/{session_id}/network/logs
  method: GET
  price: Free
  description: Get network logs
- path: /sessions/{session_id}/page/scrape
  method: POST
  price: $0.003
  description: Scrape page content
- path: /sessions/{session_id}/page/execute
  method: POST
  price: $0.002
  description: Execute action
- path: /sessions/{session_id}/page/screenshot
  method: POST
  price: $0.001
  description: Take screenshot
- path: /sessions/{session_id}/page/observe
  method: POST
  price: $0.005
  description: Observe page actions
- path: /scrape
  method: POST
  price: $0.01
  description: Direct URL scrape
- path: /scrape_from_html
  method: POST
  price: $0.002
  description: Parse HTML
- path: /agents/start
  method: POST
  price: Dynamic
  description: Start AI agent
- path: /agents/{agent_id}
  method: GET
  price: Free
  description: Get agent status
- path: /agents/{agent_id}/stop
  method: DELETE
  price: Free
  description: Stop agent
metadata:
  obul-skill: 🌐
  requires.env: OBUL_API_KEY
  requires.primaryEnv: OBUL_API_KEY
registries: {}
provider: orthogonal
---

# Notte

Browser automation API for AI agents. Start browser sessions, run AI agents, scrape webpages, and automate browser tasks with headless Chrome/Firefox. Features include CAPTCHA solving, proxy support, and persistent browser profiles.

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

Base URL: `https://proxy.obul.ai/proxy/https/x402.orth.sh/notte`

To get an Obul API key, sign up at **https://my.obul.ai**.

## Common Operations

### Start Browser Session

Start a new browser session with configurable options.

**Pricing:** Dynamic

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/notte/sessions/start",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "headless": true,
    "browser_type": "chromium",
    "solve_captchas": true,
    "idle_timeout_minutes": 5
  }
}
```

Returns session_id for subsequent operations.

### Scrape Page Content

Scrape content from the current page in a session.

**Pricing:** $0.003

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/notte/sessions/{session_id}/page/scrape",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "only_main_content": true,
    "scrape_links": true
  }
}
```

### Execute Action

Execute an action on the page (click, type, navigate, scroll, etc.).

**Pricing:** $0.002

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/notte/sessions/{session_id}/page/execute",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "type": "goto",
    "url": "https://example.com"
  }
}
```

### Take Screenshot

Capture a screenshot of the current page.

**Pricing:** $0.001

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/notte/sessions/{session_id}/page/screenshot",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "full_page": false
  }
}
```

### Scrape URL Directly

Scrape content from a URL without managing sessions.

**Pricing:** $0.01

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/notte/scrape",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "url": "https://example.com"
  }
}
```

### Start AI Agent

Start an AI agent to autonomously complete a browser task.

**Pricing:** Dynamic

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/notte/agents/start",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "task": "Find the contact email from the about page",
    "session_id": "{session_id}",
    "max_steps": 20
  }
}
```

### Observe Page

Observe current page state and get available actions.

**Pricing:** $0.005

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/notte/sessions/{session_id}/page/observe",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "max_nb_actions": 50
  }
}
```

### Stop Session

Stop and clean up a browser session.

**Pricing:** Free

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/notte/sessions/{session_id}/stop",
  "method": "DELETE",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Get Session Status

Get session status and details.

**Pricing:** Free

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/notte/sessions/{session_id}",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Get Cookies

Get all cookies from the browser session.

**Pricing:** Free

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/notte/sessions/{session_id}/cookies",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Set Cookies

Set cookies in the browser session.

**Pricing:** $0.001

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/notte/sessions/{session_id}/cookies",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "cookies": [{"name": "session", "value": "abc123"}]
  }
}
```

### Get Agent Status

Get agent execution status and results.

**Pricing:** Free

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/notte/agents/{agent_id}",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Stop Agent

Stop a running agent.

**Pricing:** Free

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/notte/agents/{agent_id}/stop?session_id={session_id}",
  "method": "DELETE",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Get Network Logs

Get network request/response logs from the session.

**Pricing:** Free

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/notte/sessions/{session_id}/network/logs",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Scrape from HTML

Extract structured content from raw HTML.

**Pricing:** $0.002

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/notte/scrape_from_html",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "frames": ["<html>...</html>"]
  }
}
```

## When to Use

- **Web Automation**: Automate repetitive browser tasks
- **AI Agents**: Power autonomous agents to complete complex web tasks
- **Web Scraping**: Scrape dynamic JavaScript-heavy pages
- **Form Filling**: Automate form submissions
- **Testing**: Automate browser testing workflows

## Best Practices

1. **Session Management**: Reuse sessions for related tasks to save costs
2. **Idle Timeout**: Set appropriate idle timeouts (default 3 minutes)
3. **CAPTCHA Solving**: Enable for sites with bot protection
4. **Cleanup**: Always stop sessions when done to avoid charges
5. **For errors** — See @skills/obul-api-errors/SKILL.md for complete error code reference and troubleshooting
