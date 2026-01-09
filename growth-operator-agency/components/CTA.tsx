import React from 'react';
import { FOOTER_CTA } from '../constants';
import Button from './ui/Button';

const CTA: React.FC = () => {
  return (
    <section className="py-32 relative overflow-hidden bg-black flex items-center justify-center">
      
      {/* Background Dots */}
      <div className="absolute inset-0 bg-[radial-gradient(#222_1px,transparent_1px)] [background-size:20px_20px] opacity-30"></div>
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Logo element small */}
          <div className="flex justify-center mb-8">
             <div className="flex flex-col items-center">
                <div className="text-white font-bold text-xl tracking-tight mb-1">growth operator</div>
                <div className="text-gray-500 text-xs font-medium tracking-widest">agency.com</div>
             </div>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
             We turn audiences <br />
             into revenue.
          </h2>
          <p className="text-gray-500 text-lg mb-10 max-w-xl mx-auto">
            {FOOTER_CTA.subheadline}
          </p>
          
          <Button variant="text" className="text-brand-orange text-xl hover:text-white transition-colors">
            {FOOTER_CTA.cta}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTA;