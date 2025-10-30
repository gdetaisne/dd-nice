#!/usr/bin/env python3
"""
Script d'automatisation du maillage interne - Satellites Nice
Usage: python3 auto-maillage-satellites-nice.py
"""

import os
import re
from pathlib import Path

# Configuration
SATELLITES_DIR = Path("/Users/guillaumestehelin/moverz_main/sites/nice/content/blog/satellites")

# Mapping catégorie → URL pilier - Nice
PILIER_MAPPING = {
    "garde-meuble-nice": {
        "url": "/blog/garde-meuble-nice/garde-meuble-nice-guide-complet",
        "ancres": [
            "guide complet du garde-meuble à Nice",
            "stockage sécurisé sur la Côte d'Azur",
            "solutions de garde-meuble niçois",
            "box de stockage et self-stockage Nice",
            "entreposer vos biens à Nice"
        ]
    },
    "demenageur-nice": {
        "url": "/blog/demenageur-nice/demenageur-nice-guide-complet",
        "ancres": [
            "guide complet des déménageurs à Nice",
            "déménagement professionnel à Nice",
            "nos services de déménagement niçois",
            "choisir un déménageur fiable à Nice",
            "expert déménagement Nice et Alpes-Maritimes"
        ]
    },
    "aide-demenagement-nice": {
        "url": "/blog/aide-demenagement-nice/aide-demenagement-nice-guide",
        "ancres": [
            "guide aide au déménagement à Nice",
            "obtenir de l'aide pour déménager à Nice",
            "aides financières et pratiques déménagement Nice",
            "solutions d'accompagnement déménagement niçois",
            "aide CAF et associations déménagement Nice"
        ]
    },
    "demenagement-entreprise-nice": {
        "url": "/blog/demenagement-entreprise-nice/demenagement-entreprise-nice-guide",
        "ancres": [
            "guide déménagement d'entreprise à Nice",
            "déménagement professionnel et bureaux Nice",
            "transfert de locaux professionnels à Nice",
            "solutions déménagement entreprise niçoise",
            "déménagement bureaux et commerces Nice"
        ]
    },
    "demenagement-international-nice": {
        "url": "/blog/demenagement-international-nice/demenagement-international-nice-guide",
        "ancres": [
            "guide déménagement international depuis Nice",
            "déménager à l'étranger depuis Nice",
            "expatriation et déménagement international Nice",
            "tout savoir sur le déménagement international niçois",
            "déménagement Europe et international Nice"
        ]
    },
    "demenagement-pas-cher-nice": {
        "url": "/blog/demenagement-pas-cher-nice/demenagement-pas-cher-nice-guide",
        "ancres": [
            "déménagement économique à Nice",
            "solutions pas chères pour déménager à Nice",
            "réduire le coût de votre déménagement niçois",
            "astuces déménagement pas cher Nice",
            "budget serré déménagement Nice"
        ]
    },
    "demenagement-piano": {
        "url": "/blog/demenagement-piano-nice/demenagement-piano-nice-guide",
        "ancres": [
            "guide complet du déménagement de piano à Nice",
            "déménagement piano professionnel à Nice",
            "transport sécurisé de piano à Nice",
            "tous nos conseils déménagement piano Nice",
            "expertise déménagement piano région niçoise"
        ]
    },
    "demenagement-piano-nice": {
        "url": "/blog/demenagement-piano-nice/demenagement-piano-nice-guide",
        "ancres": [
            "guide complet du déménagement de piano à Nice",
            "déménagement piano professionnel à Nice",
            "transport sécurisé de piano à Nice",
            "tous nos conseils déménagement piano Nice",
            "expertise déménagement piano région niçoise"
        ]
    },
    "location-camion-nice": {
        "url": "/blog/location-camion-demenagement-nice/location-camion-demenagement-nice-guide",
        "ancres": [
            "guide location camion déménagement Nice",
            "louer un camion pour déménager à Nice",
            "location véhicule utilitaire Nice",
            "tout savoir sur la location de camion à Nice",
            "choisir son camion de déménagement niçois"
        ]
    },
    "location-camion-demenagement-nice": {
        "url": "/blog/location-camion-demenagement-nice/location-camion-demenagement-nice-guide",
        "ancres": [
            "guide location camion déménagement Nice",
            "louer un camion pour déménager à Nice",
            "location véhicule utilitaire Nice",
            "tout savoir sur la location de camion à Nice",
            "choisir son camion de déménagement niçois"
        ]
    },
    "petit-demenagement-nice": {
        "url": "/blog/petit-demenagement-nice/petit-demenagement-nice-guide",
        "ancres": [
            "guide petit déménagement Nice",
            "déménager un studio ou petit volume à Nice",
            "solutions petit déménagement économique Nice",
            "déménagement express petit volume Nice",
            "petit déménagement pas cher à Nice"
        ]
    },
    "prix-demenagement-nice": {
        "url": "/blog/prix-demenagement-nice/prix-demenagement-nice-guide",
        "ancres": [
            "guide des prix déménagement à Nice",
            "tarifs déménageur Nice détaillés",
            "comprendre les coûts de déménagement niçois",
            "budget déménagement Nice complet",
            "structure tarifaire des déménageurs niçois"
        ]
    }
}

