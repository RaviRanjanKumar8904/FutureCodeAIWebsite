import Reveal from '../Reveal';
import { Lightbulb, Globe2, Terminal, Briefcase } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Lightbulb: <Lightbulb size={32} />,
  Globe2: <Globe2 size={32} />,
  Terminal: <Terminal size={32} />,
  Briefcase: <Briefcase size={32} />
};

export default function ValuesSection({ values }: { values: any[] }) {
  return (
    <section className="py-24 relative z-10">
      <div className="container mx-auto px-6 max-w-7xl">
        <Reveal direction="up">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-text-heading mb-6 tracking-tight">Our Core Values</h2>
            <div className="w-12 h-1 bg-primary mx-auto rounded-full" />
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((val, index) => (
            <Reveal key={index} direction="up" delay={index * 0.1} className="h-full">
              <div className="glass h-full p-8 rounded-3xl flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-300">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-soft text-primary flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-glow-primary transition-all duration-300">
                  {iconMap[val.iconKey] || <Lightbulb size={32} />}
                </div>
                <h3 className="text-xl font-bold text-text-heading mb-3">{val.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{val.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
