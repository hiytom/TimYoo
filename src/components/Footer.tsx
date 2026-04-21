import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import logo from '../assets/logo.svg';
import { siteData } from '../data/siteData';
import { toDomId } from '../utils/domId';

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
                <MapPin id="footer-contact-address-icon" className="w-5 h-5 text-blue-500 mr-3 mt-1" />
                <span id="footer-contact-address" className="text-gray-400">
                  {footer.contact.addressLines.map((line, index) => (
                    <React.Fragment key={line}>
                      {line}
                      {index < footer.contact.addressLines.length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </span>
              </li>
              <li id="footer-contact-phone-item" className="flex items-center">
                <Phone id="footer-contact-phone-icon" className="w-5 h-5 text-blue-500 mr-3" />
                <span id="footer-contact-phone" className="text-gray-400">{footer.contact.phone}</span>
              </li>
              <li id="footer-contact-email-item" className="flex items-center">
                <Mail id="footer-contact-email-icon" className="w-5 h-5 text-blue-500 mr-3" />
                <span id="footer-contact-email" className="text-gray-400">{footer.contact.email}</span>
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
