import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { useLocation } from 'react-router-dom';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });
    
    setLenisInstance(lenis);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      setLenisInstance(null);
    };
  }, []);

  // Stop/Start Lenis based on route
  useEffect(() => {
    if (!lenisInstance) return;

    if (location.pathname.startsWith('/dashboard/student') || location.pathname.startsWith('/dashboard/institute')) {
      lenisInstance.stop();
    } else {
      lenisInstance.start();
    }
  }, [location.pathname, lenisInstance]);

  return <>{children}</>;
}
