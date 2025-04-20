import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Heart, Users } from 'lucide-react';

const CTASection: React.FC = () => {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            How You Can Help
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Join us in the fight against food insecurity in our communities.
          </p>
        </div>

        <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-3">
          <div className="bg-orange-50 rounded-lg p-6 border border-orange-100">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-orange-100 mb-4">
              <MapPin className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Find Local Resources</h3>
            <p className="mt-3 text-gray-600">
              Help others by sharing information about food resources in your community. Knowledge is power.
            </p>
            <div className="mt-5">
              <Link 
                to="/resources"
                className="inline-flex items-center text-orange-600 font-medium hover:text-orange-700"
              >
                Find Resources
                <svg className="ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                </svg>
              </Link>
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-6 border border-green-100">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-100 mb-4">
              <Heart className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Donate</h3>
            <p className="mt-3 text-gray-600">
              Support food banks and meal programs with financial donations or food contributions to make a direct impact.
            </p>
            <div className="mt-5">
              <Link 
                to="/donate"
                className="inline-flex items-center text-green-600 font-medium hover:text-green-700"
              >
                Make a Donation
                <svg className="ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                </svg>
              </Link>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 mb-4">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Volunteer</h3>
            <p className="mt-3 text-gray-600">
              Donate your time and skills to local food banks, kitchens, and meal delivery programs to help your neighbors.
            </p>
            <div className="mt-5">
              <Link 
                to="/volunteer"
                className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700"
              >
                Volunteer Opportunities
                <svg className="ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-green-600 rounded-lg shadow-xl overflow-hidden">
          <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
            <div className="lg:self-center lg:max-w-3xl">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                <span className="block">Ready to make a difference?</span>
              </h2>
              <p className="mt-4 text-lg leading-6 text-green-100">
                Join our community of volunteers, donors, and advocates working together to ensure no one goes hungry.
              </p>
              <div className="mt-8 space-y-4 sm:space-y-0 sm:flex sm:space-x-4">
                <Link
                  to="/get-involved"
                  className="flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-green-700 bg-white hover:bg-green-50"
                >
                  Get Involved
                </Link>
                <Link
                  to="/donate"
                  className="flex items-center justify-center px-5 py-3 border border-white text-base font-medium rounded-md shadow-sm text-white hover:bg-green-700"
                >
                  Donate Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;