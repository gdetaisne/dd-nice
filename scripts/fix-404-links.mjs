#!/usr/bin/env node

/**
 * Correction des liens 404 basée sur le mapping réel
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '../');

// Charger le mapping
const mappingPath = path.join(root, 'scripts/blog-url-mapping.json');
const mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf-8'));

// Créer un index slug → URL réelle
const slugToUrl = {};
for (const [slug, data] of Object.entries(mapping)) {
  slugToUrl[slug] = data.url;
}

function fixLinksInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let modified = false;
  const fixes = [];
  
  // Pattern: ](/blog/{catégorie}/{slug})
  // Remplacer par la vraie URL du slug
  const linkPattern = /\]\(\/blog\/([^/)]+)\/([^/)]+)\/?(\))/g;
  
  const newContent = content.replace(linkPattern, (match, category, slug, closing) => {
    // Nettoyer le slug (retirer trailing slash éventuel)
    const cleanSlug = slug.replace(/\/$/, '');
    
    // Chercher la vraie URL
    const realUrl = slugToUrl[cleanSlug];
    
    if (realUrl) {
      const oldUrl = `/blog/${category}/${cleanSlug}`;
      
      // Si l'URL actuelle est différente de la vraie
      if (`/blog/${category}/${cleanSlug}/` !== realUrl) {
        modified = true;
        fixes.push({
          old: oldUrl,
          new: realUrl
        });
        return `](${realUrl})`;
      }
    }
    
    return match;
  });
  
  if (modified) {
    fs.writeFileSync(filePath, newContent, 'utf-8');
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

console.log('🔧 CORRECTION DES LIENS 404\n');

const files = getAllBlogFiles();
let totalFixed = 0;
let filesModified = 0;

for (const file of files) {
  const fixes = fixLinksInFile(file);
  
  if (fixes) {
    filesModified++;
    totalFixed += fixes.length;
    const relPath = path.relative(root, file);
    console.log(`✅ ${relPath}`);
    fixes.forEach(f => {
      console.log(`   ${f.old} → ${f.new}`);
    });
  }
}

console.log(`\n📊 RÉSUMÉ:`);
console.log(`   - Fichiers modifiés: ${filesModified}`);
console.log(`   - Liens corrigés: ${totalFixed}`);



