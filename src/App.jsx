import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Certifications from './pages/Certifications';
import Assessment from './pages/Assessment';
import Result from './pages/Result';
import Certificate from './pages/Certificate';
import Verify from './pages/Verify';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/assessment/html" element={<Assessment />} />
          <Route path="/result" element={<Result />} />
          <Route path="/certificate" element={<Certificate />} />
          <Route path="/verify" element={<Verify />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
