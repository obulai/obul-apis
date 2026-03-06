#!/usr/bin/env node
// compare.js - Side-by-side pricing comparison of 2+ skills

const fs = require('fs');
const path = require('path');
const https = require('https');

const LOCAL_PATH = path.join(__dirname, '../data/pricing.json');
const REMOTE_URL = 'https://raw.githubusercontent.com/obulai/obul-apis/main/skills/obul-api-optimizer/data/pricing.json';

function loadPricing() {
  try {
    return Promise.resolve(JSON.parse(fs.readFileSync(LOCAL_PATH, 'utf8')));
  } catch {
    return new Promise((resolve, reject) => {
      https.get(REMOTE_URL, res => {
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode} fetching pricing data`));
          res.resume();
          return;
        }
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try { resolve(JSON.parse(data)); }
          catch (e) { reject(new Error('Invalid JSON in remote pricing data')); }
        });
      }).on('error', reject);
    });
  }
}

function padRight(str, len) { return str + ' '.repeat(Math.max(0, len - str.length)); }
function padLeft(str, len) { return ' '.repeat(Math.max(0, len - str.length)) + str; }

async function main() {
  const skills = process.argv.slice(2);
  if (skills.length < 2) {
    console.log('Usage: compare.js <skill1> <skill2> [skill3...]');
    console.log('Example: compare.js obul-stableenrich obul-hunter obul-tomba');
    process.exit(1);
  }

  const pricing = await loadPricing();

  // Find operations where 2+ requested skills are providers
  const rows = [];
  for (const [id, op] of Object.entries(pricing.operations)) {
    const providerSkills = op.providers.map(p => p.skill);
    const matching = skills.filter(s => providerSkills.includes(s));
    if (matching.length >= 2) {
      const priceMap = {};
      for (const p of op.providers) {
        if (skills.includes(p.skill)) {
          priceMap[p.skill] = p.price;
        }
      }
      rows.push({ id, name: op.name, prices: priceMap });
    }
  }

  if (rows.length === 0) {
    console.log('No overlapping operations found for these skills.');
    console.log('Skills compared:', skills.join(', '));
    process.exit(0);
  }

  // Build ASCII table
  const opColWidth = Math.max(20, ...rows.map(r => r.name.length)) + 2;
  const skillColWidth = Math.max(12, ...skills.map(s => s.length)) + 2;

  // Header
  let header = padRight('Operation', opColWidth) + '|';
  for (const s of skills) header += padLeft(s, skillColWidth) + ' |';
  const separator = '─'.repeat(opColWidth) + '+' + skills.map(() => '─'.repeat(skillColWidth + 1) + '+').join('');

  console.log(`\nPricing Comparison (${skills.length} skills, ${rows.length} overlapping operations)`);
  console.log(separator);
  console.log(header);
  console.log(separator);

  for (const row of rows) {
    const prices = skills.map(s => row.prices[s]);
    const minPrice = Math.min(...prices.filter(p => p !== undefined));

    let line = padRight(row.name, opColWidth) + '|';
    for (const s of skills) {
      const price = row.prices[s];
      if (price === undefined) {
        line += padLeft('—', skillColWidth) + ' |';
      } else {
        const marker = price === minPrice ? ' *' : '  ';
        line += padLeft('$' + price.toFixed(4) + marker, skillColWidth) + ' |';
      }
    }
    console.log(line);
  }

  console.log(separator);
  console.log('\n* = cheapest for that operation');
}

main().catch(err => { console.error('Error:', err.message); process.exit(1); });
