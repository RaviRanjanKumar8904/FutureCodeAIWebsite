import { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, getDocs, doc, updateDoc, query, orderBy } from 'firebase/firestore';
import { Briefcase, Search, Plus } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import AddInternshipModal from '../../components/admin/AddInternshipModal';

export default function ManageInternships() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingInternship, setEditingInternship] = useState<any | null>(null);
  const [internships, setInternships] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchInternships = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'internships'), orderBy('title'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setInternships(data);
    } catch (error) {
      console.error("Error fetching internships:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInternships();
  }, []);

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {

    try {
      await updateDoc(doc(db, 'internships', id), {
        isActive: !currentStatus
      });
      toast.success(`Internship ${!currentStatus ? 'activated' : 'deactivated'}`);
      fetchInternships();
    } catch (error) {
      console.error("Error updating internship:", error);
      toast.error("Failed to update status");
    }
  };

  const filteredData = internships.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.domain.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto">
      <Toaster position="top-center" />
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center text-teal-600">
            <Briefcase size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">Manage Internships</h1>
            <p className="text-slate-500 font-medium">Create and manage internship programs.</p>
          </div>
        </div>
        
        <button 
          onClick={() => {
            setEditingInternship(null);
            setIsModalOpen(true);
          }}
          className="bg-teal-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-teal-700 transition-colors shadow-sm flex items-center gap-2"
        >
          <Plus size={18} />
          Add Internship
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex justify-end">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text"
              placeholder="Search internships..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm font-medium w-full focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
            />
          </div>
        </div>

        {loading ? (
          <div className="py-20 flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-teal-500 border-t-transparent" />
          </div>
        ) : filteredData.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-lg font-semibold text-slate-700">No internships found.</p>
            <p className="mt-2 text-slate-500">Try adjusting your search query.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-4 md:p-0">
            {filteredData.map((internship) => (
              <div key={internship.id} className="glass rounded-3xl overflow-hidden shadow-lg border border-white/60 group hover:shadow-[0_24px_70px_rgba(16,185,129,0.18)] transition-shadow duration-300 flex flex-col">
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="rounded-2xl bg-teal-50 text-teal-700 px-3 py-2 text-xs font-bold uppercase tracking-[0.24em]">
                      {internship.domain || 'General'}
                    </div>
                    <div className={`rounded-full px-3 py-1.5 text-xs font-semibold ${internship.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                      {internship.isActive ? 'Active' : 'Draft'}
                    </div>
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-950 mb-3 leading-tight line-clamp-2">{internship.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6 line-clamp-3">{internship.description || 'No description provided.'}</p>

                  <div className="grid gap-3 sm:grid-cols-2 mb-6">
                    <div className="rounded-3xl bg-slate-50 p-4 border border-slate-100">
                      <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-bold mb-2">Duration</p>
                      <p className="text-sm font-semibold text-slate-900">{internship.duration || 'TBA'}</p>
                    </div>
                    <div className="rounded-3xl bg-slate-50 p-4 border border-slate-100">
                      <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-bold mb-2">Type</p>
                      <p className="text-sm font-semibold text-slate-900">{internship.type || 'Internship'}</p>
                    </div>
                  </div>

                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
                    <div className="text-sm font-semibold text-slate-700">
                      Applicants <span className="text-teal-600">{internship.applicantsCount ?? 0}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleStatus(internship.id, internship.isActive)}
                        className={`rounded-2xl px-4 py-2 text-xs font-semibold transition ${internship.isActive ? 'bg-amber-50 text-amber-700 hover:bg-amber-100' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'}`}
                      >
                        {internship.isActive ? 'Deactivate' : 'Publish'}
                      </button>
                      <button
                        onClick={() => {
                          setEditingInternship(internship);
                          setIsModalOpen(true);
                        }}
                        className="rounded-2xl bg-white border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:border-teal-300 hover:text-teal-700 transition"
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

      <AddInternshipModal 
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingInternship(null);
        }}
        onSuccess={fetchInternships}
        initialData={editingInternship}
      />
    </div>
  );
}
