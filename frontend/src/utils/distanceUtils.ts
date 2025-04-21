// Function to calculate the distance between two coordinates using the Haversine formula
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3958.8; // Earth radius in miles
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c; // Distance in miles
  
  return distance;
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

// Function to get coordinates from an address or ZIP code
export async function getCoordinates(address: string): Promise<{ lat: number; lng: number } | null> {
  try {
    // Use Google Geocoding API
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
    );
    
    const data = await response.json();
    
    if (data.status === 'OK' && data.results.length > 0) {
      const { lat, lng } = data.results[0].geometry.location;
      return { lat, lng };
    }
    
    return null;
  } catch (error) {
    console.error('Error getting coordinates:', error);
    return null;
  }
}

// Cache for storing calculated distances
const distanceCache: Record<string, number> = {};

// For demonstration purposes, we'll include a function that generates consistent distances
// based on ZIP code similarity (no real API calls)
export async function approximateZipCodeDistance(userZip: string, agencyZip: string): Promise<number | null> {
  // Check if we already calculated this distance
  const cacheKey = `${userZip}-${agencyZip}`;
  if (distanceCache[cacheKey] !== undefined) {
    return distanceCache[cacheKey];
  }
  
  // This is a simplified approximation for demonstration
  // In a real application, you would use a more accurate method
  
  // Extract the first 3 digits of ZIP codes (the "prefix")
  const userPrefix = userZip.slice(0, 3);
  const agencyPrefix = agencyZip.slice(0, 3);
  
  let distance: number;
  
  // Generate a deterministic number based on the ZIP codes
  const zipSum = parseInt(userZip) + parseInt(agencyZip);
  const pseudoRandom = (Math.sin(zipSum) * 10000) % 1;
  
  // If the prefixes are the same, assume a very close distance (0-5 miles)
  if (userPrefix === agencyPrefix) {
    distance = pseudoRandom * 5;
  }
  // If the first two digits are the same, assume a moderate distance (5-20 miles)
  else if (userPrefix.slice(0, 2) === agencyPrefix.slice(0, 2)) {
    distance = 5 + pseudoRandom * 15;
  }
  // Otherwise, assume a farther distance (20-50 miles)
  else {
    distance = 20 + pseudoRandom * 30;
  }
  
  // Cache the result
  distanceCache[cacheKey] = distance;
  
  return distance;
}

// Cache for Distance Matrix API responses
const distanceMatrixCache: Record<string, number> = {};

// Get Google Maps API key from environment variables
const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

/**
 * Calculate the distance between user location and agency address using Google Distance Matrix API
 * @param userLocation - The user's location (can be coordinates, address or ZIP code)
 * @param agencyAddress - The agency's address
 * @returns Distance in miles
 */
