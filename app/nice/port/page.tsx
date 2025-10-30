import { Metadata } from 'next';
import LocalPage from '@/app/_templates/LocalPage';

export const metadata: Metadata = {
  title: `Déménagement à Port (Nice) | Devis gratuit & IA`,
  description: `Déménagement à Port (Nice). Quartier du port de Nice, reconversion récente. Logements modernes et accès facilité. Accès: Avenues modernes, parkings souterrains, immeubles récents. Devis gratuit avec estimation IA.`,
  keywords: `déménagement Port Nice, déménageurs Nice, devis déménagement Nice, Avenues modernes, parkings souterrains, immeubles récents`,
};

const nicePortData = {
  zone: "port",
  zoneDisplay: "Port",
  description: `Quartier du port de Nice, reconversion récente. Logements modernes et accès facilité.`,
  coverImage: "/images/quartiers/nice/port.jpg",
  accessInfo: "Avenues modernes, parkings souterrains, immeubles récents",
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

export default function NicePortPage() {
  return <LocalPage {...nicePortData} />;
}
