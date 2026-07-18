import { motion } from 'framer-motion';
import Reveal from '../Reveal';
import { Building2, ArrowRight, Laptop } from 'lucide-react';

export default function OurStory({ text }: { text: string }) {
  return (
    <section className="py-24 bg-surface relative z-10 border-y border-gray-100 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <div className="w-full lg:w-1/2">
            <Reveal direction="right">
              <h2 className="text-3xl md:text-4xl font-extrabold text-text-heading mb-6 tracking-tight">
                Our Story
              </h2>
              <div className="w-12 h-1 bg-primary mb-8 rounded-full" />
              <p className="text-lg text-slate-500 font-medium leading-relaxed">
                {text}
              </p>
            </Reveal>
          </div>

          <div className="w-full lg:w-1/2">
            <Reveal direction="left" delay={0.2}>
              <div className="relative w-full min-h-[400px]">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-secondary/10 rounded-[2.5rem] transform rotate-3" />
                
                <div className="glass absolute inset-0 rounded-[2.5rem] flex items-center justify-center p-8 overflow-hidden border border-white/60 shadow-xl">
                {/* Abstract animated connection graphic */}
                <div className="flex items-center justify-between w-full max-w-sm relative z-10">
                  
                  {/* Local Institute */}
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-col items-center gap-4"
                  >
                    <div className="w-20 h-20 rounded-2xl bg-white shadow-soft flex items-center justify-center text-slate-400">
                      <Building2 size={32} />
                    </div>
                    <span className="font-bold text-sm text-text-heading">Local Institutes</span>
                  </motion.div>

                  {/* Animated Connecting Line */}
                  <div className="flex-grow flex items-center justify-center relative px-4">
                    <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden absolute">
                      <motion.div
                        className="h-full bg-gradient-to-r from-transparent via-primary to-secondary"
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                      />
                    </div>
                    <motion.div
                      animate={{ x: [0, 10, 0] }}
                      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                      className="text-primary z-10 bg-white rounded-full p-1"
                    >
                      <ArrowRight size={24} />
                    </motion.div>
                  </div>

                  {/* Tech Curriculum */}
                  <motion.div 
                    initial={{ y: -20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex flex-col items-center gap-4"
                  >
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary shadow-glow-primary flex items-center justify-center text-white">
                      <Laptop size={32} />
                    </div>
                    <span className="font-bold text-sm text-text-heading">Tech Curriculum</span>
                  </motion.div>
                  
                </div>
                </div>
              </div>
            </Reveal>
          </div>
          
        </div>
      </div>
    </section>
  );
}
