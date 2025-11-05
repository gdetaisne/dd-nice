import type { Metadata } from "next";
import { getCityDataFromUrl } from "@/lib/cityData";
import { env } from "@/lib/env";
import Hero from "@/components/Hero";
import ValueTriad from "@/components/ValueTriad";
import HowItWorks from "@/components/HowItWorks";
import ProofStrip from "@/components/ProofStrip";
import PhotoGuidelines from "@/components/PhotoGuidelines";
import PricingPreview from "@/components/PricingPreview";
import Testimonials from "@/components/Testimonials";
import NeighborhoodsTeaser from "@/components/NeighborhoodsTeaser";
import StickyCTA from "@/components/StickyCTA";
import LocalMoneyFAQ from "@/components/LocalMoneyFAQ";

export const metadata: Metadata = (() => {
  const city = getCityDataFromUrl(env.SITE_URL);
  return {
    description:
      `Volume IA identique pour 3-5 devis comparables. Dossier anonyme, zéro harcèlement. Déménageurs vérifiés ${city.nameCapitalized}. Vraie comparaison.`,
  };
})();

export default function Home() {
  return (
    <main className="bg-hero">
      <div className="halo" />
      <Hero />
      <section className="section">
        <div className="container">
          <ValueTriad />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <HowItWorks />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <NeighborhoodsTeaser />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <ProofStrip />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <PhotoGuidelines className="my-12 md:my-16" />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <PricingPreview />
        </div>
      </section>
      
      {/* FAQ locales Nice (questions prix/devis) - JSON-LD FAQPage */}
      <LocalMoneyFAQ citySlug="nice" cityName="Nice" />
      
      <section className="section">
        <div className="container">
          <Testimonials />
        </div>
      </section>
      <StickyCTA />
    </main>
  );
}


