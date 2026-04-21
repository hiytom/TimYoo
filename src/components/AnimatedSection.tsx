import React, { useId } from 'react';
import { motion } from 'framer-motion';
import { toDomId } from '../utils/domId';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'left' | 'right';
  id?: string;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ 
  children, 
  className = "", 
  delay = 0,
  direction = 'up',
  id,
}) => {
  const generatedId = useId();

  const getInitialProps = () => {
    switch (direction) {
      case 'left': return { opacity: 0, x: -50 };
      case 'right': return { opacity: 0, x: 50 };
      case 'up':
      default: return { opacity: 0, y: 50 };
    }
  };

  const getAnimateProps = () => {
    switch (direction) {
      case 'left':
      case 'right': return { opacity: 1, x: 0 };
      case 'up':
      default: return { opacity: 1, y: 0 };
    }
  };

  return (
    <motion.div
      id={id ?? toDomId('animated-section', generatedId)}
      initial={getInitialProps()}
      whileInView={getAnimateProps()}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
