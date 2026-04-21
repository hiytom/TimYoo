import React from 'react';
import CaseStudyCard from './case-studies/CaseStudyCard';
import AnimatedSection from './AnimatedSection';
import { siteData } from '../data/siteData';
import { toDomId } from '../utils/domId';

const CaseStudies: React.FC = () => {
  const { caseStudiesSection } = siteData;

  return (
    <section id="case-studies" className="pt-12 pb-0 md:py-24 bg-gray-50 font-sans">
      <div id="case-studies-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection id="case-studies-header" className="text-center mb-16">
          <h2 id="case-studies-title" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">{caseStudiesSection.title}</h2>
          <p id="case-studies-description" className="text-lg text-gray-600 max-w-2xl mx-auto">
            {caseStudiesSection.description}
          </p>
        </AnimatedSection>

        <div id="case-studies-list" className="flex flex-col gap-12">
          {caseStudiesSection.items.map((study, index) => (
            <AnimatedSection key={study.id} id={toDomId('case-study-item', study.id, study.client)} delay={index * 0.2}>
              <CaseStudyCard
                client={study.client}
                image={study.image}
                imagePosition={study.imagePosition}
                tags={study.tags}
                sections={study.sections}
                reverseLayout={study.reverseLayout}
              />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
