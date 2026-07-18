import { motion } from 'framer-motion';

export default function BackgroundBlobs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-surface">
      {/* Subtle tech grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e50a_1px,transparent_1px),linear-gradient(to_bottom,#4f46e50a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      <motion.div 
        animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-primary/20 blur-[100px] mix-blend-multiply" 
      />
      
      <motion.div 
        animate={{ x: [0, -80, 0], y: [0, 100, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-secondary/20 blur-[100px] mix-blend-multiply" 
      />
      
      <motion.div 
        animate={{ x: [0, 50, 0], y: [0, 50, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-10%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-accent/20 blur-[120px] mix-blend-multiply" 
      />
    </div>
  );
}
