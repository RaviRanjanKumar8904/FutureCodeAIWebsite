import { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, getDocs, doc, updateDoc, query, orderBy } from 'firebase/firestore';
import { BookOpen, Search, Plus, MoreVertical, Edit2, CheckCircle2, XCircle } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import AddCourseModal from '../../components/admin/AddCourseModal';

export default function ManageCourses() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<any | null>(null);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'courses'), orderBy('title'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {

    try {
      await updateDoc(doc(db, 'courses', id), {
        isActive: !currentStatus
      });
      toast.success(`Course ${!currentStatus ? 'activated' : 'deactivated'}`);
      fetchCourses();
    } catch (error) {
      console.error("Error updating course:", error);
      toast.error("Failed to update status");
    }
  };

  const filteredData = courses.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto">
      <Toaster position="top-center" />
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600">
            <BookOpen size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">Manage Courses</h1>
            <p className="text-slate-500 font-medium">Create and update the course catalog.</p>
          </div>
        </div>
        
        <button 
          onClick={() => {
            setEditingCourse(null);
            setIsModalOpen(true);
          }}
          className="bg-purple-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-purple-700 transition-colors shadow-sm flex items-center gap-2"
        >
          <Plus size={18} />
          Add New Course
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex justify-end">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm font-medium w-full focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-bold">
                <th className="p-4 pl-6">Course Details</th>
                <th className="p-4">Duration & Level</th>
                <th className="p-4">Enrollments</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right pr-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500 font-medium">Loading courses...</td>
                </tr>
              ) : filteredData.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500 font-medium">No courses found.</td>
                </tr>
              ) : (
                filteredData.map((course) => (
                  <tr key={course.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="p-4 pl-6">
                      <p className="font-bold text-slate-900 mb-1">{course.title}</p>
                      <span className="inline-flex px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-500 uppercase tracking-wider">
                        {course.category}
                      </span>
                    </td>
                    <td className="p-4">
                      <p className="text-sm font-bold text-slate-700">{course.duration}</p>
                      <p className="text-xs text-slate-500 font-medium">{course.level}</p>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-16 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-purple-500 rounded-full" 
                            style={{ width: `${Math.min(100, (course.studentsCount / 200) * 100)}%` }}
                          />
                        </div>
                        <span className="text-sm font-bold text-slate-700">{course.studentsCount}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      {course.isActive ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 size={14} /> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">
                          <XCircle size={14} /> Draft
                        </span>
                      )}
                    </td>
                    <td className="p-4 pr-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleToggleStatus(course.id, course.isActive)}
                          className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                            course.isActive 
                              ? 'bg-amber-50 text-amber-600 hover:bg-amber-100' 
                              : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                          }`}
                        >
                          {course.isActive ? 'Deactivate' : 'Publish'}
                        </button>
                        <button 
                          onClick={() => {
                            setEditingCourse(course);
                            setIsModalOpen(true);
                          }}
                          className="p-1.5 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                          <MoreVertical size={18} />
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

      <AddCourseModal 
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingCourse(null);
        }}
        onSuccess={fetchCourses}
        initialData={editingCourse}
      />
    </div>
  );
}
