import Breadcrumbs from "@/components/Breadcrumbs";
import CtaPrimary from "@/components/CtaPrimary";
import { getCanonicalUrl } from "@/lib/canonical-helper";
import { getCityDataFromUrl } from "@/lib/cityData";
import { env } from "@/lib/env";
import type { Metadata } from "next";

export const metadata: Metadata = (() => {
  const city = getCityDataFromUrl(env.SITE_URL);
  return {
    title: `Déménagement Standard ${city.nameCapitalized} - Tarifs & Devis | Moverz`,
    description: `Formule standard pour déménager à ${city.nameCapitalized}. Rapport qualité/prix optimal. Estimation IA gratuite, devis sous 7j. À partir de 750€.`,
    alternates: {
      canonical: getCanonicalUrl(`services/demenagement-standard-${city.slug}`),
    },
    openGraph: {
      title: `Déménagement Standard ${city.nameCapitalized}`,
      description: `Formule standard pour déménager à ${city.nameCapitalized}`,
      url: getCanonicalUrl(`services/demenagement-standard-${city.slug}`),
      type: 'website',
    },
  };
})();

export default function DemenagementStandardPage() {
  const city = getCityDataFromUrl(env.SITE_URL);
  
  return (
    <main className="bg-hero">
      <div className="halo" />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#04163a] via-[#2b7a78] to-[#6bcfcf] text-white">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        
        <div className="relative mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24 lg:py-32">
          <div className="text-center">
            <Breadcrumbs 
              items={[
                { label: "Accueil", href: "/" },
                { label: "Services", href: "/services/" },
                { label: "Déménagement Standard", href: `/services/demenagement-standard-${city.slug}/` }
              ]}
            />
            <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Déménagement Standard à {city.nameCapitalized}
            </h1>
            <p className="mt-4 text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              La formule la plus choisie. Bon équilibre prix/prestations avec protection des meubles et emballage standard.
            </p>
            <div className="mt-8">
              <a
                href="/estimation-rapide/"
                className="inline-flex rounded-xl bg-white px-6 py-3 text-lg font-semibold text-[#04163a] hover:bg-white/90 transition duration-300 shadow-lg"
              >
                Créer mon dossier
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Présentation de la formule */}
      <section className="section">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">
              La formule la plus choisie par nos clients
            </h2>
            <p className="text-lg text-white/80 leading-relaxed">
              Notre formule standard offre le meilleur équilibre entre prix et prestations. 
              Elle inclut en plus de l'économique la protection des meubles et l'emballage standard. 
              C'est la solution idéale pour un déménagement complet sans se ruiner, 
              avec tous les services essentiels pour déménager en toute sérénité.
            </p>
          </div>
        </div>
      </section>

      {/* Inclus / Non inclus */}
      <section className="section bg-white/5">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#6bcfcf] flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#04163a]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                Inclus
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#6bcfcf]"></div>
                  <span className="text-white/90">Emballage de base des biens</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#6bcfcf]"></div>
                  <span className="text-white/90">Démontage et remontage des meubles</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#6bcfcf]"></div>
                  <span className="text-white/90">Transport des biens</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#6bcfcf]"></div>
                  <span className="text-white/90">Protection meubles (housses, couvertures)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#6bcfcf]"></div>
                  <span className="text-white/90">Équipe de 3 déménageurs</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#6bcfcf]"></div>
                  <span className="text-white/90">Assurance renforcée</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                Non inclus
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <span className="text-white/90">Emballage objets très fragiles</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <span className="text-white/90">Nettoyage complet</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <span className="text-white/90">Installation électroménager</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <span className="text-white/90">Conciergerie</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tarifs */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
              Prix indicatifs
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              Tarifs adaptés selon la distance de déménagement
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Déménagement local */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-white mb-6 text-center">Déménagement local ({city.nameCapitalized})</h3>
              <div className="space-y-6">
                <div className="text-center">
                  <h4 className="text-lg font-medium text-white mb-2">T2/T3</h4>
                  <div className="text-3xl font-bold text-[#6bcfcf] mb-1">600-1000€</div>
                  <p className="text-white/60 text-sm">Jusqu'à 70m²</p>
                </div>
                <div className="text-center">
                  <h4 className="text-lg font-medium text-white mb-2">Maison</h4>
                  <div className="text-3xl font-bold text-[#6bcfcf] mb-1">900-1400€</div>
                  <p className="text-white/60 text-sm">Jusqu'à 120m²</p>
                </div>
              </div>
            </div>
            
            {/* Déménagement national */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-white mb-6 text-center">Déménagement national (ex: Orléans)</h3>
              <div className="space-y-6">
                <div className="text-center">
                  <h4 className="text-lg font-medium text-white mb-2">T2/T3</h4>
                  <div className="text-3xl font-bold text-[#6bcfcf] mb-1">2520-3360€</div>
                  <p className="text-white/60 text-sm">Jusqu'à 70m² (18-24m³)</p>
                </div>
                <div className="text-center">
                  <h4 className="text-lg font-medium text-white mb-2">Maison</h4>
                  <div className="text-3xl font-bold text-[#6bcfcf] mb-1">4200-5040€</div>
                  <p className="text-white/60 text-sm">Jusqu'à 120m² (30-36m³)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-white/60 text-sm">
              * Tarifs indicatifs. Devis personnalisé selon vos besoins spécifiques et la distance exacte.
            </p>
          </div>
        </div>
      </section>

      {/* Témoignage */}
      <section className="section bg-white/5">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <div className="text-6xl mb-4">👨‍👩‍👧‍👦</div>
              <blockquote className="text-lg text-white/90 italic mb-4">
                "Avec deux enfants et un emploi du temps chargé, la formule standard était parfaite. 
                L'équipe a tout géré : emballage, protection des meubles, transport. 
                Nous avons pu nous concentrer sur l'essentiel pendant que nos affaires étaient en sécurité."
              </blockquote>
              <div className="text-white/70">
                <div className="font-semibold">Thomas et Sarah, 35 ans</div>
                <div className="text-sm">Famille - Déménagement T3 → Maison</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
              Questions fréquentes
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              Les réponses à vos questions sur la formule standard
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-3">
                Est-ce que l'emballage est fourni ?
              </h3>
              <p className="text-white/80">
                Oui, les cartons standard sont inclus dans la formule. 
                Nous fournissons tous les cartons nécessaires pour emballer vos affaires. 
                Pour les objets très fragiles, nous recommandons la formule premium.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-3">
                Puis-je ajouter un service "fragile" ?
              </h3>
              <p className="text-white/80">
                Oui, vous pouvez ajouter des services à la carte comme l'emballage d'objets très fragiles. 
                Ces options sont facturées en supplément. 
                Pour un service complet, nous recommandons la formule premium.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-3">
                Quelle est la différence avec la formule économique ?
              </h3>
              <p className="text-white/80">
                La formule standard inclut en plus : protection des meubles avec housses, 
                emballage standard avec cartons fournis, et une assurance renforcée. 
                C'est le meilleur rapport qualité-prix pour un déménagement complet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CtaPrimary placement="inline" label="Prêt pour votre déménagement standard ?" />
    </main>
  );
}
