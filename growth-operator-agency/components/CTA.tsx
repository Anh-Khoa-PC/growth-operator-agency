import React from 'react';
import { FOOTER_CTA } from '../constants';
import Button from './ui/Button';

const CTA: React.FC = () => {
  return (
    <section className="py-20 relative overflow-hidden bg-black flex items-center justify-center">
      
      {/* Background Grid with Fade */}
      <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Horizontal and Vertical Lines - distinct but subtle (rõ rõ mờ mờ) */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_30%,transparent_100%)]"></div>
          
          {/* Secondary smaller grid for texture in the center */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:10px_10px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_20%,transparent_100%)]"></div>

          {/* Subtle Glow to lift the text off the grid */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-brand-orange/5 blur-[100px] rounded-full mix-blend-screen" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Logo element small */}
          <div className="flex justify-center mb-8">
             <div className="flex flex-col items-center">
                <div className="text-white font-bold text-xl tracking-tight mb-1">growth operator</div>
                <div className="text-gray-500 text-xs font-medium tracking-widest">agency.com</div>
             </div>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight relative">
             <span className="relative z-10">We turn audiences</span> <br />
             <span className="relative z-10">into revenue.</span>
          </h2>
          <p className="text-gray-500 text-lg mb-10 max-w-xl mx-auto relative z-10">
            {FOOTER_CTA.subheadline}
          </p>
          
          <Button variant="text" className="text-brand-orange text-xl hover:text-white transition-colors relative z-10">
            {FOOTER_CTA.cta}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTA;