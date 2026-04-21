import React from 'react';
import AnimatedSection from '../AnimatedSection';
import { siteData } from '../../data/siteData';
import { iconMap } from '../../data/iconMap';
import { toDomId } from '../../utils/domId';

const FactorySection: React.FC = () => {
  const { facilities } = siteData.aboutSection;

  return (
    <div id="about-facilities" className="py-12 md:py-16 bg-white">
      <div id="about-facilities-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection id="about-facilities-header" className="text-center mb-12">
          <h2 id="about-facilities-title" className="text-3xl font-bold text-gray-900 mb-4">{facilities.title}</h2>
          <p id="about-facilities-description" className="text-lg text-gray-600 max-w-3xl mx-auto">
            {facilities.description}
          </p>
        </AnimatedSection>

        {/* Equipment List as Cards */}
        <div id="about-facilities-content" className="max-w-5xl mx-auto">
          <div id="about-facilities-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.items.map((item, index) => {
              const Icon = iconMap[item.icon];
              const itemId = toDomId('about-facility-item', index + 1, item.name);

              return (
              <AnimatedSection id={itemId} key={index} delay={index * 0.1} className="h-full">
                <div id={`${itemId}-card`} className="bg-gray-50 p-6 rounded-xl text-center border border-gray-100 hover:shadow-md transition-shadow h-full flex flex-col items-center justify-center">
                  <Icon id={`${itemId}-icon`} className="w-8 h-8 text-blue-600 mb-4" />
                  <p id={`${itemId}-text`} className="text-lg font-medium text-gray-900">{item.name}</p>
                </div>
              </AnimatedSection>
            )})}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FactorySection;
