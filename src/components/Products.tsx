import React from 'react';
import AnimatedSection from './AnimatedSection';
import { motion } from 'framer-motion';
import { siteData } from '../data/siteData';
import { toDomId } from '../utils/domId';

const Products: React.FC = () => {
  const { productsSection } = siteData;

  return (
    <section id="products" className="py-12 md:py-24 bg-white font-sans">
      <div id="products-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection id="products-header" className="text-center mb-10 md:mb-16">
          <h2 id="products-title" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">{productsSection.title}</h2>
          <p id="products-description" className="text-lg text-gray-600 max-w-2xl mx-auto">
            {productsSection.description}
          </p>
        </AnimatedSection>
        
        <div id="products-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {productsSection.items.map((product, index) => (
            <AnimatedSection key={product.id} id={toDomId('product-item', product.id, product.category)} delay={index * 0.1}>
              <motion.div 
                id={toDomId('product-card', product.id, product.category)}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
              >
                <div id={toDomId('product-image-wrap', product.id, product.category)} className="relative overflow-hidden rounded-lg shadow-md aspect-[4/5] mb-6">
                  <motion.img 
                    id={toDomId('product-image', product.id, product.category)}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                  <div id={toDomId('product-image-overlay', product.id, product.category)} className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                  <div id={toDomId('product-category-badge', product.id, product.category)} className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-900 uppercase tracking-wider">
                    {product.category}
                  </div>
                </div>
                <h3 id={toDomId('product-name', product.id, product.category)} className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>
                <p id={toDomId('product-description', product.id, product.category)} className="text-gray-600 leading-relaxed">
                  {product.descriptionLines.map((line, lineIndex) => (
                    <React.Fragment key={line}>
                      {line}
                      {lineIndex < product.descriptionLines.length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
