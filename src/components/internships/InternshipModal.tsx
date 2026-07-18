import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, GraduationCap, Briefcase, Calendar, CheckCircle2 } from 'lucide-react';
import type { InternshipData } from './InternshipCard';

interface InternshipModalProps {
  internship: InternshipData | null;
  onClose: () => void;
  onApply: (target: { id: string, title: string }) => void;
}

export default function InternshipModal({ internship, onClose, onApply }: InternshipModalProps) {
  if (!internship) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm cursor-pointer"
        />

        {/* Modal Content */}
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col z-10"
        >
          {/* Header */}
          <div className="relative bg-gradient-to-r from-slate-900 to-[#152a4f] p-8 md:p-12 shrink-0">
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 bg-white/10 hover:bg-white text-white hover:text-slate-900 backdrop-blur-md p-2 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
            <div className="inline-block bg-primary text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
              {internship.domain}
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white">{internship.title}</h2>
          </div>

          {/* Scrollable Body */}
          <div className="flex-grow overflow-y-auto p-6 md:p-10 scrollbar-hide">
            <div className="flex flex-col lg:flex-row gap-10">
              
              {/* Main Content (Left) */}
              <div className="w-full lg:w-2/3 space-y-10">
                <section>
                  <h3 className="text-2xl font-bold text-text-heading mb-4">Role Overview</h3>
                  <p className="text-slate-600 leading-relaxed text-lg">{internship.description}</p>
                </section>

                <section>
                  <h3 className="text-2xl font-bold text-text-heading mb-4">Skills Required</h3>
                  <div className="flex flex-wrap gap-2">
                    {internship.skills.map((skill, idx) => (
                      <span key={idx} className="bg-slate-100 text-slate-700 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-primary" />
                        {skill}
                      </span>
                    ))}
                  </div>
                </section>
              </div>

              {/* Sidebar (Right) */}
              <div className="w-full lg:w-1/3">
                <div className="bg-slate-50 border border-gray-100 rounded-2xl p-6 sticky top-0 space-y-6">
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Clock className="text-primary mt-1" size={20} />
                      <div>
                        <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Duration</p>
                        <p className="font-bold text-text-heading">{internship.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <GraduationCap className="text-secondary mt-1" size={20} />
                      <div>
                        <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Eligibility</p>
                        <p className="font-bold text-text-heading">{internship.eligibility}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Briefcase className="text-indigo-500 mt-1" size={20} />
                      <div>
                        <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Stipend / Comp</p>
                        <p className="font-bold text-text-heading">{internship.stipend}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Calendar className="text-red-500 mt-1" size={20} />
                      <div>
                        <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Apply Before</p>
                        <p className="font-bold text-text-heading">{internship.deadline}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-200">
                    <button 
                      onClick={() => {
                        onClose();
                        onApply({ id: internship.id, title: internship.title });
                      }}
                      className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-600 transition-colors shadow-glow-primary"
                    >
                      Apply Now
                    </button>
                  </div>
                  
                </div>
              </div>
              
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
