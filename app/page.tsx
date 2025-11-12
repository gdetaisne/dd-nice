import type { Metadata } from "next";
import { getCityDataFromUrl } from "@/lib/cityData";
import { env } from "@/lib/env";
import { getCanonicalAlternates } from "@/lib/canonical-helper";
import HeroDisruptive from "@/components/HeroDisruptive";
import ValueTriadDisruptive from "@/components/ValueTriadDisruptive";
import DevisOptionsLight from "@/components/DevisOptionsLight";
import HowItWorks from "@/components/HowItWorks";
import PricingPreview from "@/components/PricingPreview";
import Testimonials from "@/components/Testimonials";
import NeighborhoodsTeaser from "@/components/NeighborhoodsTeaser";
import StickyCTA from "@/components/StickyCTA";
import LocalMoneyFAQ from "@/components/LocalMoneyFAQ";

export const metadata: Metadata = (() => {
  const city = getCityDataFromUrl(env.SITE_URL);
  return {
    title: `Déménagement ${city.nameCapitalized} — Devis Vraiment Comparables`,
    description:
      `Le seul comparateur où vous comparez vraiment. IA calcule votre volume → 3-5 devis sur la même base sous 7j. Dossier anonyme, gratuit. 1200+ clients ⭐4.9/5`,
    ...getCanonicalAlternates(''),
  };
})();

