import Reveal from '../Reveal';

export default function ProgramsHero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden flex flex-col items-center border-b border-gray-100">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent z-0" />
      <div className="container mx-auto px-6 max-w-5xl relative z-10 text-center">
        <Reveal direction="up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-white shadow-premium-card text-sm font-semibold text-primary mb-8">
            Offline Tech Programs
          </div>
        </Reveal>
        
        <Reveal direction="up" delay={0.1}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-text-heading mb-6 tracking-tight leading-tight">
            Learn In-Demand Tech Skills at Your <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Nearest Partner Institute</span>
          </h1>
        </Reveal>

        <Reveal direction="up" delay={0.2}>
          <p className="text-lg md:text-xl text-slate-500 font-medium max-w-3xl mx-auto mb-10 leading-relaxed">
            Gain real-world experience through expert-led, hands-on classes hosted locally. No need to relocate—we bring the premium tech curriculum to you.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
