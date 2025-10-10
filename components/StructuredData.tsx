export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Déménageurs Nice (IA)",
    "description": "30 minutes pour votre dossier → 5 devis personnalisés sous 7 jours. Estimation volumétrique à partir de photos, tarifs clairs, conseils locaux.",
    "url": "https://www.devis-demenageur-nice.fr",
    "telephone": "+33-XXX-XXX-XXX",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Nice",
      "addressRegion": "Provence-Alpes-Côte d'Azur",
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 43.7102,
      "longitude": 7.2620
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Nice"
      },
      {
        "@type": "City",
        "name": "Cannes"
      },
      {
        "@type": "City",
        "name": "Antibes"
      }
    ],
    "priceRange": "€€",
    "openingHours": "Mo-Fr 09:00-18:00",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "1200",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}


