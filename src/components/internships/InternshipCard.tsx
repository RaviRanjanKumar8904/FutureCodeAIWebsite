import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Clock, Code2 } from 'lucide-react';
import Reveal from '../Reveal';

export interface InternshipData {
  id: string;
  title: string;
  domain: string;
  description: string;
  duration: string;
  eligibility: string;
  stipend: string;
  skills: string[];
  deadline: string;
  isActive: boolean;
}

interface InternshipCardProps {
  internship: InternshipData;
  index: number;
  onClick: () => void;
}

export default function InternshipCard({ internship, index, onClick }: InternshipCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    setRotateX(yPct * -10);
    setRotateY(xPct * 10);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <Reveal direction="up" delay={index * 0.1}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        animate={{
          rotateX,
          rotateY,
          transformPerspective: 1000
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.5 }}
        className="glass rounded-3xl p-8 cursor-pointer h-full flex flex-col group border border-white/60 hover:shadow-premium-card relative overflow-hidden"
      >
        {/* Dynamic Glare Overlay */}
        <motion.div 
          className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${50 + rotateY * 5}% ${50 - rotateX * 5}%, rgba(255,255,255,0.4) 0%, transparent 60%)`
          }}
        />

        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-start justify-between mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Code2 size={24} />
            </div>
            <div className="bg-slate-100 px-3 py-1 rounded-full text-xs font-bold text-slate-600 uppercase tracking-wider">
              {internship.domain}
            </div>
          </div>

          <h3 className="text-2xl font-extrabold text-text-heading mb-3">{internship.title}</h3>
          <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">{internship.description}</p>
          
          <div className="flex items-center gap-2 text-sm text-slate-600 font-medium py-4 border-t border-gray-100">
            <Clock size={16} className="text-primary" /> {internship.duration}
          </div>

          <button className="mt-2 w-full py-3 rounded-xl bg-slate-100 text-primary font-bold group-hover:bg-primary group-hover:text-white group-hover:shadow-glow-primary transition-all duration-300">
            View Details
          </button>
        </div>
      </motion.div>
    </Reveal>
  );
}
