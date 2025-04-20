import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin } from 'lucide-react';
import ResourceCard from '../components/ResourceCard';
import { Resource } from '../types';
import { useAuth } from '../context/AuthContext';

// Mock resources data
const mockResources: Resource[] = [
  {
    id: '1',
    name: 'Community Food Bank',
    description: 'Providing groceries and essential items to individuals and families in need. No documentation required.',
    address: '123 Main St, Anytown, USA',
    phone: '(555) 123-4567',
    website: 'https://example.com/food-bank',
    hours: 'Mon-Fri: 9am-5pm, Sat: 10am-2pm',
    type: 'food-bank',
    requirements: 'No ID required. Available to all residents.',
    image: 'https://images.pexels.com/photos/6647037/pexels-photo-6647037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '2',
    name: 'Hope Kitchen',
    description: 'Serving hot meals daily to anyone in need. Come as you are, no questions asked.',
    address: '456 Oak St, Anytown, USA',
    phone: '(555) 987-6543',
    hours: 'Daily: 11am-1pm, 5pm-7pm',
    type: 'soup-kitchen',
    image: 'https://images.pexels.com/photos/5538583/pexels-photo-5538583.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '3',
    name: 'Fresh Market Food Pantry',
    description: 'Offering fresh produce, dairy, and other groceries to community members in need.',
    address: '789 Elm St, Anytown, USA',
    phone: '(555) 456-7890',
    website: 'https://example.com/fresh-market',
    hours: 'Tue, Thu: 1pm-6pm, Sat: 9am-12pm',
    type: 'food-bank',
    requirements: 'Please bring ID and proof of address if possible.',
    image: 'https://images.pexels.com/photos/5409669/pexels-photo-5409669.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '4',
    name: 'Senior Meals Program',
    description: 'Nutritious meal delivery for seniors aged 65+ who have difficulty shopping or cooking.',
    address: '101 Pine St, Anytown, USA',
    phone: '(555) 234-5678',
    website: 'https://example.com/senior-meals',
    type: 'meal-program',
    requirements: 'Age 65+ or disabled. Registration required.',
    image: 'https://images.pexels.com/photos/6994965/pexels-photo-6994965.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '5',
    name: 'Neighborhood Pantry',
    description: 'Community-run pantry providing emergency food assistance.',
    address: '202 Maple St, Anytown, USA',
    hours: 'Mon, Wed, Fri: 3pm-7pm',
    type: 'food-bank',
    image: 'https://images.pexels.com/photos/6590920/pexels-photo-6590920.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '6',
    name: 'Family Support Center',
    description: 'Comprehensive support including food assistance, case management, and referrals.',
    address: '303 Cedar St, Anytown, USA',
    phone: '(555) 345-6789',
    website: 'https://example.com/family-support',
    hours: 'Mon-Fri: 8am-6pm',
    type: 'grocery-assistance',
    requirements: 'Households with children under 18.',
    image: 'https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
];

const ResourcesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('');
  const [resources, setResources] = useState<Resource[]>(mockResources);
  const [filteredResources, setFilteredResources] = useState<Resource[]>(mockResources);
  const { user } = useAuth();
  
  // Update document title
  React.useEffect(() => {
    document.title = 'Find Food Resources | FoodConnect';
  }, []);

  // Filter resources based on search term and filter type
  useEffect(() => {
    let filtered = resources;
    
    if (searchTerm) {
      filtered = filtered.filter(
        resource => 
          resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          resource.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (filterType) {
      filtered = filtered.filter(resource => resource.type === filterType);
    }
    
    setFilteredResources(filtered);
  }, [searchTerm, filterType, resources]);

  // Mock function to save a resource to user's saved resources
  const handleSaveResource = (id: string) => {
    if (!user) return;
    
    // Update user's saved resources
    const savedResources = user.savedResources || [];
    const isAlreadySaved = savedResources.includes(id);
    
    const updatedSavedResources = isAlreadySaved
      ? savedResources.filter(resourceId => resourceId !== id)
      : [...savedResources, id];
    
    // In a real app, this would update the user in the database
    // For now, we'll just update the local storage
    const updatedUser = {
      ...user,
      savedResources: updatedSavedResources
    };
    
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    // You might want to show a toast or notification here
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
              Locate food banks, meal programs, and other assistance in your area.
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
                    placeholder="Enter your zip code or address"
                    className="block w-full pl-10 py-3 border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <button className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                  <Search className="h-5 w-5 mr-2" />
                  Search
                </button>
              </div>
              
              <div className="mt-4 flex flex-wrap gap-2">
                <button 
                  onClick={() => setFilterType('')}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${filterType === '' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                  All
                </button>
                <button 
                  onClick={() => setFilterType('food-bank')}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${filterType === 'food-bank' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                  Food Banks
                </button>
                <button 
                  onClick={() => setFilterType('soup-kitchen')}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${filterType === 'soup-kitchen' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                  Soup Kitchens
                </button>
                <button 
                  onClick={() => setFilterType('meal-program')}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${filterType === 'meal-program' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                  Meal Programs
                </button>
                <button 
                  onClick={() => setFilterType('grocery-assistance')}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${filterType === 'grocery-assistance' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                  Grocery Assistance
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Resources {filterType && `(${filterType.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')})`}
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
        
        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResources.map(resource => (
              <ResourceCard 
                key={resource.id} 
                resource={resource}
                onSave={handleSaveResource}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <Filter className="h-12 w-12 mx-auto text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No resources found</h3>
            <p className="text-gray-500">Try adjusting your search or filters to find resources in your area.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourcesPage;