
import React, { useEffect, useState, useRef, Suspense } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';

// Components
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import { PROJECTS } from './constants';

const AppContent: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    window.lenis = lenis;

    // 2. Asset Preloading Logic & Progress Bar Manager
    const updateLoader = (pct: number) => {
      const bar = document.getElementById('loader-bar');
      if (bar) bar.style.width = `${pct}%`;
    };

    const preloadAssets = async () => {
      // Preload the first few project covers for immediate visual impact
      const essentialImages = PROJECTS.slice(0, 4).map(p => p.coverImage);
      let loadedCount = 0;
      
      const promises = essentialImages.map(src => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = () => {
            loadedCount++;
            const progress = (loadedCount / essentialImages.length) * 100;
            updateLoader(progress);
            resolve(true);
          };
          img.onerror = resolve; // Continue on error
        });
      });

      // Artificial starting boost for perceived speed
      updateLoader(25);
      
      await Promise.all(promises);
      updateLoader(100);
      
      // Smooth fade out of loader and intro
      setTimeout(() => {
        setLoading(false);
        const bar = document.getElementById('loader-bar');
        if (bar) bar.style.opacity = '0';
      }, 800);
    };

    preloadAssets();

    return () => {
      lenis.destroy();
    };
  }, []);

  // Handlers
  const handleExitComplete = () => {
    // LOGIC: Differentiate between "Back to Home" and "Navigate to Project"
    
    // If we are going to Home AND we have a saved scroll position (from WorkGrid click),
    // we SKIP the forced scroll-to-top here. We let Home.tsx handle the restoration.
    const isBackToHome = location.pathname === '/' && sessionStorage.getItem('home_scroll_pos');

    if (window.lenis) {
      if (!isBackToHome) {
        // Standard behavior: Reset to top for new pages
        window.lenis.stop();
        window.lenis.scrollTo(0, { immediate: true, force: true });
        requestAnimationFrame(() => {
          window.lenis?.start();
        });
      }
      // If isBackToHome is true, do nothing. 
      // Lenis keeps its current internal state until Home.tsx mounts and calls scrollTo(savedPos).
    } else {
      // Fallback for non-Lenis
      if (!isBackToHome) {
        window.scrollTo(0, 0);
      }
    }
  };

  return (
    <>
      <Navbar />
      {/* Removed transition-opacity from main to avoid conflict with AnimatePresence */}
      <main className={`relative z-10 w-full overflow-hidden ${loading ? 'opacity-0' : 'opacity-100'}`} style={{ transition: 'opacity 0.8s ease-out' }}>
        <AnimatePresence 
          mode="wait" 
          onExitComplete={handleExitComplete}
        >
          {!loading && (
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/project/:id" element={<ProjectDetail />} />
            </Routes>
          )}
        </AnimatePresence>
      </main>
    </>
  );
};

declare global {
  interface Window {
    lenis: Lenis | null;
  }
}

const App: React.FC = () => {
  return (
    <HashRouter>
      <Suspense fallback={<div className="bg-[#0A0A0A] h-screen w-screen flex items-center justify-center text-label opacity-20">Loading Vision...</div>}>
        <AppContent />
      </Suspense>
    </HashRouter>
  );
};

export default App;
