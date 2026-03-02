#!/usr/bin/env node
// auto.js - Full workflow: search → fetch → install

const { execSync } = require('child_process');
const path = require('path');

function run(script, ...args) {
  const scriptPath = path.join(__dirname, script);
  const cmd = `node "${scriptPath}" ${args.map(a => `"${a}"`).join(' ')}`;
  return execSync(cmd, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] });
}

// CLI
const query = process.argv.slice(2).join(' ');
if (!query) {
  console.log('Usage: auto.js <query>');
  console.log('Example: auto.js "scrape website"');
  process.exit(1);
}

console.log(`🔍 Searching for: "${query}"\n`);

let results;
try {
  results = JSON.parse(run('search.js', query));
} catch (e) {
  console.error('Search failed:', e.message);
  process.exit(1);
}

if (results.length === 0) {
  console.log('❌ No skills found. Try different keywords:');
  console.log('   - scrape, crawl, extract');
  console.log('   - search, find, discover');
  console.log('   - email, contact, enrich');
  console.log('   - crypto, price, wallet');
  process.exit(1);
}

// Show top 3 results
console.log(`✅ Found ${results.length} skill(s):\n`);
results.slice(0, 3).forEach((api, i) => {
  console.log(`${i + 1}. ${api.name}`);
  console.log(`   ${api.description}`);
  console.log(`   Category: ${api.category}`);
  console.log();
});

// Pick first result
const selected = results[0];
console.log(`➡️  Selected: ${selected.skill}\n`);

// Fetch details
console.log(`📋 Fetching skill info...\n`);
let details;
try {
  details = JSON.parse(run('fetch.js', selected.skill));
} catch (e) {
  console.error('Fetch failed:', e.message);
  process.exit(1);
}

if (details.header) {
  console.log(`Name: ${details.header.name || selected.name}`);
  console.log(`Description: ${details.header.description || selected.description}`);
  if (details.header.pricing) {
    console.log(`Pricing: ${details.header.pricing}`);
  }
  console.log();
}

// Install
console.log(`⬇️  Installing ${selected.skill}...\n`);
try {
  run('install.js', selected.skill);
  console.log();
  console.log(`🎉 Ready to use!`);
  console.log(`   Try: /${selected.skill}: <command>`);
} catch (e) {
  console.error('Install failed:', e.message);
  process.exit(1);
}