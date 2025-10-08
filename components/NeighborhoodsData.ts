export type Item = { slug: string; title: string };

export const QUARTIERS: Item[] = [
  { slug: "vieux-nice",      title: "Vieux Nice" },
  { slug: "promenade-anglais",      title: "Promenade des Anglais" },
  { slug: "cimiez",      title: "Cimiez" },
  { slug: "liberation",      title: "Libération" },
  { slug: "port",      title: "Port" },
  { slug: "mantega",      title: "Mantega" },
  { slug: "fabron",      title: "Fabron" },
  { slug: "pasteur",      title: "Pasteur" },
  { slug: "garibaldi",      title: "Garibaldi" },
  { slug: "saint-roch",     title: "Saint-Roch" },
];

export const COMMUNES: Item[] = [
  { slug: "cannes",       title: "Cannes" },
  { slug: "antibes",       title: "Antibes" },
  { slug: "grasse",       title: "Grasse" },
  { slug: "menton",       title: "Menton" },
  { slug: "monaco",       title: "Monaco" },
];

export function urlForQuartier(slug: string) {
  return `/devis-demenagement-Nice-${slug}/`;
}
export function urlForCommune(slug: string) {
  return `/devis-demenagement-${slug}/`;
}