def extract_category(content):
    """Extraire la catégorie du frontmatter"""
    match = re.search(r'^category:\s*["\']?([^"\'\n]+)["\']?', content, re.MULTILINE)
    return match.group(1) if match else None

def count_existing_links(content):
    """Compter les liens internes existants vers /blog/"""
    return len(re.findall(r'\]\(/blog/', content))

def find_best_insertion_points(content):
    """Trouver les meilleurs endroits pour insérer les liens"""
    lines = content.split('\n')
    
    # Trouver fin du frontmatter
    frontmatter_end = 0
    yaml_count = 0
    for i, line in enumerate(lines):
        if line.strip() == '---':
            yaml_count += 1
            if yaml_count == 2:
                frontmatter_end = i + 1
                break
    
    # Trouver première section (##) pour introduction
    intro_section = frontmatter_end + 1
    for i in range(frontmatter_end, min(len(lines), frontmatter_end + 30)):
        if lines[i].startswith('##'):
            intro_section = i
            break
    
    # Trouver section FAQ ou Conclusion
    conclusion_section = len(lines) - 5
    for i in range(len(lines) - 1, max(frontmatter_end, len(lines) - 100), -1):
        if lines[i].startswith('## FAQ') or lines[i].startswith('## Conclusion'):
            conclusion_section = i
            break
    
    # Trouver milieu du contenu
    mid_section = (intro_section + conclusion_section) // 2
    
    return intro_section, mid_section, conclusion_section

def add_link_intro(content, ancre, url):
    """Ajouter un lien dans l'introduction"""
    lines = content.split('\n')
    intro_section, _, _ = find_best_insertion_points(content)
    
    # Trouver le premier paragraphe après le titre H1
    for i in range(intro_section, min(len(lines), intro_section + 20)):
        line = lines[i].strip()
        # Chercher un paragraphe (pas un titre, pas vide)
        if line and not line.startswith('#') and not line.startswith('---') and len(line) > 50:
            # Ajouter un paragraphe avant
            intro_text = f"\nPour comprendre tous les aspects de ce sujet, consultez notre [{ancre}]({url}).\n"
            lines.insert(i + 1, intro_text)
            return '\n'.join(lines)
    
    # Si pas trouvé, insérer après intro_section
    intro_text = f"\nPour comprendre tous les aspects de ce sujet, consultez notre [{ancre}]({url}).\n"
    lines.insert(intro_section + 3, intro_text)
    return '\n'.join(lines)

def add_link_body(content, ancre, url):
    """Ajouter un lien dans le corps"""
    lines = content.split('\n')
    _, mid_section, conclusion_section = find_best_insertion_points(content)
    
    # Chercher un paragraphe au milieu
    for i in range(mid_section, min(conclusion_section, mid_section + 50)):
        line = lines[i].strip()
        if line and not line.startswith('#') and not line.startswith('-') and not line.startswith('**') and len(line) > 100:
            # Ajouter une phrase contextuelle à la fin du paragraphe
            context_text = f" Ces éléments s'inscrivent dans le contexte plus large de notre [{ancre}]({url})."
            lines[i] = lines[i] + context_text
            return '\n'.join(lines)
    
    # Si pas trouvé, insérer un nouveau paragraphe
    context_text = f"\nCes éléments s'inscrivent dans le contexte plus large de notre [{ancre}]({url}).\n"
    lines.insert(mid_section, context_text)
    return '\n'.join(lines)

