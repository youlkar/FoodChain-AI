import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import LocationFinder from '../components/LocationFinder';
import AgencyCard from '../components/AgencyCard';
import { Agency } from '../types';
import { sortAgenciesByDistance } from '../utils/routesApiUtils';

const FindNearbyAgenciesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [filteredAgencies, setFilteredAgencies] = useState<Agency[]>([]);
  const [loading, setLoading] = useState(true);
  const [locationLoading, setLocationLoading] = useState(false);
  const [userLocation, setUserLocation] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Update the title
  useEffect(() => {
    document.title = 'Find Food Resources | FoodConnect';
  }, []);

  // Load agency data and check URL for initial location
  useEffect(() => {
    const fetchAgencyData = async () => {
      try {
        // Fetch agencies data from the JSON file
        const response = await fetch('/src/data/agencies.json');
        const data = await response.json();
        
        // Add IDs to agencies if they don't have them
        const agenciesWithIds = data.agencies.map((agency: Agency, index: number) => ({
          ...agency,
          id: agency.id || `agency-${index}`, 
        }));
        
        setAgencies(agenciesWithIds);
        setFilteredAgencies(agenciesWithIds);
        
        // Check for zipCode in URL parameters
        const zipFromUrl = searchParams.get('zipCode');
        if (zipFromUrl) {
          setUserLocation(zipFromUrl);
          // Calculate distances based on ZIP code from URL
          handleLocationUpdate(zipFromUrl, agenciesWithIds);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error('Error loading agency data:', error);
        setLoading(false);
      }
    };
    
    fetchAgencyData();
  }, [searchParams]);

  // Handle when a user selects a location (ZIP code or coordinates)
  const handleLocationUpdate = async (location: string, agencyList = agencies) => {
    setLocationLoading(true);
    setUserLocation(location);
    
    // Update URL with ZIP code if it's a ZIP code
    const isZipCode = /^\d{5}$/.test(location);
    if (isZipCode) {
      setSearchParams({ zipCode: location });
    }
    
    try {
      // Sort agencies by distance from the selected location
      // Use false for the third parameter to use the fallback method until the proxy is set up
      const sortedAgencies = await sortAgenciesByDistance(agencyList, location, false);
      
      // Apply any active search filter
      if (searchTerm) {
        const filtered = filterAgenciesBySearchTerm(sortedAgencies, searchTerm);
        setFilteredAgencies(filtered);
      } else {
        setFilteredAgencies(sortedAgencies);
      }
      
      setAgencies(sortedAgencies);
    } catch (error) {
      console.error('Error sorting agencies by distance:', error);
    } finally {
      setLocationLoading(false);
      setLoading(false);
    }
  };

  // Handle search term filtering
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term) {
      const filtered = filterAgenciesBySearchTerm(agencies, term);
      setFilteredAgencies(filtered);
    } else {
      setFilteredAgencies(agencies);
    }
  };

  // Filter agencies based on search term
  const filterAgenciesBySearchTerm = (agencyList: Agency[], term: string): Agency[] => {
    const lowerTerm = term.toLowerCase();
    return agencyList.filter(agency => 
      agency.name.toLowerCase().includes(lowerTerm) ||
      agency.address.toLowerCase().includes(lowerTerm) ||
      agency.requirements.toLowerCase().includes(lowerTerm) ||
      (agency.distribution_model && agency.distribution_model.toLowerCase().includes(lowerTerm)) ||
      (agency.notes && agency.notes.toLowerCase().includes(lowerTerm)) ||
      (agency.cultures_served && agency.cultures_served.some(culture => 
        culture.toLowerCase().includes(lowerTerm)
      ))
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="pt-4 pb-6 px-4 sm:px-6 lg:px-8 bg-green-700 text-white">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold">Find Nearby Food Resources</h1>
          <p className="mt-2">Locate food pantries, meal programs, and other resources near you</p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            {/* Location finder component */}
            <LocationFinder 
              onLocationSelected={handleLocationUpdate}
              initialZipCode={searchParams.get('zipCode') || ''}
            />
            
            {/* Search filter */}
            <div className="bg-white p-5 rounded-lg shadow-md">
              <h3 className="text-lg font-medium mb-4">Filter Resources</h3>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search resources..."
                  className="pl-10 py-2 pr-4 w-full border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>
            
            {/* Instructions box */}
            {!userLocation && !loading && !locationLoading && (
              <div className="mt-6 bg-blue-50 p-5 rounded-lg border border-blue-200">
                <h3 className="text-md font-medium text-blue-800 mb-2">How to find resources</h3>
                <ol className="list-decimal list-inside text-sm text-blue-700 space-y-1">
                  <li>Enter your ZIP code or use your current location</li>
                  <li>Browse nearby food resources</li>
                  <li>Filter results based on your needs</li>
                  <li>Click "Get Directions" to visit an agency</li>
                </ol>
              </div>
            )}
          </div>
          
          <div className="lg:col-span-3">
            {/* Results count and location info */}
            {userLocation && !loading && !locationLoading && (
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {filteredAgencies.length} Resources {userLocation ? 'Near You' : ''}
                </h2>
              </div>
            )}
            
            {/* Loading state */}
            {(loading || locationLoading) && (
              <div className="text-center py-12">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                <p className="mt-4 text-gray-500">
                  {locationLoading ? 'Finding resources near you...' : 'Loading resources...'}
                </p>
              </div>
            )}
            
            {/* No results state */}
            {!loading && !locationLoading && filteredAgencies.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg shadow-md">
                <div className="inline-block rounded-full bg-gray-100 p-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mt-4">No resources found</h3>
                <p className="text-gray-500 mt-2">Try a different location or search term.</p>
              </div>
            )}
            
            {/* Agency cards */}
            {!loading && !locationLoading && filteredAgencies.length > 0 && (
              <div className="grid gap-6 md:grid-cols-2">
                {filteredAgencies.map(agency => (
                  <AgencyCard key={agency.id || agency.name} agency={agency} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindNearbyAgenciesPage; 