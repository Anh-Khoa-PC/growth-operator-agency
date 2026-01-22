import React from 'react';
import { motion } from 'framer-motion';

interface SectionWrapperProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  containerClassName?: string;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ children, id, className = "", containerClassName = "" }) => {
  return (
    <section id={id} className={`relative py-12 md:py-20 overflow-hidden ${className}`}>
      <div className={`container mx-auto px-6 md:px-12 relative z-10 ${containerClassName}`}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
};

export default SectionWrapper;