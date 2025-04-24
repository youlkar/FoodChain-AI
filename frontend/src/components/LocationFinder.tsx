import React, { useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { extractZipCode } from '../utils/routesApiUtils';

interface LocationFinderProps {
  onLocationSelected: (location: string) => void;
  initialZipCode?: string;
}

const LocationFinder: React.FC<LocationFinderProps> = ({ 
  onLocationSelected,
  initialZipCode = ''
}) => {
  const [zipCode, setZipCode] = useState(initialZipCode);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  // Handle zip code input
  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setZipCode(e.target.value);
    setLocationError(null);
  };

  // Submit the zip code
  const handleZipCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate zip code
    const extractedZip = extractZipCode(zipCode);
    if (!extractedZip) {
      setLocationError('Please enter a valid 5-digit ZIP code');
      return;
    }
    
    // Pass the zip code to the parent component
    onLocationSelected(extractedZip);
  };

  // Use browser geolocation API to get live location
  const handleGetLocation = () => {
    setIsGettingLocation(true);
    setLocationError(null);
    
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      setIsGettingLocation(false);
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      // Success callback
      (position) => {
        const { latitude, longitude } = position.coords;
        // Format as "lat,lng" for the Google API
        const locationString = `${latitude},${longitude}`;
        onLocationSelected(locationString);
        setIsGettingLocation(false);
      },
      // Error callback
      (error) => {
        console.error('Geolocation error:', error);
        let errorMessage = 'Unable to get your location';
        
        switch (error.code) {
          case 1: // PERMISSION_DENIED
            errorMessage = 'Please allow location access to use this feature';
            break;
          case 2: // POSITION_UNAVAILABLE
            errorMessage = 'Your location information is unavailable';
            break;
          case 3: // TIMEOUT
            errorMessage = 'The request to get your location timed out';
            break;
        }
        
        setLocationError(errorMessage);
        setIsGettingLocation(false);
      },
      // Options
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-medium mb-4">Find agencies near you</h3>
      
      <form onSubmit={handleZipCodeSubmit} className="mb-4">
        <div className="flex flex-col md:flex-row gap-2">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={zipCode}
              onChange={handleZipCodeChange}
              placeholder="Enter ZIP code"
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              maxLength={10}
            />
          </div>
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition"
          >
            Search
          </button>
        </div>
      </form>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={handleGetLocation}
            disabled={isGettingLocation}
            className="flex items-center text-green-600 hover:text-green-800 transition"
          >
            <Navigation className="h-5 w-5 mr-1" />
            <span>Use my current location</span>
          </button>
        </div>
      </div>
      
      {isGettingLocation && (
        <div className="mt-2 text-sm text-gray-500">
          Getting your location...
        </div>
      )}
      
      {locationError && (
        <div className="mt-2 text-sm text-red-500">
          {locationError}
        </div>
      )}
    </div>
  );
};

export default LocationFinder; 