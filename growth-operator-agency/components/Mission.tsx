import React from 'react';
import SectionWrapper from './ui/SectionWrapper';
import { MISSION_CONTENT } from '../constants';
import Button from './ui/Button';
import { ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';

const Mission: React.FC = () => {
  return (
    <SectionWrapper id="mission" className="bg-black min-h-[80vh] flex items-center justify-center">
      <div className="text-center max-w-4xl mx-auto flex flex-col items-center">
        {/* Badge */}
        <div className="mb-8">
            <span className="px-5 py-2 rounded-full border border-white/10 text-gray-400 text-xs font-medium uppercase tracking-widest">
                {MISSION_CONTENT.badge}
            </span>
        </div>

        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
          We Help <span className="text-brand-orange">Creators & Coaches</span><br />
          Scale with our <span className="text-brand-orange">done-for-you</span><br />
          <span className="text-brand-orange">systems</span> and proven <br />
          <span className="text-brand-orange">automations</span>
        </h2>

        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          {MISSION_CONTENT.subheadline}
        </p>

        <Button variant="text" className="text-brand-orange text-lg">
          {MISSION_CONTENT.cta}
        </Button>
        
        <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="mt-16 text-brand-orange"
        >
            <ArrowDown className="w-10 h-10 font-thin" strokeWidth={1} />
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default Mission;