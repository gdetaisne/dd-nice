export type Item = { slug: string; title: string };

export const QUARTIERS: Item[] = [
  { slug: "vieux-nice",      title: "Vieux Nice" },
  { slug: "promenade-anglais",      title: "Promenade des Anglais" },
  { slug: "cimiez",      title: "Cimiez" },
  { slug: "liberation",      title: "Libération" },
  { slug: "port",      title: "Port" },
];

export const COMMUNES: Item[] = [];
// Communes satellites à créer ultérieurement
// Communes satellites à créer ultérieurement

export function urlForQuartier(slug: string) {
  return `/nice/${slug}/`;
}
export function urlForCommune(slug: string) {
  return `/devis-demenagement-${slug}/`;
}
