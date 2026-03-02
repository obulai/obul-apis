#!/usr/bin/env node
// fetch.js - Fetch skill metadata from SKILL.md YAML header

const fs = require('fs');
const path = require('path');

function parseYamlHeader(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;
  
  const yaml = match[1];
  const metadata = {};
  let currentKey = null;
  let currentObj = metadata;
  const stack = [];
  
  yaml.split('\n').forEach(line => {
    // Check for nested object start
    if (line.trim().endsWith(':')) {
      const key = line.trim().slice(0, -1);
      currentObj[key] = {};
      stack.push({ obj: currentObj, key });
      currentObj = currentObj[key];
      return;
    }
    
    // Check for key-value pair
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();
      
      // Remove quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      
      currentObj[key] = value;
    }
  });
  
  return metadata;
}

// CLI
const skillName = process.argv[2];
if (!skillName) {
  console.log('Usage: fetch.js <skill-name>');
  console.log('Example: fetch.js obul-firecrawl');
  process.exit(1);
}

const skillPath = path.join(__dirname, '..', '..', '..', 'skills', skillName, 'SKILL.md');

if (!fs.existsSync(skillPath)) {
  console.error(`Skill not found: ${skillName}`);
  console.error(`Looking for: ${skillPath}`);
  process.exit(1);
}

const content = fs.readFileSync(skillPath, 'utf8');
const header = parseYamlHeader(content);
const body = content.replace(/^---\n[\s\S]*?\n---\n*/, '').trim();

const result = {
  name: skillName,
  header,
  bodyPreview: body.substring(0, 500) + (body.length > 500 ? '...' : ''),
  fullPath: skillPath,
  installPath: path.join(process.env.HOME || '~', '.claude', 'skills', skillName, 'SKILL.md')
};

console.log(JSON.stringify(result, null, 2));