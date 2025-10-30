import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Conditions Générales de Vente | Moverz ",
  description: "CGV B2B: objet, processus, acompte mandataire, responsabilités, pénalités de retard.",
  alternates: { canonical: "https://devis-demenageur-nice.fr/cgv" },
};

export default function Page() {
  return (
    <main className="bg-hero min-h-screen">
      <div className="halo" />
      <section className="section">
        <div className="container text-white prose prose-invert max-w-3xl">
          <h1>Conditions Générales de Vente</h1>
          <p>Contenu à jour. Pour toute question, utilisez la page Contact.</p>
        </div>
      </section>
    </main>
  );
}
