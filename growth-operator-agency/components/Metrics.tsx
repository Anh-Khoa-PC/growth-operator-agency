import React from 'react';
import SectionWrapper from './ui/SectionWrapper';
import { METRICS } from '../constants';

const Metrics: React.FC = () => {
  return (
    <div className="bg-brand-orange text-white py-12 border-y border-white/10 relative overflow-hidden">
      {/* Texture for interest */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-multiply" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x-0 md:divide-x divide-white/20">
          {METRICS.map((metric, index) => (
            <div key={index} className="px-2">
              <div className="text-3xl md:text-5xl font-bold mb-2 tracking-tighter">
                {metric.value}
              </div>
              <div className="text-xs md:text-sm font-medium opacity-90 uppercase tracking-widest">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Metrics;