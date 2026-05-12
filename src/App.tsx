import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import Home from './pages/Home';
import ApronsPage from './pages/ApronsPage';
import ChefWearPage from './pages/ChefWearPage';
import CasualsPage from './pages/CasualsPage';

function App() {
  const location = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    if (location.hash) {
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname, location.hash]);

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
