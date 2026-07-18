import { Briefcase, Award, Users, Globe, FileText } from 'lucide-react';
import Reveal from '../Reveal';

const benefits = [
  {
    icon: <Briefcase size={28} />,
    title: "Real Projects",
    desc: "Work on live, industry-grade projects instead of dummy assignments.",
    color: "bg-blue-100 text-blue-600"
  },
  {
    icon: <Award size={28} />,
    title: "Certificate + LOR",
    desc: "Earn a verified completion certificate and a Letter of Recommendation.",
    color: "bg-indigo-100 text-indigo-600"
  },
  {
    icon: <Users size={28} />,
    title: "Mentorship",
    desc: "Get 1-on-1 guidance from experienced senior developers.",
    color: "bg-purple-100 text-purple-600"
  },
  {
    icon: <Globe size={28} />,
    title: "Hybrid Flexibility",
    desc: "Work remotely or from one of our partnered local offline centers.",
    color: "bg-teal-100 text-teal-600"
  },
  {
    icon: <FileText size={28} />,
    title: "Resume Building",
    desc: "Add tangible impact and real-world tech stacks to your resume.",
    color: "bg-rose-100 text-rose-600"
  }
];

export default function InternshipBenefits() {
  return (
    <section className="py-20 relative z-10">
      <div className="container mx-auto px-6 max-w-7xl">
        <Reveal direction="up">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-text-heading mb-4 tracking-tight">Why Intern With Us?</h2>
            <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
              We bridge the gap between academic theory and industry demands.
            </p>
          </div>
        </Reveal>

        <div className="flex overflow-x-auto pb-8 -mx-6 px-6 md:grid md:grid-cols-2 lg:grid-cols-5 md:overflow-visible md:pb-0 md:mx-0 md:px-0 gap-4 md:gap-6 xl:gap-8 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {benefits.map((benefit, index) => (
            <Reveal key={index} direction="up" delay={index * 0.1} className="w-[80vw] max-w-[280px] shrink-0 md:w-auto md:max-w-none md:shrink h-full snap-center">
              <div className="glass p-5 md:p-6 rounded-3xl flex flex-col items-center text-center h-full border border-white/60 hover:shadow-premium-card hover:-translate-y-1 transition-all duration-300 group">
                <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-4 md:mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300 ${benefit.color}`}>
                  {/* Clone element to pass responsive size prop to lucide icon if needed, or rely on CSS scaling */}
                  <div className="scale-75 md:scale-100">{benefit.icon}</div>
                </div>
                <h3 className="text-base md:text-lg font-bold text-text-heading mb-2 md:mb-3">{benefit.title}</h3>
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed">{benefit.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
