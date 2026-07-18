import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, ChevronDown, CheckCircle2 } from 'lucide-react';
import type { CourseData } from './CourseCard';

interface CourseModalProps {
  course: CourseData | null;
  onClose: () => void;
  onEnquire: (target: { id: string, title: string }) => void;
}

export default function CourseModal({ course, onClose, onEnquire }: CourseModalProps) {
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);

  if (!course) return null;

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
          {/* Header Image */}
          <div className="relative h-48 md:h-64 shrink-0">
            <img src={course.thumbnailUrl} alt={course.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white text-white hover:text-slate-900 backdrop-blur-md p-2 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
            <div className="absolute bottom-6 left-6 md:left-10 right-6">
              <div className="inline-block bg-primary text-white text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
                {course.category}
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white">{course.title}</h2>
            </div>
          </div>

          {/* Scrollable Body */}
          <div className="flex-grow overflow-y-auto p-6 md:p-10 scrollbar-hide">
            <div className="flex flex-col lg:flex-row gap-10">
              
              {/* Main Content (Left) */}
              <div className="w-full lg:w-2/3 space-y-8">
                <section>
                  <h3 className="text-2xl font-bold text-text-heading mb-4">About this Course</h3>
                  <p className="text-slate-600 leading-relaxed text-lg">{course.description}</p>
                </section>

                <section>
                  <h3 className="text-2xl font-bold text-text-heading mb-4">Curriculum</h3>
                  <div className="space-y-3">
                    {course.syllabus.map((module, index) => (
                      <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
                        <button 
                          className="w-full bg-slate-50 px-5 py-4 flex items-center justify-between font-bold text-text-heading hover:bg-slate-100 transition-colors"
                          onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                        >
                          <span className="text-left">{module.title}</span>
                          <ChevronDown size={20} className={`transform transition-transform ${openAccordion === index ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {openAccordion === index && (
                            <motion.div 
                              initial={{ height: 0 }}
                              animate={{ height: 'auto' }}
                              exit={{ height: 0 }}
                              className="overflow-hidden"
                            >
                              <ul className="px-5 py-4 space-y-2 bg-white">
                                {module.topics.map((topic, tIdx) => (
                                  <li key={tIdx} className="flex items-start gap-2 text-slate-600">
                                    <CheckCircle2 size={16} className="text-green-500 mt-0.5 shrink-0" />
                                    <span>{topic}</span>
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </section>

                {course.galleryUrls && course.galleryUrls.length > 0 && (
                  <section>
                    <h3 className="text-2xl font-bold text-text-heading mb-4">Batch Gallery</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {course.galleryUrls.map((url, i) => (
                        <img key={i} src={url} alt={`Gallery ${i}`} className="w-full h-32 object-cover rounded-xl" />
                      ))}
                    </div>
                  </section>
                )}
              </div>

              {/* Sidebar (Right) */}
              <div className="w-full lg:w-1/3">
                <div className="bg-slate-50 border border-gray-100 rounded-2xl p-6 sticky top-0 space-y-6">
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Clock className="text-primary mt-1" size={20} />
                      <div>
                        <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Duration</p>
                        <p className="font-bold text-text-heading">{course.duration}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-200">
                    <button 
                      onClick={() => {
                        onClose();
                        onEnquire({ id: course.id, title: course.title });
                      }}
                      className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-600 transition-colors shadow-glow-primary"
                    >
                      Enquire Now
                    </button>
                    {/* TODO: Add payment integration here in future phase */}
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
