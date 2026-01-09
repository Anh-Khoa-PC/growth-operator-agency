import React from 'react';
import { NAV_LINKS } from '../constants';

const Footer: React.FC = () => {
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const elem = document.getElementById(targetId);
    
    if (elem) {
        const offset = 85;
        const elementPosition = elem.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
  };

  return (
    <footer className="bg-black py-12 border-t border-white/5">
      <div className="container mx-auto px-6 text-center">
        
        {/* Links */}
        <div className="flex flex-wrap justify-center gap-8 mb-8">
          {NAV_LINKS.map((link) => (
            <a 
                key={link.name} 
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className="text-sm text-gray-500 hover:text-white transition-colors"
            >
                {link.name}
            </a>
          ))}
        </div>

        <div className="text-xs text-gray-600">
          Copyright Growth Operator Agency All right reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;