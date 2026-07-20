import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { useLocation } from 'react-router-dom';

// Routes where Lenis must be completely disabled (app-shell dashboards with their own scroll containers)
const DASHBOARD_PREFIXES = ['/dashboard/student', '/dashboard/institute', '/admin'];

function isDashboardRoute(pathname: string) {
  return DASHBOARD_PREFIXES.some(prefix => pathname.startsWith(prefix));
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // On dashboard routes: do NOT create Lenis at all — let native scroll work
    if (isDashboardRoute(location.pathname)) {
      // If a previous Lenis instance exists, destroy it and clean up any residual styles
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      // Ensure html/body are scrollable (Lenis sometimes leaves overflow:hidden behind)
      document.documentElement.style.removeProperty('overflow');
      document.body.style.removeProperty('overflow');
      return;
    }

    // Public pages: create Lenis for smooth scrolling
    if (!lenisRef.current) {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        touchMultiplier: 2,
      });

      lenisRef.current = lenis;

      let rafId: number;
      function raf(time: number) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);

      // Store the rafId for cleanup
      (lenis as any).__rafId = rafId;
    }

    return () => {
      if (lenisRef.current) {
        cancelAnimationFrame((lenisRef.current as any).__rafId);
        lenisRef.current.destroy();
        lenisRef.current = null;
        document.documentElement.style.removeProperty('overflow');
        document.body.style.removeProperty('overflow');
      }
    };
  }, [location.pathname]);

  return <>{children}</>;
}
