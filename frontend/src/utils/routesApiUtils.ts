import { Agency } from '../types';

// The Google Maps API key
const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

// URL for the backend proxy
const PROXY_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

// Cache to store distance matrix results to avoid redundant API calls
const distanceMatrixCache: Record<string, number> = {};

/**
 * Extract ZIP code from an address string
 * @param address - The address to extract ZIP code from
 * @returns The ZIP code or null if not found
 */
export function extractZipCode(address: string): string | null {
  if (!address) return null;
  
  // US ZIP code pattern (5 digits, optionally followed by dash and 4 more digits)
  const zipPattern = /\b(\d{5})(?:-\d{4})?\b/;
  const match = address.match(zipPattern);
  
  return match ? match[1] : null;
}

/**
 * Get coordinates for a location (address or ZIP code)
 * @param location - The address or ZIP code to geocode
 * @returns Promise with coordinates or null if not found
 */
export async function geocodeLocation(location: string): Promise<{lat: number, lng: number} | null> {
  try {
    // Use Google Geocoding API
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${GOOGLE_API_KEY}`
    );
    
    const data = await response.json();
    
    if (data.status === 'OK' && data.results.length > 0) {
      const { lat, lng } = data.results[0].geometry.location;
      return { lat, lng };
    }
    
    console.error('Geocoding failed:', data.status);
    return null;
  } catch (error) {
    console.error('Error in geocoding:', error);
    return null;
  }
}

/**
 * Calculate distance between two points using the Haversine formula
 * Used as a fallback when API calls fail
 */
export function calculateHaversineDistance(
  lat1: number, 
  lng1: number, 
  lat2: number, 
  lng2: number
): number {
  const R = 3958.8; // Earth radius in miles
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);
  
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * 
    Math.sin(dLng/2) * Math.sin(dLng/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c; // Distance in miles
  
  // Ensure distance is at least 0.1 miles
  return Math.max(0.1, distance);
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Compute routes between one origin and multiple destinations using Google Routes API
 * Uses the computeRouteMatrix endpoint for batch processing
 * 
 * @param origin - Origin location (address, ZIP code, or coordinates)
 * @param destinations - Array of destination addresses
 * @param batchSize - Number of destinations per API call (max 25 recommended)
 * @returns Object mapping each destination to its distance in miles
 */
export async function computeDistanceMatrix(
  origin: string,
  destinations: string[],
  batchSize: number = 25
): Promise<Record<string, number>> {
  if (!destinations.length) return {};
  
  const results: Record<string, number> = {};
  const errorAddresses: string[] = [];
  
  // Process destinations in batches
  for (let i = 0; i < destinations.length; i += batchSize) {
    const batch = destinations.slice(i, i + batchSize);
    
    try {
      // Use the backend proxy instead of calling Google API directly
      const response = await fetch(`${PROXY_URL}/api/routes/matrix`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          origin,
          destinations: batch,
          batchSize
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API error: ${response.status} - ${errorData.error || response.statusText}`);
      }
      
      const data = await response.json();
      
      // Process each route result
      data.forEach((route: any, index: number) => {
        const address = batch[route.destinationIndex];
        
        if (route.status === 'OK') {
          // Convert meters to miles (1 meter = 0.000621371 miles)
          const distanceMiles = route.distanceMeters * 0.000621371;
          results[address] = Math.max(0.1, distanceMiles); // Ensure at least 0.1 miles
          
          // Cache the result
          const cacheKey = `${origin}|${address}`;
          distanceMatrixCache[cacheKey] = distanceMiles;
        } else {
          // Save addresses with errors for fallback processing
          errorAddresses.push(address);
          console.warn(`Route calculation failed for ${address}: ${route.status}`);
        }
      });
    } catch (error) {
      console.error('Error in batch distance calculation:', error);
      // Add all addresses in this batch to error list for fallback
      errorAddresses.push(...batch);
    }
    
    // Short delay between batches to avoid rate limiting
    if (i + batchSize < destinations.length) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
  
  // Process addresses that failed with the API using fallback method
  if (errorAddresses.length > 0) {
    console.log(`Using fallback method for ${errorAddresses.length} addresses`);
    const fallbackResults = await calculateFallbackDistances(origin, errorAddresses);
    Object.assign(results, fallbackResults);
  }
  
  return results;
}

/**
 * Calculate distances using fallback methods for addresses that failed with the API
 */
