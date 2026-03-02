#!/bin/bash
# Install Obul API Finder skill to ~/.claude/skills/

SKILL_DIR="$HOME/.claude/skills/obul-api-finder"
SKILL_URL="https://raw.githubusercontent.com/obulai/obul-apis/main/skills/obul-api-finder/SKILL.md"

echo "📦 Installing obul-api-finder..."

# Create directory
mkdir -p "$SKILL_DIR"

# Download SKILL.md
curl -fsSL "$SKILL_URL" -o "$SKILL_DIR/SKILL.md"

if [ $? -eq 0 ]; then
    echo "✅ Installed: obul-api-finder"
    echo "   Location: $SKILL_DIR"
    echo "   Usage: /obul-api-finder: <command>"
else
    echo "❌ Failed to install obul-api-finder"
    exit 1
fi
