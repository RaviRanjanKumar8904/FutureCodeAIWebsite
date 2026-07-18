import { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, getDocs, deleteDoc, doc, query, where } from 'firebase/firestore';
import { Users, Search, Trash2, Mail, Eye, ShieldAlert, GraduationCap } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

interface Student {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: string;
  createdAt: any;
}

export default function ManageStudents() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchStudents = async () => {
    setLoading(true);
    try {
      // Query users collection for role == 'student'
      const q = query(
        collection(db, 'users'), 
        where('role', '==', 'student')
      );
      const snapshot = await getDocs(q);
      let data: Student[] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Student));
      
      // Since we can't reliably orderBy with where without a composite index, we sort client-side
      data.sort((a, b) => {
        const timeA = a.createdAt?.toMillis() || 0;
        const timeB = b.createdAt?.toMillis() || 0;
        return timeB - timeA;
      });
      
      if (data.length === 0) {
        // Mock data to show layout if database is empty
        data = [
          {
            id: 'mock-s1',
            email: 'rahul.dev@example.com',
            displayName: 'Rahul Sharma',
            role: 'student',
            createdAt: { toDate: () => new Date(Date.now() - 86400000 * 2) }
          },
          {
            id: 'mock-s2',
            email: 'priya.singh@example.com',
            displayName: 'Priya Singh',
            role: 'student',
            createdAt: { toDate: () => new Date(Date.now() - 86400000 * 5) }
          }
        ];
      }

      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
      toast.error("Failed to load students database");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (id.startsWith('mock')) {
      toast.error("Cannot delete mock data.");
      return;
    }

    if (!window.confirm(`WARNING: Are you sure you want to delete the student profile for ${name}? This will remove their Firestore document permanently. (Note: Auth deletion requires Cloud Functions).`)) {
      return;
    }

    const toastId = toast.loading("Deleting student profile...");
    try {
      await deleteDoc(doc(db, 'users', id));
      toast.success("Student profile deleted successfully", { id: toastId });
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
      toast.error("Failed to delete student profile", { id: toastId });
    }
  };

  const filteredData = students.filter(student => 
    (student.displayName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (student.email || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto">
      <Toaster position="top-center" />
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
            <Users size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">Students Database</h1>
            <p className="text-slate-500 font-medium">Manage enrolled student accounts across the platform.</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/50">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-sm font-medium w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
            />
          </div>
          
          <div className="flex items-center gap-2 text-sm font-bold text-slate-500 bg-white px-4 py-2 border border-slate-200 rounded-xl w-full sm:w-auto justify-center">
            <GraduationCap size={18} className="text-blue-500" />
            Total Students: {students.length}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider font-bold">
                <th className="p-4 pl-6">Student Info</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Registration Date</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500 font-medium">Loading students database...</td>
                </tr>
              ) : filteredData.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-12 text-center flex flex-col items-center">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 mb-4">
                      <Users size={32} />
                    </div>
                    <p className="text-slate-900 font-bold text-lg mb-1">No Students Found</p>
                    <p className="text-slate-500 text-sm">No student accounts match your search.</p>
                  </td>
                </tr>
              ) : (
                filteredData.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="p-4 pl-6 align-middle">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg shrink-0">
                          {student.displayName ? student.displayName.charAt(0).toUpperCase() : 'S'}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{student.displayName || 'Unnamed Student'}</div>
                          <div className="text-xs font-medium text-slate-400 font-mono mt-0.5">ID: {student.id.substring(0, 8)}...</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 align-middle">
                      <a href={`mailto:${student.email}`} className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
                        <Mail size={16} />
                        {student.email}
                      </a>
                    </td>
                    <td className="p-4 align-middle">
                      <div className="text-sm font-medium text-slate-700">
                        {student.createdAt?.toDate ? student.createdAt.toDate().toLocaleDateString() : 'Unknown'}
                      </div>
                    </td>
                    <td className="p-4 align-middle text-center">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
                        Active
                      </span>
                    </td>
                    <td className="p-4 pr-6 align-middle text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => toast("Detailed profile view coming in Phase 3!", { icon: '🚧' })}
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-1.5"
                          title="View Student Details"
                        >
                          <Eye size={18} />
                          <span className="text-xs font-bold hidden sm:inline-block">Profile</span>
                        </button>
                        <button 
                          onClick={() => handleDelete(student.id, student.displayName || 'this student')}
                          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Delete Account"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Alert Banner */}
      <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 text-amber-800 text-sm">
        <ShieldAlert size={20} className="shrink-0 text-amber-600" />
        <div>
          <p className="font-bold mb-1">Administrative Note regarding Deletions</p>
          <p className="text-amber-700/90 leading-relaxed font-medium">
            Deleting a student profile here removes their Firestore data record. To completely revoke login access, their Authentication credential must also be deleted via the Firebase Console or a dedicated Cloud Function.
          </p>
        </div>
      </div>
    </div>
  );
}
