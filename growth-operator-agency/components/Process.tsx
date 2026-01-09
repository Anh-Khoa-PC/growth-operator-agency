import React from 'react';
import SectionWrapper from './ui/SectionWrapper';
import { PROCESS_STEPS } from '../constants';
import Button from './ui/Button';

const Process: React.FC = () => {
  return (
    <SectionWrapper id="process" className="bg-brand-black">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            The <span className="text-brand-orange">Growth Operator</span> System
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Our proprietary 3-step framework is designed to remove you from the day-to-day operations while skyrocketing your revenue.
          </p>
          <Button variant="outline">See The Roadmap</Button>
        </div>

        <div className="space-y-8">
          {PROCESS_STEPS.map((step, index) => (
            <div key={index} className="flex gap-6 group">
              <div className="flex-shrink-0">
                <span className="flex items-center justify-center w-12 h-12 rounded-full border border-brand-orange/20 text-brand-orange font-bold text-lg bg-brand-orange/5 group-hover:bg-brand-orange group-hover:text-white transition-all duration-300">
                  {step.number}
                </span>
                {index !== PROCESS_STEPS.length - 1 && (
                  <div className="w-px h-full bg-white/10 mx-auto mt-4 group-hover:bg-brand-orange/30 transition-colors" />
                )}
              </div>
              <div className="pb-8">
                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Process;