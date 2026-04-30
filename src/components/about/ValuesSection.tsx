import React from 'react';
import AnimatedSection from '../AnimatedSection';
import { siteData } from '../../data/siteData';
import { toDomId } from '../../utils/domId';

const ValuesSection: React.FC = () => {
  const { teams } = siteData.aboutSection;

  return (
    <div id="about-teams" className="pt-12 pb-0 md:py-20 bg-white">
      <div id="about-teams-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection id="about-teams-header" className="text-center mb-0 md:mb-12">
          <h2 id="about-teams-title" className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{teams.title}</h2>
          <p id="about-teams-description" className="text-lg text-gray-600 max-w-2xl mx-auto">{teams.description}</p>
        </AnimatedSection>

        <div id="about-teams-grid" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-6">
          {teams.members.map((member, idx) => (
            <AnimatedSection id={toDomId('about-team-member', idx + 1, member.role)} key={idx} delay={idx * 0.1} className="w-full">
              <div id={toDomId('about-team-member-card', idx + 1, member.role)} className="rounded-2xl overflow-hidden shadow-lg group cursor-pointer">
                <div id={toDomId('about-team-member-image-wrap', idx + 1, member.role)} className="overflow-hidden">
                  <img 
                    id={toDomId('about-team-member-image', idx + 1, member.role)}
                    src={member.image} 
                    alt={member.role} 
                    className="w-full h-64 scale-105 object-cover transform transition-transform duration-[800ms] group-hover:scale-100" 
                  />
                </div>
                <div id={toDomId('about-team-member-role-wrap', idx + 1, member.role)} className="p-4 bg-white transition-colors duration-300 group-hover:bg-blue-50">
                  <span id={toDomId('about-team-member-role', idx + 1, member.role)} className="text-sm font-semibold text-gray-800 group-hover:text-blue-700">{member.role}</span>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ValuesSection;
