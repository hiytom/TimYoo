import React from 'react';
import { Mail, ArrowRight } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import { siteData } from '../data/siteData';
import { iconMap } from '../data/iconMap';
import { toDomId } from '../utils/domId';

const AboutOnHome: React.FC = () => {
  const { homeAboutSection } = siteData;

  return (
    <section id="contact" className="py-12 md:py-24 bg-gray-50 overflow-hidden">
      <div id="contact-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* The Value We Bring to Your Business */}
        <div id="contact-value-section" className="mb-12 md:mb-20">
          <AnimatedSection id="contact-value-header" className="text-center mb-12">
            <h2 id="contact-value-title" className="text-3xl font-bold text-gray-900 mb-4">{homeAboutSection.value.title}</h2>
          </AnimatedSection>

          <div id="contact-value-grid" className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {homeAboutSection.value.items.map((item, index) => {
              const Icon = iconMap[item.icon];
              const itemId = toDomId('contact-value-item', index + 1, item.text);

              return (
              <AnimatedSection id={itemId} key={index} delay={index * 0.1} className="h-full">
                <div id={`${itemId}-card`} className="bg-white p-6 rounded-xl flex items-center gap-4 border border-gray-100 hover:shadow-md transition-shadow h-full">
                  <div id={`${itemId}-icon-wrap`} className="bg-blue-100 p-3 rounded-lg">
                    <Icon id={`${itemId}-icon`} className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 id={`${itemId}-text`} className="text-lg font-bold text-gray-900">{item.text}</h3>
                </div>
              </AnimatedSection>
            )})}
          </div>
        </div>

        {/* Who We Work With Best */}
        <div id="contact-fit-section" className="mb-12 md:mb-20">
          <AnimatedSection id="contact-fit-header" className="text-center mb-12">
            <h2 id="contact-fit-title" className="text-3xl font-bold text-gray-900 mb-4">{homeAboutSection.whoWeWorkWith.title}</h2>
          </AnimatedSection>

          <div id="contact-fit-content" className="max-w-4xl mx-auto">
            <div id="contact-fit-grid" className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {homeAboutSection.whoWeWorkWith.items.map((item, index) => {
                const Icon = iconMap[item.icon];
                const itemId = toDomId('contact-fit-item', index + 1, item.text);

                return (
                <AnimatedSection id={itemId} key={index} delay={index * 0.1} className="h-full">
                  <div id={`${itemId}-card`} className="bg-white p-6 rounded-xl text-center border border-gray-100 hover:shadow-md transition-shadow h-full flex flex-col items-center justify-center">
                    <Icon id={`${itemId}-icon`} className="w-8 h-8 text-blue-600 mb-4" />
                    <p id={`${itemId}-text`} className="text-lg font-medium text-gray-900">{item.text}</p>
                  </div>
                </AnimatedSection>
              )})}
            </div>
          </div>
        </div>

        {/* Start Your Next Program With Less Risk */}
        <div id="contact-cta" className="text-center max-w-4xl mx-auto">
          <AnimatedSection id="contact-cta-content" className="relative z-10">
            <h2 id="contact-cta-title" className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
              {homeAboutSection.cta.title}
            </h2>
            <p id="contact-cta-description" className="text-lg text-gray-600 mb-10 leading-relaxed">
              {homeAboutSection.cta.description}
            </p>
            
            <a 
              id="contact-cta-link"
              href={`mailto:${homeAboutSection.cta.email}`} 
              className="inline-flex items-center gap-2 md:gap-3 bg-blue-600 text-white px-5 md:px-8 py-3 md:py-4 rounded-full font-bold text-base md:text-lg hover:bg-blue-700 transition-all hover:shadow-lg hover:-translate-y-1 group whitespace-nowrap"
            >
              <Mail id="contact-cta-link-icon" className="w-5 h-5" />
              {homeAboutSection.cta.buttonLabel}
              <ArrowRight id="contact-cta-link-arrow" className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </AnimatedSection>
        </div>

      </div>
    </section>
  );
};

export default AboutOnHome;
