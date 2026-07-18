import { motion } from 'framer-motion';
import { Mail, Phone, Clock, Search, Filter } from 'lucide-react';

interface Enquiry {
  id: string;
  name: string;
  contact: string;
  email: string;
  interest: string;
  date: string;
  status: 'New' | 'Contacted' | 'Enrolled' | 'Closed';
}

const MOCK_ENQUIRIES: Enquiry[] = [
  { id: '1', name: 'Rohan Kumar', contact: '+91 9876543210', email: 'rohan@example.com', interest: 'Full Stack Web Development', date: 'Today, 10:30 AM', status: 'New' },
  { id: '2', name: 'Sneha Patel', contact: '+91 9876543211', email: 'sneha@example.com', interest: 'Data Science Internship', date: 'Yesterday', status: 'Contacted' },
  { id: '3', name: 'Amit Singh', contact: '+91 9876543212', email: 'amit@example.com', interest: 'AI & Prompt Engineering', date: '14 Jul 2024', status: 'Enrolled' },
  { id: '4', name: 'Kavita Das', contact: '+91 9876543213', email: 'kavita@example.com', interest: 'Frontend Development', date: '12 Jul 2024', status: 'Closed' },
];

export default function InstituteEnquiries() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-text-heading">Lead Enquiries</h2>
          <p className="text-slate-500 font-medium text-sm mt-1">Students inquiring about courses at your institute.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search leads..." 
              className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-full md:w-64"
            />
          </div>
          <button className="flex items-center justify-center p-2 bg-white border border-gray-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-colors">
            <Filter size={18} />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-gray-100 text-sm font-bold text-slate-600">
                <th className="p-4 pl-6 whitespace-nowrap">Lead Name</th>
                <th className="p-4 whitespace-nowrap">Contact Details</th>
                <th className="p-4 whitespace-nowrap">Interested In</th>
                <th className="p-4 whitespace-nowrap">Received On</th>
                <th className="p-4 pr-6 whitespace-nowrap text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_ENQUIRIES.map((enq, idx) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={enq.id} 
                  className="border-b border-gray-50 hover:bg-slate-50/50 transition-colors"
                >
                  <td className="p-4 pl-6 font-bold text-text-heading">{enq.name}</td>
                  <td className="p-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-medium text-slate-700 flex items-center gap-1.5"><Phone size={14} className="text-slate-400"/> {enq.contact}</span>
                      <span className="text-xs font-medium text-slate-500 flex items-center gap-1.5"><Mail size={14} className="text-slate-400"/> {enq.email}</span>
                    </div>
                  </td>
                  <td className="p-4 text-sm font-bold text-primary bg-primary/5 rounded-lg inline-block mt-3 ml-2">{enq.interest}</td>
                  <td className="p-4 text-sm font-medium text-slate-500">
                    <span className="flex items-center gap-1.5"><Clock size={14} className="text-slate-400"/> {enq.date}</span>
                  </td>
                  <td className="p-4 pr-6 text-right">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${
                      enq.status === 'New' ? 'bg-amber-100 text-amber-700 animate-pulse' :
                      enq.status === 'Contacted' ? 'bg-blue-100 text-blue-700' :
                      enq.status === 'Enrolled' ? 'bg-green-100 text-green-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {enq.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
