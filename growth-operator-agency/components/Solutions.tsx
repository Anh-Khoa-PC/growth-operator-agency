import React, { useState, useEffect } from 'react';
import SectionWrapper from './ui/SectionWrapper';
import { SOLUTIONS } from '../constants';
import { motion } from 'framer-motion';
import { Box, Settings, Mail, Archive, Folder, CreditCard, Zap, User, Clock, CheckCircle2, Split } from 'lucide-react';

const Solutions: React.FC = () => {
  return (
    <SectionWrapper id="solutions" className="bg-black py-12 md:py-24">
      <div className="mb-24 text-center max-w-5xl mx-auto px-4">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-[1.1] tracking-tight">
          Complete Backend Solutions <br className="hidden md:block" /> For Creators & Coaches
        </h2>
        <p className="text-gray-400 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
          from course creation to automated funnels, we handle every technical detail so you can focus on what matters most to you
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-[1400px] mx-auto px-4">
        
        {/* Card 1: Stress Less */}
        <SolutionCard 
            title={SOLUTIONS[0].title} 
            description={SOLUTIONS[0].description}
            delay={0}
        >
            <StressLessVisual />
        </SolutionCard>

        {/* Card 2: Proven Systems */}
        <SolutionCard 
            title={SOLUTIONS[1].title} 
            description={SOLUTIONS[1].description}
            delay={0.15}
        >
            <ProvenSystemsVisual />
        </SolutionCard>

        {/* Card 3: Smart Automation */}
        <SolutionCard 
            title={SOLUTIONS[2].title} 
            description={SOLUTIONS[2].description}
            delay={0.3}
        >
            <SmartAutomationVisual />
        </SolutionCard>

      </div>
    </SectionWrapper>
  );
};

// Reusable Card Component
const SolutionCard: React.FC<{ title: string; description: string; children: React.ReactNode; delay: number }> = ({ title, description, children, delay }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="group relative bg-[#080808] border border-white/10 rounded-[2.5rem] overflow-hidden flex flex-col items-center text-center hover:border-brand-orange/30 transition-all duration-500 h-[600px]"
        >
             {/* Title Area - Top */}
            <div className="pt-12 pb-6 px-6 relative z-10 w-full">
                <h3 className="text-3xl font-bold text-white tracking-tight">{title}</h3>
            </div>

            {/* Visual/Animation Area - Center (Flex grow) */}
            <div className="w-full flex-1 flex items-center justify-center relative px-4 overflow-visible">
                {/* Subtle Ambient Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-brand-orange/5 blur-[60px] rounded-full pointer-events-none" />
                {children}
            </div>

            {/* Description Area - Bottom */}
            <div className="pb-12 pt-6 px-8 relative z-10 w-full max-w-sm mx-auto">
                <p className="text-gray-400 text-lg leading-relaxed">
                    {description}
                </p>
            </div>
        </motion.div>
    );
}

