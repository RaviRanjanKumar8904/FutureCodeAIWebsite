import { Canvas } from '@react-three/fiber';
import { Float, PresentationControls, Icosahedron, Edges } from '@react-three/drei';
import Reveal from '../Reveal';

function TechCore() {
  return (
    <Float speed={2.5} rotationIntensity={1.5} floatIntensity={2}>
      <PresentationControls
        global={false}
        cursor={true}
        snap={true}
        speed={1.5}
        zoom={1}
        polar={[-0.2, 0.2]}
        azimuth={[-Math.PI / 4, Math.PI / 4]}
      >
        <Icosahedron args={[1.5, 0]}>
          <meshBasicMaterial color="#1E293B" wireframe={true} />
          <Edges scale={1.1} threshold={15} color="#4F46E5" />
        </Icosahedron>
        
        <Icosahedron args={[1, 1]} rotation={[Math.PI/4, 0, 0]}>
          <meshBasicMaterial color="#06B6D4" wireframe={true} />
        </Icosahedron>
      </PresentationControls>
    </Float>
  );
}

export default function AboutHero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden min-h-[70vh] flex items-center">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          <div className="w-full lg:w-1/2 space-y-8 text-center lg:text-left">
            <Reveal direction="up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-white shadow-premium-card text-sm font-semibold text-primary">
                Who We Are
              </div>
            </Reveal>
            
            <Reveal direction="up" delay={0.1}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.1] text-text-heading tracking-tight">
                Bridging the Gap Between <br className="hidden lg:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-indigo-500 to-secondary drop-shadow-sm">
                  Classrooms and Careers
                </span>
              </h1>
            </Reveal>

            <Reveal direction="up" delay={0.2}>
              <p className="text-lg text-slate-500 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
                We empower traditional educational institutes with the modern technology curriculum and industry connections needed to build the developers of tomorrow.
              </p>
            </Reveal>
          </div>

          <div className="w-full lg:w-1/2 h-[40vh] lg:h-[60vh] relative">
            <Reveal direction="left" delay={0.3} className="w-full h-full">
              <Canvas camera={{ position: [0, 0, 5], fov: 45 }} style={{ touchAction: 'pan-y' }}>
                <TechCore />
              </Canvas>
            </Reveal>
          </div>
          
        </div>
      </div>
    </section>
  );
}
