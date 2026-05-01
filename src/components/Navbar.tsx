import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import logo from '../assets/logo.svg';
import { siteData } from '../data/siteData';
import { toDomId } from '../utils/domId';
import { scrollToSection } from '../utils/scrollToSection';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();
  const navigate = useNavigate();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    
    // Determine if scrolled for background style
    if (latest > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }

    // Determine visibility (Smart Hide)
    // Hide when scrolling down and past 150px
    // Show when scrolling up or near top
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const { navItems } = siteData;

  const isHashLink = (path: string) => path.includes('#');

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (path === '/') {
      e.preventDefault();
      if (location.pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate('/');
      }
      setIsOpen(false);
    } else if (isHashLink(path)) {
      e.preventDefault();
      const targetId = path.split('#')[1];
      if (location.pathname === '/') {
        scrollToSection(targetId);
      } else {
        navigate(path);
      }
      setIsOpen(false);
    }
  };

  return (
    <motion.nav
      id="site-navbar"
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed w-full z-50 transition-colors duration-300 ${
        scrolled
          ? 'bg-gray-900/90 backdrop-blur-sm shadow-md' 
          : 'bg-transparent'
      }`}
    >
      <div id="navbar-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div id="navbar-layout" className="flex justify-between items-center h-28">
          <div id="navbar-logo-wrap" className="flex-shrink-0 flex items-center">
            <Link id="navbar-home-link" to="/" className="flex items-center" onClick={(e) => handleNavClick(e, '/')}>
              <img 
                id="navbar-logo-image"
                className="h-24 w-auto brightness-0 invert" 
                src={logo} 
                alt="Company Logo" 
              />
            </Link>
          </div>
          
          <div id="navbar-desktop-links" className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              isHashLink(item.path) ? (
                <a
                  id={toDomId('navbar-link', item.name)}
                  key={item.name}
                  href={item.path}
                  onClick={(e) => handleNavClick(e, item.path)}
                  className="text-white hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  id={toDomId('navbar-link', item.name)}
                  key={item.name}
                  to={item.path}
                  onClick={(e) => handleNavClick(e, item.path)}
                  className="text-white hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {item.name}
                </Link>
              )
            ))}
          </div>

          <div id="navbar-mobile-toggle-wrap" className="md:hidden flex items-center">
            <button
              id="navbar-mobile-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-blue-400 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div id="navbar-mobile-menu" className="md:hidden bg-gray-900/95 backdrop-blur-sm">
          <div id="navbar-mobile-links" className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              isHashLink(item.path) ? (
                <a
                  id={toDomId('navbar-mobile-link', item.name)}
                  key={item.name}
                  href={item.path}
                  className="text-white hover:text-blue-400 block px-3 py-2 rounded-md text-base font-medium"
                  onClick={(e) => handleNavClick(e, item.path)}
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  id={toDomId('navbar-mobile-link', item.name)}
                  key={item.name}
                  to={item.path}
                  className="text-white hover:text-blue-400 block px-3 py-2 rounded-md text-base font-medium"
                  onClick={(e) => handleNavClick(e, item.path)}
                >
                  {item.name}
                </Link>
              )
            ))}
          </div>
        </div>
      )}
    </motion.nav>
  );
};

export default Navbar;
