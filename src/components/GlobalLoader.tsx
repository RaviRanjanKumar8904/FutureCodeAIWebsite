import { motion } from 'framer-motion';

export default function GlobalLoader({ fullScreen = false }: { fullScreen?: boolean }) {
  const content = (
    <div className="flex flex-col items-center justify-center gap-4">
      {/* Outer spinning ring */}
      <div className="relative w-16 h-16">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border-t-2 border-r-2 border-indigo-600 opacity-75"
        />
        {/* Inner pulsing circle */}
        <motion.div
          animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full blur-[2px]"
        />
        <div className="absolute inset-3 bg-white rounded-full flex items-center justify-center shadow-inner">
          <div className="w-2 h-2 bg-indigo-600 rounded-full" />
        </div>
      </div>
      <p className="text-sm font-bold text-slate-500 uppercase tracking-[0.2em] animate-pulse">
        Loading...
      </p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-[9999] bg-white/90 backdrop-blur-md flex items-center justify-center">
        {content}
      </div>
    );
  }

  return (
    <div className="w-full py-20 flex items-center justify-center">
      {content}
    </div>
  );
}
