import React, { useState } from 'react';
import SectionWrapper from './ui/SectionWrapper';
import { FAQS } from '../constants';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <SectionWrapper id="faq" className="bg-black">
      <div className="text-center mb-16">
         <div className="inline-block mb-6">
            <span className="px-4 py-2 rounded-full border border-white/10 text-gray-400 text-xs font-medium">Need to Know</span>
         </div>
         <h2 className="text-3xl md:text-5xl font-bold text-white">
            Frequently Asked Questions
         </h2>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {FAQS.map((faq, index) => (
          <div 
            key={index} 
            className="border-b border-white/10 overflow-hidden"
          >
            <button
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              className="w-full py-6 flex items-center justify-between text-left group"
            >
              <span className="text-lg md:text-xl font-medium text-gray-300 group-hover:text-white transition-colors">{faq.question}</span>
              <span className="text-gray-500 group-hover:text-brand-orange transition-colors">
                {activeIndex === index ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </span>
            </button>
            
            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="pb-8 pt-2 text-gray-500 leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default FAQ;