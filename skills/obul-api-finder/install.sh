#!/bin/bash
# Install Obul API Finder skill to ~/.claude/skills/

SKILL_DIR="$HOME/.claude/skills/obul-api-finder"
BASE_URL="https://raw.githubusercontent.com/obulai/obul-apis/main/skills/obul-api-finder"

echo "📦 Installing obul-api-finder..."

# Cleanup existing installation
rm -rf "$SKILL_DIR"

# Create directory
mkdir -p "$SKILL_DIR"

# Download SKILL.md
curl -fsSL "$BASE_URL/SKILL.md" -o "$SKILL_DIR/SKILL.md"

# Download scripts
mkdir -p "$SKILL_DIR/scripts"
for script in search.js fetch.js install.js list.js; do
    curl -fsSL "$BASE_URL/scripts/$script" -o "$SKILL_DIR/scripts/$script"
done

if [ $? -eq 0 ]; then
    echo "✅ Installed: obul-api-finder"
    echo "   Location: $SKILL_DIR"
    echo "   Usage: node $SKILL_DIR/scripts/search.js \"keyword\""
else
    echo "❌ Failed to install obul-api-finder"
    exit 1
fi