async function calculateFallbackDistances(
  origin: string,
  addresses: string[]
): Promise<Record<string, number>> {
  const results: Record<string, number> = {};
  
  // Try to geocode the origin
  const originCoords = await geocodeLocation(origin);
  const originZip = extractZipCode(origin);
  
  for (const address of addresses) {
    let distance: number = 10; // Default fallback
    
    // First check the cache
    const cacheKey = `${origin}|${address}`;
    if (distanceMatrixCache[cacheKey] !== undefined) {
      results[address] = distanceMatrixCache[cacheKey];
      continue;
    }
    
    try {
      // Try calculating using coordinates if we have them
      if (originCoords) {
        const destCoords = await geocodeLocation(address);
        if (destCoords) {
          distance = calculateHaversineDistance(
            originCoords.lat, 
            originCoords.lng, 
            destCoords.lat, 
            destCoords.lng
          );
        } else {
          // If we can't geocode the destination but have origin coordinates
          // Extract ZIP code and estimate based on that
          const destZip = extractZipCode(address);
          if (originZip && destZip) {
            distance = estimateDistanceByZipCode(originZip, destZip, address);
          }
        }
      } else if (originZip) {
        // If we only have ZIP codes
        const destZip = extractZipCode(address);
        if (destZip) {
          distance = estimateDistanceByZipCode(originZip, destZip, address);
        }
      }
    } catch (error) {
      console.error('Error in fallback distance calculation:', error);
      // Use the default fallback distance
    }
    
    results[address] = distance;
    distanceMatrixCache[cacheKey] = distance;
  }
  
  return results;
}

/**
 * Estimate distance between ZIP codes based on their numeric values
 * This is a very rough approximation but better than nothing
 */
function estimateDistanceByZipCode(zip1: string, zip2: string, address?: string): number {
  if (zip1 === zip2) {
    // For agencies in the same ZIP code, show as 0.0 miles away
    return 0.0;
  }
  
  // Compare first digits (regional difference)
  const region1 = parseInt(zip1.charAt(0));
  const region2 = parseInt(zip2.charAt(0));
  const regionDiff = Math.abs(region1 - region2);
  
  // Compare first three digits (area difference)
  const area1 = parseInt(zip1.substring(0, 3));
  const area2 = parseInt(zip2.substring(0, 3));
  const areaDiff = Math.abs(area1 - area2);
  
  // Basic distance calculation
  let distance: number;
  
  if (regionDiff === 0) {
    if (areaDiff === 0) {
      // Same first 3 digits - likely close
      const lastDigitsDiff = Math.abs(parseInt(zip1.substring(3)) - parseInt(zip2.substring(3)));
      distance = 2 + (lastDigitsDiff / 25); // 2-6 miles
    } else {
      // Same region but different area
      distance = 5 + (areaDiff / 5); // 5-25 miles
    }
  } else {
    // Different regions - far apart
    distance = 50 + (regionDiff * 100); // 50-950 miles
  }
  
  return Math.max(0.1, distance);
}

/**
 * Sort agencies by their distance from a given location
 * @param agencies - Array of agency objects
 * @param userLocation - User's location (ZIP code or coordinates)
 * @param useProxyApi - Whether to use the proxy API (true) or fallback method (false)
 * @returns Promise with sorted array of agencies with distances
 */
export async function sortAgenciesByDistance(
  agencies: Agency[],
  userLocation: string,
  useProxyApi: boolean = true
): Promise<Agency[]> {
  if (!agencies.length) return [];
  
  // Extract all valid addresses
  const addresses = agencies
    .map(agency => agency.address)
    .filter(address => !!address);
  
  // Calculate distances for all addresses
  const distanceResults = useProxyApi 
    ? await computeDistanceMatrix(userLocation, addresses)
    : await computeDistanceMatrixFallback(userLocation, addresses);
  
  // Add distance information to agencies
  const agenciesWithDistance = agencies.map(agency => {
    let distance = 999999; // Default very large number for sorting
    
    if (agency.address && distanceResults[agency.address] !== undefined) {
      distance = distanceResults[agency.address];
    }
    
    return {
      ...agency,
      distance
    };
  });
  
  // Sort agencies by distance
  return agenciesWithDistance.sort((a, b) => {
    const distA = typeof a.distance === 'number' && isFinite(a.distance) ? a.distance : 999999;
    const distB = typeof b.distance === 'number' && isFinite(b.distance) ? b.distance : 999999;
    return distA - distB;
  });
}

// Alternative function that only uses local calculations (no direct API calls)
// Use this as a temporary solution until the proxy is set up
export async function computeDistanceMatrixFallback(
  origin: string,
  destinations: string[]
): Promise<Record<string, number>> {
  if (!destinations.length) return {};
  
  console.log('Using fallback calculation for all distances');
  return calculateFallbackDistances(origin, destinations);
} 