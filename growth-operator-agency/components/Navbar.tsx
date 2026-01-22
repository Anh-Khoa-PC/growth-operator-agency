import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS, HERO_CONTENT } from '../constants';
import Button from './ui/Button';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    // Handle "Back to Top" or Logo click
    if (href === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setIsMobileMenuOpen(false);
        return;
    }

    const targetId = href.replace('#', '');
    const elem = document.getElementById(targetId);
    
    if (elem) {
        // Offset for fixed header (increased due to larger nav)
        const offset = 120;
        const elementPosition = elem.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6 md:py-8'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 max-w-[1600px] flex items-center justify-between relative">
        {/* Logo */}
        <a 
            href="#" 
            onClick={(e) => handleSmoothScroll(e, '#')}
            className="flex flex-col leading-none group relative z-20"
        >
          <div className="flex items-center gap-1">
             <div className="text-white font-bold text-2xl md:text-3xl lg:text-4xl tracking-tight">Growth Operator</div>
          </div>
          <div className="text-brand-orange text-xs md:text-sm lg:text-base font-bold tracking-[0.2em] uppercase mt-1">Agency</div>
        </a>

        {/* Desktop Nav - Absolute Center for perfect alignment */}
        <div className="hidden lg:flex items-center gap-8 xl:gap-12 bg-white/5 px-8 xl:px-12 py-3.5 rounded-full border border-white/5 backdrop-blur-sm absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-black/20">
          {NAV_LINKS.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => handleSmoothScroll(e, link.href)}
              className="text-base xl:text-lg font-medium text-gray-300 hover:text-white transition-colors whitespace-nowrap"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:block relative z-20">
            <Button variant="beam" className="text-base md:text-lg px-8 py-4">
              {HERO_CONTENT.cta}
            </Button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden text-white relative z-20"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-8 h-8 md:w-10 md:h-10" /> : <Menu className="w-8 h-8 md:w-10 md:h-10" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-black border-b border-white/10 p-6 flex flex-col gap-4 lg:hidden animate-in slide-in-from-top-5 h-screen">
          {NAV_LINKS.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-3xl md:text-4xl font-medium text-gray-300 hover:text-brand-orange py-4"
              onClick={(e) => handleSmoothScroll(e, link.href)}
            >
              {link.name}
            </a>
          ))}
          <div className="mt-8">
            <Button variant="secondary" className="w-full justify-center py-6 text-xl">
                {HERO_CONTENT.cta}
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;