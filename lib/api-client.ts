// API Client pour communiquer avec le Backend

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://moverz-backoffice.gslv.cloud';

export interface CreateLeadPayload {
  // Champs requis
  firstName: string;  // min 1 caractère
  email: string;      // format email valide
  
  // Champs optionnels
  lastName?: string;  // default "" si non fourni
  phone?: string;
  source?: string;
  estimationMethod?: 'FORM' | 'PHOTO';
  status?: 'NEW' | 'CONTACTED' | 'CONVERTED' | 'ABANDONED';  // default "NEW"
  
  // ⚠️ NOTE: Les autres champs (adresses, dates, volume, etc.) doivent être envoyés via PATCH /api/leads/:id
  // Le POST initial crée seulement un lead minimal avec contact
}

export interface UpdateLeadPayload {
  // Contact
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  
  // Source & Tracking
  source?: string;
  estimationMethod?: 'FORM' | 'PHOTO';
  status?: 'NEW' | 'CONTACTED' | 'CONVERTED' | 'ABANDONED';
  
  // Adresses
  originAddress?: string;
  originCity?: string;
  originPostalCode?: string;
  destAddress?: string;  // ⚠️ Backend attend "destAddress", pas "destinationAddress"
  destCity?: string;
  destPostalCode?: string;
  
  // Dates
  movingDate?: string;  // ISO-8601 string
  movingDateEnd?: string;  // ISO-8601 string
  dateFlexible?: boolean;
  
  // Volume & Surface
  surfaceM2?: number;
  estimatedVolume?: number;
  density?: 'LIGHT' | 'MEDIUM' | 'HEAVY';  // ⚠️ Backend attend uppercase + MEDIUM (pas normal)
  
  // Formule & Prix
  formule?: 'ECONOMIQUE' | 'STANDARD' | 'PREMIUM';
  estimatedPriceMin?: number;
  estimatedPriceAvg?: number;
  estimatedPriceMax?: number;
  
  // Détails logement origine
  originHousingType?: string;
  originFloor?: number;
  originElevator?: 'OUI' | 'NON' | 'PARTIEL';  // ⚠️ Backend attend String "OUI"/"NON"/"PARTIEL", pas Boolean
  originFurnitureLift?: string;
  originCarryDistance?: string;
  originParkingAuth?: boolean;
  
  // Détails logement destination
  destHousingType?: string;
  destFloor?: number;
  destElevator?: 'OUI' | 'NON' | 'PARTIEL';  // ⚠️ Backend attend String "OUI"/"NON"/"PARTIEL"
  destFurnitureLift?: string;
  destCarryDistance?: string;
  destParkingAuth?: boolean;
  
  // Photos & IA (optionnel)
  photosUrls?: string;
  aiEstimationConfidence?: number;
  
  // Métadonnées (pour tracking interne uniquement)
  metadata?: Record<string, any>;
}

export async function createLead(payload: CreateLeadPayload): Promise<{ id: string }> {
  const response = await fetch(`${API_BASE_URL}/api/leads`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
    const errorMessage = errorData.message || errorData.error || `Failed to create lead (${response.status})`;
    throw new Error(errorMessage);
  }

  const result = await response.json();
  
  // Backend retourne { success: true, data: { id: "...", ... } }
  if (result.success && result.data && result.data.id) {
    return { id: result.data.id };
  }
  
  // Fallback si format différent
  if (result.id) {
    return { id: result.id };
  }
  
  throw new Error('Invalid response format from backend');
}

export async function updateLead(leadId: string, payload: UpdateLeadPayload): Promise<void> {
  // ⚠️ Protection : Ne pas appeler backend avec demo ID
  if (leadId.startsWith('demo-')) {
    throw new Error('Cannot update demo lead. Please create a real lead first.');
  }
  
  const response = await fetch(`${API_BASE_URL}/api/leads/${leadId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
    const errorMessage = errorData.message || errorData.error || `Failed to update lead (${response.status})`;
    throw new Error(errorMessage);
  }
}

// Fonction helper pour extraire ville et code postal d'une adresse
export function parseAddress(address: string): { city: string; postalCode: string } {
  // Format attendu : "Nice, 06000" ou "Nice" ou "06000"
  const parts = address.split(',').map(p => p.trim());
  
  if (parts.length === 2) {
    // "Nice, 06000"
    return {
      city: parts[0],
      postalCode: parts[1],
    };
  } else if (/^\d{5}$/.test(parts[0])) {
    // "06000" (code postal seul)
    return {
      city: '',
      postalCode: parts[0],
    };
  } else {
    // "Nice" (ville seule)
    return {
      city: parts[0],
      postalCode: '',
    };
  }
}

// Déterminer le source depuis l'URL
export function getSource(): string {
  if (typeof window === 'undefined') return 'moverz';
  
  const hostname = window.location.hostname;
  
  // Extraire la ville depuis le domaine
  // devis-demenageur-nice.fr → nice
  const match = hostname.match(/devis-demenageur-(\w+)\./);
  if (match) {
    return `devis-demenageur-${match[1]}.fr`;
  }
  
  // Fallback localhost
  return 'localhost-dev';
}

// Mapping des valeurs frontend → backend

/**
 * Convertit la valeur elevator du formulaire vers le format backend
 * Frontend: 'none' | 'small' | 'medium' | 'large'
 * Backend: "OUI" | "NON" | "PARTIEL"
 */
export function mapElevatorToBackend(value: 'none' | 'small' | 'medium' | 'large'): 'OUI' | 'NON' | 'PARTIEL' {
  switch (value) {
    case 'none':
      return 'NON';
    case 'small':
    case 'medium':
      return 'PARTIEL';
    case 'large':
      return 'OUI';
    default:
      return 'NON';
  }
}

/**
 * Convertit la valeur density du formulaire vers le format backend
 * Frontend: 'light' | 'normal' | 'dense'
 * Backend: "LIGHT" | "MEDIUM" | "HEAVY"
 */
export function mapDensityToBackend(value: 'light' | 'normal' | 'dense'): 'LIGHT' | 'MEDIUM' | 'HEAVY' {
  switch (value) {
    case 'light':
      return 'LIGHT';
    case 'normal':
      return 'MEDIUM';  // ⚠️ Backend attend MEDIUM, pas normal
    case 'dense':
      return 'HEAVY';
    default:
      return 'MEDIUM';
  }
}

/**
 * Convertit furnitureLift du formulaire vers le format backend
 * Frontend: 'unknown' | 'no' | 'yes'
 * Backend: string (format à valider avec backend)
 */
export function mapFurnitureLiftToBackend(value: 'unknown' | 'no' | 'yes'): string {
  switch (value) {
    case 'yes':
      return 'NECESSAIRE';
    case 'no':
      return 'NON';
    case 'unknown':
    default:
      return 'NON';  // Par défaut NON si inconnu
  }
}

