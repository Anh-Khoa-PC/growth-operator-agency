import React, { useState, useEffect } from 'react';
import SectionWrapper from './ui/SectionWrapper';
import { BENTO_FEATURES, AGENCY_STATS } from '../constants';
import { motion } from 'framer-motion';
import { Check, Headset, Globe, Phone, DollarSign } from 'lucide-react';

const Works: React.FC = () => {
  return (
    <SectionWrapper id="features" className="bg-black relative py-12 md:py-24">
       {/* Background ambient glow */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-brand-orange/5 blur-[120px] rounded-full pointer-events-none opacity-50" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-[1400px] mx-auto px-4">
        
        {/* Card 1: Effortless Management */}
        <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="group relative overflow-hidden rounded-[2.5rem] bg-[#080808] border border-white/10 hover:border-brand-orange/20 transition-all duration-500 h-[650px] flex flex-col items-center justify-between p-12 text-center"
        >
             {/* Visual: Auto-Pilot Interface + Keyboard */}
             <div className="w-full flex-1 flex flex-col items-center justify-center gap-8 relative">
                 
                 {/* Interface Window */}
                 <div className="w-full max-w-[320px] bg-[#0c0c0c] rounded-2xl border border-white/10 p-5 shadow-2xl relative z-10">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex gap-2">
                             <div className="w-2 h-2 rounded-full bg-[#333]" />
                             <div className="w-2 h-2 rounded-full bg-[#333]" />
                             <div className="w-2 h-2 rounded-full bg-[#333]" />
                        </div>
                        <div className="px-3 py-1 bg-brand-orange/10 rounded-full border border-brand-orange/20">
                            <span className="text-[10px] font-bold text-brand-orange uppercase tracking-wider flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
                                Auto-Pilot
                            </span>
                        </div>
                    </div>

                    <div className="space-y-3 font-mono text-xs">
                        <AnimatedStatusRow label="Ads Campaign" targetStatus="Optimized" color="text-[#4ADE80]" delay={0.5} />
                        <AnimatedStatusRow label="Landing Page" targetStatus="Published" color="text-[#FB923C]" delay={2.0} />
                        <AnimatedStatusRow label="CRM System" targetStatus="Connected" color="text-[#60A5FA]" delay={3.5} />
                    </div>
                 </div>

                 {/* Dark Keyboard Representation with Typing Animation */}
                 <div className="w-full max-w-[340px] h-[100px] bg-[#111] rounded-xl border border-white/5 p-3 relative transform perspective-[1000px] rotate-x-12 shadow-2xl">
                     <div className="grid grid-cols-10 gap-1.5 opacity-80">
                        {[...Array(30)].map((_, i) => (
                             <KeyCap key={i} index={i} />
                        ))}
                        <div className="col-span-10 h-4 bg-[#222] rounded-[2px] mt-1 opacity-50" />
                     </div>
                     {/* Orange Glow Highlight - Moves */}
                     <motion.div 
                        className="absolute top-1/2 w-12 h-12 bg-brand-orange/20 blur-xl rounded-full" 
                        animate={{ left: ["20%", "70%", "30%", "60%"] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                     />
                 </div>
             </div>

             <div className="relative z-10 max-w-xl mx-auto">
                 <h3 className="text-3xl font-bold text-white mb-4">{BENTO_FEATURES[0].title}</h3>
                 <p className="text-gray-400 text-lg leading-relaxed">{BENTO_FEATURES[0].description}</p>
             </div>
        </motion.div>

        {/* Card 2: Guaranteed Results */}
        <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="group relative overflow-hidden rounded-[2.5rem] bg-[#080808] border border-white/10 hover:border-brand-orange/20 transition-all duration-500 h-[650px] flex flex-col items-center justify-between p-12 text-center"
        >
             {/* Visual: Bar Chart */}
             <div className="w-full flex-1 flex items-center justify-center">
                <div className="relative w-full max-w-[380px] h-[240px] bg-[#0C0C0C] rounded-2xl border border-white/5 p-6 flex flex-col shadow-2xl overflow-hidden">
                   
                   {/* Chart Header */}
                   <div className="flex justify-between items-center mb-4">
                       <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Revenue Growth</span>
                       <span className="text-[10px] font-bold text-brand-orange bg-brand-orange/10 px-2 py-0.5 rounded">LIVE</span>
                   </div>

                   {/* Grid Lines */}
                   <div className="absolute inset-x-6 top-16 bottom-6 flex flex-col justify-between pointer-events-none opacity-20">
                       <div className="border-t border-dashed border-white/30 w-full" />
                       <div className="border-t border-dashed border-white/30 w-full" />
                       <div className="border-t border-dashed border-white/30 w-full" />
                   </div>

                   {/* Bars */}
                   <div className="flex-1 flex items-end gap-3 relative z-10 px-2 pb-1">
                        {[35, 45, 40, 60, 55, 75, 50].map((h, i) => (
                            <motion.div 
                                key={i}
                                initial={{ height: 0 }}
                                whileInView={{ height: `${h}%` }}
                                transition={{ duration: 1, delay: i * 0.1 }}
                                className="flex-1 bg-[#222] rounded-t-md hover:bg-[#333] transition-colors"
                            />
                        ))}
                        
                        {/* The Hero Bar */}
                        <motion.div 
                            initial={{ height: 0 }}
                            whileInView={{ height: "100%" }}
                            transition={{ duration: 1.2, delay: 0.8, type: "spring" }}
                            className="flex-1 bg-brand-orange rounded-t-md relative group-hover:brightness-110 shadow-[0_0_20px_rgba(255,92,0,0.3)]"
                        >
                            {/* Label */}
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.5 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1.5 }}
                                className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold px-2 py-1 rounded shadow-lg whitespace-nowrap"
                            >
                                $10k+
                                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-white" />
                            </motion.div>
                        </motion.div>
                   </div>
                </div>
             </div>

             <div className="relative z-10 max-w-xl mx-auto">
                 <h3 className="text-3xl font-bold text-white mb-4">{BENTO_FEATURES[1].title}</h3>
                 <p className="text-gray-400 text-lg leading-relaxed">{BENTO_FEATURES[1].description}</p>
             </div>
        </motion.div>

        {/* Card 3: Done-For-You Sales (Updated Visual) */}
        <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="group relative overflow-hidden rounded-[2.5rem] bg-[#080808] border border-white/10 hover:border-brand-orange/20 transition-all duration-500 min-h-[500px] flex flex-col items-center justify-between p-12 text-center lg:col-span-1"
        >
              {/* New Global Sales Visual */}
              <SalesTeamVisual />

             <div className="relative z-10 max-w-2xl">
                 <h3 className="text-3xl font-bold text-white mb-4">{BENTO_FEATURES[2].title}</h3>
                 <p className="text-gray-400 text-lg leading-relaxed">{BENTO_FEATURES[2].description}</p>
             </div>
        </motion.div>

        {/* Card 4: Proven Track Record */}
        <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="group relative overflow-hidden rounded-[2.5rem] bg-[#080808] border border-white/10 hover:border-brand-orange/20 transition-all duration-500 min-h-[500px] flex flex-col p-12 lg:col-span-1 text-center"
        >
             <div className="text-center mb-10">
                 <h3 className="text-3xl font-bold text-white mb-4">{BENTO_FEATURES[3].title}</h3>
                 <p className="text-gray-400 text-lg leading-relaxed">{BENTO_FEATURES[3].description}</p>
             </div>

             <div className="flex-1 w-full max-w-md mx-auto">
                 <div className="bg-[#111] rounded-2xl border border-white/5 p-1">
                    {AGENCY_STATS.map((stat, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 border-b border-white/5 last:border-0 hover:bg-[#1a1a1a] transition-colors rounded-xl">
                            <span className="text-gray-400 text-sm font-medium">{stat.label}</span>
                            <span className="text-white font-bold">{stat.value}</span>
                        </div>
                    ))}
                 </div>
             </div>
        </motion.div>

      </div>
    </SectionWrapper>
  );
};

// --- Sub-components ---

const SalesTeamVisual = () => {
    return (
        <div className="relative w-full h-[320px] flex items-center justify-center overflow-visible">
            {/* Background Radar Effect */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30">
                 <div className="w-[280px] h-[280px] border border-white/10 rounded-full border-dashed" />
                 <div className="absolute w-[180px] h-[180px] border border-white/10 rounded-full" />
                 <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute w-[280px] h-[280px] bg-[conic-gradient(from_0deg,transparent_0deg,rgba(255,92,0,0.1)_60deg,transparent_60deg)] rounded-full mix-blend-overlay"
                 />
            </div>

            {/* Central Hub */}
            <div className="relative z-20 w-20 h-20 bg-[#0a0a0a] rounded-full border border-white/10 flex flex-col items-center justify-center shadow-[0_0_40px_rgba(255,92,0,0.2)]">
                 <div className="absolute inset-0 rounded-full bg-brand-orange/5 animate-pulse" />
                 <Globe className="w-8 h-8 text-brand-orange opacity-90" />
                 <div className="absolute -bottom-2 px-2 py-0.5 bg-brand-orange text-[8px] font-bold text-white rounded-full">
                    24/7
                 </div>
            </div>

            {/* Orbiting Closers */}
            <OrbitingCloser delay={0} radius={100} duration={12} img="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" />
            <OrbitingCloser delay={4} radius={100} duration={12} img="https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka" />
            <OrbitingCloser delay={8} radius={100} duration={12} img="https://api.dicebear.com/7.x/avataaars/svg?seed=Mark" />

            {/* Live Activity Popups */}
            <LiveActivityCard 
                text="Deal Closed" 
                amount="+$3,500" 
                img="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                x={-90} y={-80} delay={2} 
            />
             <LiveActivityCard 
                text="In Call..." 
                type="call"
                img="https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka"
                x={90} y={60} delay={5} 
            />
        </div>
    )
}

const OrbitingCloser = ({ radius, duration, delay, img }: any) => {
    return (
        <motion.div
            className="absolute w-12 h-12"
            animate={{ rotate: 360 }}
            transition={{ duration: duration, repeat: Infinity, ease: "linear", delay: -delay }}
            style={{ 
                // Using a parent wrapper that rotates, and countering rotation on child
                width: radius * 2, 
                height: radius * 2 
            }}
        >
             <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                 <motion.div 
                    className="w-10 h-10 rounded-full border-2 border-[#111] bg-[#222] overflow-hidden relative z-10"
                    animate={{ rotate: -360 }}
                    transition={{ duration: duration, repeat: Infinity, ease: "linear", delay: -delay }}
                 >
                     <img src={img} alt="Closer" className="w-full h-full object-cover" />
                     {/* Online Indicator */}
                     <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-[#111]" />
                 </motion.div>
             </div>
        </motion.div>
    );
}

const LiveActivityCard = ({ text, amount, img, x, y, delay, type }: any) => {
    const isDeal = type !== 'call';
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8, y: y + 10 }}
            animate={{ 
                opacity: [0, 1, 1, 0],
                y: [y + 10, y, y, y - 10],
                scale: [0.8, 1, 1, 0.9]
            }}
            transition={{ 
                duration: 4, 
                repeat: Infinity, 
                delay: delay, 
                repeatDelay: 3 
            }}
            className="absolute z-30 flex items-center gap-3 p-2 pr-4 bg-[#0a0a0a]/90 backdrop-blur-md border border-white/10 rounded-full shadow-2xl"
            style={{ marginLeft: x, marginTop: y }}
        >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isDeal ? 'bg-green-500/20' : 'bg-blue-500/20'}`}>
                {isDeal ? <DollarSign className="w-4 h-4 text-green-500" /> : <Phone className="w-4 h-4 text-blue-500" />}
            </div>
            <div className="flex flex-col items-start">
                <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">{text}</span>
                {amount && <span className="text-xs font-bold text-white">{amount}</span>}
            </div>
        </motion.div>
    )
}

const AnimatedStatusRow: React.FC<{ label: string; targetStatus: string; color: string; delay: number }> = ({ label, targetStatus, color, delay }) => {
    const [status, setStatus] = useState('Pending...');
    
    useEffect(() => {
        const timeout = setTimeout(() => {
             setStatus(targetStatus);
        }, delay * 1000);
        return () => clearTimeout(timeout);
    }, [targetStatus, delay]);

    return (
        <div className="flex items-center justify-between bg-[#151515] p-2.5 rounded-lg border border-white/5">
            <span className="text-gray-400 pl-1">{label}</span>
            <div className="flex items-center gap-1.5">
                <span className={`font-bold transition-all duration-500 ${status === 'Pending...' ? 'text-gray-600' : color}`}>
                    {status}
                </span>
                {status !== 'Pending...' && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                        <Check className={`w-3 h-3 ${color}`} />
                    </motion.div>
                )}
            </div>
        </div>
    );
};

const KeyCap = ({ index }: { index: number }) => {
    return (
        <motion.div 
            className={`rounded-[2px] bg-[#222] ${index >= 30 ? 'h-3' : 'h-3'}`}
            style={{ 
                gridColumn: index === 35 ? 'span 4' : 'span 1' 
            }}
            animate={{ 
                backgroundColor: ["#222", "#444", "#222"],
                transform: ["translateY(0px)", "translateY(1px)", "translateY(0px)"]
            }}
            transition={{ 
                duration: 0.15, 
                delay: Math.random() * 5, // Randomly trigger press
                repeat: Infinity,
                repeatDelay: Math.random() * 2 
            }}
        />
    )
}

export default Works;