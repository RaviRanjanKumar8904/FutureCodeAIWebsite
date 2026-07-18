import { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, getDocs, doc, updateDoc, query, orderBy } from 'firebase/firestore';
import { MessageSquare, Search, MoreVertical, Mail, Phone, Clock, User } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export default function ManageEnquiries() {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      // First fetch Partnership Enquiries
      const pQuery = query(collection(db, 'partnershipEnquiries'), orderBy('createdAt', 'desc'));
      const pSnapshot = await getDocs(pQuery);
      let pData = pSnapshot.docs.map(doc => ({ id: doc.id, collection: 'partnership', ...doc.data() }));

      // Then fetch Contact Messages
      const cQuery = query(collection(db, 'contactMessages'), orderBy('createdAt', 'desc'));
      const cSnapshot = await getDocs(cQuery);
      let cData = cSnapshot.docs.map(doc => ({ id: doc.id, collection: 'contact', ...doc.data() }));

      let combined: any[] = [...pData, ...cData];
      
      // Sort by createdAt manually since they came from different collections
      combined.sort((a: any, b: any) => {
        const timeA = a.createdAt?.toMillis() || 0;
        const timeB = b.createdAt?.toMillis() || 0;
        return timeB - timeA;
      });

      
      setEnquiries(combined);
    } catch (error) {
      console.error("Error fetching enquiries:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleUpdateStatus = async (id: string, collectionName: string, newStatus: string) => {

    try {
      const col = collectionName === 'partnership' ? 'partnershipEnquiries' : 'contactMessages';
      await updateDoc(doc(db, col, id), {
        status: newStatus
      });
      toast.success(`Marked as ${newStatus}`);
      fetchEnquiries();
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  const filteredData = enquiries.filter(item => {
    const matchesFilter = filterType === 'All' 
      ? true 
      : filterType === 'Partnerships' 
        ? item.collection === 'partnership' 
        : item.collection === 'contact';
        
    const searchString = `${item.name} ${item.email} ${item.instituteName || ''} ${item.subject || ''}`.toLowerCase();
    const matchesSearch = searchString.includes(searchTerm.toLowerCase());
                          
    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status: string = 'new') => {
    switch (status) {
      case 'new':
        return <span className="inline-flex px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-100 text-amber-700">New</span>;
      case 'read':
        return <span className="inline-flex px-2.5 py-1 rounded-lg text-xs font-bold bg-blue-100 text-blue-700">Read</span>;
      case 'responded':
        return <span className="inline-flex px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-700">Responded</span>;
      default:
        return <span className="inline-flex px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-700">{status}</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <Toaster position="top-center" />
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600">
            <MessageSquare size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">Manage Enquiries</h1>
            <p className="text-slate-500 font-medium">View and respond to leads and partnership requests.</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-4 justify-between bg-slate-50/50">
          <div className="flex bg-slate-100 p-1 rounded-lg w-fit">
            {['All', 'Partnerships', 'General Contact'].map(tab => (
              <button
                key={tab}
                onClick={() => setFilterType(tab)}
                className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${
                  filterType === tab 
                    ? 'bg-white text-amber-600 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text"
              placeholder="Search by name, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm font-medium w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            />
          </div>
        </div>

        {/* List */}
        <div className="divide-y divide-slate-100">
          {loading ? (
            <div className="p-8 text-center text-slate-500 font-medium">Loading enquiries...</div>
          ) : filteredData.length === 0 ? (
            <div className="p-8 text-center text-slate-500 font-medium">No enquiries found.</div>
          ) : (
            filteredData.map((item) => (
              <div key={item.id} className="p-6 hover:bg-slate-50/80 transition-colors flex flex-col md:flex-row gap-6">
                
                {/* Info Column */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {getStatusBadge(item.status)}
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      {item.collection === 'partnership' ? 'Partnership Request' : 'Contact Message'}
                    </span>
                    <span className="text-xs font-medium text-slate-400 flex items-center gap-1 ml-auto md:ml-0">
                      <Clock size={12} />
                      {item.createdAt?.toDate ? item.createdAt.toDate().toLocaleDateString() : 'Recent'}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
                    {item.name}
                    {item.instituteName && <span className="text-sm font-medium text-slate-500">({item.instituteName})</span>}
                  </h3>
                  
                  <div className="flex flex-wrap gap-4 mb-4">
                    <a href={`mailto:${item.email}`} className="flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:underline">
                      <Mail size={16} /> {item.email}
                    </a>
                    {item.phone && (
                      <a href={`tel:${item.phone}`} className="flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:underline">
                        <Phone size={16} /> {item.phone}
                      </a>
                    )}
                    {item.city && (
                      <span className="flex items-center gap-1.5 text-sm font-medium text-slate-500">
                        <User size={16} /> {item.city}
                      </span>
                    )}
                  </div>
                  
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-sm text-slate-700 leading-relaxed">
                    {item.subject && <p className="font-bold mb-1">Subject: {item.subject}</p>}
                    <p>{item.message}</p>
                  </div>
                </div>

                {/* Actions Column */}
                <div className="md:w-48 flex md:flex-col gap-2 justify-start md:justify-center shrink-0 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
                  {item.status !== 'read' && (
                    <button 
                      onClick={() => handleUpdateStatus(item.id, item.collection, 'read')}
                      className="flex-1 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 text-sm font-bold rounded-xl transition-colors"
                    >
                      Mark as Read
                    </button>
                  )}
                  {item.status !== 'responded' && (
                    <button 
                      onClick={() => handleUpdateStatus(item.id, item.collection, 'responded')}
                      className="flex-1 py-2 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 text-sm font-bold rounded-xl transition-colors"
                    >
                      Mark Responded
                    </button>
                  )}
                  <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors flex items-center justify-center md:flex-none">
                    <MoreVertical size={20} />
                  </button>
                </div>
                
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
