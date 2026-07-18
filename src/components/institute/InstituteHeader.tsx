import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { Building2, MapPin, Phone } from 'lucide-react';

export default function InstituteHeader() {
  const { user } = useAuth();

  if (!user || user.role !== 'institute') return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 relative overflow-hidden"
    >
      {/* Decorative Blob */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center gap-6 relative z-10">
        <div className="w-24 h-24 rounded-2xl bg-slate-50 border border-gray-100 p-2 shadow-sm shrink-0 overflow-hidden">
          <img src={user.photoURL} alt={user.displayName} className="w-full h-full object-contain rounded-xl" />
        </div>
        
        <div>
          <h1 className="text-2xl font-extrabold text-text-heading mb-2">
            Welcome, {user.displayName}
          </h1>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500 font-medium">
            <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1 rounded-lg border border-gray-100">
              <Building2 size={16} className="text-primary" />
              Partner Institute
            </span>
            {user.city && (
              <span className="flex items-center gap-1.5">
                <MapPin size={16} className="text-slate-400" />
                {user.city}
              </span>
            )}
            {user.phone && (
              <span className="flex items-center gap-1.5">
                <Phone size={16} className="text-slate-400" />
                {user.phone}
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="bg-slate-50 p-4 rounded-2xl border border-gray-100 w-full md:w-auto relative z-10">
        <p className="text-sm font-bold text-slate-700 mb-1">Account Status</p>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm font-medium text-green-700">Active Partner</span>
        </div>
      </div>
    </motion.div>
  );
}