export default function Home() {
  const city = getCityDataFromUrl(env.SITE_URL);
  
  return (
    <main className="bg-hero">
      <div className="halo" />
      
      {/* 1. Hero DISRUPTIF */}
      <HeroDisruptive />

      {/* 2. Choix méthode - 2 options */}
      <section className="section py-16 md:py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900 mb-4">
              2 façons d'obtenir vos devis
            </h2>
            <p className="text-gray-700 max-w-3xl mx-auto text-base md:text-lg">
              Choisissez la méthode qui vous convient le mieux
            </p>
          </div>
          <DevisOptionsLight />
        </div>
      </section>

      {/* 3. Comment ça marche */}
      <section className="section py-16 md:py-20">
        <div className="container">
          <HowItWorks />
        </div>
      </section>
      
      {/* 3. Testimonials - Preuve sociale */}
      <section className="section py-16 md:py-20 bg-gradient-to-br from-[#2b7a78]/15 to-[#04163a]/30 border-y border-white/20">
        <div className="container">
          <Testimonials />
        </div>
      </section>

      {/* 4. Pourquoi nous sommes différents - TABLEAU COMPARATIF */}
      <section className="section py-16 md:py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900 mb-4">
              Pourquoi Moverz est le seul comparateur où vous comparez vraiment ?
            </h2>
            <p className="text-gray-700 max-w-3xl mx-auto text-base md:text-lg">
              Les autres vous envoient des devis. Nous vous envoyons des devis comparables.
            </p>
          </div>

          {/* Tableau comparatif visuel */}
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6 md:gap-8 mb-16">
            {/* Les autres comparateurs */}
            <div className="bg-white rounded-2xl p-8 border-2 border-red-500/40 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">❌</span>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                  Les autres comparateurs
                </h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-red-500 text-xl mt-1 font-bold">✗</span>
                  <div>
                    <div className="text-gray-900 font-medium">Chaque déménageur estime différemment</div>
                    <div className="text-gray-600 text-sm mt-1">Volume 20m³, 25m³, 30m³ (incomparable)</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-500 text-xl mt-1 font-bold">✗</span>
                  <div>
                    <div className="text-gray-900 font-medium">Coordonnées partagées immédiatement</div>
                    <div className="text-gray-600 text-sm mt-1">"50 appels en 20 min" (avis client réel)</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-500 text-xl mt-1 font-bold">✗</span>
                  <div>
                    <div className="text-gray-900 font-medium">"Jusqu'à 6 devis" (pas de garantie)</div>
                    <div className="text-gray-600 text-sm mt-1">Certains ne répondent jamais</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-500 text-xl mt-1 font-bold">✗</span>
                  <div>
                    <div className="text-gray-900 font-medium">"Audités" (vague)</div>
                    <div className="text-gray-600 text-sm mt-1">Pas de détails sur la vérification</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Moverz */}
            <div className="bg-gradient-to-br from-[#6bcfcf]/10 to-[#2b7a78]/5 rounded-2xl p-8 border-2 border-[#2b7a78] shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">✅</span>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                  Moverz
                </h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-[#2b7a78] text-xl mt-1 font-bold">✓</span>
                  <div>
                    <div className="text-gray-900 font-medium">Volume IA identique pour tous</div>
                    <div className="text-gray-700 text-sm mt-1">28m³ envoyé à 5 déménageurs (vraiment comparable)</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#2b7a78] text-xl mt-1 font-bold">✓</span>
                  <div>
                    <div className="text-gray-900 font-medium">Dossier anonyme jusqu'à votre choix</div>
                    <div className="text-gray-700 text-sm mt-1">Vos coordonnées restent privées</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#2b7a78] text-xl mt-1 font-bold">✓</span>
                  <div>
                    <div className="text-gray-900 font-medium">3-5 devis garantis sous 7 jours</div>
                    <div className="text-gray-700 text-sm mt-1">Minimum 3 déménageurs répondent</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#2b7a78] text-xl mt-1 font-bold">✓</span>
                  <div>
                    <div className="text-gray-900 font-medium">Vérification Google + solvabilité</div>
                    <div className="text-gray-700 text-sm mt-1">Transparent, critères objectifs</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Garanties - ValueTriad DISRUPTIF */}
          <div>
            <ValueTriadDisruptive />
          </div>
        </div>
      </section>

      {/* 5. Tarifs indicatifs */}
      <section className="section py-16 md:py-20 bg-gradient-to-br from-[#2b7a78]/25 to-[#6bcfcf]/10 border-y border-[#6bcfcf]/20">
        <div className="container">
          <PricingPreview />
        </div>
      </section>

      {/* 6. Objection Handling */}
      <section className="section py-16 md:py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900 mb-4">
              Pourquoi ne pas déménager seul ?
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto text-base md:text-lg">
              Comparez les avantages avant de décider
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* DIY */}
            <div className="bg-gray-100 rounded-2xl p-8 border-2 border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <span className="text-2xl">🚗</span>
                Déménagement seul
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="text-green-600 text-xl mt-1 font-bold">✓</div>
                  <div>
                    <div className="text-gray-900 font-medium">Économie apparente</div>
                    <div className="text-gray-600 text-sm">Location camion ~150€</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-red-500 text-xl mt-1 font-bold">✗</div>
                  <div>
                    <div className="text-gray-900 font-medium">Risques élevés</div>
                    <div className="text-gray-600 text-sm">Blessures, casse, fatigue</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-red-500 text-xl mt-1 font-bold">✗</div>
                  <div>
                    <div className="text-gray-900 font-medium">Temps important</div>
                    <div className="text-gray-600 text-sm">2-3 jours minimum</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-red-500 text-xl mt-1 font-bold">✗</div>
                  <div>
                    <div className="text-gray-900 font-medium">Aucune assurance pro</div>
                    <div className="text-gray-600 text-sm">Casse à vos frais</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pro avec Moverz */}
            <div className="bg-gradient-to-br from-[#6bcfcf]/10 to-[#2b7a78]/5 rounded-2xl p-8 border-2 border-[#2b7a78]">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <span className="text-2xl">🚚</span>
                Avec Moverz (dès 280€)
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="text-[#2b7a78] text-xl mt-1 font-bold">✓</div>
                  <div>
                    <div className="text-gray-900 font-medium">Prix transparent</div>
                    <div className="text-gray-700 text-sm">5 devis comparables</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-[#2b7a78] text-xl mt-1 font-bold">✓</div>
                  <div>
                    <div className="text-gray-900 font-medium">Zéro risque</div>
                    <div className="text-gray-700 text-sm">Pros assurés + vérifiés</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-[#2b7a78] text-xl mt-1 font-bold">✓</div>
                  <div>
                    <div className="text-gray-900 font-medium">Gain de temps</div>
                    <div className="text-gray-700 text-sm">Fini en 1 journée</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-[#2b7a78] text-xl mt-1 font-bold">✓</div>
                  <div>
                    <div className="text-gray-900 font-medium">Assurance tous risques</div>
                    <div className="text-gray-700 text-sm">Casse couverte</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center">
            <a href="/inventaire-ia/" className="btn-primary">
              Comparer 5 devis maintenant
            </a>
            <p className="text-gray-600 text-sm mt-4">
              ou <a href="/estimation-rapide/" className="text-[#2b7a78] underline hover:text-[#2b7a78]/80 font-medium">estimation rapide sans photos</a> (30 secondes)
            </p>
          </div>
        </div>
      </section>

      {/* 7. FAQ locales */}
      <section className="py-12 md:py-16">
        <LocalMoneyFAQ citySlug={city.slug} cityName={city.nameCapitalized} />
      </section>

      {/* 8. Zones couvertes */}
      <section className="section py-16 md:py-20">
        <div className="container">
          <NeighborhoodsTeaser />
        </div>
      </section>

      {/* 10. Ressources SEO - Maillage interne */}
      <section className="section py-16 md:py-20 bg-gradient-to-br from-[#2b7a78]/15 to-[#6bcfcf]/10 border-y border-white/20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-4">
              Tout pour préparer votre déménagement
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto text-base md:text-lg">
              Guides pratiques, informations tarifaires et conseils d'experts
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Services */}
            <div className="card-glass rounded-2xl p-8 hover:border-[#6bcfcf]/50 transition-colors">
              <div className="text-4xl mb-4">📦</div>
              <h3 className="text-xl font-semibold text-white mb-4">Nos formules</h3>
              <p className="text-white/70 text-sm mb-6">
                Comparez nos 3 formules de déménagement adaptées à tous les budgets
              </p>
              <div className="space-y-3">
                <a href="/services/" className="block text-[#6bcfcf] hover:text-[#6bcfcf]/80 transition-colors text-sm font-medium">
                  → Comparer les formules
                </a>
                <a href={`/services/demenagement-economique-${city.slug}/`} className="block text-white/70 hover:text-white transition-colors text-sm">
                  Économique (dès 280€)
                </a>
                <a href={`/services/demenagement-standard-${city.slug}/`} className="block text-white/70 hover:text-white transition-colors text-sm">
                  Standard (dès 600€)
                </a>
              </div>
            </div>

            {/* Guides */}
            <div className="card-glass rounded-2xl p-8 hover:border-[#6bcfcf]/50 transition-colors">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-white mb-4">Guides & conseils</h3>
              <p className="text-white/70 text-sm mb-6">
                Tous nos articles pour bien préparer et organiser votre déménagement
              </p>
              <div className="space-y-3">
                <a href="/blog/" className="block text-[#6bcfcf] hover:text-[#6bcfcf]/80 transition-colors text-sm font-medium">
                  → Voir tous les guides
                </a>
                <a href="/blog/" className="block text-white/70 hover:text-white transition-colors text-sm">
                  Combien de cartons ?
                </a>
                <a href="/blog/" className="block text-white/70 hover:text-white transition-colors text-sm">
                  Prix 2025
                </a>
              </div>
            </div>

            {/* FAQ */}
            <div className="card-glass rounded-2xl p-8 hover:border-[#6bcfcf]/50 transition-colors">
              <div className="text-4xl mb-4">❓</div>
              <h3 className="text-xl font-semibold text-white mb-4">Questions fréquentes</h3>
              <p className="text-white/70 text-sm mb-6">
                Toutes les réponses aux questions que vous vous posez
              </p>
              <div className="space-y-3">
                <a href="/faq/" className="block text-[#6bcfcf] hover:text-[#6bcfcf]/80 transition-colors text-sm font-medium">
                  → Voir toutes les FAQ
                </a>
                <a href="/estimation-rapide/" className="block text-white/70 hover:text-white transition-colors text-sm">
                  Estimation rapide
                </a>
                <a href={`/quartiers-${city.slug}/`} className="block text-white/70 hover:text-white transition-colors text-sm">
                  Quartiers {city.nameCapitalized}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StickyCTA />
    </main>
  );
}