export async function getDistanceFromApi(
  userLocation: string, 
  agencyAddress: string
): Promise<number> {
  // Check cache first
  const cacheKey = `${userLocation}|${agencyAddress}`;
  if (distanceMatrixCache[cacheKey] !== undefined) {
    return distanceMatrixCache[cacheKey];
  }
  
  try {
    // Encode the origin and destination for the URL
    const origin = encodeURIComponent(userLocation);
    const destination = encodeURIComponent(agencyAddress);
    
    // Make request to Google Distance Matrix API
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&units=imperial&key=${GOOGLE_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`API returned ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Check if we got a valid response
    if (
      data.status === 'OK' && 
      data.rows && 
      data.rows.length > 0 && 
      data.rows[0].elements && 
      data.rows[0].elements.length > 0 &&
      data.rows[0].elements[0].status === 'OK'
    ) {
      // Extract distance value in miles (API returns value in miles when units=imperial)
      const distanceText = data.rows[0].elements[0].distance.text;
      const distanceValue = parseFloat(distanceText.replace(' mi', ''));
      
      // Cache the result
      distanceMatrixCache[cacheKey] = distanceValue;
      
      return distanceValue;
    } else {
      console.error('Invalid Distance Matrix API response:', data);
      throw new Error('Failed to get distance from Google API');
    }
  } catch (error) {
    console.error('Error fetching distance from API:', error);
    
    // Fallback to approximate distance calculation if API fails
    // Extract ZIP codes if possible
    const userZip = extractZipCode(userLocation);
    const agencyZip = extractZipCode(agencyAddress);
    
    if (userZip && agencyZip) {
      // Use a simple distance approximation based on ZIP code prefixes
      const distance = getZipCodeDistanceApproximation(userZip, agencyZip);
      distanceMatrixCache[cacheKey] = distance;
      return distance;
    }
    
    // If we can't extract ZIP codes, return a default value
    return 10; // Default fallback distance
  }
}

/**
 * Batch geocode multiple addresses and calculate distances
 * This is more efficient than making individual requests
 */
export async function batchGetDistances(
  userLocation: string,
  agencyAddresses: string[]
): Promise<Record<string, number>> {
  try {
    // Encode the origin for the URL
    const origin = encodeURIComponent(userLocation);
    
    // Encode the destinations and join them with a pipe character
    const destinations = agencyAddresses
      .map(address => encodeURIComponent(address))
      .join('|');
    
    // Make request to Google Distance Matrix API with multiple destinations
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destinations}&units=imperial&key=${GOOGLE_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`API returned ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Check if we got a valid response
    if (data.status === 'OK' && data.rows && data.rows.length > 0) {
      const results: Record<string, number> = {};
      
      // Process each result
      data.rows[0].elements.forEach((element: any, index: number) => {
        if (element.status === 'OK') {
          const distanceText = element.distance.text;
          const distanceValue = parseFloat(distanceText.replace(' mi', ''));
          
          // Store in results object
          const address = agencyAddresses[index];
          results[address] = distanceValue;
          
          // Also cache the result
          const cacheKey = `${userLocation}|${address}`;
          distanceMatrixCache[cacheKey] = distanceValue;
        } else {
          console.warn(`Failed to get distance for address: ${agencyAddresses[index]}`);
          
          // Use fallback for this address
          const address = agencyAddresses[index];
          const userZip = extractZipCode(userLocation);
          const agencyZip = extractZipCode(address);
          
          if (userZip && agencyZip) {
            results[address] = getZipCodeDistanceApproximation(userZip, agencyZip);
          } else {
            results[address] = 10; // Default fallback
          }
        }
      });
      
      return results;
    } else {
      console.error('Invalid batch Distance Matrix API response:', data);
      throw new Error('Failed to get distances from Google API');
    }
  } catch (error) {
    console.error('Error fetching batch distances from API:', error);
    
    // Fallback to approximate distances
    const results: Record<string, number> = {};
    const userZip = extractZipCode(userLocation);
    
    agencyAddresses.forEach(address => {
      const agencyZip = extractZipCode(address);
      if (userZip && agencyZip) {
        results[address] = getZipCodeDistanceApproximation(userZip, agencyZip);
      } else {
        results[address] = 10; // Default fallback
      }
    });
    
    return results;
  }
}

/**
 * Get a consistent distance approximation between ZIP codes
 * This is used as a fallback when the API fails
 */
function getZipCodeDistanceApproximation(userZip: string, agencyZip: string): number {
  // Extract the first 3 digits of ZIP codes (the "prefix")
  const userPrefix = userZip.slice(0, 3);
  const agencyPrefix = agencyZip.slice(0, 3);
  
  // Generate a deterministic number based on the ZIP codes
  const zipDiff = Math.abs(parseInt(userZip) - parseInt(agencyZip));
  const zipRatio = zipDiff / 99999; // Normalize the difference
  
  // If the prefixes are the same, assume a very close distance (0-5 miles)
  if (userPrefix === agencyPrefix) {
    return Math.min(5, zipDiff / 20); // At most 5 miles
  }
  // If the first two digits are the same, assume a moderate distance (5-20 miles)
  else if (userPrefix.slice(0, 2) === agencyPrefix.slice(0, 2)) {
    return 5 + zipRatio * 15; // 5-20 miles
  }
  // Otherwise, assume a farther distance (20-50 miles)
  else {
    return 20 + zipRatio * 30; // 20-50 miles
  }
}

// Extract ZIP code from an address string
export function extractZipCode(address: string): string | null {
  // Regular expression to match US ZIP codes
  const zipRegex = /\b\d{5}(?:-\d{4})?\b/;
  const match = address.match(zipRegex);
  
  return match ? match[0] : null;
} 