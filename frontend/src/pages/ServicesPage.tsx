import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Service, Agency } from '../types';
import ServiceCard from '../components/ServiceCard';
import { ArrowLeft, Search, FilterX, Loader } from 'lucide-react';
import servicesData from '../data/services.json';

// Define types for the imported JSON data
interface ServicesData {
  services: Array<{id: string, name: string}>;
  agencyData: Record<string, Agency[]>;
}

// Type assertion for the imported data
const typedServicesData = servicesData as ServicesData;

const ServicesPage: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const services = typedServicesData.services;
  const agencyData = typedServicesData.agencyData;

  useEffect(() => {
    setLoading(true);
    
    if (serviceId) {
      const service = services.find(s => s.id === serviceId);
      if (service) {
        const agencies = serviceId in agencyData ? agencyData[serviceId] : [];
        setSelectedService({ ...service, agencies });
      }
    } else {
      setSelectedService(null);
    }
    // Reset search when changing services
    setSearchTerm('');
    
    // Simulate loading to ensure transitions feel smooth
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [serviceId, services, agencyData]);

  // Filter agencies based on search term
  const filteredAgencies = selectedService?.agencies.filter(agency => 
    searchTerm === '' || 
    agency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (agency.address && agency.address.toLowerCase().includes(searchTerm.toLowerCase()))
  ) || [];

  // Loading indicator component
  const LoadingIndicator = () => (
    <div className="flex justify-center items-center py-20">
      <Loader className="w-8 h-8 text-green-600 animate-spin" />
      <span className="ml-2 text-gray-600">Loading...</span>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {loading ? (
        <LoadingIndicator />
      ) : selectedService ? (
        <>
          <div className="mb-6">
            <Link 
              to="/services" 
              className="inline-flex items-center text-green-600 hover:text-green-700"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to all services
            </Link>
            <h1 className="text-3xl font-bold text-gray-800 mt-2">{selectedService.name}</h1>
            <p className="text-gray-600 mt-2 mb-6">
              Showing agencies that provide {selectedService.name.toLowerCase()} services
            </p>
            
            {/* Search bar */}
            <div className="relative w-full md:w-96 mb-8">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                placeholder="Search by name or address..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button 
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setSearchTerm('')}
                  aria-label="Clear search"
                >
                  <FilterX className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>
            
            {filteredAgencies.length > 0 ? (
              <>
                <p className="text-sm text-gray-500 mb-4">
                  Found {filteredAgencies.length} {filteredAgencies.length === 1 ? 'agency' : 'agencies'}
                  {searchTerm && ' matching your search'}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAgencies.map(agency => (
                    <ServiceCard key={agency.id} agency={agency} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-10 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-medium text-gray-700">No agencies found</h3>
                {searchTerm ? (
                  <p className="text-gray-500 mt-2">
                    No agencies match your search. Try different keywords or 
                    <button 
                      onClick={() => setSearchTerm('')}
                      className="text-green-600 hover:underline ml-1"
                    >
                      clear the search
                    </button>
                  </p>
                ) : (
                  <p className="text-gray-500 mt-2">
                    There are currently no agencies offering this service in our database.
                  </p>
                )}
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Wraparound Services</h1>
          <p className="text-gray-600 mb-8 max-w-3xl">
            In addition to food assistance, our partner agencies offer a variety of other services to help meet your needs. 
            Select a service category below to see agencies that can help.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map(service => (
              <Link 
                key={service.id} 
                to={`/services/${service.id}`}
                className="bg-white rounded-lg shadow-md hover:shadow-lg p-6 transition-all hover:scale-[1.02] border border-gray-100"
              >
                <h3 className="text-xl font-semibold text-gray-800">{service.name}</h3>
                <p className="text-gray-500 mt-2 text-sm">
                  {service.id in agencyData ? `${agencyData[service.id].length} agencies available` : 'No agencies available'}
                </p>
                <div className="mt-4 text-green-600 text-sm font-medium">
                  View agencies →
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ServicesPage; 