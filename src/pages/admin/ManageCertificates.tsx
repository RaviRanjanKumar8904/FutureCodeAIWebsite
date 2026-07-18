import { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { Award, Plus, Trash2, Search, Copy, CheckCircle2, X } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

interface Certificate {
  id: string;
  certificateId: string;
  studentName: string;
  courseName: string;
  issueDate: string;
  grade: string;
  issuedBy: string;
  createdAt: any;
}

export default function ManageCertificates() {
  const { user } = useAuth();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Form State
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    studentName: '',
    courseName: '',
    issueDate: new Date().toISOString().split('T')[0],
    grade: ''
  });

  const fetchCertificates = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'certificates'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const data: Certificate[] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Certificate));
      setCertificates(data);
    } catch (error) {
      console.error("Error fetching certificates:", error);
      toast.error("Failed to load certificates");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const handleGenerateId = () => {
    const year = new Date().getFullYear();
    const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `FC-${year}-${randomStr}`;
  };

  const handleIssueCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentName || !formData.courseName || !formData.issueDate) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading("Issuing certificate...");

    try {
      const certId = handleGenerateId();
      
      await addDoc(collection(db, 'certificates'), {
        ...formData,
        certificateId: certId,
        issuedBy: user?.email || 'Admin',
        createdAt: serverTimestamp()
      });

      toast.success(`Certificate ${certId} issued!`, { id: toastId });
      setShowModal(false);
      setFormData({
        studentName: '',
        courseName: '',
        issueDate: new Date().toISOString().split('T')[0],
        grade: ''
      });
      fetchCertificates();
    } catch (error) {
      console.error("Error issuing certificate:", error);
      toast.error("Failed to issue certificate", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRevoke = async (id: string, certId: string) => {
    if (!window.confirm(`Are you sure you want to revoke certificate ${certId}? This will invalidate any verification attempts.`)) {
      return;
    }

    const toastId = toast.loading("Revoking certificate...");
    try {
      await deleteDoc(doc(db, 'certificates', id));
      toast.success("Certificate revoked successfully", { id: toastId });
      fetchCertificates();
    } catch (error) {
      console.error("Error revoking certificate:", error);
      toast.error("Failed to revoke certificate", { id: toastId });
    }
  };

  const copyVerificationLink = (id: string) => {
    const url = `${window.location.origin}/verify?id=${id}`;
    navigator.clipboard.writeText(url);
    toast.success("Verification link copied!");
  };

  const filteredData = certificates.filter(cert => 
    cert.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.certificateId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.courseName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto">
      <Toaster position="top-center" />
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600">
            <Award size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">Certificate Generator</h1>
            <p className="text-slate-500 font-medium">Issue and manage verifiable digital credentials.</p>
          </div>
        </div>
        
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <Plus size={20} />
          Issue Certificate
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                  <Award size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Issue New Certificate</h2>
                  <p className="text-xs font-medium text-slate-500">A unique ID will be auto-generated.</p>
                </div>
              </div>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 transition-colors p-2 hover:bg-slate-100 rounded-full">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleIssueCertificate} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Student Name <span className="text-rose-500">*</span></label>
                <input 
                  type="text"
                  value={formData.studentName}
                  onChange={(e) => setFormData({...formData, studentName: e.target.value})}
                  placeholder="E.g. Rahul Kumar"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Program / Course Name <span className="text-rose-500">*</span></label>
                <input 
                  type="text"
                  value={formData.courseName}
                  onChange={(e) => setFormData({...formData, courseName: e.target.value})}
                  placeholder="E.g. Full-Stack Web Development Internship"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Issue Date <span className="text-rose-500">*</span></label>
                  <input 
                    type="date"
                    value={formData.issueDate}
                    onChange={(e) => setFormData({...formData, issueDate: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-slate-700"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Grade / Score (Optional)</label>
                  <input 
                    type="text"
                    value={formData.grade}
                    onChange={(e) => setFormData({...formData, grade: e.target.value})}
                    placeholder="E.g. A+ or 95%"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
                  />
                </div>
              </div>
              
              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2.5 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-4 py-2.5 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Issuing...
                    </>
                  ) : (
                    'Issue Certificate'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/50">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text"
              placeholder="Search by ID, name, or course..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-sm font-medium w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider font-bold">
                <th className="p-4 pl-6">Certificate Details</th>
                <th className="p-4">Student</th>
                <th className="p-4">Issue Date</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500 font-medium">Loading certificates...</td>
                </tr>
              ) : filteredData.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-12 text-center flex flex-col items-center">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 mb-4">
                      <Award size={32} />
                    </div>
                    <p className="text-slate-900 font-bold text-lg mb-1">No Certificates Found</p>
                    <p className="text-slate-500 text-sm">You haven't issued any certificates yet.</p>
                  </td>
                </tr>
              ) : (
                filteredData.map((cert) => (
                  <tr key={cert.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="p-4 pl-6 align-top">
                      <div className="font-bold text-slate-900 mb-1">{cert.courseName}</div>
                      <div className="text-xs font-medium text-slate-500 font-mono bg-slate-100 px-2 py-0.5 rounded-md inline-block">
                        ID: {cert.id}
                      </div>
                      <div className="text-xs font-medium text-slate-400 mt-1">
                        Visual ID: {cert.certificateId}
                      </div>
                    </td>
                    <td className="p-4 align-top">
                      <div className="font-bold text-slate-900">{cert.studentName}</div>
                      {cert.grade && (
                        <div className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md inline-block mt-1">
                          Grade: {cert.grade}
                        </div>
                      )}
                    </td>
                    <td className="p-4 align-top">
                      <div className="text-sm font-medium text-slate-700">
                        {new Date(cert.issueDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="p-4 align-top text-center">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
                        <CheckCircle2 size={14} />
                        Valid
                      </span>
                    </td>
                    <td className="p-4 pr-6 align-top text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => copyVerificationLink(cert.id)}
                          className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors flex items-center gap-1.5"
                          title="Copy Verification Link"
                        >
                          <Copy size={18} />
                          <span className="text-xs font-bold hidden sm:inline-block">Link</span>
                        </button>
                        <button 
                          onClick={() => handleRevoke(cert.id, cert.certificateId)}
                          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Revoke Certificate"
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
    </div>
  );
}
