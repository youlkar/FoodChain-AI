import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Apple, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, login, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Apple className="h-8 w-8 text-green-600" />
              <span className="ml-2 text-xl font-bold text-green-700">FoodConnect</span>
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link 
                to="/" 
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-700 hover:text-green-600 hover:border-green-600"
              >
                Home
              </Link>
              <Link 
                to="/resources" 
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-700 hover:text-green-600 hover:border-green-600"
              >
                Find Food
              </Link>
              <Link 
                to="/about" 
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-700 hover:text-green-600 hover:border-green-600"
              >
                About
              </Link>
              <Link 
                to="/community" 
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-700 hover:text-green-600 hover:border-green-600"
              >
                Community
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="flex items-center">
                  {user.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt={user.name} 
                      className="h-8 w-8 rounded-full"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-green-100 text-green-800 flex items-center justify-center font-bold">
                      {user.name?.charAt(0)}
                    </div>
                  )}
                  <span className="ml-2 text-sm font-medium text-gray-700">
                    {user.name}
                  </span>
                </Link>
                <button
                  onClick={logout}
                  className="text-sm font-medium text-gray-700 hover:text-green-600"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={login}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
              >
                <LogIn className="mr-2 h-4 w-4" />
                Sign in
              </button>
            )}
          </div>
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-600 focus:outline-none"
            >
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 hover:border-green-600"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/resources"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 hover:border-green-600"
              onClick={() => setIsOpen(false)}
            >
              Find Food
            </Link>
            <Link
              to="/about"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 hover:border-green-600"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              to="/community"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 hover:border-green-600"
              onClick={() => setIsOpen(false)}
            >
              Community
            </Link>
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 hover:border-green-600"
                  onClick={() => setIsOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 hover:border-green-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  login();
                  setIsOpen(false);
                }}
                className="block w-full text-left pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 hover:border-green-600"
              >
                Sign in
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;