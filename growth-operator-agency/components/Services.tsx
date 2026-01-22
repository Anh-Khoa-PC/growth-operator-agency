import React from 'react';
import SectionWrapper from './ui/SectionWrapper';
import { SERVICES } from '../constants';
import { motion } from 'framer-motion';

const Services: React.FC = () => {
  return (
    <SectionWrapper id="services" className="bg-brand-gray">
      <div className="mb-16 md:mb-24 md:text-center max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
          Everything You Need To <span className="text-brand-orange">Scale</span>
        </h2>
        <p className="text-gray-400 text-lg">
          We don't sell courses. We install infrastructure. Here is exactly how we help you add $50k-$100k to your monthly recurring revenue.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="group relative p-8 rounded-2xl bg-[#030303] border border-white/5 hover:border-brand-orange/30 transition-all duration-300 hover:bg-[#050505] overflow-hidden"
          >
             {/* Subtle Noise Texture */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-overlay" />

            {/* Hover Glow */}
            <div className="absolute inset-0 bg-brand-orange/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
            
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-lg bg-brand-black border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-brand-orange/50 transition-all duration-300">
                <service.icon className="w-7 h-7 text-white group-hover:text-brand-orange transition-colors" />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-orange transition-colors">
                {service.title}
              </h3>
              
              <p className="text-gray-400 leading-relaxed group-hover:text-gray-300">
                {service.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Services;