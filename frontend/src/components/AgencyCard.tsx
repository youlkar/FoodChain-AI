import React from 'react';
import { Agency, TimeSlot } from '../types';
import { MapPin, Phone, Clock, Info, UsersRound, Package, ShoppingBag } from 'lucide-react';

// Food format types to infer
const FOOD_FORMATS = [
  { id: 'groceries', label: 'Groceries', keywords: ['grocer', 'food pantry', 'pantry', 'food bank', 'dry goods'] },
  { 
    id: 'prepared-meals', 
    label: 'Prepared Meals', 
    keywords: ['meal', 'hot food', 'cooked', 'prepared', 'ready-to-eat', 'ready to eat', 'boxed lunch', 'lunch', 'dinner'] 
  },
  { id: 'fresh-produce', label: 'Fresh Produce', keywords: ['produce', 'fresh', 'vegetable', 'fruit', 'veggies'] },
  { id: 'canned-goods', label: 'Canned Goods', keywords: ['canned', 'non-perishable', 'can'] },
  { id: 'pantry-items', label: 'Pantry Items', keywords: ['pantry', 'non-perishable', 'dry goods', 'staple'] }
];

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
  
  // Format hours from structured format to display string
  const formatHours = (hours: any): string => {
    // Handle null/undefined case
    if (!hours) return '';
    
    // Handle legacy string format
    if (typeof hours === 'string') return hours;
    
    try {
      // Must be an object at this point - process as new format
      const formattedHours: string[] = [];
      
      // Sort days in week order
      const dayOrder: { [key: string]: number } = {
        "Monday": 1, "Tuesday": 2, "Wednesday": 3, "Thursday": 4, 
        "Friday": 5, "Saturday": 6, "Sunday": 7
      };
      
      const sortedDays = Object.keys(hours).sort((a, b) => {
        return (dayOrder[a] || 99) - (dayOrder[b] || 99);
      });
      
      // Format each day's hours
      for (const day of sortedDays) {
        const timeSlots = hours[day];
        if (timeSlots && Array.isArray(timeSlots) && timeSlots.length > 0) {
          const formattedTimeSlots = timeSlots.map((slot: any) => {
            if (!slot || !slot.start || !slot.end) return '';
            
            // Convert 24-hour format to 12-hour format for display
            const formatTimeDisplay = (timeStr: string): string => {
              try {
                const parts = timeStr.split(':');
                if (parts.length < 2) return timeStr;
                
                const hours = parseInt(parts[0], 10);
                const minutes = parts[1];
                
                if (isNaN(hours)) return timeStr;
                
                const suffix = hours >= 12 ? 'PM' : 'AM';
                const displayHour = hours % 12 || 12;
                return `${displayHour}:${minutes} ${suffix}`;
              } catch {
                return timeStr;
              }
            };
            
            return `${formatTimeDisplay(slot.start)} to ${formatTimeDisplay(slot.end)}`;
          }).filter(Boolean);
          
          if (formattedTimeSlots.length > 0) {
            formattedHours.push(`${day}: ${formattedTimeSlots.join(', ')}`);
          }
        }
      }
      
      return formattedHours.join('; ');
    } catch (error) {
      console.error('Error formatting hours:', error);
      return typeof hours === 'object' ? 'Hours information available' : 'Hours information unavailable';
    }
  };
  
  // Infer food formats from agency data
  const inferFoodFormats = (): string[] => {
    if (agency.food_format) return [agency.food_format];
    
    const notesLower = agency.notes ? agency.notes.toLowerCase() : '';
    const distributionLower = agency.distribution_model ? agency.distribution_model.toLowerCase() : '';
    
    return FOOD_FORMATS
      .filter(format => {
        return format.keywords.some(keyword => 
          notesLower.includes(keyword) || distributionLower.includes(keyword)
        );
      })
      .map(format => format.label);
  };
  
  // Get inferred food formats
  const foodFormats = inferFoodFormats();
  
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
            <span className="text-sm">{formatHours(agency.hours)}</span>
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
        
        {foodFormats.length > 0 && (
          <div className="mt-3 flex items-start">
            <ShoppingBag className="h-4 w-4 mr-1 mt-1 flex-shrink-0 text-orange-500" />
            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">Food Formats:</p>
              <div className="flex flex-wrap gap-1">
                {foodFormats.map((format, index) => (
                  <span 
                    key={index} 
                    className="px-2 py-1 text-xs rounded-full bg-orange-100 text-orange-800"
                  >
                    {format}
                  </span>
                ))}
              </div>
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