def add_link_conclusion(content, ancre, url):
    """Ajouter un lien en conclusion"""
    lines = content.split('\n')
    _, _, conclusion_section = find_best_insertion_points(content)
    
    # Ajouter avant la FAQ ou à la fin
    conclusion_text = f"\nPour approfondir ce sujet et découvrir tous nos conseils, consultez notre [{ancre}]({url}).\n"
    
    # Insérer avant ## FAQ ou ## Conclusion
    for i in range(len(lines) - 1, max(0, len(lines) - 100), -1):
        if lines[i].startswith('## FAQ') or lines[i].startswith('## Conclusion'):
            lines.insert(i, conclusion_text)
            return '\n'.join(lines)
    
    # Sinon insérer avant les 10 dernières lignes
    lines.insert(max(0, len(lines) - 10), conclusion_text)
    return '\n'.join(lines)

def process_satellite(file_path):
    """Traiter un fichier satellite"""
    print(f"\n📄 {file_path.name}")
    
    # Lire le contenu
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extraire catégorie
    category = extract_category(content)
    if not category:
        print(f"  ⚠️  Catégorie introuvable")
        return False
    
    # Vérifier liens existants
    existing_links = count_existing_links(content)
    if existing_links >= 3:
        print(f"  ✅ Déjà maillé ({existing_links} liens)")
        return False
    
    # Trouver le pilier correspondant
    if category not in PILIER_MAPPING:
        print(f"  ⚠️  Catégorie '{category}' non mappée")
        return False
    
    pilier = PILIER_MAPPING[category]
    url = pilier["url"]
    ancres = pilier["ancres"]
    
    # Ajouter 3 liens avec ancres variées
    print(f"  🔗 Ajout 3 liens vers {url.split('/')[-1]}")
    
    try:
        # Lien 1 : Introduction
        content = add_link_intro(content, ancres[0], url)
        print(f"     ✓ Lien 1: {ancres[0][:45]}...")
        
        # Lien 2 : Corps
        content = add_link_body(content, ancres[1], url)
        print(f"     ✓ Lien 2: {ancres[1][:45]}...")
        
        # Lien 3 : Conclusion
        content = add_link_conclusion(content, ancres[2], url)
        print(f"     ✓ Lien 3: {ancres[2][:45]}...")
        
        # Sauvegarder
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"  ✅ Fichier mis à jour")
        return True
        
    except Exception as e:
        print(f"  ❌ Erreur: {str(e)}")
        return False

def main():
    print("╔════════════════════════════════════════════════╗")
    print("║   AUTO-MAILLAGE SATELLITES NICE - PHASE 2      ║")
    print("╚════════════════════════════════════════════════╝")
    print()
    
    # Lister tous les satellites
    satellites = list(SATELLITES_DIR.glob("*.md"))
    print(f"📁 {len(satellites)} satellites détectés")
    print()
    
    # Analyser distribution par catégorie
    stats = {}
    for satellite in satellites:
        with open(satellite, 'r', encoding='utf-8') as f:
            content = f.read()
        category = extract_category(content)
        if category:
            stats[category] = stats.get(category, 0) + 1
    
    print("📊 Distribution par catégorie:")
    for cat, count in sorted(stats.items(), key=lambda x: -x[1]):
        mapped = "✓" if cat in PILIER_MAPPING else "✗"
        print(f"  {mapped} {cat}: {count} articles")
    print()
    
    # Traiter chaque satellite
    success_count = 0
    skip_count = 0
    error_count = 0
    
    for satellite in sorted(satellites):
        result = process_satellite(satellite)
        if result:
            success_count += 1
        elif result is False:
            skip_count += 1
        else:
            error_count += 1
    
    # Résumé
    print()
    print("═══════════════════════════════════════════════════")
    print("📊 RÉSUMÉ FINAL")
    print("═══════════════════════════════════════════════════")
    print(f"✅ Maillés:       {success_count}")
    print(f"⏭️  Ignorés:       {skip_count}")
    print(f"❌ Erreurs:       {error_count}")
    print(f"📝 Total:         {len(satellites)}")
    print()
    print(f"🔗 Liens ajoutés: ~{success_count * 3}")
    print()
    
    # Estimation finale
    liens_existants = 119
    nouveaux_liens = success_count * 3
    total_liens = liens_existants + nouveaux_liens
    ratio = total_liens / len(satellites) if len(satellites) > 0 else 0
    
    print(f"📈 PROJECTION FINALE:")
    print(f"   Liens avant:  {liens_existants}")
    print(f"   Nouveaux:     +{nouveaux_liens}")
    print(f"   Total final:  ~{total_liens} liens")
    print(f"   Ratio:        ~{ratio:.2f} liens/article")
    print()
    print("🎯 Objectif atteint!" if ratio >= 3.0 else "⚠️  Proche objectif (3.0 liens/article)")

if __name__ == "__main__":
    main()

