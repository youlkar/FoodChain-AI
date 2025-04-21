import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const HeroSection: React.FC = () => {
  const [zipCode, setZipCode] = useState('');
  const navigate = useNavigate();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (zipCode) {
      // Navigate to resources page with the ZIP code as a query parameter
      navigate(`/resources?zipCode=${zipCode}`);
    }
  };
  
  return (
    <div className="relative bg-green-700 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-green-900 to-green-600 mix-blend-multiply" />
        <img
          src="https://images.pexels.com/photos/6646868/pexels-photo-6646868.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Food Bank Volunteers"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Find Food Resources<br />
          <span className="text-green-200">In Your Community</span>
        </h1>
        <p className="mt-6 max-w-xl text-xl text-green-100">
          Connecting people with food assistance programs, food banks, and community resources to help address food insecurity.
        </p>
        <div className="mt-10 max-w-xl">
          <form onSubmit={handleSearch} className="bg-white p-3 rounded-lg shadow-lg flex flex-col sm:flex-row">
            <div className="flex-grow mb-3 sm:mb-0 sm:mr-3">
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Enter your zip code"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="block w-full pl-10 py-3 border-gray-300 focus:ring-green-500 focus:border-green-500 rounded-md"
                />
              </div>
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <Search className="h-5 w-5 mr-2" />
              Find Food
            </button>
          </form>
          <p className="mt-3 text-sm text-green-200">
            No signup required to find resources. Your privacy matters to us.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;