// API Client pour communiquer avec le Backend

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://moverz-backoffice.gslv.cloud';

export interface CreateLeadPayload {
  // Champs requis (selon backend createLeadSchema)
  firstName: string;  // min 1 caractère
  email: string;      // format email valide
  
  // Champs optionnels (selon backend)
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
  // 🔍 DEBUG: Log du payload envoyé
  console.log('📤 Payload envoyé au backend:', JSON.stringify(payload, null, 2));
  console.log('🌐 URL backend:', `${API_BASE_URL}/api/leads`);
  console.log('🌐 Origin:', typeof window !== 'undefined' ? window.location.origin : 'SSR');
  
  const response = await fetch(`${API_BASE_URL}/api/leads`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    // Essayer de parser la réponse JSON, sinon récupérer le texte brut
    let errorData: any = {};
    const contentType = response.headers.get('content-type');
    
    if (contentType && contentType.includes('application/json')) {
      try {
        errorData = await response.json();
      } catch (e) {
        console.warn('⚠️ Réponse JSON invalide, tentative texte brut');
        const text = await response.text();
        errorData = { rawResponse: text };
      }
    } else {
      const text = await response.text();
      errorData = { rawResponse: text };
    }
    
    // 🔍 DEBUG: Log de l'erreur complète
    console.error('❌ Erreur backend complète:', {
      status: response.status,
      statusText: response.statusText,
      errorData,
      payload: JSON.stringify(payload, null, 2),
    });
    
    // Format backend: { success: false, error: "...", details: [...] }
    let errorMessage = errorData.error || errorData.message || errorData.rawResponse || `Failed to create lead (${response.status})`;
    
    // Si details existe (validation Zod), afficher les détails
    if (errorData.details && Array.isArray(errorData.details)) {
      try {
        const validationErrors = errorData.details.map((d: any) => {
          // ⚠️ FIX: Vérifier que path est un array avant .join()
          const pathStr = Array.isArray(d.path) ? d.path.join('.') : (d.path || 'unknown');
          return `${pathStr}: ${d.message || d.code || 'validation error'}`;
        }).join(', ');
        errorMessage = `${errorMessage} - ${validationErrors}`;
      } catch (e) {
        console.error('⚠️ Erreur lors du parsing des détails Zod:', e);
        // Continuer avec le message de base
      }
    }
    
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
  
  // 🔍 DEBUG: Log de la requête PATCH
  console.log('📤 PATCH /api/leads/' + leadId);
  console.log('📤 Payload PATCH:', JSON.stringify(payload, null, 2));
  
  const response = await fetch(`${API_BASE_URL}/api/leads/${leadId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    // Essayer de parser la réponse JSON, sinon récupérer le texte brut
    let errorData: any = {};
    const contentType = response.headers.get('content-type');
    
    if (contentType && contentType.includes('application/json')) {
      try {
        errorData = await response.json();
      } catch (e) {
        const text = await response.text();
        errorData = { rawResponse: text };
      }
    } else {
      const text = await response.text();
      errorData = { rawResponse: text };
    }
    
    // 🔍 DEBUG: Log de l'erreur complète
    console.error('❌ Erreur PATCH backend:', {
      status: response.status,
      statusText: response.statusText,
      errorData,
      leadId,
      url: `${API_BASE_URL}/api/leads/${leadId}`,
      payload: JSON.stringify(payload, null, 2),
    });
    
    const errorMessage = errorData.error || errorData.message || errorData.rawResponse || `Failed to update lead (${response.status})`;
    throw new Error(errorMessage);
  }
  
  console.log('✅ Lead mis à jour avec succès:', leadId);
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

