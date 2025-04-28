import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Settings, Bookmark, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ResourceCard from '../components/ResourceCard';
import { Resource } from '../types';

// Mock resources data - this would come from your API in a real app
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
  }
];

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('saved');
  const [savedResources, setSavedResources] = useState<Resource[]>([]);
  
  // Update document title
  React.useEffect(() => {
    document.title = 'Your Profile | FoodChain AI';
  }, []);
  
  // Get saved resources
  useEffect(() => {
    if (user?.savedResources) {
      // In a real app, you would fetch these from your API
      // For now, we'll filter the mock resources based on saved IDs
      const filtered = mockResources.filter(resource => 
        user.savedResources?.includes(resource.id)
      );
      setSavedResources(filtered);
    }
  }, [user]);
  
  // Handle unsave resource
  const handleUnsaveResource = (id: string) => {
    if (!user) return;
    
    // Update user's saved resources
    const updatedSavedResources = (user.savedResources || [])
      .filter(resourceId => resourceId !== id);
    
    // In a real app, this would update the user in the database
    // For now, we'll just update the local storage
    const updatedUser = {
      ...user,
      savedResources: updatedSavedResources
    };
    
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    // Update the displayed saved resources
    setSavedResources(savedResources.filter(resource => resource.id !== id));
  };
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };
  
  if (!user) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-green-700 px-6 py-16 sm:px-10">
            <div className="flex flex-col sm:flex-row items-center">
              {user.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt={user.name} 
                  className="h-24 w-24 rounded-full object-cover border-4 border-white shadow-lg"
                />
              ) : (
                <div className="h-24 w-24 rounded-full bg-green-100 text-green-800 flex items-center justify-center text-3xl font-bold border-4 border-white shadow-lg">
                  {user.name?.charAt(0)}
                </div>
              )}
              <div className="mt-6 sm:mt-0 sm:ml-6 text-center sm:text-left">
                <h1 className="text-2xl font-bold text-white sm:text-3xl">
                  {user.name}
                </h1>
                <p className="text-green-100 mt-1">
                  {user.email}
                </p>
                <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-2">
                  <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-green-800 hover:bg-green-900">
                    <Settings className="h-4 w-4 mr-1" />
                    Account Settings
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="inline-flex items-center px-3 py-1.5 border border-white text-sm font-medium rounded-full text-white hover:bg-green-800"
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-b border-gray-200">
            <div className="px-6 sm:px-10">
              <nav className="-mb-px flex space-x-6">
                <button
                  onClick={() => setActiveTab('saved')}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'saved'
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Bookmark className="h-5 w-5 inline mr-1" />
                  Saved Resources
                </button>
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'profile'
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <User className="h-5 w-5 inline mr-1" />
                  Profile Information
                </button>
              </nav>
            </div>
          </div>
          
          <div className="px-6 py-8 sm:px-10">
            {activeTab === 'saved' && (
              <>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Your Saved Resources
                </h2>
                
                {savedResources.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {savedResources.map(resource => (
                      <ResourceCard 
                        key={resource.id} 
                        resource={resource}
                        onSave={handleUnsaveResource}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 bg-gray-50 rounded-lg">
                    <Bookmark className="h-12 w-12 mx-auto text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No saved resources</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      You haven't saved any resources yet.
                    </p>
                    <div className="mt-6">
                      <button
                        onClick={() => navigate('/resources')}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
                      >
                        Find Resources
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
            
            {activeTab === 'profile' && (
              <div className="max-w-lg mx-auto">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Profile Information
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={user.name}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      disabled
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={user.email}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      disabled
                    />
                  </div>
                  
                  <p className="text-sm text-gray-500">
                    To update your profile information, please contact support.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;