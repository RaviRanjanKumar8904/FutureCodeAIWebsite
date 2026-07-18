import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Clock, Users } from 'lucide-react';
import Reveal from '../Reveal';

export interface CourseData {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  level: string;
  institute: {
    name: string;
    city: string;
    address: string;
  };
  thumbnailUrl: string;
  galleryUrls: string[];
  syllabus: { title: string; topics: string[] }[];
  batchTimings: string;
  isActive: boolean;
  totalSeats?: number;
  filledSeats?: number;
}

interface CourseCardProps {
  course: CourseData;
  index: number;
  onClick: () => void;
}

export default function CourseCard({ course, index, onClick }: CourseCardProps) {
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
    
    // Tilt limit (e.g. max 15 degrees)
    setRotateX(yPct * -15);
    setRotateY(xPct * 15);
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
        className="glass rounded-3xl overflow-hidden cursor-pointer h-full flex flex-col group border border-white/60 hover:shadow-[0_20px_40px_rgba(79,70,229,0.15)] relative"
      >
        {/* Dynamic Glare Overlay */}
        <motion.div 
          className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${50 + rotateY * 5}% ${50 - rotateX * 5}%, rgba(255,255,255,0.4) 0%, transparent 60%)`
          }}
        />

        <div className="h-32 sm:h-48 overflow-hidden relative">
          <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-10 bg-white/90 backdrop-blur-md px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold text-primary shadow-sm uppercase tracking-wider">
            {course.category}
          </div>
          {course.totalSeats != null && course.totalSeats > 0 && (() => {
            const seatsLeft = Math.max(0, course.totalSeats - (course.filledSeats || 0));
            return (
              <div className={`absolute top-2 right-2 sm:top-4 sm:right-4 z-10 backdrop-blur-md px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold shadow-sm flex items-center gap-1 ${
                seatsLeft === 0
                  ? 'bg-red-500/90 text-white'
                  : seatsLeft <= 5
                    ? 'bg-amber-500/90 text-white'
                    : 'bg-emerald-500/90 text-white'
              }`}>
                <Users size={10} className="sm:w-3 sm:h-3" />
                {seatsLeft === 0 ? 'Full' : `${seatsLeft} seats left`}
              </div>
            );
          })()}
          <img 
            src={course.thumbnailUrl} 
            alt={course.title}
            loading="lazy"
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          />
        </div>

        <div className="p-3 sm:p-6 flex flex-col flex-grow relative z-10 bg-white/40">
          <h3 className="text-sm sm:text-xl font-extrabold text-text-heading mb-1 sm:mb-2 line-clamp-2 leading-tight">{course.title}</h3>
          <p className="text-slate-500 text-[10px] sm:text-sm mb-2 sm:mb-4 line-clamp-2 leading-relaxed">{course.description}</p>
          
          <div className="space-y-1 sm:space-y-2 mt-auto pt-2 sm:pt-4 border-t border-gray-200">
            <div className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-sm text-slate-600 font-medium">
              <Clock size={12} className="text-primary sm:w-4 sm:h-4" /> {course.duration}
            </div>
          </div>

          <button className="mt-3 sm:mt-6 w-full py-2 sm:py-3 rounded-lg sm:rounded-xl bg-slate-100 text-primary text-xs sm:text-base font-bold group-hover:bg-primary group-hover:text-white group-hover:shadow-glow-primary transition-all duration-300">
            View Details
          </button>
        </div>
      </motion.div>
    </Reveal>
  );
}
