import { Metadata } from 'next';
import LocalPage from '@/app/_templates/LocalPage';

export const metadata: Metadata = {
  title: `Déménagement à Vieux Nice (Nice) | Devis gratuit & IA`,
  description: `Déménagement à Vieux Nice (Nice). Cœur historique de Nice, patrimoine baroque et commerces. Rues étroites et accès délicat. Accès: Rues étroites, circulation limitée, parkings payants, escaliers anciens. Devis gratuit avec estimation IA.`,
  keywords: `déménagement Vieux Nice Nice, déménageurs Nice, devis déménagement Nice, Rues étroites, circulation limitée, parkings payants, escaliers anciens`,
};

const niceVieuxNiceData = {
  zone: "vieux-nice",
  zoneDisplay: "Vieux Nice",
  description: `Cœur historique de Nice, patrimoine baroque et commerces. Rues étroites et accès délicat.`,
  coverImage: "/images/quartiers/nice/vieux-nice.jpg",
  accessInfo: "Rues étroites, circulation limitée, parkings payants, escaliers anciens",
  pricing: {
    studio: { min: 800, max: 1200 },
    t2: { min: 1200, max: 1800 },
    t3: { min: 1800, max: 2500 },
    t4: { min: 2500, max: 3500 },
    t5: { min: 3500, max: 4500 }
  },
  destinations: [
    { name: "Nice intra-muros", slug: "nice" },
    { name: "Paris", slug: "paris" },
    { name: "Lyon", slug: "lyon" },
    { name: "Toulouse", slug: "toulouse" },
    { name: "France entière", slug: "france" }
  ],
  partners: [
    {
      name: "Déménageur Nice",
      rating: 4.8,
      reviews: 69,
      specialties: ["Déménagements locaux", "Gestion des contraintes d'accès"]
    },
    {
      name: "Alex Déménagement",
      rating: 4.7,
      reviews: 45,
      specialties: ["Déménagements express", "Emballage professionnel"]
    },
    {
      name: "SAM'DÉMÉNAGE",
      rating: 4.6,
      reviews: 28,
      specialties: ["Déménagements économiques", "Service personnalisé"]
    }
  ]
};

export default function NiceVieuxNicePage() {
  return <LocalPage {...niceVieuxNiceData} />;
}
