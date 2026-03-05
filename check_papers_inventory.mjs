#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PAPERS_ROOT = path.join(__dirname, 'CSS_Past_Papers');

console.log('📁 CSS PAST PAPERS - INVENTORY CHECK\n');
console.log(`Root Path: ${PAPERS_ROOT}\n`);

// Check if folder exists
if (!fs.existsSync(PAPERS_ROOT)) {
  console.log('❌ CSS_Past_Papers folder not found!');
  process.exit(1);
}

// Scan all years
const yearFolders = fs.readdirSync(PAPERS_ROOT).filter(f => f.match(/^CSS\d{4}$/));

let totalPapers = 0;
let yearStats = {};

yearFolders.forEach(yearFolder => {
  const yearPath = path.join(PAPERS_ROOT, yearFolder);
  const stats = fs.statSync(yearPath);
  
  if (stats.isDirectory()) {
    const allFiles = [];
    
    // Walk through all subdirectories
    const walkDir = (dir) => {
      const items = fs.readdirSync(dir);
      items.forEach(item => {
        const itemPath = path.join(dir, item);
        const itemStats = fs.statSync(itemPath);
        if (itemStats.isDirectory()) {
          walkDir(itemPath);
        } else if (itemStats.isFile() && /\.(pdf|doc|docx)$/i.test(item)) {
          allFiles.push(item);
        }
      });
    };
    
    walkDir(yearPath);
    
    yearStats[yearFolder] = allFiles.length;
    totalPapers += allFiles.length;
    
    if (allFiles.length > 0) {
      console.log(`✅ ${yearFolder}: ${allFiles.length} paper(s)`);
      allFiles.forEach(f => console.log(`   📄 ${f}`));
    } else {
      console.log(`⚠️  ${yearFolder}: 0 papers`);
    }
  }
});

console.log('\n' + '='.repeat(60));
console.log(`📊 TOTAL PAPERS: ${totalPapers}`);
console.log('='.repeat(60) + '\n');

// Summary
console.log('📋 SUMMARY BY YEAR:\n');
Object.entries(yearStats).forEach(([year, count]) => {
  const bar = '█'.repeat(count).padEnd(20, '░');
  console.log(`${year}: [${bar}] ${count}`);
});

console.log('\n✨ All papers are ready for download!\n');
