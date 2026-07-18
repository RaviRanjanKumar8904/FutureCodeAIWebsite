import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, getDocs, query, where } from 'firebase/firestore';
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
import { Briefcase } from 'lucide-react';

export default function Internships() {
  const [internships, setInternships] = useState<InternshipData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInternship, setSelectedInternship] = useState<InternshipData | null>(null);
  const [applyingForTarget, setApplyingForTarget] = useState<TargetInfo | null>(null);

  const handleApply = (target: TargetInfo) => {
    setApplyingForTarget(target);
  };

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const q = query(collection(db, 'internships'), where('isActive', '==', true));
        const snapshot = await getDocs(q);
        const fetchedInternships = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as InternshipData[];
        setInternships(fetchedInternships);
      } catch (error) {
        console.error("Error fetching internships:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInternships();
  }, []);

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
              {loading ? (
                <div className="col-span-full flex justify-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
                </div>
              ) : internships.length === 0 ? (
                <div className="col-span-full text-center py-20">
                  <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Briefcase size={32} className="text-slate-400" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-text-heading mb-3">No Internships Currently Open</h3>
                  <p className="text-slate-500 font-medium">Please check back later for new opportunities.</p>
                </div>
              ) : (
                internships.map((internship, index) => (
                  <InternshipCard 
                    key={internship.id}
                    internship={internship}
                    index={index}
                    onClick={() => setSelectedInternship(internship)}
                  />
                ))
              )}
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
