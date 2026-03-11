# Contributing to Obul APIs

Thank you for your interest in contributing! This guide walks you through adding new API skills to the Obul marketplace.

## What You Can Contribute

- **New skills** - Add documentation for APIs that work with the Obul proxy
- **Improvements** - Fix typos, clarify docs, improve examples
- **Bug fixes** - Correct pricing, endpoints, or other inaccuracies

## Quick Start

Adding a new skill involves 3 steps:

1. Create `skills/obul-<name>/SKILL.md`
2. Add entry to `apis.json`
3. Update category table in `README.md`

---

## Step 1: Create the SKILL.md File

### Directory Structure

```
skills/
└── obul-<service-name>/
    └── SKILL.md
```

### SKILL.md Template

```markdown
---
name: obul-<service-name>
description: Brief 1-2 sentence description of what this API does
endpoints:
  - path: /api/endpoint
    method: POST
    price: $0.01
    description: Operation description
metadata:
  obul-skill:
    emoji: "🔧"
    requires:
      env: ["OBUL_API_KEY"]
    primaryEnv: "OBUL_API_KEY"
registries: {}
---

# ServiceName

Overview paragraph describing the service and its capabilities through the Obul proxy.

## Authentication

All requests route through the Obul proxy and require an API key header:

```json
{
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

**Base URL:** `https://proxy.obul.ai/proxy/https/<upstream-host>/api`

## Common Operations

### Operation Name

Brief description of what this operation does.

**Pricing:** $0.01

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/<upstream-host>/api/endpoint",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "param": "value"
  }
}
```

**Response:** Description of the response fields

### Another Operation

...

### Health Check (Free)

Verify service availability before spending credits.

**Pricing:** $0.00

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/<upstream-host>/api/health",
  "headers": {
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

## Endpoint Pricing Reference

| Endpoint | Price | Purpose |
|----------|-------|---------|
| `GET /api/health` | $0.00 | Service status check |
| `POST /api/endpoint` | $0.01 | Operation description |

## When to Use

- Use case 1: When you need to...
- Use case 2: For...

## Best Practices

1. **Tip one:** Explanation
2. **Tip two:** Explanation

## Error Handling

| Error | Cause | Solution |
|-------|-------|----------|
| `ERROR_CODE` | What caused it | How to fix it |
```

---

## Required Conventions

### 1. Naming

- **Skill name**: Must start with `obul-` prefix (e.g., `obul-chronos`, `obul-sybil`)
- **Directory name**: Matches skill name (`obul-<service>/`)
- **YAML frontmatter `name`**: Must match directory name

### 2. YAML Frontmatter

| Field | Required | Description |
|-------|----------|-------------|
| `name` | Yes | Skill identifier (kebab-case, starts with `obul-`) |
| `description` | Yes | 1-2 sentence summary |
| `endpoints` | Yes | List of endpoints with path, method, price, description |
| `metadata.obul-skill.emoji` | Yes | Visual identifier (emoji) |
| `metadata.obul-skill.requires.env` | Yes | Must include `OBUL_API_KEY` |
| `metadata.obul-skill.primaryEnv` | Yes | Must be `OBUL_API_KEY` |
| `registries` | Yes | Must include `registries: {}` |

**Note:** The `endpoints` list replaces the old `homepage` field and the markdown "Endpoint Pricing Reference" table. Each endpoint should have:
- `path`: API endpoint path (e.g., `/api/v1/search`)
- `method`: HTTP method (GET, POST, etc.)
- `price`: Pricing in dollar format (e.g., `$0.01`)
- `description`: Brief description of what the endpoint does

### 3. Title Format

- Use `# ServiceName` — not `# ServiceName Operations`
- Match the service name in the homepage (e.g., `# Chronos`, not `# Chronos Time`)

### 4. Authentication Section

Every skill MUST have an Authentication section with:
- Standard JSON headers showing `x-obul-api-key` and `Content-Type`
- The **Base URL** for the service

### 5. Pricing Format

Always use **dollar amounts**, never credits:

| Tier | Price | Use Case |
|------|-------|----------|
| Free | $0.00 | Health checks, status endpoints |
| Polling | $0.0001 | Async status polling |
| Simple | $0.001–$0.01 | Basic queries, retrieval |
| Complex | $0.01–$0.05 | AI-powered operations |
| Heavy | $0.05+ | Long-running tasks |

