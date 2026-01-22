import React from 'react';
import { motion, Variants } from 'framer-motion';

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  effect?: 'drop' | 'typewriter';
}

const TextReveal: React.FC<TextRevealProps> = ({ 
  children, 
  className = "", 
  delay = 0,
  effect = 'drop' 
}) => {
  // Split text into words
  const words = children.split(" ");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i: number = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i + delay },
    }),
  };

  const child: Variants = {
    hidden: { 
      opacity: 0, 
      y: effect === 'drop' ? -20 : 0, 
      x: effect === 'typewriter' ? -10 : 0,
      filter: 'blur(10px)'
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      filter: 'blur(0px)',
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.h2
      style={{ overflow: 'hidden', display: 'flex', flexWrap: 'wrap', gap: '0.35em' }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      className={className}
    >
      {words.map((word, index) => (
        <motion.span variants={child} key={index} className="inline-block">
          {word}
        </motion.span>
      ))}
    </motion.h2>
  );
};

export default TextReveal;