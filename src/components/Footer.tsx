import React from 'react';
import { Mail, MapPin } from 'lucide-react';
import logo from '../assets/logo.svg';
import { siteData } from '../data/siteData';
import { toDomId } from '../utils/domId';

const LinkedInIcon: React.FC<{ className?: string; id?: string }> = ({ className, id }) => (
  <svg
    id={id}
    className={className}
    viewBox="0 0 24 24"
    role="img"
    aria-label="LinkedIn"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="currentColor"
      d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.554V9h3.565v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
    />
  </svg>
);

const Footer: React.FC = () => {
  const { footer } = siteData;

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8" id="site-footer">
      <div id="footer-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div id="footer-grid" className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Company Info */}
          <div id="footer-company" >
            <div id="footer-logo-wrap" className="flex items-center mb-6">
              <img 
                id="footer-logo-image"
                src={logo} 
                alt="Logo" 
                className="h-24 w-auto brightness-0 invert" 
              />
            </div>
            <p id="footer-summary" className="text-gray-400 mb-6">
              {footer.summary}
            </p>
          </div>

          {/* Quick Links */}
          <div id="footer-links-section">
            <h3 id="footer-links-title" className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul id="footer-links-list" className="space-y-4">
              {footer.quickLinks.map((link) => (
                <li id={toDomId('footer-link-item', link.name)} key={link.name}>
                  <a id={toDomId('footer-link', link.name)} href={link.path} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div id="footer-contact">
            <h3 id="footer-contact-title" className="text-lg font-semibold mb-6">Contact Us</h3>
            <ul id="footer-contact-list" className="space-y-4">
              <li id="footer-contact-address-item" className="flex items-start">
                <MapPin id="footer-contact-address-icon" className="w-5 h-5 shrink-0 text-blue-500 mr-3 mt-1" />
                <span id="footer-contact-address" className="text-gray-400">
                  {footer.contact.addressLines.join(' ')}
                </span>
              </li>
              <li id="footer-contact-email-item" className="flex items-center">
                <Mail id="footer-contact-email-icon" className="w-5 h-5 shrink-0 text-blue-500 mr-3" />
                <span id="footer-contact-email" className="text-gray-400">{footer.contact.email}</span>
              </li>
              <li id="footer-contact-phone-item" className="flex items-center">
                <LinkedInIcon id="footer-contact-phone-icon" className="w-5 h-5 shrink-0 text-[#0A66C2] mr-3" />
                <a
                  id="footer-contact-phone"
                  href="https://www.linkedin.com/in/hui-wang-2528a7b4"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div id="footer-copyright-wrap" className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          <p id="footer-copyright">&copy; {new Date().getFullYear()} {footer.companyName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
