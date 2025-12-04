#!/usr/bin/env node

/**
 * Analyse complète de la structure du blog Nice
 * - Lit tous les frontmatters
 * - Génère le mapping slug → URL réelle
 * - Teste en production
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '../');
const domain = 'https://devis-demenageur-nice.fr';

// CATEGORY_MAPPING (copié de lib/blog.ts)
const CATEGORY_MAPPING = {
  'déménagement-economique': 'pas-cher',
  'demenagement-economique': 'pas-cher',
  'demenagement-etudiant': 'etudiant',
  'demenagement-entreprise': 'entreprise',
  'demenagement-piano': 'piano',
  'demenagement-international': 'international',
  'demenagement-longue-distance': 'longue-distance',
  'demenagement-pas-cher': 'pas-cher',
  'demenagement-urgent': 'urgent',
  'devis-demenagement': 'devis',
  'garde-meuble': 'garde-meuble',
  'prix-demenagement': 'prix',
  'piliers': 'general',
  'satellites': 'conseils',
  'location-camion': 'location-camion',
  'petit-demenagement': 'petit-demenagement',
};

function cleanSlug(slug) {
  // Logique de cleanSlug (simplifié)
  return slug.replace(/-guide-complet$/, '-guide');
}

function getMappedCategory(category) {
  // Si catégorie finit par -nice, ne pas mapper
  if (category.endsWith('-nice')) {
    return category;
  }
  
  return CATEGORY_MAPPING[category] || category;
}

function generateUrl(slug, category) {
  const cleanedSlug = cleanSlug(slug);
  const mappedCategory = getMappedCategory(category);
  
  return `/blog/${mappedCategory}/${cleanedSlug}/`;
}

function getAllBlogFiles() {
  const files = [];
  const blogDir = path.join(root, 'content/blog');
  
  const categories = fs.readdirSync(blogDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory() && !dirent.name.includes('backup'));
  
  for (const catDir of categories) {
    const catPath = path.join(blogDir, catDir.name);
    const mdFiles = fs.readdirSync(catPath, { recursive: false })
      .filter(f => f.endsWith('.md'))
      .map(f => ({
        path: path.join(catPath, f),
        folder: catDir.name
      }));
    
    files.push(...mdFiles);
  }
  
  return files;
}

async function testUrl(url) {
  try {
    const response = await fetch(`${domain}${url}`, {
      method: 'HEAD',
      redirect: 'manual'
    });
    return response.status;
  } catch (error) {
    return 'ERROR';
  }
}

async function main() {
  console.log('🔍 ANALYSE STRUCTURE BLOG NICE\n');
  
  const files = getAllBlogFiles();
  const mapping = {};
  const results = [];
  
  console.log(`📁 ${files.length} fichiers trouvés\n`);
  
  for (const file of files) {
    const content = fs.readFileSync(file.path, 'utf-8');
    const { data } = matter(content);
    
    const slug = data.slug || path.basename(file.path, '.md');
    const category = data.category || 'default';
    const type = data.type || 'satellite';
    
    const url = generateUrl(slug, category);
    
    mapping[slug] = {
      url,
      category,
      mappedCategory: getMappedCategory(category),
      type,
      folder: file.folder,
      file: path.basename(file.path)
    };
    
    results.push({ slug, url, category, type, folder: file.folder });
  }
  
  // Sauvegarder le mapping
  fs.writeFileSync(
    path.join(root, 'scripts/blog-url-mapping.json'),
    JSON.stringify(mapping, null, 2),
    'utf-8'
  );
  
  console.log('✅ Mapping généré → scripts/blog-url-mapping.json\n');
  
  // Statistiques
  const guides = results.filter(r => r.type === 'pilier');
  const satellites = results.filter(r => r.type === 'satellite');
  
  console.log('📊 STATISTIQUES:');
  console.log(`   - Guides piliers: ${guides.length}`);
  console.log(`   - Satellites: ${satellites.length}`);
  console.log(`   - Total: ${results.length}\n`);
  
  // Grouper par catégorie
  const byCategory = {};
  for (const r of results) {
    const cat = r.category;
    byCategory[cat] = (byCategory[cat] || 0) + 1;
  }
  
  console.log('📂 PAR CATÉGORIE:');
  Object.entries(byCategory)
    .sort((a, b) => b[1] - a[1])
    .forEach(([cat, count]) => {
      const mapped = getMappedCategory(cat);
      const arrow = cat !== mapped ? ` → ${mapped}` : '';
      console.log(`   ${cat}${arrow}: ${count}`);
    });
  
  console.log('\n💾 Mapping sauvegardé dans scripts/blog-url-mapping.json');
}

main().catch(console.error);



