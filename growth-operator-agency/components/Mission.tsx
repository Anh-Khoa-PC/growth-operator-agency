import React from 'react';
import SectionWrapper from './ui/SectionWrapper';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Mission: React.FC = () => {
  return (
    <SectionWrapper id="mission" className="bg-black py-16 md:py-24">
      <div className="max-w-[1400px] mx-auto px-6 text-center">
        
        {/* Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center justify-center px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-10"
        >
          <span className="text-gray-400 text-sm uppercase tracking-widest font-medium">Our Mission</span>
        </motion.div>

        {/* Headline - Scaled UP */}
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-[1.1] tracking-tight">
          We Help <span className="text-brand-orange">Creators & Coaches</span> <br className="hidden md:block" />
          Scale with our <span className="text-brand-orange">done-for-you</span> <br className="hidden md:block" />
          systems and proven <br className="hidden md:block" />
          <span className="text-brand-orange">automations</span>
        </h2>

        {/* Subheadline - Scaled UP */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto mb-10"
        >
          <p className="text-gray-400 text-xl md:text-3xl leading-relaxed">
            <span className="bg-brand-orange text-white px-3 py-1 rounded-md font-semibold mr-2 inline-block">Skip</span>
            the tech overwhelm and backend complexity. We handle everything behind the scenes so you can focus on what you do best.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.a 
          href="#contact" 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-3 text-brand-orange text-2xl font-medium hover:text-white transition-colors group cursor-pointer"
        >
          Apply to Work With Us
          <ArrowUpRight className="w-6 h-6 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
        </motion.a>

      </div>
    </SectionWrapper>
  );
};

export default Mission;