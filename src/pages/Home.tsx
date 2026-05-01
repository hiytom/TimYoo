import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import AboutOnHome from '../components/AboutOnHome';
import Products from '../components/Products';
import CaseStudies from '../components/CaseStudies';
import TimelineSection from '../components/about/TimelineSection';
import ValuesSection from '../components/about/ValuesSection';
import FactorySection from '../components/about/FactorySection';
import { siteData } from '../data/siteData';
import { scrollToSection } from '../utils/scrollToSection';

const Home: React.FC = () => {
  const { header } = siteData.aboutSection;
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      return;
    }

    const targetId = location.hash.replace('#', '');
    const timer = window.setTimeout(() => {
      scrollToSection(targetId, 'smooth');
    }, 0);

    return () => window.clearTimeout(timer);
  }, [location.hash]);

  return (
    <>
      <Hero />
      <Products />
      <CaseStudies />
      <section id="knowledge" className="py-20 bg-white text-center hidden">
        <h2 id="knowledge-title" className="text-3xl font-bold text-gray-900 mb-4">Knowledge Hub</h2>
        <p id="knowledge-description" className="text-gray-600">Industry insights coming soon...</p>
      </section>
      
  {/* About Us Section */}
  <div id="about" className="overflow-x-hidden">
        <div id="about-header" className="bg-blue-900 text-white py-12 md:py-20 text-center">
          <h2 id="about-header-title" className="text-4xl md:text-5xl font-bold mb-4">{header.title}</h2>
          <p id="about-header-description" className="text-xl text-blue-100 max-w-2xl mx-auto px-4">
            {header.description}
          </p>
        </div>
        <TimelineSection />
        <ValuesSection />
        <FactorySection />
      </div>

      {/* Contact / Trusted Partner Section */}
      <AboutOnHome />
    </>
  );
};

export default Home;
