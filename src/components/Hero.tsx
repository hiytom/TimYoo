import React from 'react';
import { motion } from 'framer-motion';
import { siteData } from '../data/siteData';
import { iconMap } from '../data/iconMap';
import { toDomId } from '../utils/domId';

const Hero: React.FC = () => {
  const { hero } = siteData;

  return (
    <div id="hero" className="relative bg-gray-900 h-screen min-h-[800px] flex flex-col justify-between font-sans overflow-hidden">
      {/* Background Image */}
      <div id="hero-background" className="absolute inset-0 overflow-hidden">
        <motion.img
          id="hero-background-image"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
          src={hero.backgroundImage}
          alt="Textile Factory"
          className="w-full h-full object-cover opacity-50"
        />
        {/* Gradient Overlay for bottom text readability */}
        <div id="hero-background-overlay" className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
      </div>

      {/* Main Content */}
      <div id="hero-content" className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 flex-grow flex flex-col justify-center">
        <motion.div 
          id="hero-content-inner"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-5xl text-left"
        >
          <motion.div 
            id="hero-accent-bar"
            initial={{ width: 0 }}
            animate={{ width: 64 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="inline-block h-1 bg-blue-500 mb-6"
          ></motion.div>
          <h1 id="hero-heading" className="text-2xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6 leading-tight">
            {hero.heading.title} <br/>
            <span id="hero-heading-accent" className="text-blue-400 text-xl md:text-[2rem]">{hero.heading.accent}</span>
          </h1>
          <p id="hero-subtitle" className="mt-4 text-base md:text-lg text-gray-200 mb-10 max-w-2xl leading-relaxed">
            {hero.subtitle}
          </p>
        </motion.div>
      </div>

      {/* Bottom Features Grid */}
      <div id="hero-features" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 md:pb-12 w-full">
        <div id="hero-features-grid" className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-x-4 gap-y-6 md:gap-6 border-t border-gray-700 pt-6 md:pt-8">
          {hero.features.map((feature, index) => {
            const Icon = iconMap[feature.icon];
            const featureId = toDomId('hero-feature', index + 1, feature.title);

            return (
            <motion.div 
              id={featureId}
              key={featureId} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              className={`group cursor-pointer ${index === 4 ? 'col-span-2 sm:col-span-1 lg:col-span-1' : ''}`}
            >
              <div id={`${featureId}-header`} className="flex items-center mb-2 md:mb-3">
                <Icon id={`${featureId}-icon`} className="w-5 h-5 text-blue-400 mr-2 group-hover:scale-110 transition-transform duration-300 flex-shrink-0" />
                <h3 id={`${featureId}-title`} className="text-[15px] md:text-lg font-bold text-white group-hover:text-blue-400 transition-colors leading-tight">
                  {feature.title}
                </h3>
              </div>
              <p id={`${featureId}-description`} className="text-[12px] md:text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                {feature.descriptionLines.map((line, lineIndex) => (
                  <React.Fragment key={line}>
                    {line}
                    {lineIndex < feature.descriptionLines.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </p>
            </motion.div>
          )})}
        </div>
        {/* Endorsement line */}
        <div id="hero-endorsement" className="mt-8 md:mt-6 text-center text-xs md:text-sm text-gray-400">
          {hero.endorsement}
        </div>
      </div>
    </div>
  );
};

export default Hero;
