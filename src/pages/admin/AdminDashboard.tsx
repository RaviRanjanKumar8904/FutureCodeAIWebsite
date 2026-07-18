import { useState, useEffect } from 'react';
import { 
  Users, 
  Building2, 
  BookOpen, 
  MessageSquare, 
  ArrowUpRight,
  Clock
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import { db } from '../../firebase/config';
import { collection, getDocs, query, where, Timestamp } from 'firebase/firestore';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    students: 0,
    institutes: 0,
    courses: 0,
    enquiries: 0
  });
  const [recentEnquiries, setRecentEnquiries] = useState<any[]>([]);
  const [chartData, setChartData] = useState<Array<{ name: string; enquiries: number }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // --- Real-time stats from Firestore ---
        const [usersSnap, coursesSnap, enquiriesSnap] = await Promise.all([
          getDocs(collection(db, 'users')),
          getDocs(collection(db, 'courses')),
          getDocs(collection(db, 'enquiries')),
        ]);

        const usersData = usersSnap.docs.map(d => d.data());
        const studentCount = usersData.filter(u => u.role === 'student').length;
        const instituteCount = usersData.filter(u => u.role === 'institute').length;

        setStats({
          students: studentCount,
          institutes: instituteCount,
          courses: coursesSnap.size,
          enquiries: enquiriesSnap.size
        });

        // --- Recent enquiries sidebar ---
        const allEnquiries = enquiriesSnap.docs.map(d => ({ id: d.id, ...d.data() })) as any[];
        // Sort by createdAt descending, take top 5
        const sorted = allEnquiries
          .sort((a, b) => {
            const aTime = a.createdAt?.toMillis?.() || 0;
            const bTime = b.createdAt?.toMillis?.() || 0;
            return bTime - aTime;
          })
          .slice(0, 5)
          .map(enq => {
            let dateStr = 'N/A';
            if (enq.createdAt?.toDate) {
              const d = enq.createdAt.toDate();
              const diffMs = Date.now() - d.getTime();
              const diffH = Math.floor(diffMs / 3600000);
              if (diffH < 1) dateStr = 'Just now';
              else if (diffH < 24) dateStr = `${diffH}h ago`;
              else dateStr = `${Math.floor(diffH / 24)}d ago`;
            }
            return { ...enq, date: dateStr };
          });

        setRecentEnquiries(sorted);

        // --- Chart: enquiries per day for last 30 days ---
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        thirtyDaysAgo.setHours(0, 0, 0, 0);

        const chartQuery = query(
          collection(db, 'enquiries'),
          where('createdAt', '>=', Timestamp.fromDate(thirtyDaysAgo))
        );
        const chartSnap = await getDocs(chartQuery);

        // Build a map of day -> count
        const dayMap: Record<string, number> = {};
        // Pre-fill all 30 days so chart has no gaps
        for (let i = 29; i >= 0; i--) {
          const d = new Date();
          d.setDate(d.getDate() - i);
          const key = d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
          dayMap[key] = 0;
        }

        chartSnap.docs.forEach(docSnap => {
          const data = docSnap.data();
          if (data.createdAt?.toDate) {
            const d = data.createdAt.toDate() as Date;
            const key = d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
            if (key in dayMap) {
              dayMap[key]++;
            }
          }
        });

        const chartArr = Object.entries(dayMap).map(([name, enquiries]) => ({ name, enquiries }));
        setChartData(chartArr);

      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
      </div>
    );
  }

  const StatCard = ({ title, value, icon: Icon, trend, color }: any) => (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
          <h3 className="text-3xl font-extrabold text-slate-900">{value.toLocaleString()}</h3>
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
          <Icon size={24} />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2 text-sm">
        <span className="flex items-center gap-1 text-emerald-600 font-medium">
          <ArrowUpRight size={16} />
          {trend}
        </span>
        <span className="text-slate-400">vs last month</span>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Students" 
          value={stats.students} 
          icon={Users} 
          trend="12.5%" 
          color="bg-blue-50 text-blue-600" 
        />
        <StatCard 
          title="Partner Institutes" 
          value={stats.institutes} 
          icon={Building2} 
          trend="4.2%" 
          color="bg-emerald-50 text-emerald-600" 
        />
        <StatCard 
          title="Active Courses" 
          value={stats.courses} 
          icon={BookOpen} 
          trend="8.1%" 
          color="bg-purple-50 text-purple-600" 
        />
        <StatCard 
          title="New Enquiries" 
          value={stats.enquiries} 
          icon={MessageSquare} 
          trend="24.5%" 
          color="bg-amber-50 text-amber-600" 
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-900">Enquiries — Last 30 Days</h3>
            <p className="text-sm text-slate-500">Daily enquiry volume from Firestore</p>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorEnquiries" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorEnrollments" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <CartesianGrid vertical={false} stroke="#e2e8f0" strokeDasharray="4 4" />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="enquiries" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorEnquiries)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Enquiries List */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Recent Enquiries</h3>
              <p className="text-sm text-slate-500">Latest leads & contacts</p>
            </div>
            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">View All</button>
          </div>
          
          <div className="flex-1 overflow-y-auto pr-2 space-y-4">
            {recentEnquiries.map((enquiry) => (
              <div key={enquiry.id} className="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-slate-600">{enquiry.name.charAt(0)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-900 truncate">{enquiry.name}</p>
                  <p className="text-xs text-slate-500 truncate">{enquiry.type}</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-400 whitespace-nowrap">
                  <Clock size={12} />
                  {enquiry.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
