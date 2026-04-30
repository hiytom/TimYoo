import React from 'react';
import { toDomId } from '../../utils/domId';

export interface CaseStudySection {
  title: string;
  content: string[];
}

export interface CaseStudyProps {
  client: string;
  image: string;
  imagePosition?: 'center' | 'top';
  tags?: string[];
  sections: CaseStudySection[];
  reverseLayout?: boolean;
}

const CaseStudyCard: React.FC<CaseStudyProps> = ({ 
  client, 
  image, 
  imagePosition = 'center',
  tags, 
  sections, 
  reverseLayout = false 
}) => {
  const cardId = toDomId('case-study-card', client);

  return (
    <div id={cardId} className={`flex flex-col ${reverseLayout ? 'lg:flex-row-reverse' : 'lg:flex-row'} bg-white rounded-2xl overflow-hidden shadow-xl mb-0 md:mb-16`}>
      {/* Image Section */}
      <div id={`${cardId}-image-wrap`} className="group w-full lg:w-1/2 relative min-h-[300px] lg:min-h-[500px] overflow-hidden">
        <img 
          id={`${cardId}-image`}
          src={image} 
          alt={client} 
          className={`absolute inset-0 w-full h-full scale-105 object-cover transition-transform duration-[800ms] group-hover:scale-100 ${
            imagePosition === 'top' ? 'object-top' : 'object-center'
          }`}
        />
        <div id={`${cardId}-image-overlay`} className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-90 lg:opacity-60" />
        <div id={`${cardId}-client-wrap`} className="absolute bottom-0 left-0 p-8 text-white">
          <h3 id={`${cardId}-client`} className="text-[1.2rem] font-bold mb-0">{client}</h3>
          {/* tags removed per request */}
        </div>
      </div>

      {/* Content Section */}
      <div id={`${cardId}-content`} className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center bg-white">
        <div id={`${cardId}-sections`} className="space-y-8">
          {sections.map((section, index) => (
            <div id={`${cardId}-section-${index + 1}`} key={index} className="group">
              <h4 id={`${cardId}-section-${index + 1}-title`} className="text-[1.2rem] font-bold text-blue-600 uppercase tracking-wider mb-2 flex items-center gap-2">
                <span id={`${cardId}-section-${index + 1}-dot`} className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                {section.title}
              </h4>
              <div id={`${cardId}-section-${index + 1}-content`} className="text-gray-700 leading-relaxed text-base border-l-2 border-gray-100 pl-4 group-hover:border-blue-200 transition-colors duration-300">
                {section.content.map((paragraph, paragraphIndex) => (
                  <p id={`${cardId}-section-${index + 1}-paragraph-${paragraphIndex + 1}`} key={paragraph} className="mb-1 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CaseStudyCard;
