import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Reveal from '../Reveal';

export default function VerticalTimeline({ milestones }: { milestones: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="py-24 bg-surface relative z-10 border-y border-gray-100 overflow-hidden" id="milestones">
      <div className="container mx-auto px-6 max-w-4xl">
        <Reveal direction="up">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold text-text-heading mb-6 tracking-tight">Our Journey</h2>
            <div className="w-12 h-1 bg-primary mx-auto rounded-full" />
          </div>
        </Reveal>

        <div className="relative" ref={containerRef}>
          {/* Static Background Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gray-200 transform md:-translate-x-1/2 rounded-full" />
          
          {/* Animated Highlight Line */}
          <motion.div 
            className="absolute left-8 md:left-1/2 top-0 w-1 bg-gradient-to-b from-primary via-indigo-500 to-secondary transform md:-translate-x-1/2 rounded-full origin-top"
            style={{ height: lineHeight }}
          />

          <div className="space-y-12 md:space-y-24 relative z-10">
            {milestones.map((milestone, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={index} className={`flex flex-col md:flex-row items-start md:items-center w-full ${isEven ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-white border-4 border-primary shadow-glow-primary z-20 mt-6 md:mt-0" />
                  
                  {/* Content Box */}
                  <div className="w-full md:w-1/2 pl-16 md:pl-0">
                    <Reveal 
                      direction={isEven ? "left" : "right"} 
                      delay={0.1}
                      className={`md:${isEven ? 'pl-12' : 'pr-12'}`}
                    >
                      <div className="glass p-6 md:p-8 rounded-2xl hover:-translate-y-1 transition-transform duration-300">
                        <span className="text-primary font-bold text-xl mb-2 block">{milestone.year}</span>
                        <h3 className="text-2xl font-extrabold text-text-heading mb-3 tracking-tight">{milestone.title}</h3>
                        <p className="text-slate-500 font-medium leading-relaxed">{milestone.description}</p>
                      </div>
                    </Reveal>
                  </div>
                  
                  {/* Empty space for alternating layout */}
                  <div className="hidden md:block md:w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
