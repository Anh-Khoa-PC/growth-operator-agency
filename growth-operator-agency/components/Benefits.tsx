import React from 'react';
import SectionWrapper from './ui/SectionWrapper';
import { BENEFITS } from '../constants';
import { motion } from 'framer-motion';
import Button from './ui/Button';

const Benefits: React.FC = () => {
  return (
    <SectionWrapper id="benefits" className="bg-black">
      <div className="mb-16 text-center max-w-3xl mx-auto">
         <div className="mb-6">
            <span className="px-4 py-2 rounded-full border border-white/10 text-gray-400 text-xs font-medium">Why Us?</span>
         </div>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
          Experience The Benefits <br /> Of Our Expertise
        </h2>
        <p className="text-gray-500 text-lg">
          With a proven track record of results
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {BENEFITS.map((benefit, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group relative p-8 rounded-2xl bg-[#030303] border border-white/5 hover:border-brand-orange/40 transition-all duration-500 h-full flex flex-col items-center text-center overflow-hidden hover:shadow-[0_0_30px_rgba(255,92,0,0.05)] hover:bg-[#050505]"
          >
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-50" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-x-10 -translate-y-10" />
            
            {/* Subtle Noise Texture */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-overlay" />

            <div className="relative z-10 mb-6 group-hover:-translate-y-1 transition-transform duration-300">
              <div className="w-16 h-16 rounded-2xl bg-[#111] border border-white/10 flex items-center justify-center group-hover:border-brand-orange/50 group-hover:bg-brand-orange/10 transition-all duration-300">
                {benefit.icon && <benefit.icon className="w-7 h-7 text-white group-hover:text-brand-orange transition-colors" />}
              </div>
            </div>
            
            <h3 className="relative z-10 text-xl font-bold text-white mb-4">
              {benefit.title}
            </h3>
            
            <p className="relative z-10 text-gray-400 leading-relaxed text-sm">
              {benefit.description}
            </p>
          </motion.div>
        ))}
      </div>
      
      <div className="flex justify-center">
        <Button variant="secondary" className="!bg-brand-orange !border-none hover:scale-105 transition-transform">
            See If You Qualify
        </Button>
      </div>
    </SectionWrapper>
  );
};

export default Benefits;