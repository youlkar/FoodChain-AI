import React from 'react';
import HeroSection from '../components/HeroSection';
import ProgramsSection from '../components/ProgramsSection';
import ImpactSection from '../components/ImpactSection';
import TestimonialSection from '../components/TestimonialSection';
import CTASection from '../components/CTASection';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  // Update document title
  React.useEffect(() => {
    document.title = 'FoodChain AI | Find Food Resources Near You';
  }, []);
  
  const { t } = useTranslation();

  return (
    <div>
      <HeroSection />
      <ProgramsSection />
      <ImpactSection />
      <TestimonialSection />
      <CTASection />
      <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
        {t('home.welcomeTitle')}
      </h1>
      <p className="mt-6 text-xl text-white max-w-3xl">
        {t('home.welcomeSubtitle')}
      </p>

      <label htmlFor="zipCode" className="sr-only">{t('home.enterZipCode')}</label>
      <input
        id="zipCode"
        type="text"
        placeholder={t('home.enterZipCode')}
        // ...
      />

      <button
        type="submit"
        className="block w-full sm:w-auto rounded-md px-4 py-3 bg-green-600 text-white font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        {t('home.findNearby')}
      </button>

      <h2 className="text-base text-green-600 font-semibold tracking-wide uppercase">{t('home.featuresHeading')}</h2>
      <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        {t('home.featuresTitle')}
      </p>
      <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
        {t('home.featuresSubtitle')}
      </p>

      <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        <span className="block">{t('home.ctaTitle')}</span>
        <span className="block text-green-600">{t('home.ctaSubtitle')}</span>
      </h2>

      <Link
        to="/about"
        className="ml-3 inline-flex rounded-md shadow"
      >
        {t('home.learnMore')}
      </Link>
    </div>
  );
};

export default HomePage;