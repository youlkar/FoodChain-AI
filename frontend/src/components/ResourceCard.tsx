import React from 'react';
import { Resource } from '../types';
import { MapPin, Phone, Clock, Globe, Info, BookmarkPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface ResourceCardProps {
  resource: Resource;
  onSave?: (id: string) => void;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource, onSave }) => {
  const { user } = useAuth();
  const isResourceSaved = user?.savedResources?.includes(resource.id);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-lg">
      {resource.image ? (
        <img 
          src={resource.image} 
          alt={resource.name} 
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-green-100 flex items-center justify-center">
          <span className="text-green-800 font-semibold text-lg">Food Resource</span>
        </div>
      )}
      <div className="p-5">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{resource.name}</h3>
          {user && (
            <button 
              onClick={() => onSave && onSave(resource.id)}
              className={`p-1 rounded-full ${isResourceSaved ? 'text-green-600 bg-green-100' : 'text-gray-400 hover:text-green-600'}`}
              aria-label={isResourceSaved ? "Remove from saved" : "Save resource"}
            >
              <BookmarkPlus className="h-5 w-5" />
            </button>
          )}
        </div>
        
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{resource.address}</span>
        </div>
        
        {resource.phone && (
          <div className="flex items-center text-gray-600 mb-2">
            <Phone className="h-4 w-4 mr-1" />
            <span className="text-sm">{resource.phone}</span>
          </div>
        )}
        
        {resource.hours && (
          <div className="flex items-center text-gray-600 mb-2">
            <Clock className="h-4 w-4 mr-1" />
            <span className="text-sm">{resource.hours}</span>
          </div>
        )}
        
        {resource.website && (
          <div className="flex items-center text-gray-600 mb-2">
            <Globe className="h-4 w-4 mr-1" />
            <a href={resource.website} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
              Visit Website
            </a>
          </div>
        )}
        
        <p className="text-gray-700 mt-3 mb-3">{resource.description}</p>
        
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
            {resource.type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </span>
          
          {resource.requirements && (
            <div className="mt-3 flex items-start">
              <Info className="h-4 w-4 mr-1 text-blue-500 mt-0.5" />
              <p className="text-sm text-gray-700">{resource.requirements}</p>
            </div>
          )}
        </div>
        
        <div className="mt-5">
          <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded font-medium transition-colors">
            Get Directions
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;