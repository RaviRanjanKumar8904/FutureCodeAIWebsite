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
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-12 right-12 h-1 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-full" />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <Reveal key={step.id} direction="up" delay={index * 0.1}>
                <div className="flex flex-col items-center text-center relative">
                  {/* Mobile Connecting Line */}
                  {index !== steps.length - 1 && (
                    <div className="md:hidden absolute top-24 bottom-[-2rem] left-1/2 w-0.5 bg-gray-200 -z-10" />
                  )}
                  
                  <div className="w-24 h-24 rounded-full bg-white shadow-xl border-4 border-white flex items-center justify-center text-primary mb-6 relative group hover:scale-110 transition-transform duration-300">
                    <div className="absolute inset-0 bg-primary/5 rounded-full" />
                    {step.icon}
                    
                    {/* Step Number Badge */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm font-bold shadow-md">
                      {step.id}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-text-heading mb-3">{step.title}</h3>
                  <p className="text-slate-500 font-medium">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
