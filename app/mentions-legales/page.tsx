import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Mentions légales | Moverz ",
  description: "Mentions légales du site (éditeur, hébergeur, responsabilités, propriété intellectuelle).",
  alternates: { canonical: "https://devis-demenageur-nice.fr/mentions-legales" },
};

export default function Page() {
  return (
    <main className="bg-hero min-h-screen">
      <div className="halo" />
      <section className="section">
        <div className="container text-white prose prose-invert max-w-3xl">
          <h1>Mentions légales</h1>
          <p>Contenu à jour. Pour toute question, utilisez la page Contact.</p>
        </div>
      </section>
    </main>
  );
}
