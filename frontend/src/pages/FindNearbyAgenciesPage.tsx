import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, Clock, Calendar, Users, Package } from 'lucide-react';
import LocationFinder from '../components/LocationFinder';
import AgencyCard from '../components/AgencyCard';
import { Agency, Hours, TimeSlot } from '../types';
import { sortAgenciesByDistance } from '../utils/routesApiUtils';
import { useTranslation } from 'react-i18next';

// Days of the week
const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// Time blocks for filtering
const TIME_BLOCKS = [
  { label: '12 AM - 6 AM', value: '0-6' },
  { label: '6 AM - 12 PM', value: '6-12' },
  { label: '12 PM - 6 PM', value: '12-18' },
  { label: '6 PM - 12 AM', value: '18-24' }
];

// Common cultural dietary options
const CULTURAL_OPTIONS = [
  'East African', 
  'West African',
  'Central/South Asian',
  'East Asian',
  'Eastern European',
  'Latin American',
  'Middle Eastern/North African'
];

// Food distribution models
const DISTRIBUTION_MODELS = [
  'Home Delivery',
  'Drive-thru',
  'Pickup',
  'Walk-up'
];

// Food format options
const FOOD_FORMATS = [
  'Groceries',
  'Prepared Meals',
  'Fresh Produce',
  'Canned Goods',
  'Pantry Items'
];

// Helper to detect food format from existing fields
const detectFoodFormat = (agency: Agency, format: string): boolean => {
  const formatLower = format.toLowerCase();
  const notesLower = agency.notes ? agency.notes.toLowerCase() : '';
  const distributionLower = agency.distribution_model ? agency.distribution_model.toLowerCase() : '';
  const foodFormatLower = agency.food_format ? agency.food_format.toLowerCase() : '';
  
  // Direct match if food_format exists
  if (foodFormatLower && foodFormatLower.includes(formatLower)) {
    return true;
  }
  
  // Infer from notes and distribution model
  switch (formatLower) {
    case 'groceries':
      return notesLower.includes('grocer') || 
             notesLower.includes('food pantry') || 
             distributionLower.includes('pantry') ||
             notesLower.includes('food bank') ||
             distributionLower.includes('food bank');
    case 'prepared meals':
      const preparedKeywords = ['meal', 'prepared', 'cooked', 'hot food', 'ready-to-eat', 
                              'ready to eat', 'boxed lunch', 'lunch', 'dinner'];
      return preparedKeywords.some(keyword => 
        notesLower.includes(keyword) || distributionLower.includes(keyword)
      );
    case 'fresh produce':
      return notesLower.includes('produce') || 
             notesLower.includes('fresh') || 
             notesLower.includes('vegetable') ||
             notesLower.includes('veggies') ||
             notesLower.includes('fruit');
    case 'canned goods':
      return notesLower.includes('canned') || 
             notesLower.includes('can') ||
             notesLower.includes('non-perishable');
    case 'pantry items':
      return notesLower.includes('pantry') || 
             notesLower.includes('non-perishable') ||
             notesLower.includes('dry goods') ||
             notesLower.includes('staple') ||
             distributionLower.includes('pantry');
    default:
      return notesLower.includes(formatLower) || distributionLower.includes(formatLower);
  }
};

const FindNearbyAgenciesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [filteredAgencies, setFilteredAgencies] = useState<Agency[]>([]);
  const [loading, setLoading] = useState(true);
  const [locationLoading, setLocationLoading] = useState(false);
  const [userLocation, setUserLocation] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter states
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedTimeBlocks, setSelectedTimeBlocks] = useState<string[]>([]);
  const [selectedCultures, setSelectedCultures] = useState<string[]>([]);
  const [selectedDistributionModels, setSelectedDistributionModels] = useState<string[]>([]);
  const [selectedFoodFormats, setSelectedFoodFormats] = useState<string[]>([]);
  const [preparedMealsOnly, setPreparedMealsOnly] = useState(false);
  const [homeDeliveryOnly, setHomeDeliveryOnly] = useState(false);
  const [filtersExpanded, setFiltersExpanded] = useState(false);

  const {t} = useTranslation();

  // Update the title
  useEffect(() => {
    document.title = 'Find Food Resources | FoodConnect';
  }, []);

  // Load agency data and check URL for initial location
  useEffect(() => {
    const fetchAgencyData = async () => {
      try {
        // Fetch agencies data from the JSON file
        // const response = await fetch('/src/data/agencies.json');
        const response = await fetch('/data/agencies.json');
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

  // Apply all filters when any filter changes
  useEffect(() => {
    if (!agencies.length) return;
    
    applyAllFilters();
  }, [searchTerm, selectedDays, selectedTimeBlocks, selectedCultures, selectedDistributionModels, selectedFoodFormats, preparedMealsOnly, homeDeliveryOnly, agencies]);

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
      
      // Update the main agency list
      setAgencies(sortedAgencies);
      
      // Filters will be applied via the useEffect
    } catch (error) {
      console.error('Error sorting agencies by distance:', error);
    } finally {
      setLocationLoading(false);
      setLoading(false);
    }
  };

  // Toggle a day selection
  const toggleDaySelection = (day: string) => {
    setSelectedDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day) 
        : [...prev, day]
    );
  };

  // Toggle a time block selection
  const toggleTimeBlockSelection = (timeBlock: string) => {
    setSelectedTimeBlocks(prev => 
      prev.includes(timeBlock) 
        ? prev.filter(t => t !== timeBlock) 
        : [...prev, timeBlock]
    );
  };

  // Toggle a culture selection
  const toggleCultureSelection = (culture: string) => {
    setSelectedCultures(prev => 
      prev.includes(culture) 
        ? prev.filter(c => c !== culture) 
        : [...prev, culture]
    );
  };

  // Toggle a distribution model selection
  const toggleDistributionModelSelection = (model: string) => {
    setSelectedDistributionModels(prev => 
      prev.includes(model) 
        ? prev.filter(m => m !== model) 
        : [...prev, model]
    );
  };

  // Toggle a food format selection
  const toggleFoodFormatSelection = (format: string) => {
    setSelectedFoodFormats(prev => 
      prev.includes(format) 
        ? prev.filter(f => f !== format) 
        : [...prev, format]
    );
  };

  // Helper to check if an agency is open on a specific day
  const isAgencyOpenOnDay = (agency: Agency, day: string): boolean => {
    if (!agency.hours) return false;
    
    // Cast to any to avoid TypeScript issues
    const hoursAny = agency.hours as any;
    
    // Handle object format (new structure)
    if (typeof hoursAny === 'object' && hoursAny !== null) {
      return Object.keys(hoursAny).includes(day);
    }
    
    // Handle string format (legacy)
    if (typeof hoursAny === 'string') {
      return hoursAny.toLowerCase().includes(day.toLowerCase());
    }
    
    return false;
  };

  // Helper to check if an agency is open during a specific time block
  const isAgencyOpenDuringTimeBlock = (agency: Agency, timeBlock: string): boolean => {
    if (!agency.hours) return false;
    
    // Cast to any to avoid TypeScript issues
    const hoursAny = agency.hours as any;
    const [startHour, endHour] = timeBlock.split('-').map(Number);
    
    // Handle object format (new structure)
    if (typeof hoursAny === 'object' && hoursAny !== null) {
      // Check each day's time slots
      return Object.entries(hoursAny).some(([day, timeSlots]) => {
        // Check if any time slot overlaps with the time block
        if (!Array.isArray(timeSlots)) return false;
        
        return timeSlots.some(slot => {
          if (!slot || typeof slot !== 'object') return false;
          
          try {
            // Parse the start and end times
            const slotStartHour = parseInt(String(slot.start).split(':')[0], 10);
            const slotEndHour = parseInt(String(slot.end).split(':')[0], 10);
            
            if (isNaN(slotStartHour) || isNaN(slotEndHour)) return false;
            
            // Check if this slot overlaps with the time block
            return (
              (slotStartHour >= startHour && slotStartHour < endHour) || // Start time is in the block
              (slotEndHour > startHour && slotEndHour <= endHour) || // End time is in the block
              (slotStartHour <= startHour && slotEndHour >= endHour) // Slot spans the entire block
            );
          } catch (error) {
            return false;
          }
        });
      });
    }
    
    // Handle string format (legacy)
    if (typeof hoursAny === 'string') {
      const hoursText = hoursAny.toLowerCase();
      
      // Check for AM/PM indicators within the time range
      if (startHour < 12 && endHour <= 12) {
        // Early morning to noon (AM hours)
        return hoursText.includes('am') ? true : false;
      } 
      
      if (startHour >= 12 && endHour > 12) {
        // Afternoon to night (PM hours)
        return hoursText.includes('pm') ? true : false;
      }
    }
    
    // Default to showing if we can't determine
    return true;
  };

  // Helper to check if an agency serves a specific culture
  const doesAgencyServeCulture = (agency: Agency, culture: string): boolean => {
    if (!agency.cultures_served || !agency.cultures_served.length) return false;
    return agency.cultures_served.some(c => c.toLowerCase().includes(culture.toLowerCase()));
  };

  // Helper to check if an agency offers prepared meals
  const doesAgencyOfferPreparedMeals = (agency: Agency): boolean => {
    const preparedKeywords = ['meal', 'prepared', 'cooked', 'hot food', 'ready-to-eat', 'ready to eat', 'boxed lunch'];
    
    // Check distribution model
    const distributionLower = agency.distribution_model ? 
      agency.distribution_model.toLowerCase() : '';
    
    // Check notes
    const notesLower = agency.notes ? 
      agency.notes.toLowerCase() : '';
    
    // Check food format if available
    const foodFormatLower = agency.food_format ? 
      agency.food_format.toLowerCase() : '';
    
    // Check for any of the prepared keywords in any field
    return preparedKeywords.some(keyword => 
      distributionLower.includes(keyword) || 
      notesLower.includes(keyword) || 
      foodFormatLower.includes(keyword)
    );
  };

  // Helper to check if an agency offers home delivery
  const doesAgencyOfferHomeDelivery = (agency: Agency): boolean => {
    return agency.distribution_model ? 
      agency.distribution_model.toLowerCase().includes('delivery') : false;
  };

  // Apply all filters
  const applyAllFilters = () => {
    let filtered = agencies;
    
    // Apply text search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(agency => 
        agency.name.toLowerCase().includes(term) ||
        agency.address.toLowerCase().includes(term) ||
        agency.requirements.toLowerCase().includes(term) ||
        (agency.distribution_model && agency.distribution_model.toLowerCase().includes(term)) ||
        (agency.notes && agency.notes.toLowerCase().includes(term)) ||
        (agency.cultures_served && agency.cultures_served.some(culture => 
          culture.toLowerCase().includes(term)
        ))
      );
    }
    
    // Apply day filters
    if (selectedDays.length > 0) {
      filtered = filtered.filter(agency => 
        selectedDays.some(day => isAgencyOpenOnDay(agency, day))
      );
    }
    
    // Apply time block filters
    if (selectedTimeBlocks.length > 0) {
      filtered = filtered.filter(agency => 
        selectedTimeBlocks.some(timeBlock => isAgencyOpenDuringTimeBlock(agency, timeBlock))
      );
    }
    
    // Apply culture filters
    if (selectedCultures.length > 0) {
      filtered = filtered.filter(agency => 
        selectedCultures.some(culture => doesAgencyServeCulture(agency, culture))
      );
    }
    
    // Apply distribution model filters
    if (selectedDistributionModels.length > 0) {
      filtered = filtered.filter(agency => 
        selectedDistributionModels.some(model => 
          agency.distribution_model ? 
            agency.distribution_model.toLowerCase().includes(model.toLowerCase()) : 
            false
        )
      );
    }
    
    // Apply food format filters
    if (selectedFoodFormats.length > 0) {
      filtered = filtered.filter(agency => 
        selectedFoodFormats.some(format => detectFoodFormat(agency, format))
      );
    }
    
    // Apply prepared meals filter
    if (preparedMealsOnly) {
      filtered = filtered.filter(agency => doesAgencyOfferPreparedMeals(agency));
    }
    
    // Apply home delivery filter
    if (homeDeliveryOnly) {
      filtered = filtered.filter(agency => doesAgencyOfferHomeDelivery(agency));
    }
    
    setFilteredAgencies(filtered);
  };

  // Handle search term filtering
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedDays([]);
    setSelectedTimeBlocks([]);
    setSelectedCultures([]);
    setSelectedDistributionModels([]);
    setSelectedFoodFormats([]);
    setPreparedMealsOnly(false);
    setHomeDeliveryOnly(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="pt-4 pb-6 px-4 sm:px-6 lg:px-8 bg-green-700 text-white">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold">{t('findAgencyPage.title')}</h1>
          <p className="mt-2">{t('findAgencyPage.subTitle')}</p>
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
            <div className="bg-white p-5 rounded-lg shadow-md mt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">{t('findAgencyPage.searchFilters')}</h3>
                <button 
                  onClick={() => setFiltersExpanded(!filtersExpanded)}
                  className="text-sm text-green-600 hover:text-green-800 flex items-center"
                >
                  <Filter className="h-4 w-4 mr-1" />
                  {filtersExpanded ? 'Hide Filters' : 'Show Filters'}
                </button>
              </div>
              
              <div className="relative mb-4">
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
              
              {filtersExpanded && (
                <>
                  {/* Day filter */}
                  <div className="mt-6">
                    <div className="flex items-center mb-2">
                      <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                      <h4 className="font-medium text-gray-700">Days Available</h4>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {DAYS_OF_WEEK.map(day => (
                        <button
                          key={day}
                          onClick={() => toggleDaySelection(day)}
                          className={`px-3 py-1 text-sm rounded-full transition-colors ${
                            selectedDays.includes(day)
                              ? 'bg-green-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {day.substring(0, 3)}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Time block filter */}
                  <div className="mt-6">
                    <div className="flex items-center mb-2">
                      <Clock className="h-5 w-5 text-gray-500 mr-2" />
                      <h4 className="font-medium text-gray-700">Hours</h4>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {TIME_BLOCKS.map(block => (
                        <button
                          key={block.value}
                          onClick={() => toggleTimeBlockSelection(block.value)}
                          className={`px-3 py-1 text-sm rounded-full transition-colors ${
                            selectedTimeBlocks.includes(block.value)
                              ? 'bg-green-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {block.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Cultural options filter */}
                  <div className="mt-6">
                    <div className="flex items-center mb-2">
                      <Users className="h-5 w-5 text-gray-500 mr-2" />
                      <h4 className="font-medium text-gray-700">Cultural Dietary Options</h4>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {CULTURAL_OPTIONS.map(culture => (
                        <button
                          key={culture}
                          onClick={() => toggleCultureSelection(culture)}
                          className={`px-3 py-1 text-sm rounded-full transition-colors ${
                            selectedCultures.includes(culture)
                              ? 'bg-green-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {culture}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Distribution model filter */}
                  <div className="mt-6">
                    <div className="flex items-center mb-2">
                      <Package className="h-5 w-5 text-gray-500 mr-2" />
                      <h4 className="font-medium text-gray-700">Distribution Models</h4>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {DISTRIBUTION_MODELS.map(model => (
                        <button
                          key={model}
                          onClick={() => toggleDistributionModelSelection(model)}
                          className={`px-3 py-1 text-sm rounded-full transition-colors ${
                            selectedDistributionModels.includes(model)
                              ? 'bg-green-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {model}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Food format filter */}
                  <div className="mt-6">
                    <div className="flex items-center mb-2">
                      <Package className="h-5 w-5 text-gray-500 mr-2" />
                      <h4 className="font-medium text-gray-700">Food Formats</h4>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {FOOD_FORMATS.map(format => (
                        <button
                          key={format}
                          onClick={() => toggleFoodFormatSelection(format)}
                          className={`px-3 py-1 text-sm rounded-full transition-colors ${
                            selectedFoodFormats.includes(format)
                              ? 'bg-green-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {format}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Food format and delivery filters */}
                  <div className="mt-6">
                    <div className="flex items-center mb-2">
                      <Package className="h-5 w-5 text-gray-500 mr-2" />
                      <h4 className="font-medium text-gray-700">Food Types & Delivery</h4>
                    </div>
                    <div className="space-y-3 mt-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={preparedMealsOnly}
                          onChange={() => setPreparedMealsOnly(!preparedMealsOnly)}
                          className="rounded border-gray-300 text-green-600 focus:ring-green-500 h-4 w-4"
                        />
                        <span className="ml-2 text-gray-700">Prepared Meals</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={homeDeliveryOnly}
                          onChange={() => setHomeDeliveryOnly(!homeDeliveryOnly)}
                          className="rounded border-gray-300 text-green-600 focus:ring-green-500 h-4 w-4"
                        />
                        <span className="ml-2 text-gray-700">Home Delivery</span>
                      </label>
                    </div>
                  </div>
                  
                  {/* Clear filters button */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <button
                      onClick={clearAllFilters}
                      className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      Clear All Filters
                    </button>
                  </div>
                </>
              )}
            </div>
            
            {/* Instructions box */}
            {!userLocation && !loading && !locationLoading && (
              <div className="mt-6 bg-blue-50 p-5 rounded-lg border border-blue-200">
                <h3 className="text-md font-medium text-blue-800 mb-2">{t('findAgencyPage.howToFindResources')}</h3>
                <ol className="list-decimal list-inside text-sm text-blue-700 space-y-1">
                  <li>{t('findAgencyPage.howToFindBullet1')}</li>
                  <li>{t('findAgencyPage.howToFindBullet2')}</li>
                  <li>{t('findAgencyPage.howToFindBullet3')}</li>
                  <li>{t('findAgencyPage.howToFindBullet4')}</li>
                </ol>
              </div>
            )}
          </div>
          
          <div className="lg:col-span-3">
            {/* Results count and active filters */}
            {userLocation && !loading && !locationLoading && (
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-2">
                <h2 className="text-2xl font-bold text-gray-900">
                  {filteredAgencies.length} {filteredAgencies.length === 1 ? 'Resource' : 'Resources'} {userLocation ? 'Near You' : ''}
                </h2>
                
                {/* Active filter tags */}
                {(selectedDays.length > 0 || selectedTimeBlocks.length > 0 || selectedCultures.length > 0 || selectedDistributionModels.length > 0 || selectedFoodFormats.length > 0 || preparedMealsOnly || homeDeliveryOnly) && (
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Filters: </span>
                    <div className="inline-flex flex-wrap gap-1 mt-1">
                      {selectedDays.length > 0 && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {selectedDays.length} days
                        </span>
                      )}
                      {selectedTimeBlocks.length > 0 && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          {selectedTimeBlocks.length} time slots
                        </span>
                      )}
                      {selectedCultures.length > 0 && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {selectedCultures.length} cultures
                        </span>
                      )}
                      {selectedDistributionModels.length > 0 && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          {selectedDistributionModels.length} distribution models
                        </span>
                      )}
                      {selectedFoodFormats.length > 0 && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
                          {selectedFoodFormats.length} food formats
                        </span>
                      )}
                      {preparedMealsOnly && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          prepared meals
                        </span>
                      )}
                      {homeDeliveryOnly && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          home delivery
                        </span>
                      )}
                    </div>
                  </div>
                )}
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
                <p className="text-gray-500 mt-2">Try adjusting your filters or search criteria.</p>
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