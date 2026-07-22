import { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, getDocs, doc, updateDoc, query, orderBy } from 'firebase/firestore';
import { BookOpen, Search, Plus } from 'lucide-react';
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

        {loading ? (
          <div className="py-20 flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent" />
          </div>
        ) : filteredData.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-lg font-semibold text-slate-700">No courses found.</p>
            <p className="mt-2 text-slate-500">Try adjusting your search or category filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-4 md:p-0">
            {filteredData.map((course) => (
              <div key={course.id} className="glass rounded-3xl overflow-hidden shadow-lg border border-white/60 group hover:shadow-[0_24px_70px_rgba(79,70,229,0.16)] transition-shadow duration-300 flex flex-col">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={course.thumbnailUrl || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800'}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
                  <div className="absolute left-4 top-4 flex flex-col gap-2">
                    <span className="inline-flex px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-[0.18em] bg-white/90 text-slate-700 shadow-sm">
                      {course.category}
                    </span>
                    {course.isTopSelling && (
                      <span className="inline-flex px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-[0.18em] bg-amber-500/95 text-white shadow-sm">
                        Top Selling
                      </span>
                    )}
                  </div>
                  <div className="absolute right-4 top-4">
                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${course.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                      {course.isActive ? 'Active' : 'Draft'}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-xl font-extrabold text-slate-950 mb-2 line-clamp-2">{course.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-4">{course.description || 'No description available.'}</p>
                  <div className="grid gap-3 sm:grid-cols-2 mb-5">
                    <div className="rounded-3xl bg-slate-50 p-4 border border-slate-100">
                      <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-bold mb-2">Duration</p>
                      <p className="text-sm font-semibold text-slate-900">{course.duration || 'TBA'}</p>
                    </div>
                    <div className="rounded-3xl bg-slate-50 p-4 border border-slate-100">
                      <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-bold mb-2">Level</p>
                      <p className="text-sm font-semibold text-slate-900">{course.level || 'Beginner'}</p>
                    </div>
                  </div>

                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
                    <div className="text-sm font-semibold text-slate-700">
                      Enrollments <span className="text-primary">{course.studentsCount ?? 0}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleStatus(course.id, course.isActive)}
                        className={`rounded-2xl px-4 py-2 text-xs font-semibold transition ${course.isActive ? 'bg-amber-50 text-amber-700 hover:bg-amber-100' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'}`}
                      >
                        {course.isActive ? 'Deactivate' : 'Publish'}
                      </button>
                      <button
                        onClick={() => {
                          setEditingCourse(course);
                          setIsModalOpen(true);
                        }}
                        className="rounded-2xl bg-white border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:border-purple-300 hover:text-purple-700 transition"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
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
