import React, { useState } from 'react';
import { MapPin, Phone, Globe, ExternalLink, Clock, Calendar, Info } from 'lucide-react';
import { Agency } from '../types';

interface ServiceCardProps {
  agency: Agency;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ agency }) => {
  const [showAllHours, setShowAllHours] = useState(false);
  
  // Get ordered days of the week
  const orderedDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const daysWithHours = agency.hours ? Object.keys(agency.hours).sort(
    (a, b) => orderedDays.indexOf(a) - orderedDays.indexOf(b)
  ) : [];
  
  // Format days open for display
  const formatDaysOpen = () => {
    if (!agency.days_open || agency.days_open.length === 0) return 'Hours not available';
    
    if (agency.days_open.length === 7) return 'Open daily';
    
    if (agency.days_open.length <= 3) {
      return agency.days_open.join(', ');
    }
    
    return `${agency.days_open[0]}-${agency.days_open[agency.days_open.length-1]}`;
  };

  // Truncate long text for better display
  const truncateText = (text: string, maxLength: number) => {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // Generate a color based on the agency name for the avatar
  const generateColor = (name: string) => {
    const colors = [
      'bg-blue-100 text-blue-800',
      'bg-green-100 text-green-800',
      'bg-yellow-100 text-yellow-800',
      'bg-red-100 text-red-800',
      'bg-indigo-100 text-indigo-800',
      'bg-purple-100 text-purple-800',
      'bg-pink-100 text-pink-800',
      'bg-teal-100 text-teal-800'
    ];
    
    // Simple hash function to get a consistent color
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return colors[Math.abs(hash) % colors.length];
  };

  // Generate Google Maps URL for directions
  const getDirectionsUrl = () => {
    if (!agency.address) return '#';
    const encodedAddress = encodeURIComponent(agency.address);
    return `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
  };

  const avatarColor = generateColor(agency.name);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-lg flex flex-col h-full">
      <div className={`h-24 ${avatarColor} flex items-center justify-center`}>
        <span className="text-2xl font-semibold">{agency.name.charAt(0)}</span>
      </div>
      
      <div className="p-5 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2" title={agency.name}>
          {truncateText(agency.name, 50)}
        </h3>
        
        {agency.address && (
          <div className="flex items-start text-gray-600 mb-3">
            <MapPin className="h-4 w-4 mt-1 mr-2 flex-shrink-0" />
            <span className="text-sm line-clamp-2" title={agency.address}>
              {truncateText(agency.address, 80)}
            </span>
          </div>
        )}
        
        {agency.phone && (
          <div className="flex items-center text-gray-600 mb-3">
            <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
            <a href={`tel:${agency.phone}`} className="text-sm text-blue-600 hover:underline">
              {agency.phone}
            </a>
          </div>
        )}
        
        {agency.website && (
          <div className="flex items-center text-gray-600 mb-3">
            <Globe className="h-4 w-4 mr-2 flex-shrink-0" />
            <a 
              href={agency.website} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm text-blue-600 hover:underline flex items-center"
            >
              Visit Website
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </div>
        )}
        
        {agency.days_open && agency.days_open.length > 0 && (
          <div className="flex items-start text-gray-600 mb-3">
            <Calendar className="h-4 w-4 mt-1 mr-2 flex-shrink-0" />
            <div>
              <span className="text-sm font-medium">Open: </span>
              <span className="text-sm">{formatDaysOpen()}</span>
              
              {daysWithHours.length > 0 && (
                <div className="mt-1">
                  {showAllHours ? (
                    <>
                      {daysWithHours.map(day => (
                        <div key={day} className="text-sm">
                          <span className="capitalize">{day}: </span>
                          <span>{agency.hours?.[day]}</span>
                        </div>
                      ))}
                      <button 
                        onClick={() => setShowAllHours(false)} 
                        className="text-xs text-green-600 mt-1 hover:underline"
                      >
                        Show less
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="text-sm">
                        <span className="capitalize">{daysWithHours[0]}: </span>
                        <span>{agency.hours?.[daysWithHours[0]]}</span>
                      </div>
                      {daysWithHours.length > 1 && (
                        <button 
                          onClick={() => setShowAllHours(true)} 
                          className="text-xs text-green-600 mt-1 hover:underline"
                        >
                          Show all hours
                        </button>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
        
        {agency.appointment_needed && (
          <div className="flex items-center text-gray-600 mb-3">
            <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
            <div className="text-sm">
              <span className="font-medium">Appointment needed: </span>
              <span>{agency.appointment_needed}</span>
            </div>
          </div>
        )}
        
        <div className="mt-4 mt-auto">
          <a 
            href={getDirectionsUrl()} 
            target="_blank" 
            rel="noopener noreferrer"
            className={`w-full inline-block text-center bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded font-medium transition-colors ${!agency.address ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={(e) => !agency.address && e.preventDefault()}
          >
            Get Directions
          </a>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard; 