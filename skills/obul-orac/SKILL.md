---
name: obul-orac
description: "USE THIS SKILL WHEN: the user wants to scan prompts for injection attacks or audit code for security vulnerabilities. Provides pay-per-use security scanning via Orac Safety Layer through the Obul proxy."
homepage: https://orac-safety.orac.workers.dev
metadata:
  obul-skill:
    emoji: "🛡️"
    requires:
      env: ["OBUL_API_KEY"]
      primaryEnv: "OBUL_API_KEY"
registries: {}
---

# Orac

Orac provides AI agent security infrastructure through the Safety Layer. Scan prompts for injection attacks and audit code for security vulnerabilities. No API key needed — payment is handled automatically by the Obul proxy.

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

Base URL: `https://proxy.obul.ai/proxy/https/orac-safety.orac.workers.dev`

To get an Obul API key, sign up at **https://my.obul.ai**.

## Common Operations

### Prompt Injection Scan

Scan a prompt or user input for injection attacks.

**Pricing:** $0.005

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/orac-safety.orac.workers.dev/v1/scan",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "input": "the text to scan for prompt injection"
  }
}
```

**Response:** JSON object with injection detection results including risk assessment and classification.

### Code Vulnerability Audit

Audit code for security vulnerabilities.

**Pricing:** $0.02

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/orac-safety.orac.workers.dev/v1/audit",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "code": "function example() { eval(userInput); }",
    "language": "javascript"
  }
}
```

**Response:** JSON object with identified vulnerabilities, severity ratings, and remediation suggestions.

## Endpoint Pricing Reference

| Endpoint         | Price | Purpose                           |
|------------------|-------|-----------------------------------|
| `POST /v1/scan` | $0.005 | Prompt injection scan            |
| `POST /v1/audit` | $0.02 | Code vulnerability audit          |

## When to Use

- **Prompt security** — User asks to check a prompt or user input for injection attacks
- **Code audit** — User wants to audit code (skill source, plugin code, agent logic) for security vulnerabilities
- **Input validation** — User needs to sanitize or validate LLM inputs before execution
- **Security scanning** — User mentions "prompt injection", "code audit", or "security scan"

## Best Practices

- **Scan before execution** — Always scan user inputs before executing them as prompts
- **Audit agent code** — Periodically audit your agent's code for security vulnerabilities
- **Use appropriate language** — Specify the correct programming language for code audits
- **For errors** — See @skills/obul-api-errors/SKILL.md for complete error code reference and troubleshooting
