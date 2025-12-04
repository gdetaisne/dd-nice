import { getMoverzBlogRedirectsForHost } from './scripts/blog-moverz-redirects.mjs';

const HOST = 'devis-demenageur-nice.fr';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  output: 'standalone',

  // SEO: Force trailing slash sur toutes les URLs (y compris homepage)
  trailingSlash: true,
  
  // Optimisations pour build CapRover
  typescript: {
    ignoreBuildErrors: true, // Skip type-check en production (fait en dev)
  },
  eslint: {
    ignoreDuringBuilds: true, // Skip ESLint en production (fait en dev)
  },  
  // Headers de sécurité gérés par middleware.js

  // Configuration de sécurité supplémentaire
  experimental: {
    serverComponentsExternalPackages: []
  },

  // Optimisations de sécurité
  compress: true,
  
  // Configuration des images (si utilisées)
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      }
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Redirections 404 - Nettoyage indexation Nice
  async redirects() {
    const existing = [
      // VAGUE 2 – Migration homepage domaine → page ville moverz.fr
      { source: '/', destination: 'https://moverz.fr/demenagement/nice/', permanent: true },

      // Redirections historiques
      // SATELLITES : Articles sans -nice → avec -nice (~50)
      { source: '/blog/satellites/cartons-gratuits-ou-trouver', destination: '/blog/satellites/cartons-gratuits-ou-trouver-nice/', permanent: true },
      { source: '/blog/satellites/demenagement-piano-droit', destination: '/blog/satellites/demenagement-piano-droit-nice/', permanent: true },
      { source: '/blog/satellites/demenagement-etudiant-pas-cher', destination: '/blog/satellites/demenagement-etudiant-pas-cher-nice/', permanent: true },
      { source: '/blog/satellites/petit-demenagement-solutions', destination: '/blog/satellites/petit-demenagement-solutions-nice/', permanent: true },
      { source: '/blog/satellites/resilier-contrats-demenagement', destination: '/blog/satellites/resilier-contrats-demenagement-nice/', permanent: true },
      { source: '/blog/satellites/prix-demenagement-t2', destination: '/blog/satellites/prix-demenagement-t2-nice/', permanent: true },
      { source: '/blog/satellites/demenagement-personnes-mobilite-reduite', destination: '/blog/satellites/demenagement-personnes-mobilite-reduite-nice/', permanent: true },
      { source: '/blog/satellites/demenagement-ecologique', destination: '/blog/satellites/demenagement-ecologique-nice/', permanent: true },
      { source: '/blog/satellites/demenagement-chambre-etudiant', destination: '/blog/satellites/demenagement-chambre-etudiant-nice/', permanent: true },
      { source: '/blog/satellites/facteurs-prix-demenagement', destination: '/blog/satellites/facteurs-prix-demenagement-nice/', permanent: true },
      { source: '/blog/satellites/acces-24-7-garde-meuble', destination: '/blog/satellites/acces-24-7-garde-meuble-nice/', permanent: true },
      { source: '/blog/satellites/demenagement-colocation', destination: '/blog/satellites/demenagement-colocation-nice/', permanent: true },
      { source: '/blog/satellites/prix-garde-meuble-2025', destination: '/blog/satellites/prix-garde-meuble-2025-nice/', permanent: true },
      { source: '/blog/satellites/demenagement-archives-entreprise', destination: '/blog/satellites/demenagement-archives-entreprise-nice/', permanent: true },
      { source: '/blog/satellites/assurance-demenageur', destination: '/blog/satellites/assurance-demenageur-nice/', permanent: true },
      { source: '/blog/satellites/choisir-demenageur-criteres', destination: '/blog/satellites/choisir-demenageur-criteres-nice/', permanent: true },
      { source: '/blog/satellites/demenagement-international-italie', destination: '/blog/satellites/demenagement-international-italie-nice/', permanent: true },
      { source: '/blog/satellites/demenagement-international-suisse', destination: '/blog/satellites/demenagement-international-suisse-nice/', permanent: true },
      { source: '/blog/satellites/demenagement-piano-monte-meuble', destination: '/blog/satellites/demenagement-piano-monte-meuble-nice/', permanent: true },
      { source: '/blog/satellites/checklist-demenagement-complete', destination: '/blog/satellites/checklist-demenagement-complete-nice/', permanent: true },
      { source: '/blog/satellites/location-utilitaire-demenagement', destination: '/blog/satellites/location-utilitaire-demenagement-nice/', permanent: true },
      { source: '/blog/satellites/demenagement-entreprise-weekend', destination: '/blog/satellites/demenagement-entreprise-weekend-nice/', permanent: true },
      { source: '/blog/satellites/piano-electronique-vs-acoustique-demenagement', destination: '/blog/satellites/piano-electronique-vs-acoustique-demenagement-nice/', permanent: true },
      { source: '/blog/satellites/reduction-impots-demenagement', destination: '/blog/satellites/reduction-impots-demenagement-nice/', permanent: true },
      { source: '/blog/satellites/taille-camion-selon-logement', destination: '/blog/satellites/taille-camion-selon-logement-nice/', permanent: true },
      { source: '/blog/satellites/demenagement-piano-prix', destination: '/blog/satellites/demenagement-piano-prix-nice/', permanent: true },
      { source: '/blog/satellites/location-camion-weekend', destination: '/blog/satellites/location-camion-weekend-nice/', permanent: true },
      { source: '/blog/satellites/demenagement-cote-azur-cannes-antibes', destination: '/blog/satellites/demenagement-cote-azur-cannes-antibes-nice/', permanent: true },
      { source: '/blog/satellites/garde-meuble-vieux-centre', destination: '/blog/satellites/garde-meuble-vieux-centre-nice/', permanent: true },
      { source: '/blog/satellites/duree-minimum-location-box', destination: '/blog/satellites/duree-minimum-location-box-nice/', permanent: true },
      { source: '/blog/satellites/demenagement-hors-saison', destination: '/blog/satellites/demenagement-hors-saison-nice/', permanent: true },
      { source: '/blog/satellites/astuces-demenagement-pas-cher', destination: '/blog/satellites/astuces-demenagement-pas-cher-nice/', permanent: true },
      { source: '/blog/satellites/demenagement-sophia-antipolis', destination: '/blog/satellites/demenagement-sophia-antipolis-nice/', permanent: true },
      { source: '/blog/satellites/demenagement-colocation-vers-logement-seul', destination: '/blog/satellites/demenagement-colocation-vers-logement-seul-nice/', permanent: true },
      { source: '/blog/satellites/demenagement-locaux-commerciaux', destination: '/blog/satellites/demenagement-locaux-commerciaux-nice/', permanent: true },
      { source: '/blog/satellites/aide-pole-emploi-demenagement', destination: '/blog/satellites/aide-pole-emploi-demenagement-nice/', permanent: true },
      { source: '/blog/satellites/demenagement-une-piece', destination: '/blog/satellites/demenagement-une-piece-nice/', permanent: true },
      { source: '/blog/satellites/demenagement-commerce-boutique', destination: '/blog/satellites/demenagement-commerce-boutique-nice/', permanent: true },
      { source: '/blog/satellites/demenagement-weekend-jours-feries', destination: '/blog/satellites/demenagement-weekend-jours-feries-nice/', permanent: true },
      { source: '/blog/satellites/periode-pas-chere-demenagement', destination: '/blog/satellites/periode-pas-chere-demenagement-nice/', permanent: true },
      { source: '/blog/satellites/demenagement-international-monaco', destination: '/blog/satellites/demenagement-international-monaco-nice/', permanent: true },
      { source: '/blog/satellites/comparateur-devis-demenagement', destination: '/blog/satellites/comparateur-devis-demenagement-nice/', permanent: true },
      { source: '/blog/satellites/demenagement-bureaux-entreprise', destination: '/blog/satellites/demenagement-bureaux-entreprise-nice/', permanent: true },
      { source: '/blog/satellites/demenagement-personnes-agees', destination: '/blog/satellites/demenagement-personnes-agees-nice/', permanent: true },
      { source: '/blog/satellites/demenagement-retraites-seniors', destination: '/blog/satellites/demenagement-retraites-seniors-nice/', permanent: true },
      { source: '/blog/satellites/prix-demenagement-t3', destination: '/blog/satellites/prix-demenagement-t3-nice/', permanent: true },
      { source: '/blog/satellites/delai-demenagement-international', destination: '/blog/satellites/delai-demenagement-international-nice/', permanent: true },
      { source: '/blog/satellites/demenagement-weekend-vs-semaine', destination: '/blog/satellites/demenagement-weekend-vs-semaine-nice/', permanent: true },
      { source: '/blog/satellites/demenagement-sans-interruption-activite', destination: '/blog/satellites/demenagement-sans-interruption-activite-nice/', permanent: true },
      { source: '/blog/satellites/demenagement-en-couple', destination: '/blog/satellites/demenagement-en-couple-nice/', permanent: true },
      { source: '/blog/satellites/demenageur-vieux-acces-difficile', destination: '/blog/satellites/demenageur-vieux-acces-difficile-nice/', permanent: true },
      { source: '/blog/satellites/garde-meuble-pendant-demenagement', destination: '/blog/satellites/garde-meuble-pendant-demenagement-nice/', permanent: true },
      { source: '/blog/satellites/demenagement-investisseur-locatif', destination: '/blog/satellites/demenagement-investisseur-locatif-nice/', permanent: true },
      { source: '/blog/satellites/demenagement-studio-prix', destination: '/blog/satellites/demenagement-studio-prix-nice/', permanent: true },
      { source: '/blog/satellites/prix-demenageur-2025', destination: '/blog/satellites/prix-demenageur-2025-nice/', permanent: true },
      { source: '/blog/satellites/demenagement-groupe', destination: '/blog/satellites/demenagement-groupe-nice/', permanent: true },
      { source: '/blog/satellites/demenagement-oeuvres-art-collection', destination: '/blog/satellites/demenagement-oeuvres-art-collection-nice/', permanent: true },
      { source: '/blog/satellites/demenageur-monte-meuble', destination: '/blog/satellites/demenageur-monte-meuble-nice/', permanent: true },
      { source: '/blog/satellites/demenagement-depuis-autre-region-vers', destination: '/blog/satellites/demenagement-depuis-autre-region-vers-nice/', permanent: true },
      { source: '/blog/satellites/garde-meuble-securise', destination: '/blog/satellites/garde-meuble-securise-nice/', permanent: true },
      { source: '/blog/satellites/garde-meuble-longue-duree', destination: '/blog/satellites/garde-meuble-longue-duree-nice/', permanent: true },
      { source: '/blog/satellites/demenagement-start-up', destination: '/blog/satellites/demenagement-start-up-nice/', permanent: true },
      { source: '/blog/satellites/demenagement-aquarium-poissons', destination: '/blog/satellites/demenagement-aquarium-poissons-nice/', permanent: true },
      { source: '/blog/satellites/caution-location-camion', destination: '/blog/satellites/caution-location-camion-nice/', permanent: true },
      { source: '/blog/satellites/demenagement-petit-budget', destination: '/blog/satellites/demenagement-petit-budget-nice/', permanent: true },
      
      // FICHIERS BATCH/LISTE/PILIER supprimés → /blog (06/11/2025)
      // Redirections pour /blog/conseils/ ET /blog/satellites/ (au cas où)
      { source: '/blog/conseils/LISTE-COMPLETE-50-SATELLITES-GENERES', destination: '/blog', permanent: true },
      { source: '/blog/satellites/LISTE-COMPLETE-50-SATELLITES-GENERES', destination: '/blog', permanent: true },
      { source: '/blog/satellites/preparer-affaires-garde-meuble', destination: '/blog/satellites/preparer-affaires-garde-meuble-nice/', permanent: true },
      { source: '/blog/satellites/demenagement-urgence-rapide', destination: '/blog/satellites/demenagement-urgence-rapide-nice/', permanent: true },
      { source: '/blog/satellites/demenagement-cabinet-medical', destination: '/blog/satellites/demenagement-cabinet-medical-nice/', permanent: true },
      { source: '/blog/satellites/self-stockage-vs-garde-meuble-traditionnel', destination: '/blog/satellites/self-stockage-vs-garde-meuble-traditionnel-nice/', permanent: true },
      { source: '/blog/satellites/demenagement-express-rapide', destination: '/blog/satellites/demenagement-express-rapide-nice/', permanent: true },
      { source: '/blog/satellites/comparatif-demenageurs', destination: '/blog/satellites/comparatif-demenageurs-nice/', permanent: true },
      { source: '/blog/satellites/aide-financiere-demenagement', destination: '/blog/satellites/aide-financiere-demenagement-nice/', permanent: true },
      { source: '/blog/satellites/devis-demenagement-gratuit', destination: '/blog/satellites/devis-demenagement-gratuit-nice/', permanent: true },
      { source: '/blog/satellites/demenagement-longue-distance-depuis', destination: '/blog/satellites/demenagement-longue-distance-depuis-nice/', permanent: true },
      { source: '/blog/satellites/aide-manutention-demenagement', destination: '/blog/satellites/aide-manutention-demenagement-nice/', permanent: true },
      { source: '/blog/satellites/demenagement-maison-prix', destination: '/blog/satellites/demenagement-maison-prix-nice/', permanent: true },
      { source: '/blog/satellites/camion-demenagement-permis-be', destination: '/blog/satellites/camion-demenagement-permis-be-nice/', permanent: true },
      { source: '/blog/satellites/autorisation-stationnement-demenagement', destination: '/blog/satellites/autorisation-stationnement-demenagement-nice/', permanent: true },
      { source: '/blog/satellites/menage-fin-bail-demenagement', destination: '/blog/satellites/menage-fin-bail-demenagement-nice/', permanent: true },
      { source: '/blog/satellites/calculer-prix-demenagement', destination: '/blog/satellites/calculer-prix-demenagement-nice/', permanent: true },
      { source: '/blog/satellites/demenagement-cave-vin', destination: '/blog/satellites/demenagement-cave-vin-nice/', permanent: true },
      { source: '/blog/satellites/demenagement-apres-divorce-separation', destination: '/blog/satellites/demenagement-apres-divorce-separation-nice/', permanent: true },
      { source: '/blog/satellites/permis-conduire-camion-demenagement', destination: '/blog/satellites/permis-conduire-camion-demenagement-nice/', permanent: true },
      { source: '/blog/satellites/demenagement-plantes-jardin', destination: '/blog/satellites/demenagement-plantes-jardin-nice/', permanent: true },
      { source: '/blog/satellites/demenagement-transfrontalier-italie', destination: '/blog/satellites/demenagement-transfrontalier-italie-nice/', permanent: true },
      { source: '/blog/satellites/demenageur-dimanche-soir', destination: '/blog/satellites/demenageur-dimanche-soir-nice/', permanent: true },
      { source: '/blog/satellites/demenagement-formalites-douane', destination: '/blog/satellites/demenagement-formalites-douane-nice/', permanent: true },
      { source: '/blog/satellites/demenagement-piano-queue', destination: '/blog/satellites/demenagement-piano-queue-nice/', permanent: true },
      { source: '/blog/satellites/demenagement-formule-economique', destination: '/blog/satellites/demenagement-formule-economique-nice/', permanent: true },
      { source: '/blog/satellites/km-inclus-location-camion', destination: '/blog/satellites/km-inclus-location-camion-nice/', permanent: true },
      { source: '/blog/satellites/vendre-meubles-avant-demenagement', destination: '/blog/satellites/vendre-meubles-avant-demenagement-nice/', permanent: true },
      { source: '/blog/satellites/demenagement-objets-fragiles', destination: '/blog/satellites/demenagement-objets-fragiles-nice/', permanent: true },
      { source: '/blog/satellites/demenagement-local-commercial', destination: '/blog/satellites/demenagement-local-commercial-nice/', permanent: true },
      { source: '/blog/satellites/garde-meuble-etudiant-pas-cher', destination: '/blog/satellites/garde-meuble-etudiant-pas-cher-nice/', permanent: true },
      { source: '/blog/satellites/demenagement-covid-sanitaire', destination: '/blog/satellites/demenagement-covid-sanitaire-nice/', permanent: true },
      { source: '/blog/satellites/demenager-seul-guide', destination: '/blog/satellites/demenager-seul-guide-nice/', permanent: true },
      { source: '/blog/satellites/quelle-taille-box-stockage', destination: '/blog/satellites/quelle-taille-box-stockage-nice/', permanent: true },
      { source: '/blog/satellites/avis-demenageurs-guide', destination: '/blog/satellites/avis-demenageurs-guide-nice/', permanent: true },
      { source: '/blog/satellites/cout-reel-demenagement', destination: '/blog/satellites/cout-reel-demenagement-nice/', permanent: true },
      { source: '/blog/satellites/conduire-camion-vieux-conseils', destination: '/blog/satellites/conduire-camion-vieux-conseils-nice/', permanent: true },
      { source: '/blog/satellites/demenagement-instrument-musique-fragile', destination: '/blog/satellites/demenagement-instrument-musique-fragile-nice/', permanent: true },
      { source: '/blog/satellites/assurance-location-utilitaire', destination: '/blog/satellites/assurance-location-utilitaire-nice/', permanent: true },
      { source: '/blog/satellites/demenagement-avec-enfants', destination: '/blog/satellites/demenagement-avec-enfants-nice/', permanent: true },
      { source: '/blog/satellites/demenagement-handicap-pmr', destination: '/blog/satellites/demenagement-handicap-pmr-nice/', permanent: true },
      { source: '/blog/satellites/demenagement-avec-animaux', destination: '/blog/satellites/demenagement-avec-animaux-nice/', permanent: true },
      { source: '/blog/satellites/formule-economique-vs-cle-en-main', destination: '/blog/satellites/formule-economique-vs-cle-en-main-nice/', permanent: true },
      { source: '/blog/satellites/assurer-piano-transport', destination: '/blog/satellites/assurer-piano-transport-nice/', permanent: true },

      // PILIERS : Mauvais dossiers → corrects
      { source: '/blog/pas-cher/demenagement-pas-cher-nice-guide', destination: '/blog/demenagement-pas-cher-nice/demenagement-pas-cher-nice-guide/', permanent: true },
      { source: '/blog/piano/demenagement-piano-nice-guide', destination: '/blog/demenagement-piano-nice/demenagement-piano-nice-guide/', permanent: true },
      { source: '/blog/demenageur/demenageur-nice-guide-complet', destination: '/blog/demenageur-nice/demenageur-nice-guide-complet/', permanent: true },
      { source: '/blog/prix/prix-demenagement-nice-guide', destination: '/blog/prix-demenagement-nice/prix-demenagement-nice-guide/', permanent: true },
      { source: '/blog/petit-demenagement/petit-demenagement-nice-guide', destination: '/blog/petit-demenagement-nice/petit-demenagement-nice-guide/', permanent: true },
      { source: '/blog/garde-meuble/garde-meuble-nice-guide-complet', destination: '/blog/garde-meuble-nice/garde-meuble-nice-guide-complet/', permanent: true },
      { source: '/blog/aide-demenagement/aide-demenagement-nice-guide', destination: '/blog/aide-demenagement-nice/aide-demenagement-nice-guide/', permanent: true },
      { source: '/blog/demenagement-etudiant-nice/demenagement-etudiant-nice-guide', destination: '/blog/demenagement-etudiant-nice/demenagement-etudiant-nice-guide-complet/', permanent: true },
      { source: '/blog/location-camion/location-camion-demenagement-nice-guide', destination: '/blog/location-camion-demenagement-nice/location-camion-demenagement-nice-guide/', permanent: true },
      { source: '/blog/entreprise/demenagement-entreprise-nice-guide', destination: '/blog/demenagement-entreprise-nice/demenagement-entreprise-nice-guide/', permanent: true },
      { source: '/blog/demenagement-international/demenagement-international-guide', destination: '/blog/demenagement-international-nice/demenagement-international-nice-guide/', permanent: true },
      { source: '/blog/petit-demenagement/petit-demenagement-guide', destination: '/blog/petit-demenagement-nice/petit-demenagement-nice-guide/', permanent: true },
      { source: '/blog/demenagement-pas-cher/demenagement-pas-cher-guide', destination: '/blog/demenagement-pas-cher-nice/demenagement-pas-cher-nice-guide/', permanent: true },
      { source: '/blog/demenagement-entreprise/demenagement-entreprise-guide', destination: '/blog/demenagement-entreprise-nice/demenagement-entreprise-nice-guide/', permanent: true },
      { source: '/blog/demenagement-piano/demenagement-piano-guide', destination: '/blog/demenagement-piano-nice/demenagement-piano-nice-guide/', permanent: true },
      { source: '/blog/demenageur/demenageur-guide-complet', destination: '/blog/demenageur-nice/demenageur-nice-guide-complet/', permanent: true },
      { source: '/blog/garde-meuble/garde-meuble-guide-complet', destination: '/blog/garde-meuble-nice/garde-meuble-nice-guide-complet/', permanent: true },
      { source: '/blog/prix-demenagement/prix-demenagement-guide', destination: '/blog/prix-demenagement-nice/prix-demenagement-nice-guide/', permanent: true },
      { source: '/blog/location-camion-demenagement/location-camion-demenagement-guide', destination: '/blog/location-camion-demenagement-nice/location-camion-demenagement-nice-guide/', permanent: true },

      // CATÉGORIES COURTES → Guides complets (Fix 404s satellites)
      { source: '/blog/garde-meuble', destination: '/blog/demenagement-nice/garde-meuble-nice-guide/', permanent: true },
      { source: '/blog/international', destination: '/blog/demenagement-nice/demenagement-international-nice-guide/', permanent: true },
      { source: '/blog/pas-cher', destination: '/blog/demenagement-nice/demenagement-pas-cher-nice-guide/', permanent: true },
      { source: '/blog/piano', destination: '/blog/demenagement-nice/demenagement-piano-nice-guide/', permanent: true },
      { source: '/blog/prix', destination: '/blog/demenagement-nice/prix-demenagement-nice-guide/', permanent: true },
      
      // LEADGEN-02: Redirections 404 prioritaires (Nice - 06/11/2025)
      { source: '/blog/entreprise/demenagement-archives-entreprise-nice', destination: '/blog/demenagement-entreprise-nice/', permanent: true },

      // MAUVAIS DOSSIER /demenagement/ → correct
      { source: '/demenagement/demenagement-une-piece-nice', destination: '/blog/satellites/demenagement-une-piece-nice/', permanent: true },
      { source: '/demenagement/cout-reel-demenagement-nice', destination: '/blog/satellites/cout-reel-demenagement-nice/', permanent: true },
      { source: '/demenagement/demenagement-retraites-seniors-nice', destination: '/blog/satellites/demenagement-retraites-seniors-nice/', permanent: true },
      { source: '/demenagement/demenagement-avec-animaux-nice', destination: '/blog/satellites/demenagement-avec-animaux-nice/', permanent: true },
      { source: '/blog/location-camion-demenagement-nice/cartons-gratuits-nice-ou-trouver', destination: '/blog/satellites/cartons-gratuits-ou-trouver-nice/', permanent: true },

      // URLS TOULOUSE sur site NICE (erreur massive)
      { source: '/toulouse', destination: '/', permanent: true },
      { source: '/Toulouse/saint-cyprien', destination: '/quartiers-nice/', permanent: true },
      { source: '/Toulouse/carmes', destination: '/quartiers-nice/', permanent: true },
      { source: '/Toulouse/capitole', destination: '/quartiers-nice/', permanent: true },
      { source: '/Toulouse/jean-jaures', destination: '/quartiers-nice/', permanent: true },
      { source: '/Toulouse/compans', destination: '/quartiers-nice/', permanent: true },
      { source: '/quartiers-Toulouse', destination: '/quartiers-nice/', permanent: true },
      { source: '/devis-demenagement-toulouse/', destination: '/estimation-rapide/', permanent: true },
      { source: '/prix-demenagement-toulouse/', destination: '/blog/prix-demenagement-nice/prix-demenagement-nice-guide/', permanent: true },
      { source: '/devis-demenagement-toulouse-cauderan/', destination: '/quartiers-nice/', permanent: true },
      { source: '/devis-demenagement-toulouse-saint-pierre/', destination: '/quartiers-nice/', permanent: true },
      { source: '/devis-demenagement-toulouse-chartrons/', destination: '/quartiers-nice/', permanent: true },
      { source: '/Toulouse-vers-Toulouse', destination: '/', permanent: true },
      { source: '/Toulouse-vers-paris', destination: '/nice-vers-paris/', permanent: true },
      { source: '/Toulouse-vers-lyon', destination: '/nice-vers-lyon/', permanent: true },
      { source: '/estimation-demenagement-toulouse/', destination: '/estimation-rapide/', permanent: true },

      // QUARTIERS BORDEAUX sur site Nice
      { source: '/nice/pessac', destination: '/quartiers-nice/', permanent: true },
      { source: '/nice/bastide', destination: '/quartiers-nice/', permanent: true },
      { source: '/nice/merignac', destination: '/quartiers-nice/', permanent: true },
      { source: '/nice/cauderan', destination: '/quartiers-nice/', permanent: true },
      { source: '/nice/chartrons', destination: '/quartiers-nice/', permanent: true },
      { source: '/devis-demenagement-nice-cauderan/', destination: '/quartiers-nice/', permanent: true },
      { source: '/devis-demenagement-nice-saint-pierre/', destination: '/quartiers-nice/', permanent: true },
      { source: '/devis-demenagement-nice-chartrons/', destination: '/quartiers-nice/', permanent: true },

      // ANCIENNES URLs
      { source: '/estimation-demenagement-nice/', destination: '/estimation-rapide/', permanent: true },
      { source: '/prix-demenagement-nice/', destination: '/blog/prix-demenagement-nice/prix-demenagement-nice-guide/', permanent: true },
      { source: '/devis-demenagement-nice/', destination: '/estimation-rapide/', permanent: true },

      // REDIRECTIONS inventaire-ia → devis-gratuits (20/01/2026)
      { source: '/inventaire-ia', destination: '/devis-gratuits/', permanent: true },
      { source: '/inventaire-ia/', destination: '/devis-gratuits/', permanent: true },
      { source: '/inventaire-ia/:path*', destination: '/devis-gratuits/:path*', permanent: true },

      // CATÉGORIES BLOG VIDES → /blog (Fix CSV 30/10/2025)
      { source: '/blog/etudiant', destination: '/blog/', permanent: true },
      { source: '/blog/urgent', destination: '/blog/', permanent: true },
      { source: '/blog/devis', destination: '/blog/', permanent: true },
      { source: '/blog/longue-distance', destination: '/blog/', permanent: true },

      // TOP PRIORITÉ (URL 404 → fallback /blog)
      { source: '/blog/garde-meuble/acces-24-7-garde-meuble-nice', destination: '/blog/', permanent: true },
      // LEADGEN-02: Redirections 404 prioritaires (Nice - 06/11/2025)
      { source: '/blog/entreprise/demenagement-archives-entreprise-nice', destination: '/blog/entreprise-nice/demenagement-archives-entreprise-nice/', permanent: true },
      { source: '/blog/satellites/LISTE-COMPLETE-50-SATELLITES-GENERES', destination: '/blog/', permanent: true },

      // WILDCARDS CATCH-ALL (TASK-LEADGEN-02 - COMPLETS)
      { source: '/blog/garde-meuble/:slug*', destination: '/blog/garde-meuble-nice/:slug*', permanent: true },
      { source: '/blog/pas-cher/:slug*', destination: '/blog/demenagement-pas-cher-nice/:slug*', permanent: true },
      { source: '/blog/international/:slug*', destination: '/blog/demenagement-international-nice/:slug*', permanent: true },
      { source: '/blog/piano/:slug*', destination: '/blog/demenagement-piano-nice/:slug*', permanent: true },
      { source: '/blog/demenageur/:slug*', destination: '/blog/demenageur-nice/:slug*', permanent: true },
      { source: '/blog/aide/:slug*', destination: '/blog/aide-demenagement-nice/:slug*', permanent: true },
      { source: '/blog/demenagement/:slug*', destination: '/blog/demenagement-nice/:slug*', permanent: true },
      { source: '/blog/prix/:slug*', destination: '/blog/prix-demenagement-nice/:slug*', permanent: true },
      // Supprimé : redirection vers soi-même (source = destination) causait erreur GSC (TASK-060)
    ];

    const blogToMoverz = getMoverzBlogRedirectsForHost(HOST);

    return [...existing, ...blogToMoverz];
  }
};

export default nextConfig;