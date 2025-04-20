import React from 'react';
import HeroSection from '../components/HeroSection';
import ProgramsSection from '../components/ProgramsSection';
import ImpactSection from '../components/ImpactSection';
import TestimonialSection from '../components/TestimonialSection';
import CTASection from '../components/CTASection';

const HomePage: React.FC = () => {
  // Update document title
  React.useEffect(() => {
    document.title = 'FoodConnect | Find Food Resources Near You';
  }, []);
  
  return (
    <div>
      <HeroSection />
      <ProgramsSection />
      <ImpactSection />
      <TestimonialSection />
      <CTASection />
    </div>
  );
};

export default HomePage;