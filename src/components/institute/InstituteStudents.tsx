import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ShieldAlert } from 'lucide-react';

interface EnrolledStudent {
  id: string;
  name: string;
  course: string;
  batch: string;
  date: string;
  status: 'Active' | 'Completed' | 'Dropped';
}

const MOCK_STUDENTS: EnrolledStudent[] = [
  { id: '1', name: 'Aarav Sharma', course: 'Full Stack Web Development', batch: 'June 2024 - Morning', date: '12 Jun 2024', status: 'Active' },
  { id: '2', name: 'Priya Singh', course: 'Data Science & ML', batch: 'July 2024 - Weekend', date: '05 Jul 2024', status: 'Active' },
  { id: '3', name: 'Rahul Verma', course: 'Full Stack Web Development', batch: 'Jan 2024 - Evening', date: '10 Jan 2024', status: 'Completed' },
  { id: '4', name: 'Neha Gupta', course: 'AI & Prompt Engineering', batch: 'June 2024 - Morning', date: '15 Jun 2024', status: 'Active' },
  { id: '5', name: 'Vikram Patel', course: 'Data Science & ML', batch: 'Mar 2024 - Weekend', date: '01 Mar 2024', status: 'Dropped' },
];

export default function InstituteStudents() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = MOCK_STUDENTS.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-text-heading">Enrolled Students</h2>
          <p className="text-slate-500 font-medium text-sm mt-1">Read-only view of students registered through your institute.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search students..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-full md:w-64"
            />
          </div>
          <button className="flex items-center justify-center p-2 bg-white border border-gray-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-colors">
            <Filter size={18} />
          </button>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 text-amber-800">
        <ShieldAlert size={20} className="shrink-0 mt-0.5" />
        <p className="text-sm font-medium">
          <strong>Data Privacy Notice:</strong> This is a read-only view. You cannot edit, delete, or modify student records from this portal. Certificate generation is handled directly by FutureCodeAI administrators.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-gray-100 text-sm font-bold text-slate-600">
                <th className="p-4 pl-6 whitespace-nowrap">Student Name</th>
                <th className="p-4 whitespace-nowrap">Course Program</th>
                <th className="p-4 whitespace-nowrap">Batch</th>
                <th className="p-4 whitespace-nowrap">Enrollment Date</th>
                <th className="p-4 pr-6 whitespace-nowrap text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student, idx) => (
                  <motion.tr 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={student.id} 
                    className="border-b border-gray-50 hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="p-4 pl-6 font-bold text-text-heading">{student.name}</td>
                    <td className="p-4 text-sm font-medium text-slate-600">{student.course}</td>
                    <td className="p-4 text-sm font-medium text-slate-500">{student.batch}</td>
                    <td className="p-4 text-sm font-medium text-slate-500">{student.date}</td>
                    <td className="p-4 pr-6 text-right">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${
                        student.status === 'Active' ? 'bg-blue-100 text-blue-700' :
                        student.status === 'Completed' ? 'bg-green-100 text-green-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {student.status}
                      </span>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500 font-medium">
                    No students found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
