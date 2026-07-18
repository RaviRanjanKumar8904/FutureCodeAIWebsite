import { useEffect } from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Briefcase, 
  MessageSquare, 
  Award, 
  Image as ImageIcon, 
  ShieldAlert,
  LogOut,
  Building2,
  ListOrdered
} from 'lucide-react';

const ADMIN_NAV = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Enquiries', path: '/admin/enquiries', icon: MessageSquare },
  { name: 'Collaborators', path: '/admin/collaborators', icon: Building2 },
  { name: 'Admins', path: '/admin/admins', icon: ShieldAlert },
  // Future sections placeholder:
  { name: 'Courses', path: '/admin/courses', icon: BookOpen },
  { name: 'Internships', path: '/admin/internships', icon: Briefcase },
  { name: 'Students', path: '/admin/students', icon: Users },
  { name: 'Certificates', path: '/admin/certificates', icon: Award },
  { name: 'Gallery', path: '/admin/gallery', icon: ImageIcon },
  { name: 'Activity Log', path: '/admin/logs', icon: ListOrdered },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // If not logged in, or not an admin (and not the hardcoded super admin), kick them out
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (user.role !== 'admin' && user.email !== 'raviranjan8904@gmail.com') {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user || (user.role !== 'admin' && user.email !== 'raviranjan8904@gmail.com')) {
    return null; // Don't render anything while redirecting
  }

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col fixed inset-y-0 left-0 z-50">
        <div className="h-16 flex items-center px-6 bg-slate-950/50 border-b border-slate-800">
          <span className="text-white font-extrabold text-xl tracking-tight">Admin Panel</span>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {ADMIN_NAV.map((item) => {
              const isActive = location.pathname.startsWith(item.path);
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive 
                        ? 'bg-indigo-500 text-white shadow-md' 
                        : 'hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <Icon size={18} className={isActive ? 'text-white' : 'text-slate-400'} />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content area */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-40">
          <h2 className="text-xl font-bold text-slate-800 capitalize">
            {location.pathname.split('/').pop() || 'Dashboard'}
          </h2>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-slate-600">Logged in as <strong className="text-slate-900">{user.email}</strong></span>
            {user.photoURL ? (
              <img src={user.photoURL} alt="Admin" className="w-8 h-8 rounded-full border border-gray-200" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                {user.displayName?.charAt(0) || 'A'}
              </div>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
