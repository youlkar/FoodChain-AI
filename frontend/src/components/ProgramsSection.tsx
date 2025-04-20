import React from 'react';
import { FoodProgram } from '../types';
import { Utensils, ShoppingCart, Apple, Heart } from 'lucide-react';

const programs: FoodProgram[] = [
  {
    id: '1',
    title: 'SNAP / Food Stamps',
    description: 'The Supplemental Nutrition Assistance Program (SNAP) provides nutrition benefits to supplement the food budget of families in need.',
    eligibility: 'Eligibility based on household size and income.',
    link: '/resources/snap',
    icon: 'ShoppingCart'
  },
  {
    id: '2',
    title: 'Food Banks & Pantries',
    description: 'Local food banks and pantries provide groceries and essential items to individuals and families experiencing food insecurity.',
    eligibility: 'Varies by location. Many have no eligibility requirements.',
    link: '/resources/food-banks',
    icon: 'Apple'
  },
  {
    id: '3',
    title: 'Meal Programs',
    description: 'Community meal programs offer free hot meals in various locations throughout communities.',
    eligibility: 'Open to anyone in need. No documentation required.',
    link: '/resources/meals',
    icon: 'Utensils'
  },
  {
    id: '4',
    title: 'WIC Program',
    description: 'The Special Supplemental Nutrition Program for Women, Infants, and Children (WIC) provides nutrition support for mothers and young children.',
    eligibility: 'Pregnant, breastfeeding, and postpartum women, and children up to age 5.',
    link: '/resources/wic',
    icon: 'Heart'
  }
];

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'ShoppingCart':
      return <ShoppingCart className="h-6 w-6 text-green-600" />;
    case 'Apple':
      return <Apple className="h-6 w-6 text-green-600" />;
    case 'Utensils':
      return <Utensils className="h-6 w-6 text-green-600" />;
    case 'Heart':
      return <Heart className="h-6 w-6 text-green-600" />;
    default:
      return <Apple className="h-6 w-6 text-green-600" />;
  }
};

const ProgramsSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Food Assistance Programs
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Learn about programs available to help you and your family access nutritious food.
          </p>
        </div>

        <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {programs.map((program) => (
            <div 
              key={program.id} 
              className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-100 mb-4">
                {getIcon(program.icon)}
              </div>
              <h3 className="text-lg font-medium text-gray-900">{program.title}</h3>
              <p className="mt-2 text-sm text-gray-500">{program.description}</p>
              <div className="mt-4 bg-gray-50 p-3 rounded-md">
                <p className="text-xs font-medium text-gray-500 uppercase">Eligibility</p>
                <p className="text-sm text-gray-700">{program.eligibility}</p>
              </div>
              <div className="mt-4">
                <a 
                  href={program.link}
                  className="inline-flex items-center text-sm font-medium text-green-600 hover:text-green-700"
                >
                  Learn more
                  <svg className="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;