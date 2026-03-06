#!/usr/bin/env node
// optimize.js - Find the cheapest provider for a use case

const fs = require('fs');
const path = require('path');
const https = require('https');

const LOCAL_PATH = path.join(__dirname, '../data/pricing.json');
const REMOTE_URL = 'https://raw.githubusercontent.com/obulai/obul-apis/main/skills/obul-api-optimizer/data/pricing.json';

function loadPricing() {
  try {
    return JSON.parse(fs.readFileSync(LOCAL_PATH, 'utf8'));
  } catch {
    return new Promise((resolve, reject) => {
      https.get(REMOTE_URL, res => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve(JSON.parse(data)));
      }).on('error', reject);
    });
  }
}

function matchOperations(operations, queryWords) {
  const results = [];
  for (const [id, op] of Object.entries(operations)) {
    const text = `${op.name} ${op.description} ${op.keywords.join(' ')}`.toLowerCase();
    const allMatch = queryWords.every(w => text.includes(w));
    if (allMatch) results.push({ id, ...op });
  }
  return results;
}

async function main() {
  const query = process.argv.slice(2).join(' ').trim();
  if (!query) {
    console.log('Usage: optimize.js <query>');
    console.log('Examples:');
    console.log('  optimize.js "email verification"');
    console.log('  optimize.js "twitter profile"');
    console.log('  optimize.js "company enrich"');
    process.exit(1);
  }

  const pricing = await loadPricing();
  const queryWords = query.toLowerCase().split(/\s+/);
  const matches = matchOperations(pricing.operations, queryWords);

  if (matches.length === 0) {
    console.log(`No operations found matching "${query}"`);
    console.log('\nAvailable operations:');
    for (const [id, op] of Object.entries(pricing.operations)) {
      console.log(`  ${id}: ${op.name}`);
    }
    process.exit(0);
  }

  for (const op of matches) {
    const sorted = [...op.providers].sort((a, b) => a.price - b.price);
    console.log(`\n${op.name} (${op.id})`);
    console.log('─'.repeat(50));
    sorted.forEach((p, i) => {
      const marker = i === 0 ? ' [cheapest]' : '';
      console.log(`  ${i + 1}. $${p.price.toFixed(4)} — ${p.name} (${p.skill})${marker}`);
      console.log(`     ${p.method} ${p.baseUrl}${p.endpoint}`);
    });

    if (sorted.length > 1) {
      const cheapest = sorted[0].price;
      const most = sorted[sorted.length - 1].price;
      const savings = ((1 - cheapest / most) * 100).toFixed(0);
      console.log(`\n  Savings: ${savings}% by using ${sorted[0].name} instead of ${sorted[sorted.length - 1].name}`);
    }
  }
}

main().catch(err => { console.error('Error:', err.message); process.exit(1); });
