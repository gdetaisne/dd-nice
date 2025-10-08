import { Metadata } from 'next';
import LocalPage from '@/app/_templates/LocalPage';

export const metadata: Metadata = {
  title: `Déménagement à Cimiez (Nice) | Devis gratuit & IA`,
  description: `Déménagement à Cimiez (Nice). Quartier résidentiel huppé de Nice, collines et patrimoine romain. Accès en pente. Accès: Rues en pente, parkings privés, villas et immeubles. Devis gratuit avec estimation IA.`,
  keywords: `déménagement Cimiez Nice, déménageurs Nice, devis déménagement Nice, Rues en pente, parkings privés, villas et immeubles`,
};

const niceCimiezData = {
  zone: "cimiez",
  zoneDisplay: "Cimiez",
  description: `Quartier résidentiel huppé de Nice, collines et patrimoine romain. Accès en pente.`,
  coverImage: "/images/quartiers/nice/cimiez.jpg",
  accessInfo: "Rues en pente, parkings privés, villas et immeubles",
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

export default function NiceCimiezPage() {
  return <LocalPage data={niceCimiezData} />;
}
