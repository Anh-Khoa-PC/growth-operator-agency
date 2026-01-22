import React from 'react';
import SectionWrapper from './ui/SectionWrapper';
import { BENEFITS } from '../constants';
import { motion } from 'framer-motion';
import TextReveal from './ui/TextReveal';

const Benefits: React.FC = () => {
  return (
    <SectionWrapper id="why-us" className="bg-black py-12 md:py-20">
      <div className="mb-16 text-center max-w-4xl mx-auto flex flex-col items-center">
         <div className="mb-8">
            <span className="px-5 py-2 rounded-full border border-white/10 text-brand-orange text-sm font-bold tracking-widest uppercase">Why Choose Us</span>
         </div>
        
        <TextReveal className="text-4xl md:text-6xl font-bold text-white mb-6 justify-center">
          Experience The Benefits Of Our Expertise
        </TextReveal>

        <p className="text-gray-400 text-xl md:text-2xl mt-4">
           With a proven track record of results
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1600px] mx-auto px-6">
        {BENEFITS.map((benefit, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="group relative p-12 rounded-[2.5rem] bg-[#080808] border border-white/5 hover:border-brand-orange/30 transition-all duration-500 h-full flex flex-col items-center text-center overflow-hidden hover:bg-[#0c0c0c] min-h-[400px]"
          >
            {/* Subtle Grid Texture */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
            
            {/* Noise Texture */}
            <div className="absolute inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-overlay" />

            <div className="relative z-10 mb-10">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-brand-orange to-[#cc5500] flex items-center justify-center shadow-lg shadow-brand-orange/20 group-hover:scale-110 transition-transform duration-300">
                {benefit.icon && <benefit.icon className="w-12 h-12 text-white" />}
              </div>
            </div>
            
            <h3 className="relative z-10 text-3xl font-bold text-white mb-5 group-hover:text-brand-orange transition-colors">
              {benefit.title}
            </h3>
            
            <p className="relative z-10 text-gray-400 leading-relaxed text-lg">
              {benefit.description}
            </p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Benefits;