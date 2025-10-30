import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Politique de confidentialité | Moverz ",
  description: "Politique RGPD: données collectées, finalités, durées (60 jours), droits.",
  alternates: { canonical: "https://devis-demenageur-nice.fr/politique-confidentialite" },
};

export default function Page() {
  return (
    <main className="bg-hero min-h-screen">
      <div className="halo" />
      <section className="section">
        <div className="container text-white prose prose-invert max-w-3xl">
          <h1>Politique de confidentialité</h1>
          <p>Contenu à jour. Pour toute question, utilisez la page Contact.</p>
        </div>
      </section>
    </main>
  );
}
