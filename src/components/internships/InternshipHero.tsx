import { motion } from 'framer-motion';
import Reveal from '../Reveal';

export default function InternshipHero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden flex flex-col items-center border-b border-gray-100">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent z-0" />
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <Reveal direction="up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-white shadow-premium-card text-sm font-semibold text-primary mb-6">
                College Internships
              </div>
            </Reveal>
            
            <Reveal direction="up" delay={0.1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-text-heading mb-6 tracking-tight leading-tight">
                Kickstart Your Career with <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Real-World Internships</span>
              </h1>
            </Reveal>

            <Reveal direction="up" delay={0.2}>
              <p className="text-lg md:text-xl text-slate-500 font-medium mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Stop doing generic tutorials. Join our partner network and work on live projects under expert mentorship to build a resume that actually gets you hired.
              </p>
            </Reveal>
            
            <Reveal direction="up" delay={0.3}>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <button 
                  onClick={() => {
                    const domains = document.getElementById('internship-domains');
                    if (domains) domains.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-indigo-600 transition-all shadow-glow-primary"
                >
                  Explore Domains
                </button>
              </div>
            </Reveal>
          </div>

          <div className="w-full lg:w-1/2 flex justify-center relative">
            <Reveal direction="left" delay={0.2}>
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 2, -2, 0]
                }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative z-10"
              >
                {/* 3D Abstract Representation of Launch/Career */}
                <div className="w-72 h-72 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center relative shadow-2xl">
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px] rounded-full border border-white/20"></div>
                  <div className="text-white opacity-90 relative z-20 font-heading font-extrabold text-6xl tracking-tighter shadow-sm">
                    {"< / >"}
                  </div>
                  {/* Decorative orbital rings */}
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-8 border border-white/30 rounded-full border-dashed"
                  />
                  <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-16 border border-primary/20 rounded-full"
                  />
                </div>
              </motion.div>
            </Reveal>
            
            {/* Background glowing blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/30 rounded-full blur-[80px] -z-10" />
          </div>
        </div>

      </div>
    </section>
  );
}
