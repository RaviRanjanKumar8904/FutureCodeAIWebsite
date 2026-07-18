import { Link } from 'react-router-dom';
import { Globe, MessageCircle, Share2, Monitor, Mail, Phone, MapPin } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function Footer() {
  const location = useLocation();

  if (
    location.pathname.startsWith('/dashboard/student') || 
    location.pathname.startsWith('/dashboard/institute') ||
    location.pathname.startsWith('/admin')
  ) {
    return null;
  }

  return (
    <footer className="bg-white pt-20 pb-10 border-t-2 border-gray-100 relative z-20 shadow-[0_-10px_30px_rgba(0,0,0,0.02)]">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-16">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1 space-y-4 md:space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <img src="/logo.jpg" alt="FutureCodeAI Logo" className="h-10 w-auto rounded-lg" />
              <span className="font-heading font-extrabold text-xl tracking-tight">
                <span className="text-[#152a4f]">FutureCode</span>
                <span className="text-[#24a4b5]">AI</span>
              </span>
            </Link>
            <p className="text-text-body text-sm leading-relaxed">
              Empowering the next generation of tech leaders through immersive, project-based education in partnership with top offline institutes.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-text-body hover:text-primary transition-colors"><MessageCircle size={20} /></a>
              <a href="#" className="text-text-body hover:text-primary transition-colors"><Globe size={20} /></a>
              <a href="#" className="text-text-body hover:text-primary transition-colors"><Share2 size={20} /></a>
              <a href="#" className="text-text-body hover:text-primary transition-colors"><Monitor size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="font-heading font-bold text-text-heading mb-6">Programs</h4>
            <ul className="space-y-4">
              <li><Link to="/programs/fullstack" className="text-sm text-text-body hover:text-primary transition-colors">Full-Stack Development</Link></li>
              <li><Link to="/programs/ai-ml" className="text-sm text-text-body hover:text-primary transition-colors">AI & Machine Learning</Link></li>
              <li><Link to="/programs/dsa" className="text-sm text-text-body hover:text-primary transition-colors">Data Structures (C++/Java)</Link></li>
              <li><Link to="/programs/prompt-engineering" className="text-sm text-text-body hover:text-primary transition-colors">Prompt Engineering</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="col-span-1">
            <h4 className="font-heading font-bold text-text-heading mb-4 md:mb-6">Company</h4>
            <ul className="space-y-3 md:space-y-4">
              <li><Link to="/about" className="text-sm text-text-body hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/verify" className="text-sm font-semibold text-primary hover:text-indigo-500 transition-colors flex items-center gap-1">Verify Certificate</Link></li>
              <li><Link to="/contact" className="text-sm text-text-body hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 lg:col-span-1 mt-4 lg:mt-0">
            <h4 className="font-heading font-bold text-text-heading mb-4 md:mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-text-body">
                <MapPin size={18} className="text-primary mt-0.5 shrink-0" />
                <span>123 Innovation Drive, Tech Hub, Bangalore 560001</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-text-body">
                <Phone size={18} className="text-primary shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-text-body">
                <Mail size={18} className="text-primary shrink-0" />
                <span>hello@futurecodeai.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text-body">
            © {new Date().getFullYear()} FutureCodeAI. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-sm text-text-body hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-sm text-text-body hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
