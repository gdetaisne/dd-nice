import { Metadata } from 'next';
import LocalPage from '@/app/_templates/LocalPage';

export const metadata: Metadata = {
  title: `Déménagement à Promenade des Anglais (Nice) | Devis gratuit & IA`,
  description: `Déménagement à Promenade des Anglais (Nice). Quartier prestigieux de Nice, front de mer et hôtels. Accès délicat par la circulation. Accès: Boulevard bord de mer, circulation dense, parkings payants. Devis gratuit avec estimation IA.`,
  keywords: `déménagement Promenade des Anglais Nice, déménageurs Nice, devis déménagement Nice, Boulevard bord de mer, circulation dense, parkings payants`,
};

const nicePromenadedesAnglaisData = {
  zone: "promenade-anglais",
  zoneDisplay: "Promenade des Anglais",
  description: `Quartier prestigieux de Nice, front de mer et hôtels. Accès délicat par la circulation.`,
  coverImage: "/images/quartiers/nice/promenade-anglais.jpg",
  accessInfo: "Boulevard bord de mer, circulation dense, parkings payants",
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

export default function NicePromenadedesAnglaisPage() {
  return <LocalPage {...nicePromenadedesAnglaisData} />;
}
