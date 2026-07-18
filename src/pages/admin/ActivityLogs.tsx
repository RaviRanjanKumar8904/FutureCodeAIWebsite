import { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { Activity, Clock, User, FileText, Trash2, Edit3, PlusCircle, AlertCircle } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export default function ActivityLogs() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'adminLogs'), orderBy('timestamp', 'desc'), limit(100));
      const snapshot = await getDocs(q);
      let data: any[] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLogs(data);
    } catch (error) {
      console.error("Error fetching logs:", error);
      toast.error("Failed to load activity logs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'CREATED': return <PlusCircle size={18} className="text-emerald-500" />;
      case 'UPDATED': return <Edit3 size={18} className="text-blue-500" />;
      case 'DELETED': return <Trash2 size={18} className="text-rose-500" />;
      default: return <FileText size={18} className="text-slate-500" />;
    }
  };

  const getActionBadge = (action: string) => {
    switch (action) {
      case 'CREATED': return <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700 uppercase tracking-wider">Created</span>;
      case 'UPDATED': return <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-700 uppercase tracking-wider">Updated</span>;
      case 'DELETED': return <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-700 uppercase tracking-wider">Deleted</span>;
      default: return <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 uppercase tracking-wider">{action}</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <Toaster position="top-center" />
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600">
            <Activity size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">Activity Logs</h1>
            <p className="text-slate-500 font-medium">Audit trail of administrative actions.</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-4 justify-between bg-slate-50/50">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
            <AlertCircle size={16} className="text-amber-500" />
            Displaying the last 100 actions
          </div>
          <button 
            onClick={() => {
              toast.error("Super Admin privileges required to clear logs.");
            }}
            className="px-4 py-2 bg-white border border-slate-200 text-slate-600 hover:text-rose-600 hover:border-rose-200 text-sm font-bold rounded-lg transition-colors flex items-center gap-2"
          >
            <Trash2 size={16} />
            Clear Logs
          </button>
        </div>

        {/* List */}
        <div className="divide-y divide-slate-100">
          {loading ? (
            <div className="p-8 text-center text-slate-500 font-medium">Loading logs...</div>
          ) : logs.length === 0 ? (
            <div className="p-8 text-center text-slate-500 font-medium">No activity recorded yet.</div>
          ) : (
            logs.map((log) => (
              <div key={log.id} className="p-4 sm:p-6 hover:bg-slate-50/80 transition-colors flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
                
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200 shadow-sm">
                  {getActionIcon(log.action)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-1">
                    {getActionBadge(log.action)}
                    <span className="text-sm font-bold text-slate-900">
                      {log.target}
                    </span>
                  </div>
                  
                  {log.details && (
                    <p className="text-sm text-slate-600 mb-2">{log.details}</p>
                  )}
                  
                  <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-400 mt-2">
                    <span className="flex items-center gap-1.5">
                      <User size={14} /> {log.adminEmail}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={14} /> 
                      {log.timestamp?.toDate ? log.timestamp.toDate().toLocaleString() : 'Recent'}
                    </span>
                  </div>
                </div>
                
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