### 6. Required Sections

Every SKILL.md must include:
1. **Authentication** — Base URL + headers (REQUIRED)
2. **Common Operations** — At least 2-3 operations with pricing
3. **When to Use** — 3-5 specific use cases in bullet format (REQUIRED)
4. **Best Practices** — 3-5 tips with reference to obul-api-errors

**Note:** The "Endpoint Pricing Reference" table is no longer needed in the markdown. Endpoints are now defined in the YAML frontmatter's `endpoints` array and are automatically extracted to `apis.json`.

### 7. When to Use Section Format

The **When to Use** section is critical for AI agents to understand when to invoke your skill. Format it as bullet points with clear use cases:

```markdown
## When to Use

- **Primary use case** — Brief description of when to use this skill
- **Secondary use case** — Another specific scenario
- **Third use case** — Additional relevant scenario
```

**Guidelines:**
- Include **3-5 bullet points** minimum
- Start each with **bold use case name** followed by em-dash
- Be specific about the scenario (not just "web scraping" but "scrape JavaScript-heavy sites")
- These are extracted by the `preview.js` tool for skill discovery

**Example:**
```markdown
## When to Use

- **Web scraping** — Scrape any URL to clean markdown with JavaScript rendering
- **Site discovery** — Map all URLs on a website before targeted scraping
- **Bulk content ingestion** — Crawl entire websites for RAG indexes
- **Structured extraction** — Pull data fields without custom parsers
```

### 8. Request Examples

- Use full Obul proxy URLs: `https://proxy.obul.ai/proxy/https/<host>/api/...`
- Include `x-obul-api-key` in headers
- Show realistic example values (not placeholders)

---

## Step 2: Update apis.json

Add your API to the `apis` array in alphabetical order within its category:

```json
{
  "name": "service-name",
  "category": "infrastructure",
  "skill": "obul-service-name",
  "description": "Brief description",
  "homepage": "https://example.com"
}
```

### Category Options

- `coding` - Developer tools, LLM inference, infrastructure, blockchain
- `entertainment` - Media generation, travel, weather, prediction
- `productivity` - Search, research, scraping, data enrichment
- `social-media` - Social platform APIs
- `obul` - Obul infrastructure tools (proxy, CLI, finder)

Each API entry in apis.json should also include:
- `subcategory`: Specific type (e.g., llm, search, enrichment, twitter)
- `tag`: Model/variant identifier (e.g., chat-completion, web, semantic)
- `provider`: Original service provider name

**Note:** After adding a new skill, run `node scripts/recategorize-apis.cjs` to auto-generate the category fields from the SKILL.md endpoints.

---

## Step 3: Update README.md

Add your API to the category table:

```markdown
| **Category** | APIs |
|-------------|------|
| **CategoryName** | ExistingAPI, NewAPI |
```

---

## Review Checklist

Before submitting a PR, verify:

- [ ] SKILL.md follows the template structure
- [ ] Name starts with `obul-` prefix
- [ ] Frontmatter includes `endpoints` array with path, method, price, description
- [ ] Frontmatter includes `metadata.obul-skill` with emoji and OBUL_API_KEY
- [ ] Frontmatter includes `registries: {}`
- [ ] **No `homepage` field** (replaced by endpoints)
- [ ] Title is `# ServiceName` (not `# ServiceName Operations`)
- [ ] **Authentication section exists** with Base URL and headers
- [ ] All operations have pricing in dollar format ($0.00)
- [ ] Request examples use full proxy URLs
- [ ] **When to Use section exists** with 3-5 specific bullet points
- [ ] **Best Practices references obul-api-errors**
- [ ] Entry added to `apis.json` with category, subcategory, tag, provider
- [ ] Entry added to `README.md` category table
- [ ] Run `node scripts/recategorize-apis.cjs` to auto-update apis.json
- [ ] No placeholder text or TODO comments

---

## Reference

For a detailed guide on writing skills, see:
[How to Write Obul Skills](https://github.com/dpbmaverick98/Agent_Army_Skills/blob/main/Agent_Army_Skills_Obul/how-to-write-obul-skills.md)

For examples, browse existing skills in `skills/`.
