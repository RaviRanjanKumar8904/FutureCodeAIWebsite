import { useState } from 'react';
import BackgroundBlobs from '../components/BackgroundBlobs';
import InternshipHero from '../components/internships/InternshipHero';
import InternshipBenefits from '../components/internships/InternshipBenefits';
import InternshipCard from '../components/internships/InternshipCard';
import type { InternshipData } from '../components/internships/InternshipCard';
import InternshipModal from '../components/internships/InternshipModal';
import InternshipTimeline from '../components/internships/InternshipTimeline';
import EnquiryFormModal from '../components/programs/EnquiryFormModal';
import type { TargetInfo } from '../components/programs/EnquiryFormModal';
import SEO from '../components/SEO';

const fallbackInternships: InternshipData[] = [
  {
    id: "int-1",
    title: "Frontend Developer Intern",
    domain: "Web Development",
    description: "Work on live consumer-facing web applications. You will be building responsive UIs, integrating REST APIs, and optimizing performance using React and modern CSS.",
    duration: "3 - 6 Months",
    eligibility: "B.Tech/BCA/MCA (3rd Year or above)",
    stipend: "Performance Based + Certificate",
    skills: ["React.js", "Tailwind CSS", "TypeScript", "Git"],
    deadline: "Aug 30, 2026",
    isActive: true
  },
  {
    id: "int-2",
    title: "Machine Learning Intern",
    domain: "AI / ML",
    description: "Assist our core AI team in training and fine-tuning predictive models. You'll be working with real datasets, dealing with data cleaning, and deploying basic models.",
    duration: "6 Months",
    eligibility: "B.Tech CS/IT with strong Math background",
    stipend: "Certificate + Pre-Placement Offer (PPO) Opportunity",
    skills: ["Python", "Pandas", "Scikit-learn", "TensorFlow basics"],
    deadline: "Sep 15, 2026",
    isActive: true
  },
  {
    id: "int-3",
    title: "Backend Developer Intern",
    domain: "Full-Stack",
    description: "Design and implement scalable backend microservices. You will work on database architecture, authentication flows, and server optimization.",
    duration: "3 Months",
    eligibility: "Any tech background with strong problem-solving skills",
    stipend: "Certificate Based",
    skills: ["Node.js", "Express", "MongoDB", "REST APIs"],
    deadline: "Aug 15, 2026",
    isActive: true
  },
  {
    id: "int-4",
    title: "Prompt Engineering Intern",
    domain: "Generative AI",
    description: "Explore the bleeding edge of Generative AI. You will build and test prompt pipelines to automate content generation and data extraction tasks.",
    duration: "2 Months",
    eligibility: "Open to all, strong communication required",
    stipend: "Certificate Based",
    skills: ["ChatGPT / Claude APIs", "Prompt Structuring", "Analytical Thinking"],
    deadline: "Rolling Basis",
    isActive: true
  }
];

export default function Internships() {
  const [internships] = useState<InternshipData[]>(fallbackInternships);
  const [selectedInternship, setSelectedInternship] = useState<InternshipData | null>(null);
  const [applyingForTarget, setApplyingForTarget] = useState<TargetInfo | null>(null);

  const handleApply = (target: TargetInfo) => {
    setApplyingForTarget(target);
  };

  return (
    <div className="w-full relative bg-background min-h-screen">
      <SEO 
        title="Internships" 
        description="Kickstart your career with top tech internships offered by FutureCodeAI and our industry partners."
      />
      <BackgroundBlobs />
      
      <main className="w-full relative z-10">
        <InternshipHero />
        
        <section id="internship-domains" className="py-20 relative z-10">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-text-heading mb-4 tracking-tight">Open Domains</h2>
              <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
                Find the perfect role that matches your skills and career aspirations.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {internships.map((internship, index) => (
                <InternshipCard 
                  key={internship.id}
                  internship={internship}
                  index={index}
                  onClick={() => setSelectedInternship(internship)}
                />
              ))}
            </div>
          </div>
        </section>

        <InternshipBenefits />
        <InternshipTimeline />
      </main>

      {/* Detail Modal */}
      <InternshipModal 
        internship={selectedInternship}
        onClose={() => setSelectedInternship(null)}
        onApply={handleApply}
      />

      {/* Application Form Modal (Reusing EnquiryFormModal with type=internship) */}
      <EnquiryFormModal 
        isOpen={!!applyingForTarget}
        onClose={() => setApplyingForTarget(null)}
        target={applyingForTarget}
        type="internship"
      />
    </div>
  );
}
