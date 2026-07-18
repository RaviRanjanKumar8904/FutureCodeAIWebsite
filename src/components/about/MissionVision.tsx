import Reveal from '../Reveal';
import { Target, Eye } from 'lucide-react';

export default function MissionVision({ mission, vision }: { mission: string, vision: string }) {
  return (
    <section className="py-24 relative z-10">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid md:grid-cols-2 gap-8">
          
          <Reveal direction="up" delay={0.1} className="h-full">
            <div className="glass h-full p-8 md:p-12 rounded-[2rem] flex flex-col group hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <Target size={32} />
              </div>
              <h3 className="text-3xl font-extrabold text-text-heading mb-6 tracking-tight">Our Mission</h3>
              <p className="text-lg text-slate-500 font-medium leading-relaxed flex-grow">
                {mission}
              </p>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.2} className="h-full">
            <div className="glass h-full p-8 md:p-12 rounded-[2rem] flex flex-col group hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                <Eye size={32} />
              </div>
              <h3 className="text-3xl font-extrabold text-text-heading mb-6 tracking-tight">Our Vision</h3>
              <p className="text-lg text-slate-500 font-medium leading-relaxed flex-grow">
                {vision}
              </p>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
