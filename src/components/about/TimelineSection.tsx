import React from 'react';
import AnimatedSection from '../AnimatedSection';
import { siteData } from '../../data/siteData';
import { toDomId } from '../../utils/domId';

const TimelineSection: React.FC = () => {
  const { timeline } = siteData.aboutSection;

  return (
    <div id="about-timeline" className="py-12 md:py-16 bg-gray-50">
      <div id="about-timeline-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection id="about-timeline-header" className="text-center mb-12">
          <h2 id="about-timeline-title" className="text-3xl font-bold text-gray-900 mb-4">{timeline.title}</h2>
          <p id="about-timeline-description" className="text-lg text-gray-600">{timeline.description}</p>
        </AnimatedSection>

        <div id="about-timeline-content" className="relative">
          {/* Line */}
          <div id="about-timeline-line" className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200"></div>

          <div id="about-timeline-list" className="space-y-6 md:space-y-12">
            {timeline.events.map((event, index) => (
              <AnimatedSection id={toDomId('about-timeline-event', index + 1, event.year)} key={index} delay={index * 0.1} direction={index % 2 === 0 ? 'left' : 'right'}>
                <div id={toDomId('about-timeline-event-layout', index + 1, event.year)} className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  <div id={toDomId('about-timeline-event-content-wrap', index + 1, event.year)} className="flex-1 w-full md:w-1/2 p-2 md:p-6">
                    <div id={toDomId('about-timeline-event-card', index + 1, event.year)} className={`bg-white p-4 md:p-6 rounded-xl shadow-md border-l-4 border-blue-500 ${index % 2 === 0 ? 'text-left' : 'md:text-right'}`}>
                      <span id={toDomId('about-timeline-event-year', index + 1, event.year)} className="text-blue-600 font-bold text-xl block mb-2">{event.year}</span>
                      {event.title && <h3 id={toDomId('about-timeline-event-title', index + 1, event.year)} className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>}
                      <p id={toDomId('about-timeline-event-description', index + 1, event.year)} className="text-gray-600">{event.description}</p>
                    </div>
                  </div>
                  
                  <div id={toDomId('about-timeline-event-marker', index + 1, event.year)} className="hidden md:flex relative items-center justify-center w-8 h-8 bg-blue-500 rounded-full z-10 border-4 border-white shadow-lg my-4 md:my-0">
                    <div id={toDomId('about-timeline-event-marker-inner', index + 1, event.year)} className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  
                  <div id={toDomId('about-timeline-event-spacer', index + 1, event.year)} className="hidden md:block flex-1 w-full md:w-1/2 p-6"></div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
        {/* Footer note moved outside the relative container so it doesn't affect the timeline line height */}
      </div>
    </div>
  );
};

export default TimelineSection;
