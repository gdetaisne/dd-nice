#!/usr/bin/env node

/**
 * Script de correction Pattern #3 - Catégories courtes → demenagement-nice
 * 
 * Corrige les liens dans les satellites Nice :
 * ❌ /blog/pas-cher/xxx → ✅ /blog/demenagement-nice/xxx/
 * ❌ /blog/demenageur/xxx → ✅ /blog/demenagement-nice/xxx/
 * etc.
 */

const fs = require('fs');
const path = require('path');

// Catégories courtes à corriger
const SHORT_CATEGORIES = [
  'pas-cher',
  'demenageur',
  'piano',
  'location-camion',
  'aide-demenagement',
  'international',
  'garde-meuble',
  'prix',
  'demenagement-etudiant-nice',
  'prix-demenagement-nice',
  'garde-meuble-nice',
  'location-camion-demenagement-nice',
  'aide-demenagement-nice',
  'demenagement-entreprise-nice',
  'demenagement-international-nice',
  'demenagement-pas-cher-nice',
  'demenagement-piano-nice',
  'demenageur-nice',
  'petit-demenagement-nice',
];

// Stats
let stats = {
  filesProcessed: 0,
  filesModified: 0,
  linksFixed: 0,
  errors: [],
  corrections: []
};

/**
 * Corrige les liens Pattern #3 dans un contenu markdown
 */
function fixPattern3Links(content, filePath) {
  let modified = false;
  let localCorrections = [];
  
  SHORT_CATEGORIES.forEach(category => {
    // Regex pour détecter les liens vers catégories courtes
    // Formats: ](/blog/categorie/slug) ou ](/blog/categorie/slug/)
    const regex = new RegExp(`\\]\\(/blog/${category}/([^)]+?)\\)`, 'g');
    
    const matches = content.match(regex);
    if (matches) {
      matches.forEach(match => {
        // Extraire le slug
        const slugMatch = match.match(/\/blog\/[^/]+\/(.+?)\)/);
        if (slugMatch) {
          const slug = slugMatch[1];
          
          // Construire la nouvelle URL avec trailing slash
          const oldLink = match;
          const newSlug = slug.endsWith('/') ? slug : `${slug}/`;
          const newLink = `](/blog/demenagement-nice/${newSlug})`;
          
          // Remplacer
          content = content.replace(oldLink, newLink);
          modified = true;
          
          localCorrections.push({
            old: oldLink,
            new: newLink
          });
          
          stats.linksFixed++;
        }
      });
    }
  });
  
  if (localCorrections.length > 0) {
    stats.corrections.push({
      file: filePath,
      corrections: localCorrections
    });
  }
  
  return { content, modified };
}

/**
 * Traite un fichier markdown
 */
function processFile(filePath) {
  try {
    stats.filesProcessed++;
    
    // Lire le contenu
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Appliquer les corrections
    const { content: newContent, modified } = fixPattern3Links(content, filePath);
    
    if (modified) {
      // Backup original
      const backupPath = filePath + '.backup';
      fs.writeFileSync(backupPath, content, 'utf8');
      
      // Écrire le nouveau contenu
      fs.writeFileSync(filePath, newContent, 'utf8');
      
      stats.filesModified++;
      console.log(`✅ ${path.basename(filePath)} - ${stats.linksFixed} liens corrigés`);
    }
  } catch (error) {
    stats.errors.push({
      file: filePath,
      error: error.message
    });
    console.error(`❌ Erreur sur ${filePath}: ${error.message}`);
  }
}

/**
 * Récupère tous les fichiers satellites
 */
function getSatelliteFiles() {
  const satellitesDir = path.join(__dirname, '../content/blog/satellites');
  
  if (!fs.existsSync(satellitesDir)) {
    console.error('❌ Dossier satellites/ introuvable');
    process.exit(1);
  }
  
  const files = fs.readdirSync(satellitesDir)
    .filter(file => file.endsWith('.md') && file !== 'README.md')
    .map(file => path.join(satellitesDir, file));
  
  return files;
}

/**
 * Génère le rapport de corrections
 */
function generateReport() {
  console.log('\n' + '='.repeat(60));
  console.log('📊 RAPPORT DE CORRECTIONS - Pattern #3');
  console.log('='.repeat(60));
  console.log(`\n📁 Fichiers traités : ${stats.filesProcessed}`);
  console.log(`✅ Fichiers modifiés : ${stats.filesModified}`);
  console.log(`🔗 Liens corrigés : ${stats.linksFixed}`);
  console.log(`❌ Erreurs : ${stats.errors.length}`);
  
  if (stats.corrections.length > 0) {
    console.log('\n' + '-'.repeat(60));
    console.log('📝 DÉTAILS CORRECTIONS (10 premiers)');
    console.log('-'.repeat(60));
    
    stats.corrections.slice(0, 10).forEach(item => {
      console.log(`\n📄 ${path.basename(item.file)}`);
      item.corrections.slice(0, 3).forEach(corr => {
        console.log(`  ❌ ${corr.old}`);
        console.log(`  ✅ ${corr.new}`);
      });
      if (item.corrections.length > 3) {
        console.log(`  ... et ${item.corrections.length - 3} autres corrections`);
      }
    });
    
    if (stats.corrections.length > 10) {
      console.log(`\n... et ${stats.corrections.length - 10} autres fichiers modifiés`);
    }
  }
  
  if (stats.errors.length > 0) {
    console.log('\n' + '-'.repeat(60));
    console.log('❌ ERREURS');
    console.log('-'.repeat(60));
    stats.errors.forEach(err => {
      console.log(`${path.basename(err.file)}: ${err.error}`);
    });
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('✅ Script terminé !');
  console.log('='.repeat(60));
  console.log('\n💡 Les fichiers originaux sont sauvegardés en .backup');
  console.log('💡 Pour restaurer : rm *.md && mv *.backup [nom-original].md\n');
}

/**
 * Main
 */
function main() {
  console.log('🚀 Démarrage correction Pattern #3 - Nice\n');
  
  // Récupérer les fichiers satellites
  const satelliteFiles = getSatelliteFiles();
  console.log(`📁 ${satelliteFiles.length} fichiers satellites trouvés\n`);
  
  // Traiter chaque fichier
  satelliteFiles.forEach(processFile);
  
  // Générer le rapport
  generateReport();
  
  // Code de sortie
  process.exit(stats.errors.length > 0 ? 1 : 0);
}

// Exécution
main();



