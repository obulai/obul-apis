#!/usr/bin/env node
// audit.js - Scan a file for API URLs and flag cheaper alternatives

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

async function main() {
  const filePath = process.argv[2];
  if (!filePath) {
    console.log('Usage: audit.js <file>');
    console.log('Example: audit.js tools.md');
    console.log('         audit.js src/api-client.js');
    process.exit(1);
  }

  const resolved = path.resolve(filePath);
  if (!fs.existsSync(resolved)) {
    console.error(`File not found: ${resolved}`);
    process.exit(1);
  }

  const content = fs.readFileSync(resolved, 'utf8');
  const pricing = await loadPricing();

  const findings = [];
  let totalCurrent = 0;
  let totalOptimized = 0;

  for (const [pattern, info] of Object.entries(pricing.urlPatterns)) {
    const regex = new RegExp(pattern, 'g');
    const matches = content.match(regex);
    if (!matches) continue;

    const op = pricing.operations[info.operation];
    if (!op) continue;

    const cheapest = [...op.providers].sort((a, b) => a.price - b.price)[0];
    const count = matches.length;

    totalCurrent += info.price * count;
    totalOptimized += cheapest.price * count;

    findings.push({
      pattern: matches[0],
      count,
      operation: op.name,
      currentSkill: info.name,
      currentPrice: info.price,
      cheapestSkill: cheapest.name,
      cheapestPrice: cheapest.price,
      isOptimal: info.price <= cheapest.price
    });
  }

  if (findings.length === 0) {
    console.log('No known API URLs found in this file.');
    process.exit(0);
  }

  console.log(`\nAPI Audit: ${path.basename(resolved)}`);
  console.log('─'.repeat(60));

  let optimizable = 0;
  for (const f of findings) {
    const status = f.isOptimal ? 'OPTIMAL' : 'SAVINGS AVAILABLE';
    console.log(`\n  ${f.operation} (${f.count}x)`);
    console.log(`    Current:  ${f.currentSkill} @ $${f.currentPrice.toFixed(4)}/req`);

    if (!f.isOptimal) {
      console.log(`    Cheapest: ${f.cheapestSkill} @ $${f.cheapestPrice.toFixed(4)}/req`);
      const pct = ((1 - f.cheapestPrice / f.currentPrice) * 100).toFixed(0);
      console.log(`    Status:   ${status} (${pct}% cheaper)`);
      optimizable++;
    } else {
      console.log(`    Status:   ${status}`);
    }
  }

  console.log('\n' + '─'.repeat(60));
  console.log(`  APIs found: ${findings.length}`);
  console.log(`  Already optimal: ${findings.length - optimizable}`);
  console.log(`  Can optimize: ${optimizable}`);
  if (findings.length > 0) {
    console.log(`  Cost per run (current):   $${totalCurrent.toFixed(4)}`);
    console.log(`  Cost per run (optimized): $${totalOptimized.toFixed(4)}`);
    if (totalCurrent > totalOptimized) {
      const pct = ((1 - totalOptimized / totalCurrent) * 100).toFixed(0);
      console.log(`  Potential savings:        ${pct}%`);
    }
  }
}

main().catch(err => { console.error('Error:', err.message); process.exit(1); });
