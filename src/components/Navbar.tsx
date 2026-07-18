import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShieldCheck, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hide on dashboard AFTER hooks
  if (
    location.pathname.startsWith('/dashboard/student') || 
    location.pathname.startsWith('/dashboard/institute') ||
    location.pathname.startsWith('/admin')
  ) {
    return null;
  }

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Programs', path: '/programs' },
    { name: 'Internships', path: '/internships' },
    { name: 'Collaborators', path: '/collaborators' },
    { name: 'Gallery', path: '/gallery' }
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'glass py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-white p-1.5 rounded-xl shadow-sm border border-gray-100 group-hover:shadow-md transition-all">
              <img src="/logo.jpg" alt="FutureCodeAI Logo" className="h-8 md:h-9 w-auto mix-blend-multiply" />
            </div>
            <span className="font-heading font-extrabold text-xl md:text-2xl tracking-tight">
              <span className="text-[#152a4f]">FutureCode</span>
              <span className="text-[#24a4b5]">AI</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = link.path === '/' 
                ? location.pathname === '/' 
                : location.pathname.startsWith(link.path);
              return (
                <Link 
                  key={link.name} 
                  to={link.path}
                  className={`text-sm transition-all duration-300 relative py-1 ${isActive ? 'text-primary font-bold' : 'font-medium text-slate-600 hover:text-primary'}`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div 
                      layoutId="navbar-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <Link to="/verify" className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-primary transition-colors">
              <ShieldCheck size={16} className="text-primary" />
              Verify Certificate
            </Link>
            <div className="w-px h-5 bg-gray-200/80 mx-2"></div>
            
            {user ? (
              <div className="flex items-center gap-3">
                <Link 
                  to={user.role === 'admin' ? '/admin/dashboard' : user.role === 'institute' ? "/dashboard/institute" : "/dashboard/student"}
                  className="hidden md:flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full font-bold hover:bg-indigo-600 transition-all shadow-glow-primary hover:shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:-translate-y-0.5 active:scale-95"
                >
                  <LayoutDashboard size={18} />
                  Dashboard
                </Link>
                <div className="relative">
                  <button 
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 bg-white/60 hover:bg-white backdrop-blur-sm p-1 pr-4 rounded-full border border-gray-200/50 shadow-sm transition-all hover:shadow-md"
                >
                  <img src={user.photoURL} alt={user.displayName} className="w-8 h-8 rounded-full bg-slate-100 object-cover border border-white" />
                  <span className="text-sm font-bold text-slate-700">{user.displayName.split(' ')[0]}</span>
                </button>
                
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-soft-xl border border-gray-100 overflow-hidden"
                    >
                      <Link 
                        to={user.role === 'admin' ? '/admin/dashboard' : user.role === 'institute' ? "/dashboard/institute" : "/dashboard/student"} 
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-3 hover:bg-slate-50 text-sm font-medium text-slate-700 transition-colors"
                      >
                        <LayoutDashboard size={16} />
                        Dashboard
                      </Link>
                      <button 
                        onClick={() => {
                          logout();
                          setDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-4 py-3 hover:bg-slate-50 text-sm font-medium text-red-600 transition-colors border-t border-gray-50"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link 
                  to="/login"
                  className="text-sm font-bold text-slate-600 hover:text-primary transition-colors px-2 py-2"
                >
                  Log in
                </Link>
                <Link 
                  to="/login"
                  className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold hover:bg-indigo-600 transition-colors shadow-glow-primary"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-text-heading"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white shadow-soft-lg border-t border-gray-100 py-4 px-6 md:hidden flex flex-col gap-4"
          >
            {navLinks.map((link) => {
              const isActive = link.path === '/' 
                ? location.pathname === '/' 
                : location.pathname.startsWith(link.path);
              return (
                <Link 
                  key={link.name} 
                  to={link.path}
                  className={`text-base transition-colors ${isActive ? 'text-primary font-bold' : 'font-medium text-text-body hover:text-primary'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="h-px bg-gray-100 my-2" />
            <Link 
              to="/verify" 
              className="flex items-center justify-center gap-2 text-base font-semibold text-primary bg-primary/5 py-3 rounded-xl hover:bg-primary/10 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <ShieldCheck size={18} />
              Verify Certificate
            </Link>
            {user ? (
              <>
                <Link 
                  to={user.role === 'admin' ? '/admin/dashboard' : user.role === 'institute' ? "/dashboard/institute" : "/dashboard/student"} 
                  className="flex items-center justify-center gap-2 text-base font-semibold text-text-heading py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LayoutDashboard size={18} />
                  Dashboard
                </Link>
                <button 
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="bg-slate-100 text-slate-700 text-center px-5 py-3 rounded-full text-base font-medium flex items-center justify-center gap-2"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login"
                  className="text-base font-medium text-text-heading text-center py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Log in
                </Link>
                <Link 
                  to="/login" 
                  className="bg-primary text-white text-center px-5 py-3 rounded-full text-base font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
