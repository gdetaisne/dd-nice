// Algorithme de calcul du pricing pour le formulaire

const TYPE_COEFFICIENTS = {
  studio: 0.30,
  t1: 0.30,
  t2: 0.35,
  t3: 0.35,
  t4: 0.40,
  t5: 0.40,
  house: 0.45,
};

const DENSITY_COEFFICIENTS = {
  light: 0.90,   // Sobre : -10%
  normal: 1.00,  // Normal : standard
  dense: 1.10,   // Dense : +10%
};

const FORMULE_MULTIPLIERS = {
  ECONOMIQUE: 1.10,
  STANDARD: 1.25,
  PREMIUM: 1.40,
};

const COEF_VOLUME = 80;   // 80€ par m3
const COEF_DISTANCE = 1.2; // 1.20€ par km
const PRIX_MIN_SOCLE = 400; // Prix minimum

export function calculateVolume(
  surfaceM2: number,
  housingType: keyof typeof TYPE_COEFFICIENTS,
  density: keyof typeof DENSITY_COEFFICIENTS = 'normal'
): number {
  const baseVolume = surfaceM2 * TYPE_COEFFICIENTS[housingType];
  const adjustedVolume = baseVolume * DENSITY_COEFFICIENTS[density];
  return Math.round(adjustedVolume * 10) / 10;
}

export function calculateDistance(
  originCity: string,
  destCity: string
): number {
  // Simplified distance calculation
  // In production, use Google Maps Distance Matrix API
  const distances: Record<string, Record<string, number>> = {
    nice: { paris: 931, lyon: 472, marseille: 198, toulouse: 678 },
    paris: { nice: 931, lyon: 463, marseille: 775, toulouse: 678 },
    lyon: { nice: 472, paris: 463, marseille: 314, toulouse: 537 },
    marseille: { nice: 198, paris: 775, lyon: 314, toulouse: 404 },
    toulouse: { nice: 678, paris: 678, lyon: 537, marseille: 404 },
  };
  
  const origin = originCity.toLowerCase();
  const dest = destCity.toLowerCase();
  
  return distances[origin]?.[dest] || 500; // Default 500km
}

export function calculatePricing(
  surfaceM2: number,
  housingType: keyof typeof TYPE_COEFFICIENTS,
  density: keyof typeof DENSITY_COEFFICIENTS,
  distanceKm: number,
  formule: keyof typeof FORMULE_MULTIPLIERS
) {
  // 1. Calcul volume
  const volumeM3 = calculateVolume(surfaceM2, housingType, density);
  
  // 2. Prix base
  const prixBase = Math.max(
    (volumeM3 * COEF_VOLUME) + (distanceKm * COEF_DISTANCE),
    PRIX_MIN_SOCLE
  );
  
  // 3. Multiplicateur formule
  const formuleMultiplier = FORMULE_MULTIPLIERS[formule];
  
  // 4. Prix avec formule
  const prixAvg = Math.round(prixBase * formuleMultiplier);
  
  // 5. Fourchette ±10%
  const prixMin = Math.round(prixAvg * 0.90);
  const prixMax = Math.round(prixAvg * 1.10);
  
  return {
    volumeM3,
    distanceKm,
    prixMin,
    prixAvg,
    prixMax,
  };
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

