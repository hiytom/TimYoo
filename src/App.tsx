import React, { useEffect, useLayoutEffect } from 'react';
import { Routes, Route, useLocation, useNavigationType } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import Home from './pages/Home';
import ApronsPage from './pages/ApronsPage';
import ChefWearPage from './pages/ChefWearPage';
import CasualsPage from './pages/CasualsPage';
import { getSavedScrollPosition, saveScrollPosition as storeScrollPosition } from './utils/scrollPositions';

function App() {
  const location = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    const saveCurrentScrollPosition = () => {
      storeScrollPosition(location.key, window.scrollY);
    };

    window.addEventListener('pagehide', saveCurrentScrollPosition);

    return () => {
      saveCurrentScrollPosition();
      window.removeEventListener('pagehide', saveCurrentScrollPosition);
    };
  }, [location.key]);

  useLayoutEffect(() => {
    const savedPosition = getSavedScrollPosition(location.key);
    if (navigationType === 'POP' && savedPosition !== undefined) {
      const top = savedPosition;
      const restore = () => window.scrollTo({ top, left: 0, behavior: 'auto' });

      restore();
      window.requestAnimationFrame(restore);
      return;
    }

    if (location.hash) {
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.key, location.pathname, location.hash, navigationType]);

  return (
    <div id="app-root" className="min-h-screen bg-white">
      <Navbar />
      <main id="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/chef-wear" element={<ChefWearPage />} />
          <Route path="/products/casuals" element={<CasualsPage />} />
          <Route path="/products/aprons" element={<ApronsPage />} />
        </Routes>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;
