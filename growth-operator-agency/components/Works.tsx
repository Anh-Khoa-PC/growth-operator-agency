import React from 'react';
import SectionWrapper from './ui/SectionWrapper';
import { RECENT_WORKS, WORK_METRICS } from '../constants';
import { Instagram, Youtube, Link as LinkIcon, ArrowUpRight } from 'lucide-react';

const Works: React.FC = () => {
    
    const getIcon = (platform: string) => {
        switch(platform) {
            case 'instagram': return <Instagram className="w-5 h-5" />;
            case 'youtube': return <Youtube className="w-5 h-5" />;
            default: return <LinkIcon className="w-5 h-5" />;
        }
    };

  return (
    <SectionWrapper id="works" className="bg-black">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-white">
          Recent Works, Notable Impact
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
        {/* Left: List of clients */}
        <div className="flex flex-col justify-center gap-4">
            {RECENT_WORKS.map((work, index) => (
                <div key={index} className="group p-8 border border-white/5 rounded-2xl bg-[#030303] hover:bg-[#050505] hover:border-white/10 transition-all duration-300 relative cursor-default overflow-hidden">
                    {/* Subtle Noise Texture */}
                    <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-overlay" />
                    
                    <div className="absolute top-8 right-8 flex gap-3 opacity-50 group-hover:opacity-100 transition-opacity z-10">
                         {work.platforms.map(p => (
                             <div key={p} className="text-gray-400 hover:text-white transition-colors">
                                 {getIcon(p)}
                             </div>
                         ))}
                    </div>
                    
                    <div className="flex items-start gap-4 relative z-10">
                        <div className="w-1 h-12 bg-white/10 rounded-full group-hover:bg-brand-orange transition-colors duration-300 mt-1" />
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                                {work.name}
                            </h3>
                            <p className="text-gray-400 text-sm md:text-base">{work.description}</p>
                        </div>
                    </div>
                    
                    <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 z-10">
                        <ArrowUpRight className="text-brand-orange w-5 h-5" />
                    </div>
                </div>
            ))}
        </div>

        {/* Right: Feature Image */}
        <div className="relative h-[400px] lg:h-auto rounded-2xl overflow-hidden border border-white/5 group">
            <div className="absolute inset-0 bg-gray-900">
                <img 
                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1200&auto=format&fit=crop" 
                    alt="Success Story" 
                    className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-8 left-8 z-10">
                 <div className="bg-brand-orange text-white text-xs font-bold px-3 py-1 rounded mb-2 inline-block">CASE STUDY</div>
                 <h4 className="text-white text-2xl font-bold">Scaling Personal Brands</h4>
            </div>
        </div>
      </div>

      {/* Metrics Footer */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-12">
        {WORK_METRICS.map((metric, index) => (
            <div key={index} className={`text-center ${index !== 0 ? 'md:border-l md:border-white/10' : ''} group hover:bg-white/5 rounded-xl transition-colors py-4`}>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:text-brand-orange transition-colors">{metric.value}</div>
                <div className="text-gray-500 text-sm font-medium tracking-wide">{metric.label}</div>
            </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Works;