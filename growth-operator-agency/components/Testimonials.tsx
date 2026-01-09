import React from 'react';
import SectionWrapper from './ui/SectionWrapper';
import { TESTIMONIALS } from '../constants';
import { Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  return (
    <SectionWrapper id="results" className="bg-brand-dark">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
          Real Results. <span className="text-brand-orange">Real Partners.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {TESTIMONIALS.map((t, index) => (
          <div key={index} className="bg-brand-surface p-8 rounded-2xl border border-white/5 relative">
            <Quote className="absolute top-8 right-8 text-brand-orange/20 w-10 h-10" />
            <p className="text-gray-300 mb-8 relative z-10 italic">"{t.quote}"</p>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden">
                 <img src={`https://picsum.photos/100/100?random=${index}`} alt={t.author} className="w-full h-full object-cover grayscale" />
              </div>
              <div>
                <h4 className="text-white font-bold">{t.author}</h4>
                <p className="text-sm text-gray-500">{t.role}, {t.company}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Testimonials;