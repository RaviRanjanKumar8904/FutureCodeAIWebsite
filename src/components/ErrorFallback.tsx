import { AlertTriangle, RefreshCcw } from 'lucide-react';

export default function ErrorFallback() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-20 h-20 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mb-6">
        <AlertTriangle size={32} />
      </div>
      <h2 className="text-2xl font-extrabold text-slate-900 mb-3">Something went wrong</h2>
      <p className="text-slate-500 font-medium max-w-md mx-auto mb-8">
        We encountered an unexpected error while loading this page. Please try refreshing or return later.
      </p>
      <button 
        onClick={() => window.location.reload()}
        className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-600 transition-colors flex items-center gap-2 shadow-glow-primary"
      >
        <RefreshCcw size={18} />
        Retry
      </button>
    </div>
  );
}
