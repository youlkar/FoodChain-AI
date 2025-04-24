import React from 'react';
import { Agency } from '../types';
import { MapPin, Phone, Clock, Info, UsersRound, Package } from 'lucide-react';

interface AgencyCardProps {
  agency: Agency;
}

const AgencyCard: React.FC<AgencyCardProps> = ({ agency }) => {
  // Format distance with appropriate accuracy
  const formatDistance = (distance: number | undefined) => {
    if (distance === undefined || distance === null) return undefined;
    if (!isFinite(distance)) return undefined;
    
    // Ensure positive value
    distance = Math.abs(distance);
    
    // For very close distances (less than 0.1 mile)
    if (distance < 0.1) {
      return "< 0.1";
    }
    // For distances less than 1 mile, show one decimal place
    else if (distance < 1) {
      return distance.toFixed(1);
    }
    // For distances between 1-10 miles, show one decimal place
    else if (distance < 10) {
      return distance.toFixed(1);
    }
    // For distances 10-100 miles, show whole numbers
    else if (distance < 100) {
      return Math.round(distance);
    }
    // For very large distances, cap at "100+"
    else {
      return "100+";
    }
  };
  
  const distanceDisplay = formatDistance(agency.distance);
  
  // Add color coding based on distance
  const getDistanceBadgeColor = (distance: number | undefined) => {
    if (distance === undefined || !isFinite(distance)) return "bg-blue-100 text-blue-800";
    
    if (distance < 3) {
      return "bg-green-100 text-green-800"; // Very close
    } else if (distance < 8) {
      return "bg-blue-100 text-blue-800"; // Close
    } else if (distance < 15) {
      return "bg-yellow-100 text-yellow-800"; // Moderate
    } else if (distance < 30) {
      return "bg-orange-100 text-orange-800"; // Far
    } else {
      return "bg-purple-100 text-purple-800"; // Very far
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-lg flex flex-col h-full">
      <div className="p-5 flex-grow flex flex-col">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{agency.name}</h3>
          {distanceDisplay !== undefined && (
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getDistanceBadgeColor(agency.distance)}`}>
              {distanceDisplay} {distanceDisplay === '1' || distanceDisplay === '1.0' ? 'mile' : 'miles'} away
            </span>
          )}
        </div>
        
        {agency.address && (
          <div className="flex items-center text-gray-600 mb-2">
            <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
            <span className="text-sm">{agency.address}</span>
          </div>
        )}
        
        {agency.phone && (
          <div className="flex items-center text-gray-600 mb-2">
            <Phone className="h-4 w-4 mr-1 flex-shrink-0" />
            <span className="text-sm">{agency.phone}</span>
          </div>
        )}
        
        {agency.hours && (
          <div className="flex items-start text-gray-600 mb-2">
            <Clock className="h-4 w-4 mr-1 mt-1 flex-shrink-0" />
            <span className="text-sm">{agency.hours}</span>
          </div>
        )}
        
        {agency.appointment_needed === "Yes" && (
          <div className="mt-3 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 mb-2">
            By Appointment Only
          </div>
        )}
        
        {agency.requirements && (
          <div className="mt-3 flex items-start">
            <Info className="h-4 w-4 mr-1 mt-1 flex-shrink-0 text-blue-500" />
            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">Requirements:</p>
              <p className="text-sm text-gray-600">{agency.requirements}</p>
            </div>
          </div>
        )}
        
        {agency.distribution_model && (
          <div className="mt-3 flex items-start">
            <Package className="h-4 w-4 mr-1 mt-1 flex-shrink-0 text-green-500" />
            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">Distribution Model:</p>
              <p className="text-sm text-gray-600">{agency.distribution_model}</p>
            </div>
          </div>
        )}
        
        {agency.notes && (
          <div className="mt-3 flex items-start">
            <Info className="h-4 w-4 mr-1 mt-1 flex-shrink-0 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">Additional Notes:</p>
              <p className="text-sm text-gray-600">{agency.notes}</p>
            </div>
          </div>
        )}
        
        {agency.cultures_served && agency.cultures_served.length > 0 && (
          <div className="mt-3 flex items-start">
            <UsersRound className="h-4 w-4 mr-1 mt-1 flex-shrink-0 text-purple-500" />
            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">Cultural Populations Served:</p>
              <div className="flex flex-wrap gap-1">
                {agency.cultures_served.map((culture, index) => (
                  <span 
                    key={index} 
                    className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800"
                  >
                    {culture}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
        
        <div className="mt-4 mt-auto">
          <a 
            href={`https://maps.google.com/?q=${encodeURIComponent(agency.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-block text-center bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded font-medium transition-colors"
          >
            Get Directions
          </a>
        </div>
      </div>
    </div>
  );
};

export default AgencyCard; 