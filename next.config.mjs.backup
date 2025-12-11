import { getMoverzBlogRedirectsForHost } from '../../scripts/blog-moverz-redirects.mjs';

const HOST = 'devis-demenageur-nice.fr';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  output: 'standalone',
  trailingSlash: true,
  
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  experimental: {
    serverComponentsExternalPackages: []
  },

  compress: true,
  
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      }
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  async redirects() {
    const existing = [
      // Homepage → Page ville moverz.fr
      // Blog hub → moverz.fr
      // Blog articles → moverz.fr
      // Quartiers nice (6 pages)
      { source: '/nice/', destination: 'https://moverz.fr/nice/', permanent: true },
      { source: '/nice/cimiez/', destination: 'https://moverz.fr/nice/cimiez/', permanent: true },
      { source: '/nice/liberation/', destination: 'https://moverz.fr/nice/liberation/', permanent: true },
      { source: '/nice/port/', destination: 'https://moverz.fr/nice/port/', permanent: true },
      { source: '/nice/promenade-anglais/', destination: 'https://moverz.fr/nice/promenade-anglais/', permanent: true },
      { source: '/nice/vieux-nice/', destination: 'https://moverz.fr/nice/vieux-nice/', permanent: true },
      // Hub quartiers nice
      // Corridors depuis nice (6 pages)
      { source: '/nice-vers-espagne/', destination: 'https://moverz.fr/nice-vers-espagne/', permanent: true },
      { source: '/nice-vers-lyon/', destination: 'https://moverz.fr/nice-vers-lyon/', permanent: true },
      { source: '/nice-vers-marseille/', destination: 'https://moverz.fr/nice-vers-marseille/', permanent: true },
      { source: '/nice-vers-nantes/', destination: 'https://moverz.fr/nice-vers-nantes/', permanent: true },
      { source: '/nice-vers-paris/', destination: 'https://moverz.fr/nice-vers-paris/', permanent: true },
      { source: '/nice-vers-toulouse/', destination: 'https://moverz.fr/nice-vers-toulouse/', permanent: true },
      // Services
      { source: '/services/', destination: 'https://moverz.fr/', permanent: true },
      { source: '/services/demenagement-economique-nice/', destination: 'https://moverz.fr/', permanent: true },
      { source: '/services/demenagement-premium-nice/', destination: 'https://moverz.fr/', permanent: true },
      { source: '/services/demenagement-standard-nice/', destination: 'https://moverz.fr/', permanent: true },
      // Pages communes
      { source: '/cgu/', destination: 'https://moverz.fr/cgu/', permanent: true },
      { source: '/cgv/', destination: 'https://moverz.fr/cgv/', permanent: true },
      { source: '/comment-ca-marche/', destination: 'https://moverz.fr/comment-ca-marche/', permanent: true },
      { source: '/contact/', destination: 'https://moverz.fr/contact/', permanent: true },
      { source: '/devis-gratuits/', destination: 'https://moverz.fr/devis-gratuits/', permanent: true },
      { source: '/estimation-rapide/', destination: 'https://moverz.fr/estimation-rapide/', permanent: true },
      { source: '/faq/', destination: 'https://moverz.fr/faq/', permanent: true },
      { source: '/mentions-legales/', destination: 'https://moverz.fr/mentions-legales/', permanent: true },
      { source: '/notre-offre/', destination: 'https://moverz.fr/notre-offre/', permanent: true },
      { source: '/partenaires/', destination: 'https://moverz.fr/partenaires/', permanent: true },
      { source: '/politique-confidentialite/', destination: 'https://moverz.fr/politique-confidentialite/', permanent: true },
    ];

    const blogToMoverz = getMoverzBlogRedirectsForHost(HOST);

    return [...existing, ...blogToMoverz];
  }
};

export default nextConfig;
