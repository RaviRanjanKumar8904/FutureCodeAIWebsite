import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';

export default function DashboardHeader() {
  const { user } = useAuth();

  if (!user) return null;

  // Calculate profile completion
  const fields = [user.phone, user.school, user.city, user.degree, user.yearOfStudy, user.githubUrl, user.linkedinUrl];
  const filledFields = fields.filter(field => field && field.trim().length > 0).length;
  const completionPercentage = Math.round(((filledFields + 2) / 9) * 100); // base 2 for name & email

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row items-center md:items-start gap-6 relative overflow-hidden"
    >
      {/* Decorative background blob */}
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      {/* Avatar */}
      <div className="relative z-10 shrink-0">
        <img 
          src={user.photoURL} 
          alt={user.displayName} 
          className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-white shadow-soft-xl bg-slate-100"
        />
        <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-2 border-white rounded-full flex items-center justify-center shadow-sm">
          <span className="w-2 h-2 bg-white rounded-full"></span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 text-center md:text-left z-10 w-full mt-2 md:mt-0">
        <h1 className="text-2xl md:text-3xl font-extrabold text-text-heading mb-1">
          Welcome back, {user.displayName.split(' ')[0]}! 👋
        </h1>
        <p className="text-slate-500 font-medium mb-6">
          Ready to continue your learning journey?
        </p>

        {/* Progress Bar */}
        {completionPercentage < 100 && (
          <div className="max-w-md w-full bg-slate-50 p-4 rounded-2xl border border-gray-100">
            <div className="flex justify-between items-end mb-2">
              <span className="text-sm font-bold text-slate-700">Profile Completion</span>
              <span className="text-sm font-bold text-primary">{completionPercentage}%</span>
            </div>
            <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${completionPercentage}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-primary to-indigo-500 rounded-full"
              />
            </div>
            <p className="text-xs text-slate-500 mt-2 font-medium">
              Complete your profile in Settings to unlock personalized recommendations.
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
