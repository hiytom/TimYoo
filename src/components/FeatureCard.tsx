import React from 'react';
import { LucideIcon } from 'lucide-react';
import { toDomId } from '../utils/domId';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  details?: string[];
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon: Icon, details }) => {
  const featureId = toDomId('feature-card', title);

  return (
    <div id={featureId} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      <div id={`${featureId}-icon-wrap`} className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
        <Icon id={`${featureId}-icon`} className="w-6 h-6 text-blue-600" />
      </div>
      <h3 id={`${featureId}-title`} className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p id={`${featureId}-description`} className="text-gray-600 mb-4 leading-relaxed">{description}</p>
      {details && details.length > 0 && (
        <ul id={`${featureId}-details`} className="space-y-2">
          {details.map((detail, index) => (
            <li id={`${featureId}-detail-${index + 1}`} key={index} className="flex items-start text-sm text-gray-500">
              <span id={`${featureId}-detail-${index + 1}-bullet`} className="mr-2 text-blue-500">•</span>
              {detail}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FeatureCard;
