#!/bin/bash
# Install Obul API Optimizer skill to ~/.claude/skills/

SKILL_DIR="$HOME/.claude/skills/obul-api-optimizer"
BASE_URL="https://raw.githubusercontent.com/obulai/obul-apis/main/skills/obul-api-optimizer"

echo "Installing obul-api-optimizer..."

# Cleanup existing installation
rm -rf "$SKILL_DIR"

# Create directories
mkdir -p "$SKILL_DIR/scripts"
mkdir -p "$SKILL_DIR/data"

# Download SKILL.md
curl -fsSL "$BASE_URL/SKILL.md" -o "$SKILL_DIR/SKILL.md"

# Download scripts
for script in optimize.js compare.js audit.js; do
    curl -fsSL "$BASE_URL/scripts/$script" -o "$SKILL_DIR/scripts/$script"
done

# Download pricing data
curl -fsSL "$BASE_URL/data/pricing.json" -o "$SKILL_DIR/data/pricing.json"

if [ $? -eq 0 ]; then
    echo "Installed: obul-api-optimizer"
    echo "   Location: $SKILL_DIR"
    echo "   Usage: node $SKILL_DIR/scripts/optimize.js \"email verification\""
else
    echo "Failed to install obul-api-optimizer"
    exit 1
fi
