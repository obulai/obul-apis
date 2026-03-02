---
name: obul-api-finder
description: "USE THIS SKILL WHEN: the user wants to find, explore, or install Obul API skills. Searches the local api catalog, fetches skill metadata, and installs skills to .claude folder."
homepage: https://github.com/obulai/obul-apis
metadata:
  obul-skill:
    emoji: "🔧"
    requires:
      env: ["OBUL_API_KEY"]
      primaryEnv: "OBUL_API_KEY"
---

# Obul API Finder

Manage Obul API skills - search, fetch, and install locally.

## Overview

This skill provides tools to:
- **Search** the API catalog by keyword or use case
- **Fetch** skill metadata and documentation
- **Install** skills to `~/.claude/skills/` for immediate use

## Commands

### Search APIs

Find APIs by keyword, category, or use case:

```bash
node scripts/search.js "scrape website"
node scripts/search.js "find email"
node scripts/search.js "crypto price"
```

Returns: Matching APIs with name, category, description, and skill path.

### Fetch Skill Info

Get detailed skill metadata from SKILL.md:

```bash
node scripts/fetch.js obul-firecrawl
node scripts/fetch.js obul-apollo
```

Returns: YAML header (name, description, requirements) + documentation preview.

### Install Skill

Copy a skill to `~/.claude/skills/`:

```bash
node scripts/install.js obul-firecrawl
node scripts/install.js obul-apollo
```

After install, the skill is immediately available in Claude Code.

### List All Skills

Browse all available skills by category:

```bash
node scripts/list.js
node scripts/list.js "web-scraping"
```

## Example Workflow

```bash
# 1. Search for what you need
$ node scripts/search.js "scrape"
[
  {
    "name": "firecrawl",
    "category": "web-scraping",
    "skill": "obul-firecrawl",
    "description": "Scrape URLs, crawl websites, extract structured data"
  }
]

# 2. Get more info
$ node scripts/fetch.js obul-firecrawl
Name: obul-firecrawl
Description: Scrape any website and convert to markdown
Pricing: $0.001/request

# 3. Install it
$ node scripts/install.js obul-firecrawl
✓ Installed obul-firecrawl to ~/.claude/skills/obul-firecrawl

# 4. Use in Claude
/obul-firecrawl:scrape https://example.com
```

## File Locations

| File | Purpose |
|------|---------|
| `scripts/search.js` | Search apis.json catalog |
| `scripts/fetch.js` | Parse SKILL.md YAML header |
| `scripts/install.js` | Copy skill to ~/.claude/skills/ |
| `scripts/list.js` | List all skills by category |

## Data Sources

- **API Catalog**: `../../apis.json` (all 50+ APIs)
- **Skill Docs**: `../../skills/{skill-name}/SKILL.md`
- **Install Target**: `~/.claude/skills/{skill-name}/`