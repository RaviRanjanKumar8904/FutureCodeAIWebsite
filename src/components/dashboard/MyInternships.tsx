import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, ArrowRight, Clock, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase/config';
import { collection, getDocs, query, where } from 'firebase/firestore';

interface InternshipApplication {
  id: string;
  role: string;
  company: string; // Internal or Partner
  status: 'Applied' | 'Screening' | 'Interview' | 'Ongoing' | 'Completed';
  appliedDate: string;
}

export default function MyInternships() {
  const { user } = useAuth();
  const [internships, setInternships] = useState<InternshipApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInternships = async () => {
      if (!user) return;
      try {
        const q = query(collection(db, 'internshipApplications'), where('studentId', '==', user.uid));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as InternshipApplication[];
        setInternships(data);
      } catch (error) {
        console.error("Error fetching internships:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInternships();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (internships.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-8 md:p-12 text-center border border-gray-100 shadow-sm flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
          <Briefcase size={32} className="text-indigo-500" />
        </div>
        <h2 className="text-2xl font-extrabold text-text-heading mb-3">No Internships Yet</h2>
        <p className="text-slate-500 font-medium max-w-md mx-auto mb-8">
          You haven't applied for any internships. Gain real-world experience by applying for our domain-specific roles.
        </p>
        <Link 
          to="/internships" 
          className="bg-primary text-white px-8 py-3.5 rounded-xl font-bold shadow-glow-primary hover:bg-indigo-600 transition-colors flex items-center gap-2"
        >
          Explore Internships
          <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ongoing': return 'text-primary bg-primary/10';
      case 'Completed': return 'text-green-600 bg-green-100';
      case 'Applied': return 'text-amber-600 bg-amber-100';
      default: return 'text-slate-600 bg-slate-100';
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-extrabold text-text-heading mb-6">My Internships</h2>
      <div className="grid gap-4">
        {internships.map((internship, idx) => (
          <motion.div 
            key={internship.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div>
              <h3 className="font-bold text-lg text-text-heading mb-1">{internship.role}</h3>
              <p className="text-slate-500 text-sm font-medium">{internship.company}</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1.5 text-sm text-slate-500">
                <Clock size={16} />
                Applied: {internship.appliedDate}
              </div>
              <div className={`px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-1.5 ${getStatusColor(internship.status)}`}>
                {internship.status === 'Completed' && <CheckCircle2 size={16} />}
                {internship.status}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
