import './App.css';
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Introduction from './components/introduction';
import PopupImage from './components/popupimage';
import FadeContent from './components/FadeContent';
// Halaman
import Home from './pages/home';
import AddFeedback from './pages/addfeedback';
import Blog from './pages/blog';
import CustomCursor from './components/CustomCursor';

function AppRoutes() {
  const location = useLocation();

  return (
    
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={
        <FadeContent blur={false} duration={500} easing="ease-out" initialOpacity={0}>
          <Home/>
        </FadeContent>
      } />
      <Route path="/add-feedback" element={
        <FadeContent blur={false} duration={500} easing="ease-out" initialOpacity={0}>
          <AddFeedback />
        </FadeContent>
      } />
      <Route path="/blog" element={
        <FadeContent blur={false} duration={500} easing="ease-out" initialOpacity={0}>
          <Blog />
        </FadeContent>
      } />
    </Routes>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 7000); // 3 detik

    return () => clearTimeout(timer); // Bersihkan timer jika komponen unmount
  }, []);

  return (
    <Router>
      <div className='body'>
      <CustomCursor />
        {loading ? (
          <div className="loading-screen">
            {/* Gimmick loading (bisa kamu ganti sesuai desain) */}
            <div className='loading-ic'>
              <span>— L</span>
              <span>o</span>
              <span>a</span>
              <span>d</span>
              <span>ing</span>
            </div>
          </div>
        ) : (
          <div>
            <AppRoutes />
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;