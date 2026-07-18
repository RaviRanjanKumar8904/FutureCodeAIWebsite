import { FileEdit, Search, Users, Rocket } from 'lucide-react';
import Reveal from '../Reveal';

const steps = [
  {
    id: 1,
    title: "Apply Online",
    desc: "Submit your details along with your current skillset.",
    icon: <FileEdit size={24} />
  },
  {
    id: 2,
    title: "Screening",
    desc: "Our team reviews your profile to find the best domain match.",
    icon: <Search size={24} />
  },
  {
    id: 3,
    title: "Interview / Task",
    desc: "A quick technical chat or a small assignment to gauge your basics.",
    icon: <Users size={24} />
  },
  {
    id: 4,
    title: "Onboarding",
    desc: "Get access to your mentorship dashboard and start your first project!",
    icon: <Rocket size={24} />
  }
];

export default function InternshipTimeline() {
  return (
    <section className="py-24 bg-surface relative z-10">
      <div className="container mx-auto px-6 max-w-5xl">
        <Reveal direction="up">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-text-heading mb-4 tracking-tight">Application Process</h2>
            <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
              We keep our application process fast and transparent so you can start learning sooner.
            </p>
          </div>
        </Reveal>

        <div className="relative">
          <div className="flex overflow-x-auto pb-8 -mx-6 px-6 md:grid md:grid-cols-4 gap-4 md:gap-8 relative z-10 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {steps.map((step, index) => (
              <Reveal key={step.id} direction="up" delay={index * 0.1} className="w-[80vw] max-w-[280px] shrink-0 md:w-auto md:max-w-none md:shrink snap-center relative z-10">
                {/* Connecting Line Segment to next item */}
                {index !== steps.length - 1 && (
                  <div className="absolute top-10 md:top-12 left-1/2 w-[calc(100%+1rem)] md:w-[calc(100%+2rem)] h-1 bg-gradient-to-r from-primary/20 to-secondary/20 -z-20" />
                )}
                
                <div className="flex flex-col items-center text-center px-2">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white shadow-xl border-4 border-white flex items-center justify-center text-primary mb-4 md:mb-6 relative group hover:scale-110 transition-transform duration-300 z-10">
                    <div className="absolute inset-0 bg-primary/5 rounded-full" />
                    <div className="scale-90 md:scale-100">{step.icon}</div>
                    
                    {/* Step Number Badge */}
                    <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-7 h-7 md:w-8 md:h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs md:text-sm font-bold shadow-md">
                      {step.id}
                    </div>
                  </div>
                  
                  <h3 className="text-lg md:text-xl font-bold text-text-heading mb-2 md:mb-3">{step.title}</h3>
                  <p className="text-slate-500 text-sm md:text-base font-medium">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
