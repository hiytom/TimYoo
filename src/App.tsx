import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import Home from './pages/Home';

function App() {
  return (
    <div id="app-root" className="min-h-screen bg-white">
      <Navbar />
      <main id="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;
