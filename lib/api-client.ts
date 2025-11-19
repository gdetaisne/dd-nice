// API Client pour communiquer avec le Backend

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://moverz-backoffice.gslv.cloud';

export interface CreateLeadPayload {
  // Contact
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  
  // Source & Tracking
  source: string;
  estimationMethod: 'FORM' | 'PHOTO';
  status: 'NEW' | 'CONTACTED' | 'CONVERTED';
  
  // Adresses
  originAddress?: string;
  originCity?: string;
  originPostalCode?: string;
  destinationAddress?: string;
  destinationCity?: string;
  destinationPostalCode?: string;
  
  // Dates
  movingDate?: string;
  movingDateEnd?: string;
  dateFlexible?: boolean;
  
  // Volume & Surface
  surfaceM2?: number;
  estimatedVolume?: number;
  density?: string;
  
  // Formule & Prix
  formule?: string;
  estimatedPriceMin?: number;
  estimatedPriceAvg?: number;
  estimatedPriceMax?: number;
  
  // Logement Origine
  originHousingType?: string;
  originFloor?: number;
  originElevator?: string;
  originFurnitureLift?: string;
  originCarryDistance?: string;
  originParkingAuth?: boolean;
  
  // Logement Destination
  destinationHousingType?: string;
  destinationFloor?: number;
  destinationElevator?: string;
  destinationFurnitureLift?: string;
  destinationCarryDistance?: string;
  destinationParkingAuth?: boolean;
  
  // Métadonnées (UTM, referrer, etc.)
  metadata?: Record<string, any>;
}

export interface UpdateLeadPayload {
  // Adresses
  originAddress?: string;
  originCity?: string;
  originPostalCode?: string;
  destinationAddress?: string;
  destinationCity?: string;
  destinationPostalCode?: string;
  
  // Dates
  movingDate?: string;
  movingDateEnd?: string;
  dateFlexible?: boolean;
  
  // Volume & Surface
  surfaceM2?: number;
  estimatedVolume?: number;
  density?: string;
  
  // Formule & Prix
  formule?: string;
  estimatedPriceMin?: number;
  estimatedPriceAvg?: number;
  estimatedPriceMax?: number;
  
  // Logement Origine
  originHousingType?: string;
  originFloor?: number;
  originElevator?: string;
  originFurnitureLift?: string;
  originCarryDistance?: string;
  originParkingAuth?: boolean;
  
  // Logement Destination
  destinationHousingType?: string;
  destinationFloor?: number;
  destinationElevator?: string;
  destinationFurnitureLift?: string;
  destinationCarryDistance?: string;
  destinationParkingAuth?: boolean;
  
  // Métadonnées
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
    const error = await response.json().catch(() => ({ message: 'Unknown error' }));
    throw new Error(error.message || 'Failed to create lead');
  }

  return await response.json();
}

export async function updateLead(leadId: string, payload: UpdateLeadPayload): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/leads/${leadId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Unknown error' }));
    throw new Error(error.message || 'Failed to update lead');
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

