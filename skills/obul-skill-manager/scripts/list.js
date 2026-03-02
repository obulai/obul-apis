#!/usr/bin/env node
// list.js - List all skills by category

const fs = require('fs');
const path = require('path');

const APIS_JSON = path.join(__dirname, '..', '..', '..', 'apis.json');

function listSkills(categoryFilter) {
  const apis = JSON.parse(fs.readFileSync(APIS_JSON, 'utf8'));
  
  // Group by category
  const byCategory = {};
  apis.apis.forEach(api => {
    if (!byCategory[api.category]) {
      byCategory[api.category] = [];
    }
    byCategory[api.category].push(api);
  });
  
  // Filter if category specified
  if (categoryFilter) {
    const normalized = categoryFilter.toLowerCase().replace(/\s+/g, '-');
    const matching = Object.keys(byCategory).filter(cat => 
      cat.toLowerCase().includes(normalized)
    );
    
    if (matching.length === 0) {
      console.log(`No category found: ${categoryFilter}`);
      console.log(`Available: ${Object.keys(byCategory).join(', ')}`);
      return;
    }
    
    matching.forEach(cat => {
      console.log(`\n## ${cat}`);
      byCategory[cat].forEach(api => {
        console.log(`  • ${api.name} - ${api.description}`);
      });
    });
  } else {
    // List all
    Object.entries(byCategory).forEach(([cat, items]) => {
      console.log(`\n## ${cat} (${items.length})`);
      items.forEach(api => {
        console.log(`  • ${api.name} - ${api.description}`);
      });
    });
  }
}

// CLI
const category = process.argv[2];
listSkills(category);