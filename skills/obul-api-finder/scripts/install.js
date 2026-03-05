#!/usr/bin/env node
// install.js - Install skill to ~/.claude/skills/

const https = require('https');
const fs = require('fs');
const path = require('path');

const SKILL_URL_BASE = 'https://raw.githubusercontent.com/obulai/obul-apis/main/skills';

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 404) {
        reject(new Error('404'));
        return;
      }
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode}`));
        return;
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function installSkill(skillName) {
  const targetDir = path.join(process.env.HOME, '.claude', 'skills', skillName);
  const url = `${SKILL_URL_BASE}/${skillName}/SKILL.md`;
  
  try {
    const content = await fetchUrl(url);
    
    // Create target directory
    fs.mkdirSync(targetDir, { recursive: true });
    
    // Write SKILL.md
    fs.writeFileSync(path.join(targetDir, 'SKILL.md'), content);
    
    console.log(`✅ Installed: ${skillName}`);
    console.log(`   Location: ${targetDir}`);
    console.log(`   Usage: /${skillName}: <command>`);
  } catch (err) {
    if (err.message === '404') {
      console.error(`❌ Skill not found: ${skillName}`);
      console.error(`   Looking for: ${url}`);
    } else {
      console.error(`❌ Error installing skill: ${err.message}`);
    }
    process.exit(1);
  }
}

// CLI
const skillName = process.argv[2];
if (!skillName) {
  console.log('Usage: install.js <skill-name>');
  console.log('Example: install.js obul-firecrawl');
  process.exit(1);
}

installSkill(skillName);
