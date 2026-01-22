import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HERO_CONTENT } from '../constants';
import Button from './ui/Button';

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  
  // Parallax transforms for depth
  const bgY = useTransform(scrollY, [0, 1000], [0, 400]);
  const gridY = useTransform(scrollY, [0, 1000], [0, 200]);
  const contentY = useTransform(scrollY, [0, 1000], [0, 100]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  // Handle Badge Logic
  const badgeFullText = HERO_CONTENT.badge;
  const splitText = "Spoiler: It never does.";
  const parts = badgeFullText.split(splitText);
  const hasSpoiler = parts.length > 1;

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden bg-black selection:bg-brand-orange/30">
      {/* Dynamic Background with Parallax */}
      <motion.div 
        style={{ y: bgY, opacity }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#111] via-black to-black opacity-80" 
      />
      
      {/* Moving Grid - Made subtler */}
      <motion.div 
        style={{ y: gridY, opacity }}
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" 
      />
      
      {/* Container */}
      <div className="container mx-auto relative z-10 max-w-[1400px]">
        <motion.div 
          style={{ y: contentY }} 
          className="max-w-[1300px] mx-auto text-center flex flex-col items-center justify-center"
        >
            {/* Badge - Premium Styling with Split Content */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#0a0a0a] border border-white/10 backdrop-blur-xl mb-8 hover:border-brand-orange/20 transition-all shadow-[0_0_30px_rgba(0,0,0,0.6)] group cursor-default"
            >
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-orange shadow-[0_0_10px_#ff6b00]"></span>
                </span>
                <span className="text-gray-200 text-xs md:text-sm font-medium tracking-wide uppercase group-hover:text-white transition-colors">
                  {hasSpoiler ? (
                    <>
                      {parts[0]}
                      <span className="text-brand-orange font-extrabold italic">{splitText}</span>
                      {parts[1]}
                    </>
                  ) : (
                    badgeFullText
                  )}
                </span>
              </div>
            </motion.div>

            {/* Headline - Clean & Sharp with Balance */}
            <div className="flex flex-col items-center justify-center mb-10 mx-auto w-full relative z-20">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-6xl lg:text-[5.5rem] font-bold tracking-tight text-white leading-[1.1] text-center max-w-6xl mx-auto [text-wrap:balance]"
              >
                <span className="text-white inline-block mb-2 md:mb-4">{HERO_CONTENT.headlinePart1}</span>
                <br className="hidden md:block" />
                <span className="bg-gradient-to-r from-[#FF5C00] via-[#FF8F40] to-white bg-clip-text text-transparent box-decoration-clone">
                   {HERO_CONTENT.headlinePart2}
                </span>
              </motion.h1>
            </div>

            {/* Subtext Container - Dark Rounded Box (Pill shape) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="relative mb-12 max-w-4xl mx-auto"
            >
               <div className="inline-block bg-[#050505] border border-white/10 rounded-full px-8 py-4 shadow-[0_10px_40px_rgba(0,0,0,0.5)] backdrop-blur-sm">
                   <p className="text-gray-300 text-lg md:text-xl font-medium leading-tight">
                      {HERO_CONTENT.subheadline}
                   </p>
               </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex justify-center relative z-10"
            >
              <Button variant="beam" className="text-lg px-12 py-6 shadow-[0_20px_50px_rgba(255,92,0,0.1)]">
                {HERO_CONTENT.cta}
              </Button>
            </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;