import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Introduction from './components/introduction';
import PopupImage from './components/popupimage';
import FadeContent from './components/FadeContent';
// Halaman
import Home from './pages/home';
import AddFeedback from './pages/addfeedback';
import Blog from './pages/blog';
import CustomCursor from './components/CustomCursor';
import ArticlePage from './pages/ArticlePages';
import Loading from './components/loading';

import ReactGA from "react-ga4";
import usePageTracking from "./hooks/usePageTracking";

// Context untuk Lenis
export const LenisContext = React.createContext(null);

function AppRoutes() {
  const location = useLocation();
  const lenisRef = React.useContext(LenisContext);

  useEffect(() => {
    ReactGA.initialize("G-J4M22QCN11"); // <--- Ganti ini pakai Measurement ID kamu
  }, []);

  usePageTracking();
  
  useEffect(() => {
    if (lenisRef?.current) {
      
      lenisRef.current.stop();

      lenisRef.current.scrollTo(0, {
        immediate: true,
        force: true,
        lock: true
      });

      // Start smooth scroll again after a brief delay
      setTimeout(() => {
        lenisRef.current.start();
      }, 100);
    } else {
      // Fallback jika Lenis tidak tersedia
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, [location.pathname]);

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={
        <FadeContent blur={false} duration={500} easing="ease-out" initialOpacity={0}>
          <Home />
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
      <Route path="/article/:id" element={
        <FadeContent blur={false} duration={500} easing="ease-out" initialOpacity={0}>
          <ArticlePage />
        </FadeContent>
      } />
    </Routes>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const lenisRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Initialize Lenis (jika Lenis diinisialisasi di sini)
  useEffect(() => {
    // Jika Anda menggunakan Lenis, simpan instance-nya di ref
    // Contoh:
    // import Lenis from '@studio-freight/lenis'
    // const lenis = new Lenis()
    // lenisRef.current = lenis
    // 
    // function raf(time) {
    //   lenis.raf(time)
    //   requestAnimationFrame(raf)
    // }
    // requestAnimationFrame(raf)
  }, []);

  return (
    <Router>
      <LenisContext.Provider value={lenisRef}>
        <div className='body'>
          <CustomCursor />
          {loading ? (
            <Loading />
          ) : (
            <div>
              <AppRoutes />
            </div>
          )}
        </div>
      </LenisContext.Provider>
    </Router>
  );
}

export default App;