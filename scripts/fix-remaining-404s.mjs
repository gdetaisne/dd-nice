#!/usr/bin/env node

/**
 * Correction des 404s restants - Patterns spécifiques
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '../');

// Charger le mapping
const mappingPath = path.join(root, 'scripts/blog-url-mapping.json');
const mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf-8'));

// Index slug → URL réelle
const slugToUrl = {};
for (const [slug, data] of Object.entries(mapping)) {
  slugToUrl[slug] = data.url;
}

function fixLinksInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let modified = false;
  const fixes = [];
  
  // Pattern 1: ](/blog/{catégorie}/satellites/{slug})
  content = content.replace(/\]\(\/blog\/([^/)]+)\/satellites\/([^/)]+)\/?(\))/g, (match, category, slug, closing) => {
    const realUrl = slugToUrl[slug];
    if (realUrl) {
      modified = true;
      fixes.push({
        old: `/blog/${category}/satellites/${slug}`,
        new: realUrl,
        pattern: 'satellites'
      });
      return `](${realUrl})`;
    }
    return match;
  });
  
  // Pattern 2: ](/demenagement/{slug}) - manque /blog/
  content = content.replace(/\]\(\/demenagement\/([^/)]+)\/?(\))/g, (match, slug, closing) => {
    const realUrl = slugToUrl[slug];
    if (realUrl) {
      modified = true;
      fixes.push({
        old: `/demenagement/${slug}`,
        new: realUrl,
        pattern: 'missing-blog'
      });
      return `](${realUrl})`;
    }
    return match;
  });
  
  // Pattern 3: ](/blog/demenagement-etudiant-nice/{slug}) - catégorie inexistante
  content = content.replace(/\]\(\/blog\/demenagement-etudiant-nice\/([^/)]+)\/?(\))/g, (match, slug, closing) => {
    // Chercher un satellite étudiant correspondant
    const etudiantSlug = slugToUrl['demenagement-etudiant-pas-cher-nice'];
    if (etudiantSlug) {
      modified = true;
      fixes.push({
        old: `/blog/demenagement-etudiant-nice/${slug}`,
        new: etudiantSlug,
        pattern: 'etudiant-inexistant'
      });
      return `](${etudiantSlug})`;
    }
    return match;
  });
  
  // Pattern 4: Catégories vides → /blog/
  const emptyCategories = ['garde-meuble', 'international', 'pas-cher', 'piano', 'prix'];
  for (const cat of emptyCategories) {
    const regex = new RegExp(`\\]\\(\\/blog\\/${cat}\\)`, 'g');
    if (content.match(regex)) {
      content = content.replace(regex, '](/blog/)');
      modified = true;
      fixes.push({
        old: `/blog/${cat}`,
        new: '/blog/',
        pattern: 'empty-category'
      });
    }
  }
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf-8');
    return fixes;
  }
  
  return null;
}

function getAllBlogFiles() {
  const files = [];
  const blogDir = path.join(root, 'content/blog');
  
  const walk = (dir) => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory() && !entry.name.includes('backup')) {
        walk(fullPath);
      } else if (entry.name.endsWith('.md')) {
        files.push(fullPath);
      }
    }
  };
  
  walk(blogDir);
  return files;
}

console.log('🔧 CORRECTION 404s RESTANTS\n');

const files = getAllBlogFiles();
let totalFixed = 0;
let filesModified = 0;
const patternCounts = {
  satellites: 0,
  'missing-blog': 0,
  'etudiant-inexistant': 0,
  'empty-category': 0
};

for (const file of files) {
  const fixes = fixLinksInFile(file);
  
  if (fixes) {
    filesModified++;
    totalFixed += fixes.length;
    const relPath = path.relative(root, file);
    console.log(`✅ ${relPath}`);
    fixes.forEach(f => {
      console.log(`   [${f.pattern}] ${f.old} → ${f.new}`);
      patternCounts[f.pattern]++;
    });
  }
}

console.log(`\n📊 RÉSUMÉ:`);
console.log(`   - Fichiers modifiés: ${filesModified}`);
console.log(`   - Liens corrigés: ${totalFixed}`);
console.log(`\n📋 PAR PATTERN:`);
console.log(`   - /blog/{cat}/satellites/{slug}: ${patternCounts.satellites}`);
console.log(`   - /demenagement/{slug} (missing /blog/): ${patternCounts['missing-blog']}`);
console.log(`   - /blog/demenagement-etudiant-nice/: ${patternCounts['etudiant-inexistant']}`);
console.log(`   - Catégories vides: ${patternCounts['empty-category']}`);



