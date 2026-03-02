#!/usr/bin/env node
// search.js - Search APIs by keyword or use case

const fs = require('fs');
const path = require('path');

const APIS_JSON = path.join(__dirname, '..', '..', '..', 'apis.json');

function search(query) {
  const q = query.toLowerCase();
  const apis = JSON.parse(fs.readFileSync(APIS_JSON, 'utf8'));
  
  return apis.apis.filter(api => {
    const text = `${api.name} ${api.description} ${api.category}`.toLowerCase();
    return text.includes(q);
  });
}

// CLI
const query = process.argv.slice(2).join(' ');
if (!query) {
  console.log('Usage: search.js <query>');
  console.log('Example: search.js "scrape website"');
  process.exit(1);
}

const results = search(query);
console.log(JSON.stringify(results, null, 2));