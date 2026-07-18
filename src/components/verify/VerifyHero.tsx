import { Canvas } from '@react-three/fiber';
import { Float, PresentationControls, Octahedron, Edges } from '@react-three/drei';
import { Search } from 'lucide-react';
import Reveal from '../Reveal';

function TrustShield() {
  return (
    <Float speed={2.5} rotationIntensity={0.5} floatIntensity={1}>
      <PresentationControls
        global={false}
        cursor={true}
        snap={true}
        speed={1.5}
        zoom={1}
        polar={[-0.1, 0.1]}
        azimuth={[-Math.PI / 8, Math.PI / 8]}
      >
        <Octahedron args={[1.8, 0]} rotation={[0, 0, 0]}>
          <meshStandardMaterial color="#4F46E5" metalness={0.8} roughness={0.2} wireframe={true} />
          <Edges scale={1.05} threshold={15} color="#06B6D4" />
        </Octahedron>
        <Octahedron args={[1.2, 0]}>
          <meshStandardMaterial color="#0F172A" metalness={0.9} roughness={0.1} />
        </Octahedron>
      </PresentationControls>
    </Float>
  );
}

interface VerifyHeroProps {
  certificateId: string;
  setCertificateId: (val: string) => void;
  onVerify: () => void;
  isLoading: boolean;
}

export default function VerifyHero({ certificateId, setCertificateId, onVerify, isLoading }: VerifyHeroProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (certificateId.trim()) {
      onVerify();
    }
  };

  return (
    <section className="relative pt-32 pb-12 overflow-hidden flex flex-col items-center">
      <div className="container mx-auto px-6 max-w-3xl relative z-10">
        
        <Reveal direction="up" className="w-full">
          <div className="glass rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-white/20 relative overflow-hidden text-center">
            
            {/* 3D Shield Badge */}
            <div className="h-48 md:h-64 w-full relative -mt-4 mb-6">
              <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <ambientLight intensity={1.5} />
                <directionalLight position={[10, 10, 5]} intensity={2} />
                <TrustShield />
              </Canvas>
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold text-text-heading mb-4 tracking-tight">
              Verify Certificate
            </h1>
            <p className="text-slate-500 font-medium mb-10">
              Enter the unique Certificate ID to verify its authenticity and view the student's credentials.
            </p>

            <form onSubmit={handleSubmit} className="relative max-w-xl mx-auto">
              <div className="relative flex items-center">
                <Search className="absolute left-6 text-slate-400" size={24} />
                <input 
                  type="text"
                  value={certificateId}
                  onChange={(e) => setCertificateId(e.target.value)}
                  placeholder="e.g. FC-2026-DEMO"
                  className="w-full bg-white/50 backdrop-blur-sm border-2 border-primary/20 text-text-heading text-lg font-semibold rounded-full py-5 pl-16 pr-40 outline-none focus:border-primary transition-all shadow-inner uppercase"
                  required
                />
                <button 
                  type="submit"
                  disabled={isLoading || !certificateId.trim()}
                  className="absolute right-2 top-2 bottom-2 bg-primary text-white px-8 rounded-full font-bold hover:bg-indigo-500 transition-all shadow-glow-primary active:scale-95 disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center min-w-[120px]"
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    "Verify"
                  )}
                </button>
              </div>
            </form>

          </div>
        </Reveal>

      </div>
    </section>
  );
}
