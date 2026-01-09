import React from 'react';
import SectionWrapper from './ui/SectionWrapper';
import { SOLUTIONS } from '../constants';
import { motion } from 'framer-motion';

const Solutions: React.FC = () => {
  return (
    <SectionWrapper id="solutions" className="bg-black">
      <div className="mb-20 text-center max-w-4xl mx-auto">
         <div className="inline-block mb-6">
            <span className="px-4 py-2 rounded-full border border-white/10 text-gray-400 text-xs font-medium">Our Services</span>
         </div>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
          Comprehensive Solutions <br/> For Influencers
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Providing a range of features to monetize your influence, manage digital assets, and automate workflows.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SOLUTIONS.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group rounded-2xl bg-[#030303] border border-white/5 overflow-hidden hover:border-brand-orange/30 transition-all duration-300 flex flex-col hover:bg-[#050505] relative"
          >
             {/* Subtle Noise Texture */}
             <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-overlay" />
             <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="p-8 flex flex-col h-full relative z-10">
                <div className="w-14 h-14 rounded-lg bg-[#111] border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-brand-orange/50 transition-all duration-300">
                    {item.icon && <item.icon className="w-7 h-7 text-white group-hover:text-brand-orange transition-colors" />}
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-orange transition-colors">
                    {item.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed flex-grow">
                    {item.description}
                </p>
            </div>
            
            {/* Bottom highlight line */}
            <div className="absolute bottom-0 left-0 w-0 h-1 bg-brand-orange transition-all duration-500 group-hover:w-full" />
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Solutions;