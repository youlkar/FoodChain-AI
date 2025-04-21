import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Navigation } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import AgencyCard from '../components/AgencyCard';
import { Agency } from '../types';
import { useAuth } from '../context/AuthContext';
import { calculateDistance, extractZipCode, batchGetDistances } from '../utils/distanceUtils';

const ResourcesPage: React.FC = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [filteredAgencies, setFilteredAgencies] = useState<Agency[]>([]);
  const [loading, setLoading] = useState(true);
  const [locationLoading, setLocationLoading] = useState(false);
  const [userCoords, setUserCoords] = useState<{lat: number, lng: number} | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const { user } = useAuth();
  
  // Update document title
  useEffect(() => {
    document.title = 'Find Food Resources | FoodConnect';
  }, []);

  // Load agency data and check for ZIP code in URL
  useEffect(() => {
    const fetchAgencyData = async () => {
      try {
        const response = await fetch('/src/data/agencies.json');
        const data = await response.json();
        
        // Generate IDs for agencies if they don't have them
        const agenciesWithIds = data.agencies.map((agency: Agency, index: number) => ({
          ...agency,
          id: agency.id || `agency-${index}`, 
        }));
        
        setAgencies(agenciesWithIds);
        setFilteredAgencies(agenciesWithIds);
        
        // Check if there's a ZIP code in the URL
        const params = new URLSearchParams(location.search);
        const zipFromUrl = params.get('zipCode');
        
        if (zipFromUrl) {
          setZipCode(zipFromUrl);
          // Calculate distances based on the ZIP code from URL
          calculateDistancesFromZipCode(zipFromUrl, agenciesWithIds);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error loading agency data:', error);
        setLoading(false);
      }
    };
    
    fetchAgencyData();
  }, [location.search]);

  // Filter agencies based on search term
  useEffect(() => {
    if (!agencies.length) return;
    
    let filtered = agencies;
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        agency => 
          agency.name.toLowerCase().includes(term) ||
          agency.address.toLowerCase().includes(term) ||
          agency.requirements.toLowerCase().includes(term) ||
          agency.distribution_model.toLowerCase().includes(term) ||
          agency.notes.toLowerCase().includes(term) ||
          agency.cultures_served.some(culture => culture.toLowerCase().includes(term))
      );
    }
    
    setFilteredAgencies(filtered);
  }, [searchTerm, agencies]);

  // Get user's current location
  const getUserLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      return;
    }
    
    setLocationLoading(true);
    setLocationError(null);
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserCoords({ lat: latitude, lng: longitude });
        
        // Use coordinates for calculating distances
        calculateDistancesFromCoordinates(latitude, longitude);
        setLocationLoading(false);
      },
      (error) => {
        setLocationError(`Error getting location: ${error.message}`);
        setLocationLoading(false);
        console.error("Error getting user location:", error);
      },
      { 
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  // Calculate distances using Google Distance Matrix API based on ZIP code
  const calculateDistancesFromZipCode = async (zip: string, agencyList = agencies) => {
    if (!zip || !agencyList.length) return;
    
    setLocationLoading(true);
    setLocationError(null);
    
    try {
      // Prepare the list of agency addresses
      const agencyAddresses = agencyList.map(agency => agency.address).filter(Boolean);
      
      // Batch request distances from Google API
      const distanceResults = await batchGetDistances(zip, agencyAddresses);
      
      // Update agencies with calculated distances
      const agenciesWithDistances = agencyList.map(agency => {
        if (agency.address && distanceResults[agency.address] !== undefined) {
          return {
            ...agency,
            distance: distanceResults[agency.address]
          };
        }
        return agency;
      });
      
      // Sort agencies by distance
      const sortedAgencies = agenciesWithDistances.sort((a, b) => {
        if (a.distance === undefined) return 1;
        if (b.distance === undefined) return -1;
        return a.distance - b.distance;
      });
      
      setAgencies(sortedAgencies);
      setFilteredAgencies(sortedAgencies.filter(agency => 
        searchTerm ? 
          agency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          agency.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
          agency.requirements.toLowerCase().includes(searchTerm.toLowerCase()) ||
          agency.distribution_model.toLowerCase().includes(searchTerm.toLowerCase()) ||
          agency.notes.toLowerCase().includes(searchTerm.toLowerCase()) ||
          agency.cultures_served.some(culture => culture.toLowerCase().includes(searchTerm.toLowerCase()))
        : true
      ));
      
      setLocationLoading(false);
    } catch (error) {
      console.error('Error calculating distances from ZIP code:', error);
      setLocationError('Error calculating distances. Please try again.');
      setLocationLoading(false);
    }
  };
  
  // Calculate distances using Google Distance Matrix API based on coordinates
  const calculateDistancesFromCoordinates = async (lat: number, lng: number) => {
    if (!agencies.length) return;
    
    setLocationLoading(true);
    
    try {
      // Convert coordinates to string format for the API
      const coordsString = `${lat},${lng}`;
      
      // Use the same function as ZIP code but with coordinate string
      await calculateDistancesFromZipCode(coordsString);
      
      setLocationLoading(false);
    } catch (error) {
      console.error('Error calculating distances from coordinates:', error);
      setLocationError('Error calculating distances. Please try again.');
      setLocationLoading(false);
    }
  };

  // Handle ZIP code search
  const handleZipCodeSearch = async () => {
    if (!zipCode) return;
    
    try {
      await calculateDistancesFromZipCode(zipCode);
    } catch (error) {
      console.error('Error during search:', error);
      setLocationError('Error calculating distances. Please try again.');
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-green-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
              Find Food Resources Near You
            </h1>
            <p className="mt-3 text-xl text-green-100">
              Locate food banks, pantries, and other assistance in your area.
            </p>
          </div>
          
          <div className="mt-8 max-w-3xl mx-auto">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-grow relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter your zip code"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    className="block w-full pl-10 py-3 border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <button 
                  className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  onClick={handleZipCodeSearch}
                  disabled={locationLoading}
                >
                  <Search className="h-5 w-5 mr-2" />
                  Search
                </button>
                <button 
                  className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={getUserLocation}
                  disabled={locationLoading}
                >
                  <Navigation className="h-5 w-5 mr-2" />
                  Use My Location
                </button>
              </div>
              {locationLoading && (
                <div className="mt-2 text-center text-sm text-gray-600">
                  <span className="inline-block animate-spin mr-2">⟳</span>
                  Calculating distances...
                </div>
              )}
              {locationError && (
                <div className="mt-2 text-center text-sm text-red-600">
                  {locationError}
                </div>
              )}
              {userCoords && (
                <div className="mt-2 text-center text-sm text-green-600">
                  Using your current location
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Food Resources {userCoords ? 'near your location' : zipCode ? `near ${zipCode}` : ''}
          </h2>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-2 pr-4 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>
        
        {loading ? (
          <div className="text-center py-12">
            <div className="spinner-border text-green-500" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-4 text-gray-500">Loading resources...</p>
          </div>
        ) : filteredAgencies.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredAgencies.map(agency => (
              <AgencyCard 
                key={agency.id} 
                agency={agency}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <Filter className="h-12 w-12 mx-auto text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No resources found</h3>
            <p className="text-gray-500">Try adjusting your search or try a different location.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourcesPage;