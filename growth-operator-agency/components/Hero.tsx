import React from 'react';
import { motion } from 'framer-motion';
import { HERO_CONTENT } from '../constants';
import Button from './ui/Button';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 px-4 overflow-hidden bg-black">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-black to-black opacity-80" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_20%,#000_60%,transparent_100%)] pointer-events-none" />
      
      {/* Animated Glows - Stronger and positioned behind the text */}
      <motion.div 
        animate={{ opacity: [0.4, 0.6, 0.4], scale: [1, 1.2, 1], rotate: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[15%] left-[50%] -translate-x-1/2 w-[60vw] h-[40vw] bg-brand-orange/15 blur-[120px] rounded-full pointer-events-none" 
      />

      <div className="container mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-5xl mx-auto text-center"
        >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md mb-10 hover:bg-black/80 transition-colors shadow-lg relative z-10"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              <span className="text-gray-300 text-xs md:text-sm font-medium tracking-wide uppercase">
                {HERO_CONTENT.badge}
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-[1.1] md:leading-[1.1] drop-shadow-2xl relative z-10">
              <span className="block text-white mb-2">Growth Operator Agency</span>
              <span className="block text-white/90">Monetising Audiences</span>
              <span className="block bg-gradient-to-r from-brand-orange via-[#FF8F50] to-brand-orange bg-clip-text text-transparent pb-2 bg-[length:200%_auto] animate-pulse-slow">
                 With Digital Communities
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-gray-300/80 max-w-2xl mx-auto mb-12 leading-relaxed font-light relative z-10">
              {HERO_CONTENT.subheadline}
            </p>

            {/* CTA Button */}
            <div className="flex justify-center relative z-10">
              <Button 
                variant="secondary" 
                className="!text-white !px-10 !py-5 text-lg shadow-[0_0_40px_-10px_rgba(255,92,0,0.5)] hover:shadow-[0_0_60px_-10px_rgba(255,92,0,0.6)] hover:scale-105 transition-all duration-300 border border-white/10"
              >
                {HERO_CONTENT.cta}
              </Button>
            </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;