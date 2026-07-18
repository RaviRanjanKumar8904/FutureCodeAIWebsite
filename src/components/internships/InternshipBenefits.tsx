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
    <section className="py-20 bg-white relative z-10 border-b border-gray-100">
      <div className="container mx-auto px-6 max-w-7xl">
        <Reveal direction="up">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-text-heading mb-4 tracking-tight">Why Intern With Us?</h2>
            <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
              We bridge the gap between academic theory and industry demands.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {benefits.map((benefit, index) => (
            <Reveal key={index} direction="up" delay={index * 0.1}>
              <div className="flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm ${benefit.color}`}>
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-bold text-text-heading mb-2">{benefit.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{benefit.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
