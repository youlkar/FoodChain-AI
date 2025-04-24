import React from 'react';
import { Heart, Users, Award, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const AboutPage: React.FC = () => {
  // Update document title
  React.useEffect(() => {
    document.title = 'About Us | FoodConnect';
  }, []);

  const {t} = useTranslation();

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero section */}
      <div className="bg-green-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
            {t('about.mission')}
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-xl text-green-100">
            {t('about.missionText')}
          </p>
        </div>
      </div>

      {/* Mission and vision */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Who We Are</h2>
            <div className="mt-6 text-gray-600 space-y-6">
              <p>
                {t('about.whoWeAreContent1')}
              </p>
              <p>
                {t('about.whoWeAreContent2')}
              </p>
              <p>
              {t('about.whoWeAreContent3')}
              </p>
            </div>
            <div className="mt-8">
              <a href="/team" className="text-green-600 font-medium hover:text-green-700">
                Meet our team <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.pexels.com/photos/6646899/pexels-photo-6646899.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
              alt="Food bank volunteers working together" 
              className="rounded-lg shadow-xl"
            />
            <div className="absolute inset-0 rounded-lg shadow-inner border border-white/20"></div>
          </div>
        </div>
      </div>

      {/* Values section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Our Values</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              The principles that guide our work and our commitment to communities.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="bg-green-50 rounded-lg p-8 border border-green-100">
              <div className="h-12 w-12 bg-green-100 rounded-md flex items-center justify-center text-green-600">
                <Heart className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-medium text-gray-900">Compassion</h3>
              <p className="mt-2 text-gray-600">
                We approach our work with empathy and understanding, recognizing the dignity of every person seeking assistance.
              </p>
            </div>

            <div className="bg-blue-50 rounded-lg p-8 border border-blue-100">
              <div className="h-12 w-12 bg-blue-100 rounded-md flex items-center justify-center text-blue-600">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-medium text-gray-900">Community</h3>
              <p className="mt-2 text-gray-600">
                We believe in the power of community and that collective action is the most effective way to address food insecurity.
              </p>
            </div>

            <div className="bg-orange-50 rounded-lg p-8 border border-orange-100">
              <div className="h-12 w-12 bg-orange-100 rounded-md flex items-center justify-center text-orange-600">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-medium text-gray-900">Excellence</h3>
              <p className="mt-2 text-gray-600">
                We are committed to providing the highest quality information and resources to those who need it most.
              </p>
            </div>

            <div className="bg-purple-50 rounded-lg p-8 border border-purple-100">
              <div className="h-12 w-12 bg-purple-100 rounded-md flex items-center justify-center text-purple-600">
                <Globe className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-medium text-gray-900">Accessibility</h3>
              <p className="mt-2 text-gray-600">
                We strive to make our platform and services accessible to everyone, regardless of their circumstances.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Impact section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Our Impact</h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            How we're making a difference in communities across the country.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-4xl font-bold text-green-600">10,000+</div>
            <p className="mt-2 text-gray-600">People connected to food resources</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-4xl font-bold text-green-600">250+</div>
            <p className="mt-2 text-gray-600">Food banks and pantries in our network</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-4xl font-bold text-green-600">45</div>
            <p className="mt-2 text-gray-600">Communities served and growing</p>
          </div>
        </div>

        <div className="mt-12 bg-gray-100 rounded-lg p-8">
          <blockquote className="italic text-gray-700 text-lg">
            "FoodConnect has transformed how we connect with people in need. The platform has helped us reach 30% more families this year compared to last year."
          </blockquote>
          <div className="mt-4 font-medium text-gray-900">
            — Maria Rodriguez, Director of Community Food Bank
          </div>
        </div>
      </div>

      {/* Team section preview */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Our Team</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Dedicated professionals committed to fighting food insecurity.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <img 
                src="https://images.pexels.com/photos/3785424/pexels-photo-3785424.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1" 
                alt="Team member" 
                className="w-32 h-32 rounded-full mx-auto object-cover"
              />
              <h3 className="mt-4 text-lg font-medium text-gray-900">Sarah Johnson</h3>
              <p className="text-green-600">Executive Director</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <img 
                src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1" 
                alt="Team member" 
                className="w-32 h-32 rounded-full mx-auto object-cover"
              />
              <h3 className="mt-4 text-lg font-medium text-gray-900">Michael Lee</h3>
              <p className="text-green-600">Community Outreach</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <img 
                src="https://images.pexels.com/photos/6147369/pexels-photo-6147369.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1" 
                alt="Team member" 
                className="w-32 h-32 rounded-full mx-auto object-cover"
              />
              <h3 className="mt-4 text-lg font-medium text-gray-900">Aisha Patel</h3>
              <p className="text-green-600">Resource Coordinator</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <img 
                src="https://images.pexels.com/photos/8853534/pexels-photo-8853534.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1" 
                alt="Team member" 
                className="w-32 h-32 rounded-full mx-auto object-cover"
              />
              <h3 className="mt-4 text-lg font-medium text-gray-900">David Torres</h3>
              <p className="text-green-600">Technology Lead</p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <a 
              href="/team" 
              className="inline-flex items-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
            >
              Meet the full team
            </a>
          </div>
        </div>
      </div>

      {/* Contact section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-green-700 rounded-lg shadow-xl overflow-hidden">
          <div className="px-6 py-12 max-w-7xl mx-auto sm:px-10 lg:px-20">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-white">
                Get in Touch
              </h2>
              <p className="mt-4 text-lg text-green-100">
                Have questions or want to learn more about our work? We'd love to hear from you.
              </p>
              <div className="mt-8 flex justify-center">
                <a
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-green-700 bg-white hover:bg-green-50"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;