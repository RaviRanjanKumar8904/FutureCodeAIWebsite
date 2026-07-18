import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Reveal from '../Reveal';

const steps = [
  {
    num: "01",
    title: "Choose Domain",
    desc: "Select your desired tech domain based on your career goals."
  },
  {
    num: "02",
    title: "Join Local Batch",
    desc: "Enroll at a partner coaching institute near you."
  },
  {
    num: "03",
    title: "Learn Hands-On",
    desc: "Build real-world projects with expert guidance."
  },
  {
    num: "04",
    title: "Get Certified",
    desc: "Earn your certification and unlock internship opportunities."
  }
];

export default function TimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="py-24 bg-surface relative z-10" ref={containerRef}>
      <div className="container mx-auto px-6 max-w-7xl">
        <Reveal direction="up">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <h2 className="text-4xl md:text-5xl font-extrabold text-text-heading mb-6 tracking-tight">How It Works</h2>
            <p className="text-lg text-slate-500 font-medium">
              A seamless journey from enrollment to career readiness, right in your city.
            </p>
          </div>
        </Reveal>

        <div className="relative">
          {/* Connecting Line - Mobile (Vertical) */}
          <div className="absolute left-[31px] top-0 bottom-0 w-1 bg-gray-200 md:hidden rounded-full overflow-hidden shadow-inner">
            <motion.div 
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-primary via-indigo-500 to-secondary"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Connecting Line - Desktop (Horizontal) */}
          <div className="absolute top-[39px] left-0 right-0 h-1 bg-gray-200 hidden md:block rounded-full overflow-hidden shadow-inner">
            <motion.div 
              className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-primary via-indigo-500 to-secondary shadow-[0_0_10px_rgba(79,70,229,0.5)]"
              style={{ width: lineWidth }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6">
            {steps.map((step, index) => (
              <div key={index} className="relative flex md:flex-col items-start md:items-center gap-6 md:gap-8 group">
                {/* Number Circle */}
                <Reveal delay={index * 0.2} className="relative z-10 shrink-0">
                  <div className="w-16 h-16 rounded-full bg-white border-4 border-surface shadow-soft flex items-center justify-center font-extrabold text-2xl text-primary font-heading group-hover:scale-110 group-hover:shadow-glow-primary transition-all duration-300">
                    {step.num}
                  </div>
                </Reveal>

                {/* Content */}
                <Reveal delay={index * 0.2 + 0.1} direction="up" className="md:text-center mt-2 md:mt-0">
                  <h3 className="text-xl font-bold text-text-heading mb-3 tracking-tight">{step.title}</h3>
                  <p className="text-slate-500 text-sm md:text-base leading-relaxed font-medium">
                    {step.desc}
                  </p>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
