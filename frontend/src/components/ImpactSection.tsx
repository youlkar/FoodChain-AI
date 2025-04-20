import React from 'react';
import { Users, BarChart, Target, Clock } from 'lucide-react';

const ImpactSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            The Reality of Food Insecurity
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Understanding the scope and impact of food insecurity in our communities.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-y-12 gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="text-center">
            <div className="flex items-center justify-center h-16 w-16 rounded-md bg-green-100 mx-auto">
              <Users className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="mt-6 text-2xl font-bold text-gray-900">1 in 9</h3>
            <p className="mt-2 text-base text-gray-500">
              Americans are currently facing food insecurity
            </p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center h-16 w-16 rounded-md bg-green-100 mx-auto">
              <Target className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="mt-6 text-2xl font-bold text-gray-900">13.5 Million</h3>
            <p className="mt-2 text-base text-gray-500">
              Children live in food insecure households
            </p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center h-16 w-16 rounded-md bg-green-100 mx-auto">
              <BarChart className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="mt-6 text-2xl font-bold text-gray-900">60%</h3>
            <p className="mt-2 text-base text-gray-500">
              Of food insecure households participate in federal food programs
            </p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center h-16 w-16 rounded-md bg-green-100 mx-auto">
              <Clock className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="mt-6 text-2xl font-bold text-gray-900">8 Hours</h3>
            <p className="mt-2 text-base text-gray-500">
              Average weekly time spent seeking food assistance
            </p>
          </div>
        </div>

        <div className="mt-16 bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-8 sm:p-10">
            <h3 className="text-xl font-semibold text-gray-900">Food Insecurity Affects Everyone</h3>
            <div className="mt-4 text-gray-600">
              <p>
                Food insecurity doesn't discriminate. It affects people of all ages, races, and backgrounds. 
                Many working families struggle to make ends meet and put food on the table. 
                Seniors on fixed incomes, college students, and those with medical conditions face unique challenges.
              </p>
              <div className="mt-8 grid gap-4 grid-cols-1 sm:grid-cols-3">
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-medium text-orange-800">Children</h4>
                  <p className="mt-2 text-sm text-orange-700">
                    Children in food insecure homes are more likely to experience developmental issues and struggle in school.
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-800">Working Adults</h4>
                  <p className="mt-2 text-sm text-blue-700">
                    Many food insecure households have at least one working adult who cannot make ends meet.
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-medium text-purple-800">Seniors</h4>
                  <p className="mt-2 text-sm text-purple-700">
                    Many elderly individuals must choose between food and medicine on limited fixed incomes.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="px-6 py-4 bg-gray-50 sm:px-10">
            <a 
              href="/learn-more" 
              className="text-base font-medium text-green-600 hover:text-green-500"
            >
              Learn more about food insecurity <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;