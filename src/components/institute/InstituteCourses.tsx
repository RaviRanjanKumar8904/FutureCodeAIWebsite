import { motion } from 'framer-motion';
import { BookOpen, Users, Clock, CalendarDays } from 'lucide-react';

interface Batch {
  id: string;
  courseName: string;
  batchId: string;
  timing: string;
  startDate: string;
  capacity: number;
  filled: number;
  status: 'Active' | 'Upcoming' | 'Completed';
}

const MOCK_BATCHES: Batch[] = [
  { id: '1', courseName: 'Full Stack Web Development', batchId: 'FSWD-JUN24-M', timing: 'Morning (10:00 AM - 1:00 PM)', startDate: '12 Jun 2024', capacity: 30, filled: 28, status: 'Active' },
  { id: '2', courseName: 'Data Science & Machine Learning', batchId: 'DSML-JUL24-W', timing: 'Weekend (10:00 AM - 5:00 PM)', startDate: '05 Jul 2024', capacity: 25, filled: 25, status: 'Active' },
  { id: '3', courseName: 'AI & Prompt Engineering', batchId: 'AIPE-AUG24-E', timing: 'Evening (5:00 PM - 8:00 PM)', startDate: '15 Aug 2024', capacity: 40, filled: 12, status: 'Upcoming' },
  { id: '4', courseName: 'Full Stack Web Development', batchId: 'FSWD-JAN24-E', timing: 'Evening (5:00 PM - 8:00 PM)', startDate: '10 Jan 2024', capacity: 30, filled: 30, status: 'Completed' },
];

export default function InstituteCourses() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-text-heading">Courses & Batches</h2>
        <p className="text-slate-500 font-medium text-sm mt-1">Track seat capacities and timings for your institute's active batches.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_BATCHES.map((batch, idx) => {
          const percentFilled = Math.round((batch.filled / batch.capacity) * 100);
          
          return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={batch.id}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 flex flex-col h-full hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4 gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <BookOpen size={24} className="text-primary" />
                </div>
                <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold shrink-0 ${
                  batch.status === 'Active' ? 'bg-blue-100 text-blue-700' :
                  batch.status === 'Upcoming' ? 'bg-purple-100 text-purple-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {batch.status}
                </span>
              </div>
              
              <h3 className="font-extrabold text-lg text-text-heading mb-1 line-clamp-2 leading-tight">
                {batch.courseName}
              </h3>
              <p className="text-xs font-bold text-primary mb-4 bg-primary/5 inline-block px-2 py-1 rounded-md self-start">
                Batch ID: {batch.batchId}
              </p>

              <div className="space-y-3 mb-6 flex-1">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                  <CalendarDays size={16} className="text-slate-400" />
                  Starts: {batch.startDate}
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                  <Clock size={16} className="text-slate-400" />
                  {batch.timing}
                </div>
              </div>

              <div className="mt-auto pt-4 border-t border-gray-50">
                <div className="flex justify-between text-sm font-bold mb-2">
                  <span className="text-slate-700 flex items-center gap-1.5">
                    <Users size={16} className="text-slate-400" />
                    Seats Filled
                  </span>
                  <span className={percentFilled >= 100 ? 'text-red-600' : 'text-primary'}>
                    {batch.filled} / {batch.capacity}
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${
                      percentFilled >= 100 ? 'bg-red-500' : 'bg-primary'
                    }`}
                    style={{ width: `${Math.min(percentFilled, 100)}%` }}
                  />
                </div>
                {percentFilled >= 100 && (
                  <p className="text-xs text-red-600 font-bold mt-2">Batch Full</p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
