import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { db } from '../../firebase/config';
import { collection, getDocs, query, where } from 'firebase/firestore';

interface Enrollment {
  id: string;
  courseName: string;
  institute: string;
  city: string;
  batchTiming: string;
  status: 'Ongoing' | 'Completed';
  image: string;
}

export default function MyCourses() {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrollments = async () => {
      if (!user) return;
      try {
        const q = query(collection(db, 'enrollments'), where('studentId', '==', user.uid));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Enrollment[];
        setEnrollments(data);
      } catch (error) {
        console.error("Error fetching enrollments:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEnrollments();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (enrollments.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-8 md:p-12 text-center border border-gray-100 shadow-sm flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
          <BookOpen size={32} className="text-primary" />
        </div>
        <h2 className="text-2xl font-extrabold text-text-heading mb-3">No Courses Yet</h2>
        <p className="text-slate-500 font-medium max-w-md mx-auto mb-8">
          You haven't been enrolled in any courses yet. If you've recently registered offline, your institute will update your status soon.
        </p>
        <Link 
          to="/programs" 
          className="bg-primary text-white px-8 py-3.5 rounded-xl font-bold shadow-glow-primary hover:bg-indigo-600 transition-colors flex items-center gap-2"
        >
          Browse Courses
          <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-extrabold text-text-heading mb-6">My Courses</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrollments.map((course, idx) => (
          <motion.div 
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm flex flex-col hover:shadow-xl transition-shadow duration-300"
          >
            <div className="h-40 relative">
              <img src={course.image} alt={course.courseName} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  course.status === 'Completed' 
                    ? 'bg-green-500 text-white shadow-glow-green' 
                    : 'bg-primary text-white shadow-glow-primary'
                }`}>
                  {course.status}
                </span>
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="font-bold text-lg text-text-heading mb-3 leading-tight line-clamp-2">
                {course.courseName}
              </h3>
              
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <MapPin size={16} className="text-primary/70 shrink-0" />
                  <span className="truncate">{course.institute}, {course.city}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Clock size={16} className="text-primary/70 shrink-0" />
                  <span className="truncate">{course.batchTiming}</span>
                </div>
              </div>

              <div className="mt-auto">
                {course.status === 'Completed' ? (
                  <Link to="/dashboard/student/certificates" className="block w-full text-center bg-slate-100 text-text-heading py-3 rounded-xl font-bold hover:bg-slate-200 transition-colors">
                    View Certificate
                  </Link>
                ) : (
                  <button className="block w-full text-center bg-slate-50 text-slate-400 py-3 rounded-xl font-bold cursor-not-allowed">
                    Certificate Locked
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
