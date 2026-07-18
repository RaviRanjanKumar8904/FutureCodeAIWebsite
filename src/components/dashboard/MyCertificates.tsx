import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, Download, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase/config';
import { collection, getDocs, query, where } from 'firebase/firestore';

interface Certificate {
  id: string;
  courseName: string;
  issueDate: string;
  certificateId: string;
  image: string;
}

export default function MyCertificates() {
  const { user } = useAuth();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      if (!user || !user.email) return;
      try {
        const q = query(collection(db, 'certificates'), where('studentEmail', '==', user.email));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Certificate[];
        setCertificates(data);
      } catch (error) {
        console.error("Error fetching certificates:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCertificates();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (certificates.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-8 md:p-12 text-center border border-gray-100 shadow-sm flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mb-6">
          <Award size={32} className="text-amber-500" />
        </div>
        <h2 className="text-2xl font-extrabold text-text-heading mb-3">No Certificates Yet</h2>
        <p className="text-slate-500 font-medium max-w-md mx-auto mb-8">
          Complete a course or internship to earn your first verified FutureCodeAI certificate!
        </p>
        <Link 
          to="/programs" 
          className="bg-slate-100 text-text-heading px-8 py-3.5 rounded-xl font-bold hover:bg-slate-200 transition-colors"
        >
          Explore Programs
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-extrabold text-text-heading mb-6">My Certificates</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {certificates.map((cert, idx) => (
          <motion.div 
            key={cert.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300 group"
          >
            {/* Certificate Thumbnail */}
            <div className="h-48 bg-slate-50 relative p-4 border-b border-gray-100 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-orange-50 opacity-50" />
              <img src={cert.image} alt={cert.courseName} className="h-full object-contain relative z-10 drop-shadow-md group-hover:scale-105 transition-transform duration-500" />
            </div>
            
            <div className="p-5">
              <h3 className="font-bold text-lg text-text-heading mb-2">{cert.courseName}</h3>
              <div className="flex justify-between items-center text-sm text-slate-500 mb-6">
                <span>Issued: {cert.issueDate}</span>
                <span className="font-mono text-xs bg-slate-100 px-2 py-1 rounded">ID: {cert.certificateId}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 bg-primary text-white py-2.5 rounded-xl font-bold hover:bg-indigo-600 transition-colors shadow-glow-primary text-sm">
                  <Download size={16} />
                  Download
                </button>
                <button className="flex items-center justify-center gap-2 bg-[#0A66C2] text-white py-2.5 rounded-xl font-bold hover:bg-[#004182] transition-colors shadow-soft text-sm">
                  <Share2 size={16} />
                  LinkedIn
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