// Visual 1: Stress Less (Refined)
const StressLessVisual = () => {
    return (
        <div className="relative w-[320px] h-[200px] flex items-center justify-between">
            {/* SVG Connecting Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                 <defs>
                    <linearGradient id="stress-line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#ff6b00" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#ff6b00" stopOpacity="0.1" />
                    </linearGradient>
                </defs>
                {[40, 100, 160].map((y, i) => (
                    <motion.path 
                        key={i}
                        d={`M 70 100 L 260 ${y}`} 
                        fill="none" 
                        stroke="url(#stress-line-gradient)" 
                        strokeWidth="1"
                        strokeOpacity="0.4"
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.5, delay: 0.5 + (i * 0.2) }}
                    />
                ))}
            </svg>

            {/* Center Main Node */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
                 <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="w-16 h-16 rounded-2xl bg-[#111] border border-brand-orange shadow-[0_0_30px_rgba(255,92,0,0.2)] flex items-center justify-center relative"
                 >
                    <Box className="w-8 h-8 text-brand-orange" />
                    {/* Ping effect */}
                    <div className="absolute inset-0 rounded-2xl border border-brand-orange/50 animate-ping opacity-20" />
                 </motion.div>
            </div>

            {/* Right Side Nodes */}
            <div className="absolute right-0 top-0 bottom-0 flex flex-col justify-between py-2 z-10">
                {[
                    { Icon: Archive, delay: 0 },
                    { Icon: Folder, delay: 0.2 },
                    { Icon: CreditCard, delay: 0.4 }
                ].map(({ Icon, delay }, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: delay + 0.5, duration: 0.5 }}
                        className="w-12 h-12 rounded-xl bg-[#111] border border-white/10 flex items-center justify-center hover:border-brand-orange/30 hover:bg-[#161616] transition-all"
                    >
                        <Icon className="w-5 h-5 text-gray-500" />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

// Visual 2: Proven Systems (Refined Code Window + Keyboard with Typing)
const ProvenSystemsVisual = () => {
    // Typing effect logic
    const codeLines = [
        { text: "const system = {", indent: 0, color: "text-[#C792EA]" },
        { text: "status: 'optimized',", indent: 1, color: "text-[#C3E88D]" },
        { text: "growth: true,", indent: 1, color: "text-[#F78C6C]" },
        { text: "revenue: \"$10k+\"", indent: 1, color: "text-[#82AAFF]" },
        { text: "}", indent: 0, color: "text-[#C792EA]" }
    ];

    return (
        <div className="relative flex flex-col items-center justify-center gap-6">
            {/* Code Window */}
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="w-[280px] bg-[#0A0A0A] rounded-xl border border-white/10 overflow-hidden shadow-2xl relative z-20"
            >
                {/* Header */}
                <div className="h-8 bg-[#151515] border-b border-white/5 flex items-center px-3 gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                </div>
                
                {/* Content with Typewriter Effect */}
                <div className="p-5 font-mono text-[10px] leading-relaxed bg-[#050505]/50 backdrop-blur-sm min-h-[140px]">
                     <div className="flex flex-col gap-1.5 text-left">
                        {codeLines.map((line, idx) => (
                             <TypewriterLine 
                                key={idx} 
                                text={line.text} 
                                indent={line.indent} 
                                color={line.color} 
                                delay={idx * 0.8} // Stagger lines
                             />
                        ))}
                        
                        <div className="flex gap-1 mt-2 items-center">
                            <span className="text-gray-500">{">"}</span>
                            <motion.span 
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                                className="w-2 h-4 bg-brand-orange block"
                            />
                        </div>
                     </div>
                </div>
            </motion.div>

            {/* Minimal Flat Keyboard with Typing Animation */}
            <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="w-[300px] h-[80px] bg-[#0f0f0f] rounded-lg border border-white/5 p-2 grid grid-cols-10 gap-1.5 opacity-80"
            >
                {/* Keys */}
                 {[...Array(40)].map((_, i) => (
                    <KeyCap key={i} index={i} />
                ))}
            </motion.div>
        </div>
    );
};

const TypewriterLine = ({ text, indent, color, delay }: any) => {
    const [displayedText, setDisplayedText] = useState('');
    
    useEffect(() => {
        const timeout = setTimeout(() => {
            let currentText = '';
            let currentIndex = 0;
            
            const interval = setInterval(() => {
                if (currentIndex < text.length) {
                    currentText += text[currentIndex];
                    setDisplayedText(currentText);
                    currentIndex++;
                } else {
                    clearInterval(interval);
                }
            }, 30 + Math.random() * 30); // Random typing speed

            return () => clearInterval(interval);
        }, delay * 1000);
        
        return () => clearTimeout(timeout);
    }, [text, delay]);

    return (
        <div className={`${color}`} style={{ paddingLeft: `${indent * 12}px` }}>
            {displayedText}
        </div>
    );
};

const KeyCap = ({ index }: { index: number }) => {
    return (
        <motion.div 
            className={`rounded-[2px] bg-[#1a1a1a] ${index >= 30 ? 'h-3' : 'h-3'}`}
            style={{ 
                gridColumn: index === 35 ? 'span 4' : 'span 1' 
            }}
            animate={{ 
                backgroundColor: ["#1a1a1a", "#333333", "#1a1a1a"],
                scale: [1, 0.95, 1]
            }}
            transition={{ 
                duration: 0.2, 
                delay: Math.random() * 2, // Random initial delay
                repeat: Infinity,
                repeatDelay: Math.random() * 3 // Random repeat delay
            }}
        />
    )
}

// Visual 3: Smart Automation (Complex Workflow Tree)
const SmartAutomationVisual = () => {
    return (
        <div className="relative w-[340px] h-[340px] flex items-center justify-center">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:16px_16px] opacity-30" />

            {/* Workflow Container */}
            <div className="relative z-10 flex flex-col items-center">
                
                {/* Level 1: Trigger */}
                <WorkflowNode 
                    icon={<User className="w-4 h-4 text-white" />} 
                    label="Lead" 
                    color="bg-blue-500" 
                    delay={0}
                />

                {/* Vertical Connector 1 */}
                <ConnectingLine h={30} delay={0.5} />

                {/* Level 2: Decision/Delay */}
                <WorkflowNode 
                    icon={<Clock className="w-4 h-4 text-brand-orange" />} 
                    label="Wait 2m" 
                    color="bg-[#222]" 
                    borderColor="border-brand-orange/50"
                    delay={1}
                />

                {/* Vertical Connector 2 (Split) */}
                <div className="relative h-8 w-px bg-[#333] my-1 overflow-hidden">
                     <motion.div 
                        className="absolute top-0 left-0 w-full bg-brand-orange"
                        initial={{ height: 0 }}
                        whileInView={{ height: "100%" }}
                        transition={{ duration: 0.5, delay: 1.5 }}
                    />
                </div>
                
                {/* Horizontal Split Line */}
                 <div className="relative w-32 h-px bg-[#333] mb-4">
                     <motion.div 
                         className="absolute top-0 left-1/2 w-0 h-full bg-brand-orange"
                         initial={{ width: 0, x: "-50%" }}
                         whileInView={{ width: "100%" }}
                         transition={{ duration: 0.5, delay: 1.8 }}
                     />
                     {/* Vertical Drops from ends */}
                      <motion.div 
                        className="absolute left-0 top-0 w-px h-4 bg-brand-orange origin-top"
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        transition={{ duration: 0.3, delay: 2.2 }}
                      />
                      <motion.div 
                        className="absolute right-0 top-0 w-px h-4 bg-brand-orange origin-top"
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        transition={{ duration: 0.3, delay: 2.2 }}
                      />
                 </div>

                {/* Level 3: Actions */}
                <div className="flex gap-8">
                     <WorkflowNode 
                        icon={<Mail className="w-4 h-4 text-purple-400" />} 
                        label="Email" 
                        color="bg-[#151515]" 
                        delay={2.4}
                    />
                     <WorkflowNode 
                        icon={<Zap className="w-4 h-4 text-yellow-400" />} 
                        label="CRM" 
                        color="bg-[#151515]" 
                        delay={2.6}
                    />
                </div>

                {/* Success Popups */}
                 <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 3, type: "spring" }}
                    className="absolute -right-4 bottom-2 bg-green-500 text-white text-[9px] font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-lg"
                 >
                    <CheckCircle2 className="w-3 h-3" />
                    Sent
                 </motion.div>

            </div>
        </div>
    );
};

const WorkflowNode = ({ icon, label, color, borderColor, delay }: any) => (
    <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ delay, type: "spring", stiffness: 200, damping: 15 }}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${borderColor || 'border-white/10'} ${color || 'bg-[#1a1a1a]'} shadow-xl relative z-10 min-w-[100px] justify-center`}
    >
        {icon}
        <span className="text-xs font-medium text-gray-200">{label}</span>
    </motion.div>
)

const ConnectingLine = ({ h, delay }: { h: number, delay: number }) => (
    <div className={`relative w-px bg-[#333] my-1 overflow-hidden`} style={{ height: h }}>
        <motion.div 
            className="absolute top-0 left-0 w-full bg-brand-orange"
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            transition={{ duration: 0.5, delay: delay }}
        />
    </div>
)

export default Solutions;