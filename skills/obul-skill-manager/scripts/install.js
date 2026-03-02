#!/usr/bin/env node
// install.js - Install skill to ~/.claude/skills/

const fs = require('fs');
const path = require('path');

function installSkill(skillName) {
  const sourceDir = path.join(__dirname, '..', '..', '..', 'skills', skillName);
  const targetDir = path.join(process.env.HOME, '.claude', 'skills', skillName);
  
  if (!fs.existsSync(sourceDir)) {
    console.error(`❌ Skill not found: ${skillName}`);
    console.error(`   Looking for: ${sourceDir}`);
    process.exit(1);
  }
  
  // Check if already installed
  if (fs.existsSync(targetDir)) {
    console.log(`⚠️  Skill already installed: ${skillName}`);
    console.log(`   Location: ${targetDir}`);
    return;
  }
  
  // Create target directory
  fs.mkdirSync(targetDir, { recursive: true });
  
  // Copy SKILL.md
  const sourceFile = path.join(sourceDir, 'SKILL.md');
  const targetFile = path.join(targetDir, 'SKILL.md');
  
  if (!fs.existsSync(sourceFile)) {
    console.error(`❌ SKILL.md not found in ${sourceDir}`);
    process.exit(1);
  }
  
  fs.copyFileSync(sourceFile, targetFile);
  
  console.log(`✅ Installed: ${skillName}`);
  console.log(`   Location: ${targetDir}`);
  console.log(`   Usage: /${skillName}: <command>`);
}

// CLI
const skillName = process.argv[2];
if (!skillName) {
  console.log('Usage: install.js <skill-name>');
  console.log('Example: install.js obul-firecrawl');
  process.exit(1);
}

installSkill(skillName);