import { useState, useEffect } from 'react';
import { collection, getDocs, limit, query, where } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Users } from 'lucide-react';
import Reveal from '../Reveal';

interface Course {
  id: string;
  title: string;
  domain: string;
  duration: string;
  studentsCount: number;
  thumbnailUrl?: string;
  featured: boolean;
}

export default function FeaturedCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const q = query(collection(db, "courses"), where("featured", "==", true), limit(4));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Course));
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const displayData = courses.length > 0 ? courses : [
    {
      id: '1',
      title: 'Advanced AI & Machine Learning',
      domain: 'Artificial Intelligence',
      duration: '6 Months',
      studentsCount: 1200,
      featured: true,
      thumbnailUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: '2',
      title: 'Full-Stack Web Development',
      domain: 'Web Development',
      duration: '4 Months',
      studentsCount: 2500,
      featured: true,
      thumbnailUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: '3',
      title: 'Data Structures & Algorithms in C++',
      domain: 'Core Programming',
      duration: '3 Months',
      studentsCount: 1800,
      featured: true,
      thumbnailUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: '4',
      title: 'Mastering Prompt Engineering',
      domain: 'AI Applications',
      duration: '2 Months',
      studentsCount: 850,
      featured: true,
      thumbnailUrl: 'https://images.unsplash.com/photo-1676299081847-824916de030a?auto=format&fit=crop&q=80&w=800'
    }
  ];

  if (loading) return null;

  return (
    <section className="py-24 bg-surface relative z-10">
      <div className="container mx-auto px-6 max-w-7xl">
        <Reveal direction="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-bold text-text-heading mb-4">Featured Courses</h2>
              <p className="text-lg text-text-body">
                Industry-aligned programs designed to make you a top 1% developer.
              </p>
            </div>
            <Link 
              to="/courses"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all shrink-0"
            >
              View All Courses <ArrowRight size={20} />
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          {displayData.map((course, index) => (
            <Reveal key={course.id} delay={index * 0.1} direction="up" className="h-full">
              <Link to={`/courses/${course.id}`} className="group h-full block">
                <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-soft-lg transition-all duration-300 border border-gray-100 h-full flex flex-col hover:-translate-y-1">
                  <div className="relative h-32 sm:h-48 overflow-hidden">
                    {course.thumbnailUrl ? (
                      <img 
                        src={course.thumbnailUrl} 
                        alt={course.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 group-hover:scale-105 transition-transform duration-500" />
                    )}
                    <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-white/90 backdrop-blur px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold text-primary shadow-sm">
                      {course.domain}
                    </div>
                  </div>
                  
                  <div className="p-3 sm:p-6 flex flex-col flex-grow">
                    <h3 className="text-sm sm:text-lg font-bold text-text-heading mb-2 sm:mb-4 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                      {course.title}
                    </h3>
                    
                    <div className="mt-auto flex items-center justify-between text-[10px] sm:text-sm text-text-body flex-wrap gap-2">
                      <div className="flex items-center gap-1 sm:gap-1.5">
                        <Clock size={12} className="text-gray-400 sm:w-4 sm:h-4" />
                        {course.duration}
                      </div>
                      <div className="flex items-center gap-1 sm:gap-1.5">
                        <Users size={12} className="text-gray-400 sm:w-4 sm:h-4" />
                        {course.studentsCount}+
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
