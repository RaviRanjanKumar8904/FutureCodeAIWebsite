import Reveal from '../Reveal';
import { Quote } from 'lucide-react';

export default function FounderSection({ founder }: { founder: any }) {
  return (
    <section className="py-24 bg-surface relative z-10 border-y border-gray-100">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          <div className="w-full lg:w-1/3">
            <Reveal direction="right">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary rounded-3xl transform -rotate-3 scale-105 opacity-20 blur-xl" />
                <img 
                  src={founder.photoUrl} 
                  alt={founder.name}
                  className="w-full aspect-square object-cover rounded-3xl shadow-xl relative z-10 border-4 border-white"
                />
              </div>
            </Reveal>
          </div>

          <div className="w-full lg:w-2/3">
            <Reveal direction="left" delay={0.2}>
              <h2 className="text-4xl font-extrabold text-text-heading tracking-tight mb-2">
                {founder.name}
              </h2>
              <p className="text-primary font-bold text-lg mb-8 uppercase tracking-widest">
                {founder.title}
              </p>
              
              <div className="prose prose-lg text-slate-500 font-medium leading-relaxed mb-10 max-w-none">
                <p>{founder.bio}</p>
              </div>

              <div className="relative">
                <Quote className="absolute top-0 left-0 text-primary/10 transform -translate-x-4 -translate-y-4" size={64} />
                <blockquote className="relative z-10 border-l-4 border-primary pl-6 py-2">
                  <p className="text-2xl md:text-3xl font-heading font-bold text-text-heading italic leading-tight">
                    "{founder.quote}"
                  </p>
                </blockquote>
              </div>
            </Reveal>
          </div>
          
        </div>
      </div>
    </section>
  );
}
