import { Hammer, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PlaceholderModule({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center max-w-2xl mx-auto">
      <div className="w-24 h-24 bg-indigo-50 rounded-3xl flex items-center justify-center text-indigo-600 mb-8 rotate-12 shadow-sm border border-indigo-100">
        <Hammer size={48} />
      </div>
      
      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
        {title} <br className="md:hidden"/> Under Construction
      </h1>
      
      <p className="text-lg text-slate-500 font-medium mb-10 leading-relaxed">
        We are currently building this module. It will be available in the next phase of the Admin Panel rollout. Please check back soon!
      </p>
      
      <Link 
        to="/admin/dashboard"
        className="bg-slate-900 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-indigo-600 transition-all flex items-center gap-2 shadow-lg hover:shadow-indigo-500/20"
      >
        <ArrowLeft size={18} />
        Back to Dashboard
      </Link>
    </div>
  );
}
