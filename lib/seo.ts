import type { DefaultSeoProps } from 'next-seo';

export const defaultSEO: DefaultSeoProps = {
  titleTemplate: '%s | Déménageurs nice',
  defaultTitle: 'Déménageurs nice - 5 devis sous 7 jours',
  description: '30 minutes pour votre dossier → 5 devis personnalisés sous 7 jours. Estimation volumétrique à partir de photos, tarifs clairs, conseils locaux.',
  canonical: 'https://www.nice-demenageur.fr',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://www.nice-demenageur.fr',
    siteName: 'Déménageurs nice',
    images: [
      {
        url: 'https://www.nice-demenageur.fr/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Déménageurs nice - Devis IA',
      },
    ],
  },
  twitter: {
    handle: '@demenageursnice',
    site: '@demenageursnice',
    cardType: 'summary_large_image',
  },
};
